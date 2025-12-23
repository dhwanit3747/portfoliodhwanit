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

  // Get featured repos (top 2 most starred)
  const sortedByStars = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
  const featuredRepos = sortedByStars.slice(0, 2);
  const otherRepos = sortedByStars.slice(2, 8);

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
        
        <div className="space-y-6 sm:space-y-8">
          {/* Featured projects - 2 column grid on desktop, stack on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {loading ? (
              <>
                <Skeleton className="h-56 sm:h-64 rounded-xl sm:rounded-2xl" />
                <Skeleton className="h-56 sm:h-64 rounded-xl sm:rounded-2xl" />
              </>
            ) : (
              featuredRepos.map((repo, index) => (
                <div 
                  key={repo.id}
                  className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 hover-lift relative overflow-hidden group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <Folder className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <span className="text-primary font-medium text-xs sm:text-sm">Featured</span>
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                          {repo.stargazers_count}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-3 line-clamp-1">
                      {formatRepoName(repo.name)}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 sm:mb-5 line-clamp-2 flex-grow">
                      {repo.description || "No description available"}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      {repo.language && (
                        <span className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm bg-secondary text-secondary-foreground rounded-full font-medium">
                          {repo.language}
                        </span>
                      )}
                      {repo.topics.slice(0, 2).map((topic) => (
                        <span 
                          key={topic}
                          className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm bg-secondary text-secondary-foreground rounded-full font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <Button variant="hero" size="sm" className="w-full sm:w-auto" asChild>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                          View on GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Other projects - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {loading ? (
              <>
                <Skeleton className="h-40 sm:h-44 rounded-xl" />
                <Skeleton className="h-40 sm:h-44 rounded-xl" />
                <Skeleton className="h-40 sm:h-44 rounded-xl" />
                <Skeleton className="h-40 sm:h-44 rounded-xl" />
                <Skeleton className="h-40 sm:h-44 rounded-xl" />
                <Skeleton className="h-40 sm:h-44 rounded-xl" />
              </>
            ) : (
              otherRepos.map((repo, index) => (
                <div 
                  key={repo.id}
                  className="glass-card rounded-xl p-4 sm:p-5 hover-lift group animate-fade-in-up"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Folder className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                    <div className="flex items-center gap-2">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="w-3 h-3" />
                          {repo.stargazers_count}
                        </span>
                      )}
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
                  
                  <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {formatRepoName(repo.name)}
                  </h3>
                  
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-2">
                    {repo.description || "No description available"}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {repo.language && (
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics.slice(0, 2).map((topic) => (
                      <span 
                        key={topic}
                        className="text-xs text-muted-foreground"
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
