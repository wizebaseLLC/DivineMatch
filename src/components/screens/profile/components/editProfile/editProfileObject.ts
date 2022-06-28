import { EditProfileProps } from './editProfileInterface';

const EditProfileObj: EditProfileProps = {
  about: {
    name: 'about',
    displayName: 'About',
    whichType: 'multiline-string',
  },
  age: {
    name: 'age',
    displayName: 'Age',
    whichType: 'picker',
  },
  firstname: {
    name: 'firstname',
    displayName: 'First Name',
    whichType: 'string',
  },
  lastname: {
    name: 'lastname',
    displayName: 'Last Name',
    whichType: 'string',
  },
  gender: {
    name: 'gender',
    displayName: 'Gender',
    whichType: 'picker',
  },
  location: {
    name: 'location',
    displayName: 'Location',
    whichType: 'location',
  },
  lookingfor: {
    name: 'lookingfor',
    displayName: 'Looking For',
    whichType: 'picker',
  },
  preference: {
    name: 'preference',
    displayName: 'Preference',
    whichType: 'picker',
  },
  interest: {
    name: 'interest',
    displayName: 'Interest',
    whichType: 'chips',
  },
  spirituality: {
    name: 'spirituality',
    displayName: 'Spirituality',
    whichType: 'chips',
  },
};

export default EditProfileObj;
