import { useEffect, useState } from "react";
import { ExternalLink, Github, Folder, Star, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchGitHubRepos, GitHubRepo } from "@/lib/github";
import { Skeleton } from "@/components/ui/skeleton";

const GITHUB_USERNAME = "dhwanit3747";

const ProjectsSection = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGitHubRepos(GITHUB_USERNAME);
      setRepos(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to load repositories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  // Get featured repo (most starred or first one)
  const featuredRepo = repos.length > 0 
    ? repos.reduce((prev, current) => 
        prev.stargazers_count > current.stargazers_count ? prev : current
      )
    : null;

  const otherRepos = repos.filter(repo => repo.id !== featuredRepo?.id).slice(0, 5);

  const formatRepoName = (name: string) => {
    return name
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-widest">Portfolio</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Live from GitHub — automatically synced with my latest repositories
          </p>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
              <button 
                onClick={loadRepos} 
                className="hover:text-primary transition-colors"
                disabled={loading}
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </p>
          )}
        </div>

        {error && (
          <div className="text-center text-destructive mb-8">
            <p>{error}</p>
            <Button variant="outline" size="sm" onClick={loadRepos} className="mt-4">
              Try Again
            </Button>
          </div>
        )}
        
        <div className="grid gap-8">
          {/* Featured project */}
          {loading ? (
            <Skeleton className="h-64 rounded-2xl" />
          ) : featuredRepo && (
            <div 
              className="glass-card rounded-2xl p-8 lg:p-12 hover-lift relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Folder className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium text-sm">Featured Project</span>
                  {featuredRepo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4" />
                      {featuredRepo.stargazers_count}
                    </span>
                  )}
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {formatRepoName(featuredRepo.name)}
                </h3>
                
                <p className="text-muted-foreground mb-6 max-w-2xl">
                  {featuredRepo.description || "No description available"}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredRepo.language && (
                    <span className="px-4 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-full font-medium">
                      {featuredRepo.language}
                    </span>
                  )}
                  {featuredRepo.topics.slice(0, 4).map((topic) => (
                    <span 
                      key={topic}
                      className="px-4 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-full font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <a href={featuredRepo.html_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Other projects */}
          <div className="grid md:grid-cols-2 gap-6">
            {loading ? (
              <>
                <Skeleton className="h-48 rounded-2xl" />
                <Skeleton className="h-48 rounded-2xl" />
                <Skeleton className="h-48 rounded-2xl" />
                <Skeleton className="h-48 rounded-2xl" />
              </>
            ) : (
              otherRepos.map((repo) => (
                <div 
                  key={repo.id}
                  className="glass-card rounded-2xl p-8 hover-lift group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Folder className="w-10 h-10 text-primary" />
                    <div className="flex items-center gap-3">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      <a 
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a 
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {formatRepoName(repo.name)}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                    {repo.description || "No description available"}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {repo.language && (
                      <span className="text-xs text-muted-foreground font-medium">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics.slice(0, 3).map((topic, idx) => (
                      <span 
                        key={topic}
                        className="text-xs text-muted-foreground font-medium"
                      >
                        • {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* GitHub link */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
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
