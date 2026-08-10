import './ProjectDetail.css';

function ProjectDetail({ project }) {
  return (
    <div className="project-page">
      <header className="project-page__header">
        <a className="brand" href="/">FA<span>.</span></a>
        <a className="project-page__back" href="/?section=projects" aria-label="Back to the projects section on the home page">Back to projects</a>
      </header>
      <main className="project-page__main">
        <p className="project-page__number">Project {project.number}</p>
        <h1>{project.title}</h1>
        <p className="project-page__subtitle">{project.subtitle}</p>
        <section className="project-page__placeholder">
          <span>Case study</span>
          <h2>Project details in progress.</h2>
          <p>This page is reserved for the project story, responsibilities, architecture, technology choices, and outcomes.</p>
        </section>
        <section className="project-page__contact">
          <p>Ready when the work matters.</p>
          <h2>Let's build the next system.</h2>
          <a href="https://www.upwork.com/freelancers/~replace-me" target="_blank" rel="noreferrer">Connect on Upwork</a>
        </section>
      </main>
    </div>
  );
}

export default ProjectDetail;
