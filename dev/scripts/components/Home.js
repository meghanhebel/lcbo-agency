import React from 'react';
import Heading from './Heading'
import MainWineImage from './MainWineImage'
import LogIn from './LogIn'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

class Home extends React.Component {

    render() {
        return (
            <Router>
                <div className="home">
                    <LogIn />
                    <Heading />
                    <MainWineImage />
                </div>
            </Router>
        );
    }
}

export default Home;