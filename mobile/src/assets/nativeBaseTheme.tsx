import { extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    myprimary: "#2988E0", //blue
    mydanger: "#D60606", //red
    mygray: "#929191", //gray
  },
  config: {
    // Changing initialColorMode to 'dark'
    // initialColorMode: 'dark',
  },
});

export default theme;
