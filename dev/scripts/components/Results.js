import React from 'react';
import axios from 'axios';

class Results extends React.Component {
    constructor() {
        super();
        this.state = {
            wines: []
        }
    }

    componentDidMount() {
        const access_key = 'MDo5ODRjMDU2Ni1kNTBhLTExZTctYjFmYS1lN2UwOGZlNzE3OWY6WFJBVXV1Q2FkWDdBUkQ5aUtxc0ZYejl3ZTVCaDU0emFYRG56';
        axios.get(`http://lcboapi.com/products?`, {
            params: {
                dataType: 'json',
                q: 'wine',
                where_not: 'is_dead,is_discontinued',
                access_key
            }
        }).then((res) => {
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
                    console.log('categ ', wine.primary_category);
                    return (
                        <div key={wine.id} className='searchResults-wineResult'>
                        {(wine.primary_category === 'Wine') ? 
                        // need this to filter out anything that is NOT primary category Wine
                        <li>
                            <img src={wine.image_thumb_url} alt={`image of ${wine.name}, a ${wine.secondary_category}`}/>
                            <figcaption>
                                <h3>{wine.name}</h3>
                                <h4>{wine.varietal}</h4>
                                <h4>${Math.round(wine.price_in_cents * .01 * 100 )/ 100}</h4>
                                <h6>{wine.secondary_category}</h6>
                                <h6>{wine.sugar_content}</h6>
                                <h6>{wine.style}</h6>
                                {wine.description ? <h6>{wine.description}</h6> : ''}
                                {/* many of them don't have a description */}
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