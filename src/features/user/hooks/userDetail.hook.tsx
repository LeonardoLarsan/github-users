import { useEffect, useState } from "react"
import { IUserDetailModel } from "../models/userDetail.model"
import { IUserDetailStore } from "../stores/userDetail.store"

interface IUseUserDetailHookProps {
    userDetailStore: IUserDetailStore
    userDetailPreload: IUserDetailModel
}

export const useUserDetailHook = (props: IUseUserDetailHookProps) => {
    
    const [isLoadingSetFavorite, setIsLoadingSetFavorite] = useState<boolean>(false) 
    const [isOpenServerErrorAlert, setIsOpenServerErrorAlert] = useState<boolean>(false)
    
    const currentUserDetail = props.userDetailStore.userDetail.id ? props.userDetailStore.userDetail : props.userDetailPreload
    

    useEffect(()=> {
        props.userDetailStore.preloadUserDetail(props.userDetailPreload)
    }, [])

    const onSetFavoriteUserHandler =  async (user: IUserDetailModel)=> {
        setIsLoadingSetFavorite(true)
        const response = await props.userDetailStore.setFavoriteUser(currentUserDetail)
        setIsLoadingSetFavorite(false)
        if(response.isError) setIsOpenServerErrorAlert(true)
    }

    const onCloseErrorServerAlertHandler = () => setIsOpenServerErrorAlert(false)

    return {
        currentUserDetail,
        isLoadingSetFavorite,
        onSetFavoriteUserHandler,
        isOpenServerErrorAlert,
        onCloseErrorServerAlertHandler
    }
}