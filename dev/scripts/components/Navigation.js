import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

export default class Navigation extends React.Component {
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
                            <NavLink to ="/search"
                                activeClassName = "current">Search Marketplace</NavLink>
                            <div className="circle"></div>
                        </li>
                        <li>
                            <NavLink exact to="/"
                                activeClassName = "current">Logout</NavLink>
                            <div className="circle"></div>
                        </li>
                    </ul>
                </nav>

               
        )
    }
}