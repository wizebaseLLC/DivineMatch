import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { Button } from 'react-native-elements';
import { FormProps, WizardRef } from '../initialWizard';
import IconButtonDM from '../../../../library/iconButton';
import { StepRequirements } from './nextStepRequirements';

const { width } = Dimensions.get('window');

const Container = styled.View`
  width: ${width}px;
  background-color: ${props => props.theme.colors.paper};
`;

const RowContainer = styled.View`
  width: ${width}px;
  background-color: ${props => props.theme.colors.paper};
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${props => props.theme.spacing}px;
`;

interface BackAndForthArrowsProps {
  wizard: MutableRefObject<WizardRef>;
  formProps: FormProps;
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  handleSubmit: () => void;
}

const BackAndForthArrows: React.FunctionComponent<BackAndForthArrowsProps> = props => {
  const {
    wizard,
    formProps,
    currentStep,
    isFirstStep,
    isLastStep,
    handleSubmit,
  } = props;
  const [canPressNext, setCanPressNext] = useState(true);
  const theme = useContext(ThemeContext);

  const handleClickButton = (direction: 'back' | 'forward') => () => {
    if (direction === 'back') {
      return wizard.current?.prev();
    }
    if (canPressNext) return wizard.current?.next();
    return null;
  };

  useEffect(() => {
    const indexStep = StepRequirements.find(({ step }) => step === currentStep);
    const values = Object.entries(formProps.values);
    const filteredValues = values.filter(value =>
      indexStep?.requiredFields.includes(value[0]),
    );

    const shouldGoNext = filteredValues.every(value => value[1] !== '');

    if (shouldGoNext) {
      setCanPressNext(true);
    } else {
      setCanPressNext(false);
    }
  }, [currentStep, formProps.values]);

  return (
    <Container>
      {isLastStep && (
        <Button
          onPress={handleSubmit}
          title="Submit"
          icon={<ActivityIndicator color={theme.colors.actionBlue} />}
          disabled={!canPressNext || formProps.isSubmitting}
          containerStyle={{
            alignSelf: 'center',
          }}
          buttonStyle={{
            borderRadius: 15,
            width: width * 0.75,
          }}
        />
      )}
      <RowContainer>
        <IconButtonDM
          {...{
            size: 30,
            color: isFirstStep ? 'grey' : theme.colors.secondaryAlt,
            name: 'arrow-left',
            onPress: handleClickButton('back'),
          }}
        />
        <IconButtonDM
          {...{
            size: 30,
            color:
              isLastStep || !canPressNext ? 'grey' : theme.colors.secondaryAlt,
            name: 'arrow-right',
            onPress: handleClickButton('forward'),
          }}
        />
      </RowContainer>
    </Container>
  );
};

export default BackAndForthArrows;
