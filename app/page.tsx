import {
  getProfile,
  getExperiences,
  getInternships,
  getProjects,
  getSkills,
  getEducations,
  getCertifications,
} from "@/lib/api";

import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

// Revalidate page data every 60 seconds (ISR) — changes in Amplify backend
// show up on the live site within a minute, no redeploy needed.
export const revalidate = 60;

export default async function Home() {
  const [profile, experiences, internships, projects, skills, educations, certifications] =
    await Promise.all([
      getProfile(),
      getExperiences(),
      getInternships(),
      getProjects(),
      getSkills(),
      getEducations(),
      getCertifications(),
    ]);

  if (!profile) {
    return (
      <main style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <p style={{ color: "var(--text-muted)" }}>Portfolio data is not available yet.</p>
      </main>
    );
  }

  return (
    <main>
      <Hero profile={profile} />
      <Experience experiences={experiences} internships={internships} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Education educations={educations} />
      <Certifications certifications={certifications} />
      <Contact profile={profile} />
    </main>
  );
}
