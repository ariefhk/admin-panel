export interface UsersPageProps {
  session: {
    user: {
      email: string;
      name: string;
      image: string;
      token: string;
    };
  };
}
