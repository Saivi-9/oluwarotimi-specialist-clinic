'use client';

import { useEffect, useId, useRef, useState } from 'react';
import AppointmentForm from '@/components/appointment-form';
import { clinic } from '@/lib/clinic';
import { installClinicMotion } from '@/lib/clinic-motion';
import {
  Activity,
  ArrowRight,
  ChevronDown,
  Clock3,
  Cross,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
  Syringe,
  X,
} from 'lucide-react';

const services = [
  {
    id: 'consultation',
    number: '01',
    title: 'Cardiology consultation',
    description: 'A careful conversation about what you are feeling, your history, and the questions you want answered.',
    icon: Stethoscope,
    featured: true,
  },
  {
    id: 'assessment',
    number: '02',
    title: 'Blood pressure & risk assessment',
    description: 'A measured first look at blood pressure and cardiovascular risk factors.',
    icon: Activity,
  },
  {
    id: 'ecg',
    number: '03',
    title: 'ECG',
    description: 'A test that records the electrical signals controlling your heartbeat.',
    icon: HeartPulse,
  },
  {
    id: 'echo',
    number: '04',
    title: 'Echocardiogram',
    description: 'An ultrasound scan that helps check how your heart is working.',
    icon: Cross,
  },
  {
    id: 'holter',
    number: '05',
    title: 'Holter monitoring',
    description: 'A small monitor you wear to record your heartbeat over time.',
    icon: Clock3,
  },
  {
    id: 'laboratory',
    number: '06',
    title: 'Laboratory testing',
    description: 'Tests that help your clinician build a fuller picture when they are needed.',
    icon: Syringe,
  },
];

const faqs = [
  {
    question: 'Do I need a referral to visit the clinic?',
    answer: 'You can request a visit by phone or WhatsApp, walk in, or come with a referral. Share what you are concerned about and the clinic team can guide the next step.',
  },
  {
    question: 'What should I bring to my first visit?',
    answer: 'Bring any previous test results, a list of medicines you take, and the details of any symptoms or questions you want to discuss. Bring a referral letter if one was given. Registration or consultation fees may apply, so contact the clinic for current guidance.',
  },
  {
    question: 'Can I request an ECG or echocardiogram?',
    answer: 'Yes. You can mention the investigation you are asking about in your visit request. The clinician will advise what is appropriate for your situation.',
  },
  {
    question: 'Where is the clinic located?',
    answer: 'Oluwarotimi Specialist Clinic & Diagnostic Centre is at Promised Land Estate, Alagbaka Extension 2, behind SIB Police Headquarters, Akure, Ondo State.',
  },
  {
    question: 'Do you attend to children or pregnant patients?',
    answer: 'Yes. Please call the clinic before coming so the team can confirm the appropriate consultation arrangement.',
  },
  {
    question: 'Are online consultations or home services available?',
    answer: 'Online consultations and home services may be arranged when appropriate. Please contact the clinic first so the team can discuss what is suitable for your needs.',
  },
  {
    question: 'When can I visit?',
    answer: 'The clinic opens Monday to Saturday from 8:00 AM. There are no routine Sunday consultations. If you have urgent symptoms, seek emergency hospital care immediately rather than waiting for a clinic reply.',
  },
  {
    question: 'Which services are not offered at the clinic?',
    answer: 'The clinic is focused on cardiovascular care and diagnostics. Gynaecological care and major surgical procedures are not offered on site; the team can advise on an appropriate referral when needed.',
  },
  {
    question: 'Can I ask about fees or insurance arrangements?',
    answer: 'Registration and consultation fees are confirmed directly by the clinic. Prices are not published online. There are currently no HMO or insurance arrangements; please confirm payment options with the team before your visit.',
  },
];

