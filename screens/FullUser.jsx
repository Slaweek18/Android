import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

export const FullUser = ({route}) => {

  return (
    <View>
      <Text>{route.params.fullName}</Text>
      <Text>{route.params.position}</Text>
      <Text>{route.params.level}</Text>
      <Text>{route.params.dateOfEmployment}</Text>
    </View>
);

}

