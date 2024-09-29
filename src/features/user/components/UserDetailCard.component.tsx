import { Card, CardActions, CardContent, CardMedia, Container, IconButton, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Table from '@mui/material/Table';
import StarIcon from '@mui/icons-material/Star';
import { IUserDetailModel } from "../models/userDetail.model";
import { FC } from "react";

import LoadingButton from '@mui/lab/LoadingButton';

interface IUserDetailCardComponentProps {
    userDetail: IUserDetailModel
    isLoadingSetFavorite: boolean
    onSetFavoriteUser: (userDetail: IUserDetailModel) => void
}

export const UserDetailCardComponent: FC<IUserDetailCardComponentProps> = (props) => {

    const rowDataList = Object.entries(props.userDetail).map(([key, value]) => ({ label: key, value: value }));

    const getFormatValue = (value: any) => {
        if (typeof value === 'boolean' && value === true) return 'Yes'
        if (typeof value === 'boolean' && value === false) return 'No'

        return value
    }

    return (
        <Card>
            <CardMedia
                component="img"
                alt="green iguana"
                height="500"
                image={props.userDetail.avatar_url}
            />
            <CardActions>
                <LoadingButton
                    data-testid="favoriteButton"
                    size="large" 
                    loading={props.isLoadingSetFavorite} 
                    color={props.userDetail.favorite ? 'warning' : 'inherit'} 
                    onClick={() => props.onSetFavoriteUser(props.userDetail)}
                >
                    <StarIcon fontSize="large" />
                </LoadingButton>
            </CardActions>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            {rowDataList.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{row.label}</TableCell>
                                    <TableCell align="right">{getFormatValue(row.value)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}