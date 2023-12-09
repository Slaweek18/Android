import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebaseConfig'
import { Button} from 'react-native'
// import { signOut } from 'firebase/auth'
import React, {useState} from 'react'
import { User } from '../components/User'

const HomeScreen = ({navigation}) => {

  [employee, setEmploy] = useState([
    {fullName:"Ivan Ivanov", position:"Developer", level:"Middle", dateOfEmployment:"11/10/23"},
    {fullName:"Ivan Ivanov", position:"Developer", level:"Middle", dateOfEmployment:"11/10/23"},
    {fullName:"Ivan Ivanov", position:"Developer", level:"Middle", dateOfEmployment:"11/10/23"},])

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
    <View>
    <FlatList
      data={employee} 
      renderItem={({ item }) =>
        <TouchableOpacity onPress={() => {navigation.navigate('FullUser', item)}}>
          <User
            fullName={item.fullName}
            position={item.position}
            level={item.level}
            dateOfEmployment={item.dateOfEmployment}
          />
          
        </TouchableOpacity>
      }
    />

  </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

})