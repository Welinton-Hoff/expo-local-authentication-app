import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const App = () => {
  useEffect(() => {
    authenticate();
  }, []);

  async function authenticate() {
    const result = await LocalAuthentication.authenticateAsync();

    console.log('result => ', result);
  }

  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

export default App;
