import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Musicplayer from "./components/Musicplayer.js";

import Musicstate from "./context/Musicstate";
{
  <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>;
}
function App() {
  return (
    <Musicstate>
      <Router>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "black",
              height: "85%",
            }}
          >
            <Navbar />
            <Switch>
              <div style={{ marginLeft: "18%", width: "100%" }}>
                <Route path="/">
                  <Home />
                </Route>
              </div>
            </Switch>
          </div>
          <Musicplayer />
        </div>
      </Router>
    </Musicstate>
  );
}

export default App;
