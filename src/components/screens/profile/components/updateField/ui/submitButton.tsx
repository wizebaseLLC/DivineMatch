import React, { useContext } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { ThemeContext } from 'styled-components';

interface SubmitButtonProps {
  handleSubmit: () => void;
  isSubmitting: boolean;
}

const windowWidth = Dimensions.get('window').width;

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = props => {
  const { isSubmitting, handleSubmit } = props;
  const theme = useContext(ThemeContext);
  return (
    <Button
      onPress={handleSubmit}
      title="Submit"
      icon={
        isSubmitting && <ActivityIndicator color={theme.colors.actionBlue} />
      }
      disabled={isSubmitting}
      containerStyle={{
        alignSelf: 'center',
      }}
      buttonStyle={{
        borderRadius: 0,
        width: windowWidth,
      }}
    />
  );
};

export default SubmitButton;
