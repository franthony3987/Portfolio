import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Bot, Boxes, ChevronDown, Cloud, Code2, Database, Network, Server, ShieldCheck, Workflow } from 'lucide-react';
import { siAnthropic, siDocker, siFastapi, siGithubactions, siGooglegemini, siGooglecloud, siKubernetes, siLangchain, siLanggraph, siMongodb, siNextdotjs, siNodedotjs, siPostgresql, siPython, siPytorch, siReact, siRedis, siTailwindcss, siTensorflow, siTerraform, siTypescript } from 'simple-icons';
import BrandIcon from '../components/BrandIcon';
import Hero from '../components/Hero/Hero';
import logo from '../assets/logo.png';
import githubIcon from '../assets/github.png';
import fullStackWorkspace from '../assets/full-stack-workspace.jpeg';
import { projects } from '../data/projects';
import { faqs } from '../data/faqs';
import './Home.css';

const buildAreas = [
  {
    title: 'AI Engineering',
    longCopy: ['Building intelligent applications powered by modern AI systems.', 'I design and develop production AI solutions using LLMs, RAG architectures, AI agents, and intelligent decision systems that transform complex problems into practical software.'],
    items: ['LLM applications', 'RAG systems', 'AI agents', 'Multi-agent workflows', 'AI assistants', 'Decision systems'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=85',
  },
  {
    title: 'Data Engineering',
    longCopy: ['Creating reliable data foundations that make AI useful.', 'I build scalable data pipelines, processing systems, and analytics infrastructure that transform raw information into structured intelligence for AI applications and business decisions.'],
    items: ['Data pipelines', 'ETL/ELT', 'Data modeling', 'Analytics systems', 'AI-ready infrastructure'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85',
  },
  {
    title: 'Full-Stack Product Engineering',
    longCopy: ['Engineering complete products from architecture to production.', 'I build scalable applications across frontend, backend, databases, and cloud infrastructure, delivering reliable software systems designed for real-world users and business needs.'],
    items: ['React / Next.js applications', 'Backend systems', 'APIs', 'Databases', 'Cloud infrastructure'],
    image: fullStackWorkspace,
  },
  {
    title: 'Intelligent Automation',
    longCopy: ['Connecting AI with workflows to create practical automation.', 'I design intelligent systems that combine AI models, APIs, and business processes to reduce manual work, improve efficiency, and enable smarter operations.'],
    items: ['Workflow automation', 'AI integrations', 'Business process optimization', 'Internal tools'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=85',
  },
  {
    title: 'Cloud & Infrastructure',
    longCopy: ['Building cloud foundations that keep products resilient.', 'I architect secure, scalable cloud environments, deployment pipelines, and observability systems that keep AI and full-stack products reliable as they grow.'],
    items: ['AWS / Azure / GCP', 'Docker', 'CI/CD', 'Serverless', 'Cloud architecture'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85',
  },
];

const techIcons = { ai: Bot, data: Database, code: Code2, cloud: Cloud, backend: Server, automation: Workflow, systems: Network, product: Boxes };
const techBrandIcons = {
  React: siReact, 'Next.js': siNextdotjs, TypeScript: siTypescript, 'Tailwind CSS': siTailwindcss, Python: siPython, FastAPI: siFastapi, 'Node.js': siNodedotjs,
  PostgreSQL: siPostgresql, MongoDB: siMongodb, Redis: siRedis, PyTorch: siPytorch, TensorFlow: siTensorflow, 'Anthropic Claude': siAnthropic,
  'Google Gemini': siGooglegemini, LangChain: siLangchain, LangGraph: siLanggraph, 'Google Cloud': siGooglecloud, Docker: siDocker, Kubernetes: siKubernetes,
  Terraform: siTerraform, 'GitHub Actions': siGithubactions,
};

const techStack = [
  ['React', 'product'], ['Next.js', 'product'], ['TypeScript', 'code'], ['JavaScript', 'code'], ['Tailwind CSS', 'code'], ['Redux', 'product'], ['HTML5', 'code'], ['CSS3', 'code'],
  ['Python', 'backend'], ['FastAPI', 'backend'], ['Django', 'backend'], ['Flask', 'backend'], ['Node.js', 'backend'], ['Express.js', 'backend'], ['NestJS', 'backend'], ['Java', 'backend'], ['Spring Boot', 'backend'], ['Go', 'backend'],
  ['PostgreSQL', 'data'], ['MySQL', 'data'], ['MongoDB', 'data'], ['Redis', 'data'], ['Supabase', 'data'], ['Firebase', 'data'], ['Prisma', 'data'], ['SQLAlchemy', 'data'],
  ['Pandas', 'data'], ['NumPy', 'data'], ['PyTorch', 'ai'], ['TensorFlow', 'ai'], ['OpenAI', 'ai'], ['Anthropic Claude', 'ai'], ['Google Gemini', 'ai'], ['LangChain', 'ai'], ['LangGraph', 'ai'], ['Hugging Face', 'ai'],
  ['AWS', 'cloud'], ['Azure', 'cloud'], ['Google Cloud', 'cloud'], ['Docker', 'cloud'], ['Kubernetes', 'cloud'], ['Terraform', 'cloud'], ['GitHub Actions', 'cloud'], ['Jenkins', 'cloud'], ['Vercel', 'cloud'], ['Cloudflare', 'cloud'], ['n8n', 'automation'], ['Zapier', 'automation'],
];

const coreTechStack = [
  ['React', 'product', -56, -145], ['Next.js', 'product', -42, -76], ['TypeScript', 'code', -58, -8], ['Tailwind CSS', 'code', -40, 58], ['Node.js', 'backend', -52, 122], ['Python', 'backend', -24, 168],
  ['FastAPI', 'backend', -20, -116], ['PostgreSQL', 'data', -18, -48], ['Redis', 'data', -28, 14], ['MongoDB', 'data', -12, 82], ['Docker', 'cloud', -20, 142], ['Kubernetes', 'cloud', 2, -155],
  ['AWS', 'cloud', 10, -96], ['Google Cloud', 'cloud', 4, -34], ['Azure', 'cloud', 18, 28], ['OpenAI', 'ai', 22, 78], ['Anthropic Claude', 'ai', 12, 125], ['Google Gemini', 'ai', 34, 166],
  ['LangChain', 'ai', 42, -132], ['LangGraph', 'ai', 30, -68], ['PyTorch', 'ai', 52, -4], ['TensorFlow', 'ai', 45, 58], ['Terraform', 'cloud', 58, 113], ['GitHub Actions', 'cloud', 66, 158],
];

const continentRegions = [
  [48, -108, 28, 25, 68], [14, -74, 35, 14, 46], [72, -42, 14, 16, 18],
  [49, 12, 15, 19, 42], [8, 22, 43, 23, 64], [43, 82, 28, 47, 92],
  [-27, 135, 15, 19, 24], [-5, -150, 11, 14, 12],
];

const globeDots = continentRegions.flatMap(([latitude, longitude, latitudeRadius, longitudeRadius, count], regionIndex) => Array.from({ length: count }, (_, pointIndex) => {
  const seed = Math.sin((regionIndex + 1) * 941 + pointIndex * 79) * 10000;
  const seedTwo = Math.sin((regionIndex + 1) * 487 + pointIndex * 163) * 10000;
  const radius = Math.sqrt(seed - Math.floor(seed));
  const angle = (seedTwo - Math.floor(seedTwo)) * Math.PI * 2;
  return {
    latitude: latitude + Math.sin(angle) * latitudeRadius * radius,
    longitude: longitude + Math.cos(angle) * longitudeRadius * radius,
  };
}));

const projectGlobePoint = (latitude, longitude, rotation) => {
  const lat = (latitude * Math.PI) / 180;
  const lon = ((longitude + rotation.y) * Math.PI) / 180;
  const tilt = (rotation.x * Math.PI) / 180;
  const x = Math.cos(lat) * Math.sin(lon);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.cos(lon);
  const projectedY = y * Math.cos(tilt) - z * Math.sin(tilt);
  const depth = y * Math.sin(tilt) + z * Math.cos(tilt);
  return { depth, left: 50 + x * 43, top: 50 - projectedY * 43 };
};

const philosophy = [
  ['Architecture with Intent', ['I design and build software where AI meets engineering, with the belief that every technical decision should serve a meaningful business outcome.', 'The strongest products are not collections of features. They are carefully designed systems that help organizations move faster, serve customers better, and simplify complex operations.'], Boxes],
  ['Data that Makes Intelligence Useful', ['AI is only as valuable as the data, context, and infrastructure behind it.', 'I build reliable data systems and intelligent applications where information is structured, accessible, and transformed into actionable insight.'], Database],
  ['Autonomy with Practical Guardrails', ['I transform AI capabilities into practical business systems through thoughtful automation, agent workflows, and intelligent integrations.', 'The goal is not automation for its own sake - it is creating systems people can understand, trust, and control.'], Bot],
  ['Cloud Architecture That Scales', ['Cloud infrastructure is part of the product, not an afterthought. I design secure, scalable environments that give AI and data-intensive applications the reliability they need from day one.', 'From deployment pipelines and containerized services to observability and cost-aware operations, I build cloud foundations that let systems evolve confidently as demand grows.'], Cloud],
  ['Quality That Holds Up in Production', ['A successful AI product is not defined by its first demo.', 'I focus on reliability, scalability, maintainability, and real-world adoption - ensuring systems continue creating value after deployment.'], ShieldCheck],
];

function Home() {
  const projectUrl = (slug) => `${import.meta.env.BASE_URL}projects/${slug}/`;
  const journeyRef = useRef(null);
  const whatBuildRef = useRef(null);
  const projectsTitleRef = useRef(null);
  const techTitleRef = useRef(null);
  const faqTitleRef = useRef(null);
  const [activeBuildArea, setActiveBuildArea] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [globeRotation, setGlobeRotation] = useState({ x: -8, y: 0 });
  const [isGlobeDragging, setIsGlobeDragging] = useState(false);
  const globeDragRef = useRef(null);

  useEffect(() => {
    const revealItems = [
      ...(journeyRef.current?.querySelectorAll('[data-reveal]') ?? []),
      whatBuildRef.current,
      projectsTitleRef.current,
      techTitleRef.current,
      faqTitleRef.current,
    ].filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealItems.forEach((item) => observer.observe(item));

    const section = new URLSearchParams(window.location.search).get('section');
    const scrollTimer = window.setTimeout(() => {
      if (section) {
        document.getElementById(section)?.scrollIntoView();
        window.history.replaceState(null, '', window.location.pathname);
      }
    }, 0);

    return () => {
      observer.disconnect();
      window.clearTimeout(scrollTimer);
    };
  }, []);

  useEffect(() => {
    let animationFrame;
    const updateHeader = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        setIsHeaderCompact(window.scrollY > 12);
      });
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, []);

  useEffect(() => {
    if (isGlobeDragging) return undefined;
    const rotationTimer = window.setInterval(() => {
      setGlobeRotation((rotation) => ({ ...rotation, y: rotation.y + 0.35 }));
    }, 60);
    return () => window.clearInterval(rotationTimer);
  }, [isGlobeDragging]);

  const startGlobeDrag = (event) => {
    globeDragRef.current = { x: event.clientX, y: event.clientY, rotation: globeRotation };
    setIsGlobeDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveGlobe = (event) => {
    if (!globeDragRef.current) return;
    const { x, y, rotation } = globeDragRef.current;
    setGlobeRotation({ x: rotation.x + (event.clientY - y) * 0.2, y: rotation.y + (event.clientX - x) * 0.28 });
  };

  const endGlobeDrag = () => {
    globeDragRef.current = null;
    setIsGlobeDragging(false);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={`site-header${isHeaderCompact ? ' is-compact' : ''}`}>
        <button className="brand site-header__brand" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><img className="brand__logo" src={logo} alt="Frank Anthony" /></button>
        <nav aria-label="Main navigation">
          <button type="button" onClick={() => scrollToSection('approach')}>About</button>
          <button type="button" onClick={() => scrollToSection('projects')}>Projects</button>
          <button type="button" onClick={() => scrollToSection('tech-stack')}>Skills</button>
          <button type="button" onClick={() => scrollToSection('faq')}>FAQ</button>
        </nav>
      </header>

      {isHeaderCompact && (
        <button className="scroll-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top" title="Scroll to top">
          <ArrowUp aria-hidden="true" strokeWidth={2.25} />
        </button>
      )}

      <Hero />

      <section className="stats" aria-label="Professional highlights">
        <div><strong>10+</strong><span>Years of engineering</span></div>
        <div><strong>50+</strong><span>Products delivered</span></div>
        <div><strong>40+</strong><span>Clients supported</span></div>
      </section>

      <section className="section journey" id="approach" ref={journeyRef}>
        <h2 className="journey__title" data-reveal>From intelligent products<br />to robust systems.</h2>
        <div className="journey__list">
          {philosophy.map(([title, paragraphs, Icon], index) => (
            <article className={`journey__row ${index % 2 ? 'journey__row--reverse' : ''}`} data-reveal key={title}>
              <div className="journey__copy">
                <h3>{title}</h3>
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="journey__icon" aria-hidden="true"><Icon strokeWidth={1.5} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="work">
        <h2 className="journey__title" data-reveal ref={whatBuildRef}>What I Build</h2>
        <div className="build-tiles" onMouseLeave={() => setActiveBuildArea(0)}>
          {buildAreas.map(({ title, longCopy, items, image }, index) => (
            <button
              className={`build-tile ${title === 'Full-Stack Product Engineering' ? 'build-tile--full-stack' : ''} ${activeBuildArea === index ? 'is-active' : ''}`}
              key={title}
              type="button"
              onClick={() => setActiveBuildArea(index)}
              onFocus={() => setActiveBuildArea(index)}
              onMouseEnter={() => setActiveBuildArea(index)}
            >
              <img src={image} alt="" />
              <span className="build-tile__shade" />
              <span className="build-tile__title">
                {title === 'Full-Stack Product Engineering' ? <>Full Stack Product <span className="build-tile__title-break">Engineering</span></> : title}
              </span>
              <span className="build-tile__long-copy"><strong>{longCopy[0]}</strong><span>{longCopy[1]}</span></span>
              <span className="build-tile__detail">
                <span className="build-tile__items">{items.map((item) => <span key={item}>{item}</span>)}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <h2 className="journey__title" data-reveal ref={projectsTitleRef}>Previous projects.</h2>
        <div className="project-grid">
          {(showAllProjects ? projects : projects.slice(0, 3)).map(({ number, slug, title, subtitle, description, keywords, image, liveUrl, githubUrl }) => (
            <article className="project-tile" key={number}>
              <a className="project__preview" href={projectUrl(slug)} aria-label={`View ${title} project`}>
                <img src={image} alt="" />
                <span className="project__number">{number}</span>
                <span className="project__subtitle">{subtitle}</span>
              </a>
              <div className="project__content">
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="project__keywords" aria-label={`${title} technologies`}>
                  {keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
                </div>
              </div>
              <div className="project__footer">
                <a className="project__link" href={projectUrl(slug)}>View project</a>
                {(liveUrl || githubUrl) && (
                  <div className="project__resources">
                    {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer">Live site</a>}
                    {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer"><img src={githubIcon} alt="" />GitHub</a>}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        {!showAllProjects && projects.length > 3 && (
          <div className="projects__reveal">
            <button className="projects__reveal-button" type="button" onClick={() => setShowAllProjects(true)}>
              <span>Show more projects</span>
              <ChevronDown aria-hidden="true" strokeWidth={2.25} />
            </button>
          </div>
        )}
      </section>

      <section className="section tech-stack" id="tech-stack">
        <h2 className="journey__title" data-reveal ref={techTitleRef}>Technology stack.</h2>
        <div
          className={`tech-globe${isGlobeDragging ? ' is-dragging' : ''}`}
          role="application"
          aria-label="Interactive technology globe. Drag to rotate."
          onPointerDown={startGlobeDrag}
          onPointerMove={moveGlobe}
          onPointerUp={endGlobeDrag}
          onPointerCancel={endGlobeDrag}
        >
          <div className="tech-globe__orb" aria-hidden="true" />
          {globeDots.map((dot, index) => {
            const point = projectGlobePoint(dot.latitude, dot.longitude, globeRotation);
            return <i className="tech-globe__dot" key={`${dot.latitude}-${dot.longitude}`} style={{ '--globe-left': `${point.left}%`, '--globe-top': `${point.top}%`, opacity: 0.1 + ((point.depth + 1) / 2) * 0.82, zIndex: Math.round(10 + point.depth * 20) }} aria-hidden="true" />;
          })}
          {coreTechStack.map(([name, type, latitude, longitude]) => {
            const Icon = techIcons[type];
            const brandIcon = techBrandIcons[name];
            const point = projectGlobePoint(latitude, longitude, globeRotation);
            const scale = 0.68 + ((point.depth + 1) / 2) * 0.42;
            return (
              <article className="tech-orbit-item" key={name} style={{ '--tech-left': `${point.left}%`, '--tech-top': `${point.top}%`, '--tech-scale': scale, opacity: 0.24 + ((point.depth + 1) / 2) * 0.76, zIndex: Math.round(60 + point.depth * 20) }}>
                <span className="tech-tile__icon">
                  {brandIcon ? <BrandIcon icon={brandIcon} /> : <Icon aria-hidden="true" strokeWidth={1.5} />}
                </span>
                <span>{name}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section faq" id="faq">
        <h2 className="journey__title" data-reveal ref={faqTitleRef}>FAQ.</h2>
        <div className="faq__list">
          {faqs.map(([question, answer], index) => (
            <article className={`faq__item${openFaq === index ? ' is-open' : ''}`} key={question}>
              <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><span aria-hidden="true">{openFaq === index ? '-' : '+'}</span></button>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing">
        <div className="closing__waves" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <span key={index} />)}</div>
        <div className="closing__content">
          <p>Ready when the work matters.</p>
          <h2>Let's turn complex ideas into systems that perform.</h2>
          <a className="button button--primary" href="https://www.upwork.com/freelancers/~01eebebdf977448a7a" target="_blank" rel="noopener noreferrer">Connect on Upwork</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div>
            <button className="brand" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><img className="brand__logo" src={logo} alt="Frank Anthony" /></button>
          </div>
          <div className="site-footer__socials">
            <a href="https://github.com/franthony3987" target="_blank" rel="noopener noreferrer" aria-label="Frank Anthony on GitHub"><img src={githubIcon} alt="" /></a>
          </div>
          <div className="site-footer__bottom">
            <span>© 2026 Frank Anthony</span>
            <p>Building Intelligent Systems That Drive Real Business Outcomes</p>
          </div>
        </div>
      </footer>

    </>
  );
}

export default Home;
