import Home from "./Home";
import Profile from "./Profile";
import Cart from "./Cart";
import { faCartShopping, faHome, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default {
  Home,
  Profile,
  Cart,
};

export const privateRoutes = [
  {
    name: "Cart",
    components: Cart,
    icon: faCartShopping,
  },
  {
    name: "Home",
    components: Home,
    icon: faHome,
  },
  {
    name: "Profile",
    components: Profile,
    icon: faUserCircle,
  },
];