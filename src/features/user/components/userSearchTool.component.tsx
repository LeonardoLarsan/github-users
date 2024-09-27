import { FC } from "react"

import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from "@mui/lab";


interface IUserSearchToolComponentProps {
    searchValue: string
    onChangeSearchValue: (value: string) => void
    onClickSearch: () => void
    isLoading: boolean
}

export const UserSearchToolComponent: FC<IUserSearchToolComponentProps> = props => {

    return (
        <>
            <TextField id="outlined-basic" variant="outlined" value={props.searchValue} onChange={e => props.onChangeSearchValue(e.target.value)} />
            <LoadingButton loading={props.isLoading} startIcon={<SearchIcon />} variant="contained" onClick={props.onClickSearch}>Buscar</LoadingButton>
        </>
    )
}



