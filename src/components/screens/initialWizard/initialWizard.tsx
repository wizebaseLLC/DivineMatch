/* eslint-disable radix */
import { Formik, FormikProps } from 'formik';
import React, { useContext, useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useToast } from 'react-native-styled-toast';
import Wizard from 'react-native-wizard';
import { ThemeContext } from 'styled-components';
import * as Yup from 'yup';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import uuid from 'react-uuid';
import useAwsAuth from '../../../library/api/hooks/useAwsAuth';
import { uploadStorage } from '../../../library/api/uploadStorage';
import BackAndForthArrows from './components/backAndForthArrows';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';
import Step4 from './components/step4';
import Step5 from './components/step5';
import Step6 from './components/step6';
import Step7 from './components/step7';
import { IMAGE_PREFIX } from '../../../library/globalConstants';
import {
  InputUser,
  MyProfileDocument,
  useCreateUserMutation,
} from '../../../generated/generated';

export type WizardRef = { next: () => void; prev: () => void } | undefined;

export const genderOptions = ['male', 'female', 'other'];
export const preferenceOptions = ['male', 'female', 'other', 'all'];
export const lookingforOptions = [
  'dating',
  'hookups',
  'connection',
  'long term',
  'short term',
  'friendship',
  'not picky',
];
export const ageOptions = Array.from(Array(100).keys()).filter(x => x > 17);

const schema = Yup.object({
  firstname: Yup.string().min(3).max(20).required('Required'),
  lastname: Yup.string().min(3).max(20).required('Required'),
  age: Yup.number().min(18).max(100).required('Required'),
  gender: Yup.string().oneOf(genderOptions).required('Required'),
  preference: Yup.string().oneOf(preferenceOptions).required('Required'),
  lookingfor: Yup.string().oneOf(lookingforOptions).required('Required'),
  location: Yup.string().required('Required'),
  longitude: Yup.string().required('Required'),
  latitude: Yup.string().required('Required'),
  profilepic: Yup.string().required('Required'),
  gallery1: Yup.string(),
  gallery2: Yup.string(),
  gallery3: Yup.string(),
  gallery4: Yup.string(),
  spirituality: Yup.string(),
  interest: Yup.string(),
  about: Yup.string().required('Required'),
});

const initialValues = {
  firstname: '',
  lastname: '',
  longitude: '',
  latitude: '',
  age: 18,
  gender: 'female',
  preference: 'female',
  lookingfor: 'dating',
  location: '',
  profilepic: '',
  gallery1: '',
  gallery2: '',
  gallery3: '',
  gallery4: '',
  spirituality: '',
  interest: '',
  about: '',
};
export type FormProps = FormikProps<typeof initialValues>;
export type FormElements = keyof typeof initialValues;

interface CurrentStepProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const LAST_STEP = 6;
const InitialWizard: React.FunctionComponent = () => {
  const wizard = useRef<WizardRef>();
  const theme = useContext(ThemeContext);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const { authenticatedUser } = useAwsAuth();
  const { toast } = useToast();
  const [mutation, { data, error }] = useCreateUserMutation();
  console.log({ data, error });
  const handleSetCurrentStep = ({ currentStep: value }: CurrentStepProps) => {
    setCurrentStep(value);
  };

  const handleSetIsFirstStep = (val: boolean) => {
    setIsFirstStep(val);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={async values => {
        try {
          const email = authenticatedUser?.email;
          if (values && email) {
            const images = [
              values.profilepic,
              values.gallery1,
              values.gallery2,
              values.gallery3,
              values.gallery4,
            ];
            const imagePromiseMap = images.map(async (image, index) => {
              if (image) {
                const ref = `userImages/${email}/gallery${index}${uuid()}`;
                await uploadStorage({
                  ref,
                  uri: image as string,
                });

                return `${IMAGE_PREFIX}/${ref}`;
              }
              return '';
            });
            const [
              profilepic,
              gallery1,
              gallery2,
              gallery3,
              gallery4,
            ] = await Promise.all(imagePromiseMap);

            // #TODO Fix this!
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const insertValues: InputUser = {
              ...values,
              email,
              interest: values.interest.split(','),
              spirituality: values.spirituality.split(','),
              profilepic,
              gallery1,
              gallery2,
              gallery3,
              gallery4,
            };
            await mutation({
              variables: {
                input: {
                  ...insertValues,
                  // @ts-ignore
                  age: parseInt(insertValues.age),
                },
              },
              refetchQueries: [{ query: MyProfileDocument }],
            });
          }
        } catch (errors) {
          toast({
            message: errors?.message,
            intent: 'ERROR',
            duration: 8000,
            shouldVibrate: true,
          });
        }
      }}
    >
      {formProps => {
        const stepList = [
          {
            content: <Step1 {...{ formProps, wizard }} />,
          },

          {
            content: <Step2 {...{ formProps, wizard }} />,
          },
          {
            content: <Step3 {...{ formProps, wizard }} />,
          },
          {
            content: <Step4 {...{ formProps, wizard }} />,
          },
          {
            content: <Step5 {...{ formProps, wizard }} />,
          },
          {
            content: <Step6 {...{ formProps, wizard }} />,
          },
          {
            content: <Step7 {...{ formProps, wizard }} />,
          },
        ];
        return (
          <SafeAreaView
            style={{
              flex: 1,

              backgroundColor: theme.colors.paper,
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.paper,
                flex: 6,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  marginTop: theme.spacing,
                }}
              >
                <Wizard
                  ref={wizard}
                  steps={stepList}
                  useNativeDriver
                  duration={1000}
                  isFirstStep={handleSetIsFirstStep}
                  currentStep={handleSetCurrentStep}
                />
              </View>
            </View>
            <View
              style={{
                flex: currentStep === LAST_STEP ? 2 : 1.3,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            >
              <BackAndForthArrows
                {...{
                  wizard,
                  formProps,
                  currentStep,
                  isFirstStep,
                  isLastStep: currentStep === LAST_STEP,
                  handleSubmit: formProps.handleSubmit,
                }}
              />
            </View>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
};

export default InitialWizard;
