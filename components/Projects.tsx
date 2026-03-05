import type { TProject } from "@/lib/api";
import styles from "./Projects.module.css";

function ProjectCard({ project }: { project: TProject }) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.top}>
        <svg className={styles.folderIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        </svg>
        <div className={styles.links}>
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.iconLink}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" aria-label="Live demo" className={styles.iconLink}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <h3 className={styles.name}>{project.name}</h3>
      <p className={styles.description}>{project.description}</p>

      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className={styles.techStack}>
          {project.tech_stack.map((tech) => (
            <span key={tech} className="badge badge-purple">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects({ projects }: { projects: TProject[] }) {
  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <div className="section-heading">
          <h2>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="divider" />
        </div>

        <div className={styles.grid}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
