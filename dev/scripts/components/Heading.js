import React from 'react';

export default class Heading extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="heading">
                <img src="./public/images/TastingNotesLogo.png" alt=""/>
                <h3>Rate, save, and discover new wines!</h3>
            </div>
        )
    }
}