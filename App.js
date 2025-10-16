import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { PishisStore} from './src/store';
import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator.jsx';
import { Root } from '@sekizlipenguen/react-native-popup-confirm-toast';

export default function App() {
  const [loaded] = useFonts({
    'Product-Sans-Regular': require('./assets/fonts/ProductSansRegular.ttf'),
    'Product-Sans-Bold': require('./assets/fonts/ProductSansBold.ttf'),
    'Product-Sans-Italic': require('./assets/fonts/ProductSansItalic.ttf'),
    'Product-Sans-Bold-Italic': require('./assets/fonts/ProductSansBoldItalic.ttf'),
    'Juice-ITC-Regular': require('./assets/fonts/Juice-ITC-Regular.ttf')
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [loaded]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000"/>
      </View>
    );
  }

  return (
    <Root>
      <Provider store={PishisStore}>
        <MainNavigator />
        <StatusBar style="auto" />
      </Provider>
    </Root>
  );
}