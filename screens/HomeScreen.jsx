import { StyleSheet, FlatList, TouchableOpacity, View, Modal, Text } from 'react-native'
import { auth } from '../firebaseConfig'
import { Button} from 'react-native'
// import { signOut } from 'firebase/auth'
import React, {useState} from 'react'
import { User } from '../components/User'
import { Feather, AntDesign } from '@expo/vector-icons';
import Form from '../components/Form';

const HomeScreen = ({navigation}) => {

  const [isVisible, setIsVisible] = useState(false);
    
  [employee, setEmploy] = useState([
    {fullName:"Ivan Ivanov", sex:"Male", position:"Developer", level:"Middle", card:"1111  1111  1111  1111", balance:"0", dateOfEmployment:"11/10/23"},
    {fullName:"Petro Ivanov", sex:"Male", position:"Developer", level:"Middle", card:"1234 6547 1111 1111", balance:"0", dateOfEmployment:"11/10/23"},
    {fullName:"Ivan Ivanov", sex:"Male", position:"Developer", level:"Middle", card:"1111  1111  1111  1111", balance:"0", dateOfEmployment:"11/10/23"},
    {fullName:"Ivan Ivanov", sex:"Male", position:"Developer", level:"Middle", card:"1111  1111  1111  1111", balance:"0", dateOfEmployment:"11/10/23"},
    {fullName:"Ivan Ivanov", sex:"Male", position:"Developer", level:"Middle", card:"1111 1111 1111 1111", balance:"0", dateOfEmployment:"11/10/23"},
    {fullName:"Ivan Ivanov", sex:"Male", position:"Developer", level:"Middle", card:"1111 1111 1111 1111", balance:"0", dateOfEmployment:"11/10/23"},
    {fullName:"Ivan Ivanov", sex:"Male", position:"Developer", level:"Middle", card:"1111 1111 1111 1111", balance:"0", dateOfEmployment:"11/10/23"},
  ])

  const addEmployee = (newEmployee) => {
    setEmploy(employees =>{
      return [
        newEmployee,
        ...employees
      ]
    });
    setIsVisible(false);
  }

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
      <View>
        <TouchableOpacity style={styles.addEmployee} onPress={()=>{setIsVisible(true)}}>
          <Feather name="user-plus" size={45} color="#2B6AD7" />
        </TouchableOpacity>

        <Modal visible={isVisible}>
          <View style={styles.forma}>
            {/* <AntDesign style={styles.formaIcon} name="closesquare" size={34} color="red" onPress={() => {setIsVisible(false)}}/> */}
            <AntDesign name="arrowleft" size={40} color="blue" onPress={() => {setIsVisible(false)}}/>
            <Text style={styles.formaText}>
              Employee information
            </Text>
            <Form addEmployee={addEmployee}></Form>
          </View>
        </Modal>
      </View>
      <FlatList
        data={employee} 
        // ListHeaderComponent={renderHeader}
        style={styles.list}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => {navigation.navigate('FullUser', item)}}>
            <User
              fullName={item.fullName}
              position={item.position}
              level={item.level}
              dateOfEmployment={item.dateOfEmployment}
              sex={item.sex}
            />
          </TouchableOpacity>
        }
      />

    </View>
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  formaModal:{
    alignItems:'center',
    marginTop:10,
    
  },

  formaText:{
    marginTop:20,
    fontSize:25,
    textAlign:'center'
  },
  forma:{
    flex:1,
  },

  addEmployee:{
    marginTop:15,
    alignItems:'center'
  },

})