import McVectorIcon from "@/components/McVectorIcon/McVectorIcon";
import ImageSlider from "@/components/slider/ImageSlider";
import Fonts from "@/constants/Fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Badge, Snackbar } from "react-native-paper";

// Calculate card width based on screen width
const { width } = Dimensions.get("window");
const CARD_GAP = 13;
const CARD_WIDTH = (width - CARD_GAP * 6.5) / 3; // 3 cards with gaps on both sides

export default function Index() {
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);
  const router = useRouter();
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  const getItems = async () => {};

  const services = [
    {
      title: "Offres",
      icon: "FontAwesome",
      name: "briefcase",
      size: 24,
      href: "/job",
    },
    {
      title: "Blogs",
      icon: "FontAwesome5",
      name: "newspaper",
      size: 24,
      href: "/blog",
    },
    {
      title: "Tutoriels",
      icon: "FontAwesome",
      name: "graduation-cap",
      size: 24,
      href: "/tutorials",
    },
    {
      title: "Podcasts",
      icon: "FontAwesome",
      name: "podcast",
      size: 24,
      href: "/podcast",
    },
    {
      title: "Chat",
      icon: "MaterialIcons",
      name: "support-agent",
      size: 24,
      href: "/chat",
    },
    {
      title: "Autres",
      icon: "MaterialCommunityIcons",
      name: "bullhorn",
      size: 24,
      href: "/settings/services",
    },
  ];

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
    console.log("deconnexion");

    router.replace("/auth/login");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 0.4, position: "relative", top: "0.7%" }}>
            <View
              style={{
                marginBottom: "3%",
                borderWidth: 2,
                borderColor: "lightgray",
                width: 50,
                height: 50,
                borderRadius: 60,
              }}
            >
              <Image
                source={{ uri: "../assets/images/education.jpg" }}
                style={{ height: 46, width: "100%", borderRadius: 60 }}
                placeholder={{ blurhash }}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>M. Honoré OUEDRAOGO</Text>
            <Text
              style={styles.profileLink}
              // onPress={() => navigation.navigate('Profil')}
            >
              Voir mon profil
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 0.4,
            }}
          >
            <MaterialCommunityIcons name="bell" color="#000" size={25} />
            <Badge
              size={8}
              style={{
                backgroundColor: "orange",
                position: "relative",
                bottom: "17%",
                right: "30%",
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
          <ImageSlider />
        </View>
        <View style={styles.boxes}>
          <TouchableOpacity style={styles.orangeBox} onPress={() => {}}>
            <Text style={styles.textBoxes}>Liens</Text>
            <Text style={styles.textBoxes}>d&apos;orientation</Text>
            <MaterialCommunityIcons
              name="at"
              color="#fff"
              size={30}
              style={{ position: "absolute", bottom: 10, right: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.greenBox} onPress={() => {}}>
            <Text style={styles.textBoxes}>Mon</Text>
            <Text style={styles.textBoxes}>Actualité</Text>
            <MaterialCommunityIcons
              name="newspaper"
              color="#fff"
              size={30}
              style={{ position: "absolute", bottom: 10, right: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View style={styles.menuItems}>
          <Text style={styles.menuHeader}>Ressources et Opportunités</Text>

          <View style={styles.grid}>
            {services.map((service, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  router.navigate(service.href as any);
                }}
                style={{
                  height: 102,
                  width: CARD_WIDTH,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 80,
                    height: 72,
                    borderRadius: 12,
                    backgroundColor: "#f7dfc9ff",
                    justifyContent: "center",
                    alignItems: "center",
                    ...styles.boxItems,
                  }}
                >
                  {/* <McImage source={item.img} /> */}
                  <McVectorIcon
                    type={service.icon}
                    size={32}
                    name={service.name}
                    color="#3A4276"
                  />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </TouchableOpacity>
            ))}
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
            label: "Compris",
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
    backgroundColor: "#fff",
  },
  serviceContainer: {
    padding: CARD_GAP,
    backgroundColor: "#f8f9fa",
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginBottom: 16,
  },
  userName: {
    fontFamily: Fonts.type.bold,
    fontSize: 16,
    color: "#000",
  },
  profileLink: {
    fontFamily: Fonts.type.primary,
    fontSize: 13,
    color: "orange",
  },
  menuHeader: {
    fontFamily: Fonts.type.bold,
    fontSize: 20,
    marginBottom: 16,
    color: "#333",
    width: "100%",
  },
  boxItems: {
    shadowOffset: {
      width: 3,
      height: 0,
    },
    shadowColor: "#746a6aff",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 4,
  },
  serviceTitle: {
    fontFamily: Fonts.type.semi,
    fontSize: 13,
    color: "#7B7F9E",
    marginTop: 6,
    width: 52,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: CARD_GAP,
  },
  boxContainer: {
    width: "30%",
    height: "28%",
    marginBottom: "10%",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  slider: {
    marginBottom: 20,
  },
  menuItems: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
  },
  boxes: {
    paddingHorizontal: 25,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  textBoxes: {
    fontFamily: Fonts.type.bold,
    color: "white",
    fontSize: 16,
  },
  orangeBox: {
    borderRadius: 12,
    backgroundColor: "#F59B21",
    height: 100,
    flex: 1,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  greenBox: {
    borderRadius: 12,
    backgroundColor: "#06803A",
    height: 100,
    flex: 1,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  line: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 25,
    marginBottom: 20,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    opacity: 0.5,
  },
});
