'use client';

import { FormEvent, useMemo, useState } from 'react';

const clinicName = 'Oluwarotimi Specialist Clinic';
const formalClinicName = 'Oluwarotimi Specialist Clinic & Diagnostic Centre';
const phone = '+234 803 410 6928';
const whatsAppNumber = '2348034106928';
const email = 'folorunsooluwarotimi@gmail.com';
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Oluwarotimi+Specialist+Diagnostic+Centre%2C+Promised+Land+Estate%2C+Alagbaka+Extension+2%2C+Akure%2C+Ondo+State%2C+Nigeria';

const services = [
  { label: 'Cardiology consultation', text: 'A focused conversation about symptoms, history, existing results and the next appropriate step.' },
  { label: 'Blood pressure & risk assessment', text: 'Assessment for hypertension and cardiovascular risk factors, including diabetes-related concerns.' },
  { label: 'ECG', text: 'Electrocardiogram testing is available at the clinic when clinically appropriate.' },
  { label: 'Echocardiogram', text: 'Echocardiography is available as part of the clinic’s diagnostic services.' },
  { label: 'Holter monitoring', text: 'Holter monitoring is available for patients whose assessment requires it.' },
  { label: 'Laboratory investigations', text: 'Laboratory testing can be arranged as part of a diagnostic work-up.' },
];

const visitSteps = [
  ['Contact the clinic', 'Call, send a WhatsApp message, walk in, or come with a referral.'],
  ['Prepare for your visit', 'Bring your registration or consultation fee, and any previous reports or referral letter if you have them.'],
  ['Agree the next step', 'The team will explain the consultation, tests, follow-up or service arrangement that is appropriate for you.'],
];

const faqs = [
  ['Do you attend to children?', 'Yes. Please call the clinic before coming so the team can confirm the appropriate consultation arrangement.'],
  ['Do you attend to pregnant patients?', 'Yes. Please contact the clinic before your visit so the team can discuss the appropriate arrangement.'],
  ['Are online consultations available?', 'Online services may be available after an appropriate agreement with the clinic. Contact the team to discuss your needs.'],
  ['Are home services available?', 'Home services may be available after an appropriate agreement with the clinic. Please contact the team first.'],
  ['Do you give special attention to elderly patients?', 'Yes. Care for older adults is an important focus for the clinic.'],
  ['Can I come without a referral?', 'Yes. Patients may visit with or without a referral letter. Registration or consultation fees apply; please contact the clinic for current information.'],
];

const heartHealthTips = [
  {
    number: '01',
    label: 'EAT FOR YOUR HEART',
    title: 'Build everyday meals around less-processed foods.',
    text: 'Choose more vegetables, fruits, beans, whole grains and other fibre-rich foods. Limit salty, highly processed foods, sugary drinks and frequent processed meats where possible.',
  },
  {
    number: '02',
    label: 'MOVE REGULARLY',
    title: 'Make movement a weekly habit.',
    text: 'For most adults, the goal is at least 150 minutes of moderate activity a week, such as brisk walking. If you have symptoms, a medical condition or have been inactive, ask a health professional what is suitable for you.',
  },
  {
    number: '03',
    label: 'KNOW YOUR NUMBERS',
    title: 'Check blood pressure even when you feel well.',
    text: 'High blood pressure may have no warning signs. Ask about appropriate checks for blood pressure, blood sugar and cholesterol, especially if you have risk factors or a family history.',
  },
  {
    number: '04',
    label: 'TAKE MEDICINES SAFELY',
    title: 'Use prescribed medicines exactly as discussed.',
    text: 'Do not stop, share or change a prescribed medicine because you feel better or have read something online. Speak with your clinician or pharmacist first if you have concerns or side effects.',
  },
  {
    number: '05',
    label: 'AVOID TOBACCO',
    title: 'Every step away from tobacco helps.',
    text: 'Avoid smoking and other nicotine products where you can. If stopping feels difficult, a health professional can help you make a realistic plan.',
  },
  {
    number: '06',
    label: 'REST & RESET',
    title: 'Protect your sleep and make room for recovery.',
    text: 'Regular sleep, stress-management habits and social support are part of long-term cardiovascular wellbeing. Start with one realistic change you can repeat this week.',
  },
];

const urgentSymptoms = [
  'new or severe chest discomfort',
  'trouble breathing',
  'fainting or collapse',
  'sudden weakness, numbness or trouble speaking',
  'a severe or rapidly worsening symptom',
];

