import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../scripts/firebase-config'; // Certifique-se de importar corretamente

export default function CharacterDetails() {
    const [character, setCharacter] = useState(null);

    // Função para buscar as informações do personagem no Firebase
    useEffect(() => {
        const db = getDatabase();
        const characterRef = ref(db, 'history/' + auth.currentUser.uid); // Corrigir a referência
        const unsubscribe = onValue(characterRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setCharacter(data); // Atualiza o estado com os dados do Firebase
            } else {
                console.log("No data available");
            }
        });

        // Cleanup function para remover o listener quando o componente for desmontado
        return () => unsubscribe();
    }, []);

    // Exibir um carregamento até que os dados sejam encontrados
    if (!character) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Carregando...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Suas Histórias</Text>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.detailText}>{character.characterName}</Text>
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>Classe:</Text>
                <Text style={styles.detailText}>{character.characterClass}</Text>
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>Raça:</Text>
                <Text style={styles.detailText}>{character.characterRace}</Text>
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>História:</Text>
                <Text style={styles.detailText}>{character.characterHistory}</Text>
            </View>
        </ScrollView>
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
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    detailContainer: {
        marginBottom: 20,
    },
    detailText: {
        fontSize: 18,
        color: '#555',
    },
});
