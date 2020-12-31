import React from 'react';
import Modal from "./common/modal/modal";
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBarContainer from "./navbar/navbarContainer"

import 'bootstrap/dist/css/bootstrap.min.css';
import KeyboardContainer from './keyboard/keyboardContainer';
import SoundControlsContainer from './sound_controls/sound_controls_container';

import "../styles/app.scss";

const App = () => {
    return (
        <> 
            <div>
                <Modal />
                <NavBarContainer />
                <KeyboardContainer />
                <SoundControlsContainer />
                <Switch>
                    {/* <Route exact path = "/" component={HomeContainer} /> */}
                </Switch>
            </div>
        </>
    )
}

export default App;

//PLACE HOLDER RIGHT NOW NEED TO WORK ON LOGIN AND SIGN UP AND THEN MODAL FOR IT