import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
const imgUrl = 'https://i.pinimg.com/564x/a0/11/91/a011918fdb0363191b1656cc84a8dc33.jpg'
const imgUrl2 = 'https://i.pinimg.com/564x/fd/3e/20/fd3e201e732dcdf6cf37f29dd480d580.jpg'



export const FullUser = ({route, navigation}) => {

  navigation.setOptions({
     title:route.params.fullName
    }
  )

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageUp} source={{uri:imgUrl2}} resizeMode="cover">
        
        <View style={styles.card}>
          <ImageBackground style={styles.image} source={{uri:imgUrl}} resizeMode="cover">
            <View style={styles.boxText}>
              <Text style={styles.cardName}>Payment Card</Text>
              <Text style={styles.cardText}>{route.params.card}</Text>
              <Text style={styles.balanceText}>{route.params.balance}  UAH</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.transferBox}>
          <Text style={styles.label}>Amount</Text>
          <TextInput 				
              // value={password}
              // onChangeText={text => setPassword(text)}
              placeholder='0'
              style={styles.input}
              placeholderTextColor='gray'
              color="black"
              keyboardType="numeric"
            >
          </TextInput>
          <TouchableOpacity
              onPress={()=>{}}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Transfer</Text>
            </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
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
    backgroundColor: '#122538',
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
  }
})
