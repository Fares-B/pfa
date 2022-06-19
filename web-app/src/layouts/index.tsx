import Private from "./Private";
import Public from "./Public";
import { BrowserRouter as Router } from "react-router-dom";

export default function Layout() {
  // const token = localStorage.getItem("token");
  const token = true;

  return (
    <div style={{ height: "100vh" }}>
      <Router>
        {token ? <Private /> : <Public />}
      </Router>
    </div>
  );
}
