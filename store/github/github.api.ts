import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IUser, ServerResponse, IRepo } from "../../models/models"

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        //Запрос на поиск пользователей 
        searchUsers: build.query<IUser[], string>({
            query: (search: string) => ({
                url: 'search/users',
                params:{
                    q: search,
                    per_page: 10
                }
            }),
            //Трансформируем запрос с сервера в нужный нам формат ответа
            transformResponse: (response: ServerResponse<IUser>) => response.items
        }),
        //Запрос о репозиториях данного пользователя
        getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`
            })
        })
    })
})

//Вместе с этим автоматически создается кастомный хук
//Lazy говорит нам о том, что мы можем сделать запрос, в момент, когда захотим
export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi