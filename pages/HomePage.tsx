import React, { useEffect, useState } from "react";
import RepoCard from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [ dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    //Github будет искать пользователся, в username которого есть данная строчка
    const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
        //Запрос не отправляется, если длина запроса меньше 3 символов
        skip: debounced.length < 3,
        //Если мы уходили со страницы на другую вкладку, а потом снова вернулись, то автоматически обновляются данные
        refetchOnFocus: true
    })
    const [ fetchRepos, {isLoading: isReposLoading, data: repos} ] = useLazyGetUserReposQuery()

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data])

    const clickHandler = (username: string) => {
        //Загружаем данные в хук
        fetchRepos(username); 
        setDropdown(false)
    }

    return(
        <div style={{display: 'flex', justifyContent: 'center', margin: 'auto'}}>
            { isError && <p style={{color: 'red'}}>Something wrong...</p>}

            <div style={{position: 'relative', width: '560px'}}>
                <input
                    type="text"
                    style={{border: '1px solid black', padding: '5px 10px', width: '100%', height: '42px'}}
                    placeholder="Search for GitHub username..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                {dropdown &&
                    <ul style={{position: 'absolute', marginTop: '42px', left: '0', right: '0', background: '#D8D8D8'}}>
                        {isLoading && <p>Loading...</p>}
                        {data?.map(user =>(
                            <li 
                                onClick={() => clickHandler(user.login)}
                                key={user.id}
                            >{user.login}</li> 
                        ))}
                    </ul>
                }

                <div>
                    {isReposLoading && <p>Repos is loading...</p>}
                    {repos?.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
                </div>
            </div>
        </div>
    )
}

export default HomePage