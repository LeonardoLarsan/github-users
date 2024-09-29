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
            <TextField
                label="Busqueda"
                variant="outlined" 
                value={props.searchValue} 
                onChange={e => props.onChangeSearchValue(e.target.value)} 
            />
            <LoadingButton
                data-testid="search-button"
                loading={props.isLoading}
                startIcon={<SearchIcon />} 
                variant="contained" 
                onClick={props.onClickSearch}>Buscar
            </LoadingButton>
        </>
    )
}



