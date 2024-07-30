import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RootNavigator from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const GestureHandlerRootViewStyles = {
  flex: 1,
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  setDefaultOptions({ locale: ptBR })

  const backgroundStyle = {
    flex: 1,
    backgroundColor: '#f2f2f2',
  };

  return (
    <GestureHandlerRootView style={GestureHandlerRootViewStyles}>
      <SafeAreaView style={backgroundStyle}>
        <RootNavigator/>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
