import './Hero.css';
import { siGithub } from 'simple-icons';
import BrandIcon from '../BrandIcon';
import profilePhoto from '../../assets/profile-photo.png';

const specialties = ['AI Engineering', 'LLM Applications', 'AI Agents', 'Data Engineering', 'Full-Stack Development', 'Cloud Architecture'];

function Hero() {
  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="hero">
      <div className="hero__visual">
        <div className="hero__portrait-wrap">
          <div className="hero__portrait">
            <img src={profilePhoto} alt="Frank Anthony" />
          </div>
          <div className="hero__badge" aria-label="More than 10 years of engineering experience">
            <strong>10+</strong>
            <span>years<br />engineering</span>
          </div>
        </div>
        <div className="hero__identity">
          <strong>Frank Anthony</strong>
          <span>Full Stack AI & Cloud Engineer</span>
        </div>
      </div>
      <div className="hero__content">
        <h1 className="hero__name">Building Intelligent Systems That Drive Real Business Outcomes</h1>
        <p className="hero__intro">I engineer production-grade AI products that unite large language models, agentic workflows, resilient data foundations, cloud infrastructure, and modern full-stack architecture.</p>
        <p className="hero__detail">With over a decade of software engineering experience, I turn complex business challenges into scalable, cloud-ready AI platforms, from intelligent automation to enterprise systems built for reliability.</p>
        <div className="hero__tags">{specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}</div>
        <div className="hero__actions">
          <button className="button button--primary" type="button" onClick={scrollToProjects}>Explore Projects</button>
          <a className="button button--secondary" href="https://www.upwork.com/freelancers/~replace-me" target="_blank" rel="noreferrer">Connect on Upwork</a>
          <span className="hero__socials">
            <a className="social-linkedin" href="https://www.linkedin.com/in/replace-me/" target="_blank" rel="noreferrer" aria-label="LinkedIn placeholder"><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg" alt="" /></a>
            <a href="https://github.com/replace-me" target="_blank" rel="noreferrer" aria-label="GitHub placeholder"><BrandIcon icon={siGithub} color="#f7f7f2" /></a>
          </span>
        </div>
      </div>
    </main>
  );
}

export default Hero;
