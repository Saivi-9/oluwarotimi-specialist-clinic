'use client';

import { FormEvent, useMemo, useState } from 'react';

type IconName = 'heart' | 'pulse' | 'activity' | 'shield' | 'calendar' | 'arrow' | 'phone' | 'message' | 'pin' | 'clock' | 'check' | 'quote' | 'menu';

const formalClinicName = 'Oluwarotimi Specialist Clinic & Diagnostic Centre';
const phone = '+234 803 410 6928';
const whatsAppNumber = '2348034106928';
const email = 'folorunsooluwarotimi@gmail.com';
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Oluwarotimi+Specialist+Diagnostic+Centre%2C+Promised+Land+Estate%2C+Alagbaka+Extension+2%2C+Akure%2C+Ondo+State%2C+Nigeria';

const services = [
  { number: '01', icon: 'heart' as IconName, label: 'Cardiology consultation', text: 'A focused conversation about symptoms, history, existing results and the next appropriate step.' },
  { number: '02', icon: 'pulse' as IconName, label: 'Blood pressure & risk assessment', text: 'Assessment for hypertension and cardiovascular risk factors, including diabetes-related concerns.' },
  { number: '03', icon: 'activity' as IconName, label: 'ECG', text: 'Electrocardiogram testing is available at the clinic when clinically appropriate.' },
  { number: '04', icon: 'activity' as IconName, label: 'Echocardiogram', text: 'Echocardiography is available as part of the clinic’s diagnostic services.' },
  { number: '05', icon: 'pulse' as IconName, label: 'Holter monitoring', text: 'Holter monitoring is available for patients whose assessment requires it.' },
  { number: '06', icon: 'shield' as IconName, label: 'Laboratory investigations', text: 'Laboratory testing can be arranged as part of a diagnostic work-up.' },
];

const visitSteps = [
  ['01', 'Contact the clinic', 'Call, send a WhatsApp message, walk in, or come with a referral.'],
  ['02', 'Prepare for your visit', 'Bring your registration or consultation fee, plus previous reports or a referral letter if you have them.'],
  ['03', 'Agree the next step', 'The team will explain the consultation, tests, follow-up or service arrangement appropriate for you.'],
];

const faqs = [
  ['Do you attend to children?', 'Yes. Please call the clinic before coming so the team can confirm the appropriate consultation arrangement.'],
  ['Do you attend to pregnant patients?', 'Yes. Please contact the clinic before your visit so the team can discuss the appropriate arrangement.'],
  ['Are online consultations available?', 'Online services may be available after an appropriate agreement with the clinic. Contact the team to discuss your needs.'],
  ['Are home services available?', 'Home services may be available after an appropriate agreement with the clinic. Please contact the team first.'],
  ['Can I come without a referral?', 'Yes. Patients may visit with or without a referral letter. Registration or consultation fees apply; please contact the clinic for current information.'],
];

const heartHealthTips = [
  { number: '01', label: 'EAT FOR YOUR HEART', title: 'Build everyday meals around less-processed foods.', text: 'Choose more vegetables, fruits, beans, whole grains and other fibre-rich foods. Limit salty, highly processed foods, sugary drinks and frequent processed meats where possible.' },
  { number: '02', label: 'MOVE REGULARLY', title: 'Make movement a weekly habit.', text: 'For most adults, the goal is at least 150 minutes of moderate activity a week, such as brisk walking. If you have symptoms, a medical condition or have been inactive, ask a health professional what is suitable for you.' },
  { number: '03', label: 'KNOW YOUR NUMBERS', title: 'Check blood pressure even when you feel well.', text: 'High blood pressure may have no warning signs. Ask about appropriate checks for blood pressure, blood sugar and cholesterol, especially if you have risk factors or a family history.' },
  { number: '04', label: 'TAKE MEDICINES SAFELY', title: 'Use prescribed medicines exactly as discussed.', text: 'Do not stop, share or change a prescribed medicine because you feel better or have read something online. Speak with your clinician or pharmacist first if you have concerns or side effects.' },
  { number: '05', label: 'AVOID TOBACCO', title: 'Every step away from tobacco helps.', text: 'Avoid smoking and other nicotine products where you can. If stopping feels difficult, a health professional can help you make a realistic plan.' },
  { number: '06', label: 'REST & RESET', title: 'Protect your sleep and make room for recovery.', text: 'Regular sleep, stress-management habits and social support are part of long-term cardiovascular wellbeing. Start with one realistic change you can repeat this week.' },
];

