import React from 'react';
import Navigation from './Navigation'
import Heading from './Heading'
import MainWineImage from './MainWineImage'
import SearchInput from './SearchInput'

export default class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            keywords: []
        }
    }

    render() {
        return (
            <div className="clearfix search">
                <Navigation />
                <Heading />
                <h1>Search</h1>
                {/* <h3 className="heading_med_white">Rate, save, and discover new wines!</h3> */}
                <MainWineImage />
                <SearchInput makeDataCall = {this.props.makeDataCall}
                />
            </div>
        );
    }
}
