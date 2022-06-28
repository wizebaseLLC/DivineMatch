import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import { BlockUserContainer } from './styledComponents';

const { width } = Dimensions.get('window');
interface GoBackProps {
  handleGoBack: (time: number) => void;
  isButtonDisabled: boolean;
}
const SendMessageButton = (props: GoBackProps) => {
  const { handleGoBack, isButtonDisabled } = props;
  const theme = useContext(ThemeContext);

  const handleGoBackWithScroll = () => {
    handleGoBack(500);
  };

  return (
    <BlockUserContainer
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: theme.spacing * 4,
      }}
    >
      <Button
        title="Go Back"
        disabled={isButtonDisabled}
        onPress={handleGoBackWithScroll}
        containerStyle={{ width: width * 0.4 }}
        buttonStyle={{
          backgroundColor: theme.colors.secondary,
          borderRadius: 22,
        }}
      />
    </BlockUserContainer>
  );
};
export default SendMessageButton;