const urgentSymptoms = [
  'new or severe chest discomfort',
  'trouble breathing',
  'fainting or collapse',
  'sudden weakness, numbness or trouble speaking',
  'a severe or rapidly worsening symptom',
];

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (name) {
    case 'heart': return <svg {...props}><path d="M20.8 8.7c0 5.4-8.8 10.1-8.8 10.1S3.2 14.1 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z" /><path d="M7 9.5h2l1.2-2.2 2.1 5 1.2-2.8H17" /></svg>;
    case 'pulse': return <svg {...props}><path d="M3 12h3.5l2-5 3.4 10 2.3-6 1.4 1H21" /></svg>;
    case 'activity': return <svg {...props}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h3l1.5-3.2 2.8 6.4 1.8-4.1 1.2.9h3.7" /></svg>;
    case 'shield': return <svg {...props}><path d="M12 3.2 19 6v5.1c0 4.3-2.8 7.8-7 9.7-4.2-1.9-7-5.4-7-9.7V6l7-2.8Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>;
    case 'calendar': return <svg {...props}><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M7.5 3.5v3M16.5 3.5v3M3.5 9h17" /></svg>;
    case 'arrow': return <svg {...props}><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
    case 'phone': return <svg {...props}><path d="M6.5 3.8 9 3l1.6 4-2 1.5a15 15 0 0 0 6.9 6.9l1.5-2 4 1.6-.8 2.5a2 2 0 0 1-2.1 1.4C10.7 18 6 13.3 4.9 6a2 2 0 0 1 1.6-2.2Z" /></svg>;
    case 'message': return <svg {...props}><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.6 8.6 0 0 1-3.3-.7L4 19.7l1.4-3.7A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" /><path d="M8.5 11.8h.1M12 11.8h.1M15.5 11.8h.1" /></svg>;
    case 'pin': return <svg {...props}><path d="M19 10.2c0 5-7 10.3-7 10.3s-7-5.3-7-10.3a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10.2" r="2.2" /></svg>;
    case 'clock': return <svg {...props}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.2 2" /></svg>;
    case 'check': return <svg {...props}><path d="m5 12.5 4.2 4.2L19 7" /></svg>;
    case 'quote': return <svg {...props}><path d="M9.5 7.2A4.7 4.7 0 0 0 5 12v5h5v-5H7.8a2.4 2.4 0 0 1 1.7-2.3V7.2ZM19 7.2a4.7 4.7 0 0 0-4.5 4.8v5h5v-5h-2.2A2.4 2.4 0 0 1 19 9.7V7.2Z" /></svg>;
    default: return <svg {...props}><path d="M5 7h14M5 12h14M5 17h14" /></svg>;
  }
}

function getWhatsAppLink(message: string) {
  return 'https://wa.me/' + whatsAppNumber + '?text=' + encodeURIComponent(message);
}

