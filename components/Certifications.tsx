import type { TCertification } from "@/lib/api";
import styles from "./Certifications.module.css";

// Initials to show inside the placeholder when no logo is uploaded yet
function getInitials(issuer: string): string {
  return issuer
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Deterministic hue from issuer name for the placeholder background
function issuerHue(issuer: string): number {
  let hash = 0;
  for (let i = 0; i < issuer.length; i++) hash = issuer.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % 360;
}

function CertLogo({ cert }: { cert: TCertification }) {
  if (cert.logo_url) {
    return (
      <div className={styles.logoWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cert.logo_url}
          alt={`${cert.issuer} logo`}
          className={styles.logoImg}
        />
      </div>
    );
  }

  // Placeholder: coloured circle with issuer initials
  const hue = issuerHue(cert.issuer);
  return (
    <div
      className={styles.logoPlaceholder}
      style={{
        background: `hsl(${hue} 60% 18%)`,
        border: `1px solid hsl(${hue} 60% 35%)`,
        color: `hsl(${hue} 80% 65%)`,
      }}
    >
      {getInitials(cert.issuer)}
    </div>
  );
}

export default function Certifications({
  certifications,
}: {
  certifications: TCertification[];
}) {
  return (
    <section id="certifications">
      <div className="container">
        <div className="section-heading">
          <h2>
            <span className="gradient-text">Certifications</span>
          </h2>
          <div className="divider" />
        </div>

        <div className={styles.grid}>
          {certifications.map((cert) => (
            <div key={cert.id} className={`card ${styles.card}`}>
              <CertLogo cert={cert} />
              <div className={styles.info}>
                <h3 className={styles.name}>{cert.name}</h3>
                <p className={styles.issuer}>{cert.issuer}</p>
              </div>
              {cert.year && (
                <span className={`badge badge-cyan ${styles.year}`}>
                  {cert.year}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
