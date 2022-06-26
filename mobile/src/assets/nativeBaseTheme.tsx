import { extendTheme } from "native-base";

const theme = extendTheme({

  fontConfig: {
    Lato: {
      100: {
        normal: 'Lato-Light',
        italic: 'Lato-LightItalic',
      },
      200: {
        normal: "Lato-Thin",
        italic: "Lato-ThinItalic",
      },
      400: {
        normal: 'Lato-Regular',
        italic: "Lato-Italic",
      },
      700: {
        normal: 'Lato-Bold',
        italic: 'Lato-BoldItalic',
      },
      900: {
        normal: 'Lato-Black',
        italic: "Lato-BlackItalic",
      },
    },
  },
  fonts: {
    heading: "Lato",
    body: "Lato",
    mono: "Lato",
  },

  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },

  colors: {
    myprimary: "#2988E0", //blue
    mydanger: "#D60606", //red
    mygray: "#929191", //gray
  },
});

export default theme;
