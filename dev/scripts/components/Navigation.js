import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

export default class Navigation extends React.Component {
    render() {
        return(
            <Router>
                <nav>
                    <ul>
                        <li>
                            <NavLink exact to="/pantry"
                                activeClassName = "current"
                                activeStyle = {{color: 'green'}}>Pantry</NavLink>
                            <span className="circle"></span>
                        </li>
                        <li>
                            <NavLink exact to ="/search"
                                activeClassName = "current"
                                activeStyle = {{color: 'green'}}>Search Marketplace</NavLink>
                            <span className="circle"></span>
                        </li>
                        <li>
                            <NavLink exact to="/"
                                activeClassName = "current"
                                activeStyle = {{color: 'green'}}>Logout</NavLink>
                            <span className="circle"></span>
                        </li>
                    </ul>
                </nav>
            </Router>
        )
    }
}