import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { useForm, ValidationError } from "@formspree/react";
import { profile, projects, techStack } from "./content";
import "./styles.css";
import DescentBackground from "./DescentBackground";
import NetworkBackground from "./NetworkBackground";
import PageLoader from "./PageLoader";
function Arrow({ diagonal = false }) {
  return <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Brand({ navbar = false }) {
  return <a className="brand" href="/" aria-label={`${profile.name} home`}>{profile.name.toLowerCase()}{navbar ? "." : ""}</a>;
}
const nav = [["Home", "/", Home], ["About", "/about/", About], ["Projects", "/projects/", Projects], ["Blog", "/blog/", Blog], ["Contact", "/contact/", Contact]];
function NavIcon({ index }) {
  const paths = ["M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z", "M5 21v-2a7 7 0 0 1 14 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z", "M3 7h7l2 3h9v10H3ZM3 7V4h7l2 3h9v3", "M5 3h14v18H5ZM8 7h8M8 11h8M8 15h5", "M3 5h18v14H3ZM3 6l9 7 9-7"];
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d={paths[index]} /></svg>;
}
function Header({ path }) {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(() => window.scrollY < 80);
  const [nearTop, setNearTop] = useState(false);
  const [focused, setFocused] = useState(false);
  const visible = atTop || nearTop || focused || open;
  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY < 80);
      if (window.scrollY >= 80) setNearTop(false);
    };
    const onPointerMove = (event) => {
      if (event.pointerType !== "touch") setNearTop(event.clientY < 112);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);
  const current = nav.findIndex(([, url]) => url === "/" ? path === "/" : path === url.slice(0, -1) || path.startsWith(url));
  const [clicked, setClicked] = useState(null);
  const navigationTimer = useRef(null);
  const navRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const selected = clicked ?? current;
  useLayoutEffect(() => {
    const root = navRef.current;
    function measure() {
      const link = root?.querySelectorAll("a")[selected];
      if (link) setMarker({ x: link.offsetLeft, y: link.offsetTop, width: link.offsetWidth, height: link.offsetHeight });
      else setMarker(null);
    }
    measure();
    const observer = new ResizeObserver(measure);
    if (root) observer.observe(root);
    let mounted = true;
    document.fonts?.ready.then(() => {
      if (mounted) measure();
    });
    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, [selected, open]);
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      clearTimeout(navigationTimer.current);
    };
  }, []);
  function selectLink(event, index, url) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setClicked(index);
    clearTimeout(navigationTimer.current);
    if (path.replace(/\/$/, "") === url.replace(/\/$/, "")) {
      setOpen(false);
      return;
    }
    const delay = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 240;
    navigationTimer.current = setTimeout(() => window.location.assign(url), delay);
  }
  return <><div className={path === "/" ? "header-space home-header-space" : "header-space"} aria-hidden="true" />
    <button className={visible ? "nav-reveal" : "nav-reveal is-available"} aria-label="Show navigation" onPointerEnter={() => setNearTop(true)} onFocus={() => setNearTop(true)} onClick={() => setNearTop(true)}><span>Show navigation <span aria-hidden="true">⌄</span></span></button>
    <header className={visible ? "site-header" : "site-header is-hidden"} data-visible={visible} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  }}><div className="container header-inner">
    <Brand navbar />
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav">
      {open ? "Close" : "Menu"}<span className={open ? "menu-lines is-open" : "menu-lines"} aria-hidden="true"><i /><i /></span>
    </button>
    <nav ref={navRef} id="main-nav" className={open ? "nav open" : "nav"} aria-label="Main navigation">
      {marker && <span className="nav-marker" aria-hidden="true" style={{ width: marker.width, height: marker.height, transform: `translate3d(${marker.x}px, ${marker.y}px, 0)` }} />}
      {nav.map(([label, url], index) => <a key={url} href={url} className={selected === index ? "nav-selected" : ""} aria-current={current === index && (index !== 0 || path === "/") ? "page" : void 0} onClick={(event) => selectLink(event, index, url)}><NavIcon index={index} /><span>{label}</span></a>)}
    </nav>
  </div></header></>;
}
function SocialIcon({ name }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {name === "Email" ? <><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="m4 6 8 7 8-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></> : name === "Instagram" ? <><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></> : name === "LinkedIn" ? <><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" /><circle cx="7.5" cy="8" r="1.2" fill="currentColor" /><path d="M7.5 11v6M11.5 17v-6m0 2.5c0-3.5 5-3.5 5 0V17" stroke="currentColor" strokeWidth="1.7" /></> : <path fill="currentColor" d="M12 .8a11.3 11.3 0 0 0-3.57 22.02c.56.1.77-.24.77-.54v-2.1c-3.14.69-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.72 2.64 1.22 3.29.93.1-.73.4-1.22.72-1.5-2.51-.29-5.15-1.26-5.15-5.58 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.1 1.16A10.8 10.8 0 0 1 12 6.27c.96 0 1.93.13 2.83.38 2.15-1.46 3.1-1.16 3.1-1.16.61 1.56.23 2.71.11 3 .72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.29-5.16 5.57.41.35.77 1.04.77 2.1v3.09c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .8Z" />}
  </svg>;
}
const socials = [
  { name: "Instagram", key: "instagram", fallback: "https://www.instagram.com/" },
  { name: "LinkedIn", key: "linkedin", fallback: "https://www.linkedin.com/" },
  { name: "GitHub", key: "github", fallback: "https://github.com/" },
  { name: "Email", key: "email", fallback: "/contact/" }
];
function SocialLinks({ contact = false }) {
  return <ul className={contact ? "contact-social-list" : "footer-socials"}>{socials.map((social) => {
    const email = social.key === "email";
    const href = email ? profile.email ? `mailto:${profile.email}` : contact ? "#contact-form" : "/contact/" : profile[social.key] || social.fallback;
    return <li key={social.key}><a href={href} target={email ? void 0 : "_blank"} rel={email ? void 0 : "noreferrer"}><SocialIcon name={social.name} /><span>{social.name}</span><Arrow diagonal /></a></li>;
  })}</ul>;
}
function Footer() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-intro"><Brand /><p>Data Science Graduate Student at IISER Thiruvananthapuram.</p><span className="footer-location">{profile.location}</span></div>
      <div className="footer-column"><h2>Explore</h2><nav aria-label="Footer navigation">{nav.map(([label, url]) => <a href={url} key={url}>{label}</a>)}</nav></div>
      <div className="footer-column"><h2>Find me online</h2><SocialLinks /></div>
      <div className="footer-column footer-connect"><h2>Let’s make something.</h2><p>Have a project, opportunity, or an interesting question?</p><a href="/contact/" className="button footer-contact">Get in touch <Arrow diagonal /></a></div>
    </div>
    <div className="container footer-bottom"><span>© {( new Date()).getFullYear()} {profile.name}. All rights reserved.</span><span>Made with curiosity & React.</span><a href="#top">Back to top ↑</a></div>
  </footer>;
}
function PageHeading({ title, text }) {
  return <div className="page-heading"><h1>{title}</h1>{text && <p>{text}</p>}</div>;
}
function TechStack({ compact = false }) {
  return <ul className={compact ? "tech-stack compact" : "tech-stack"} aria-label="Technology stack">
    {techStack.map((tech) => <li key={tech.name}>
      <img src={tech.logo} alt="" width="32" height="32" loading="lazy" />
      <span>{tech.name}</span>
      {!compact && <small>{tech.use}</small>}
    </li>)}
  </ul>;
}
function ProjectVisual({ type, color, large = false }) {
  return <div className={`project-visual ${color} ${large ? "large" : ""}`} aria-hidden="true"><svg viewBox="0 0 400 220" fill="none"><defs><pattern id={`grid-${type}`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" stroke="currentColor" strokeOpacity=".1" /></pattern></defs><rect width="400" height="220" fill={`url(#grid-${type})`} />{type === "bars" ? <>{Array.from({ length: 38 }, (_, i) => {
    const h = 20 + Math.pow(Math.sin(i * 0.12 + 0.2), 2) * 93 + Math.sin(i * 1.8) * 17;
    return <rect key={i} x={30 + i * 9} y={176 - h} width="5" height={h} rx="1" fill="currentColor" opacity={i > 16 && i < 25 ? 0.9 : 0.4} />;
  })}<path d="M28 177H375" stroke="currentColor" strokeOpacity=".3" /></> : type === "scatter" ? <>{Array.from({ length: 105 }, (_, i) => {
    const cluster = i % 3;
    const x = 82 + cluster * 112 + Math.sin(i * 13.7) * (23 + i % 24);
    const y = 130 - cluster * 12 + Math.cos(i * 8.1) * (18 + i % 28);
    return <circle key={i} cx={x} cy={y} r={2.5 + i % 3 * 0.5} fill={cluster === 1 ? "#6b67b8" : "currentColor"} opacity={0.25 + i % 5 * 0.12} />;
  })}<path d="m43 177 315-120" stroke="currentColor" strokeDasharray="4 6" strokeOpacity=".3" /></> : <>{Array.from({ length: 28 }, (_, i) => {
    const x = 200 + Math.sin(i * 2.4) * (40 + i * 3.5);
    const y = 110 + Math.cos(i * 2.4) * (25 + i * 2);
    return <g key={i}><path d={`M200 110L${x} ${y}`} stroke="currentColor" strokeOpacity=".15" /><circle cx={x} cy={y} r={i % 4 === 0 ? 6 : 3} fill="currentColor" opacity={0.3 + i % 3 * 0.2} /></g>;
  })}<circle cx="200" cy="110" r="10" fill="currentColor" /></>}</svg></div>;
}
function Tags({ items }) {
  return <div className="tags">{items.map((tag) => <span key={tag}>{tag}</span>)}</div>;
}
function ProjectCard({ project }) {
  const href = `/projects/${project.id}.html`;
  return <article className="project-card"><a className="visual-button" href={href} aria-label={`Explore ${project.title}`}><ProjectVisual type={project.visual} color={project.color} /><span className="visual-arrow"><Arrow diagonal /></span></a><div className="project-meta"><span>Data analysis · Web application</span></div><h3><a className="text-button" href={href}>{project.title} <Arrow diagonal /></a></h3><p>{project.description}</p><Tags items={project.tags} /></article>;
}
function ProjectLinks({ project }) {
  return <><div className="project-actions">
    {project.githubUrl ? <a className="button dark" href={project.githubUrl} target="_blank" rel="noreferrer"><SocialIcon name="GitHub" />GitHub <Arrow diagonal /></a> : <button className="button dark" disabled title="Repository link has not been added yet"><SocialIcon name="GitHub" />GitHub <Arrow diagonal /></button>}
    {project.liveUrl ? <a className="button outline" href={project.liveUrl} target="_blank" rel="noreferrer">Live site <Arrow diagonal /></a> : <button className="button outline" disabled title="Live site link has not been added yet">Live site <Arrow diagonal /></button>}
  </div>{(!project.githubUrl || !project.liveUrl) && <p className="project-link-note">This project is a concept. Links will be available when it is published.</p>}</>;
}
function ProjectPage({ project }) {
  return <article className="container project-page">
    <a className="text-link back-link" href="/projects/">← All projects</a>
    <header className="project-page-heading"><h1>{project.title}</h1><p className="project-lede">{project.description}</p><Tags items={project.tags} /><ProjectLinks project={project} /></header>
    <ProjectVisual type={project.visual} color={project.color} large />
    <div className="project-narrative"><section><h2>The question</h2><p>{project.question}</p></section><section><h2>The approach</h2><p>{project.approach}</p></section><section><h2>The takeaway</h2><p>{project.takeaway}</p></section></div>
    <div className="project-page-bottom"><a className="text-link" href="/projects/">Explore more projects <Arrow /></a><a className="text-link" href="/contact/">Discuss an idea <Arrow diagonal /></a></div>
  </article>;
}
function BlogComingSoon() {
  return <div className="empty-state"><h2>Coming soon</h2></div>;
}
function CTA() {
  return <section className="contact-strip container"><div><h2>Have a question worth <em>exploring?</em></h2></div><a href="/contact/" className="button dark">Let’s talk <Arrow diagonal /></a></section>;
}
function Home() {
  return <><section className="hero">
  <div className="hero-landscape-stage" aria-hidden="true"><DescentBackground /></div>
  <div className="hero-copy">
    <h1 className="hero-greeting">Hello! I’m <strong>{profile.name}.</strong></h1>
    <p className="hero-statement">Data Science @ <em>IISER Thiruvananthapuram</em></p>
  </div>
  <div className="hero-bottom">
    <p className="hero-intro">A data science student building things,<br className="desktop-break" /> and trying to making sense of data.</p>
    <div className="hero-actions"><a className="button dark" href="/projects/">Explore my work <Arrow diagonal /></a><a className="text-link" href="/about/">Get to know me <Arrow /></a></div>
  </div>
</section><div className="skill-band"><div className="container"><h2 className="toolkit-title">My toolkit</h2><TechStack compact /></div></div><section className="section container"><div className="section-heading"><div><h2>Making sense of <em>data.</em></h2></div><a className="text-link" href="/projects/">All projects <Arrow /></a></div><div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div></section><section className="about-preview"><div className="container about-preview-inner"><div><h2>A curious mind,<br /><em>with the thirst to learn more.</em></h2><p>{profile.intro}</p><a className="text-link" href="/about/">More about my journey <Arrow /></a></div></div></section><section className="section container home-posts"><div className="section-heading"><div><h2>Thoughts in <em>progress.</em></h2></div><a className="text-link" href="/blog/">Blog<Arrow /></a></div><BlogComingSoon /></section><CTA /></>;
}
function About() {
  return <><section className="container"><PageHeading title={<>Hello, I am <em>Pranav Manoj!</em></>} /><div className="about-layout"><div className="profile-art"><div className="profile-monogram">{profile.name[0]}<span>.</span></div></div><div className="about-story"><h2>Where data meets<br /><em>biology.</em></h2><p>I am a fourth-year integrated BS-MS Data Science student at IISER Thiruvananthapuram, currently working with deep generative models in healthcare, particularly for medical image synthesis. I am interested in applying AI and machine learning to biology and biomedicine.</p><p>I am also an INSPIRE-SHE Scholar, supported by the Department of Science and Technology, Government of India.</p><p>Beyond data science, I enjoy exploring web development. I’m still a beginner, learning and improving one step at a time.</p><div className="location"><span className="status-dot" />{profile.location}</div><a href={profile.cv} className="button dark" download="Pranav-CV.pdf">Download my CV <span aria-hidden="true">↓</span></a></div></div></section><section className="section container"><div className="section-heading"><div><h2>What I’m exploring.</h2></div></div><div className="interests-grid">{[
    ["Data & machine learning", "Finding patterns, evaluating models, and making complex information easier to understand."],
    ["Software & interfaces", "Connecting code and design to build useful things that people can explore and understand."],
    ["Biomedical & Biological AI", "Exploring how computational methods can help investigate questions about living systems."]
  ].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="toolkit-section"><div className="container toolkit-layout"><div><h2>Always adding<br /><em>new dimensions.</em></h2><p>Here’s the list of what I know, and the list that I wish to keep updating.</p></div><TechStack /></div></section><CTA /></>;
}
function Projects() {
  return <><section className="container projects-page"><PageHeading title={<>Projects and <em>Internships</em></>} text="A collection of all the projects I have done so far." /><div className="project-grid">{projects.map(project => <ProjectCard key={project.id} project={project} />)}</div></section><CTA /></>;
}

function Blog() {
  return <section className="container blog-page"><PageHeading title={<>Notes from<br /><em>the field.</em></>} /><BlogComingSoon /></section>;
}
const FORM_ID = "mnpplapk";
function Contact() {
  const [state, handleSubmit, reset] = useForm(FORM_ID);
  const successRef = useRef(null);
  useEffect(() => {
    if (state.succeeded) successRef.current?.focus();
  }, [state.succeeded]);
  return <section className="container contact-page contact-centered">
    <PageHeading title={<>Let’s <em>talk.</em></>} text="A project, an opportunity, or an interesting question. I’d love to hear from you." />
    <div className="contact-layout">
    <div className="contact-form-wrap" id="contact-form">
      {state.succeeded ? <div className="contact-success" role="status" tabIndex={-1} ref={successRef}>
        <div className="success-check" aria-hidden="true">✓</div><h2>Message sent.</h2><p>Thanks for reaching out. I’ll get back to you soon.</p><button className="button dark" type="button" onClick={reset}>Send another message <Arrow /></button>
      </div> : <form action={`https://formspree.io/f/${FORM_ID}`} method="POST" onSubmit={handleSubmit} className="contact-form" aria-label="Contact Pranav" aria-busy={state.submitting}>
        <fieldset disabled={state.submitting}>
          <div className="form-row">
            <div className="form-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" required minLength={2} maxLength={100} name="name" autoComplete="name" placeholder="Your name" aria-describedby={state.errors?.getFieldErrors("name").length ? "name-error" : void 0} aria-invalid={state.errors?.getFieldErrors("name").length > 0 || void 0} /><ValidationError id="name-error" field="name" prefix="Name" errors={state.errors} className="field-error" /></div>
            <div className="form-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" required type="email" maxLength={254} name="email" autoComplete="email" placeholder="you@example.com" aria-describedby={state.errors?.getFieldErrors("email").length ? "email-error" : void 0} aria-invalid={state.errors?.getFieldErrors("email").length > 0 || void 0} /><ValidationError id="email-error" field="email" prefix="Email" errors={state.errors} className="field-error" /></div>
          </div>

          <div className="form-field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" required minLength={10} maxLength={5000} name="message" rows={6} placeholder="Tell me a little about what you’re thinking…" aria-describedby={state.errors?.getFieldErrors("message").length ? "message-error" : void 0} aria-invalid={state.errors?.getFieldErrors("message").length > 0 || void 0} /><ValidationError id="message-error" field="message" prefix="Message" errors={state.errors} className="field-error" /></div>
          {state.errors?.getFormErrors().length > 0 && <div className="form-error-summary" role="alert"><p className="field-error">Your message couldn’t be sent. Please try again.</p><ValidationError errors={state.errors} className="field-error" /></div>}
          <button className="button dark contact-submit" type="submit" disabled={state.submitting}>{state.submitting ? "Sending…" : "Send message"}<Arrow diagonal /></button>
        </fieldset>
        <p className="form-delivery-note">Your message goes straight to my inbox.</p>
      </form>}
    </div>
    <section className="contact-social-section" aria-label="Social links"><h2>Or find me here.</h2><SocialLinks contact /></section>
    </div>
  </section>;
}
function NotFound() {
  useEffect(() => {
    document.title = "404 — Outside the dataset.";
  }, []);
  return <section className="container not-found">
    <div className="error-plot" aria-hidden="true"><div className="error-grid">{Array.from({ length: 30 }, (_, i) => <i key={i} style={{ left: `${20 + Math.sin(i * 2.4) * 13 + i * 0.8}%`, top: `${60 + Math.cos(i * 1.7) * 10 - i * 0.7}%` }} />)}<span className="outlier">×<small>You are here</small></span></div><span>404</span></div>
    <h1>Outside the <em>dataset.</em></h1>
    <p>This page seems to have wandered off.<br />Let’s get you back to something that makes sense.</p>
    <a href="/" className="button dark">Back to home</a>
  </section>;
}
function App() {
  const path = window.location.pathname.replace(/\/index\.html$/, "/") || "/";
  const project = projects.find((p) => path === `/projects/${p.id}.html`);
  const Component = nav.find(([, url]) => url === "/" ? path === "/" : path.replace(/\/$/, "") === url.slice(0, -1))?.[2];
  const isNotFound = !Component && !project;
  const page = Component ? <Component /> : project ? <ProjectPage project={project} /> : null;
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        observer.unobserve(e.target);
      }
    }), { threshold: 0.08 });
    document.querySelectorAll(".section, .about-preview, .contact-strip").forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  if (isNotFound) return <main id="main"><NotFound /></main>;
  return <><a className="skip-link" href="#main">Skip to content</a><div id="top" /><NetworkBackground /><Header path={path} /><main id="main" className={path === "/" ? "home-page" : void 0}>{page}</main><Footer /></>;
}
function PageBoot() {
  const [loading, setLoading] = useState(true);
  const complete = React.useCallback(() => setLoading(false), []);
  return <>{loading && <PageLoader onComplete={complete} />}<div inert={loading ? true : void 0}><App /></div></>;
}
createRoot(document.getElementById("root")).render(<PageBoot />);
