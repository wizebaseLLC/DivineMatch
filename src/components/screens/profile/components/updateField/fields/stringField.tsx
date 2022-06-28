/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useToast } from 'react-native-styled-toast';
import { useNavigation } from '@react-navigation/native';
import { MutationFunctionOptions } from '@apollo/react-common';
import { FormElements } from '../../../../initialWizard/initialWizard';
import InputComponentDM from '../../../../initialWizard/components/inputComponent';
import { UpdateFieldScreenNavigationProp } from '../../../../../../screens/profile';
import SubmitButton from '../ui/submitButton';
import { onSubmit } from '../onSubmit';
import {
  Exact,
  InputUser,
  MyProfileDocument,
  MyProfileQuery,
  UpdateUserMutation,
  useMyProfileQuery,
  useUpdateUserMutation,
} from '../../../../../../generated/generated';

interface StringFieldProps {
  name: FormElements;
  displayName: string;
  value: string | null;
  multiline?: boolean;
  hasMaxCharacters?: boolean;
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.paper};
`;

type Mut = (
  options?:
    | MutationFunctionOptions<
        UpdateUserMutation,
        Exact<{
          input: InputUser;
          id: string;
        }>
      >
    | undefined,
) => void;

export const mutationUserUpdate = (
  userData: MyProfileQuery | undefined,
  mutateUser: Mut,
) => (input: Partial<InputUser>) => {
  if (userData?.myProfile) {
    const {
      updatedAt,
      __typename,
      id,
      createdAt,
      ...rest
    } = userData?.myProfile;

    mutateUser({
      variables: {
        id: userData?.myProfile?.id,
        input: {
          ...rest,
          ...input,
        },
      },
      refetchQueries: [{ query: MyProfileDocument }],
    });
  }
};

const StringField: React.FunctionComponent<StringFieldProps> = props => {
  const { name, displayName, value, multiline, hasMaxCharacters } = props;
  const { toast } = useToast();
  const { data: userData } = useMyProfileQuery();
  const [mutateUser] = useUpdateUserMutation();
  const navigation = useNavigation<UpdateFieldScreenNavigationProp>();

  const schema = Yup.object({
    [name]: Yup.string()
      .min(3)
      .max(hasMaxCharacters ? 20 : 500)
      .required('Required'),
  });

  const initialValues = {
    [name]: value,
  };

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
          <InputComponentDM
            {...{
              element: name,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formProps: formProps as any,
              iconName: 'edit',
              placeholder: displayName,
              label: displayName.replace('Update', ''),
              marginTopMultiplier: 2,
              multiline,
            }}
          />
          <SubmitButton
            handleSubmit={formProps.handleSubmit as () => void}
            isSubmitting={formProps.isSubmitting}
          />
        </Container>
      )}
    </Formik>
  );
};

export default StringField;
