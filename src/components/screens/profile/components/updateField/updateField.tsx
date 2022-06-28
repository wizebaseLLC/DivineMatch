import { useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useMyProfileQuery } from '../../../../../generated/generated';
import { UpdateFieldScreenRouteProp } from '../../../../../screens/profile';
import ChipsField from './fields/chipField';
import LocationField from './fields/locationField';
import PickerField from './fields/pickerField';
import StringField from './fields/stringField';

const UpdateField = () => {
  const route = useRoute<UpdateFieldScreenRouteProp>();
  const { name, displayName, whichType } = route.params;
  const { data: userData } = useMyProfileQuery();

  const value = useMemo(
    () =>
      userData && userData?.myProfile?.[name]
        ? (userData?.myProfile?.[name] as string)
        : null,
    [userData, name],
  );

  switch (whichType) {
    case 'string':
      return (
        <StringField
          {...{ name, displayName, value, hasMaxCharacters: true }}
        />
      );

    case 'multiline-string':
      return <StringField {...{ name, displayName, value, multiline: true }} />;

    case 'location':
      return <LocationField currentLocation={userData?.myProfile?.location} />;

    case 'picker':
      return <PickerField {...{ name, displayName, value }} />;

    case 'chips':
      return <ChipsField {...{ name, displayName, value }} />;

    default:
      return null;
  }
};

export default UpdateField;
