import { RefreshControl, StyleSheet, ScrollView, FlatList, Button, View, Modal, Text } from 'react-native'
import { auth } from '../firebaseConfig'

import React, {useEffect, useState} from 'react'
import { db } from '../firebaseConfig';
import { ref, onValue, remove} from 'firebase/database';
import { Loading } from '../components/Loading'
import { Salary } from '../components/Salary'
import { MaterialIcons } from '@expo/vector-icons'; 


const HistoryScreen = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [transaction, setTransaction] = useState([]);

  
  const readData = () =>{
    setIsLoading(true);
    const historyRef = ref(db, 'users/' + auth.currentUser.uid + '/history/');
    
    onValue(historyRef, (snapshot) => {
      if (snapshot.exists()) {
        setIsEmpty(false);
        const data = snapshot.val();
        const newTransaction = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setTransaction(newTransaction);
        console.log("newTransaction", newTransaction);
        console.log("data", data);
      } else {
        setIsEmpty(true);
        console.log('Гілка /history/ не існує');
      }
    }, (error) => {
      console.error('Помилка при перевірці гілки /history/:', error);
    });
    setIsLoading(false);
  }

  const clearHistory=() => {
		remove(ref(db, 'users/' + auth.currentUser.uid + '/history/'))
		.then(() => {
			console.log('Removed Succeeded');
		})
		.catch((error)=>{
			console.log('Remove failed' + error.message);
		})
	}

  
  navigation.setOptions(
    {
      headerRight: () => (
      <View style={styles.headerRight}>
        <MaterialIcons name="history" size={34} color="black" onPress={clearHistory} />
      </View>
      )
    }
  )

  useEffect(()=>{
    readData();
  },[])

    return (
      isLoading ? (<Loading />)
      :(
      <View style={styles.container}
      >
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
          // inverted={true}
          data={transaction} 
          style={styles.list}
          renderItem={({ item }) =>
              <Salary
                fullName={item.fullName}
                amount={item.amount}
                card={item.card}
                dateOfSalary={item.dateOfSalary}
              />
          }
          />
        )}
      </View>
      )
    )
}

export default HistoryScreen


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
  headerRight:{
    marginRight:10,
  }

})