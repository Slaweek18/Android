import { RefreshControl, StyleSheet, ScrollView, FlatList, TouchableOpacity, View, Modal, Text } from 'react-native'
import { auth } from '../firebaseConfig'
import { Button} from 'react-native'
import React, {useEffect, useState} from 'react'
import { User } from '../components/User'
import { Feather, AntDesign } from '@expo/vector-icons';
import Form from '../components/Form';
import { db } from '../firebaseConfig';
import { ref, onValue, remove, get} from 'firebase/database';
import { Loading } from '../components/Loading'

const HomeScreen = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  navigation.setOptions({ title: auth.currentUser.displayName || 'Welcome'}); 
  
  const [employee, setEmployee] = useState([]);

  const readData = () =>{
    setIsLoading(true);
    const employersRef = ref(db, 'users/' + auth.currentUser.uid + '/employees/');

    onValue(employersRef, (snapshot) => {
      if (snapshot.exists()) {
        setIsEmpty(false);
        const data = snapshot.val();
        const newEmployee = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setEmployee(newEmployee);
        console.log("newEmployee", newEmployee);
        console.log("data", data);
      } else {
        setIsEmpty(true);
        console.log('Гілка /employees/ не існує');
      }
    }, (error) => {
      console.error('Помилка при перевірці гілки /employees/:', error);
    });
    setIsLoading(false);
  }

  const deleteEmployee = (id) => {
		remove(ref(db, 'users/' + auth.currentUser.uid + '/employees/' + id))
		.then(() => {
			console.log('Removed Succeeded');
		})
		.catch((error)=>{
			console.log('Remove failed' + error.message);
		})
	}

  useEffect(()=>{
    readData();
  },[])

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
    isLoading ? (<Loading />)
    :(
    <View style={styles.container}
    >
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
        <ScrollView style={{flex:1}}
          refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={()=>{readData()}}
          />}
        >
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTxt}>Empty</Text>
          </View>
          
        </ScrollView>
      ) : (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={()=>{readData()}}
          />
        }
        data={employee} 
        style={styles.list}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => {navigation.navigate('FullUser', item); console.log(item.id)}}
          >
            <User
              fullName={item.fullName}
              position={item.position}
              level={item.level}
              sex={item.sex}
              dateOfEmployment={item.dateOfEmployment}
              id={item.id}
              onDelete={() => deleteEmployee(item.id)}
            />
          </TouchableOpacity>
        }
      />
    )}
  </View>
  )
)
}
    
export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  emptyContainer:{
    marginTop:250,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
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