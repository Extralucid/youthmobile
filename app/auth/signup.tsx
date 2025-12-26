import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import login from './login';

export default function SignupScreen() {

  const [finger, setFinger] = useState(null);
  const [email, setEmail] = React.useState('');
  const [unom, setUnom] = React.useState('');
  const [uprenom, setUprenom] = React.useState('');
  const [phone, setPhone] = React.useState('');
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
    if (phone == '' || password == '') {
      setMessage('Remplissez tous les champs !');
      onToggleSnackBar();
    } else {
      await login();
    }
  }

  const goToLogin = async () => {
    router.replace('/auth/login');
     //router.replace('/onboarding/categories');
  };


    const goToHome = async () => {
     //router.replace('/onboarding/categories');
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.fieldsetTitle}>YouthConnekt BF</Text>
        <View style={styles.formGroup}>
          <TextInput
            label="Nom"
            placeholder="Entrez votre nom"
            value={unom}
            style={styles.textInput}
            activeUnderlineColor="#ABBAC8"
            placeholderTextColor="#ABBAC8"
            keyboardType="email-address"
            onChangeText={(text) => setUnom(text)}
          />
          <TextInput
            label="Prénom(s)"
            placeholder="Entrez votre prénom"
            value={uprenom}
            style={styles.textInput}
            activeUnderlineColor="#ABBAC8"
            placeholderTextColor="#ABBAC8"
            keyboardType="email-address"
            onChangeText={(text) => setUprenom(text)}
          />
          <TextInput
            label="Téléphone"
            placeholder="Entrez votre téléphone"
            value={phone}
            style={styles.textInput}
            activeUnderlineColor="#ABBAC8"
            placeholderTextColor="#ABBAC8"
            keyboardType="email-address"
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            label="Adresse mail"
            placeholder="Entrez votre adresse mail"
            value={email}
            style={styles.textInput}
            activeUnderlineColor="#ABBAC8"
            placeholderTextColor="#ABBAC8"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
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
          {/*<Text style={styles.forgetPasswordText} onPress={() => navigation.navigate('ForgetPassword')}>Mot
                        de passe oublié ?</Text>*/}
          <Button mode="contained" style={styles.buttonLogin} onPress={() => goToHome()}>
            S'inscrire
          </Button>
          
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.leftLine}></View>
            <Text style={{ flex: 1, fontSize: 17, textAlign: 'center' }}>Ou</Text>
            <View style={styles.rightLine}></View>
          </View>
          <Text style={styles.SignInTitle} onPress={() => { goToLogin(); }}>
            Connectez-vous
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