import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebaseConfig'
import { Button} from 'react-native'
// import { signOut } from 'firebase/auth'
import React from 'react'

const HomeScreen = ({navigation}) => {

  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }
  
  navigation.setOptions(
    {
      headerRight: () => (
      <Button
        onPress={handleSignOut}
        title="Exit"
        color='black'
        />
      )
    }
  )

  return (
    <View style={styles.container}>
      <Text>
        Home
      </Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})