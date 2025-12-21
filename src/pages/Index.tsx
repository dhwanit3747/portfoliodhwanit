import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dhwanit Chudasama | Software Developer & AI/ML Enthusiast</title>
        <meta 
          name="description" 
          content="Portfolio of Dhwanit Chudasama - ICT student at Adani University specializing in Python, Django, and AI/ML. Building intelligent software solutions." 
        />
        <meta name="keywords" content="Dhwanit Chudasama, Software Developer, AI/ML, Python, Django, Portfolio, Adani University" />
        <link rel="canonical" href="https://dhwanit-portfolio.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
