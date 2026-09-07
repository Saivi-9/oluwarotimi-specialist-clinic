'use client';

import { useEffect, useId, useState, type FormEvent } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  Check,
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
    description: 'An electrocardiogram to support your clinical assessment.',
    icon: HeartPulse,
  },
  {
    id: 'echo',
    number: '04',
    title: 'Echocardiogram',
    description: 'Ultrasound imaging of the heart, arranged as part of your care.',
    icon: Cross,
  },
  {
    id: 'holter',
    number: '05',
    title: 'Holter monitoring',
    description: 'Heart rhythm monitoring over time when it is needed.',
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
    answer: 'Registration and consultation fees are confirmed directly by the clinic. Prices are not published online, and the clinic does not currently list HMO or insurance arrangements. Please contact the team for current guidance before your visit.',
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
    body: 'For most adults, 150 minutes of moderate activity a week is a useful goal. If you have symptoms, a medical condition or have been inactive, ask a clinician what is suitable for you.',
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
    body: 'Avoid smoking and other nicotine products where you can. If stopping feels difficult, a health professional can help you make a realistic plan.',
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

function ClinicSeal({ label }: { label: string }) {
  const clipId = useId();

  return (
    <svg viewBox="0 0 1045 1080" role="img" aria-label={label} className="clinic-seal" data-testid="img-clinic-logo">
      <title>{label}</title>
      <defs>
        <clipPath id={clipId}>
          {/* Follow the photographed seal's outer edge without changing its lettering or artwork. */}
          <path d="M 552 15 C 652 6 757 45 841 102 C 931 169 995 290 1016 405 C 1037 522 1018 650 983 731 C 943 842 848 950 730 1003 C 630 1055 525 1079 420 1065 C 270 1045 160 953 96 862 C 34 776 1 660 8 551 C 12 399 84 272 197 159 C 291 62 429 13 552 15 Z" />
        </clipPath>
      </defs>
      <image href="/olumaro-clinic-logo.jpg" width="1045" height="1080" clipPath={`url(#${clipId})`} />
    </svg>
  );
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" className={`clinic-logo ${inverse ? 'clinic-logo--inverse' : ''}`} data-testid="link-logo-home" aria-label="Oluwarotimi Clinic home">
      <span className="clinic-logo__seal">
        <ClinicSeal label="Oluwarotimi Specialist Clinic and Diagnostic Centre logo" />
      </span>
      <span className="clinic-logo__wordmark">
        <span className="clinic-logo__name">Oluwarotimi</span>
        <span className="clinic-logo__descriptor"><span>Specialist Clinic</span><span>&amp; Diagnostic Centre</span></span>
      </span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTip, setActiveTip] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', reason: '' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      'Hello Oluwarotimi Clinic, I would like to request a visit.',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `What I would like help with: ${form.reason}`,
    ].join('\n');
    setFormSent(true);
    window.open(`https://wa.me/2348034106928?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div id="top" className="min-h-[100dvh] overflow-x-clip">
      <div className="bg-[#214348] px-5 py-2.5 text-center text-[11px] font-medium tracking-[.03em] text-[#f7efe1]" data-testid="status-emergency-banner">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#ef9a80] align-middle" />
        If you have severe or urgent symptoms, please seek emergency care immediately.
        <a href="#urgent" className="ml-2 font-bold underline underline-offset-4" data-testid="link-emergency-guidance">Read urgent-symptom guidance</a>
      </div>

      <header className={`site-header sticky top-0 z-40 ${scrolled ? 'is-scrolled' : 'bg-[#f7f2e7]'}`} data-testid="header-site-navigation">
        <div className="container-clinic flex min-h-[96px] items-center justify-between gap-5 py-3">
          <Logo />
          <nav className="hidden shrink-0 items-center gap-5 lg:flex" aria-label="Main navigation">
            <a href="#care" className="text-sm text-[#526b6e] transition-colors hover:text-[#214348]" data-testid="link-nav-care">Our care</a>
            <a href="#consultant" className="text-sm text-[#526b6e] transition-colors hover:text-[#214348]" data-testid="link-nav-consultant">Consultant</a>
            <a href="#approach" className="text-sm text-[#526b6e] transition-colors hover:text-[#214348]" data-testid="link-nav-approach">Your visit</a>
            <a href="#learn" className="text-sm text-[#526b6e] transition-colors hover:text-[#214348]" data-testid="link-nav-learn">Heart health</a>
            <a href="#faqs" className="text-sm text-[#526b6e] transition-colors hover:text-[#214348]" data-testid="link-nav-faqs">FAQs</a>
            <a href="#request" className="button-interactive cta-on-dark rounded-full bg-[#214348] px-5 py-3 text-sm font-bold" data-testid="link-nav-request">Request a visit <ArrowRight className="ml-1 inline h-4 w-4" /></a>
          </nav>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="shrink-0 rounded-full p-2 text-[#214348] lg:hidden" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" data-testid="button-mobile-menu">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="border-t border-[#d9d3c6] bg-[#f7f2e7] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="container-clinic flex flex-col gap-4">
              <a href="#care" onClick={closeMenu} className="py-1 text-sm font-semibold" data-testid="link-mobile-care">Our care</a>
              <a href="#consultant" onClick={closeMenu} className="py-1 text-sm font-semibold" data-testid="link-mobile-consultant">Consultant</a>
              <a href="#approach" onClick={closeMenu} className="py-1 text-sm font-semibold" data-testid="link-mobile-approach">Your visit</a>
              <a href="#learn" onClick={closeMenu} className="py-1 text-sm font-semibold" data-testid="link-mobile-learn">Heart health</a>
              <a href="#faqs" onClick={closeMenu} className="py-1 text-sm font-semibold" data-testid="link-mobile-faqs">FAQs</a>
              <a href="#request" onClick={closeMenu} className="button-interactive cta-on-dark mt-1 inline-flex w-fit items-center rounded-full bg-[#214348] px-5 py-3 text-sm font-bold" data-testid="link-mobile-request">Request a visit <ArrowRight className="ml-1 h-4 w-4" /></a>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section className="relative bg-[#f7f2e7] pb-20 pt-10 md:pb-28 md:pt-14" aria-labelledby="hero-heading">
          <div className="container-clinic clinic-identity reveal">
            <span className="clinic-identity__seal"><ClinicSeal label="Oluwarotimi Specialist Clinic seal" /></span>
            <div className="clinic-identity__wordmark">
              <h1 id="hero-heading" className="clinic-identity__heading">
                <span className="clinic-identity__name">Oluwarotimi</span>{' '}
                <span className="clinic-identity__descriptor"><span>Specialist Clinic</span>{' '}<span>&amp; Diagnostic Centre</span></span>
              </h1>
              <div className="clinic-identity__details">
                <p className="clinic-identity__location">Akure, Ondo State</p>
                <span aria-hidden="true" />
                <p className="clinic-identity__motto">Health is Wealth</p>
              </div>
            </div>
          </div>
          <div className="container-clinic mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 md:mt-12">
            <div className="reveal">
              <h2 className="max-w-[540px] font-display text-[clamp(2.5rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-.035em] text-[#214348]">Care for the heart,<br />close to home.</h2>
              <p className="mt-5 max-w-[510px] text-[17px] leading-8 text-[#5d7071]">
                Consultant-led cardiovascular care and diagnostic support in Akure, with a focus on careful assessment and clear next steps.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#request" className="button-interactive cta-on-dark inline-flex items-center justify-center rounded-full bg-[#214348] px-6 py-4 text-sm font-bold" data-testid="link-hero-request">
                  Request a visit <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#care" className="button-interactive button-interactive--quiet inline-flex items-center justify-center rounded-full px-5 py-4 text-sm font-bold text-[#214348]" data-testid="link-hero-care">Explore our care <ArrowDownRight className="ml-2 h-4 w-4" /></a>
              </div>
              <div className="mt-10 flex items-center gap-3 text-xs text-[#6b7c7d]">
                <ShieldCheck className="h-5 w-5 text-[#4e8d84]" />
                <span>Family-centred care in Akure</span>
                <span className="h-1 w-1 rounded-full bg-[#bb6659]" />
                <span>Diagnostic support on site</span>
              </div>
            </div>

            <figure className="reveal reveal-delay-2 mx-auto w-full max-w-[560px] overflow-hidden rounded-[28px] border border-[#ded7c9] bg-[#fbf8f1] shadow-[0_25px_60px_rgba(33,67,72,.12)]">
              <img
                src="/clinic-equipment.jpeg"
                alt="Equipment, monitors and a patient table inside Oluwarotimi Specialist Clinic"
                width={1448}
                height={1086}
                fetchPriority="high"
                className="h-auto w-full"
                data-testid="img-clinic-equipment"
              />
              <figcaption className="p-6 md:p-7">
                <p className="eyebrow text-[#bb6659]">Inside our clinic · Akure</p>
                <p className="mt-3 font-display text-2xl leading-tight text-[#214348]">Specialist care, close to home.</p>
                <p className="mt-3 text-sm leading-6 text-[#557975]">Consultations and diagnostic support at Oluwarotimi Specialist Clinic &amp; Diagnostic Centre.</p>
              </figcaption>
            </figure>
          </div>
          <div className="container-clinic mt-16 flex items-center gap-4 border-t border-[#ded7c9] pt-5 text-xs text-[#728080]">
            <span className="eyebrow text-[#bb6659]">Take the first step</span>
            <span className="hidden h-px w-14 bg-[#d6cfc1] sm:block" />
            <span>When you are unsure about your heart health, asking is enough reason to begin.</span>
          </div>
        </section>

        <section id="care" className="scroll-mt-20 bg-[#f7f2e7] py-20 md:py-28" aria-labelledby="care-heading">
          <div className="container-clinic">
            <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20">
              <div>
                <p className="eyebrow text-[#bb6659]">What we offer</p>
                <h2 id="care-heading" className="mt-4 max-w-[330px] font-display text-5xl leading-[.98] tracking-[-.04em] text-[#214348] md:text-6xl">Care that looks at the whole picture.</h2>
              </div>
              <div className="md:pt-10">
                <p className="max-w-[580px] text-lg leading-8 text-[#607273]">Your concern might begin with a single symptom, a blood pressure reading, or a question you cannot put down. Our care brings careful clinical assessment, modern diagnostic support and patient-focused follow-up together. Older adults are an important focus of our care.</p>
              </div>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.id} className={`group flex min-h-[230px] flex-col justify-between rounded-[24px] border p-6 transition-transform hover:-translate-y-1 ${service.featured ? 'border-[#214348] bg-[#214348] text-[#f7f2e7]' : 'border-[#ded7c9] bg-[#fbf8f1] text-[#214348]'}`} data-testid={`card-service-${service.id}`}>
                    <div className="flex items-start justify-between">
                      <span className={`font-label text-[11px] font-bold tracking-[.14em] ${service.featured ? 'text-[#a7c9be]' : 'text-[#bb6659]'}`}>{service.number}</span>
                      <span className={`rounded-full p-2.5 ${service.featured ? 'bg-[#42666a] text-[#d9eee5]' : 'bg-[#edf1e9] text-[#4e8d84]'}`}><Icon className="h-5 w-5" /></span>
                    </div>
                    <div className="mt-8">
                      <h3 className="font-display text-2xl leading-tight">{service.title}</h3>
                      <p className={`mt-3 max-w-[400px] text-sm leading-6 ${service.featured ? 'text-[#c7d9d1]' : 'text-[#667778]'}`}>{service.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="consultant" className="scroll-mt-20 bg-[#dce9e2] py-20 md:py-28" aria-labelledby="consultant-heading">
          <div className="container-clinic grid items-start gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-14 xl:gap-20">
            <figure className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[28px] border border-[#b8d2c5] bg-[#edf4ef] shadow-[0_20px_50px_rgba(33,67,72,.1)] lg:mx-0">
              <img
                src="/folorunso-oluwarotimi.jpeg"
                alt="Folorunso Timothy Oluwarotimi, Consultant Physician and Cardiologist"
                width={1122}
                height={1402}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
                data-testid="img-medical-director"
              />
              <figcaption className="border-t border-[#b8d2c5] px-6 py-5">
                <p className="font-display text-xl text-[#214348]">Folorunso Timothy Oluwarotimi</p>
                <p className="mt-1 text-sm leading-6 text-[#426a67]">Medical Director</p>
              </figcaption>
            </figure>
            <div className="min-w-0">
              <p className="eyebrow text-[#557975]">Medical director</p>
              <h2 id="consultant-heading" className="mt-4 max-w-[560px] font-display text-[clamp(2.55rem,4vw,3.3rem)] leading-[.94] tracking-[-.045em] text-[#214348]">
                <span className="block">Folorunso Timothy</span>
                <span className="block text-[#386864]">Oluwarotimi</span>
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#386864]">Consultant Physician &amp; Cardiologist</p>
              <div className="mt-7 max-w-[510px] border-t border-[#aecbbd] pt-5">
                <p className="eyebrow text-[#557975]">Professional background</p>
                <p className="mt-3 text-base font-medium leading-7 text-[#426a67]"><strong className="font-semibold text-[#214348]">Training and focus.</strong> Trained in Internal Medicine with specialist training in Cardiology, he has a subspecialty focus in heart failure and cardiac resynchronisation therapy (CRT).</p>
              </div>
              <p className="mt-4 max-w-[510px] text-base leading-7 text-[#587a75]">Care at the clinic is shaped by careful clinical assessment, modern diagnostic support, a dedicated team and ongoing learning—so each patient can leave with a clearer next step.</p>
              <dl className="mt-8 grid gap-x-8 gap-y-6 border-t border-[#aecbbd] pt-6 sm:grid-cols-2">
                <div><dt className="text-sm font-semibold text-[#426a67]">Qualifications</dt><dd className="mt-2 text-base leading-7 text-[#214348]">MB ChB, FMCP, MBA, Interventional Cardiology</dd></div>
                <div><dt className="text-sm font-semibold text-[#426a67]">Clinical focus</dt><dd className="mt-2 text-base leading-7 text-[#214348]">Hypertension, diabetes, heart failure and other heart conditions</dd></div>
                <div><dt className="text-sm font-semibold text-[#426a67]">Professional membership</dt><dd className="mt-2 text-base leading-7 text-[#214348]">Nigerian Cardiac Society and PASCAR</dd></div>
                <div><dt className="text-sm font-semibold text-[#426a67]">Care approach</dt><dd className="mt-2 text-base leading-7 text-[#214348]">Attentive assessment, diagnostic support and a clear plan</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section id="approach" className="scroll-mt-20 bg-[#e9d8c4] py-20 md:py-28" aria-labelledby="approach-heading">
          <div className="container-clinic grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] lg:items-center lg:gap-20">
            <div>
              <p className="eyebrow text-[#bb6659]">Your visit, made simple</p>
              <h2 id="approach-heading" className="mt-4 max-w-[480px] font-display text-5xl leading-[.97] tracking-[-.04em] text-[#214348] md:text-6xl">No perfect words required.</h2>
              <p className="mt-6 max-w-[440px] text-base leading-7 text-[#617071]">A clinic visit can feel like a lot when you are carrying a worry. We keep the first step clear and human. You can call, send a WhatsApp message, walk in, or come with a referral.</p>
              <div className="relative mt-9">
                <div className="absolute left-[27px] top-7 bottom-7 w-px bg-[#c2ae96]" aria-hidden="true" />
                <div className="space-y-8">
                  {[
                    ['01', 'Tell us what is on your mind', 'Request a visit by WhatsApp, phone, or email. A short note is enough.'],
                    ['02', 'Have a considered conversation', 'Bring your questions, history, any previous results and a referral letter if you have one.'],
                    ['03', 'Leave with a next step', 'Your clinician will guide the assessment or diagnostic support that fits your concern.'],
                  ].map(([number, title, copy]) => (
                    <div className="relative flex gap-6" key={number} data-testid={`step-visit-${number}`}>
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#c2ae96] bg-[#e9d8c4] font-label text-xs font-bold text-[#bb6659]">{number}</div>
                      <div className="pt-1">
                        <h3 className="font-display text-2xl text-[#214348]">{title}</h3>
                        <p className="mt-2 max-w-[450px] text-base leading-7 text-[#617071]">{copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <a href="#request" className="button-interactive button-interactive--outline mt-8 inline-flex items-center rounded-full border border-[#214348] px-5 py-3 text-sm font-bold text-[#214348]" data-testid="link-approach-request">Begin a visit request <ArrowRight className="ml-2 h-4 w-4" /></a>
            </div>
            <figure className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[28px] border border-[#c2ae96] bg-[#f7f2e7] shadow-[0_20px_50px_rgba(71,55,40,.12)]">
              <img
                src="/clinic-reception.jpeg"
                alt="Reception and waiting area at Oluwarotimi Specialist Clinic, viewed through the entrance"
                width={780}
                height={1040}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
                data-testid="img-clinic-reception"
              />
              <figcaption className="border-t border-[#d8c8b3] px-6 py-5">
                <p className="font-display text-xl text-[#214348]">Your first stop when you arrive.</p>
                <p className="mt-2 text-sm leading-6 text-[#617071]">The clinic’s reception and waiting area.</p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="learn" className="scroll-mt-20 bg-[#f7f2e7] py-20 md:py-28" aria-labelledby="learn-heading">
          <div className="container-clinic grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
            <div>
              <p className="eyebrow text-[#bb6659]">A little clarity</p>
              <h2 id="learn-heading" className="mt-4 max-w-[400px] font-display text-5xl leading-[.98] tracking-[-.04em] text-[#214348] md:text-6xl">Heart health is a conversation.</h2>
              <p className="mt-6 max-w-[420px] text-base leading-7 text-[#607273]">There is no need to diagnose yourself before asking for help. Use these gentle prompts to notice what you may want to discuss, including hypertension, diabetes, heart disease and routine medical checks.</p>
              <div className="heart-guide mt-9" aria-label="Heart health guide">
                {tips.map((tip, index) => (
                  <button type="button" key={tip.label} onClick={() => setActiveTip(index)} className={`heart-guide__item ${activeTip === index ? 'is-active' : ''}`} aria-pressed={activeTip === index} data-testid={`button-tip-${index}`}>
                    <span className="heart-guide__number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="heart-guide__copy"><strong>{tip.label}</strong><small>{tip.summary}</small></span>
                    <ArrowDownRight className="heart-guide__arrow h-4 w-4" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
            <div className="relative min-h-[330px] rounded-[28px] bg-[#dce9e2] p-7 md:p-10" data-testid="content-heart-health-tip">
              <div className="absolute right-8 top-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#9fc2b5] text-[#4e8d84]">
                <HeartPulse className="h-7 w-7" />
              </div>
              <span className="eyebrow text-[#557975]">Heart-health tip {String(activeTip + 1).padStart(2, '0')} / {String(tips.length).padStart(2, '0')}</span>
              <h3 className="mt-24 max-w-[480px] font-display text-4xl leading-[1.02] tracking-[-.03em] text-[#214348] md:text-5xl">{tips[activeTip].title}</h3>
              <p className="mt-5 max-w-[510px] text-base leading-7 text-[#5f7775]">{tips[activeTip].body}</p>
              <div className="absolute bottom-7 left-7 right-7 flex items-center gap-3 border-t border-[#b8d2c5] pt-4 text-xs text-[#5f7775] md:bottom-10 md:left-10 md:right-10"><Check className="h-4 w-4 text-[#4e8d84]" />A question is a good place to begin.</div>
            </div>
          </div>
          <div className="container-clinic mt-5 rounded-[20px] border border-[#ded7c9] bg-[#fbf8f1] p-6 text-sm leading-6 text-[#607273]">
            <strong className="text-[#214348]">General education only.</strong> These pointers do not diagnose a condition or replace a consultation. For reliable general reading, visit the <a className="font-bold text-[#4e8d84] underline underline-offset-4" href="https://www.heart.org/en/healthy-living/healthy-lifestyle/lifes-essential-8" target="_blank" rel="noreferrer">American Heart Association</a>, <a className="font-bold text-[#4e8d84] underline underline-offset-4" href="https://www.who.int/health-topics/noncommunicable-diseases/physical-activity" target="_blank" rel="noreferrer">World Health Organization</a> or <a className="font-bold text-[#4e8d84] underline underline-offset-4" href="https://www.cdc.gov/high-blood-pressure/prevention/index.html" target="_blank" rel="noreferrer">CDC</a>.
          </div>
        </section>

        <section id="urgent" className="scroll-mt-20 bg-[#bb6659] py-14 text-[#fff5e8] md:py-16" aria-labelledby="urgent-heading">
          <div className="container-clinic grid gap-8 md:grid-cols-[.75fr_1.25fr] md:items-center">
            <div className="flex items-start gap-4">
              <div className="rounded-full border border-[#e2aa95] p-3"><Activity className="h-6 w-6" /></div>
              <div>
                <p className="eyebrow text-[#f4d7c6]">Please read</p>
                <h2 id="urgent-heading" className="mt-2 font-display text-4xl leading-none">When it feels urgent</h2>
              </div>
            </div>
            <div className="space-y-3">
              <p className="max-w-[660px] text-base leading-7 text-[#fff0df]">Go to the nearest emergency hospital immediately for chest pain, severe or worsening breathlessness, fainting, sudden weakness, a sudden severe headache, significant bleeding, or palpitations with chest pain, breathlessness, dizziness or fainting. Do not wait for a WhatsApp reply, an online search or a clinic appointment.</p>
              <p className="max-w-[660px] text-sm leading-6 text-[#f9ddcf]">New leg or foot swelling, palpitations without the warning signs above, or cramp-like leg pain brought on by walking should be assessed promptly by a clinician.</p>
            </div>
          </div>
        </section>

        <section id="faqs" className="scroll-mt-20 bg-[#f7f2e7] py-20 md:py-28" aria-labelledby="faq-heading">
          <div className="container-clinic grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="eyebrow text-[#bb6659]">Questions, answered</p>
              <h2 id="faq-heading" className="mt-4 font-display text-5xl leading-[.98] tracking-[-.04em] text-[#214348] md:text-6xl">A little more ease before you arrive.</h2>
              <a href="#request" className="mt-8 inline-flex items-center text-sm font-bold text-[#4e8d84] underline decoration-[#a7c9be] decoration-2 underline-offset-4" data-testid="link-faq-request">Still unsure? Ask the clinic <ArrowRight className="ml-2 h-4 w-4" /></a>
            </div>
            <div className="divide-y divide-[#ded7c9] border-y border-[#ded7c9]">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group py-5" data-testid={`disclosure-faq-${index}`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-bold text-[#214348] [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d3cabb] text-[#4e8d84] transition-transform group-open:rotate-180"><ChevronDown className="h-4 w-4" /></span>
                  </summary>
                  <p className="max-w-[590px] pt-4 text-sm leading-7 text-[#647576]" data-testid={`text-faq-answer-${index}`}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="request" className="scroll-mt-20 bg-[#214348] py-20 text-[#f7f2e7] md:py-28" aria-labelledby="request-heading">
          <div className="container-clinic grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div>
              <p className="eyebrow text-[#a7c9be]">Your first step</p>
              <h2 id="request-heading" className="mt-4 max-w-[460px] font-display text-5xl leading-[.96] tracking-[-.04em] md:text-6xl">Tell us how we can help.</h2>
              <p className="mt-6 max-w-[430px] text-base leading-7 text-[#c3d5ce]">Send a visit request on WhatsApp and the clinic team can follow up. You can also call or email directly.</p>
              <div className="mt-10 space-y-5 text-sm">
                <a href="tel:+2348034106928" className="flex items-center gap-3 text-[#f7f2e7] transition-colors hover:text-[#e6a18b]" data-testid="link-request-phone"><span className="rounded-full bg-[#42666a] p-2"><Phone className="h-4 w-4" /></span>+234 803 410 6928</a>
                <a href="mailto:folorunsooluwarotimi@gmail.com" className="flex items-center gap-3 text-[#f7f2e7] transition-colors hover:text-[#e6a18b]" data-testid="link-request-email"><span className="rounded-full bg-[#42666a] p-2"><Mail className="h-4 w-4" /></span>folorunsooluwarotimi@gmail.com</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Oluwarotimi+Specialist+Diagnostic+Centre%2C+Promised+Land+Estate%2C+Alagbaka+Extension+2%2C+Akure%2C+Ondo+State%2C+Nigeria" target="_blank" rel="noreferrer" className="flex items-start gap-3 text-[#f7f2e7] transition-colors hover:text-[#e6a18b]" data-testid="link-request-maps"><span className="rounded-full bg-[#42666a] p-2"><MapPin className="h-4 w-4" /></span><span>Promised Land Estate, Alagbaka Extension 2,<br />behind SIB Police Headquarters, Akure</span></a>
              </div>
            </div>
            <form onSubmit={handleRequest} className="rounded-[28px] bg-[#f7f2e7] p-6 text-[#214348] shadow-[0_20px_60px_rgba(12,37,40,.2)] md:p-9" data-testid="form-visit-request">
              {formSent ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dce9e2] text-[#4e8d84]"><MessageCircle className="h-7 w-7" /></div>
                  <h3 className="mt-6 font-display text-4xl">Your request is ready.</h3>
                  <p className="mt-3 max-w-[340px] text-sm leading-6 text-[#647576]" data-testid="status-request-sent">WhatsApp has opened with your details. The clinic team can follow up from there.</p>
                  <button type="button" onClick={() => { setFormSent(false); setForm({ name: '', phone: '', reason: '' }); }} className="button-interactive button-interactive--outline mt-7 rounded-full border border-[#cfc8ba] px-5 py-3 text-sm font-bold text-[#214348]" data-testid="button-new-request">Make another request</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-[#ded7c9] pb-5">
                    <div><p className="eyebrow text-[#bb6659]">WhatsApp visit request</p><h3 className="mt-2 font-display text-3xl">A short note is enough.</h3></div>
                    <MessageCircle className="h-7 w-7 text-[#4e8d84]" />
                  </div>
                  <div className="mt-7 space-y-5">
                    <label className="block"><span className="mb-2 block text-xs font-bold text-[#617273]">Your name</span><input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-[#d8d0c2] bg-[#fbf8f1] px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#4e8d84] focus:ring-2 focus:ring-[#a7c9be]" placeholder="How should we address you?" data-testid="input-request-name" /></label>
                    <label className="block"><span className="mb-2 block text-xs font-bold text-[#617273]">Phone number</span><input required type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-[#d8d0c2] bg-[#fbf8f1] px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#4e8d84] focus:ring-2 focus:ring-[#a7c9be]" placeholder="+234..." data-testid="input-request-phone" /></label>
                    <label className="block"><span className="mb-2 block text-xs font-bold text-[#617273]">What would you like help with?</span><textarea required rows={3} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className="w-full resize-none rounded-xl border border-[#d8d0c2] bg-[#fbf8f1] px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#4e8d84] focus:ring-2 focus:ring-[#a7c9be]" placeholder="A test, appointment question or a brief non-urgent concern..." data-testid="textarea-request-reason" /></label>
                  </div>
                  <button type="submit" className="button-interactive button-interactive--coral mt-7 flex w-full items-center justify-center rounded-full bg-[#e68b76] px-5 py-4 text-sm font-bold text-[#214348]" data-testid="button-submit-request">Continue on WhatsApp <ArrowRight className="ml-2 h-4 w-4" /></button>
                  <p className="mt-4 text-center text-[11px] leading-5 text-[#7b8580]">When you continue, these details are sent through WhatsApp. Do not include medical records, payment details or urgent information. For urgent symptoms, seek emergency care immediately rather than waiting for a reply.</p>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#17363a] py-9 text-[#c3d5ce]">
        <div className="container-clinic flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo inverse />
            <p className="mt-4 max-w-[330px] text-xs leading-6 text-[#8fa9a3]">Oluwarotimi Specialist Clinic &amp; Diagnostic Centre<br />Cardiology-focused family care in Akure.</p>
            <p className="mt-3 font-display text-lg italic text-[#f0c695]">Health is Wealth</p>
          </div>
          <div className="flex flex-col gap-3 text-xs md:items-end">
            <a href="#top" className="font-bold text-[#f7f2e7] hover:text-[#e6a18b]" data-testid="link-footer-home">Back to top <ArrowRight className="ml-1 inline h-3 w-3 -rotate-90" /></a>
            <span className="text-[#8fa9a3]">Promised Land Estate, Alagbaka Extension 2, behind SIB Police Headquarters, Akure</span>
            <span className="text-[#8fa9a3]">© {new Date().getFullYear()} Oluwarotimi Clinic</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
