import React from 'react';

export default class SearchInput extends React.Component {
    constructor() {
        super();
        this.state = {
            keywords: ""
        }
        this.collectKeywords = this.collectKeywords.bind(this)
        this.initiateSearch = this.initiateSearch.bind(this);
    }

    collectKeywords(event) {
        this.setState({keywords: event.target.value});
    }

    initiateSearch(e) {
        e.preventDefault();
        console.log('form submitted')
        let keywordString = this.state.keywords;
        let keywordArray = keywordString.split(" ");
        keywordArray.unshift('wine');
        this.props.makeDataCall(keywordArray);
    }
    

    render() {
        return(
            <form className="searchinput" action=""
            onSubmit = {this.initiateSearch}
            >
                <label id="search_label" htmlFor="" >Search</label>
                <input type="text" placeholder="search by name, style, winery..etc " 
                onChange = {this.collectKeywords}
                />
                <input type="submit" 
                />
            </form>
        )
    }
}