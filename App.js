import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const App = () => {
  const [enableAuthenticateFeedbackSuccess, authenticateFeedbackSuccess] =
    useState(false);

  useEffect(() => {
    supportedAuthenticationTypesAsync();
  }, []);

  async function supportedAuthenticationTypesAsync() {
    const supportedAuthentication =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (supportedAuthentication && hasHardwareAsync()) {
      authenticate();
    }
  }

  async function isEnrolledAsync() {
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return isEnrolled;
  }

  async function hasHardwareAsync() {
    return await LocalAuthentication.hasHardwareAsync();
  }

  async function authenticate() {
    const result = await LocalAuthentication.authenticateAsync();
    authenticateFeedbackSuccess(result.success);
  }

  const UserAreAuthenticate = useCallback(() => {
    if (enableAuthenticateFeedbackSuccess) {
      return (
        <View style={styles.authenticateFeedbackView}>
          <Text>Authentication performed successfully!</Text>
        </View>
      );
    }

    return null;
  }, [enableAuthenticateFeedbackSuccess]);

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>

      <UserAreAuthenticate />
    </View>
  );
};

export default App;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  authenticateFeedbackView: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
