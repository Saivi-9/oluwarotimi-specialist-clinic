const learningPaths = [
  { number: '01', title: 'Understand your heart health', description: 'Start with a clear overview of common risk factors, symptoms and questions worth discussing at a consultation.', href: '#heart-health' },
  { number: '02', title: 'Explore heart conditions', description: 'Plain-language introductions to common heart concerns, arranged so patients can find a useful starting point.', href: '#conditions' },
  { number: '03', title: 'Learn about tests', description: 'Know what a cardiology assessment may involve and how to arrive prepared for an informed conversation.', href: '#tests' },
  { number: '04', title: 'Prepare for your visit', description: 'A short checklist for bringing previous results, medication information and the questions that matter to you.', href: '#visit' },
];

const conditionTopics = [
  ['Heart rhythm concerns', 'Palpitations, irregular rhythms and questions about atrial fibrillation.'],
  ['Blood pressure', 'Understanding high blood pressure and its relationship with heart health.'],
  ['Chest discomfort', 'When symptoms need assessment and why urgent symptoms need urgent help.'],
  ['Coronary artery disease', 'Information on risk, prevention and the questions patients commonly ask.'],
  ['Heart valve conditions', 'A patient-friendly starting point for learning about valve problems.'],
  ['Heart failure', 'General information for patients and families navigating a diagnosis.'],
];

