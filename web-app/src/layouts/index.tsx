import Private from "./Private";
import Public from "./Public";
import { HashRouter as Router } from "react-router-dom";

export default function Layout() {
  const token = localStorage.getItem("token");
  // const token = true;
  localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWUzYjdmMTZhOGU2ZTEyZTVmNGM4OCIsImVtYWlsIjoiZmFyZXNAZ21haWwuY29tIiwidXNlclR5cGUiOiJlc3RhYmxpc2htZW50IiwiZXN0YWJsaXNobWVudCI6MiwiaWF0IjoxNjU1NzE3MjQ2LCJleHAiOjE2NTU4MDM2NDZ9.TEIOiMamysGDlb5dCbtMk0Ow3UtwUnosHTYZmRVZQ_0");
  return (
    <div style={{ height: "100vh" }}>
      <Router>
        {token ? <Private token={token} /> : <Public />}
      </Router>
    </div>
  );
}
