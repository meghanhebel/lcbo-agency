import React from 'react';
import Heading from './Heading'
import MainWineImage from './MainWineImage'

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <Heading />
                <MainWineImage />
            </div>
        );
    }
}

export default Home;