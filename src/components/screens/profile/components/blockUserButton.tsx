import React, { useContext } from 'react';
import { Button } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import { BlockUserContainer } from './styledComponents';

const BlockUser = () => {
  const theme = useContext(ThemeContext);
  return (
    <BlockUserContainer>
      <Button
        type="clear"
        title="Block"
        buttonStyle={{ borderRadius: 22 }}
        titleStyle={{
          fontFamily: theme.font.light,
          color: theme.colors.secondaryAlt,
          fontSize: 18,
        }}
      />
    </BlockUserContainer>
  );
};

export default BlockUser;
