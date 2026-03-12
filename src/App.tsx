import { useState, useEffect, useRef } from "react";

const COLORS = {
  cream: "#f5f0e8",
  ink: "#1a1612",
  rust: "#c0522a",
  rustLight: "#e8926a",
  warmGrey: "#8a7f76",
  border: "#d9d0c3",
  cardBg: "#faf7f2",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #f5f0e8; overflow-x: hidden; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.93); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes revealUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Responsive utility classes */
  .hero-section, .about-grid, .exp-grid, .skills-grid, .edu-grid, .extra-grid {
    display: grid;
  }
  
  .mobile-menu-btn {
    display: none !important;
  }
  
  .contact-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    .hero-section { 
      grid-template-columns: 1fr !important; 
      min-height: auto !important;
    }
    .hero-section > div:first-child {
      order: 1; /* Text comes first on mobile */
    }
    .hero-section > div:last-child {
      order: 2; /* Image comes second on mobile */
      padding-top: 1rem !important;
      padding-bottom: 2rem !important;
    }
    .about-stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .about-grid { grid-template-columns: 1fr !important; }
    .exp-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
    .skills-grid { grid-template-columns: 1fr !important; }
    .edu-grid { grid-template-columns: 1fr !important; }
    .extra-grid { grid-template-columns: 1fr !important; }
    .mobile-menu-btn { display: block !important; }
    .nav-links { display: none !important; }
    .floating-chip { 
      position: static !important;
      display: inline-block !important;
      margin: 0.3rem !important;
      animation: none !important;
    }
    .contact-links {
      flex-direction: column;
      align-items: stretch;
    }
    .contact-links a {
      width: 100% !important;
    }
  }
  
  @media (max-width: 480px) {
    h1 {
      font-size: 2.5rem !important;
    }
    h2 {
      font-size: 1.8rem !important;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .extra-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
`;

// ── Hook: reveal on scroll ──
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}

function Reveal({ children, delay = 0, style = {} }: RevealProps) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── DATA ──
const experience = [
  {
    date: "Nov 2025 – Feb 2026",
    company: "Cochlear Limited",
    role: "Software Engineering Intern",
    bullets: [
      "Built customer-facing applications in .NET Maui connecting Cochlear users to their hearing devices",
      "Coded against specific global requirements ensuring regional compliance across international markets",
    ],
  },
  {
    date: "Jan 2025 – Jul 2025",
    company: "Macquarie Group",
    role: "Software Engineering Intern",
    bullets: [
      "Worked in Market Risk, updating and consolidating multiple legacy systems",
      "Developed micro frontend components with a strong focus on accessibility",
      "Used Java to build backend functionality integrated with frontend layers",
    ],
  },
  {
    date: "Jul 2023 – Dec 2023",
    company: "Commonwealth Bank (CBA)",
    role: "Software Engineering Intern",
    bullets: [
      "Worked with the Model Experimentation team in the Advanced Data Capabilities crew",
      "Authored Terraform scripts to automate deployment of model objects into Snowflake",
    ],
  },
  {
    date: "Mar 2023 – Jun 2023",
    company: "ASX",
    role: "Junior Software Engineer",
    bullets: [
      "Built and iterated on an internal GUI in ReactJS using Bamboo, Bitbucket, and Git",
      "Shipped interactive pages with download buttons and colour-coded system indicators",
    ],
  },
  {
    date: "Nov 2022 – Feb 2023",
    company: "ASX",
    role: "Software Engineering Intern",
    bullets: [
      "Collaborated across multiple teams to develop cross-functional technical skills",
      "Created GUI for internal systems in ReactJS; maintained systems during active upgrades",
    ],
  },
];

const skills = {
  Languages: ["Java", "Python", "JavaScript", "TypeScript", "ReactJS", "C#", ".NET Maui", "SQL", "Terraform"],
  "Tools & Platforms": ["AWS", "Snowflake", "Git", "Bitbucket", "Jira", "Confluence", "Bamboo", "Visual Studio", "VS Code"],
  Practices: ["CI/CD", "Agile", "Spring Boot", "OAuth / JWT", "Accessibility", "Micro Frontends", "Cloud Infrastructure"],
};

const extras = [
  {
    title: "Mechsoc",
    role: "Industry Relations & Sponsorships Executive · Oct 2024 – Dec 2025",
    desc: "Coordinated sponsorships with engineering companies. Organised networking, technical and social events for student engagement.",
  },
  {
    title: "The Big Lift",
    role: "Participant → Crew Member → Operations Director · Jul 2022 – Oct 2024",
    desc: "200+ volunteer hours across 20+ events in NSW, VIC and QLD. Led teams and logistics for community pay-it-forward initiatives.",
  },
  {
    title: "College Union Program",
    role: "Pittwater House · Jan 2020 – Nov 2021",
    desc: "Mentored junior students on academics, wellbeing and school life. Planned and ran tailored activities across year groups.",
  },
];

// ── COMPONENTS ──

function Nav({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["about", "experience", "skills", "education", "contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.2rem clamp(1rem, 5vw, 3rem)",
      background: scrolled ? "rgba(245,240,232,0.9)" : "rgba(245,240,232,0.7)",
      backdropFilter: "blur(14px)",
      borderBottom: `1px solid ${scrolled ? COLORS.border : "transparent"}`,
      transition: "all 0.3s ease",
    }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(0.7rem, 2vw, 0.82rem)", letterSpacing: "0.12em", color: COLORS.rust }}>
        IB / Portfolio
      </span>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
          zIndex: 101,
        }}
        className="mobile-menu-btn"
      >
        <div style={{ width: 24, height: 2, background: COLORS.ink, marginBottom: 5, transition: "all 0.3s" }} />
        <div style={{ width: 24, height: 2, background: COLORS.ink, marginBottom: 5, transition: "all 0.3s" }} />
        <div style={{ width: 24, height: 2, background: COLORS.ink, transition: "all 0.3s" }} />
      </button>
      {/* Desktop menu */}
      <ul className="nav-links" style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
        {links.map(link => (
          <li key={link}>
            <a href={`#${link}`} style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.72rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: active === link ? COLORS.rust : COLORS.warmGrey,
              textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = COLORS.rust}
              onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = active === link ? COLORS.rust : COLORS.warmGrey}
            >{link}</a>
          </li>
        ))}
      </ul>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(245,240,232,0.98)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          zIndex: 100,
        }}>
          {links.map(link => (
            <a key={link} href={`#${link}`} onClick={() => setMobileMenuOpen(false)} style={{
              fontFamily: "'DM Mono', monospace", fontSize: "1.2rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: active === link ? COLORS.rust : COLORS.warmGrey,
              textDecoration: "none",
            }}>{link}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const chips = [
    { label: "React · Java · Python", top: "18%", right: "7%", delay: "0s" },
    { label: "AWS · Snowflake · Terraform", bottom: "22%", left: "4%", delay: "1.5s" },
    { label: ".NET · TypeScript · SQL", top: "56%", right: "2%", delay: "0.8s" },
  ];
  return (
    <section className="hero-section" style={{
      minHeight: "100vh", gridTemplateColumns: "1fr 1fr",
      paddingTop: 70, background: COLORS.cream, overflow: "hidden",
    }}>
      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.rust, marginBottom: "1.5rem", animation: "fadeUp 0.7s 0.2s both" }}>
          Software Engineer · Sydney, AU
        </div>
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(3.2rem,5.5vw,5.2rem)", lineHeight: 1.05, fontWeight: 700, color: COLORS.ink, animation: "fadeUp 0.7s 0.35s both" }}>
          Imogen<br /><em style={{ color: COLORS.rust, fontStyle: "normal" }}>Barnes</em>
        </h1>
        <p style={{ marginTop: "1.8rem", fontSize: "1.02rem", color: COLORS.warmGrey, maxWidth: "38ch", lineHeight: 1.7, animation: "fadeUp 0.7s 0.5s both" }}>
          UTS Software Engineering student with hands-on experience at ASX, CBA, Macquarie &amp; Cochlear. Passionate about AI and meaningful tech.
        </p>
        <div style={{ marginTop: "2.8rem", animation: "fadeUp 0.7s 0.65s both" }}>
          <div style={{ display: "inline-block", width: "100%", maxWidth: "500px" }}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <BtnFilled href="#experience">View Experience</BtnFilled>
              <BtnOutline href="#contact">Get In Touch</BtnOutline>
            </div>
            <a href="/Imogen_Barnes_CV.pdf" download style={{
              display: "block",
              padding: "0.85rem 0",
              fontFamily: "'DM Mono', monospace", 
              fontSize: "0.76rem", 
              letterSpacing: "0.1em", 
              textTransform: "uppercase",
              textDecoration: "none",
              textAlign: "center",
              background: COLORS.warmGrey,
              color: COLORS.cream,
              border: `1.5px solid ${COLORS.warmGrey}`,
              transition: "all 0.22s",
            }}
            onMouseEnter={e => {
              (e.target as HTMLAnchorElement).style.background = COLORS.ink;
              (e.target as HTMLAnchorElement).style.borderColor = COLORS.ink;
            }}
            onMouseLeave={e => {
              (e.target as HTMLAnchorElement).style.background = COLORS.warmGrey;
              (e.target as HTMLAnchorElement).style.borderColor = COLORS.warmGrey;
            }}
          >Download CV</a>
          </div>
        </div>
      </div>
      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem)", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{
          width: "min(360px, 80vw)", height: "min(360px, 80vw)",
          borderRadius: "50% 40% 55% 45% / 45% 55% 40% 50%",
          background: `linear-gradient(135deg, ${COLORS.rust} 0%, ${COLORS.rustLight} 60%, #f0c9a8 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "fadeIn 1s 0.4s both",
          position: "relative",
          flexShrink: 0,
          overflow: "hidden",
          padding: "1rem",
        }}>
          {/* spinning ring */}
          <div style={{
            position: "absolute", inset: -14,
            borderRadius: "inherit",
            border: `1.5px dashed ${COLORS.rust}`,
            opacity: 0.4,
            animation: "spin 22s linear infinite",
          }} />
          <img 
            src="/eportfolio/headshot.jpg" 
            alt="Imogen Barnes" 
            style={{ 
              width: "100%", 
              height: "100%", 
              borderRadius: "50% 40% 55% 45% / 45% 55% 40% 50%",
              objectFit: "cover",
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.1)",
            }} 
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", maxWidth: "100%" }}>
          {chips.map((c, i) => (
            <div key={i} className="floating-chip" style={{
              position: "absolute", ...c,
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.border}`,
              padding: "0.6rem 1rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.07em",
              color: COLORS.ink,
              animation: `float 4s ${c.delay} ease-in-out infinite`,
            }}>{c.label}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BtnFilled({ href, children }: { href: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{
      padding: "0.85rem 2rem",
      fontFamily: "'DM Mono', monospace", fontSize: "0.76rem", letterSpacing: "0.1em", textTransform: "uppercase",
      textDecoration: "none",
      background: hov ? COLORS.ink : COLORS.rust,
      color: COLORS.cream,
      border: `1.5px solid ${hov ? COLORS.ink : COLORS.rust}`,
      transition: "all 0.22s",
      display: "inline-block",
      textAlign: "center",
      flex: "1 1 auto",
      whiteSpace: "nowrap",
    }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</a>
  );
}
function BtnOutline({ href, children }: { href: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{
      padding: "0.85rem 2rem",
      fontFamily: "'DM Mono', monospace", fontSize: "0.76rem", letterSpacing: "0.1em", textTransform: "uppercase",
      textDecoration: "none",
      background: hov ? COLORS.ink : "transparent",
      color: hov ? COLORS.cream : COLORS.ink,
      border: `1.5px solid ${COLORS.ink}`,
      transition: "all 0.22s",
      display: "inline-block",
      textAlign: "center",
      flex: "1 1 auto",
      whiteSpace: "nowrap",
    }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</a>
  );
}

