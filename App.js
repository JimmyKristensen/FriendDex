import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CreateDexScreen from './screens/CreateDexScreen';
import AllDexScreen from './screens/AllDexScreen';
import DexScreen from './screens/DexScreen';

const Stack = createNativeStackNavigator()


export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'HomeScreen'}}
          />
          <Stack.Screen
            name="CreateDexScreen"
            component={CreateDexScreen}
            options={{title: 'Add friend to Dex'}}
          />
          <Stack.Screen 
            name='AllDexScreen'
            component={AllDexScreen}
            options={{title: "FriendDex"}}
          />
          <Stack.Screen
            name='DexScreen'
            component={DexScreen}
            options={{title: "Dex"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

