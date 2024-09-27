import { TResponse } from "@/utils/response.util"
import { useState } from "react"
import { IUserResumeModel } from "../models/userResume.model"
import { IUserListService } from "../services/userList.service"
import { IUserFavoriteService } from "../services/userFavorite.service"

export interface IUserListStore {
    userList: Array<IUserResumeModel>
    preloadUserList: (userList: Array<IUserResumeModel>)=> void
    searchUserList: (search: string) => Promise<TResponse<Array<IUserResumeModel>, null>>
    setFavoriteUser: (user: IUserResumeModel) => Promise<TResponse<null, null>> 
}

export interface IUseServiceProps {
    userListService: IUserListService
    userFavoriteService: IUserFavoriteService
}

export const useUserListStore = (props: IUseServiceProps): IUserListStore => {

    const [userList, setUserList] = useState<IUserListStore['userList']>([])
 
    const searchUserList: IUserListStore['searchUserList'] = async (search) => {
        const response = await props.userListService.searchUserList(search)
        if(response.isSuccess) setUserList(response.data)
        return response
    }

    const preloadUserList: IUserListStore['preloadUserList'] = userList => {
        setUserList(userList)
    }

    const setFavoriteUser:IUserListStore['setFavoriteUser'] = async (userUpdated) => {
        const response = await props.userFavoriteService.setFavoriteUser(userUpdated)
        if(response.isSuccess) setUserList([...userList].map(user=>user.login === userUpdated.login ? {...userUpdated, favorite: !userUpdated.favorite } : user))
        return response
    }


    return {
        userList,
        preloadUserList,
        searchUserList,
        setFavoriteUser
    }
}