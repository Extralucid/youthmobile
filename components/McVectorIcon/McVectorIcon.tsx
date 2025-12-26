import React from 'react';
// PropTypes is not needed in TypeScript as static typing replaces it.
// import PropTypes from 'prop-types';

// Define the props interface for the component
interface McVectorIconProps {
  type: string; // Corresponds to PropTypes.string
  name: string; // Corresponds to PropTypes.string
  color?: string; // Optional because of defaultProps, corresponds to PropTypes.string
  size?: number; // Optional because of defaultProps, corresponds to PropTypes.number
  onPress?: (() => void) | null | undefined; // Optional because of defaultProps, corresponds to PropTypes.func allowing null
  style?: any; // Optional because of defaultProps, using 'any' to match the looseness of PropTypes.object
}

// Define the functional component with the specified props type
const McVectorIcon: React.FC<McVectorIconProps> = (props) => {
  const {type, name, color, size, onPress, style} = props;

  // Define a type for the dynamically imported icon components
  type IconComponentType = React.ComponentType<any>;

  // defaultProps are still used in TypeScript to provide default values
const defaultProps: Partial<McVectorIconProps> = {
  size: 20,
  style: {}, // Note: {} is not a strict React Native style type, but matching original default
  onPress: null,
  color: '#757575',
};

  switch (type) {
    case 'AntDesign': {
      // Dynamically require the component and assert its type
      const AntDesign = require('react-native-vector-icons/AntDesign').default as IconComponentType;
      return (
        <AntDesign
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case 'Entypo': {
      // Dynamically require the component and assert its type
      const Entypo = require('react-native-vector-icons/Entypo').default as IconComponentType;
      return (
        <Entypo
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case 'Ionicons': {
      // Dynamically require the component and assert its type
      const Ionicons = require('react-native-vector-icons/Ionicons').default as IconComponentType;
      return (
        <Ionicons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case 'SimpleLineIcons': {
      // Dynamically require the component and assert its type
      const SimpleLineIcons = require('react-native-vector-icons/SimpleLineIcons')
        .default as IconComponentType;
      return (
        <SimpleLineIcons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case 'EvilIcons': {
      // Dynamically require the component and assert its type
      const EvilIcons = require('react-native-vector-icons/EvilIcons').default as IconComponentType;
      return (
        <EvilIcons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case 'MaterialIcons': {
      // Dynamically require the component and assert its type
      const MaterialIcons = require('react-native-vector-icons/MaterialIcons')
        .default as IconComponentType;
      return (
        <MaterialIcons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case 'FontAwesome': {
      // Dynamically require the component and assert its type
      const FontAwesome = require('react-native-vector-icons/FontAwesome')
        .default as IconComponentType;
      return (
        <FontAwesome
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case 'Foundation': {
      // Dynamically require the component and assert its type
      const Foundation = require('react-native-vector-icons/Foundation')
        .default as IconComponentType;
      return (
        <Foundation
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case 'MaterialCommunityIcons': {
      // Dynamically require the component and assert its type
      const MaterialCommunityIcons = require('react-native-vector-icons/MaterialCommunityIcons')
        .default as IconComponentType;
      return (
        <MaterialCommunityIcons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case 'Zocial': {
      // Dynamically require the component and assert its type
      const Zocial = require('react-native-vector-icons/Zocial').default as IconComponentType;
      return (
        <Zocial
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case 'Octicons': {
      // Dynamically require the component and assert its type
      const Octicons = require('react-native-vector-icons/Octicons').default as IconComponentType;
      return (
        <Octicons
          name={name}
          style={style}
          color={color}
          // Note: Octicons case has a specific default size fallback if 'size' is falsy
          size={size ? size : 18}
          onPress={onPress}
        />
      );
    }
    case 'Fontisto': {
      // Dynamically require the component and assert its type
      const Fontisto = require('react-native-vector-icons/Fontisto').default as IconComponentType;
      return (
        <Fontisto
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }
    case 'Feather': {
      // Dynamically require the component and assert its type
      const Feather = require('react-native-vector-icons/Feather').default as IconComponentType;
      return (
        <Feather
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    default: {
      // Dynamically require the default component and assert its type
      const MaterialIcons = require('react-native-vector-icons/MaterialIcons')
        .default as IconComponentType;
      return (
        <MaterialIcons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }
  }
};



// propTypes are replaced by static typing in TypeScript and are removed.
// McVectorIcon.propTypes = {
//   type: PropTypes.string,
//   name: PropTypes.string,
//   color: PropTypes.string,
//   size: PropTypes.number,
//   onPress: PropTypes.func,
//   style: PropTypes.object,
// };

export default McVectorIcon;
