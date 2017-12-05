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
                    <ul className="navList clearfix">
                        <li>
                            <NavLink to="/pantry" activeClassName="current">
                            {/* winery SVG Created by Made from the Noun Project */}
                                <img src="./public/images/rack.svg" alt="" />
                            </NavLink>
                            <h4>Pantry</h4>
                            <div className="circle"></div>
                        </li>
                        <li>
                            <NavLink to="/marketplace"activeClassName = "current">
                                {/* Market SVG Created by Made from the Noun Project */}
                                <img src="./public/images/market.svg" alt=""/>
                            </NavLink>
                            <h4>Search</h4>
                            <div className="circle"></div>
                        </li>
                        <li>
                            <a href="#" onClick={this.logOutMsg}>
                                {/* truck SVG Created by Made from the Noun Project */}
                                <img src="./public/images/truck.svg" alt="" />
                            </a>
                            <h4>Logout</h4>
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
