import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { projectBySlug } from './data/projects';
import ProjectDetail from './pages/ProjectDetail';
import './styles/global.css';

const slug = document.documentElement.dataset.project;
const project = projectBySlug[slug];

createRoot(document.getElementById('root')).render(
  <StrictMode>{project ? <ProjectDetail project={project} /> : null}</StrictMode>,
);
