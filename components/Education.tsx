import type { TEducation } from "@/lib/api";
import styles from "./Education.module.css";

export default function Education({ educations }: { educations: TEducation[] }) {
  return (
    <section id="education" className={styles.section}>
      <div className="container">
        <div className="section-heading">
          <h2>
            <span className="gradient-text">Education</span>
          </h2>
          <div className="divider" />
        </div>

        <div className={styles.grid}>
          {educations.map((edu) => (
            <div key={edu.id} className={`card ${styles.card}`}>
              <div className={styles.icon}>🎓</div>
              <h3 className={styles.institution}>{edu.institution}</h3>
              {edu.degree && (
                <p className={styles.degree}>
                  {edu.degree}
                  {edu.field ? ` in ${edu.field}` : ""}
                </p>
              )}
              <div className={styles.footer}>
                {edu.grade && <span className={`badge`}>{edu.grade}</span>}
                {(edu.start_year || edu.end_year) && (
                  <span className={styles.years}>
                    {edu.start_year} – {edu.end_year}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
