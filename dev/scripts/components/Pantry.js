import React from 'react';
import Navigation from './Navigation';
import firebase from 'firebase'
import Heading from './Heading'


class Pantry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userPantry: [],
            currentRating: 0.5,
            currentNotes: '',
            currentWine: '',
            currentSort: 'date',
            currentOrder: 'descending',
            displaySort: false,
            displayFilter: false,
            displaySearch: false,
        }
        
        this.editWine = this.editWine.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.deleteWine = this.deleteWine.bind(this);
        this.listerForNewId = this.listenForNewId.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchToggle = this.handleSearchToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSorting = this.handleSorting.bind(this);

    }

    componentDidMount() {
        if (this.props.userID) {
            this.listenForNewId(this.props.userID);
        }
    }

    componentWillReceiveProps(nextProps){
        this.listenForNewId(nextProps.userID);
    }

    // listen for firebase ID change and call for that ID's data
    listenForNewId(newID){
        
        const wineApp = firebase.database().ref(`/users/${newID}/pantry`);
        
        wineApp.on('value', (snapshot) => {
            const userPantry = [];
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

    handleChange(stateId, e) {
        let newValue = e.target.value;
        if (stateId === 'currentRating') {
            newValue = parseFloat(newValue);
        }

        this.setState({
            [stateId]: newValue
        })
    }

    handleSearchToggle(stateId, e) {
        if (stateId === 'displaySort') {
            this.setState({
                displayFilter: false,
                displaySort: true
            })
        } else if (stateId === 'displayFilter') {
            this.setState({
                displayFilter: true,
                displaySort: false
            })
        } else {
            this.setState({
                displayFilter: false,
                displaySort: false
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const wineApp = firebase.database().ref(`/users/${this.props.userID}/pantry`);
        wineApp.on('value', (snapshot) => {
            let dbPantry = snapshot.val();
            for (let wineKey in dbPantry) {
                if (dbPantry[wineKey].id === this.state.currentWine) {
                    let updates = {};
                    updates[`/${wineKey}/userRating`] = this.state.currentRating;
                    updates[`/${wineKey}/userNotes`] = this.state.currentNotes;
                    wineApp.update(updates);
                }
            }
        });
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
        return;
    }

    handleSorting(e) {
        const userPantry = this.state.userPantry
        const sortBy = this.state.currentSort;
        if (userPantry) {
            userPantry.sort(function (a, b) { 
                return a[sortBy] > b[sortBy]
            })

            if (this.state.currentOrder === 'descending') {
                userPantry.reverse();
            }
            this.setState({
                userPantry
            });
        }
        return;
    }

    editWine(wine) {
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
        const userPantry = this.state.userPantry;
        this.setState({
            currentWine: wine.id,
            currentRating: wine.userRating,
            currentNotes: wine.userNotes
        })
        return; 
    }

    cancelEdit(e) {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    }
        
    deleteWine(wineId) {
        const wineApp = firebase.database().ref(`/users/${this.props.userID}/pantry`);
        wineApp.on('value', (snapshot) => {
            let dbPantry = snapshot.val();
            for (let wineKey in dbPantry) {
                if (dbPantry[wineKey].id === wineId) {
                    wineApp.child(wineKey).remove()
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
                <div className="searchPantry">
                    <div className="searchPantryButtons">
                        <button onClick={(e) => this.handleSearchToggle('displaySort', e)}>Sort</button>
                        <button onClick={(e) => this.handleSearchToggle('displayFilter', e)}>Filter</button>
                    </div>
                    {this.state.displaySort || this.state.displayFilter ? 
                        <div className="searchBox">
                            {this.state.displaySort ?
                                <div className="sortBox">
                                    <label htmlFor="sort">Sort by</label>
                                    <select id="sort" 
                                    value={this.state.currentSort}
                                    onChange={(e) => this.handleChange('currentSort', e)}>
                                        <option value="price">Price</option>
                                        <option value="date">Date Added</option>
                                        <option value="userRating">My Rating</option>
                                    </select>

                                    <label htmlFor="order">Order by</label>
                                    <select id="order" value={this.state.currentOrder}
                                        onChange={(e) => this.handleChange('currentOrder', e)}>
                                        <option value="ascending">Ascending</option>
                                        <option value="descending">Descending</option>
                                    </select>
                                </div>
                                : 
                                <div className="filterBox">
                                    <h1>filter!</h1>
                                </div>
                                }
                            <button onClick={(e) => this.handleSearchToggle('cancel', e)}>Cancel</button>
                            <button onClick={(e) => this.handleSorting('submit', e)}>Submit</button>
                        </div>                  
                        :''}
                </div>
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
                                        <button onClick={() => this.editWine(wine)}>Edit</button>
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
                                        onChange={(e) => this.handleChange('currentNotes', e)}>></textarea>

                            </div>
                            <div className="ratingsField"> 
                                <label htmlFor="rating">Rating</label>
                                <select name="rating" 
                                value={this.state.currentRating}
                                    selected={this.state.currentRating}
                                    onChange={(e) => this.handleChange('currentRating', e)}>
                                    <option value='5'>5</option>
                                    <option value='4.5'>4.5</option>
                                    <option value='4'>4</option>
                                    <option value='3.5'>3.5</option>
                                    <option value='3'>3</option>
                                    <option value='2.5'>2.5</option>
                                    <option value='2'>2</option>
                                    <option value='1.5'>1.5</option>
                                    <option value='1'>1</option>
                                    <option value='0.5'>0.5</option>
                                </select>
                                <div className="modalButtons clearfix">
                                    <button>Submit</button>
                                    <button onClick={this.cancelEdit}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                </ul>
            </div>
        );
    }
}

export default Pantry;