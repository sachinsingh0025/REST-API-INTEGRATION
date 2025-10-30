
import React from 'react';
import { GitHubRepo } from '../types';
import { ICONS } from '../constants';

interface RepoCardProps {
  repo: GitHubRepo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <a 
      href={repo.html_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-slate-800 p-5 rounded-lg border border-slate-700 hover:border-sky-500 transition-all duration-300 transform hover:-translate-y-1"
    >
      <h3 className="text-lg font-semibold text-sky-400 truncate">{repo.name}</h3>
      <p className="mt-2 text-sm text-slate-400 h-10 overflow-hidden">
        {repo.description || 'No description provided.'}
      </p>
      <div className="mt-4 flex items-center justify-between text-slate-400 text-sm">
        <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
                {ICONS.star}
                {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
                {ICONS.fork}
                {repo.forks_count}
            </span>
        </div>
        {repo.language && (
            <span className="px-2 py-1 bg-slate-700 text-xs rounded">{repo.language}</span>
        )}
      </div>
    </a>
  );
};

export default RepoCard;
