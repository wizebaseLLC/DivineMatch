/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useToast } from 'react-native-styled-toast';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { FormElements } from '../../../../initialWizard/initialWizard';
import { UpdateFieldScreenNavigationProp } from '../../../../../../screens/profile';
import SubmitButton from '../ui/submitButton';
import { onSubmitArray } from '../onSubmit';
import { sortAlphabetically } from '../../../../initialWizard/components/step6';
import Interests, {
  InterestProps,
} from '../../../../initialWizard/components/interests';
import Chips from '../../../../../../library/ui/clickable/chips';
import Spiritualities from '../../../../initialWizard/components/spirtualities';
import {
  useMyProfileQuery,
  useUpdateUserMutation,
} from '../../../../../../generated/generated';
import { mutationUserUpdate } from './stringField';

interface ChipsFieldProps {
  name: FormElements;
  displayName: string;
  value: string | null;
}

const { width } = Dimensions.get('window');

const Container = styled.ScrollView`
  width: ${width}px;
  background-color: ${props => props.theme.colors.paper};
`;

const ButtonContainer = styled.View`
  margin-top: ${props => props.theme.spacing * 2}px;
`;

const PositionedView = styled.View`
  margin-top: ${props => props.theme.spacing * 2}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

interface ChipSubFieldProps {
  formProps: any;
  list: InterestProps[];
  name: FormElements;
}

const ChipSubField: React.FunctionComponent<ChipSubFieldProps> = props => {
  const { formProps, list, name } = props;
  const { handleChange } = formProps;

  const [arr, setArr] = useState([
    {
      selected: false,
      text: 'Sports',
      icon: 'football-ball',
    },
  ]);

  const handleSetInterests = (index: number) => () => {
    setArr(prev => {
      const selectedInterest = prev[index];
      return [
        { ...selectedInterest, selected: !selectedInterest.selected },
        ...prev.filter(x => x.text !== selectedInterest.text),
      ].sort(sortAlphabetically);
    });
  };

  useEffect(() => {
    const myInterests = arr.filter(i => i.selected).map(i => i.text);
    handleChange(name)(myInterests.join(','));
  }, [arr, handleChange, name]);

  useEffect(() => {
    if (list?.[0]) setArr(list);
  }, [list]);

  return (
    <Container>
      <PositionedView>
        {arr.map(({ icon, text, selected }, index) => (
          <Chips
            {...{
              key: index,
              icon,
              text,
              index,
              selected,
              onPress: handleSetInterests(index),
            }}
          />
        ))}
      </PositionedView>
    </Container>
  );
};

const ChipsField: React.FunctionComponent<ChipsFieldProps> = props => {
  const { name, value } = props;
  const { toast } = useToast();
  const { data: userData } = useMyProfileQuery();
  const [mutateUser] = useUpdateUserMutation();
  const navigation = useNavigation<UpdateFieldScreenNavigationProp>();

  const schema = Yup.object({
    [name]: Yup.string().required('Required'),
  });

  const initialValues = {
    [name]: value,
  };
  const list = useMemo(() => {
    switch (name) {
      case 'interest':
        return Interests.sort(sortAlphabetically).map(x => {
          if (value?.includes(x.text)) {
            return {
              ...x,
              selected: true,
            };
          }
          return x;
        });

      case 'spirituality':
        return Spiritualities.sort(sortAlphabetically).map(x => {
          if (value?.includes(x.text)) {
            return {
              ...x,
              selected: true,
            };
          }
          return x;
        });

      default:
        break;
    }
  }, [name, value]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={onSubmitArray({
        goBack: navigation.goBack,
        mutation: mutationUserUpdate(userData, mutateUser),
        name,
        toast,
      })}
    >
      {formProps =>
        list && (
          <Container>
            <ChipSubField {...{ formProps, list, name }} />
            <ButtonContainer>
              <SubmitButton
                handleSubmit={formProps.handleSubmit as () => void}
                isSubmitting={formProps.isSubmitting}
              />
            </ButtonContainer>
          </Container>
        )
      }
    </Formik>
  );
};

export default ChipsField;
