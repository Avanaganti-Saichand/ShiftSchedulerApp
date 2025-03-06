import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import theme from './src/assets/theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
