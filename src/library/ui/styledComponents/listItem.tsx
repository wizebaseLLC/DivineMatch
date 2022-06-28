import { ListItem } from 'react-native-elements';
import styled from 'styled-components/native';

const StyledListItem = styled(ListItem).attrs(props => ({
  containerStyle: {
    backgroundColor: props.theme.colors.paper,
  },
}))``;

export default StyledListItem;
