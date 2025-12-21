import { Code2, Brain, Server, Database } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    { icon: Code2, label: "Python & Django", description: "Backend Development" },
    { icon: Brain, label: "AI/ML", description: "Machine Learning Fundamentals" },
    { icon: Server, label: "REST APIs", description: "System Design" },
    { icon: Database, label: "Databases", description: "MySQL & PostgreSQL" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="animate-slide-in-left">
            <span className="text-primary font-medium text-sm uppercase tracking-widest">About Me</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-6">
              Turning Ideas into{" "}
              <span className="gradient-text">Digital Reality</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm an ICT student at <span className="text-foreground font-medium">Adani University</span> with a passion for building intelligent software solutions. My journey in tech started with curiosity about how systems work, and it has evolved into a dedicated pursuit of software development and AI/ML.
              </p>
              <p>
                I've developed practical experience in <span className="text-foreground font-medium">Python and Django backend development</span>, having built projects like a smart parking system with comprehensive database integration. I'm constantly learning and participating in hackathons to sharpen my problem-solving skills.
              </p>
              <p>
                My goal is to create scalable, efficient solutions that make a real-world impact. Whether it's designing REST APIs, implementing machine learning models, or architecting backend systems, I approach each challenge with enthusiasm and a growth mindset.
              </p>
            </div>
          </div>
          
          {/* Right content - Highlight cards */}
          <div className="grid grid-cols-2 gap-4 animate-slide-in-right">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="glass-card rounded-xl p-6 hover-lift group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
