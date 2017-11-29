import React from 'react';
import Results from './Results';
import Search from './Search';
import axios from 'axios';

export default class MarketPlace extends React.Component {
    constructor() {
        super();
        this.state = {
            wineResults: [],
        }
    }

    componentDidMount() {
        let searchParams = '';
        // this variable to be filled with whatever the user enters
        const access_key = 'MDo5ODRjMDU2Ni1kNTBhLTExZTctYjFmYS1lN2UwOGZlNzE3OWY6WFJBVXV1Q2FkWDdBUkQ5aUtxc0ZYejl3ZTVCaDU0emFYRG56';
        axios.get(`http://lcboapi.com/products?`, {
            params: {
                dataType: 'json',
                // q: `wine+${searchParams}`,
                q: ['wine'],
                where_not: 'is_dead,is_discontinued',
                per_page: 100,
                access_key
            }
        }).then((res) => {
            console.log(res.data.pager);
            console.log(res.data.pager.next_page_path);
            // previous_page_path null if page is 1
            console.log(res.data.result);
            this.setState({
                wineResults: res.data.result.filter(wine => wine.primary_category === "Wine")
            });
        });
    }

    render() {
        return(
            <div className="marketplace">
                <Search />
                <Results />
            </div>
        )
    }
}