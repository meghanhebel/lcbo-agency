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
        console.log('compondont Reciohdfhdfhj ', nextProps.userID);
        this.listenForNewId(nextProps.userID);
        // if (this.props.userID != nextProps.userID){
        // } 
    }


    // listen for firebase ID change and call for that ID's data
    listenForNewId(newID){
        
        const wineApp = firebase.database().ref(`/users/${newID}/pantry`).orderByChild("date");
        const userPantry = [];

        wineApp.on('value', (snapshot) => {
            let dbPantry = snapshot.val();

            for (let wineKey in dbPantry) {
                userPantry.push(dbPantry[wineKey]);
            }

            userPantry.reverse();

            this.setState({
                userPantry
            });


        }); 
    }
    
    componentDidMount(){
        console.log('compondont DID mount ', this.props.userID);
        if(this.props.userID) {
            this.listenForNewId(this.props.userID);
        }
        // this.listenForNewId
        
    }

    rateWine(wineId) {
        // console.log('rateWine', wineId)
        return; 
    }

    addNotes(wineId) {
        // console.log('addNotes',wineId)
        return;
    }
    
    deleteWine(wineId) {
        // console.log('deleteWine',wineId)
        // wineApp , fine wine that has id equal to wineId and get 
        const wineApp = firebase.database().ref(`/users/${newID}/pantry`);
        wineApp.on('value', (snapshot) => {
            let dbPantry = snapshot.val();
            for (let wineKey in dbPantry) {
                console.log('delete this? ', dbPantry[wineKey].id);
                // userPantry.push(dbPantry[wineKey]);
                if (dbPantry[wineKey].id === wineId) {
                    console.log('delete this!');
                }
            }
            // userPantry.reverse();
            // this.setState({
            //     userPantry
            // });

            console.log(this.state.userPantry);
        });
        return;
    }

    render() {
        return (
            <div className='userPantry'>
                <h1>{`Pantry`}</h1>
                <ul>
                    {this.state.userPantry.map((wine) => {
                        return (
                            <div key={wine.id} className={`pantryItem`}>
                                <li>
                                    <img src={wine.image_thumb_url} alt={`image of ${wine.name}`} />
                                    <figcaption>
                                        <h3>{wine.name}</h3>
                                        <h6>
                                            <span>{wine.varietal}</span>
                                            <span>{wine.sugar_content}</span>
                                            <span>${wine.price}</span>
                                        </h6>
                                        <h6>{wine.description}</h6>
                                    </figcaption>
                                    <div className="userData">
                                    
                                    </div>
                                    <div className="pantryButtons">
                                        <button onClick={() => this.deleteWine(wine.id)}>Delete</button>
                                        <button onClick={() => this.rateWine(wine.id)}>Rate wine</button>
                                        <button onClick={() => this.addNotes(wine.id)}>Add notes</button>
                                    </div>
                                </li>
                            </div>
                        )
                    })}
                </ul>
                
            </div>
        );
    }
}

export default Pantry;