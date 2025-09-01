export interface Login {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Profile {
  fullName: string;
  initials: string;
}
