import { RefreshControl, StyleSheet, FlatList, TouchableOpacity, View, Modal, Text } from 'react-native'
import { auth } from '../firebaseConfig'
import { Button} from 'react-native'
// import { signOut } from 'firebase/auth'
import React, {useEffect, useState} from 'react'
import { User } from '../components/User'
import { Feather, AntDesign } from '@expo/vector-icons';
import Form from '../components/Form';
import {
  onAuthStateChanged
} from 'firebase/auth';
import { db } from '../firebaseConfig';
import { ref, onValue, get} from 'firebase/database';
import { Loading } from '../components/Loading'

const HomeScreen = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  navigation.setOptions({ title: auth.currentUser.displayName || 'Welcome'}); 
  
  [employee, setEmploy] = useState();

  const readData = () =>{
    setIsLoading(true);
    const employersRef = ref(db, 'users/' + auth.currentUser.uid + '/employees/');
    get(employersRef).then((snapshot) => {
      if (snapshot.exists()) {
        // Гілка існує, можна зчитувати дані
        onValue(employersRef, (snapshot) => {
          const data = snapshot.val();
          const newEmployee = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setEmploy(newEmployee)
        })
      } else {
        // Гілка не існує або там немає даних
        setIsEmpty(true);
        console.log('Гілка /employees/ не існує або там немає даних');
      }
    }).catch((error) => {
      console.error('Помилка при перевірці гілки /employees/:', error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  useEffect(readData,[])

  
  
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
  
  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.addEmployee} onPress={()=>{setIsVisible(true)}}>
          <Feather name="user-plus" size={45} color="#2B6AD7" />
        </TouchableOpacity>

        <Modal visible={isVisible}>
          <View style={styles.forma}>
            <AntDesign name="arrowleft" size={40} color="blue" onPress={() => {setIsVisible(false)}}/>
            <Text style={styles.formaText}>
              Employee information
            </Text>
            <Form setIsVisible={setIsVisible}></Form>
          </View>
        </Modal>
      </View>

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTxt}>Empty</Text>
        </View>
      ) : (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={()=>{readData()}}
          />
        }
        data={employee} 
        style={styles.list}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => {navigation.navigate('FullUser', item ) ; console.log(item.id)}
          }>
            <User
              fullName={item.fullName}
              position={item.position}
              level={item.level}
              dateOfEmployment={item.dateOfEmployment}
            />
          </TouchableOpacity>
        }
      />
      )}
    </View>
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  emptyContainer:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
  },

  emptyTxt:{
    fontSize:18,
    fontWeight:'bold',
    color:'#6661616e'
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