import test from 'node:test';
import assert from 'node:assert/strict';
import { installClinicMotion } from '../lib/clinic-motion.ts';

function fixture(reduced = false) {
  const observers = [];
  const listeners = new Map();
  const preference = {
    matches: reduced,
    addEventListener: (_, fn) => listeners.set('preference', fn),
    removeEventListener: () => listeners.delete('preference'),
  };
  class Element {
    constructor(options = {}) { Object.assign(this, { top: 1000, bottom: 1200, critical: false, interacting: false, order: '0', animations: [] }, options); }
    closest() { return this.critical ? this : null; }
    matches() { return this.interacting; }
    contains(node) { return this === node; }
    getBoundingClientRect() { return { top: this.top, bottom: this.bottom }; }
    getAttribute() { return this.order; }
    animate(frames, options) {
      const result = { frames, options, cancelled: false, cancel() { this.cancelled = true; } };
      this.animations.push(result);
      return result;
    }
  }
  class Observer {
    constructor(callback) { this.callback = callback; this.targets = new Set(); this.disconnected = false; observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.disconnected = true; this.targets.clear(); }
    enter(target) { this.callback([{ target, isIntersecting: true }]); }
  }
  const view = { matchMedia: () => preference, IntersectionObserver: Observer, Element, innerHeight: 800 };
  const targets = [];
  const root = {
    ownerDocument: { defaultView: view },
    querySelectorAll: () => targets,
    addEventListener: (type, callback) => listeners.set(type, callback),
    removeEventListener: (type) => listeners.delete(type),
  };
  return { root, view, targets, Element, preference, observers, listeners };
}

test('motion is optional when browser APIs are missing', () => {
  const f = fixture();
  delete f.view.IntersectionObserver;
  assert.doesNotThrow(() => installClinicMotion(f.root)());
  assert.equal(f.listeners.size, 0);
});

test('reduced motion starts without observing or animating content', () => {
  const f = fixture(true);
  f.targets.push(new f.Element());
  const cleanup = installClinicMotion(f.root);
  assert.equal(f.observers.length, 0);
  assert.equal(f.targets[0].animations.length, 0);
  cleanup();
  assert.equal(f.listeners.size, 0);
});

test('already visible and critical content never enters the reveal queue', () => {
  const f = fixture();
  const visible = new f.Element({ top: 100, bottom: 300 });
  const critical = new f.Element({ critical: true });
  const below = new f.Element();
  f.targets.push(visible, critical, below);
  const cleanup = installClinicMotion(f.root);
  assert.deepEqual([...f.observers[0].targets], [below]);
  cleanup();
});

test('entrances run once, have bounded delays and leave no retained animation styles', () => {
  const f = fixture();
  const element = new f.Element({ order: '99' });
  f.targets.push(element);
  const cleanup = installClinicMotion(f.root);
  f.observers[0].enter(element);
  f.observers[0].enter(element);
  assert.equal(element.animations.length, 1);
  assert.equal(element.animations[0].options.delay, 120);
  assert.equal(element.animations[0].options.fill, 'backwards');
  assert.ok(element.animations[0].frames.every(frame => frame.opacity > 0));
  assert.equal(f.observers[0].targets.has(element), false);
  cleanup();
});

test('pointer or keyboard interaction skips a queued entrance', () => {
  const f = fixture();
  const element = new f.Element({ interacting: true });
  f.targets.push(element);
  const cleanup = installClinicMotion(f.root);
  f.observers[0].enter(element);
  assert.equal(element.animations.length, 0);
  cleanup();
});

test('keyboard focus cancels an active entrance without hiding the focused content', () => {
  const f = fixture();
  const element = new f.Element();
  f.targets.push(element);
  const cleanup = installClinicMotion(f.root);
  f.observers[0].enter(element);
  f.listeners.get('focusin')({ target: element });
  assert.equal(element.animations[0].cancelled, true);
  cleanup();
});

test('changing to reduced motion immediately cancels animations and disconnects observation', () => {
  const f = fixture();
  const element = new f.Element();
  f.targets.push(element);
  const cleanup = installClinicMotion(f.root);
  f.observers[0].enter(element);
  f.preference.matches = true;
  f.listeners.get('preference')();
  assert.equal(element.animations[0].cancelled, true);
  assert.equal(f.observers[0].disconnected, true);
  assert.equal(f.observers.length, 1);
  cleanup();
});

test('cleanup removes observers, listeners and in-progress animations', () => {
  const f = fixture();
  const element = new f.Element();
  f.targets.push(element);
  const cleanup = installClinicMotion(f.root);
  f.observers[0].enter(element);
  cleanup();
  assert.equal(element.animations[0].cancelled, true);
  assert.equal(f.observers[0].disconnected, true);
  assert.equal(f.listeners.size, 0);
});
