import React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import styled from 'styled-components/native';
import ActionButton from './actionButton';
import { FilterGroup } from './filters';
import OnlineUsers from './onlineUsers';
import PostList from './postList';

export const Container = styled.View`
  flex: 1;
`;

const Activity = () => {
  const peopleNearYouFlex = useSharedValue(78);
  return (
    <Container>
      <OnlineUsers {...{ peopleNearYouFlex }} />
      <FilterGroup />
      <PostList {...{ peopleNearYouFlex }} />
      <ActionButton />
    </Container>
  );
};

export default Activity;
