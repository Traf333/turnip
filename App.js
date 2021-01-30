import React from 'react'
import { StoreContext } from 'storeon/react'
import { Text, View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from './screens/HomeScreen'
import TurnipScreen from './screens/TurnipScreen'
import EditSpeechScreen from './screens/EditSpeechScreen'
import { resetDatabase } from './lib/database'
import { store } from './stores'

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={resetDatabase} style={styles.button}>
        <Text style={styles.buttonText}>Стереть данные</Text>
      </TouchableOpacity>
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
    <StoreContext.Provider value={store}>

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
            keyboardHidesTabBar: true
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </StoreContext.Provider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 30,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 22,
    color: 'white',

  },
})

