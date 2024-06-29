export interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface CustomSession {
  user?: User;
  expires?: string;
}
