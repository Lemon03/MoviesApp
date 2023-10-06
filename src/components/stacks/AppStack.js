import Index from '../screens/Index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MediaDetailScreen from '../screens/MediaDetailScreen';


const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
            name='Index' 
            component={Index}
            options={{
              title: 'Movies App',
              headerStyle: { backgroundColor: '#2e4a70'},
              headerTitleStyle: { color: '#fff' },
              headerTitleAlign: 'center',
            }}
            />
            <Stack.Screen name='MediaDetailScreen' component={MediaDetailScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
