import React from "react";
import Modal from "./common/modal/modal";
import { Switch } from "react-router-dom";
import AppNavBar from "./navbar/navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import Keyboard from "./keyboard/keyboard";
import SoundControls from "./soundControls/soundControls";

import "../styles/app.scss";

const App = () => {
  return (
    <div className="root">
      <Modal />
      <AppNavBar />
      <Keyboard />
      <SoundControls />
      <Switch>
        {/* <Route exact path = "/" component={HomeContainer} /> */}
      </Switch>
    </div>
  );
};

export default App;

//PLACE HOLDER RIGHT NOW NEED TO WORK ON LOGIN AND SIGN UP AND THEN MODAL FOR IT
