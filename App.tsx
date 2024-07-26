import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RootNavigator from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const GestureHandlerRootViewStyles = {
  flex: 1,
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
