import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';

export default function ForgotPasswordScreen() {
    const [password, setPassword] = useState("")
    const [finger, setFinger] = useState(null);
    const [identifiant, setIdentifiant] = React.useState('');
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
    const goToLogin = async () => {
        router.replace('/auth/login');
    };
     const goToOtp = async () => {
        router.replace('/auth/codeOTP');
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.fieldsetTitle}>Mot de passe oublié</Text>
                <View style={styles.formGroup}>
                    <TextInput
                        label="Entrez votre email ou N° de téléphone"
                        placeholder="Email ou N° de téléphone"
                        value={password}
                        activeUnderlineColor="#ABBAC8"
                        placeholderTextColor='#ABBAC8'
                        style={styles.textInput}
                        onChangeText={text => setPassword(text)}
                    />

                    <Button mode="contained" style={styles.buttonLogin} onPress={() => goToOtp()}>
                        Envoyer
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
})