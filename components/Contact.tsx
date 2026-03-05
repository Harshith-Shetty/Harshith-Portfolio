import type { TProfile } from "@/lib/api";
import styles from "./Contact.module.css";

export default function Contact({ profile }: { profile: TProfile }) {
  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className="section-heading">
          <h2>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="divider" />
        </div>

        <div className={styles.wrapper}>
          <p className={styles.message}>
            I&apos;m currently open to new opportunities. Whether you have a
            question, a project idea, or just want to say hi — my inbox is
            always open!
          </p>

          <div className={styles.links}>
            <a href={`mailto:${profile.email}`} className={`btn btn-primary ${styles.cta}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
              Say Hello
            </a>

            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={`btn btn-outline`}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}

            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={`btn btn-outline`}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 20.45h3.56V9H3.56v11.45zM22.22 0H1.77C.79 0 .0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.27V1.73C24 .77 23.21 0 22.22 0z" />
                </svg>
                LinkedIn
              </a>
            )}
          </div>

          {profile.location && (
            <p className={styles.location}>
              📍 {profile.location}
            </p>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <p>
          Designed & Built by{" "}
          <span className="gradient-text">{profile.name}</span>
        </p>
        <p className={styles.footerSub}>
          Powered by Next.js + AWS Amplify
        </p>
      </div>
    </section>
  );
}