const tips = [
  {
    label: 'Eat for your heart',
    summary: 'Everyday food choices',
    title: 'Build everyday meals around less-processed foods.',
    body: 'Choose more vegetables, fruits, beans, whole grains and other fibre-rich foods where possible. Reduce salty, highly processed foods, sugary drinks and frequent processed meats.',
  },
  {
    label: 'Move regularly',
    summary: 'Your weekly rhythm',
    title: 'Make movement a weekly habit.',
    body: 'Start with small amounts of movement and build up gradually. For most adults, 150 minutes of moderate activity each week is a useful goal. If you have symptoms or a medical condition, ask a clinician what is suitable for you.',
  },
  {
    label: 'Know your numbers',
    summary: 'Routine checks matter',
    title: 'Blood pressure is worth checking.',
    body: 'High blood pressure may have no warning signs. Regular checks for blood pressure, blood sugar and cholesterol can help you discuss risk factors or a family history with a clinician.',
  },
  {
    label: 'Avoid tobacco',
    summary: 'A healthier next step',
    title: 'Every step away from tobacco helps.',
    body: 'Avoid tobacco. If you smoke, ask a doctor or pharmacist for help to quit. Treatments such as nicotine patches or gum may help.',
  },
  {
    label: 'Take medicines safely',
    summary: 'Use them as agreed',
    title: 'Use prescribed medicines exactly as discussed.',
    body: 'Do not stop, share or change a prescribed medicine because you feel better or have read something online. Speak with your clinician or pharmacist first if you have concerns or side effects.',
  },
  {
    label: 'Rest and reset',
    summary: 'Sleep and recovery',
    title: 'Protect your sleep and make room for recovery.',
    body: 'Regular sleep, stress-management habits and social support are part of long-term wellbeing. Start with one realistic change you can repeat this week.',
  },
];


function ClinicSeal() {
  const clipId = useId();

  return (
    <svg viewBox="29 25 1194 1208" aria-hidden="true" focusable="false" className="clinic-seal">
      <defs>
        <clipPath id={clipId}>
          {/* Hide the proof's white exterior without changing the approved artwork. */}
          <ellipse cx="626" cy="629" rx="595" ry="602" />
        </clipPath>
      </defs>
      <image href="/oluwarotimi-crest-restored.png" width="1254" height="1254" clipPath={`url(#${clipId})`} />
    </svg>
  );
}

function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" className={'wordmark' + (inverse ? ' wordmark--inverse' : '')} aria-label={clinic.name + ' home'} data-testid={inverse ? 'link-footer-home' : 'link-logo-home'}>
      <span className="wordmark__seal" data-testid={inverse ? 'img-footer-clinic-logo' : 'img-header-clinic-logo'}><ClinicSeal /></span>
      <span className="wordmark__copy">
        <span className="wordmark__name">Oluwarotimi</span>
        <span className="wordmark__descriptor"><span>Specialist Clinic</span><span>&amp; Diagnostic Centre</span></span>
      </span>
    </a>
  );
}

