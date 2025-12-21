import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-secondary">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="text-center md:text-left">
            <a href="#home" className="font-display text-2xl font-bold text-secondary-foreground">
              <span className="gradient-text">Dhvanit Chudasama</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center md:justify-start gap-1">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> © {currentYear}
            </p>
          </div>
          
          {/* Social links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/dhwanit3747" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-background/10 hover:bg-background/20 transition-colors text-secondary-foreground"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-background/10 hover:bg-background/20 transition-colors text-secondary-foreground"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:dhvanit@example.com"
              className="p-3 rounded-full bg-background/10 hover:bg-background/20 transition-colors text-secondary-foreground"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
