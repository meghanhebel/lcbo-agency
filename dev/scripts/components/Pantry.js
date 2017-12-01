import React from 'react';
import Navigation from './Navigation';
import firebase from 'firebase'


class Pantry extends React.Component {
    constructor() {
        super();
        this.state = {
            userPantry: []
        }
        
        this.rateWine = this.rateWine.bind(this);
        this.addNotes = this.addNotes.bind(this);
        this.deleteWine = this.deleteWine.bind(this);
        this.listerForNewId = this.listenForNewId.bind(this);
    }
    
          
    componentWillReceiveProps(nextProps){

        if (this.props.userID != nextProps.userID){
                this.listenForNewId(nextProps.userID);
        } else {

        }
        
    }

    // listen for firebase ID change and call for that ID's data
    listenForNewId(newID){
        
        const wineApp = firebase.database().ref(`/users/${newID}/pantry`);
        const userPantry = [];
        
        wineApp.on('value', (snapshot) => {
            // use orderby to get data from DB by date
            let dbPantry = snapshot.val();
            console.log(dbPantry);
            
            for (let wineKey in dbPantry) {
                console.log('add this to pantry? ', dbPantry[wineKey]);
                userPantry.push(dbPantry[wineKey]);
            }
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