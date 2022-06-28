import React from 'react';
import CreateList from './createList';

const list = [
  { key: 'Name', value: 'Amy Farha' },
  { key: 'Email', value: 'guy@amy.com' },
  { key: 'Name', value: 'Amy Farha' },
  { key: 'Email', value: 'guy@amy.com' },
];

const AccountSettings = () => {
  return <CreateList {...{ list, title: 'Account Settings' }} />;
};

export default AccountSettings;