const navigation = [
  ['care', 'Our care'], ['consultant', 'Your consultant'], ['approach', 'Your visit'],
  ['learn', 'Heart health'], ['faqs', 'FAQs'], ['find-us', 'Find us'],
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTip, setActiveTip] = useState(0);
  const [mapOpen, setMapOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const siteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (siteRef.current) return installClinicMotion(siteRef.current);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    // Keep anchored sections clear of the header, including when text is enlarged.
    const updateOffset = () => {
      if (header.querySelector('.main-navigation.is-open')) return;
      document.documentElement.style.setProperty('--clinic-header-offset', `${Math.ceil(header.getBoundingClientRect().height) + 20}px`);
    };
    const observer = new ResizeObserver(updateOffset);
    observer.observe(header);
    updateOffset();
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--clinic-header-offset');
    };
  }, []);

  useEffect(() => {
    function dismiss(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
    }
    if (menuOpen) window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [menuOpen]);

  return (
    <div id="top" className="site" ref={siteRef}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header ref={headerRef} className="clinic-header" data-testid="header-site-navigation">
        <div className="container-clinic header-main">
          <Wordmark />
          <div className="header-contact">
            <a href={clinic.telephone} className="header-phone" data-testid="link-header-phone">
              <Phone aria-hidden="true" />
              <span><small>Call the clinic</small><strong>{clinic.localPhone}</strong></span>
            </a>
            <a href="#urgent" className="urgent-link" data-testid="link-emergency-guidance">
              <Activity aria-hidden="true" /><span><span className="desktop-only">Emergency guidance</span><span className="mobile-only">Urgent help</span></span>
            </a>
          </div>
          <button id="menu-toggle" type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <nav id="main-navigation" className={'main-navigation' + (menuOpen ? ' is-open' : '')} aria-label="Main navigation">
          <div className="container-clinic nav-inner">
            <div className="nav-links">
              {navigation.map(([id, label]) => <a key={id} href={'#' + id} onClick={() => setMenuOpen(false)} data-testid={'link-nav-' + id}>{label}</a>)}
            </div>
            <a href="#request" onClick={() => setMenuOpen(false)} className="action action--primary" data-testid="link-nav-request">Request a visit <ArrowRight aria-hidden="true" /></a>
          </div>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero section" aria-labelledby="hero-heading">
          <div className="container-clinic hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">Specialist heart care in Akure</p>
              <h1 id="hero-heading">Care for the heart,<br /><em>close to home.</em></h1>
              <p className="lead">Talk through your concerns with a consultant cardiologist. Get careful assessment, diagnostic support and a clear plan for what comes next.</p>
              <div className="actions">
                <a href="#request" className="action action--primary" data-testid="link-hero-request">Request a visit <ArrowRight aria-hidden="true" /></a>
                <a href={clinic.telephone} className="action action--outline" data-testid="link-hero-phone"><Phone aria-hidden="true" />Call the clinic</a>
              </div>
              <div className="hero-reassurance">
                <ShieldCheck aria-hidden="true" />
                <p>Consultant-led care, with particular attention to older adults.</p>
              </div>
              <a href="#urgent" className="text-link urgent-text">Need urgent help? Read this first <ArrowRight aria-hidden="true" /></a>
            </div>
            <figure className="doctor-hero">
              <div className="clinic-photo-frame"><img src="/folorunso-oluwarotimi.jpeg" alt="Folorunso Timothy Oluwarotimi, Consultant Physician and Cardiologist" width={1122} height={1402} fetchPriority="high" data-testid="img-hero-consultant" /></div>
              <figcaption>
                <span className="eyebrow">Meet your medical director</span>
                <strong>Folorunso Timothy Oluwarotimi</strong>
                <span>Consultant Physician &amp; Cardiologist</span>
                <a href="#consultant" className="text-link">View background and credentials <ArrowRight aria-hidden="true" /></a>
              </figcaption>
            </figure>
          </div>
          <div className="container-clinic visit-facts">
            <div><Clock3 aria-hidden="true" /><p><strong>{clinic.hours}</strong><span>Call to confirm a suitable visit time.</span></p></div>
            <div><MapPin aria-hidden="true" /><p><strong>Alagbaka Extension 2, Akure</strong><a href="#find-us">Address and directions</a></p></div>
            <div><MessageCircle aria-hidden="true" /><p><strong>No referral needed</strong><span>Call, message, walk in or bring a referral.</span></p></div>
          </div>
        </section>

        <section id="care" className="section" aria-labelledby="care-heading">
          <div className="container-clinic">
            <div className="care-overview">
              <div className="care-overview__copy" data-motion-reveal>
                <p className="eyebrow">Our care</p><h2 id="care-heading">Understand your heart health.</h2>
                <p>Whether you are following up on a blood pressure reading or need a heart test, we help you understand the next step.</p>
                <p className="small-copy">Please call ahead to confirm the test you need and any preparation before your visit.</p>
                <a href="#request" className="text-link">Ask about a test <ArrowRight aria-hidden="true" /></a>
              </div>
              <figure className="equipment-photo" data-motion-reveal data-motion-order="1">
                <div className="clinic-photo-frame"><img src="/clinic-equipment.jpeg" alt="Equipment, monitors and an examination table inside the clinic" width={1448} height={1086} loading="lazy" decoding="async" data-testid="img-clinic-equipment" /></div>
                <figcaption><span>Inside our clinic</span>Equipment at Oluwarotimi Specialist Clinic.</figcaption>
              </figure>
            </div>
            <div className="service-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return <article className="service-card" key={service.id} data-motion-reveal data-motion-order={index % 3} data-testid={'card-service-' + service.id}>
                  <Icon aria-hidden="true" /><h3>{service.title}</h3><p>{service.description}</p>
                </article>;
              })}
            </div>
            <p className="section-note">Children and pregnant patients are also seen. Please call first so the team can arrange appropriate care.</p>
          </div>
        </section>

        <section id="consultant" className="section section--sage" aria-labelledby="consultant-heading">
          <div className="container-clinic consultant-layout">
            <div>
              <p className="eyebrow">Your consultant</p>
              <h2 id="consultant-heading">Folorunso Timothy<br />Oluwarotimi</h2>
              <p className="professional-title">Consultant Physician &amp; Cardiologist</p>
              <div className="professional-background">
                <h3>Professional background</h3>
                <p>Trained in Internal Medicine with specialist training in Cardiology, and a subspecialty focus in heart failure and cardiac resynchronisation therapy (CRT).</p>
                <p>Care combines careful clinical assessment, diagnostic support, a dedicated team, and ongoing research and training.</p>
              </div>
              <a href="#request" className="action action--outline">Arrange a consultation <ArrowRight aria-hidden="true" /></a>
            </div>
            <dl className="credential-list" data-motion-reveal>
              <div><dt>Qualifications and further training</dt><dd>MB ChB, FMCP, MBA<br />Interventional Cardiology</dd></div>
              <div><dt>Clinical focus</dt><dd>Hypertension, diabetes, heart failure and other heart conditions</dd></div>
              <div><dt>Professional membership</dt><dd>Nigerian Cardiac Society and PASCAR</dd></div>
              <div><dt>Care approach</dt><dd>Attentive assessment, clear explanations and a plan discussed with you</dd></div>
            </dl>
          </div>
        </section>

        <section id="approach" className="section" aria-labelledby="approach-heading">
          <div className="container-clinic approach-layout">
            <div>
              <p className="eyebrow">Your first visit</p><h2 id="approach-heading">Know what to expect.</h2>
              <p>You can call, send a WhatsApp message, walk in, or come with a referral. Online consultations and home services may be arranged after discussion with the clinic.</p>
              <ol className="visit-steps">
                {[
                  ['Contact the clinic', 'Tell the team what you need and ask about a suitable time. A short note is enough.'],
                  ['Bring what you have', 'Bring previous test results, a medicine list, your questions and a referral letter if you have one.'],
                  ['Discuss the next step', 'Your clinician will explain the assessment and any tests or follow-up that may help.'],
                ].map(([title, copy], index) => <li key={title}><span aria-hidden="true">{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}
              </ol>
              <a href="#fees" className="text-link">Registration, fees and insurance <ArrowRight aria-hidden="true" /></a>
            </div>
            <figure className="reception-photo" data-motion-reveal>
              <div className="clinic-photo-frame"><img src="/clinic-reception.jpeg" alt="The clinic reception and waiting area, viewed through the entrance" width={780} height={1040} loading="lazy" decoding="async" data-testid="img-clinic-reception" /></div>
              <figcaption><span>Reception &amp; waiting area</span>The reception team is your first point of contact when you arrive.</figcaption>
            </figure>
          </div>
        </section>

        <section id="learn" className="section section--sage" aria-labelledby="learn-heading">
          <div className="container-clinic">
            <div className="section-intro"><div><p className="eyebrow">Heart health</p><h2 id="learn-heading">Small steps for everyday wellbeing.</h2></div><p>General tips to discuss with your clinician, including blood pressure, diabetes, heart health and routine checks.</p></div>
            <div className="health-layout">
              <div className="heart-guide" aria-label="Choose a heart-health topic">
                {tips.map((tip, index) => <button key={tip.label} type="button" className={'heart-guide__item' + (activeTip === index ? ' is-active' : '')} aria-pressed={activeTip === index} aria-controls="health-tip-content" onClick={() => setActiveTip(index)} data-testid={'button-tip-' + index}>
                  <span><strong>{tip.label}</strong><small>{tip.summary}</small></span><ArrowRight aria-hidden="true" />
                </button>)}
              </div>
              <article id="health-tip-content" className="health-tip" aria-live="polite" aria-atomic="true" data-testid="content-heart-health-tip">
                <HeartPulse aria-hidden="true" />
                <div key={activeTip} className="health-tip__content"><p className="eyebrow">{tips[activeTip].label}</p><h3>{tips[activeTip].title}</h3><p>{tips[activeTip].body}</p></div>
              </article>
            </div>
            <p className="education-note"><strong>General education only.</strong> These tips do not diagnose a condition or replace a consultation. Read more from the <a href="https://www.heart.org/en/healthy-living/healthy-lifestyle/lifes-essential-8" target="_blank" rel="noreferrer">American Heart Association</a>, <a href="https://www.who.int/news-room/fact-sheets/detail/physical-activity" target="_blank" rel="noreferrer">WHO</a> and <a href="https://www.nhs.uk/better-health/quit-smoking/ready-to-quit-smoking/quit-with-nicotine-replacement-therapies-nrt/" target="_blank" rel="noreferrer">NHS</a>.</p>
          </div>
        </section>

        <section id="urgent" className="section urgent-section" aria-labelledby="urgent-heading" tabIndex={-1}>
          <div className="container-clinic urgent-layout">
            <div><p className="eyebrow">Emergency guidance</p><h2 id="urgent-heading">Get emergency help now.</h2><p className="urgent-instruction">Go to the nearest emergency hospital. Do not drive yourself. Do not wait for a clinic appointment, a form submission or a WhatsApp reply.</p></div>
            <div>
              <h3>Warning signs include:</h3>
              <ul className="warning-list">
                <li>New or unexplained chest pain, pressure or discomfort; severe breathlessness; or fainting.</li>
                <li>A drooping face, weakness on one side, trouble speaking, or sudden loss of vision or balance — even if the symptoms stop.</li>
                <li>A sudden severe headache, significant bleeding, or palpitations with chest pain, breathlessness, dizziness or fainting.</li>
              </ul>
              <p className="urgent-followup">Seek urgent medical advice if you are more short of breath than usual, or have unexplained swelling in one leg, or swelling that starts suddenly, hurts or feels hot. Swelling with chest pain or difficulty breathing needs emergency care. Other new swelling, palpitations or cramp-like leg pain when walking should also be assessed promptly.</p>
              <p className="source-note">Warning signs: <a href="https://www.heart.org/en/health-topics/heart-attack/warning-signs-of-a-heart-attack" target="_blank" rel="noreferrer">AHA</a>, <a href="https://www.stroke.org/en/about-stroke/stroke-symptoms" target="_blank" rel="noreferrer">American Stroke Association</a>, NHS guidance on <a href="https://www.nhs.uk/conditions/oedema/" target="_blank" rel="noreferrer">swelling</a> and <a href="https://www.nhs.uk/symptoms/shortness-of-breath/" target="_blank" rel="noreferrer">breathlessness</a>.</p>
            </div>
          </div>
        </section>

        <section id="faqs" className="section" aria-labelledby="faq-heading">
          <div className="container-clinic faq-layout">
            <div><p className="eyebrow">Before you come</p><h2 id="faq-heading">Your questions, answered.</h2><a href={clinic.telephone} className="text-link">Ask the clinic <Phone aria-hidden="true" /></a></div>
            <div className="faq-list">
              {faqs.map((faq, index) => <details key={faq.question} data-testid={'disclosure-faq-' + index}>
                <summary>{faq.question}<ChevronDown aria-hidden="true" /></summary><p>{faq.answer}</p>
              </details>)}
            </div>
          </div>
        </section>

        <section id="find-us" className="section section--sage" aria-labelledby="find-us-heading">
          <div className="container-clinic">
            <div className="section-intro"><div><p className="eyebrow">Plan your visit</p><h2 id="find-us-heading">Find us in Akure.</h2></div><p>Call ahead to confirm your visit time and any preparation needed for your test.</p></div>
            <div className="location-layout">
              <div className="location-details">
                <div className="location-card" data-motion-reveal data-testid="card-clinic-address">
                  <span className="location-card__icon"><MapPin aria-hidden="true" /></span>
                  <h3>Clinic address</h3>
                  <address>{clinic.address}.</address>
                  <a href={clinic.maps} target="_blank" rel="noreferrer" className="text-link" data-testid="link-request-maps">Get directions <ArrowRight aria-hidden="true" /></a>
                </div>
                <div className="location-card" data-motion-reveal data-motion-order="1" data-testid="card-clinic-hours">
                  <span className="location-card__icon"><Clock3 aria-hidden="true" /></span>
                  <h3>Opening hours</h3>
                  <p>{clinic.hours}. No routine Sunday consultations.</p>
                  <p className="small-copy">Closing times and consultation availability are confirmed by the clinic.</p>
                </div>
              </div>
              <div className="clinic-map">
                {mapOpen ? <iframe title="Map showing Oluwarotimi Specialist Clinic in Akure" src={clinic.mapEmbed} loading="lazy" referrerPolicy="no-referrer" allowFullScreen /> : <div className="map-placeholder"><MapPin aria-hidden="true" /><h3>See the clinic on the map</h3><p>Alagbaka Extension 2, behind SIB Police Headquarters.</p><button type="button" className="action action--outline" onClick={() => setMapOpen(true)} data-testid="button-load-map">Show interactive map <ArrowRight aria-hidden="true" /></button><small>Loads a map from Google Maps.</small></div>}
              </div>
            </div>
            <aside id="fees" className="fees-panel" aria-labelledby="fees-heading">
              <div><h3 id="fees-heading">Registration, fees &amp; insurance</h3><p>Contact the clinic for registration and consultation fees before your visit. Prices are not published online. There are currently no HMO or insurance arrangements; please confirm payment options directly.</p></div>
              <a href={clinic.telephone} className="action action--outline">Ask about fees <Phone aria-hidden="true" /></a>
            </aside>
          </div>
        </section>

        <section id="request" className="section request-section" aria-labelledby="request-heading">
          <div className="container-clinic request-layout">
            <div><p className="eyebrow">Appointments</p><h2 id="request-heading">Let’s arrange your visit.</h2><p>Share your name, contact number, reason for visiting and a preferred time. The team will confirm the arrangement with you.</p><p><strong>No account or login needed.</strong> Sending a request does not confirm an appointment.</p>
              <div className="contact-stack">
                <a href={clinic.telephone} data-testid="link-request-phone"><Phone aria-hidden="true" /><span>{clinic.phone}</span></a>
                <a href={'mailto:' + clinic.email} data-testid="link-request-email"><Mail aria-hidden="true" /><span>{clinic.email}</span></a>
              </div>
              <p className="small-copy">This is for routine visits. <a href="#urgent">For urgent symptoms, seek emergency care now.</a></p>
            </div>
            <AppointmentForm />
          </div>
        </section>
      </main>

      <footer className="clinic-footer">
        <div className="container-clinic footer-grid">
          <div><Wordmark inverse /><p>Consultant-led cardiovascular care in Akure.</p><p className="footer-motto">Health is Wealth</p></div>
          <div><h2>Contact the clinic</h2><a href={clinic.telephone}>{clinic.phone}</a><a href={'mailto:' + clinic.email}>{clinic.email}</a><a href={clinic.whatsapp} target="_blank" rel="noreferrer">Message on WhatsApp</a></div>
          <div><h2>Visit us</h2><address>{clinic.address}.</address><a href={clinic.maps} target="_blank" rel="noreferrer">Get directions</a></div>
          <div><h2>Clinic hours</h2><p>{clinic.hours}</p><p>No routine Sunday consultations.</p><a href="#fees">Fees and insurance</a></div>
        </div>
        <div className="container-clinic footer-bottom"><p>© {new Date().getFullYear()} {clinic.shortName}</p><a href="#urgent">Emergency guidance</a><a href="#top">Back to top ↑</a></div>
      </footer>
    </div>
  );
}
