import React, {  useEffect, useState } from 'react';
import { StyleSheet, View, Text,ImageBackground ,TextInput, TouchableOpacity ,Animated} from "react-native";
import { auth, db } from '../scripts/firebase-config';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function CreateUser() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorCreateUser, setErrorCreateUser] = useState("");

    const validarCampos = () => {
        if (nome == "") {
            setErrorCreateUser("Informe o nome");
        } else if (email == "") {
            setErrorCreateUser("Informe o email");
        } else if (password == "") {
            setErrorCreateUser("Informe uma senha");
        } else {
            setErrorCreateUser("");
            createUser();
        }
    }

    const voltacampos = () =>{
        router.push('');

    }


    const createUser = () => {
        // Função que cria usuário no Firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                set(ref(db, 'user/' + user.uid), {
                    nome: nome,
                    email: email
                })
                router.push('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorCreateUser(errorMessage);
            });
    }

    const [offset] = useState(new Animated.ValueXY({x:0, y:110}));

useEffect(()=>{
  Animated.spring(offset.y,{
    toValue:2,
    speed:2,
    bounciness:25
  }).start();
},[]);



    return (
        <Animated.View style={[styles.container,
            {
            transform:[
              {translateY:offset.y}
            ]
          }
    
          ]}>

          <ImageBackground style={styles.logo}

            source ={require('../assets/images/Logo.jpg')}


>

<TouchableOpacity
                style={styles.button2}
                onPress={voltacampos}
            >
                <Text style={styles.textButton}>Volta</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>Cadastrar Usuário</Text>

{errorCreateUser != null && (
                <Text style={styles.alert}>{errorCreateUser}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder='Nome'
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder='E-mail'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Senha'
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={validarCampos}
            >
                <Text style={styles.textButton}>REGISTRAR</Text>
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
    titulo: {
        backgroundColor:'#333',
        color: '#fff',
        fontSize: 25,
        marginBottom: 1,
        left:170,
        borderRadius: 20,
        borderWidth: 3,
        width:250,
        textAlign:'center'
    },

    alert: {
        fontSize: 18,
        textAlign: 'center',
        color: 'yellow',
        marginBottom: 10,
    },
    input: {
        fontSize: 15,
        borderRadius: 20,
        backgroundColor: '#FFF',
        padding: 10,
        marginBottom: 10,
        width: 400,
        left:100,
        borderWidth: 3,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 20,
        width: 300,
        left:150,
        borderWidth: 3,
        padding:8,
        marginBottom:400,

    },
    button2: {
        backgroundColor: 'blue',
        padding: 6,
        borderRadius: 20,
        marginBottom:230,
        width: 90,
        borderWidth: 3,
        left:20

    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    }
});