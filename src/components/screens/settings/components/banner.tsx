import React from 'react';
import { Image, useColorScheme } from 'react-native';
import { WhiteOverlay } from '../../../../library/ui';
import {
  BannerText,
  Container,
  StyledCard,
  DivineMatchBanner,
  DescriptionText,
} from './styledComponents';

export default function Banner() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <Container>
      <StyledCard {...{ isDark }}>
        <DivineMatchBanner>
          <Image
            source={require('../../../../../assets/images/icon.png')}
            style={{ height: 35, width: 35 }}
          />
          <BannerText>Divine Match ++</BannerText>
        </DivineMatchBanner>

        <DescriptionText>Unlock Our Most Exclusive Features!</DescriptionText>
        <WhiteOverlay borderRadius={10} />
      </StyledCard>
    </Container>
  );
}
