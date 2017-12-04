import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import firebase from 'firebase'

export default class Navigation extends React.Component {
    constructor(){
        super();
        this.logOutMsg = this.logOutMsg.bind(this);
    }
    logOutMsg(){
        logOutMsg = document.getElementById('logOutMsg');
        logOutMsg.style.display = 'block';
    }
    
    logOut() { 
        firebase.auth().signOut()
            .then((success) => {

            }, (error) => {
                console.log(error);
            }
            )
        this.logOutMsg()
    }
    
    
    render() {
        return(

                <nav className="navigation">
                    <ul className="navList">
                        <li>
                            <NavLink to="/pantry"
                                activeClassName = "current">Pantry</NavLink>
                            <div className="circle"></div>
                        </li>
                        <li>
                            <NavLink to="/marketplace"
                                activeClassName = "current">Search Marketplace</NavLink>
                            <div className="circle"></div>
                        </li>
                        <li>
                            <NavLink exact to="/"
                                activeClassName = "current" ><div onClick={this.logOut}>Logout</div></NavLink>
                            <div className="circle"></div>
                        </li>
                    </ul>
                    <div className="logOutMsg" id="logOutMsg">
                        <h2>You have successfully logged out.</h2>
                    </div>
                </nav>

               
        )
    }
}