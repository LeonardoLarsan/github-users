import { FC } from "react"
import { IUserResumeModel } from "../models/userResume.model"
import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, Link, Typography } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import { LoadingButton } from "@mui/lab";

export interface IUserResumeCardComponentProps {
    userResume: IUserResumeModel
    onClickFavorite: (userResume: IUserResumeModel) => void
    isLoadingSetFavorite: boolean
}

export const UserResumeCardComponent: FC<IUserResumeCardComponentProps> = props => {
    return (

        <Card>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={props.userResume.avatar_url}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{props.userResume.login}</Typography>
            </CardContent>
            <CardActions>
                <Link href={`/${props.userResume.login}`}>
                    <IconButton color="primary">
                        <VisibilityIcon />
                    </IconButton>
                </Link>
                <LoadingButton 
                    data-testid={`favoriteButton-${props.userResume.id}`} 
                    loading={props.isLoadingSetFavorite} 
                    color={props.userResume.favorite ? 'warning' : 'inherit'} 
                    onClick={() => props.onClickFavorite(props.userResume)}
                >
                    <StarIcon />
                </LoadingButton>
            </CardActions>
        </Card>
    )
} 