import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="user_create" options={{
                headerTitle: '',  // Título do cabeçalho vazio
            }} />
            <Stack.Screen name="index" options={{
                headerShown: false,
                headerTitle: ''
            }} />
            <Stack.Screen name="internas" options={{
                headerShown: false,
                headerTitle: ''
            }} />
        </Stack>
    );
}
