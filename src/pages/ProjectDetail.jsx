import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, Grid2X2 } from 'lucide-react';
import './ProjectDetail.css';
import logo from '../assets/logo.png';
import githubIcon from '../assets/github.png';
import { projects } from '../data/projects';

function ProjectDetail({ project }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const homeUrl = import.meta.env.BASE_URL;
  const projectsUrl = `${homeUrl}?section=projects`;
  const projectIndex = projects.findIndex(({ slug }) => slug === project.slug);
  const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;
  const projectUrl = (slug) => `${homeUrl}projects/${slug}/`;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsPreviewOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 12);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <div className="project-page">
      <header className="project-page__header">
        <a className="brand" href={homeUrl}><img className="project-page__logo" src={logo} alt="Frank Anthony" /></a>
        <a className="project-page__back" href={projectsUrl} aria-label="Back to the projects section on the home page">Back to projects</a>
      </header>
      {isScrolled && (
        <button className="project-scroll-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top" title="Scroll to top">
          <ArrowUp aria-hidden="true" strokeWidth={2.25} />
        </button>
      )}
      <main className="project-page__main">
        <h1>{project.title}</h1>
        <p className="project-page__subtitle">{project.subtitle}</p>
        {(project.liveUrl || project.githubUrl) && (
          <div className="project-page__resources">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit live site</a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><img src={githubIcon} alt="" />View on GitHub</a>}
          </div>
        )}
        {project.caseStudy ? (
          <article className="project-case-study">
            {project.video ? (
              <div className={`project-case-study__video${project.videoLayout ? ` project-case-study__video--${project.videoLayout}` : ''}`}>
                <video controls playsInline preload="metadata" poster={project.image}>
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
              </div>
            ) : project.caseStudy.preview && (
              <button className="project-case-study__preview" type="button" onClick={() => setIsPreviewOpen(true)} aria-label={`Open full-size ${project.title} preview`}>
                <img src={project.image} alt={`${project.title} platform preview`} />
              </button>
            )}
            <div className="project-case-study__intro">
              {project.caseStudy.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {project.caseStudy.features && (
              <section>
                <h2>Key Features</h2>
                <ul>
                  {project.caseStudy.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </section>
            )}
            <section>
              <h2>{project.caseStudy.technologyLabel ?? 'Technology'}</h2>
              <div className="project-case-study__technology">
                {project.caseStudy.technology.map((item) => <span key={item}>{item}</span>)}
              </div>
            </section>
            <p className="project-case-study__outcome">{project.caseStudy.outcome}</p>
          </article>
        ) : (
          <section className="project-page__placeholder">
            <span>Case study</span>
            <h2>Project details in progress.</h2>
            <p>This page is reserved for the project story, responsibilities, architecture, technology choices, and outcomes.</p>
          </section>
        )}
        <nav className="project-navigation" aria-label="Project navigation">
          {previousProject && <a className="project-navigation__previous" href={projectUrl(previousProject.slug)} aria-label={`Previous project: ${previousProject.title}`}><ArrowLeft aria-hidden="true" /><span>Previous</span></a>}
          <a className="project-navigation__all" href={projectsUrl}><Grid2X2 aria-hidden="true" /><span>View all projects</span></a>
          {nextProject && <a className="project-navigation__next" href={projectUrl(nextProject.slug)} aria-label={`Next project: ${nextProject.title}`}><span>Next</span><ArrowRight aria-hidden="true" /></a>}
        </nav>
      </main>
      <section className="project-closing">
        <div className="project-closing__waves" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <span key={index} />)}</div>
        <div className="project-closing__content">
          <p>Ready when the work matters.</p>
          <h2>Let's turn complex ideas into systems that perform.</h2>
          <a className="project-closing__cta" href="https://www.upwork.com/freelancers/~01eebebdf977448a7a" target="_blank" rel="noopener noreferrer">Connect on Upwork</a>
        </div>
      </section>
      <footer className="project-footer">
        <div className="project-footer__inner">
          <a className="project-footer__brand" href={homeUrl} aria-label="Go to Frank Anthony homepage"><img className="project-footer__logo" src={logo} alt="Frank Anthony" /></a>
          <div className="project-footer__socials">
            <a href="https://github.com/franthony3987" target="_blank" rel="noopener noreferrer" aria-label="Frank Anthony on GitHub"><img src={githubIcon} alt="" /></a>
          </div>
          <div className="project-footer__bottom">
            <span>© 2026 Frank Anthony</span>
            <p>Building Intelligent Systems That Drive Real Business Outcomes</p>
          </div>
        </div>
      </footer>
      {isPreviewOpen && (
        <div className="project-image-dialog" role="dialog" aria-modal="true" aria-label={`${project.title} full-size preview`} onClick={() => setIsPreviewOpen(false)}>
          <button className="project-image-dialog__close" type="button" aria-label="Close image preview" onClick={() => setIsPreviewOpen(false)}>Close</button>
          <img src={project.image} alt={`${project.title} platform preview`} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