const visitSteps = [
  ['Bring a medication list', 'Include prescriptions, supplements and doses if possible.'],
  ['Bring previous results', 'ECGs, scans, blood-test results, discharge notes and referral letters can help.'],
  ['Write down your questions', 'Note symptoms, when they happen and what you want to understand.'],
];

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <div className="urgent-bar">
        <div className="shell urgent-bar__inner">
          <span className="urgent-dot" aria-hidden="true" />
          <p><strong>Emergency notice:</strong> If you think you may be having a medical emergency, contact local emergency services immediately. This website is not an emergency service.</p>
        </div>
      </div>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="CardioCare Clinic home">
            <span className="brand-mark" aria-hidden="true">C</span>
            <span><strong>CardioCare</strong><small>Cardiology clinic</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#heart-health">Heart health</a>
            <a href="#conditions">Conditions</a>
            <a href="#tests">Tests &amp; visits</a>
            <a href="#about">About the consultant</a>
          </nav>
          <a className="header-cta" href="#contact">Contact the clinic</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="shell hero-grid" id="main-content">
          <div className="hero-copy">
            <p className="eyebrow">CARDIOLOGY INFORMATION &amp; CONSULTATIONS</p>
            <h1>Clear information for every step of your heart-health journey.</h1>
            <p className="hero-intro">A calm place to understand common heart concerns, prepare for a cardiology consultation and find the next appropriate step.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#heart-health">Explore heart health</a>
              <a className="text-link" href="#contact">Contact the clinic <span aria-hidden="true">→</span></a>
            </div>
            <p className="hero-note">General information only. It does not replace personal medical advice.</p>
          </div>
          <div className="hero-art" aria-label="A calm abstract heart-health illustration" role="img">
            <div className="hero-art__ring hero-art__ring--one" />
            <div className="hero-art__ring hero-art__ring--two" />
            <div className="hero-art__heart" aria-hidden="true"><span /></div>
            <div className="hero-art__caption"><span>Patient-first</span><strong>Cardiology care, explained clearly</strong></div>
          </div>
        </div>
      </section>

      <section className="pathways-section" id="heart-health">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">START HERE</p><h2>Find the information that helps you move forward.</h2></div>
            <p>Built around the questions people ask before, during and after a cardiology consultation.</p>
          </div>
          <div className="pathways-grid">
            {learningPaths.map((path) => (
              <a className="pathway-card" href={path.href} key={path.number}>
                <span className="pathway-card__number">{path.number}</span><h3>{path.title}</h3><p>{path.description}</p><span className="card-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="conditions-section" id="conditions">
        <div className="shell conditions-layout">
          <div className="section-heading">
            <p className="eyebrow">HEART CONDITIONS</p><h2>Useful information, in plain language.</h2>
            <p>These are general educational starting points. Final clinic content should be reviewed and approved by the consultant before publication.</p>
            <a className="text-link" href="#contact">Ask about a consultation <span aria-hidden="true">→</span></a>
          </div>
          <div className="condition-list">
            {conditionTopics.map(([title, description]) => (
              <details className="condition-item" key={title}>
                <summary><span>{title}</span><span className="summary-icon" aria-hidden="true">+</span></summary>
                <p>{description}</p><a href="#contact">Discuss this with the clinic</a>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="tests-section" id="tests">
        <div className="shell tests-layout">
          <div className="tests-card">
            <p className="eyebrow">BEFORE A CARDIOLOGY VISIT</p><h2>Good preparation makes space for better questions.</h2>
            <p>Every appointment is different. The clinic can confirm what is relevant for your consultation when you get in touch.</p>
            <a className="button button--light" href="#visit">See the preparation checklist</a>
          </div>
          <div className="tests-list">
            <div><span className="large-number">01</span><h3>Consultation</h3><p>Discuss your concerns, health history and the most suitable next steps with a cardiologist.</p></div>
            <div><span className="large-number">02</span><h3>Assessment</h3><p>Some patients may need an examination, review of existing results or further assessment.</p></div>
            <div><span className="large-number">03</span><h3>Follow-up</h3><p>Leave with a clearer understanding of the plan and how to arrange next steps where needed.</p></div>
          </div>
        </div>
      </section>

      <section className="visit-section" id="visit">
        <div className="shell">
          <div className="section-heading centered-heading"><p className="eyebrow">PREPARE FOR YOUR VISIT</p><h2>A few things to bring along.</h2></div>
          <div className="visit-grid">
            {visitSteps.map(([title, description], index) => (
              <article className="visit-card" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
          <div className="visit-note"><strong>Tip:</strong> If your symptoms become severe, sudden or worrying, do not wait for a routine appointment. Contact local emergency services.</div>
        </div>
      </section>

      <section className="consultant-section" id="about">
        <div className="shell consultant-grid">
          <div className="consultant-image" aria-label="Placeholder for consultant portrait" role="img"><div className="consultant-image__silhouette" aria-hidden="true" /><p>Consultant portrait<br />to be added</p></div>
          <div className="consultant-copy">
            <p className="eyebrow">ABOUT THE CONSULTANT</p><h2>Personal specialist care starts with a good conversation.</h2>
            <p>This section will introduce Dr. [Name], including professional qualifications, areas of cardiology expertise, clinic approach and languages spoken.</p>
            <p>Add only verified credentials, an approved biography and a high-quality professional portrait before launch.</p>
            <a className="text-link" href="#contact">Contact the clinic <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="shell contact-card">
          <div><p className="eyebrow">CONTACT THE CLINIC</p><h2>Ready to speak with the team?</h2><p>Clinic phone number, address, hours and appointment instructions will be confirmed here.</p></div>
          <div className="contact-actions"><a className="button button--coral" href="mailto:clinic@example.com">Email the clinic</a><span>Phone number to be added</span></div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-top">
          <a className="brand brand--footer" href="#top"><span className="brand-mark" aria-hidden="true">C</span><span><strong>CardioCare</strong><small>Cardiology clinic</small></span></a>
          <div className="footer-links"><a href="#heart-health">Heart health</a><a href="#conditions">Conditions</a><a href="#visit">Patient guide</a><a href="#contact">Contact</a></div>
        </div>
        <div className="shell footer-bottom"><p>© 2026 CardioCare Clinic. Draft website; clinic details to be confirmed.</p><p>General information only. Not for emergencies.</p></div>
      </footer>
    </main>
  );
}
