import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled(Text).attrs(() => ({
  h4: true,
}))`
  font-family: ${props => props.theme.font.heading};
  max-width: ${width * 0.9}px;
  padding-bottom: ${props => props.theme.spacing * 4}px;
  text-align: center;
  align-self: center;
`;

interface ReshuffleProps {
  setSwipeRightMutationData: (props: null) => void;
  handleRefetch: () => void;
}

const Reshuffle: React.FunctionComponent<ReshuffleProps> = props => {
  const { handleRefetch, setSwipeRightMutationData } = props;

  useEffect(() => {
    setSwipeRightMutationData(null);
  }, [setSwipeRightMutationData]);
  return (
    <Container>
      <HeaderText>Ooh Nooes, looks like you ran out of cards</HeaderText>
      <Button
        {...{ onPress: handleRefetch }}
        icon={
          <Icon name="random" size={15} color="white" type="font-awesome-5" />
        }
        title="Reshuffle"
        containerStyle={{
          alignSelf: 'center',
        }}
        buttonStyle={{
          borderRadius: 100,
          width: width * 0.65,
        }}
      />
    </Container>
  );
};

export default Reshuffle;
