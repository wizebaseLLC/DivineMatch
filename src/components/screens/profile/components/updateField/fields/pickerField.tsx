/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useToast } from 'react-native-styled-toast';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import {
  ageOptions,
  FormElements,
  genderOptions,
  lookingforOptions,
  preferenceOptions,
} from '../../../../initialWizard/initialWizard';
import { UpdateFieldScreenNavigationProp } from '../../../../../../screens/profile';
import SubmitButton from '../ui/submitButton';
import { onSubmit } from '../onSubmit';
import {
  useMyProfileQuery,
  useUpdateUserMutation,
} from '../../../../../../generated/generated';
import { mutationUserUpdate } from './stringField';

interface PickerFieldProps {
  name: FormElements;
  displayName: string;
  value: string | null;
}

const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.paper};
`;

const PickerField: React.FunctionComponent<PickerFieldProps> = props => {
  const { name, displayName, value } = props;
  const { toast } = useToast();
  const { data: userData } = useMyProfileQuery();
  const [mutateUser] = useUpdateUserMutation();
  const navigation = useNavigation<UpdateFieldScreenNavigationProp>();
  const theme = useContext(ThemeContext);

  const schema = Yup.object({
    [name]: Yup.string().required('Required'),
  });

  const initialValues = {
    [name]: value,
  };

  const handleChangePicker = (formElement: typeof name, handleChange: any) => (
    text: React.ReactText,
  ) => {
    handleChange(formElement)(text.toString());
  };

  const pickerArray: string[] = useMemo(() => {
    switch (name) {
      case 'gender':
        return genderOptions;

      case 'preference':
        return preferenceOptions;

      case 'lookingfor':
        return lookingforOptions;

      case 'age':
        return ageOptions?.map(x => x.toString());
      default:
        return [''];
    }
  }, [name]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={onSubmit({
        goBack: navigation.goBack,
        mutation: mutationUserUpdate(userData, mutateUser),
        name,
        toast,
      })}
    >
      {formProps => (
        <Container>
          <Picker
            selectedValue={formProps.values[name] as string}
            onValueChange={handleChangePicker(name, formProps.handleChange)}
            prompt={displayName}
          >
            {pickerArray.map((val, index) => (
              <Picker.Item
                key={index}
                label={capitalize(val)}
                value={val}
                color={theme.colors.fontColor}
              />
            ))}
          </Picker>
          <SubmitButton
            handleSubmit={formProps.handleSubmit as () => void}
            isSubmitting={formProps.isSubmitting}
          />
        </Container>
      )}
    </Formik>
  );
};

export default PickerField;
