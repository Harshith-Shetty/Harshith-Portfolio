import type { TSkill } from "@/lib/api";
import styles from "./Skills.module.css";

// Provider accent colors + short label for subcategory headers
const SUBCATEGORY_THEME: Record<string, { color: string; bg: string; border: string }> = {
  Azure:       { color: "#60a5fa", bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.25)" },
  AWS:         { color: "#fb923c", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.25)" },
  GCP:         { color: "#4ade80", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.25)" },
};

// Badge variant cycling for flat-item categories
const BADGE_VARIANTS = ["", "badge-cyan", "badge-purple", "", "badge-cyan", "badge-purple", ""];

function SubcategoryBlock({
  name,
  items,
}: {
  name: string;
  items?: string[] | null;
}) {
  const theme = SUBCATEGORY_THEME[name];
  const inlineStyle = theme
    ? ({
        "--sub-color":  theme.color,
        "--sub-bg":     theme.bg,
        "--sub-border": theme.border,
      } as React.CSSProperties)
    : undefined;

  return (
    <div className={styles.subgroup} style={inlineStyle}>
      <div className={styles.subgroupHeader}>
        <span className={styles.subgroupDot} />
        <span className={styles.subgroupName}>{name}</span>
      </div>
      <div className={styles.subgroupItems}>
        {items?.map((item) => (
          <span key={item} className={styles.subgroupBadge}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillCard({ skill, variantIndex }: { skill: TSkill; variantIndex: number }) {
  const hasSubcategories = skill.subcategories && skill.subcategories.length > 0;
  const hasFlatItems     = skill.items && skill.items.length > 0;
  const isExpanded       = hasSubcategories; // cards with subcategories get a wider layout

  return (
    <div className={`card ${styles.card} ${isExpanded ? styles.cardWide : ""}`}>
      {/* Category header */}
      <h3 className={styles.category}>{skill.category}</h3>

      {/* Flat items (shown above subcategories if both exist) */}
      {hasFlatItems && (
        <div className={styles.items}>
          {skill.items!.map((item) => (
            <span key={item} className={`badge ${BADGE_VARIANTS[variantIndex % BADGE_VARIANTS.length]}`}>
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Separator when both flat items and subcategories exist */}
      {hasFlatItems && hasSubcategories && <div className={styles.separator} />}

      {/* Subcategory blocks */}
      {hasSubcategories && (
        <div className={styles.subcategories}>
          {skill.subcategories!.map((sub) => (
            <SubcategoryBlock key={sub.name} name={sub.name} items={sub.items} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Skills({ skills }: { skills: TSkill[] }) {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-heading">
          <h2>
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="divider" />
        </div>

        <div className={styles.grid}>
          {skills.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} variantIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
