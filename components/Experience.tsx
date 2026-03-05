import type { TExperience, TInternship } from "@/lib/api";
import styles from "./Experience.module.css";

function ExperienceCard({ item, type }: { item: TExperience | TInternship; type: "full" | "intern" }) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.role}>{item.role}</h3>
          <p className={styles.company}>{item.company}</p>
        </div>
        <div className={styles.meta}>
          <span className={`badge ${type === "full" ? "" : "badge-cyan"}`}>
            {type === "full" ? "Full-Time" : "Internship"}
          </span>
          <span className={styles.dates}>
            {item.start_date} — {item.end_date ?? "Present"}
          </span>
        </div>
      </div>
      {item.bullets && item.bullets.length > 0 && (
        <ul className={styles.bullets}>
          {item.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Experience({
  experiences,
  internships,
}: {
  experiences: TExperience[];
  internships: TInternship[];
}) {
  return (
    <section id="experience">
      <div className="container">
        <div className="section-heading">
          <h2>
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="divider" />
        </div>

        <div className={styles.timeline}>
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} item={exp} type="full" />
          ))}

          {internships.length > 0 && (
            <>
              <h3 className={styles.subheading}>Internships</h3>
              {internships.map((int) => (
                <ExperienceCard key={int.id} item={int} type="intern" />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
