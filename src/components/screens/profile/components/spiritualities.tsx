import React from 'react';

import styled from 'styled-components/native';
import { ProfileSectionHeaderText } from './styledComponents';
import ChipsNonClickable from '../../../../library/ui/clickable/chipsNonClickable';

interface Props {
  spiritualties: string[];
}

const PositionedView = styled.View`
  margin-top: ${props => props.theme.spacing}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Container = styled.View`
  margin-top: ${props => props.theme.spacing * 4}px;
  align-items: center;
`;
const Spiritualties = (props: Props) => {
  const { spiritualties } = props;

  return (
    <Container>
      <ProfileSectionHeaderText>
        My Spirituality looks like
      </ProfileSectionHeaderText>
      <PositionedView>
        {spiritualties?.map((text, index) => (
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
export default Spiritualties;
