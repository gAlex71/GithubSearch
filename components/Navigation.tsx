import React from "react";
import {Link} from 'react-router-dom'

const Navigation = () => {
    return(
        <nav>
            <h3>GitHub Search</h3>

            <span>
                <Link style={{marginRight: '10px'}} to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
            </span>
        </nav>
    )
}

export default Navigation