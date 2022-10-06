import React from "react";
import { useAppSelector } from "../hooks/redux";

const FavoritesPage = () => {
    const {favorites} = useAppSelector(state => state.github)

    if (favorites.length === 0) return <p>No elements</p>

    return(
        <div style={{display: 'flex', justifyContent: 'center', margin: 'auto'}}>
            <ul>
                {favorites.map(i =>
                    <li key={i}>
                        <a href={i} target="_blank">{i}</a>
                    </li>    
                )}
            </ul>
        </div>
    )
}

export default FavoritesPage