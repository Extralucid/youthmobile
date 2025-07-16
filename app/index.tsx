import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge, Snackbar } from 'react-native-paper';

export default function Index() {
  const [nom, setNom] = useState('');
  const [prenoms, setPrenoms] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const youthbaseurl = 'https://gesmuttest.menet.ci:5482/img/';
  const router = useRouter();
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const blurhash =
 '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  const getItems = async () => {

  };

  const Item = ( title: any, image: any ) => (
    <View style={{ borderWidth: 1, width: '33.33%', padding: 8 }}>
      <TouchableOpacity style={styles.boxItems}>
        <Image source={require('../assets/images/healthicons_pharmacy.png')} />
      </TouchableOpacity>
    </View>
  );

  //const renderItem = ({ item }) => <Item image={item.image} title={item.title} />;

  useEffect(() => {
    getItems();
  }, []);

  const deconnexion = async () => {
    setLoading(true);
    // await AsyncStorage.removeItem('token');
    // await AsyncStorage.removeItem('jsonyouth');
    // await AsyncStorage.removeItem('aphoto');
    setLoading(false);
    console.log('deconnexion');
    
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 0.4, position: 'relative', top: '0.7%' }}>
            <View
              style={{
                marginBottom: '3%',
                borderWidth: 2,
                borderColor: 'lightgray',
                width: 50,
                height: 50,
                borderRadius: 60,
              }}
            >
              <Image
                source={{ uri: '../assets/images/education.jpg' }}
                style={{ height: 46, width: '100%', borderRadius: 60 }}
                placeholder={{ blurhash }}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
              M. Honoré OUEDRAOGO
            </Text>
            <Text
              style={{ fontSize: 12, color: 'orange' }}
            // onPress={() => navigation.navigate('Profil')}
            >
              Voir mon profil
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 0.4 }}>
            <MaterialCommunityIcons name="bell" color="#000" size={25} />
            <Badge
              size={8}
              style={{
                backgroundColor: 'orange',
                position: 'relative',
                bottom: '17%',
                right: '30%',
              }}
            ></Badge>
            <MaterialCommunityIcons
              name="power"
              color="#000"
              size={25}
              onPress={() => deconnexion()}
            />
          </View>
        </View>
        <View style={styles.slider}>
          <ImageBackground
            source={require('../assets/images/education.jpg')}
            resizeMode="cover"
            imageStyle={{ borderRadius: 15 }}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 15,
                position: 'relative',
                top: '25%',
                left: '5%',
              }}
            >
              Le social au coeur de
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 15,
                position: 'relative',
                top: '25%',
                left: '5%',
              }}
            >
              nos actions
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.boxes}>
          <TouchableOpacity
            style={styles.orangeBox}
            onPress={() => { }}
          >
            <Text style={styles.textBoxes}>Mes</Text>
            <Text style={styles.textBoxes}>Ressources</Text>
            <MaterialCommunityIcons
              name="book-open"
              color="#fff"
              size={30}
              style={{ position: 'absolute', bottom: 10, right: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.greenBox} onPress={() => { }}>
            <Text style={styles.textBoxes}>Mon</Text>
            <Text style={styles.textBoxes}>Actualité</Text>
            <MaterialCommunityIcons
              name="newspaper"
              color="#fff"
              size={30}
              style={{ position: 'absolute', bottom: 10, right: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View style={styles.menuItems}>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              style={styles.boxItems}
              onPress={() => { }}
            >
              <MaterialCommunityIcons name="offer" color="#06803A" size={40} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 11 }}>Offres/Stages</Text>
          </View>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              style={styles.boxItems}
              onPress={() => { }}
            >
              <MaterialCommunityIcons name="plex" color="#06803A" size={40} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 11 }}>Tutoriels</Text>
          </View>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              style={styles.boxItems}
              onPress={() => { }}
            >
               <MaterialCommunityIcons name="podcast" color="#06803A" size={40} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 11 }}>
              Podcasts
            </Text>
          </View>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              style={styles.boxItems}
              onPress={() => { }}
            >
             <MaterialCommunityIcons name="newspaper" color="#06803A" size={40} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 10 }}>
              Blog
            </Text>
          </View>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              style={styles.boxItems}
              onPress={() => { }}
            >
             <MaterialCommunityIcons name="chat" color="#06803A" size={40} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 11 }}>
              Communauté
            </Text>
          </View>
          <View style={styles.boxContainer}>
            <TouchableOpacity style={styles.boxItems} onPress={() => { }}>
              <MaterialCommunityIcons name="dots-horizontal" color="#06803A" size={40} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 11 }}>Autres</Text>
          </View>
        </View>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="orange" />
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
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
  },
  boxItems: {
    width: '85%',
    height: 78,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 2,
    shadowOffset: {
      width: 3,
      height: 0,
    },
    shadowColor: '#000000',
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 4,
  },
  boxContainer: {
    width: '30%',
    height: '28%',
    marginBottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  slider: {
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: '5%',
    height: '20%',
  },
  menuItems: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
  },
  boxes: {
    marginTop: '3%',
    height: '20%',
    paddingLeft: 15,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textBoxes: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  orangeBox: {
    borderRadius: 8,
    backgroundColor: '#F59B21',
    height: 85,
    width: '47%',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  greenBox: {
    borderRadius: 8,
    backgroundColor: '#06803A',
    height: 85,
    width: '47%',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  line: {
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#D9D9D9',
    marginTop: '0%',
    marginBottom: '5%',
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

