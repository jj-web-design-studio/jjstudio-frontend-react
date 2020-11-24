import React from 'react';
import Modal from "./modal/modal"
import { Route, Switch, Redirect } from 'react-router-dom';
import HomeContainer from "./home/home_container"
import AppNavBar from "./navbar/navbar"

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <> 
            <div>
                <Modal />
                <AppNavBar />
                <Switch>
                    <Route exact path = "/" component={HomeContainer} />
                </Switch>
            </div>
        </>
    )
}

export default App;

//PLACE HOLDER RIGHT NOW NEED TO WORK ON LOGIN AND SIGN UP AND THEN MODAL FOR IT