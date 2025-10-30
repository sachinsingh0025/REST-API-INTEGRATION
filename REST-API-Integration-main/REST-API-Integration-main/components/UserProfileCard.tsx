
import React from 'react';
import { GitHubUser } from '../types';
import { ICONS } from '../constants';

interface UserProfileCardProps {
  user: GitHubUser;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg w-full transform transition-all duration-500 hover:scale-105 hover:shadow-sky-500/10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="w-32 h-32 rounded-full border-4 border-slate-600 object-cover"
        />
        <div className="text-center md:text-left flex-1">
          <div className="md:flex md:items-baseline md:justify-between">
            <h1 className="text-3xl font-bold text-white">{user.name || user.login}</h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              @{user.login}
            </a>
          </div>
          <p className="mt-2 text-slate-300">{user.bio || 'No bio available.'}</p>
          
          <div className="mt-4 flex items-center justify-center md:justify-start gap-4 text-slate-400">
            {user.location && (
              <div className="flex items-center gap-1">
                {ICONS.location}
                <span>{user.location}</span>
              </div>
            )}
            {user.company && (
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{user.company}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-700 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-slate-400">Followers</p>
          <p className="text-2xl font-semibold text-white">{user.followers}</p>
        </div>
        <div>
          <p className="text-sm text-slate-400">Following</p>
          <p className="text-2xl font-semibold text-white">{user.following}</p>
        </div>
        <div>
          <p className="text-sm text-slate-400">Public Repos</p>
          <p className="text-2xl font-semibold text-white">{user.public_repos}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
