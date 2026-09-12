/** Optional, one-shot entrances. Content is never hidden while waiting for JavaScript. */
export function installClinicMotion(root: HTMLElement): () => void {
  const view = root.ownerDocument.defaultView;
  if (!view?.matchMedia || !view.IntersectionObserver || !view.Element.prototype.animate) return () => {};

  const preference = view.matchMedia('(prefers-reduced-motion: reduce)');
  const seen = new WeakSet<Element>();
  const running = new Map<Element, Animation>();
  let observer: IntersectionObserver | undefined;

  function cancelAll() {
    observer?.disconnect();
    running.forEach((animation) => animation.cancel());
    running.clear();
  }

  function start() {
    cancelAll();
    if (!view || preference.matches) return;

    observer = new view.IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target)) continue;
        observer?.unobserve(entry.target);
        seen.add(entry.target);
        // Do not move something a visitor is already reading or interacting with.
        if (preference.matches || entry.target.matches(':hover, :focus-within')) continue;
        const order = Number(entry.target.getAttribute('data-motion-order')) || 0;
        const animation = entry.target.animate(
          [{ opacity: 0.82, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 460, delay: Math.min(Math.max(order, 0), 2) * 60, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' },
        );
        running.set(entry.target, animation);
        animation.onfinish = () => running.delete(entry.target);
      }
    }, { threshold: 0.12 });

    root.querySelectorAll<HTMLElement>('[data-motion-reveal]').forEach((element) => {
      // Never delay urgent help, forms, anchor destinations, or content already in view.
      if (seen.has(element) || element.closest('#urgent, #request')) return;
      const rect = element.getBoundingClientRect();
      if (rect.top < view.innerHeight && rect.bottom > 0) {
        seen.add(element);
        return;
      }
      observer?.observe(element);
    });
  }

  function stopOnFocus(event: FocusEvent) {
    if (!(event.target instanceof view!.Element)) return;
    for (const [element, animation] of running) {
      if (element.contains(event.target)) {
        animation.cancel();
        running.delete(element);
      }
    }
  }

  preference.addEventListener('change', start);
  root.addEventListener('focusin', stopOnFocus);
  start();
  return () => {
    cancelAll();
    preference.removeEventListener('change', start);
    root.removeEventListener('focusin', stopOnFocus);
  };
}
