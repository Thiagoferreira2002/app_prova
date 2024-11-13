import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: "green"},   //Cor da barra de cima
                tabBarStyle: {backgroundColor: "blue"},   // Cor da barra de baixo
                headerTitleAlign: 'center',
                headerTintColor: 'black',
                tabBarActiveTintColor: "#fff", // Defini a cor do menu ativo na tab bar
                tabBarInactiveTintColor: "#fff" // Denifi a cor do menu inativo na tabela
            }}
        >
            <Tabs.Screen name="tasks" options={{
                headerShown: false,
                tabBarLabel: "Oque é RPG",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "check-circle-outline" color={color} size={32}/>
                )
            }} />
            <Tabs.Screen name="user" options={{
                 headerShown: false,
                tabBarLabel: " Cadastro de História",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "account" color={color} size={32}/>
                )
            }} />
            <Tabs.Screen name="about" options={{
                headerShown: false,
                tabBarLabel: "Suas Historias ",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "information-outline" color={color} size={32}/>
                )
            }} />
        </Tabs>
    );
}
