import { useEffect, useState } from "react"
import { IUserListStore } from "../stores/userList.store"
import { IUserResumeModel } from "../models/userResume.model"


interface IUseUserListHookProps {
    userListStore: IUserListStore
    preloadUserList: Array<IUserResumeModel>
}

export const useUserListHook = (props: IUseUserListHookProps)=> {
    
    const [ searchValue, setSearchValue ] = useState<string>('')
    const [currentLoadingSetFavorite, setCurrentLoadingSetFavorite] = useState<number>(0)
    const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false)
    const [isOpenServerErrorAlert, setIsOpenServerErrorAlert] = useState<boolean>(false)

    useEffect(()=> {
        props.userListStore.preloadUserList(props.preloadUserList)
    }, [])
    
    const onChangeSearchValueHandler = (value: string) => setSearchValue(value) 

    const onClickSearchHandler = async () => {
        setIsSearchLoading(true)
        const response = await props.userListStore.searchUserList(searchValue)
        setIsSearchLoading(false)
        if(response.isError) setIsOpenServerErrorAlert(true)
    }

    const onClickFavoriteHandler = async (user: IUserResumeModel)=> {
        setCurrentLoadingSetFavorite(user.id)
        const response = await props.userListStore.setFavoriteUser(user)
        setCurrentLoadingSetFavorite(0)
        if(response.isError) setIsOpenServerErrorAlert(true)
    }

    const onCloseErrorServerAlertHandler = () => setIsOpenServerErrorAlert(false)

    const currentUserList = props.userListStore.userList.length ?   props.userListStore.userList  : props.preloadUserList 

    return {
        currentUserList,
        searchValue,
        isSearchLoading,
        currentLoadingSetFavorite,
        isOpenServerErrorAlert,
        onChangeSearchValueHandler,
        onClickSearchHandler,
        onClickFavoriteHandler,
        onCloseErrorServerAlertHandler
    }
}