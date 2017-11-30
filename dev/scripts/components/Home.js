import React from 'react';
import Heading from './Heading'
import MainWineImage from './MainWineImage'
import LogIn from './LogIn'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

class Home extends React.Component {

    render() {
        return (
            <div className="home">
                <Heading />
                <MainWineImage />
                <Link to={/}>  
                
                </Link>
                <LogIn />
            </div>
        );
    }
}

export default Home;