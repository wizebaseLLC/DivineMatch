interface Props {
  name: string;
  displayName: string;
  whichType: 'string' | 'multiline-string' | 'location' | 'picker' | 'chips';
}

interface keys {
  about: string;
  age: number;
  firstname: string;
  lastname: string;
  gender: 'male' | 'female' | 'other';
  location: string;
  lookingfor:
    | 'dating'
    | 'hookups'
    | 'spiritualConnection'
    | 'longTerm'
    | 'shortTerm'
    | 'friendship'
    | 'any';
  preference: 'male' | 'female' | 'other' | 'all';
  interest: string[];
  spirituality: string[];
}

export type EditProfileProps = { [key in keyof keys]: Props };
