import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from './screens/HomeScreen'
import TurnipScreen from './screens/TurnipScreen'
import EditSpeechScreen from './screens/EditSpeechScreen'


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  )
}

const HomeStack = createStackNavigator()

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Репы' }} />
      <HomeStack.Screen
        name="TurnipScreen"
        component={TurnipScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <HomeStack.Screen
        name="EditSpeechScreen"
        component={EditSpeechScreen}
        options={{
          title: 'Редактирование речи',
        }}

      />
    </HomeStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icons = {
              Home: 'newspaper-outline',
              Settings: 'options-outline',
            }

            return <Ionicons name={icons[route.name]} size={size} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
