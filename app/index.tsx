import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from 'react-native-vector-icons';
import { auth } from '../scripts/firebase-config';

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Novo estado de carregamento

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
    setIsLoading(true); // Ativa o carregamento
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
        setErrorLogin("");
        setSuccessMessage("Login concluído com sucesso!");

        setTimeout(() => {
          setSuccessMessage("");
          setIsLoading(false); 
          router.push('/internas/tasks');
        }, 2000); 
      })
      .catch((error) => {
        setErrorLogin("Erro ao fazer login: " + error.message);
        setIsLoading(false); 
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
          Bem-vindo(a) ao início de uma nova jornada
        </Text>

        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
        {errorLogin ? <Text style={styles.errorText}>{errorLogin}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword(prevState => !prevState)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={validarCampos} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" /> // Exibe o indicador de carregamento
          ) : (
            <Text style={styles.textButton}>ENTRAR</Text>
          )}
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.infoText}>Não possui conta? </Text>
          <TouchableOpacity onPress={() => router.push('/user_create')}>
            <Text style={styles.registerText}>REGISTRAR</Text>
          </TouchableOpacity>
        </View>
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
  texto1: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
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
  successText: {
    color: '#00FF00',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    width: '40%',
    alignSelf: 'center',
    borderWidth: 3,
    alignItems: 'center', // Centraliza o ActivityIndicator
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#fff',
  },
  registerText: {
    fontSize: 15,
    color: '#fff',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    right: 140,
    top: 15,
  },
});
