import React,{useState, useEffect} from 'react'
import LabelBottomNavigation from '../BottomNavBar'
import Leaderboard from './Leaderboard'
import Posts from './Posts'
import { getPosts } from '../../firebase_operations';
import SearchAppBar from '../SearchAppBar'

export default function Skeleton() {

    const [page, setPage] = useState('posts');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('');

    useEffect(() => {
        document.body.style.backgroundImage = ''
        getPosts(setLoading, setPosts)
        return() => {
          setPosts([])
        }
      },[]) //eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            <SearchAppBar search={search} setSearch={setSearch} showSearch={page === 'posts'}/>
            { page === 'posts' ? 
                <Posts posts={posts} loading={loading} setLoading={setLoading} search={search} setSearch={setSearch}/>
            : !loading && 
                <Leaderboard posts={posts}/>
            }
            <LabelBottomNavigation page={page} setPage={setPage}/>
        </>
    )
}
