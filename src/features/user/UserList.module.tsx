import { FC } from "react"
import Link from 'next/link';
import { useUserListHook } from "./hooks/userList.hook";
import { IUserResumeModel } from "./models/userResume.model";
import { IUserListStore } from "./stores/userList.store";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';


import { UserResumeCardComponent } from "./components/UserResumeCard.component";
import { Alert, Container, Snackbar } from "@mui/material";
import { UserSearchToolComponent } from "./components/userSearchTool.component";


export interface IUserListFeatureProps {
    userListStore: IUserListStore
    preloadUserList: Array<IUserResumeModel>
}

const UserListModule: FC<IUserListFeatureProps> = props => {

    const userListHook = useUserListHook({
        userListStore: props.userListStore,
        preloadUserList: props.preloadUserList
    })

    return (
        <Container >
            <Snackbar open={userListHook.isOpenServerErrorAlert} autoHideDuration={6000} onClose={() => { }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="error" onClose={userListHook.onCloseErrorServerAlertHandler}>Server Error</Alert>
            </Snackbar>
            <Grid container spacing={2} size={12} padding={2}>

                <Grid container size={12}>
                    <UserSearchToolComponent
                        isLoading={userListHook.isSearchLoading}
                        onChangeSearchValue={userListHook.onChangeSearchValueHandler}
                        onClickSearch={userListHook.onClickSearchHandler}
                        searchValue={userListHook.searchValue}
                    />

                </Grid>

                <Grid container spacing={2} size={12}>
                    {userListHook.currentUserList.map(user => (
                        <Grid key={user.id} size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}>
                            <UserResumeCardComponent
                                userResume={user}
                                onClickFavorite={userListHook.onClickFavoriteHandler}
                                isLoadingSetFavorite={user.id === userListHook.currentLoadingSetFavorite}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserListModule