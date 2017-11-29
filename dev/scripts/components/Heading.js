import React from 'react';

export default class Heading extends React.Component {
    constructor() {
        super();
    }

    // componentDidMount() {
    //     {this.props.thisFunction(2)}
    // }

    render() {
        return(
            <div className="heading">
                <img className = "logo" src="./public/images/TastingNotesLogo.png" alt=""/>
                <h3 className="heading_med_white">Rate, save, and discover new wines!</h3>
            </div>
        )
    }
}