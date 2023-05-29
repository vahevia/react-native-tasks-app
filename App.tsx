// App.tsx
import React from 'react';
import AppNavigator from './AppNavigator';
import {Provider} from 'react-redux'
import { store } from './src/redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;