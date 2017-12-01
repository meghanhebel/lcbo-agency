import React from 'react';
import Results from './Results';
import Search from './Search';
import axios from 'axios';

export default class MarketPlace extends React.Component {
    constructor() {
        super();
        this.state = {
            wineResults: [],
            keywordArray: [] 
        }
        this.grabKeywordArray = this.grabKeywordArray.bind(this)
        this.makeDataCall = this.makeDataCall.bind(this)
    
    }

    // componentDidMount() {
    //     console.log(this.state.keywordArray)
    //     // this variable to be filled with whatever the user enters
    //     const access_key = 'MDo5ODRjMDU2Ni1kNTBhLTExZTctYjFmYS1lN2UwOGZlNzE3OWY6WFJBVXV1Q2FkWDdBUkQ5aUtxc0ZYejl3ZTVCaDU0emFYRG56';
    //     axios.get(`http://lcboapi.com/products?`, {
    //         params: {
    //             dataType: 'json',
    //             // q: `wine+${searchParams}`,
    //             q: this.state.keywordArray,
    //             // this.state.keywordArray,
    //             where_not: 'is_dead,is_discontinued',
    //             per_page: 100,
    //             access_key
    //         }
    //     }).then((res) => {
    //         // console.log(res.data.pager);
    //         // console.log(res.data.pager.next_page_path);
    //         // previous_page_path null if page is 1
    //         console.log('result from API ',res.data.result);
    //         this.setState({
    //             wineResults: res.data.result.filter(wine => wine.primary_category === "Wine")
    //         });
    //     });
    // }

    grabKeywordArray(array) {
        array.unshift('wine');
        // this.makeDataCall(array);
        this.setState({
            keywordArray: array
        }, this.makeDataCall(this.state.keywordArray)) 
        // setTimeout(function(){this.makeDataCall(this.state.keywordArray)}.bind(this), 1000);
    }

    makeDataCall(keywords) {
        console.log(`Called with the keyword ${keywords}`)
        const access_key = 'MDo5ODRjMDU2Ni1kNTBhLTExZTctYjFmYS1lN2UwOGZlNzE3OWY6WFJBVXV1Q2FkWDdBUkQ5aUtxc0ZYejl3ZTVCaDU0emFYRG56';
        axios.get(`http://lcboapi.com/products?`, {
            params: {
                dataType: 'json',
                // q: `wine+${searchParams}`,
                q: keywords,
                // this.state.keywordArray,
                where_not: 'is_dead,is_discontinued',
                per_page: 100,
                access_key
            }
        }).then((res) => {
            console.log('result from API ',res.data.result);
            this.setState({
                wineResults: res.data.result.filter(wine => wine.primary_category === "Wine")
            });
        });
    }

    render() {
        console.log('render res',this.state.wineResults);
        return(
            <div className="marketplace">
                <Search 
                grabKeywordArray = {this.grabKeywordArray}/>                
                <Results results={this.state.wineResults} />
            </div>
        )
    }
}