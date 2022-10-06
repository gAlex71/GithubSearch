import React, {useState} from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { IRepo } from "../models/models";


const RepoCard = ({repo}: {repo: IRepo}) => {
    const { addFavorite, removeFavorite } = useActions()
    const {favorites} = useAppSelector(state => state.github)

    const [isFav, setIsFav] = useState(favorites.includes(repo.html_url))

    const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        addFavorite(repo.html_url)
        setIsFav(true)
    }

    const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        removeFavorite(repo.html_url)
        setIsFav(false)
    }

    return(
        <div>
            {/* Открытие репозитория в новой ссылке */}
            <a href={repo.html_url} target="_blank">
                <h2>{repo.full_name}</h2>
                <p>
                    Forks:<span>{repo.forks}</span>
                    Watchers:<span>{repo.watchers}</span>
                </p>
                <p>{repo?.description}</p>
            </a>

            {!isFav && <button onClick={addToFavorite}>Add</button>}
            {isFav && <button onClick={removeFromFavorite}>Remove</button>}
        </div>
    )
}

export default RepoCard