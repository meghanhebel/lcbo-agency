import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';

export default class Results extends React.Component {
    constructor() {
        super();
        this.state = {
            wineResults: [],
            currentPageResults: [],
            startWineIndex: 0,
            endWineIndex: 4,
            // pageIndex: 1
            userWines: [123456]
        }
        this.getPageResults = this.getPageResults.bind(this);
        this.nextPageResults = this.nextPageResults.bind(this);
        this.previousPageResults = this.previousPageResults.bind(this);
        this.addToPantry = this.addToPantry.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('results page nextprops', nextProps);
        if (nextProps.results) {
            this.setState({
                wineResults: nextProps.results
            });
        }
        console.log('nextProps',nextProps.results);
        console.log('wineResults before getPageResults', this.state.wineResults);
        // this.getPageResults(this.state.startWineIndex, this.state.endWineIndex); 
    }

    getPageResults(start, end) {
        console.log('wineResults in getPageResults', this.state.wineResults)
        console.log('start, end ',start, end);
        if (this.state.wineResults.length > this.state.endWineIndex) {
            this.setState({
                currentPageResults: this.state.wineResults.slice(start, end+1)
            });
            console.log('page made');
            console.log(this.state.currentPageResults);
        } else {
            console.log('ERROR: not enough wines in wineResults');
            // call API again here ?
        }
    }

    nextPageResults() {
        this.setState({
            startWineIndex: this.state.startWineIndex + 5,
            endWineIndex: this.state.endWineIndex + 5
        });
        return this.getPageResults(this.state.startWineIndex, this.state.endWineIndex);
    }

    previousPageResults() {
        if (this.state.startWineIndex - 5 >= 0) {
            this.setState({
                startWineIndex: this.state.startWineIndex - 5,
                endWineIndex: this.state.endWineIndex - 5
            });
            return this.getPageResults(this.state.startWineIndex, this.state.endWineIndex);
        } else {
            console.log('ERROR ');
        }
    }

    addToPantry(wine) {
        // push to firebase by wine id
        // push to front of array of all users wines (so when load, goes to most recent first)
        // when delete it, need to grab from array and also from fb
        // [product id, product id, product id]
        // key of div is also product id 
        // all info of wine, plus add notes and rating but empty 
        console.log('wine', wine);
        console.log('wine id', wine.id);
        let userWines = this.state.userWines.slice();
        console.log('userWines', userWines);
        userWines.unshift(wine.id);
        console.log('userWines', userWines);
        this.setState({
            userWines
        });
        console.log('users wines ', this.state.userWines);
        const currentUser = 'panda';
        const wineApp = firebase.database().ref(`/users/${currentUser}`);
        wineApp.push();
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
