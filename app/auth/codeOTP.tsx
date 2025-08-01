import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';

export default function CodeOTPScreen() {
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    let otpInput = React.useRef(null);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const goToHome = async () => {
        router.replace('/');
    };
    const onSubmit = async (code: string) => {
        //setLoading(true);
        if (code == '') {
            setMessage('Veuillez saisir le code OTP');
            onToggleSnackBar();
            setLoading(false);
        } else {
            router.replace('/');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <View style={styles.fieldset}>
                            <Text style={styles.fieldsetTitle}>Code OTP</Text>
                        </View>
                        <View style={styles.formGroup}>
                            <View style={{ marginBottom: '5%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Veuillez composer le code secret que vous avez reçu
                                    dans le champ le champ ci-dessous:
                                </Text>
                            </View>
                            <TextInput
                                label="Code OTP *"
                                placeholder="1256"
                                value={password}
                                placeholderTextColor="#ABBAC8"
                                style={styles.textInput}
                                activeUnderlineColor="#ABBAC8"
                                onChangeText={(text) => setPassword(text)}
                            />

                            <Button mode="contained" style={styles.buttonLogin} onPress={() => onSubmit(password)}>
                                Confirmer
                            </Button>
                        </View>
                    </View>
                    {loading ? (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="orange" />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ textAlign: 'center' }}>Chargement en cours</Text>
                                <Text style={{ textAlign: 'center' }}>{loadingMessage}</Text>
                            </View>
                        </View>
                    ) : (
                        <View></View>
                    )}
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
                </View>
            </View>
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
    formContainer: {
        borderRadius: 10,
        width: '90%',
        padding: 25,
    },
    textInput: {
        marginBottom: '3%',
        backgroundColor: '#F2F2F2',
    },
    formGroup: {
        paddingTop: '9%',
    },
    buttonLogin: {
        marginBottom: '0%',
        height: 45,
        backgroundColor: '#F59B21',
        borderRadius: 8,
        marginTop: '5%',
    },
    fieldset: {
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: '-8%',
        left: '6%',
        backgroundColor: '#F3F3F3',
        paddingLeft: 10,
        paddingRight: 10,
    },
    fieldsetTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: '5%',
    },
    SignInTitle: {
        textAlign: 'center',
        color: '#F59B21',
        marginTop: '4%',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    buttonStyle: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#F59B21',
        marginTop: '2%',
        marginBottom: '10%',
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
        opacity: 0.9,
    },
})