import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';
import IconButtonDM from '../../../../library/iconButton';

interface BannerProps {
  isNotMyProfile: boolean | undefined;
  handleNavigateEditImages: () => void;
}

const CloseOrImageButton = (props: BannerProps) => {
  const { isNotMyProfile, handleNavigateEditImages } = props;
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.2,
        zIndex: 2,
        paddingRight: !isNotMyProfile ? 15 : 0,
      }}
    >
      {!isNotMyProfile && (
        <IconButtonDM
          {...{
            overrideReverse: true,
            size: 15,
            name: 'camera',
            color: theme.colors.secondary,
            onPress: handleNavigateEditImages,
          }}
        />
      )}
    </View>
  );
};

export default CloseOrImageButton;
