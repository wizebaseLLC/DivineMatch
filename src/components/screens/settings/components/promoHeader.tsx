import React from 'react';
import { View } from 'react-native';
import Banner from './banner';
import MiniBanner from './miniBanner';

/**
 * Promo at the top of the settings page
 */
const PromoHeader = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Banner />
      <MiniBanner />
    </View>
  );
};

export default PromoHeader;
