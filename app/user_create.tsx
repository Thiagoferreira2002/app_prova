import { Ionicons } from '@expo/vector-icons'; // Importando o ícone do Ionicons
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from '../scripts/firebase-config.js';

export default function CreateUser() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorCreateUser, setErrorCreateUser] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
    const [successMessage, setSuccessMessage] = useState(""); // Estado de confirmação
    const [showPassword, setShowPassword] = useState(false); // Estado de visibilidade da senha

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
        setIsLoading(true); // Ativa o carregamento
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(db, 'user/' + user.uid), {
                    nome: nome,
                    email: email
                });
                
                setIsLoading(false); // Desativa o carregamento
                setSuccessMessage("Registro concluído com sucesso!");

                setTimeout(() => {
                    setSuccessMessage(""); // Limpa a mensagem de sucesso após 2 segundos
                    router.push('/');
                }, 2000); // Espera 2 segundos antes de redirecionar
            })
            .catch((error) => {
                setErrorCreateUser("Erro ao criar conta: " + error.message);
                setIsLoading(false); // Desativa o carregamento em caso de erro
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

                {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
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

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!showPassword} // Controla a visibilidade da senha
                        placeholder='Senha'
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setShowPassword(!showPassword)} // Alterna a visibilidade
                    >
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"} // Ícone de olho fechado ou aberto
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={validarCampos} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#FFF" /> // Exibe o indicador de carregamento
                    ) : (
                        <Text style={styles.textButton}>REGISTRAR</Text>
                    )}
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
        color: 'black',
        fontSize: 20,
        marginBottom: 10,
        alignSelf: 'center',
        fontWeight: 'bold',
        width: 200,
        textAlign: 'center',
        marginTop: -10,
    },
    alert: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FF0000',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    successText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#00FF00',
        marginBottom: 10,
        fontWeight: 'bold',
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
    passwordContainer: {
        position: 'relative',
        width: '100%',
        alignSelf: 'center',
    },
    icon: {
        position: 'absolute',
        right: 110,
        top: 20,
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 20,
        width: '40%',
        alignSelf: 'center',
        borderWidth: 3,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 15,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
});
