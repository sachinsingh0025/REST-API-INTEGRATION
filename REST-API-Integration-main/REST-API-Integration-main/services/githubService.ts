
import { GitHubUser, GitHubRepo, ApiError } from '../types';

const API_BASE_URL = 'https://api.github.com';

const handleResponse = async <T,>(response: Response): Promise<T> => {
  if (response.ok) {
    return response.json() as Promise<T>;
  }
  const errorData: ApiError = await response.json();
  throw new Error(errorData.message || `Error: ${response.status}`);
};

export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  const response = await fetch(`${API_BASE_URL}/users/${username}`);
  return handleResponse<GitHubUser>(response);
};

export const fetchUserRepos = async (username: string): Promise<GitHubRepo[]> => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/repos?sort=updated&per_page=10`);
  return handleResponse<GitHubRepo[]>(response);
};
