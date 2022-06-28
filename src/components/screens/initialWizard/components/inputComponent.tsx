import React, { useContext } from 'react';
import { Dimensions, Keyboard } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import { FormElements, FormProps } from '../initialWizard';

const { width } = Dimensions.get('window');

interface InputComponentDMProps {
  formProps: FormProps;
  element: FormElements;
  iconName: string;
  placeholder?: string;
  iconType?: string;
  label?: string;
  marginTopMultiplier?: number;
  multiline?: boolean;
}

const InputComponentDM: React.FunctionComponent<InputComponentDMProps> = props => {
  const {
    formProps,
    element,
    iconName,
    iconType,
    placeholder,
    marginTopMultiplier,
    label,
    multiline,
  } = props;
  const { handleBlur, handleChange, touched, values, errors } = formProps;
  const theme = useContext(ThemeContext);

  return (
    <Input
      label={label}
      placeholder={placeholder}
      onChangeText={handleChange(element)}
      onBlur={handleBlur(element)}
      multiline={multiline}
      returnKeyType={multiline ? 'done' : 'default'}
      onSubmitEditing={multiline ? Keyboard.dismiss : undefined}
      errorMessage={touched[element] ? (errors[element] as string) : undefined}
      inputStyle={{ marginLeft: theme.spacing / 2 }}
      containerStyle={{
        marginTop: marginTopMultiplier
          ? theme.spacing * marginTopMultiplier
          : theme.spacing,
        width,
        alignSelf: 'center',
      }}
      inputContainerStyle={
        touched[element] && errors[element]
          ? {
              borderColor: 'red',
            }
          : undefined
      }
      value={values[element] as string}
      leftIcon={
        <Icon
          name={iconName}
          type={iconType || 'font-awesome'}
          size={16}
          iconStyle={{ opacity: 0.6 }}
        />
      }
    />
  );
};

export default InputComponentDM;
