import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TextInput, TouchableOpacity, Animated } from "react-native";
import { auth, db } from '../scripts/firebase-config';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { StatusBar } from 'expo-status-bar';

export default function CreateUser() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorCreateUser, setErrorCreateUser] = useState("");

    const validarCampos = () => {
        if (nome === "") {
            setErrorCreateUser("Informe o nome");
        } else if (email === "") {
            setErrorCreateUser("Informe o email");
        } else if (password === "") {
            setErrorCreateUser("Informe uma senha");
        } else {
            setErrorCreateUser("");
            createUser();
        }
    };

    const voltarParaLogin = () => {
        router.push('/');
    };

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(db, 'user/' + user.uid), {
                    nome: nome,
                    email: email
                });
                router.push('/');
            })
            .catch((error) => {
                setErrorCreateUser("Erro ao criar conta: " + error.message);
            });
    };

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 110 }));

    useEffect(() => {
        Animated.spring(offset.y, {
            toValue: 2,
            speed: 2,
            bounciness: 25,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: offset.y }] }]}>
            <StatusBar backgroundColor='#fff' />
            <ImageBackground style={styles.logo} source={require('../assets/images/Logo_Registro.jpg')}>
                <TouchableOpacity style={styles.buttonBack} onPress={voltarParaLogin}>
                    <Text style={styles.textButton}>Voltar</Text>
                </TouchableOpacity>

                <Text style={styles.titulo}>Cadastrar Usuário</Text>

                {errorCreateUser !== "" && (
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

                <TouchableOpacity style={styles.button} onPress={validarCampos}>
                    <Text style={styles.textButton}>REGISTRAR</Text>
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
    titulo: {
        backgroundColor: 'red',
        color: 'black',
        fontSize: 20,
        marginBottom: 10,
        alignSelf: 'center',
        padding: 5,
        borderRadius: 20,
        borderWidth: 2,
        width: 200,
        textAlign: 'center',
        marginTop: -10,

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
        width: '70%',
        alignSelf: 'center',
        borderWidth: 3,
        marginTop: 5,
    
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 20,
        width: '40%',
        alignSelf: 'center',
        borderWidth: 3,
        marginTop: 20,
    },
    buttonBack: {
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 20,
        borderWidth: 3,
        width: 90,
        position: 'absolute',
        top: 50,
        left: 20,
    },
    textButton: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
    },
});
