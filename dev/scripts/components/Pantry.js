import React from 'react';
import Navigation from './Navigation';
import firebase from 'firebase';

class Pantry extends React.Component {
    constructor() {
        super();
        this.state = {
            userPantry: [],
            // userWineArray: []
        }
        this.rateWine = this.rateWine.bind(this);
        this.addNotes = this.addNotes.bind(this);
        this.deleteWine = this.deleteWine.bind(this);
        // console.log('pantry', this.state.pantry);
        // console.log('wine', this.props.wine_data);
    }

    componentDidMount() {
        const currentUser = 'panda';
        // update this to go to that specific user's node
        // const wineApp = firebase.database().ref(`/users/${currentUser}`);
        const wineApp = firebase.database().ref(`/users/${currentUser}/pantry`);

        const userPantry = [];
        wineApp.on('value', (snapshot) => {
            let pantry = snapshot.val();
            // console.log('whole pantry ', user);
            for (let wineKey in pantry) {
                userPantry.push(pantry[wineKey]);
            }
            console.log(userPantry);
            this.setState({
                userPantry
            });
        }); 
    }

    rateWine(wineId) {
        console.log()
        return; 
    }

    addNotes(wineId) {
        console.log()
        return;
    }
    
    deleteWine(wineId) {
        // key of div same as wineId
        // delete from FB and array of wines
        console.log()
        return;
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