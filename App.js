import React from 'react'
import { StoreContext } from 'storeon/react'
import { StyleSheet, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import * as firebase from 'firebase'

import HomeScreen from './screens/HomeScreen'
import TurnipScreen from './screens/TurnipScreen'
import EditSpeechScreen from './screens/EditSpeechScreen'
import SettingsScreen from './screens/SettingsScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import { store } from './stores'

import { firebaseConfig } from './config/keys'
import LoadingScreen from './screens/LoadingScreen'
import Dashboard from './screens/DashboardScreen'

//
// const HomeStack = createStackNavigator()
//
// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Репы' }} />
//       <HomeStack.Screen
//         name="TurnipScreen"
//         component={TurnipScreen}
//         options={({ route }) => ({ title: route.params.title })}
//       />
//       <HomeStack.Screen
//         name="EditSpeechScreen"
//         component={EditSpeechScreen}
//         options={{
//           title: 'Редактирование речи',
//         }}
//
//       />
//     </HomeStack.Navigator>
//   )
// }

// const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()


export default function App() {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(firebaseConfig)
  }

  return (
    <StoreContext.Provider value={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Loading' component={LoadingScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Sign Up' component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Sign In' component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name='Turnip' component={TurnipScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </StoreContext.Provider>
  )
}

import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Setting a timer'])

// const _console = { ...console }
// console.warn = message => {
//   if (message.indexOf('Setting a timer') <= -1) {
//     _console.warn(message)
//   }
// }
//
// export default function App() {
//   if (!firebase.apps.length) {
//     console.log('Connected with Firebase')
//     firebase.initializeApp(firebaseConfig)
//   }
//
//   return (
//     <StoreContext.Provider value={store}>
//       <ApplicationProvider {...eva} theme={eva.light}>
//         <NavigationContainer>
//           <Tab.Navigator
//             screenOptions={({ route }) => ({
//               tabBarIcon: ({ color, size }) => {
//                 let icons = {
//                   Home: 'newspaper-outline',
//                   Settings: 'options-outline',
//                 }
//
//                 return <Ionicons name={icons[route.name]} size={size} color={color} />
//               },
//             })}
//             tabBarOptions={{
//               activeTintColor: 'tomato',
//               inactiveTintColor: 'gray',
//             }}
//           >
//             <Tab.Screen name="Home" component={HomeStackScreen} />
//             <Tab.Screen name="Settings" component={SettingsScreen} />
//           </Tab.Navigator>
//         </NavigationContainer>
//       </ApplicationProvider>
//     </StoreContext.Provider>
//   )
// }
