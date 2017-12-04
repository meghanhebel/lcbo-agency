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
                    <img className = "logo" src="./public/images/TastingNotesLogo.png" alt=""/>
                    <h3 className="heading_med_white">Rate, save, and discover new wines!</h3>
                    <MainWineImage />
                    <LogIn />

                </div>
            </Router>
        );
    }   
}

export default Home;