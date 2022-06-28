import React, { useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { Text } from 'react-native-elements';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FormProps } from '../initialWizard';
import { InterestProps } from './interests';
import Spiritualities from './spirtualities';
import Chips from '../../../../library/ui/clickable/chips';

const { width } = Dimensions.get('window');

function sortAlphabetically(a: InterestProps, b: InterestProps) {
  return a.text.localeCompare(b.text);
}

const Container = styled(KeyboardAwareScrollView)`
  width: ${width}px;
  background-color: ${props => props.theme.colors.paper};
`;

const PositionedView = styled.View`
  margin-top: ${props => props.theme.spacing * 2}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HeaderText = styled(Text).attrs(() => ({
  h4: true,
}))`
  font-family: ${props => props.theme.font.heading};
  padding-left: ${props => props.theme.spacing / 2}px;
  max-width: ${width}px;
  padding: ${props => props.theme.spacing}px;
  align-self: center;
  margin-top: ${props => props.theme.spacing}px;
`;

const SubheaderText = styled(Text).attrs(() => ({}))`
  font-size: 16px;
  font-family: ${props => props.theme.font.subHeading};
  padding-left: ${props => props.theme.spacing / 2}px;
  max-width: ${width * 0.8}px;
  padding-left: ${props => props.theme.spacing}px;
  margin-top: ${props => props.theme.spacing}px;
  align-self: center;
`;

const LogoImage = styled(Image)`
  height: 70px;
  width: 70px;
  align-self: center;
`;
interface Step2Props {
  formProps: FormProps;
}

const Step7: React.FunctionComponent<Step2Props> = props => {
  const { formProps } = props;
  const { handleChange, values, errors } = formProps;

  const [interests, setInterests] = useState(
    Spiritualities.sort(sortAlphabetically).map(x => {
      const currentValues = values.spirituality.split(',');
      if (currentValues.includes(x.text)) {
        return {
          ...x,
          selected: true,
        };
      }
      return x;
    }),
  );
  console.log(errors);
  const handleSetInterests = (index: number) => () => {
    setInterests(prev => {
      const selectedInterest = prev[index];
      return [
        { ...selectedInterest, selected: !selectedInterest.selected },
        ...prev.filter(x => x.text !== selectedInterest.text),
      ].sort(sortAlphabetically);
    });
  };

  useEffect(() => {
    const myInterests = interests.filter(i => i.selected).map(i => i.text);
    handleChange('spirituality')(myInterests.join(','));
  }, [interests, handleChange]);

  return (
    <Container>
      <LogoImage source={require('../../../../../assets/images/icon.png')} />
      <HeaderText>Lastly, your spirituality</HeaderText>
      <SubheaderText>How would you describe your spirituality</SubheaderText>
      <PositionedView>
        {interests.map(({ icon, text, selected }, index) => (
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

export default Step7;