function SectionLabel({ n, text }: { n: string; text: string }) {
  return <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.rust, marginBottom: "0.7rem" }}>{n} / {text}</div>;
}
function SectionTitle({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1.9rem,3.2vw,2.8rem)", fontWeight: 700, lineHeight: 1.1, color: light ? COLORS.cream : COLORS.ink, marginBottom: "3rem" }}>{children}</h2>;
}

function About() {
  const stats = [
    { num: "4", label: "Industry Internships" },
    { num: "HD", label: "WAM at UTS" },
    { num: "200+", label: "Volunteer Hours" },
    { num: "4", label: "Top-tier Companies" },
  ];
  return (
    <section id="about" style={{ background: COLORS.ink, padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)" , }}>
      <SectionLabel n="01" text="About" />
      <SectionTitle light>Building things that have an impact.</SectionTitle>
      <div className="about-grid" style={{ gridTemplateColumns: "1.2fr 1fr", gap: "clamp(2rem, 5vw, 5rem)", alignItems: "start" }}>
        <Reveal>
          <div>
            {[
              "I'm a diligent, resilient and adaptable Women in Engineering and IT Co-op Scholar studying a Bachelor of Engineering (Honours) in Software at UTS, graduating November 2026.",
              "Across four internships at some of Australia's most respected organisations, I've shipped real-world software in fintech, healthcare, and infrastructure. From automating cloud deployments at CBA to building accessibility-first micro frontends at Macquarie.",
              "I'm passionate about leveraging AI and technical innovation to solve complex problems, and I'm always seeking collaborative environments that drive meaningful impact.",
            ].map((p, i) => (
              <p key={i} style={{ color: "#b8afa6", fontSize: "1.02rem", lineHeight: 1.75, marginBottom: "1.2rem" }}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="about-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.2rem"}}>
            {stats.map(s => (
              <div key={s.label} style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "1.5rem", background: "rgba(255,255,255,0.04)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "2.6rem", fontWeight: 700, color: COLORS.rustLight, lineHeight: 1, }}>{s.num}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", color: "#6a6560", marginTop: "0.4rem", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="experience" style={{ background: COLORS.cream, padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)" }}>
      <SectionLabel n="02" text="Experience" />
      <SectionTitle>Where I've worked.</SectionTitle>
      <div>
        {experience.map((e, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="exp-grid"
              style={{
                gridTemplateColumns: "200px 1fr", gap: "clamp(1.5rem, 4vw, 3rem)",
                padding: "2.5rem 0",
                borderTop: `1px solid ${COLORS.border}`,
                borderBottom: i === experience.length - 1 ? `1px solid ${COLORS.border}` : "none",
                background: hovered === i ? "rgba(192,82,42,0.04)" : "transparent",
                transition: "background 0.2s",
              }}
            >
              <div style={{ paddingTop: "0.2rem" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.08em", color: COLORS.warmGrey }}>{e.date}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", fontWeight: 500, color: COLORS.rust, marginTop: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{e.company}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.8rem", lineHeight: 1.3 }}>{e.role}</div>
                <ul style={{ listStyle: "none" }}>
                  {e.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: "0.9rem", color: COLORS.warmGrey, padding: "0.3rem 0", paddingLeft: "1.3rem", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.rust, fontSize: "0.78rem" }}>→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const [hovTag, setHovTag] = useState<string | null>(null);
  return (
    <section id="skills" style={{ background: COLORS.cardBg, padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
      <SectionLabel n="03" text="Skills" />
      <SectionTitle>What I work with.</SectionTitle>
      <Reveal>
        <div className="skills-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "2.5rem" }}>
          {Object.entries(skills).map(([group, tags]) => (
            <div key={group}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.rust, marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: `1px solid ${COLORS.border}` }}>
                {group}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {tags.map(tag => {
                  const key = `${group}-${tag}`;
                  return (
                    <span key={tag}
                      onMouseEnter={() => setHovTag(key)}
                      onMouseLeave={() => setHovTag(null)}
                      style={{
                        fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
                        padding: "0.4rem 0.9rem",
                        border: `1px solid ${hovTag === key ? COLORS.rust : COLORS.border}`,
                        color: hovTag === key ? COLORS.rust : COLORS.ink,
                        background: COLORS.cream,
                        transition: "all 0.2s",
                        cursor: "default",
                      }}>{tag}</span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Education() {
  const edu = [
    {
      school: "University of Technology Sydney",
      degree: "Bachelor of Engineering (Software) Honours + Diploma of Professional Engineering Practice",
      date: "Mar 2022 – Nov 2026 (Expected)",
      highlights: [
        "Women in Engineering and IT Co-operative Scholarship recipient",
        "High Distinction Weighted Average Mark (WAM)",
        "Global exchange at Bath Spa University, UK (Sep 2024 – Jan 2025)",
        "Deans List Award Recipient, 2025"
      ],
    },
    {
      school: "Pittwater House",
      degree: "NSW Higher School Certificate",
      date: "Jan 2016 – Dec 2021",
      highlights: [
        "School Prefect and House Captain, 2021",
        "Brighton College Ex-student Prize for Diligence, Initiative, Leadership & Sportsmanship",
      ],
    },
  ];
  return (
    <section id="education" style={{ background: COLORS.cream, padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)" }}>
      <SectionLabel n="04" text="Education" />
      <SectionTitle>Where I've studied.</SectionTitle>
      <div className="edu-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {edu.map((e, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.border}`, padding: "2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: COLORS.rust }} />
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.18rem", fontWeight: 700, marginBottom: "0.4rem" }}>{e.school}</div>
              <div style={{ fontSize: "0.87rem", color: COLORS.warmGrey, marginBottom: "0.8rem" }}>{e.degree}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em", color: COLORS.rust, marginBottom: "1rem" }}>{e.date}</div>
              <ul style={{ listStyle: "none" }}>
                {e.highlights.map((h, j) => (
                  <li key={j} style={{ fontSize: "0.84rem", color: COLORS.warmGrey, padding: "0.22rem 0", paddingLeft: "1.1rem", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: COLORS.rust, fontSize: "0.5rem", top: "0.38rem" }}>✦</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Extra() {
  return (
    <section id="extra" style={{ background: COLORS.ink, padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)" }}>
      <SectionLabel n="05" text="Beyond Work" />
      <SectionTitle light>Leadership &amp; community.</SectionTitle>
      <div className="extra-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        {extras.map((e, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <ExtraCard {...e} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ExtraCard({ title, role, desc }: { title: string; role: string; desc: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "2rem",
        background: hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
        transition: "background 0.25s",
        height: "100%",
      }}
    >
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: COLORS.cream, marginBottom: "0.3rem" }}>{title}</div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em", color: COLORS.rustLight, marginBottom: "1rem", textTransform: "uppercase" }}>{role}</div>
      <div style={{ fontSize: "0.87rem", color: "#7a726a", lineHeight: 1.65 }}>{desc}</div>
    </div>
  );
}

function Contact() {
  const links = [
    { label: "Email", href: "mailto:Imogenbarnes04@outlook.com", icon: "/eportfolio/email-icon.png" },
    { label: "LinkedIn", href: "https://linkedin.com/in/imogen-barnes", icon: "/eportfolio/linkedin-icon.png" },
    { label: "0428 085 772", href: "tel:0428085772", icon: "/eportfolio/phone-icon.png" },
  ];
  return (
    <section id="contact" style={{ background: COLORS.cream, padding: "clamp(3.5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)", textAlign: "center" }}>
      <SectionLabel n="06" text="Contact" />
      <SectionTitle>Let's connect.</SectionTitle>
      <p style={{ color: COLORS.warmGrey, fontSize: "1rem", marginBottom: "3rem", maxWidth: "44ch", margin: "0 auto 3rem" }}>
        Open to graduate roles, collaborations, and interesting problems. Feel free to reach out.
      </p>
      <Reveal>
        <div className="contact-links" style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          {links.map(l => <ContactLink key={l.label} {...l} />)}
        </div>
      </Reveal>
    </section>
  );
}

function ContactLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'DM Mono', monospace", fontSize: "0.76rem", letterSpacing: "0.1em", textTransform: "uppercase",
        color: hov ? COLORS.rust : COLORS.ink,
        textDecoration: "none",
        padding: "1rem 2rem",
        border: `1.5px solid ${hov ? COLORS.rust : COLORS.border}`,
        transition: "all 0.22s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
      }}>
      <img src={icon} alt="" style={{ width: "20px", height: "20px", objectFit: "contain" }} /> {label}
    </a>
  );
}

// ── APP ──
export default function App() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const ids = ["about", "experience", "skills", "education", "contact"];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveSection(id); }, { threshold: 0.4 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, lineHeight: 1.6, background: COLORS.cream, color: COLORS.ink }}>
        <Nav active={activeSection} />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Extra />
        <Contact />
        <footer style={{ background: COLORS.ink, color: "#3a342e", textAlign: "center", padding: "2rem", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em" }}>
          © 2026 Imogen Barnes · Built with React
        </footer>
      </div>
    </>
  );
}