import React from 'react';
import Navigation from './Navigation'
import Heading from './Heading'
import MainWineImage from './MainWineImage'

export default class Search extends React.Component {

    render() {
        return (
            <div className="clearfix search">
                <Navigation />
                <Heading />
                <MainWineImage />
            </div>
        );
    }
}
