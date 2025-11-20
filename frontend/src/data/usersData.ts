/**
 * Mock user credentials data for authentication
 * In a real application, this would be stored securely on the backend
 */

export interface UserCredentials {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user' | 'guest';
  name: string;
  email: string;
}

export const usersData: UserCredentials[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    email: 'admin@google.com'
  },
  {
    id: 2,
    username: 'john.doe',
    password: 'user123',
    role: 'user',
    name: 'John Doe',
    email: 'john.doe@google.com'
  },
  {
    id: 3,
    username: 'jane.smith',
    password: 'user123',
    role: 'user',
    name: 'Jane Smith',
    email: 'jane.smith@google.com'
  },
  {
    id: 4,
    username: 'guest',
    password: 'guest123',
    role: 'guest',
    name: 'Guest User',
    email: 'guest@google.com'
  }
];