function getWhatsAppLink(message: string) {
  return `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [name, setName] = useState('');
  const [visitType, setVisitType] = useState('Cardiology consultation');
  const [contactPreference, setContactPreference] = useState('WhatsApp message');
  const [message, setMessage] = useState('');
  const [formNote, setFormNote] = useState('');
  const [tipIndex, setTipIndex] = useState(0);

  const whatsAppLink = useMemo(() => {
    const introduction = name.trim() ? `Hello, my name is ${name.trim()}.` : 'Hello.';
    const details = message.trim() ? ` I would like to share: ${message.trim()}` : '';
    return getWhatsAppLink(`${introduction} I would like to ask about a ${visitType}. My preferred contact is ${contactPreference}.${details}`);
  }, [name, visitType, contactPreference, message]);

  function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormNote('Your WhatsApp message is ready. Select “Continue to WhatsApp” to send it to the clinic.');
  }

  const featuredTip = heartHealthTips[tipIndex];

  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <div className="urgent-bar">
        <div className="shell urgent-bar__inner">
          <span className="urgent-dot" aria-hidden="true" />
          <p><strong>Urgent symptoms:</strong> for severe, sudden or worsening symptoms, do not wait for online guidance or a routine visit. Seek emergency care at the nearest hospital.</p>
        </div>
      </div>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label={`${clinicName} home`}>
            <span className="brand-logo"><img src="/olumaro-clinic-logo.jpg" alt="Oluwarotimi Specialist Clinic logo" /></span>
            <span><strong>{clinicName}</strong><small>Cardiology &amp; diagnostic care in Akure</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#services">Services</a>
            <a href="#consultant">Consultant</a>
            <a href="#visit">Your visit</a>
            <a href="#heart-health">Heart health</a>
            <a href="#faq">FAQs</a>
          </nav>
          <a className="header-cta" href="#request">Book a visit</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="shell hero-grid" id="main-content">
          <div className="hero-copy">
            <p className="eyebrow">CONSULTANT PHYSICIAN &amp; CARDIOLOGY CARE</p>
            <h1>Cardiology care that starts with listening.</h1>
            <p className="hero-intro">{formalClinicName} is an Akure-based clinic for thoughtful cardiovascular assessment, diagnostic testing and clear next steps for patients and families.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#request">Request a visit</a>
              <a className="text-link" href={`tel:${phone.replace(/\s/g, '')}`}>Call {phone} <span aria-hidden="true">→</span></a>
            </div>
            <p className="hero-note">General information only. The clinic will discuss individual concerns during an appropriate consultation.</p>
          </div>

          <aside className="hero-panel" aria-label="Clinic contact overview">
            <p className="eyebrow">VISIT THE CLINIC</p>
            <h2>Clear contact details. A simple route to care.</h2>
            <div className="hero-panel__details">
              <div><span>LOCATION</span><strong>Promised Land Estate, Alagbaka Extension 2, behind SIB Police Headquarters, Akure, Ondo State.</strong></div>
              <div><span>HOURS</span><strong>Monday to Saturday from 8:00 AM. Sunday: no routine consultations.</strong></div>
              <div><span>CONTACT</span><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></div>
            </div>
            <div className="hero-panel__actions">
              <a className="button button--dark" href={getWhatsAppLink('Hello, I would like to contact Oluwarotimi Specialist Clinic.')} target="_blank" rel="noreferrer">Message on WhatsApp</a>
              <a className="inline-link" href={mapsUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
            </div>
          </aside>
        </div>
      </section>

      <section className="proof-strip" aria-label="Clinic highlights">
        <div className="shell proof-strip__grid">
          <div><strong>Specialist focus</strong><span>Cardiology, heart failure &amp; CRT</span></div>
          <div><strong>On-site diagnostics</strong><span>ECG, echocardiogram, Holter &amp; laboratory investigations</span></div>
          <div><strong>How to book</strong><span>Call, WhatsApp, walk in or come with a referral</span></div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="shell">
          <div className="section-heading section-heading--wide">
            <p className="eyebrow">CARE &amp; DIAGNOSTICS</p>
            <h2>Focused cardiovascular care, with the diagnostic support to move forward.</h2>
            <p>Services are discussed in the context of your individual needs. The clinic can confirm availability and the appropriate arrangements when you contact the team.</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.label}</h3>
                <p>{service.text}</p>
                <a href="#request">Ask about this service <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="consultant-section" id="consultant">
        <div className="shell consultant-grid">
          <div className="consultant-card">
            <p className="eyebrow">MEDICAL DIRECTOR</p>
            <h2>Folorunso Timothy Oluwarotimi</h2>
            <p className="consultant-role">Consultant Physician &amp; Cardiologist</p>
            <div className="credential-list">
              <div><span>QUALIFICATIONS</span><strong>MB ChB, FMCP, MBA, Interventional Cardiology</strong></div>
              <div><span>CLINICAL FOCUS</span><strong>Hypertension, diabetes, heart failure and heart diseases</strong></div>
              <div><span>PROFESSIONAL MEMBERSHIP</span><strong>Nigerian Cardiac Society and PASCAR</strong></div>
            </div>
          </div>
          <div className="consultant-copy">
            <p className="eyebrow">ABOUT THE CLINIC</p>
            <h2>Clinical acumen, diagnostic capability and a team that stays focused on the patient.</h2>
            <p>Our approach combines careful assessment with modern diagnostic facilities, dedicated staff and a commitment to clear, respectful communication.</p>
            <p>Research and training are part of the clinic’s culture, alongside a practical goal: helping each patient understand the next appropriate step for their health.</p>
            <a className="text-link" href="#visit">How to prepare for your visit <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="visit-section" id="visit">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">YOUR VISIT</p><h2>A calmer, better-prepared consultation.</h2></div>
            <p>Whether you are coming for a first consultation, a follow-up or a test, the team can explain the right arrangements before you arrive.</p>
          </div>
          <div className="visit-grid">
            {visitSteps.map(([title, description], index) => (
              <article className="visit-card" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
          <div className="visit-note"><strong>Good to know:</strong> Previous reports, a list of medicines and a referral letter can be helpful, but patients may visit with or without a referral.</div>
        </div>
      </section>

      <section className="health-section" aria-labelledby="health-heading">
        <div className="shell health-layout">
          <div>
            <p className="eyebrow">REGULAR MEDICAL CHECKS</p>
            <h2 id="health-heading">Make space for the checks that matter.</h2>
            <p>Regular review can help you discuss blood pressure, diabetes, heart symptoms and everyday risk factors before they become harder to manage.</p>
            <a className="button button--light" href="#request">Talk to the clinic</a>
          </div>
          <div className="health-topics" aria-label="Topics the clinic can discuss">
            <span>Hypertension</span><span>Diabetes</span><span>Heart failure</span><span>Heart diseases</span><span>Routine medical checks</span>
          </div>
        </div>
      </section>

      <section className="heart-guide-section" id="heart-health" aria-labelledby="heart-guide-heading">
        <div className="shell">
          <div className="section-heading section-heading--wide heart-guide-heading">
            <p className="eyebrow">HEART HEALTH GUIDE</p>
            <h2 id="heart-guide-heading">Practical habits for a healthier heart.</h2>
            <p>These tips are for general education. They are not a diagnosis or a personal treatment plan. Your medical history, medicines, pregnancy status and symptoms can change what is right for you.</p>
          </div>

          <div className="tip-spotlight" aria-live="polite">
            <div className="tip-spotlight__number">{featuredTip.number}</div>
            <div className="tip-spotlight__copy">
              <p className="eyebrow">{featuredTip.label}</p>
              <h3>{featuredTip.title}</h3>
              <p>{featuredTip.text}</p>
            </div>
            <button className="tip-next" type="button" onClick={() => setTipIndex((current) => (current + 1) % heartHealthTips.length)}>
              Another tip <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="health-tip-grid" aria-label="Heart health tips">
            {heartHealthTips.map((tip, index) => (
              <article className="health-tip-card" key={tip.number}>
                <span>{tip.number}</span>
                <p className="health-tip-card__label">{tip.label}</p>
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
                <button className="health-tip-card__action" type="button" onClick={() => setTipIndex(index)}>Read this tip <span aria-hidden="true">→</span></button>
              </article>
            ))}
          </div>

          <div className="safety-grid">
            <aside className="urgent-guide" aria-labelledby="urgent-guide-heading">
              <p className="eyebrow">DO NOT WAIT FOR A ROUTINE APPOINTMENT</p>
              <h3 id="urgent-guide-heading">For urgent symptoms, seek emergency care.</h3>
              <p>If you or someone near you has any of the following, go to the nearest emergency hospital. Do not rely on this website, a WhatsApp message or an online search.</p>
              <ul>
                {urgentSymptoms.map((symptom) => <li key={symptom}>{symptom}</li>)}
              </ul>
            </aside>
            <div className="source-guide">
              <p className="eyebrow">LEARN FROM TRUSTED SOURCES</p>
              <h3>Want to read more?</h3>
              <p>Our patient education is informed by recognised public-health guidance. These links are a good starting point for reliable general information.</p>
              <div className="source-links">
                <a href="https://www.heart.org/en/healthy-living/healthy-lifestyle/lifes-essential-8" target="_blank" rel="noreferrer">American Heart Association: Life&apos;s Essential 8 <span aria-hidden="true">↗</span></a>
                <a href="https://www.who.int/health-topics/noncommunicable-diseases/physical-activity" target="_blank" rel="noreferrer">World Health Organization: Physical activity <span aria-hidden="true">↗</span></a>
                <a href="https://www.cdc.gov/high-blood-pressure/prevention/index.html" target="_blank" rel="noreferrer">CDC: Preventing high blood pressure <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="shell faq-layout">
          <div className="section-heading">
            <p className="eyebrow">PATIENT QUESTIONS</p>
            <h2>Helpful answers before you contact us.</h2>
            <p>For anything specific to you or a family member, please call or send a WhatsApp message. Do not send sensitive medical information through this website.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details className="faq-item" key={question}>
                <summary><span>{question}</span><span className="summary-icon" aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="request-section" id="request">
        <div className="shell request-grid">
          <div className="request-copy">
            <p className="eyebrow">VISIT REQUEST TOOL</p>
            <h2>Prepare a message for the clinic in under a minute.</h2>
            <p>This tool does not store your details. It simply creates a pre-filled WhatsApp message for the clinic team, so you can begin your request clearly.</p>
            <div className="contact-list">
              <a href={`tel:${phone.replace(/\s/g, '')}`}><span>CALL</span>{phone}</a>
              <a href={`mailto:${email}`}><span>EMAIL</span>{email}</a>
              <a href={mapsUrl} target="_blank" rel="noreferrer"><span>ADDRESS</span>Akure, Ondo State <b aria-hidden="true">↗</b></a>
            </div>
          </div>
          <form className="request-form" onSubmit={handleRequest}>
            <label>
              Your name <span>(optional)</span>
              <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Your name" />
            </label>
            <label>
              What do you need?
              <select value={visitType} onChange={(event) => setVisitType(event.target.value)}>
                <option>Cardiology consultation</option>
                <option>Blood pressure / risk assessment</option>
                <option>ECG</option>
                <option>Echocardiogram</option>
                <option>Holter monitoring</option>
                <option>General enquiry</option>
              </select>
            </label>
            <label>
              Preferred contact
              <select value={contactPreference} onChange={(event) => setContactPreference(event.target.value)}>
                <option>WhatsApp message</option>
                <option>Phone call</option>
                <option>Clinic visit</option>
              </select>
            </label>
            <label>
              Brief note <span>(optional)</span>
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="For example: I would like to ask about available appointment times." rows={3} />
            </label>
            <p className="form-note">Please do not include private medical records or urgent emergency information here.</p>
            <button className="button button--primary" type="submit">Prepare my message</button>
            {formNote && <div className="request-ready" role="status"><p>{formNote}</p><a className="button button--dark" href={whatsAppLink} target="_blank" rel="noreferrer">Continue to WhatsApp <span aria-hidden="true">↗</span></a></div>}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-top">
          <a className="brand brand--footer" href="#top"><span className="brand-logo"><img src="/olumaro-clinic-logo.jpg" alt="Oluwarotimi Specialist Clinic logo" /></span><span><strong>{clinicName}</strong><small>Health is Wealth</small></span></a>
          <div className="footer-links"><a href="#services">Services</a><a href="#consultant">Consultant</a><a href="#heart-health">Heart health</a><a href="#faq">FAQs</a><a href="#request">Contact</a></div>
        </div>
        <div className="shell footer-bottom"><p>© 2026 {formalClinicName}. All rights reserved.</p><p>General information only. Not an emergency service.</p></div>
      </footer>
    </main>
  );
}
