import HomeLayout from "./Home";
import Profile from "./Profile";
import Cart from "./Cart";
import { faCartShopping, faHome, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default {
  HomeLayout,
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
    name: "HomeLayout",
    components: HomeLayout,
    icon: faHome,
  },
  {
    name: "Profile",
    components: Profile,
    icon: faUserCircle,
  },
];