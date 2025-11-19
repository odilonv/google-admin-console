import { User } from '../types';

const API_BASE_URL = '/api';

class UserApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${this.baseUrl}/users`);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data: User[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}

export const userApiService = new UserApiService();
export default UserApiService;