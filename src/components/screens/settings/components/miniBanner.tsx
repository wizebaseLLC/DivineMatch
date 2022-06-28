import React from 'react';
import { useColorScheme, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { WhiteOverlay } from '../../../../library/ui';
import {
  BannerText,
  Container,
  StyledMiniCard,
  DivineMatchMiniBanner,
  DivineMatchMiniBannerTouch,
} from './styledComponents';

export default function MiniBanner() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <Container>
      <StyledMiniCard>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <DivineMatchMiniBanner {...{ isDark }} style={{ marginRight: 4 }}>
            <DivineMatchMiniBannerTouch>
              <Icon
                reverse
                name="ios-baseball"
                type="ionicon"
                color="#f50"
                iconStyle={{ color: '#fff' }}
              />
              <BannerText>Gems</BannerText>
            </DivineMatchMiniBannerTouch>
            <WhiteOverlay borderRadius={10} />
          </DivineMatchMiniBanner>
          <DivineMatchMiniBanner style={{ marginLeft: 4 }}>
            <DivineMatchMiniBannerTouch>
              <Icon
                reverse
                name="ios-american-football"
                type="ionicon"
                color="#517fa4"
                iconStyle={{ color: '#fff' }}
              />
              <BannerText>Rubys</BannerText>
            </DivineMatchMiniBannerTouch>
            <WhiteOverlay borderRadius={10} />
          </DivineMatchMiniBanner>
        </View>
      </StyledMiniCard>
    </Container>
  );
}
