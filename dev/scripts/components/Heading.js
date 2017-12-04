import React from 'react';
import Navigation from './navigation';

export default class Heading extends React.Component {
    constructor() {
        super();
    }

    // componentDidMount() {
    //     {this.props.thisFunction(2)}
    // }

    render() {
        return(
            <div className="headingBg">
                <div className="heading">
                    <img className = "logo" src="./public/images/TastingNotesLogo.png" alt=""/>
                </div>
            </div>
        )
    }
}