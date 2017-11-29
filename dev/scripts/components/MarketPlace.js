import React from 'react';
import Results from './Results';
import Search from './Search';

export default class MarketPlace extends React.Component {
    render() {
        return(
            <div className="marketplace">
                <Search />
                <Results />
            </div>
        )
    }
}