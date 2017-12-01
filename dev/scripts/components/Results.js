import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';
import firebase from 'firebase';

export default class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wineResults: props.results,
            currentPageResults: [],
            startWineIndex: 0,
            endWineIndex: 4,
        }
        this.getPageResults = this.getPageResults.bind(this);
        this.nextPageResults = this.nextPageResults.bind(this);
        this.previousPageResults = this.previousPageResults.bind(this);
        this.addToPantry = this.addToPantry.bind(this);
    }

    componentDidMount() {
        this.getPageResults(this.state.startWineIndex, this.state.endWineIndex)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            wineResults: nextProps.results,
            startWineIndex: 0,
            endWineIndex: 4
        }, function(){this.getPageResults(this.state.startWineIndex, this.state.endWineIndex)}.bind(this))
    }


    getPageResults(start, end) {

        if (this.state.wineResults.length > this.state.endWineIndex) {
            let currentResults = this.state.wineResults.slice(start, end+1)
            this.setState({
                currentPageResults: currentResults
            });
        } else {
            console.log('ERROR: not enough wines in wineResults');
            // call API again here ? or not?
        }
    }

    nextPageResults() {
        this.setState({
            startWineIndex: this.state.startWineIndex + 5,
            endWineIndex: this.state.endWineIndex + 5
        }, function(){this.getPageResults(this.state.startWineIndex, this.state.endWineIndex)}.bind(this));
        // return this.getPageResults(this.state.startWineIndex, this.state.endWineIndex);
    }

    previousPageResults() {
        if (this.state.startWineIndex - 5 >= 0) {
            this.setState({
                startWineIndex: this.state.startWineIndex - 5,
                endWineIndex: this.state.endWineIndex - 5
            }, function(){this.getPageResults(this.state.startWineIndex, this.state.endWineIndex)}.bind(this));
            // return this.getPageResults(this.state.startWineIndex, this.state.endWineIndex);
        } else {
            console.log('ERROR ');
        }
    }

    addToPantry(wine) {
        console.log('wine id', wine.id, wine.name, wine);
        let price = Math.round(wine.price_in_cents * .01 * 100) / 100;
        let wineDesc = '';
        if (wine.description) {
            wineDesc = wine.description;
        } else if (wine.style) {
            wineDesc = wine.style;
        }
        const secondCateg = wine.secondary_category;
        let typeWine = '';
        if (secondCateg.match(/Red/)) {
            typeWine = 'red';
        } else if (secondCateg.match(/White/)) {
            typeWine = 'white';
        } else {
            typeWine = 'rose';
        }
        const newDate = new Date();

        const newWine = {
            date: `${newDate}`,
            id: wine.id,
            name: wine.name,
            image_thumb_url: wine.image_thumb_url,
            image_svg_url: '',
            typeWine,
            varietal: wine.varietal,
            sugar_content: wine.sugar_content,
            description: wineDesc,
            secondary_category: wine.secondary_category,
            userRating: 0,
            userNotes: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique esse nobis dolorem assumenda hic dolorum in, libero consectetur cumque odit et est eos! Asperiores cumque minima iste provident voluptatum deserunt.',
            price
        };

        console.log(this.props.userID)
        const wineApp = firebase.database().ref(`/users/${this.props.userID}/pantry`);
        wineApp.push(newWine);
    }
    
    render() {
        return (
            <div className='searchResults'>
                <h1>Results</h1>
                <ul>
                {this.state.currentPageResults.map((wine) => {
                    const secondCateg = wine.secondary_category;
                    let typeWine = '';
                        if (secondCateg.match(/Red/)) {
                            typeWine = 'red';
                        } else if (secondCateg.match(/White/)) {
                            typeWine = 'white';
                        } else {
                            typeWine = 'rose';
                        }
                    return (
                        <div key={wine.id} className={`wineResult ${typeWine}`}>
                        <li>
                            <img src={wine.image_thumb_url} alt={`image of ${wine.name}, a ${wine.secondary_category}`}/>
                            <figcaption>
                                <h3>{wine.name}</h3>
                                <h6>
                                    <span>{wine.varietal}</span>
                                    <span>{wine.sugar_content}</span>  
                                    <span>${Math.round(wine.price_in_cents * .01 * 100) / 100}</span>
                                </h6>
                                {(wine.description || wine.style) ? (wine.description ? <h6>{wine.description}</h6> : <h6>{wine.style}</h6>) : ''} 
                                {/* nested ternary-- if wine has a description OR a style 
                                    --> check if it has desc, display that, else style
                                    --> if it doesnt have either, display nothing */}
                            <NavLink to="/pantry"><button onClick={() => {this.addToPantry(wine)}}>Add to pantry</button></NavLink>
                            </figcaption>
                        </li> 
                    </div>
                )})}
                </ul>
                <footer>
                    <NavLink to="/pantry">Pantry</NavLink>
                    <button className="previous" onClick={this.previousPageResults}>previous</button>
                    <button className="next" onClick={this.nextPageResults}>next</button>
                    <NavLink to="/">Log Out</NavLink>
                </footer>
            </div>
        );
    }
}
