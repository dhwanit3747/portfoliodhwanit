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

  // Get 4 most recent repos
  const recentRepos = [...repos]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 4);

  const formatRepoName = (name: string) => {
    return name
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-widest">Portfolio</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Live from GitHub — automatically synced with my latest repositories
          </p>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
              <button 
                onClick={loadRepos} 
                className="hover:text-primary transition-colors p-1"
                disabled={loading}
                aria-label="Refresh repositories"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </p>
          )}
        </div>

        {error && (
          <div className="text-center text-destructive mb-8">
            <p className="text-sm">{error}</p>
            <Button variant="outline" size="sm" onClick={loadRepos} className="mt-4">
              Try Again
            </Button>
          </div>
        )}
        
        {/* Recent projects - 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {loading ? (
            <>
              <Skeleton className="h-52 sm:h-56 rounded-xl sm:rounded-2xl" />
              <Skeleton className="h-52 sm:h-56 rounded-xl sm:rounded-2xl" />
              <Skeleton className="h-52 sm:h-56 rounded-xl sm:rounded-2xl" />
              <Skeleton className="h-52 sm:h-56 rounded-xl sm:rounded-2xl" />
            </>
          ) : (
            recentRepos.map((repo, index) => (
              <div 
                key={repo.id}
                className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 hover-lift relative overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Folder className="w-5 h-5 text-primary" />
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="w-3 h-3" />
                          {repo.stargazers_count}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <a 
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors p-1"
                        aria-label={`View ${repo.name} on GitHub`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a 
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors p-1"
                        aria-label={`Open ${repo.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {formatRepoName(repo.name)}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                    {repo.description || "No description available"}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {repo.language && (
                      <span className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded-full font-medium">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics.slice(0, 2).map((topic) => (
                      <span 
                        key={topic}
                        className="px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* GitHub link */}
        <div className="text-center mt-8 sm:mt-12">
          <Button variant="outline" size="default" asChild>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              View More on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
