import React from 'react';
import styled from 'styled-components/native';
import Metrics from '../../constants/Metrics';

interface McAvatarProps {
  source: number;
  size?: number;
  onPress?: () => void;
}

const McAvatar: React.FC<McAvatarProps> = ({ source, size, ...rest }) => {
  return <Image source={source} size={size} {...rest} />;
};

const defaultProps: Partial<McAvatarProps> = {
  size: Metrics.images.medium,
};

const Image = styled.Image<{ size?: number; round?: boolean }>`
  width: ${(props: { size: any; }) => props.size || Metrics.images.medium}px;
  height: ${(props: { size: any; }) => props.size || Metrics.images.medium}px;
  border-radius: ${(props: { round: any; size: any; }) =>
    props.round
      ? props.size
        ? `${props.size}px`
        : `${Metrics.images.medium}px`
      : `0px`};
`;

export default McAvatar;

