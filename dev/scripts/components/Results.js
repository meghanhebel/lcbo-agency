import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

class Results extends React.Component {
    constructor() {
        super();
        this.state = {
            wines: []
        }
    }

    componentDidMount() {
        let searchParams = '';
        // this variable to be filled with whatever the user enters
        const access_key = 'MDo5ODRjMDU2Ni1kNTBhLTExZTctYjFmYS1lN2UwOGZlNzE3OWY6WFJBVXV1Q2FkWDdBUkQ5aUtxc0ZYejl3ZTVCaDU0emFYRG56';
        axios.get(`http://lcboapi.com/products?`, {
            params: {
                dataType: 'json',
                q: `wine+${searchParams}`,
                where_not: 'is_dead,is_discontinued',
                per_page: 10,
                access_key
            }
        }).then((res) => {
            console.log(res.data.pager);
            console.log(res.data.pager.next_page_path);
            // previous_page_path null if page is 1
            console.log(res.data.result);
            this.setState({
                wines: res.data.result
            });
        });
    }
    
    render() {
        return (
            <div className='searchResults'>
                <h1>Results</h1>
                <ul>
                {this.state.wines.map((wine) => {
                    const secondCateg = wine.secondary_category;
                    let typeWine = '';
                        if (secondCateg.match(/Red/)) {
                            typeWine = 'red';
                        } else if (secondCateg.match(/White/)) {
                            typeWine = 'white';
                        } else {
                            typeWine = 'rose';
                        }
                    return (
                        <div key={wine.id} className={`wineResult ${typeWine}`}>
                        {(wine.primary_category === 'Wine') ? 
                        // need this to filter out anything that is NOT primary category Wine
                        <li>
                            <img src={wine.image_thumb_url} alt={`image of ${wine.name}, a ${wine.secondary_category}`}/>
                            <figcaption>
                                <h3>{wine.name}</h3>
                                <h6>
                                    <span>{wine.varietal}</span>
                                    <span>{wine.sugar_content}</span>  
                                    <span>${Math.round(wine.price_in_cents * .01 * 100) / 100}</span>
                                </h6>
                                {(wine.description || wine.style) ? (wine.description ? <h6>{wine.description}</h6> : <h6>{wine.style}</h6>) : ''} 
                                {/* nested ternary-- if wine has a description OR a style 
                                    --> check if it has desc, display that, else style
                                    --> if it doesnt have either, display nothing */}
                            <NavLink to="/pantry"><button>Add to pantry</button></NavLink>
                            </figcaption>
                        </li> 
                        : '' } 
                    </div>
                )})}
                </ul>
            </div>
        );
    }
}

export default Results;