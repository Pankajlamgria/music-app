import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
{<script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>}
function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "row",backgroundColor:"black" }}>
        <Navbar />
        <Switch>
          <div style={{marginLeft:"20%",width:"100%"}}>
            <Route path="/">
              <Home />
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
