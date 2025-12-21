import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Smart Parking System",
    description: "A Django-based backend system with comprehensive database integration for efficient parking management. Features real-time slot tracking, user authentication, and automated billing.",
    tech: ["Python", "Django", "PostgreSQL", "REST API"],
    github: "https://github.com/dhwanit3747",
    featured: true,
  },
  {
    title: "ML Prediction Model",
    description: "Machine learning project implementing various algorithms for predictive analytics. Includes data preprocessing, model training, and visualization components.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/dhwanit3747",
    featured: false,
  },
  {
    title: "API Integration Platform",
    description: "RESTful API development project showcasing best practices in backend architecture, authentication, and database design patterns.",
    tech: ["Django", "REST Framework", "MySQL", "JWT"],
    github: "https://github.com/dhwanit3747",
    featured: false,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-widest">Portfolio</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in backend development, AI/ML, and system design
          </p>
        </div>
        
        <div className="grid gap-8">
          {/* Featured project */}
          {projects.filter(p => p.featured).map((project) => (
            <div 
              key={project.title}
              className="glass-card rounded-2xl p-8 lg:p-12 hover-lift relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Folder className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium text-sm">Featured Project</span>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 max-w-2xl">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-4 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Other projects */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter(p => !p.featured).map((project) => (
              <div 
                key={project.title}
                className="glass-card rounded-2xl p-8 hover-lift group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Folder className="w-10 h-10 text-primary" />
                  <div className="flex gap-3">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs text-muted-foreground font-medium"
                    >
                      {tech}
                      {project.tech.indexOf(tech) < project.tech.length - 1 && " •"}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* GitHub link */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/dhwanit3747" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              View More on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
