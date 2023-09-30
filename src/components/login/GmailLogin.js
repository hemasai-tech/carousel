import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {GoogleSignin} from 'react-native-google-signin';

GoogleSignin.configure({
  webClientId:
    '499037630251-fhv24q75ctdpf98tbjj9l37tdh7r8meh.apps.googleusercontent.com',
  offlineAccess: false,
});

const GmailLogin = () => {
  const [userDetails, setUserDetails] = useState({});

  const handleGmailLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserDetails(userInfo.user);
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    if (userDetails) {
      try {
        showSignOutAlert();
      } catch (error) {
        console.log(error);
      }
    } else {
      showSignInAlert();
    }
  };

  const showSignInAlert = () => {
    Alert.alert(
      'Sign In',
      'Please SignIn before You SignOut',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign In',
          onPress: () => {
            handleGmailLogin();
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };
  const showSignOutAlert = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: async () => {
            await GoogleSignin.signOut();
            setUserDetails(null);
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#12486B'}]}
        onPress={handleGmailLogin}>
        <Text style={styles.buttonText}>Gmail Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#D80032'}]}
        onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      {userDetails && userDetails.email ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>
            Logged in as:
            <Text style={styles.userEmailText}> {userDetails.email}</Text>
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5, // Round the corners of the button
  },
  buttonText: {
    fontSize: 18,
    color: 'white', // Customize button text color
  },
  userInfoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: 18,
  },
  userEmailText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default GmailLogin;
