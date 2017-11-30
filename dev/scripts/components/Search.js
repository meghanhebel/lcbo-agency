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
                <MainWineImage />
                <SearchInput grabKeywordArray = {this.props.grabKeywordArray}
                />
            </div>
        );
    }
}
