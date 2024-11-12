import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { auth } from '../scripts/firebase-config';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Animated , StatusBar } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const validarCampos = () => {
    if (email === "") {
      setErrorLogin("Informe seu email");
    } else if (password === "") {
      setErrorLogin("Informe sua senha");
    } else {
      setErrorLogin("");
      login();
    }
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
        setErrorLogin("");
        router.push('/internas/tasks');
      })
      .catch((error) => {
        setErrorLogin("Erro ao fazer login: " + error.message);
      });
  };

  const [offset] = useState(new Animated.ValueXY({ x: 10, y: 110 }));

  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 2,
      speed: 3,
      bounciness: 25,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: offset.y }] }]}>
      <StatusBar backgroundColor='#fff' />
      <ImageBackground style={styles.logo} source={require('../assets/images/Logo_principal.jpg')}>

      <Text style={styles.texto1}>
  Bem-vindo(a) ao início de uma nova jornada!
</Text>

      {errorLogin ? <Text style={styles.errorText}>{errorLogin}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

      

        <TouchableOpacity style={styles.button} onPress={validarCampos}>
          <Text style={styles.textButton}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCreate} onPress={() => router.push('/user_create')}>
          <Text style={styles.buttonCreateText}>REGISTRAR</Text>
        </TouchableOpacity>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  texto1:{
    fontSize:25,
    textAlign:'center',
    marginBottom:30,
  },
  input: {
    fontSize: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    width: '60%',
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 3,
  
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    
  },
  button: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 20,
    
    width: '40%',
    alignSelf: 'center',
    borderWidth: 3,

  },
  textButton: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  buttonCreate: {
    backgroundColor: 'red',
    padding: 5,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 20,
    width: '40%',
    alignSelf: 'center',
    marginTop: 10,
    
    
  },
  buttonCreateText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});
