import { useRouter } from 'expo-router';
import { onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { auth, db } from '../../scripts/firebase-config.js';

export default function About() {
    const router = useRouter();

    const [historias, setHistorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistorias = () => {
            const historyRef = ref(db, `history/${auth.currentUser?.uid}`);
            onValue(historyRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const listaHistorias = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));
                    setHistorias(listaHistorias);
                } else {
                    setHistorias([]);
                }
                setLoading(false);
            });
        };

        fetchHistorias();

        return () => ref(db, `history/${auth.currentUser?.uid}`).off();
    }, []);

    const deleteHistory = (id) => {
        const historyRef = ref(db, `history/${auth.currentUser?.uid}/${id}`);
        remove(historyRef)
            .then(() => {
                alert('História excluída com sucesso!');
            })
            .catch((error) => {
                console.error('Erro ao excluir a história:', error);
                alert('Erro ao excluir a história. Tente novamente.');
            });
    };

    const handleLogout = () => {
        alert('Você saiu!');
        router.push('/'); // Navegar para a tela de login ou inicial
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.formContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Histórias Salvas</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Sair</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    <FlatList
                        data={historias}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>{item.characterName}</Text>
                                <Text style={styles.cardSubtitle}>Classe: {item.characterClass}</Text>
                                <Text style={styles.cardSubtitle}>Raça: {item.characterRace}</Text>
                                <Text style={styles.cardText}>{item.characterHistory}</Text>

                                <TouchableOpacity
                                    style={[styles.cardButton, styles.deleteButton]}
                                    onPress={() => deleteHistory(item.id)}
                                >
                                    <Text style={styles.buttonText}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma história encontrada.</Text>}
                    />
                )}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue',
    },
    logoutButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 100,
        borderWidth: 4,
        marginTop: 10, // Adiciona espaçamento acima do botão
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    formContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'blue',
    },
    cardSubtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 5,
        color: '#000',
    },
    cardText: {
        fontSize: 16,
        color: '#333',
        marginTop: 20,
    },
    cardButton: {
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        width: 200,
        left: 150,
    },
    deleteButton: {
        backgroundColor: '#FF0000',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 50,
    },
});
