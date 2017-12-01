import React from 'react';
import Results from './Results';
import Search from './Search';
import axios from 'axios';

export default class MarketPlace extends React.Component {
    constructor() {
        super();
        this.state = {
            wineResults: [],
            keywordArray: [],
            showResults: false,
        }
        this.makeDataCall = this.makeDataCall.bind(this)  
        this.listenForNewId = this.listenForNewId.bind(this)  
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            keywordArray: nextProps.results
        })

        if (this.props.userID != nextProps.userID) {
            this.listenForNewId(nextProps.userID);
        } 
        
    }

    listenForNewId(newID){
        return newID;
    }


    makeDataCall(keywords) {
        console.log(`Called with the keyword ${keywords}`)
        const access_key = 'MDo5ODRjMDU2Ni1kNTBhLTExZTctYjFmYS1lN2UwOGZlNzE3OWY6WFJBVXV1Q2FkWDdBUkQ5aUtxc0ZYejl3ZTVCaDU0emFYRG56';
        axios.get(`http://lcboapi.com/products?`, {
            params: {
                dataType: 'json',
                q: keywords,
                where_not: 'is_dead,is_discontinued',
                per_page: 100,
                access_key
            }
        }).then((res) => {
            console.log('result from API ',res.data.result);
            this.setState({
                wineResults: res.data.result.filter(wine => wine.primary_category === "Wine"),
                showReply: true
            });

        });
    }

    render() {
        console.log(this.props.userID);
        return(
            <div className="marketplace">
                <Search 
                makeDataCall = {this.makeDataCall} />
                {this.state.showReply === true ? <Results userID={this.props.userID} results={this.state.wineResults} /> : null}
            </div>
        )
    }
}
