import React from 'react';
import Heading from './Heading'
import MainWineImage from './MainWineImage'
import LogIn from './LogIn'
import Pantry from './Pantry'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

class Home extends React.Component {
    componentDidMount(){
        console.log(this.props.userID)
    }
    render() {
        return (
            <Router>
                <div className="home">
                    <Heading />
                    <MainWineImage />
                    <LogIn />

                </div>
            </Router>
        );
    }   
}

export default Home;