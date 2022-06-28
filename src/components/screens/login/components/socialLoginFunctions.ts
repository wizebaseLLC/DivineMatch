import { Auth } from 'aws-amplify';

export async function loginWithGoogle() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await Auth.federatedSignIn({ provider: 'Google' } as any);
  } catch ({ message }) {
    console.error(message);
  }
}

export async function loginWithFacebook() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await Auth.federatedSignIn({ provider: 'Facebook' } as any);
}
