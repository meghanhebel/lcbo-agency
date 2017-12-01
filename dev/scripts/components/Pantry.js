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
    }

    componentDidMount() {
        // on change of firebase, update state
        const currentUser = 'panda';
        // update this to go to that specific user's node
        const wineApp = firebase.database().ref(`/users/${currentUser}/pantry`);
        
        const userPantry = [];
        // wineApp.set([{testArray: [1,2,3,4]}, {testArray2: [5,6,7,8]}]);
        wineApp.on('value', (snapshot) => {
            // let pantry = snapshot.val();
            let userPantry = snapshot.val();
            console.log(userPantry);
            // for (let wineKey in pantry) {
            //     console.log(pantry[wineKey]);
            //     userPantry.push(pantry[wineKey]);
            // }
            this.setState({
                userPantry
            });
            console.log(this.state.userPantry);

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