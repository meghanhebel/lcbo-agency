import React from 'react';
import Navigation from './Navigation';
import firebase from 'firebase'


class Pantry extends React.Component {
    constructor() {
        super();
        this.state = {
            userPantry: [],
            currentRating: '0',
            currentNotes: '',
            currentWine: ''
        }
        
        this.editWine = this.editWine.bind(this);
        // this.addNotes = this.addNotes.bind(this);
        this.deleteWine = this.deleteWine.bind(this);
        this.listerForNewId = this.listenForNewId.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        // console.log('compondont Reciohdfhdfhj ', nextProps.userID);
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
        // console.log('compondont DID mount ', this.props.userID);
        if(this.props.userID) {
            this.listenForNewId(this.props.userID);
        }
        // this.listenForNewId
        
    }

    
    updateWine(e) {
        e.preventDefault();
        console.log('update WIne',);
        console.log();
        return;
    }

    handleChange(e) {
        // console.log(e.target.value);
        this.setState({
            currentRating: e.target.value
        })
    }
    handleChangeNotes(e) {
        // console.log(e.target.value);
        this.setState({
            currentNotes: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('rating', this.state.currentRating);
        console.log('notes', this.state.currentNotes);
        console.log('wine to update', this.state.currentWine);
        const wineApp = firebase.database().ref(`/users/${this.props.userID}/pantry`);
        console.log('userID?', this.props.userID);
        wineApp.on('value', (snapshot) => {
            let dbPantry = snapshot.val();
            for (let wineKey in dbPantry) {
                if (dbPantry[wineKey].id === this.state.currentWine) {
                    // wineApp.child(wineKey).remove()
                    let updates = {};
                    updates[`/${wineKey}/userRating`] = this.state.currentRating;
                    updates[`/${wineKey}/userNotes`] = this.state.currentNotes;

                    wineApp.update(updates);
                    window.location = '';
                }
            }
        });
        return;
    }

    editWine(wineId) {
        console.log('display the modal! ',);
        this.setState({
            currentWine: wineId
        })
        return; 
    }
        
    deleteWine(wineId) {
        const wineApp = firebase.database().ref(`/users/${this.props.userID}/pantry`);
        console.log('userID?', this.props.userID);
        wineApp.on('value', (snapshot) => {
            let dbPantry = snapshot.val();
            for (let wineKey in dbPantry) {
                if (dbPantry[wineKey].id === wineId) {
                    wineApp.child(wineKey).remove()
                    window.location = '';
                } 
            }
        });
        return;
    }

    render() {
        return (
            <div className='userPantry'>
                <h1>{`Pantry`}</h1>
                <Navigation />
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
                                        <button onClick={() => this.editWine(wine.id)}>Edit</button>
                                    </div>
                                </li>
                            </div>
                        )
                    })}

                <div className="modal">
                    <form action="submit" onSubmit={this.handleSubmit}>
                        <label htmlFor="rating"></label>
                        <select name="rating" value={this.state.currentRating}
                            onChange={this.handleChange}>
                            <option value="10">10</option>
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>
                        <label htmlFor="notes">Tasting Notes</label>
                        <textarea name="notes" id="notes" cols="30" rows="10" value={this.state.currentNotes}
                            onChange={this.handleChangeNotes}>></textarea>
                        <button>Submit</button>
                            {/* onClick={() => this.updateWine()} */}
                    </form>
                </div>
                </ul>
            </div>
        );
    }
}

export default Pantry;