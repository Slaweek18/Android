import { StyleSheet, FlatList, TouchableOpacity, View, Modal, Text } from 'react-native'
import { auth } from '../firebaseConfig'
import { Button} from 'react-native'
// import { signOut } from 'firebase/auth'
import React, {useState} from 'react'
import { User } from '../components/User'
import { Feather, AntDesign } from '@expo/vector-icons';

const renderHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  return(
  <View>
    <TouchableOpacity style={styles.addEmployee} onPress={()=>{setIsVisible(true)}}>
      <Feather name="user-plus" size={45} color="#2B6AD7" />
    </TouchableOpacity>

    <Modal visible={isVisible}>
      <View style={styles.forma}>
        <AntDesign style={styles.formaIcon} name="closesquare" size={34} color="red" onPress={() => {setIsVisible(false)}}/>
        <Text style={styles.formaText}>
          Форма
        </Text>
      </View>
    </Modal>
  </View>
  )
};

const HomeScreen = ({navigation}) => {

  [employee, setEmploy] = useState([
    {fullName:"Ivan Ivanov", position:"Developer", level:"Middle", card:"1111  1111  1111  1111", balance:"0", dateOfEmployment:"11/10/23"},
    {fullName:"Petro Ivanov", position:"Developer", level:"Middle", card:"1234 6547 1111 1111", balance:"0", dateOfEmployment:"11/10/23"},
    {fullName:"Ivan Ivanov", position:"Developer", level:"Middle", card:"1111  1111  1111  1111", balance:"0", dateOfEmployment:"11/10/23"},
    {fullName:"Ivan Ivanov", position:"Developer", level:"Middle", card:"1111  1111  1111  1111", balance:"0", dateOfEmployment:"11/10/23"},
    {fullName:"Ivan Ivanov", position:"Developer", level:"Middle", card:"1111 1111 1111 1111", balance:"0", dateOfEmployment:"11/10/23"},
  ])

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
        color="#2B6AD7"
        />
      )
    }
  )

  return (
    <View style={styles.container}>

      <FlatList
        data={employee} 
        ListHeaderComponent={renderHeader}
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

  forma:{
    alignItems:'center',
    marginTop:30,
  },

  formaText:{
    borderWidth:2,
  },

  addEmployee:{
    marginTop:15,
    alignItems:'center'
  }
})