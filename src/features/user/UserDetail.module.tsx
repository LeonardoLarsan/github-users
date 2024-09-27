import { FC } from "react"
import { IUserDetailModel } from "./models/userDetail.model"
import { IUserDetailStore } from "./stores/userDetail.store"
import { useUserDetailHook } from "./hooks/userDetail.hook"
import { Alert, Container, Snackbar } from "@mui/material"
import { UserDetailCardComponent } from "./components/UserDetailCard.component"

interface IUserDetailFeatureProps {
    userDetailStore: IUserDetailStore
    userDetailPreload: IUserDetailModel
}

export const UserDetailModule: FC<IUserDetailFeatureProps> = props => {

    const userDetailHook = useUserDetailHook({ userDetailStore: props.userDetailStore, userDetailPreload: props.userDetailPreload })

    return (
        <Container style={{ padding: '1%' }}>
            <Snackbar open={userDetailHook.isOpenServerErrorAlert} autoHideDuration={6000} onClose={()=> {}} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="error" onClose={userDetailHook.onCloseErrorServerAlertHandler}>Server Error</Alert>
            </Snackbar> 
            <UserDetailCardComponent
                onSetFavoriteUser={userDetailHook.onSetFavoriteUserHandler}
                userDetail={userDetailHook.currentUserDetail}
                isLoadingSetFavorite={userDetailHook.isLoadingSetFavorite}
            />
        </Container>
    )
}

