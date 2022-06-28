/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';

interface Attributes {
  email: string;
  email_verified: boolean;
  sub: string;
  jwtToken: string;
}

type User = {
  attributes: Attributes;
};
const useAwsAuth = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<
    Partial<Attributes>
  >({});

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleSignIn = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      const { attributes }: User = user;
      const {
        jwtToken,
      }: { jwtToken: string } = user?.signInUserSession?.idToken;
      setAuthenticatedUser({ ...attributes, jwtToken });
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event } }) => {
      switch (event) {
        case 'signIn':
          handleSignIn();
          break;

        case 'signOut':
          setAuthenticatedUser({});
          setIsAuthenticated(false);
          break;
        default:
          break;
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await handleSignIn();
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);

  return { authenticatedUser, isAuthenticated };
};

export default useAwsAuth;
