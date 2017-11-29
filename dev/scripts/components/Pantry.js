import React from 'react';
import Navigation from './Navigation';

class Pantry extends React.Component {
    constructor() {
        super();
        this.state = {
            userPantry: []
        }
        // this.getPageResults = this.getPageResults.bind(this);
        // console.log('pantry', this.state.pantry);
        // console.log('wine', this.props.wine_data);
    }

    render() {
        return (
            <div>
                <h1>Pantry</h1>
                <Navigation />
            </div>
        );
    }
}

export default Pantry;