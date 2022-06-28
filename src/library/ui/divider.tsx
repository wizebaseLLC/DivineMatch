import { Divider } from 'react-native-elements';
import styled from 'styled-components/native';

const StyledDivider = styled(Divider)`
  background-color: ${props => props.theme.colors.divider};
  margin-left: ${props => props.theme.spacing * 2}px; ;
`;
export default StyledDivider;
