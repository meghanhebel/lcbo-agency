import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import firebase from 'firebase'

export default class Navigation extends React.Component {
    
    logOut() {
        firebase.auth().signOut()
            .then((success) => {
                alert('You have successfully logged out')
            }, (error) => {
                console.log(error);
            }
            )
    }
    
    render() {
        return(

                <nav className="navigation">
                    <ul>
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
                </nav>

               
        )
    }
}