import { useRouter } from 'expo-router';
import { push, ref, set } from "firebase/database";
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from '../../scripts/firebase-config'; // Certifique-se de importar do firebase-config

export default function User() {
    const router = useRouter();

    // Estado para armazenar os dados do formulário
    const [characterName, setCharacterName] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [characterRace, setCharacterRace] = useState('');
    const [characterHistory, setCharacterHistory] = useState('');

    // Função para criar a história no banco
    const saveCharacterStory = () => {
        if (!characterName || !characterClass || !characterRace || !characterHistory) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos antes de salvar!');
            return;
        }

        const history = ref(db, 'history/' + auth.currentUser?.uid);
        const newHistoryRef = push(history);
        set(newHistoryRef, {
            characterName: characterName,
            characterClass: characterClass,
            characterRace: characterRace,
            characterHistory: characterHistory,
        })
            .then(() => {
                // Exibe mensagem de sucesso
                Alert.alert('Sucesso', 'História criada com sucesso!', [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Limpa os campos e navega para a página de visualização
                            setCharacterName('');
                            setCharacterClass('');
                            setCharacterRace('');
                            setCharacterHistory('');
                            router.push("/internas/about");
                        },
                    },
                ]);
            })
            .catch((error) => {
                Alert.alert('Erro', 'Houve um problema ao criar a história. Tente novamente mais tarde.');
                console.error(error);
            });
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
        color: 'blue',
    },
    formContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: 20,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
        color: 'black',
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
        height: 420,
        maxHeight: 600,
        paddingTop: 10,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        width: 400,
        left: 90,
        borderWidth: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
