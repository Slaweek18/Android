import { RefreshControl, StyleSheet, ScrollView, FlatList, TouchableOpacity, View, Modal, Text, Alert} from 'react-native'
import { auth } from '../firebaseConfig'
import { Button} from 'react-native'
import React, {useEffect, useState} from 'react'
import { User } from '../components/User'
import { Feather, AntDesign } from '@expo/vector-icons';
import Form from '../components/Form';
import { db } from '../firebaseConfig';
import { ref, onValue, remove, get} from 'firebase/database';
import { Loading } from '../components/Loading'
import { Ionicons } from '@expo/vector-icons'; 

const imgUrl2 = 'https://i.pinimg.com/564x/fd/3e/20/fd3e201e732dcdf6cf37f29dd480d580.jpg'


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

  const showConfirmation = (id) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete an employee',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            deleteEmployee(id);
          },
        },
      ],
      { cancelable: false }
    )
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
        <View style={styles.headerRight}>
          <Ionicons  onPress={handleSignOut} name="exit-outline" size={34} color="black" />
      </View>
      )
    }
  )

  return (
    isLoading ? (<Loading />)
    :(
    <View style={styles.container}
    >
      <View style={styles.container2}>

        <Feather name="user-plus" size={45} color="#fefefe" style={styles.addEmployee} onPress={()=>{setIsVisible(true)}}/>

        <Modal visible={isVisible}>
          <View style={styles.forma}>
            <AntDesign name="arrowleft" size={40} color="black" onPress={() => {setIsVisible(false)}}/>
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
        contentContainerStyle={styles.flatListContainer}
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
              onDelete={() => showConfirmation(item.id)}
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
  container2:{
    alignItems:'center',
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
    // backgroundColor:'#a8a9a9'
  },

  addEmployee:{
    position: 'absolute',
    top:630,
    backgroundColor: '#8d8d8e93', 
    borderRadius: 25, 
    padding: 10,
    zIndex:1,
  },
  headerRight:{
    marginRight:10,
  }


})