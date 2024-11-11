import { Stack } from "expo-router";
import { Alert, Button, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown:false,
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="index" options={{
                headerShown: false
            }} />
            <Stack.Screen name="user_create" options={{
                headerTitle: ''
            }} />
            <Stack.Screen name="internas" options={{
                headerShown: false
            }} />
        </Stack>
    );
}