/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-styled-toast';
import { onSubmitImages } from '../updateField/onSubmit';
import { UpdateFieldScreenNavigationProp } from '../../../../../screens/profile';
import Step5 from '../../../initialWizard/components/step5';
import SubmitButton from '../updateField/ui/submitButton';
import {
  useMyProfileQuery,
  useUpdateUserMutation,
} from '../../../../../generated/generated';
import { mutationUserUpdate } from '../updateField/fields/stringField';

const schema = Yup.object({
  profilepic: Yup.string().required('Required'),
  gallery1: Yup.string(),
  gallery2: Yup.string(),
  gallery3: Yup.string(),
  gallery4: Yup.string(),
});

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.paper};
`;

const ButtonContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing * 6}px;
`;

const UpdateImages = () => {
  const navigation = useNavigation<UpdateFieldScreenNavigationProp>();
  const [mutateUser] = useUpdateUserMutation();
  const { toast } = useToast();
  const { data: userData } = useMyProfileQuery();

  const initialValues = useMemo(
    () => ({
      profilepic: userData?.myProfile?.profilepic || '',
      gallery1: userData?.myProfile?.gallery1 || '',
      gallery2: userData?.myProfile?.gallery2 || '',
      gallery3: userData?.myProfile?.gallery3 || '',
      gallery4: userData?.myProfile?.gallery4 || '',
    }),
    [userData],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={onSubmitImages({
        goBack: navigation.goBack,
        mutation: mutationUserUpdate(userData, mutateUser),
        toast,
        email: userData?.myProfile?.email,
      })}
    >
      {formProps => (
        <Container>
          <Step5
            {...{ formProps: formProps as any, isUpdatingProfile: true }}
          />
          <ButtonContainer>
            <SubmitButton
              handleSubmit={formProps.handleSubmit as () => void}
              isSubmitting={formProps.isSubmitting}
            />
          </ButtonContainer>
        </Container>
      )}
    </Formik>
  );
};

export default UpdateImages;
