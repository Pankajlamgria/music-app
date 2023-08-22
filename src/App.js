import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Musicplayer from "./components/Musicplayer.js";
import Login from "./components/Login.js";

import Musicstate from "./context/Musicstate";
import Search from "./components/Search";
import Allsongs from "./components/Allsongs";
import Addsong from "./components/Addsong";
import Editsong from "./components/Editsong";
import Favourite from "./components/Favourite";
import Showall from "./components/Showall";
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
                <div className="maincontainer">
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/search">
                    <Search />
                  </Route>
                  <Route exact path="/signin">
                    <Login />
                  </Route>
                  <Route exact path="/songs">
                    <Allsongs />
                  </Route>
                  <Route exact path="/addsong">
                    <Addsong/>
                  </Route>
                  <Route exact path="/editsong">
                    <Editsong/>
                  </Route>
                  <Route exact path="/liked">
                    <Favourite/>
                  </Route>
                  <Route exact path="/showall">
                    <Showall/>
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
