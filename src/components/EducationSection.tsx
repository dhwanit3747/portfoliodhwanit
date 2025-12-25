import { GraduationCap, Award, Users, Lightbulb } from "lucide-react";

const EducationSection = () => {
  const achievements = [
    {
      icon: Award,
      title: "Hackathon Participant",
      description: "Active participation in coding competitions and hackathons",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Experience working in diverse teams on complex projects",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Strong analytical and problem-solving capabilities",
    },
  ];

  return (
    <section id="education" className="py-24 bg-muted/30 relative">
      <div className="absolute inset-0 tech-grid opacity-30" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education */}
          <div className="text-center lg:text-left">
            <span className="text-primary font-medium text-sm uppercase tracking-widest">Education</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-8">
              Academic <span className="gradient-text">Background</span>
            </h2>
            
            <div className="glass-card rounded-2xl p-8 hover-lift">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Bachelor's in Information & Communication Technology
                  </h3>
                  <p className="text-primary font-medium mt-1">Adani University</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Currently pursuing ICT with a focus on software development, AI/ML, and hardware integration. Engaged in practical projects and continuous learning to build industry-relevant skills.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium">
                      Software Development
                    </span>
                    <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium">
                      AI/ML
                    </span>
                    <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium">
                      System Design
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Achievements */}
          <div className="text-center lg:text-left">
            <span className="text-primary font-medium text-sm uppercase tracking-widest">Achievements</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-8">
              Activities & <span className="gradient-text">Highlights</span>
            </h2>
            
            <div className="space-y-4">
              {achievements.map((item, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-xl p-6 hover-lift flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
