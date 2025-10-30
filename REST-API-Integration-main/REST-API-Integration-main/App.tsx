
import React, { useState, useEffect, useCallback } from 'react';
import { GitHubUser, GitHubRepo } from './types';
import { fetchGitHubUser, fetchUserRepos } from './services/githubService';
import { useDebounce } from './hooks/useDebounce';
import SearchBar from './components/SearchBar';
import UserProfileCard from './components/UserProfileCard';
import RepoCard from './components/RepoCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { ICONS } from './constants';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = useCallback(async (username: string) => {
    if (!username) {
        setUser(null);
        setRepos([]);
        setError(null);
        setShowWelcome(true);
        return;
    }

    setIsLoading(true);
    setError(null);
    setShowWelcome(false);

    try {
        const [userData, repoData] = await Promise.all([
            fetchGitHubUser(username),
            fetchUserRepos(username)
        ]);
        setUser(userData);
        setRepos(repoData);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message === 'Not Found' ? `User "${username}" not found.` : err.message);
        } else {
            setError('An unknown error occurred.');
        }
        setUser(null);
        setRepos([]);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
                <h1 className="text-4xl font-bold text-slate-100">GitHub User Finder</h1>
            </div>
            <p className="text-slate-400">Enter a username to fetch profile data and repositories.</p>
        </header>

        <main>
          <SearchBar 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="mt-8 space-y-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {showWelcome && !isLoading && !error && (
                <div className="text-center text-slate-500 p-8 bg-slate-800/50 rounded-lg">
                    <p>Start by typing a GitHub username in the search bar above.</p>
                </div>
            )}
            {!isLoading && !error && user && (
              <>
                <UserProfileCard user={user} />
                {repos.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-slate-200">Latest Repositories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {repos.map(repo => (
                        <RepoCard key={repo.id} repo={repo} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
