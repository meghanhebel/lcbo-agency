import React from 'react';
import firebase from 'firebase';

var config = {
    apiKey: 'AIzaSyAxBftb2LL5DfmTV6tYBuM96SPXG74M8h8',
    authDomain: 'lcbo-agency.firebaseapp.com',
    databaseURL: 'https://lcbo-agency.firebaseio.com',
    projectId: 'lcbo-agency',
    storageBucket: 'lcbo-agency.appspot.com',
    messagingSenderId: '813260474801'
};


export default class LogIn extends React.Component {
    constructor(){
        super();
        this.state = {
            logIn: {
                createEmail: '',
                createPassword: '',
                userEmail: '',
                userPassword: '',
                loggedIn: false
            },
            showLogIn: false,
            showSignUp: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.newUser = this.newUser.bind(this);
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.showLogIn = this.showLogIn.bind(this);
        this.showSignUp = this.showSignUp.bind(this);
    }
    // sets the create___ states to value of corresponding inputs
    handleChange(event, field){
        const newState = Object.assign({},this.state);
        newState.logIn[field] =  event.target.value;
        this.setState(newState);

    }

    newUser(event){
        event.preventDefault();
        const email = this.state.logIn.createEmail;
        const password = this.state.logIn.createPassword;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch ((error) => console.log(error.code, error.message));
        
        alert(`New user ${this.state.logIn.createEmail} has been created. You may now Log In.`);
        
        this.setState({
            showLogIn: true,
            showSignUp: false
        })
    }
    logIn(event){
        event.preventDefault();
        const email = this.state.logIn.userEmail;
        const password = this.state.logIn.userPassword;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((success) => {
                alert(`Now logged in as ${success.email}`);
            }), (error) => {
                console.log(error);
            }

        this.setState({
            showLogIn: false,
            showSignUp: false
        })
    }
    logOut(){
        firebase.auth().signOut()
            .then((success) => {
               alert ('You have successfully logged out')
            }, (error) => {
                console.log(error);
            }
        )
        this.setState({
            showLogIn: false,
            showSignUp: false
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            
            if (user) {
                this.setState({
                    logIn:{
                        loggedIn: true,
                    }    
                });
            } else {
                this.setState({
                    logIn:{
                        loggedIn: false
                    }
                });
            }
            
            
        })
           
    }

    showLogIn(){
        this.setState({
            showLogIn:true
        })
    }
    
    showSignUp(){
        this.setState({
            showSignUp:true
        })
    }

   

    render(){
        return(
            <div className="logInContainer">

                {this.state.logIn.loggedIn ? 
                    <div> </div>
                :
                <div className="logInBtn">
                    <button onClick={this.showSignUp}>Sign Up</button>
                    <button onClick={this.showLogIn}>Log In</button>
                </div>
                }
            
               { this.state.logIn.loggedIn ? 
                    <div className="clearfix">   
                        <a href="/pantry" className="pantryBtn">Go to My Pantry</a>
                        <div className="logOutBtn">
                            <button onClick={this.logOut}>Log Out</button>
                        </div>
                    </div>
                    
                    
                :

                    <div className="logInFormsBlock">
                        { this.state.showLogIn ?
                                <div className="logInBlock">
                                    <form onSubmit={(event) => this.logIn(event)}>
                                        <h3>Sign In</h3>
                                        <label htmlFor="password">email</label>
                                        <input type="email" name="email" onChange={(event) => this.handleChange(event, 'userEmail')} />
                                        <label htmlFor="password">password</label>
                                    <input type="password" minLength="6" name="password" onChange={(event) => this.handleChange(event, 'userPassword')} />
                                        <button>Go to Wine Country</button>
                                    </form>
                                </div> 

                            :
                                <div> </div>
                        }
                        { this.state.showSignUp ?
                                <div className="signUpBlock">
                                    <h4>Don't have an account yet?</h4>
                                    <h3>Sign Up Here</h3>
                                    <form onSubmit={(event) => this.newUser(event)}>
                                        <label htmlFor="password">email</label>
                                        <input type="email" name="email" onChange={(event) => this.handleChange(event, 'createEmail')} />
                                        <label htmlFor="password">password</label>
                                    <input type="password" minLength="6" name="password" onChange={(event) => this.handleChange(event, 'createPassword')} />
                                        <button>Go to Wine Country</button>
                                    </form>
                                </div>  
                            :
                            
                                <div> </div>
                        }
                    
                    </div>
               }  
            </div>        
        )
    }
}