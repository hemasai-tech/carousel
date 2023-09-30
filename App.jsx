import React from 'react';
import GmailLogin from './src/components/login/GmailLogin';
import ImageCarousel from './src/components/carousel/Carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigation from './StackNavigation';

const App = () => {
  return (
    <GestureHandlerRootView
      style={{flex: 1, marginBottom: 'auto', backgroundColor: '#fff'}}>
      <StackNavigation />
    </GestureHandlerRootView>
  );
};

export default App;
