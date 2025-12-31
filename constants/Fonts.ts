/**
 * Following fonts will be loaded and cached in async while <AppLoading/>
 * Detail please check src/root.js
 */
const customFonts = {
  // Allianz Neo Fonts
  "AllianzNeo-Bold": require("../assets/fonts/AllianzNeo-Bold.ttf"),
  "AllianzNeo-SemiBold": require("../assets/fonts/AllianzNeo-SemiBold.ttf"),
  "AllianzNeo-Regular": require("../assets/fonts/AllianzNeo-Regular.ttf"),
  "AllianzNeo-Light": require("../assets/fonts/AllianzNeo-Light.ttf"),

  // Avenir Next Fonts
  "avenir-next-regular": require("../assets/fonts/avenir-next-regular.ttf"),
  "avenir-next-medium": require("../assets/fonts/avenir-next-medium.ttf"),
  "avenir-next-demi": require("../assets/fonts/avenir-next-demi.ttf"),
  "avenir-next-bold": require("../assets/fonts/avenir-next-bold.ttf"),

  // Ubuntu Fonts
  "Ubuntu-Medium": require("../assets/fonts/Ubuntu-Medium.ttf"),

  // Montserrat Fonts
  "Montserrat-Italic": require("../assets/fonts/Montserrat-Italic.ttf"),

  // Great Vibes Fonts
  "GreatVibes-Regular": require("../assets/fonts/GreatVibes-Regular.ttf"),
};
const type = {
  primary: "AllianzNeo-Regular",
  secondary: "avenir-next-regular",
  medium: "Ubuntu-Medium",
  bold: "AllianzNeo-Bold",
  semi: "AllianzNeo-SemiBold",
  light: "AllianzNeo-Light",
  stylish: "GreatVibes-Regular",
  italic: "Montserrat-Italic",
};

const Fonts = { customFonts, type };

export default Fonts;
