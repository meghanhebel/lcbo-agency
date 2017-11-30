import React from 'react';
import Navigation from './Navigation';
import firebase from 'firebase'

class Pantry extends React.Component {
    constructor() {
        super();
        this.state = {
            userPantry: [],
            userID: ''
        }
        // this.getPageResults = this.getPageResults.bind(this);
        // console.log('pantry', this.state.pantry);
        // console.log('wine', this.props.wine_data);
    }
    
    // const dbRef = firebase.database().ref(`/users/${nextProps.userID}`)
    // dbRef.push('personal pantry data')

    componentWillReceiveProps(nextProps){
        if (this.props.userID != nextProps.userID){
        
            this.setState({
                userID: nextProps.userID
            })
            
            const userRef = firebase.database().ref(`/users/${nextProps.userID}/`);
            userRef.on('value', (snapshot) => {
                console.log(snapshot.val())
            })
        } else{

        }
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