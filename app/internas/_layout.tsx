import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: "#F60"},   //Cor da barra de cima
                tabBarStyle: {backgroundColor: "#070A52"},   // Cor da barra de baixo
                headerTitleAlign: 'center',
                headerTintColor: '#FFF',
                tabBarActiveTintColor: "#F60", // Defini a cor do menu ativo na tab bar
                tabBarInactiveTintColor: "#FFF" // Denifi a cor do menu inativo na tabela
            }}
        >
            <Tabs.Screen name="tasks" options={{
                headerTitle: "Tarefas",
                tabBarLabel: "Tarefas",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "check-circle-outline" color={color} size={32}/>
                )
            }} />
            <Tabs.Screen name="user" options={{
                headerTitle: "Dados do Usuário",
                tabBarLabel: "Dados Usuário",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "account" color={color} size={32}/>
                )
            }} />
            <Tabs.Screen name="about" options={{
                headerTitle: "Sobre o aplicativo",
                tabBarLabel: "Sobre o App",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "information-outline" color={color} size={32}/>
                )
            }} />
        </Tabs>
    );
}
