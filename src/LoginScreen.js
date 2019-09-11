import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground} from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from 'react-native-google-signin';
import {Container, Content, Header, Form, Input, Item, Label, Button} from 'native-base'; 

class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      
  }
}


  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function(result) {
              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };
  signInWithGoogleAsync = async () => {
    try {
    await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
        autoResolve: true
      })
    // add any configuration settings here:
    await GoogleSignin.configure({

      webClientId:'196387206475-226apg54c8lmdn5g1l61ijkadf8245a9.apps.googleusercontent.com',
      offlineAccess: false,
    });

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
    // login with credential
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
  } catch (e) {
    console.log({error:e});
    alert(JSON.stringify(e))
  }
  };

  
  render() {
    return (

      <Container style={styles.container} >
      <ImageBackground source={require('../icon/login.png')} style={{width: '90%', height: '90%', position: 'absolute'}}>
      </ImageBackground>
      <Form>

      <Item floatingLabel>
      <Label>Email</Label>
      <Input
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize= 'none'

      />
      </Item>

      <Item floatingLabel>
      <Label>Password</Label>
      <Input
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize= 'none'
      />
      </Item>

      <Button
        full
        rounded
        success
        style={styles.button}
        onPress={() => this.props.navigation.navigate('Home')}
      >
      <Text style={styles.text} >Login</Text>
      </Button>

      <Button
        full
        rounded
        primary
        style={styles.button}
      >
      <Text style={styles.text} >Daftar</Text>
      </Button>

      </Form>

        <GoogleSigninButton
          style={{ width: 200, height: 48, marginTop: 20 }}
          color={GoogleSigninButton.Color.Dark}
          size={GoogleSigninButton.Size.Wide}
          onPress={() => this.signInWithGoogleAsync()}
        />

     </Container>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  text: {
    color: 'white'
  },
  button: {
    marginTop: 20
  }
});
