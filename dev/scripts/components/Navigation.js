import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import firebase from 'firebase'

export default class Navigation extends React.Component {
    constructor(){
        super();
        this.logOutMsg = this.logOutMsg.bind(this);
        this.logOutCancel = this.logOutCancel.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    logOutMsg(){
        const logOutMsg = document.getElementById('logOutMsg');
        logOutMsg.style.display = 'block';
    }
    
    logOutCancel(){
        const logOutMsg = document.getElementById('logOutMsg');
        logOutMsg.style.display = 'none';
    }
    
    logOut() { 
        firebase.auth().signOut()
            .then((success) => {

            }, (error) => {
                console.log(error);
            }
            )
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
                            <a href="#" onClick={this.logOutMsg}>Logout</a>
                            <div className="circle"></div>
                        </li>
                    </ul>
                    <div className="logOutMsg modal" id="logOutMsg">
                        <div className="modalContainer">
                            <h2>Are you sure you want to log out?</h2>
                            <NavLink exact to="/" activeClassName="current" >
                                <button onClick={this.logOut}>Logout</button>
                            </NavLink>
                            <a href="">
                                <button onClick={this.logOutCancel}>Cancel</button>
                            </a>
                        </div>
                    </div>
                </nav>

               
        )
    }
}