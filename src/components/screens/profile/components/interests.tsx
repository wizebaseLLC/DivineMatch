import React from 'react';
import styled from 'styled-components/native';
import { ProfileSectionHeaderText } from './styledComponents';
import ChipsNonClickable from '../../../../library/ui/clickable/chipsNonClickable';

interface Props {
  interests: string[];
}

const PositionedView = styled.View`
  margin-top: ${props => props.theme.spacing}px;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Container = styled.View`
  margin-top: ${props => props.theme.spacing * 2}px;
  align-items: center;
`;

const Interests = (props: Props) => {
  const { interests } = props;

  return (
    <Container>
      <ProfileSectionHeaderText>I am Interested In</ProfileSectionHeaderText>
      <PositionedView>
        {interests?.map((text, index) => (
          <ChipsNonClickable
            {...{
              key: index,
              text,
            }}
          />
        ))}
      </PositionedView>
    </Container>
  );
};
export default Interests;
