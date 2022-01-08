export type User = {
  id?: number;
  username?: string;
  email?: string;
  provider?: string; // "local",
  confirmed?: boolean;
  blocked?: boolean;
  role?: {
    id: number;
    name: string; // "Authenticated",
    description: string; // "Default role given to authenticated user.",
    type: string; // "authenticated"
  };
  created_at?: string; // "2022-01-05T10:21:12.910Z",
  updated_at?: string; // "2022-01-05T10:47:31.068Z"
};
