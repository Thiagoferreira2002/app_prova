import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { auth, collection, db, getDocs } from '../../scripts/firebase-config';

export default function About() {
    const router = useRouter();
    const [characters, setCharacters] = useState([]);

    // Buscar personagens do Firestore quando a página é carregada
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "characters"));
                const charactersList = querySnapshot.docs.map(doc => doc.data());
                setCharacters(charactersList);
            } catch (error) {
                console.log("Erro ao buscar personagens:", error);
            }
        };
        fetchCharacters();
    }, []);

    const logout = () => {
        signOut(auth).then(() => {
            router.push("/");
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Suas Histórias</Text>
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {characters.length === 0 ? (
                    <Text style={styles.noDataText}>Você ainda não cadastrou nenhuma história!</Text>
                ) : (
                    characters.map((character, index) => (
                        <View key={index} style={styles.characterCard}>
                            <Text style={styles.characterTitle}>{character.characterName}</Text>
                            <Text style={styles.characterInfo}>Classe: {character.characterClass}</Text>
                            <Text style={styles.characterInfo}>Raça: {character.characterRace}</Text>
                            <Text style={styles.characterHistoryTitle}>História:</Text>
                            <Text style={styles.characterHistory}>{character.characterHistory}</Text>
                        </View>
                    ))
                )}
            </ScrollView>

            
        </SafeAreaView>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        paddingVertical: 20,
        marginTop:30,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    noDataText: {
        fontSize: 20,
        color: '#999',
        textAlign: 'center',
        marginTop: 30,
    },
    characterCard: {
        backgroundColor: '#FFF',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        width: width * 0.9, // Ajuste para largura da tela
        alignSelf: 'center',
    },
    characterTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    characterInfo: {
        fontSize: 18,
        color: '#555',
        marginBottom: 5,
    },
    characterHistoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginBottom: 5,
    },
    characterHistory: {
        fontSize: 18,
        color: '#444',
        lineHeight: 24,
        textAlign: 'justify',
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
