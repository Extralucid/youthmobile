import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
// import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    
  const [finger, setFinger] = useState(null);
  const [identifiant, setIdentifiant] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
const router = useRouter();
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const AffichePassword = () => {
    setShowPassword(!showPassword);
  };

  async function redirect() {
    if (identifiant == '' || password == '') {
      setMessage('Remplissez tous les champs !');
      onToggleSnackBar();
    } else {
      await login();
    }
  }

  const goToRegister = async () => {
    router.replace('/auth/signup');
  };

    const goToForgot = async () => {
    router.replace('/auth/forgetPassword');
  };

  const scanFingerprint = async () => {
     const email = await AsyncStorage.getItem('email');
     const pwd = await AsyncStorage.getItem('pwd');

    // if (!email || !pwd) return;

    let result = await LocalAuthentication.authenticateAsync();
     console.log('Scan Result:', result);
    //setFinger(JSON.stringify(result));
    if (result.success == true) {
      await loginWithFingerPrint(email, pwd);
    }
  };

  async function login() {
    router.replace('/onboarding/categories');
    // setLoading(true);
    // const url = 'https://gesmuttest.menet.ci:5482/api/v1/signin';
    // return fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: identifiant,
    //     password: password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then(async (responseData) => {
    //     if (responseData.status == 'Success') {
    //       const name = responseData.data.original.adherent.anom;
    //       const prenoms = responseData.data.original.adherent.aprenom;
    //       const genre = responseData.data.original.adherent.asexe;
    //       const id = responseData.data.original.adherent.aid;
    //       const photo = responseData.data.original.adherent.aphoto;
    //       const token = responseData.data.original.token;
    //       await AsyncStorage.setItem('nom', name);
    //       await AsyncStorage.setItem('prenoms', prenoms);
    //       await AsyncStorage.setItem('genre', genre);
    //       await AsyncStorage.setItem('id', String(id));
    //       await AsyncStorage.setItem('email', responseData.data.original.user.email);
    //       await AsyncStorage.setItem('pwd', password);
    //       await AsyncStorage.setItem('token', token);
    //       await AsyncStorage.setItem('aphoto', photo);
    //       await setObjectValue(responseData.data.original.adherent);
    //       // console.log('data saved connexion')
    //       setLoading(false);
    //       //navigation.navigate('Tabs');
    //     } else if (responseData.status == 'Error') {
    //       setMessage('Accès incorrects');
    //       setLoading(false);
    //       onToggleSnackBar();
    //     }
    //   })
    //   .catch((error) => {
    //     if (error === 'Network request failed') {
    //       setMessage("L'application est indisponible");
    //       setLoading(false);
    //       onToggleSnackBar();
    //     }
    //   });
  }

  async function loginWithFingerPrint(email: string, password: string) {
    // if (email && password) {
    //   setLoading(true);
    //   const url = '/';
    //   return fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then(async (responseData) => {
    //       if (responseData.status == 'Success') {
    //         const name = responseData.data.original.adherent.anom;
    //         const prenoms = responseData.data.original.adherent.aprenom;
    //         const genre = responseData.data.original.adherent.asexe;
    //         const id = responseData.data.original.adherent.aid;
    //         const photo = responseData.data.original.adherent.aphoto;
    //         const token = responseData.data.original.token;
    //         await AsyncStorage.setItem('nom', name);
    //         await AsyncStorage.setItem('prenoms', prenoms);
    //         await AsyncStorage.setItem('genre', genre);
    //         await AsyncStorage.setItem('id', String(id));
    //         await AsyncStorage.setItem('email', responseData.data.original.user.email);
    //         await AsyncStorage.setItem('pwd', password);
    //         await AsyncStorage.setItem('token', token);
    //         await AsyncStorage.setItem('aphoto', photo);
    //         await setObjectValue(responseData.data.original.adherent);
    //         console.log('data saved connexion');
    //         setLoading(false);
    //         //navigation.navigate('Tabs');
    //       } else if (responseData.status == 'Error') {
    //         setMessage('Accès incorrects');
    //         setLoading(false);
    //         onToggleSnackBar();
    //       }
    //     })
    //     .catch((error) => {
    //       if (error === 'Network request failed') {
    //         setMessage("L'application est indisponible");
    //         setLoading(false);
    //         onToggleSnackBar();
    //       }
    //     });
    // } else {
    //   setMessage('Veuillez vous connecter au moins une fois avec vos identifiants');
    //   console.log(email);
    //   console.log(password);
    //   onToggleSnackBar();
    // }
  }
  useEffect(() => {
    scanFingerprint();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.fieldsetTitle}>Youth Connect BF</Text>
        <View style={styles.formGroup}>
          <TextInput
            label="Email ou Téléphone"
            placeholder="Entrez votre adresse mail"
            value={identifiant}
            style={styles.textInput}
            activeUnderlineColor="#ABBAC8"
            placeholderTextColor="#ABBAC8"
            keyboardType="email-address"
            onChangeText={(text) => setIdentifiant(text)}
          />
          <TextInput
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            value={password}
            secureTextEntry={showPassword}
            style={{ marginBottom: '2%', backgroundColor: '#F2F2F2' }}
            activeUnderlineColor="#ABBAC8"
            placeholderTextColor="#ABBAC8"
            onChangeText={(text) => setPassword(text)}
            right={<TextInput.Icon icon="eye" onPress={() => AffichePassword()} />}
          />
          <Text style={styles.forgetPasswordText} onPress={() => {goToForgot();}}>Mot
                        de passe oublié ?</Text>
          <Button mode="contained" style={styles.buttonLogin} onPress={() => redirect()}>
            Se connecter
          </Button>
          <View style={styles.print}>
            <MaterialCommunityIcons
              name="fingerprint"
              color="#000"
              size={55}
              onPress={() => scanFingerprint()}
            />
            <Text style={{ fontSize: 12, fontWeight: '600' }}>
              Se connecter par empreinte digitale
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.leftLine}></View>
            <Text style={{ flex: 1, fontSize: 17, textAlign: 'center' }}>Ou</Text>
            <View style={styles.rightLine}></View>
          </View>
          <Text style={styles.SignInTitle} onPress={() => {goToRegister();}}>
            Inscrivez-vous
          </Text>
        </View>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Compris',
          onPress: () => {
            onToggleSnackBar();
          },
        }}
      >
        {message}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  print: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginBottom: '6%',
  },
  formContainer: {
    borderRadius: 10,
    borderColor: 'lightgray',
    width: '90%',
    padding: 25,
  },
  textInput: {
    marginBottom: '9%',
    backgroundColor: '#F2F2F2',
  },
  formGroup: {
    paddingTop: '9%',
  },
  buttonLogin: {
    marginBottom: '5%',
    marginTop: '9%',
    backgroundColor: '#F59B21',
    borderRadius: 8,
  },
  fieldsetTitle: {
    fontWeight: 'bold',
    fontSize: 21,
    textAlign: 'center',
    marginBottom: '0%',
  },
  SignInTitle: {
    textAlign: 'center',
    color: '#F59B21',
    marginTop: '4%',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  forgetPasswordText: {
    textAlign: 'right',
    color: '#F59B21',
    textDecorationLine: 'underline',
    marginBottom: '7%',
  },
  leftLine: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 0,
    position: 'relative',
    top: '4%',
  },
  rightLine: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 0,
    position: 'relative',
    top: '4%',
  },
  logo: {
    width: 140,
    height: 87,
    alignSelf: 'center',
    marginBottom: '9%',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.5,
  },
});
