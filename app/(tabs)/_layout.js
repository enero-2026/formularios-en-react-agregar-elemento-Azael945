import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
    return(
       
        <Tabs screenOptions={{
            headerShown: true
        }}>
        
        <Tabs.Screen name="Index"/>
        <Tabs.Screen name="Alumnos" options={{  
            tabBarIcon: ({color}) => <MaterialIcons  name="account-circle" size={40} color={color}></MaterialIcons>
        }} />
        <Tabs.Screen name="Perfil" options={{
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />
            
        }}
        />   
        </Tabs>
    )
}