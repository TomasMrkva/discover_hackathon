import React,{ useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText, ListItemAvatar, Divider, Avatar, Container } from '@material-ui/core';
import { getRankings } from "../../firebase_operations";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Leaderboard({posts}){

    const [loading, setLoading] = useState(true)
    const [ranking, setRanking] = useState([])

    useEffect(() =>{
        getRankings(setLoading, posts, setRanking)
        return () => {
            setRanking([])
        }
    },[posts])

    return (
        <div style={{paddingBottom: '75px'}}>
            <Container style={{textAlign: 'center', paddingLeft: 0, paddingRight: 0}}>
                <Typography style={{padding: '35px'}}variant="h4" component="h2">Leaderboard</Typography>
                <img src={'trophy.svg'} alt='trophy' style={{width: 'auto', height: '15vh', paddingBottom: '5vh'}}/>
                { loading ? 
                    <div style={{minHeight: '40vh'}}>
                        <CircularProgress style={{color: 'black', marginTop:'20vh'}}/>
                    </div> : 
                    <List>
                    {ranking.map((el,i) => {
                        return(
                            <React.Fragment key={i}>
                                <ListItem style={{backgroundColor: i === 0 ? '#efc75e99' : i === 1 ? '#c0c0c059' : i === 2 ? '#ed9d5d47' : ''}}>
                                    <ListItemAvatar>
                                    <Avatar alt="avatar" src={el.avatar}>
                                        {el.name.charAt(0)}
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={el.name} secondary={'Number of posts: ' + el.totalPosts} />
                                    { i === 0 ? <img src={'gold.svg'} alt="gold-medal" style={{width: '45px'}}/>    //
                                    : i === 1 ? <img src={'silver.svg'} alt="silver-medal" style={{width: '45px'}}/>    //
                                    : i === 2 ? <img src={'bronze.svg'} alt="bronze-medal" style={{width: '45px'}}/>    //
                                    : null
                                    }
                                </ListItem>
                                {i !== ranking.length-1 && i > 2 && <Divider variant="middle" component="li"/>}
                            </React.Fragment>
                        )
                    })}
                    </List>
                }
            </Container>
        </div>
    )
}