export default class SignInResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

class User {
  id: number;
  email: string;
  name: string;
  role: string;
}
