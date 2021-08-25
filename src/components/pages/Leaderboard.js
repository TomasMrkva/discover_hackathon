import React,{ useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText, ListItemAvatar, Divider, Avatar, Container, Button } from '@material-ui/core';
import { getRankings } from "../../firebase_operations";
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function Leaderboard({posts}){

    const [loading, setLoading] = useState(true)
    const [ranking, setRanking] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() =>{
        getRankings(setLoading, posts, setRanking)
        return () => {
            setRanking()
        }
    },[posts])

    const pageSwitchHandler = () => {
        switch(page) {
            case 0:
                return ranking.sort((a, b) =>  b.totalPosts - a.totalPosts);
            case 1:
                return ranking.sort((a, b) =>  b.totalLikes - a.totalLikes);
            default:
                return ranking
        }
    }
    const handleChange = (event, newValue) => {
        setPage(newValue);
    };

    function getCorrectData(el) {
        if (page === 0) 
            return el.totalPosts
        return el.totalLikes;
    }

    function getCorrectPlace(el, leaders) {
        switch (page === 0 ? el.totalPosts : el.totalLikes) {
            case leaders?.first[0]:
                return 1
            case leaders?.second[0]:
                return 2
            case leaders?.third[0]:
                return 3
            default: 
                return 4
        }
    }

    let leaders = {first: [], second: [], third: []}

    return (
        <div style={{paddingBottom: '75px'}}>
            <Button onClick={() => setPage('likes')}></Button>
            <Container style={{textAlign: 'center', paddingLeft: 0, paddingRight: 0}}>
                <Typography style={{paddingTop: '20px', paddingBottom: '10px'}}variant="h4" component="h2">Leaderboard</Typography>
                <img src={'trophy.svg'} alt='trophy' style={{width: 'auto', height: '15vh', paddingBottom: '2vh'}}/>
                    <Tabs
                        centered                    
                        value={page}
                        indicatorColor="secondary"
                        onChange={handleChange}
                    >
                         <Tab /*icon={<ImageIcon />}*/ label="Posts" style={{minWidth: '40vw'}}/>
                         <Tab /*icon={<FavoriteIcon />}*/ label="Likes" style={{minWidth: '40vw'}}/>
                    </Tabs>
                { loading ? 
                    <div style={{minHeight: '40vh'}}>
                        <CircularProgress style={{color: 'black', marginTop:'20vh'}}/>
                    </div> : 
                    <List>
                    { pageSwitchHandler().map((el,i) => {
                        leaders.first.length === 0 ? leaders.first.push(getCorrectData(el))
                        : getCorrectData(el) === leaders.first[0] ? leaders.first.push(getCorrectData(el))
                        :  leaders.second.length === 0 ? leaders.second.push(getCorrectData(el))
                        : getCorrectData(el) === leaders.second[0] ? leaders.second.push(getCorrectData(el))
                        :  leaders.third.length === 0 ? leaders.third.push(getCorrectData(el))
                        : getCorrectData(el) === leaders.third[0] && leaders.third.push(getCorrectData(el))
                        return(
                            <React.Fragment key={i}>
                                <ListItem style={
                                    { backgroundColor: 
                                        getCorrectPlace(el, leaders) === 1 ? '#efc75e99' 
                                        : getCorrectPlace(el, leaders) === 2 ? '#c0c0c059' 
                                        : getCorrectPlace(el, leaders) === 3 ? '#ed9d5d47' 
                                        : ''}
                                    }>
                                    <ListItemAvatar>
                                    <Avatar alt="avatar" src={el.avatar}>
                                        {el.name.charAt(0)}
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={el.name} 
                                        secondary={ page === 0 ? 
                                            'Number of posts uploaded: ' + el.totalPosts 
                                            :'Number of likes received: ' + el.totalLikes
                                        } />
                                    { getCorrectPlace(el, leaders) === 1 ? <img src={'gold.svg'} alt="gold-medal" style={{width: '45px'}}/>    //
                                    : getCorrectPlace(el, leaders) === 2 ? <img src={'silver.svg'} alt="silver-medal" style={{width: '45px'}}/>    //
                                    : getCorrectPlace(el, leaders) === 3 ? <img src={'bronze.svg'} alt="bronze-medal" style={{width: '45px'}}/>    //
                                    : null
                                    }
                                </ListItem>
                                {i > Object.keys(leaders).map(key => leaders[key].length).reduce((a, b) => a + b) && <Divider variant="middle" component="li"/>}
                            </React.Fragment>
                        )
                    })}
                    </List>
                }
            </Container>
        </div>
    )
}