import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { auth } from '../scripts/firebase-config';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground,Animated } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const validarCampos = () => {
      if (email == "") {
          setErrorLogin("Informe seu email");
      } else if (password == "") {
          setErrorLogin("Informe sua senha");
      } else {
          setErrorLogin("");
          login();
      }
  }

  const login = () => {
      signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {

  // Signed in 
  const user = userCredential.user;
  setEmail("");
  setPassword("");
  setErrorLogin("");
  router.push('/internas/tasks');
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  setErrorLogin(errorMessage);
});

  }

  const [offset] = useState(new Animated.ValueXY({x:10, y:110}));

useEffect(()=>{
  Animated.spring(offset.y,{
    toValue:2,
    speed:3,
    bounciness:25
  }).start();
},[]);
  

return(
      <Animated.View style={[styles.container,
        {
        transform:[
          {translateY:offset.y}
        ]
      }

      ]}
      >
          <ImageBackground style={styles.logo}

              source ={require('../assets/images/Logo.jpg')}

>


          <TextInput
              style={styles.input}
              placeholder='E-mail'
              value={email}
              onChangeText={setEmail}
          />

          <TextInput
              style={styles.input}
              placeholder='Senha'
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button}
              onPress={validarCampos}
          >
              <Text style={styles.textButton}>ENTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonCreate}
              onPress={() => router.push('/user_create')}
          >
              <Text style={styles.buttonCreateText}>REGISTRAR</Text>
          </TouchableOpacity>
             
          </ImageBackground>
        

      </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
      flex:1,
     

  },
  logo: {
   flex:1,
   justifyContent:'center',
   resizeMode:'cover',
  },
  input: {
      fontSize: 20,
      borderRadius: 20,
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 20,
      width: '70%',
      left:80,
      borderColor: 'black',
      borderWidth: 3,
  },
  button: {
      backgroundColor: 'blue',
      padding: 5,
      borderRadius: 20,
      marginBottom: 10,
      width: 300,
      left:150,
      borderWidth: 3,
  }, 
  textButton: {
      fontSize: 20,
      textAlign: 'center',
      color: '#fff'
  
  },
  buttonCreate: {
    backgroundColor:'blue',
      padding: 5,
      borderWidth: 3,
      borderColor: 'black',
      borderRadius: 20,
      marginBottom:-400,
      width: 300,
      left:150
  },
  buttonCreateText: {
      fontSize: 20,
      textAlign: 'center',
      color: '#fff'

  }
})