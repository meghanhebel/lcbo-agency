import React from 'react';
import Navigation from './Navigation';
import firebase from 'firebase'
import Heading from './Heading'


class Pantry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userPantry: [],
            currentRating: '0',
            currentNotes: '',
            currentWine: ''
        }
        
        this.editWine = this.editWine.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.deleteWine = this.deleteWine.bind(this);
        this.listerForNewId = this.listenForNewId.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        console.log('component DID mount ', this.props.userID);
        if (this.props.userID) {
            this.listenForNewId(this.props.userID);
        }
    }

    componentWillReceiveProps(nextProps){
        console.log('component recieves ', nextProps.userID);
        this.listenForNewId(nextProps.userID);
        
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

    // updateWine(e) {
    //     e.preventDefault();
    //     console.log('update WIne',);
    //     console.log();
    //     return;
    // }

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
        // console.log('display the modal! ',);
        const modal = document.getElementById('modal');
        modal.style.display = 'block';

        this.setState({
            currentWine: wineId
        })
        return; 
    }

    cancelEdit(e) {
        // e.preventDefault;
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
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
                <Heading />
                <h1>My Wine Pantry</h1>
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
                                        <h6>{wine.userRating}</h6>
                                        <h6>{wine.userNotes}</h6>
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

                <div className="modal" id="modal">
                    <form action="submit" onSubmit={this.handleSubmit}>
                        <div className="formContent clearfix">
                            <div className="textField">
                                <label htmlFor="notes" className="hidden">Tasting Notes</label>
                                <textarea placeholder="Add your notes here" name="notes" id="notes" cols="30" rows="10" value={this.state.currentNotes}
                                    onChange={this.handleChangeNotes}>></textarea>
                            </div>
                            <div className="ratingsField"> 
                                <label htmlFor="rating">Rating</label>
                                <select name="rating" value={this.state.currentRating}
                                    onChange={this.handleChange}>
                                    <option value="5">5</option>
                                    <option value="4.5">4.5</option>
                                    <option value="4">4</option>
                                    <option value="3.5">3.5</option>
                                    <option value="3">3</option>
                                    <option value="2.5">2.5</option>
                                    <option value="2">2</option>
                                    <option value="1.5">1.5</option>
                                    <option value="1">1</option>
                                    <option value="0.5">0.5</option>
                                </select>
                            </div>
                        </div>
                        <div className="modalButtons clearfix">
                            <button>Submit</button>
                            <button onClick={this.cancelEdit}>Cancel</button>
                        </div>
                    </form>
                </div>
                </ul>
            </div>
        );
    }
}

export default Pantry;