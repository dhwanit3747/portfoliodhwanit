const skills = {
  languages: [
    { name: "Python", level: 90 },
    { name: "SQL", level: 85 },
    { name: "JavaScript", level: 70 },
  ],
  frameworks: [
    { name: "Django", level: 85 },
    { name: "REST APIs", level: 80 },
  ],
  concepts: [
    "Backend Development",
    "System Design",
    "Machine Learning Basics",
    "Database Design",
    "Version Control (Git)",
    "Problem Solving",
  ],
  tools: ["Git", "GitHub", "VS Code", "MySQL", "PostgreSQL"],
};

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="font-medium text-foreground">{name}</span>
      <span className="text-muted-foreground">{level}%</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-muted/30 relative">
      <div className="absolute inset-0 tech-grid opacity-30" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-widest">Skills</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">
            Tech Stack & <span className="gradient-text">Expertise</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Languages */}
          <div className="glass-card rounded-2xl p-8 hover-lift">
            <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Languages</h3>
            <div className="space-y-5">
              {skills.languages.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
          
          {/* Frameworks */}
          <div className="glass-card rounded-2xl p-8 hover-lift">
            <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Frameworks</h3>
            <div className="space-y-5">
              {skills.frameworks.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
            
            <h3 className="font-display text-xl font-semibold mt-8 mb-4 text-foreground">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((tool) => (
                <span 
                  key={tool}
                  className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          
          {/* Concepts */}
          <div className="glass-card rounded-2xl p-8 hover-lift md:col-span-2 lg:col-span-1">
            <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Core Concepts</h3>
            <div className="grid grid-cols-2 gap-3">
              {skills.concepts.map((concept) => (
                <div 
                  key={concept}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50"
                >
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-foreground">{concept}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
