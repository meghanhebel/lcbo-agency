import React from 'react';
import Navigation from './Navigation'
import Heading from './Heading'
import MainWineImage from './MainWineImage'

class Search extends React.Component {
    render() {
        return (
            <div className="clearfix">
                <Navigation />
                <Heading />
                <MainWineImage />
            </div>
        );
    }
}

export default Search;