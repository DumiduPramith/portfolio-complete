export interface LoginResponseInterface {
  status: string;
  token: string;
  user: {
    userId: string;
    userName: string;
    email: string;
  };
}
