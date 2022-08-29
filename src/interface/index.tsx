export interface NavBarProps {
  data?: {
    href: string;
    title: string;
  };
}
export interface ILinks {
  href: string;
  name: string;
}
export interface ISignupData {
  fullname: string;
  email: string;
  username: string;
  telephone: string;
  password: string;
  cpassword: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
