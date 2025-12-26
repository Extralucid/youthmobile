import styled from 'styled-components/native';
import  Metrics  from '@constants/Metrics';

interface McBadgeProps {
  size?: number;
  round?: boolean;
}

const McBadge = styled.Image<McBadgeProps>`
  width: ${props => props.size || Metrics.images.small}px;
  height: ${props => props.size || Metrics.images.small}px;
  border-radius: ${(props) =>
    props.round
      ? props.size
        ? `${props.size}px`
        : `${Metrics.images.small}px`
      : `0px`};
`;

export default McBadge;