export default function Home() {
  const [tipIndex, setTipIndex] = useState(0);
  const [name, setName] = useState('');
  const [visitType, setVisitType] = useState('Cardiology consultation');
  const [contactPreference, setContactPreference] = useState('WhatsApp message');
  const [details, setDetails] = useState('');
  const [formNote, setFormNote] = useState('');

  const whatsAppLink = useMemo(() => {
    const introduction = name.trim() ? 'Hello, my name is ' + name.trim() + '.' : 'Hello, I would like to make an enquiry.';
    const context = details.trim() ? ' A little more context: ' + details.trim() : '';
    return getWhatsAppLink(introduction + ' I would like to ask about a ' + visitType.toLowerCase() + '. My preferred contact is ' + contactPreference.toLowerCase() + '.' + context);
  }, [name, visitType, contactPreference, details]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormNote('Your message is ready. Continue to WhatsApp to send it to the clinic team.');
  }

  const featuredTip = heartHealthTips[tipIndex];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="urgent-bar">
        <div className="shell urgent-bar__inner">
          <span className="urgent-bar__signal"><span className="signal-dot" /> Patient guidance</span>
          <p><strong>Urgent symptoms?</strong> This website is not an emergency service.</p>
          <a href="#urgent-care">Know what to do <Icon name="arrow" size={15} /></a>
        </div>
      </div>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="Oluwarotimi Specialist Clinic home">
            <span className="brand-mark"><img src="/olumaro-clinic-logo.jpg" alt="" /></span>
            <span><strong>Oluwarotimi</strong><small>Specialist Clinic</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#care">Our care</a>
            <a href="#journey">Your visit</a>
            <a href="#heart-health">Heart health</a>
            <a href="#faq">FAQs</a>
          </nav>
          <a className="button button--small button--coral header-cta" href="#request"><Icon name="calendar" size={16} /> Request a visit</a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow eyebrow--coral"><span /> CARDIOLOGY & DIAGNOSTIC CARE IN AKURE</p>
              <h1>Heart care with <em>clarity</em>, close to home.</h1>
              <p className="hero-lead">Thoughtful consultations, useful diagnostics and a calm next step for you and your family.</p>
              <div className="hero-actions">
                <a className="button button--dark" href="#request">Start a conversation <Icon name="arrow" size={18} /></a>
                <a className="text-link" href={'tel:' + phone.replaceAll(' ', '')}><span className="icon-circle"><Icon name="phone" size={16} /></span> Call {phone}</a>
              </div>
              <div className="hero-reassurance"><span className="reassurance-icon"><Icon name="shield" size={19} /></span><span><strong>A more informed first step.</strong><br />Bring your questions. We will help you understand what comes next.</span></div>
            </div>
            <div className="hero-visual" aria-label="Clinic information">
              <div className="hero-orbit hero-orbit--one" />
              <div className="hero-orbit hero-orbit--two" />
              <div className="hero-card">
                <div className="hero-card__top"><span className="status-pill"><span /> Care starts with a conversation</span><span className="hero-card__index">01—06</span></div>
                <div className="hero-card__logo"><img src="/olumaro-clinic-logo.jpg" alt="Oluwarotimi Specialist Clinic and Diagnostic Centre" /></div>
                <div className="hero-card__content"><p className="eyebrow">A PATIENT-FIRST APPROACH</p><h2>Listen carefully.<br /><span>Guide clearly.</span></h2><p>Consultant-led care and diagnostic support, with the information you need to make your next decision.</p></div>
                <div className="hero-card__footer"><span>Akure, Ondo State</span><a href={mapsUrl} target="_blank" rel="noreferrer">Get directions <Icon name="arrow" size={14} /></a></div>
              </div>
              <div className="floating-note floating-note--top"><span className="floating-note__icon"><Icon name="heart" size={18} /></span><span><strong>Heart-focused care</strong><small>With practical guidance</small></span></div>
              <div className="floating-note floating-note--bottom"><span className="floating-note__number">24/7</span><span><strong>Emergency reminder</strong><small>Know when to seek urgent care</small></span></div>
            </div>
          </div>
        </section>

        <section className="trust-rail" aria-label="Clinic strengths">
          <div className="shell trust-rail__grid">
            <div><span className="trust-number">01</span><span><strong>Consultant-led</strong><small>Thoughtful, focused consultations</small></span></div>
            <div><span className="trust-number">02</span><span><strong>Diagnostic support</strong><small>ECG, echo and monitoring</small></span></div>
            <div><span className="trust-number">03</span><span><strong>Clear next steps</strong><small>Understand your care pathway</small></span></div>
            <div className="trust-rail__note"><Icon name="pin" size={18} /><span>Promised Land Estate<br />Alagbaka Extension 2, Akure</span></div>
          </div>
        </section>

        <section className="section services-section" id="care">
          <div className="shell">
            <div className="section-heading section-heading--split"><div><p className="eyebrow">OUR CARE</p><h2>Specialist attention for the things that matter.</h2></div><p>From your first question to the next appropriate step, our care is designed to make cardiovascular health feel easier to navigate.</p></div>
            <div className="services-grid">
              {services.map((service) => <article className="service-card" key={service.label}><div className="service-card__top"><span className="service-card__number">{service.number}</span><span className="service-icon"><Icon name={service.icon} size={23} /></span></div><h3>{service.label}</h3><p>{service.text}</p><a href="#request" aria-label={'Ask about ' + service.label}>Ask about this <Icon name="arrow" size={15} /></a></article>)}
            </div>
          </div>
        </section>

        <section className="section consultant-section" id="consultant">
          <div className="shell consultant-grid">
            <div className="portrait-panel"><div className="portrait-panel__ring" /><div className="portrait-panel__content"><span className="portrait-panel__quote"><Icon name="quote" size={30} /></span><p>Good care begins when a patient feels heard, informed and involved.</p><span className="portrait-panel__line" /></div><span className="portrait-panel__label">CARE, WITH CONTEXT</span></div>
            <div className="consultant-copy"><p className="eyebrow eyebrow--coral">THE EXPERIENCE WE AIM FOR</p><h2>Medicine is personal. The website should feel that way too.</h2><p className="large-copy">A clinic visit can come with uncertainty. This space is here to give you a clear place to begin, simple language to work from and a direct way to reach the team.</p><div className="check-list"><div><span><Icon name="check" size={15} /></span><p><strong>Start with your questions</strong><small>Share what brought you here and what you need to understand.</small></p></div><div><span><Icon name="check" size={15} /></span><p><strong>Bring the useful context</strong><small>Previous reports and referral letters can help shape the conversation.</small></p></div><div><span><Icon name="check" size={15} /></span><p><strong>Leave with a next step</strong><small>The team will explain the appropriate consultation, test or follow-up.</small></p></div></div><a className="text-link text-link--dark" href="#journey">See how a visit works <Icon name="arrow" size={17} /></a></div>
          </div>
        </section>

        <section className="section journey-section" id="journey">
          <div className="shell"><div className="section-heading section-heading--center"><p className="eyebrow">YOUR VISIT</p><h2>A simple path from question to clarity.</h2><p>Call, message or walk in. We will help you understand the most appropriate arrangement for your needs.</p></div><div className="journey-grid">{visitSteps.map(([number, title, text]) => <article className="journey-card" key={number}><span className="journey-card__number">{number}</span><div className="journey-card__line" /><h3>{title}</h3><p>{text}</p></article>)}</div><div className="journey-cta"><span><Icon name="calendar" size={19} /><strong>Ready to begin?</strong> Send a quick request and the clinic team can guide the next conversation.</span><a className="button button--coral" href="#request">Request a visit <Icon name="arrow" size={17} /></a></div></div>
        </section>

        <section className="section heart-section" id="heart-health">
          <div className="shell"><div className="heart-section__head"><div><p className="eyebrow eyebrow--mint">HEART HEALTH GUIDE</p><h2>Small habits.<br /><em>Real momentum.</em></h2></div><p>Practical, general information for everyday cardiovascular wellbeing. Use it as a starting point—not a substitute for personal medical advice.</p></div><div className="tip-spotlight"><div className="tip-spotlight__index"><span>{featuredTip.number}</span><span> / 06</span></div><div className="tip-spotlight__body"><p className="tip-label">{featuredTip.label}</p><h3>{featuredTip.title}</h3><p>{featuredTip.text}</p></div><button type="button" className="round-arrow" onClick={() => setTipIndex((current) => (current + 1) % heartHealthTips.length)} aria-label="Show next heart health tip"><Icon name="arrow" size={20} /></button></div><div className="health-tip-grid">{heartHealthTips.map((tip, index) => <button type="button" className={'health-tip-card' + (index === tipIndex ? ' is-active' : '')} key={tip.number} onClick={() => setTipIndex(index)}><span>{tip.number}</span><strong>{tip.label}</strong><small>{index === tipIndex ? 'Currently featured' : 'Read guide'}</small></button>)}</div></div>
        </section>

        <section className="urgent-section" id="urgent-care"><div className="shell urgent-section__grid"><div><p className="eyebrow eyebrow--light">PLEASE READ</p><h2>Some symptoms need urgent care now.</h2><p>If you or someone near you has any of the following, go to the nearest emergency hospital. Do not rely on this website, a WhatsApp message or an online search.</p></div><div className="urgent-list">{urgentSymptoms.map((symptom) => <div key={symptom}><span><Icon name="check" size={15} /></span><strong>{symptom}</strong></div>)}</div></div></section>

        <section className="section faq-section" id="faq"><div className="shell faq-layout"><div className="faq-intro"><p className="eyebrow">QUESTIONS, ANSWERED</p><h2>Useful before you arrive.</h2><p>For anything specific to you or a family member, please call or send a WhatsApp message. Do not send sensitive medical information through this website.</p><a className="text-link text-link--dark" href={'mailto:' + email}>Email the clinic <Icon name="arrow" size={17} /></a></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>

        <section className="section request-section" id="request"><div className="shell request-grid"><div className="request-copy"><p className="eyebrow eyebrow--coral">START HERE</p><h2>Let’s make the first step easy.</h2><p>Tell the clinic team what you would like to ask about. This tool does not store your details; it prepares a WhatsApp message for you to review and send.</p><div className="contact-stack"><a href={'tel:' + phone.replaceAll(' ', '')}><span><Icon name="phone" size={18} /></span><small>CALL THE CLINIC</small><strong>{phone}</strong></a><a href={'mailto:' + email}><span><Icon name="message" size={18} /></span><small>EMAIL</small><strong>{email}</strong></a><a href={mapsUrl} target="_blank" rel="noreferrer"><span><Icon name="pin" size={18} /></span><small>FIND US IN AKURE</small><strong>Get directions <Icon name="arrow" size={15} /></strong></a></div></div><form className="request-form" onSubmit={handleSubmit}><div className="form-heading"><span className="form-heading__icon"><Icon name="message" size={21} /></span><div><p className="eyebrow">WHATSAPP REQUEST</p><h3>A few details to begin.</h3></div></div><label>Your name <span>Optional</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="How should the team address you?" /></label><label>What would you like to ask about?<select value={visitType} onChange={(event) => setVisitType(event.target.value)}><option>Cardiology consultation</option><option>Blood pressure / risk assessment</option><option>ECG</option><option>Echocardiogram</option><option>Holter monitoring</option><option>Laboratory investigations</option></select></label><label>Preferred contact <select value={contactPreference} onChange={(event) => setContactPreference(event.target.value)}><option>WhatsApp message</option><option>Phone call</option><option>Email</option></select></label><label>Anything else the team should know? <span>Optional</span><textarea value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Keep it general—please do not include private medical records." rows={3} /></label><button className="button button--dark button--full" type="submit">Prepare WhatsApp message <Icon name="arrow" size={17} /></button><p className="form-note">Please do not include private medical records or urgent emergency information here.</p>{formNote && <div className="request-ready" role="status"><p>{formNote}</p><a className="button button--coral" href={whatsAppLink} target="_blank" rel="noreferrer">Continue to WhatsApp <Icon name="arrow" size={16} /></a></div>}</form></div></section>
      </main>

      <footer className="site-footer"><div className="shell footer-top"><a className="brand brand--footer" href="#top"><span className="brand-mark"><img src="/olumaro-clinic-logo.jpg" alt="" /></span><span><strong>Oluwarotimi</strong><small>Specialist Clinic</small></span></a><div className="footer-links"><a href="#care">Our care</a><a href="#consultant">Our approach</a><a href="#heart-health">Heart health</a><a href="#faq">FAQs</a><a href="#request">Contact</a></div></div><div className="shell footer-bottom"><p>© 2026 {formalClinicName}. All rights reserved.</p><p>General information only. Not an emergency service.</p></div></footer>
    </>
  );
}
