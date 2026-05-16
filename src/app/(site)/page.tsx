import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

// ISR: revalidate every 60s so published project changes appear without redeployment
export const revalidate = 60;

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
