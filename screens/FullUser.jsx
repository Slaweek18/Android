import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

import { auth } from '../firebaseConfig'
import { db } from '../firebaseConfig';
import { ref, set, push, update } from 'firebase/database';

const imgUrl = 'https://i.pinimg.com/564x/a0/11/91/a011918fdb0363191b1656cc84a8dc33.jpg'
const imgUrl2 = 'https://i.pinimg.com/564x/fd/3e/20/fd3e201e732dcdf6cf37f29dd480d580.jpg'

import { Formik } from "formik"
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  amount: Yup.string()
  .max(6, 'No more than 999999!')
  .matches(/^[1-9]\d*$/, 'Invalid number!')
  .required('Enter the amount!'),
});

export const FullUser = ({route, navigation}) => {

  const [balance, setBalance] = useState(route.params.balance);

  const addSalary = (amount) => {
    let preAmount = balance;
    let newBalance = +preAmount+ +amount;
    const updateData = () => {
      try {
        const dbRef = ref(db, 'users/' + auth.currentUser.uid + '/employees/' + route.params.id);
        const dbhist = ref(db, 'users/' + auth.currentUser.uid + '/history/');
		    const newEmployeeRef = push(dbhist); 
        set(newEmployeeRef, {
          fullName: route.params.fullName,
          card: route.params.card,
          amount:amount,
          dateOfSalary:new Date().toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit', month: 'long', day: '2-digit', year: 'numeric' }),
        });
        
        update(dbRef, {
          balance: newBalance,
        });
        
        console.log('Дані успішно оновлені в базі даних!');
      } catch (error) {
        console.error('Сталася помилка під час оновлення даних:', error.message);
      }
    };
    updateData()
    setBalance(newBalance);
  }

  const showConfirmation = (amount) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to send the salary',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            addSalary(amount);
          },
        },
      ],
      { cancelable: false }
  )
  }

  useEffect(() => {
    console.log(route.params);
  }, []);

  navigation.setOptions({
     title:route.params.fullName +'(' + route.params.position +'/'+route.params.level+')'
    }
  )
  
  return (
    <ScrollView style={styles.container}
    contentContainerStyle={{ flexGrow: 1 }} 
		keyboardShouldPersistTaps="handled" >
      <ImageBackground style={styles.imageUp} source={{uri:imgUrl2}} resizeMode="cover">
        
        <View style={styles.card}>
          <ImageBackground style={styles.image} source={{uri:imgUrl}} resizeMode="cover">
            <View style={styles.boxText}>
              <Text style={styles.cardName}>Payment Card</Text>
              <Text style={styles.cardText}>{route.params.card}</Text>
              <Text style={styles.balanceText}>{balance} UAH</Text>
            </View>
          </ImageBackground>
        </View>

        <Formik 
					initialValues={{
						amount:'', 
					}}
					validationSchema={SignupSchema}
					onSubmit={(values, { resetForm }) => { 
            showConfirmation(values.amount);
            resetForm();
					}}
						
					>
					{(props) => (
          <View style={styles.transferBox}>
            <Text style={styles.label}>Amount</Text>
            <TextInput 				
                placeholder='0'
                style={styles.input}
                placeholderTextColor='gray'
                color="black"
                keyboardType="numeric"  
                value={props.values.amount}
                
                onChangeText={props.handleChange('amount')}
                onBlur={()=> props.setFieldTouched('amount')}   
              />
                {props.touched.amount && props.errors.amount &&  (
									<Text style={styles.errorTxt}>{props.errors.amount}</Text>
								)}

            <TouchableOpacity style={[styles.button, {backgroundColor: props.isValid ? '#2B6AD7' : '#A5C9CA'}]} 
								onPress={props.handleSubmit}
								disabled={!props.isValid}> 
                
                <Text style={styles.buttonText}>Transfer</Text>
              </TouchableOpacity>
            </View>
            )}
        </Formik>
      </ImageBackground>
    </ScrollView>
);
}

const styles = StyleSheet.create({

  container:{
    flex:1,
		// backgroundColor: '#497097',
  },
  
  card:{
    width:380,
    height:280,
    borderRadius:30,
    overflow: 'hidden',
  },

  boxText:{
    flex:1,
    justifyContent:'space-between',
  },

  imageUp: {
    justifyContent:"space-evenly",
    alignItems:"center",
    width: '100%',
    height: '100%',
  },

  image: {
    flex: 1,
    borderRadius:30,
    padding: 20,
  },

  cardName:{
    alignSelf:'flex-end',
    fontSize: 25,
    fontWeight:'900',
    color:'white'
  },

  cardText:{
    fontSize: 25,
    color:'white'

  },

  balanceText:{
    fontSize: 25,
    color:'white'
  },

  transferBox:{
    alignItems:'center'
  },

  label:{
    alignSelf:'flex-start'
  },

  button: {
    // backgroundColor: '#122538',
    width: 130,
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginTop:10,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    color:'white',
  },
  input: {
    width:200,
    paddingVertical:10,
    paddingHorizontal: 15,
    borderWidth:1,
    borderColor:'#95989962',
    color:'white',
    fontSize:16,
  },

  errorTxt:{
		color:'red',
	}
})
