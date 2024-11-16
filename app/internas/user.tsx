import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { addDoc, collection } from "firebase/firestore"; // Importando de 'firebase/firestore'
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from '../../scripts/firebase-config'; // Certifique-se de importar do firebase-config



export default function User() {
    const router = useRouter();

    // Estado para armazenar os dados do formulário
    const [characterName, setCharacterName] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [characterRace, setCharacterRace] = useState('');
    const [characterHistory, setCharacterHistory] = useState('');

    // Função de logout
    const logout = () => {
        signOut(auth).then(() => {
            router.push("/");
        }).catch((error) => {
            console.log(error);
        });
    }

    // Função para salvar a história do personagem no Firestore
    const saveCharacterStory = async () => {
        if (characterName && characterClass && characterRace && characterHistory) {
          try {
            // Adicionando o personagem ao Firestore
            const docRef = await addDoc(collection(db, "characters"), {
              characterName,
              characterClass,
              characterRace,
              characterHistory,
            });
            alert('História salva com sucesso!');
            router.push("/about"); // Navega para a página 'about' após salvar os dados
          } catch (error) {
            console.error("Erro ao adicionar documento: ", error);
            alert("Ocorreu um erro ao salvar a história. Tente novamente.");
          }
        } else {
          alert('Por favor, preencha todos os campos!');
        }
      };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.formContainer}>
                <Text style={styles.title}>Cadastro de História</Text>

                <Text style={styles.label}>Nome do Personagem</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do personagem"
                    value={characterName}
                    onChangeText={setCharacterName}
                />

                <Text style={styles.label}>Classe do Personagem</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a classe do personagem"
                    value={characterClass}
                    onChangeText={setCharacterClass}
                />

                <Text style={styles.label}>Raça do Personagem</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a raça do personagem"
                    value={characterRace}
                    onChangeText={setCharacterRace}
                />

                <Text style={styles.label}>História do Personagem</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Digite a história do personagem"
                    value={characterHistory}
                    onChangeText={setCharacterHistory}
                    multiline
                    textAlignVertical="top"
                    scrollEnabled={true}
                />

                <TouchableOpacity style={styles.saveButton} onPress={saveCharacterStory}>
                    <Text style={styles.buttonText}>Salvar História</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    formContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: 20,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
        color: '#333',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 20,
        fontSize: 20,
        color: '#333',
    },
    textArea: {
        height: 430, // Defina uma altura específica para o campo de história do personagem
        maxHeight: 600, // Limita a altura máxima do campo de história
        paddingTop: 10, // Dá um pequeno espaçamento no topo
        textAlignVertical: 'top', // Alinha o texto no topo
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
