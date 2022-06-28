import React from 'react';
import styled from 'styled-components/native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import ChipsNonClickable from '../../../../library/ui/clickable/chipsNonClickable';

dayjs.extend(relativeTime);
interface Props {
  location: string;
  updatedAt: Date;
}

const PositionedView = styled.View`
  margin-top: ${props => props.theme.spacing}px;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Container = styled.View`
  margin-top: ${props => props.theme.spacing * 4}px;
  align-items: center;
`;

const FindMe = (props: Props) => {
  const { updatedAt, location } = props;

  const catchMe = [location, `Last Seen ${dayjs(updatedAt).fromNow()}`];

  return (
    <Container>
      <PositionedView>
        {catchMe?.map((text, index) => (
          <ChipsNonClickable
            overrideDefault
            {...{
              key: index,
              text,
              icon: index === 0 ? 'map-marker-alt' : 'clock',
            }}
          />
        ))}
      </PositionedView>
    </Container>
  );
};
export default FindMe;
