// /**
//  * React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, DestinationDetails} from './src/screens';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={DestinationDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
