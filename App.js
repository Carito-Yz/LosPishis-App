import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CategoriesScreen from './src/screens/CategoriesScreen.jsx';
import Header from './src/components/Header.jsx';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync()

export default function App() {

  const [loaded, error] = useFonts({
    'Product-Sans-Regular': require('./assets/fonts/ProductSansRegular.ttf'),
    'Product-Sans-Bold': require('./assets/fonts/ProductSansBold.ttf'),
    'Product-Sans-Italic': require('./assets/fonts/ProductSansItalic.ttf'),
    'Product-Sans-Bold-Italic': require('./assets/fonts/ProductSansBoldItalic.ttf'),
    'Juice-ITC-Regular': require('./assets/fonts/Juice-ITC-Regular.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View>
      <Header />
      <CategoriesScreen />
      <StatusBar style="auto" />
    </View>
  );
}