import React from 'react';
import Modal from "./modal/modal"
import { Route, Switch, Redirect } from 'react-router-dom';
import HomeContainer from "./home/home_container"
import NavBarContainer from "./navbar/navbar_container"

import 'bootstrap/dist/css/bootstrap.min.css';
import KeyboardContainer from './keyboard/keyboard_container';

const App = () => {
    return (
        <> 
            <div>
                <Modal />
                <NavBarContainer />
                <KeyboardContainer />
                <Switch>
                    {/* <Route exact path = "/" component={HomeContainer} /> */}
                </Switch>
            </div>
        </>
    )
}

export default App;

//PLACE HOLDER RIGHT NOW NEED TO WORK ON LOGIN AND SIGN UP AND THEN MODAL FOR IT