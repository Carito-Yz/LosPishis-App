import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CategoriesScreen from './src/screens/CategoriesScreen.jsx';
import Header from './src/components/Header.jsx';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import ProductsScreen from './src/screens/ProductsScreen.jsx';
import { ActivityIndicator } from 'react-native';

export default function App() {
  const [loaded] = useFonts({
    'Product-Sans-Regular': require('./assets/fonts/ProductSansRegular.ttf'),
    'Product-Sans-Bold': require('./assets/fonts/ProductSansBold.ttf'),
    'Product-Sans-Italic': require('./assets/fonts/ProductSansItalic.ttf'),
    'Product-Sans-Bold-Italic': require('./assets/fonts/ProductSansBoldItalic.ttf'),
    'Juice-ITC-Regular': require('./assets/fonts/Juice-ITC-Regular.ttf')
  });

  const [categorySelected, setCategorySelected] = useState("")
  const [subCategorySelected, setSubCategorySelected] = useState("")

  // Splash screen
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
    <>
      <Header />
        <>
          {categorySelected === "" ? (
            <CategoriesScreen setCategorySelected={setCategorySelected} setSubCategorySelected={setSubCategorySelected} />
          ) : (
            <ProductsScreen category={categorySelected} subCategory={subCategorySelected} />
          )}
        </>
      <StatusBar style="auto" />
    </>
  );
}