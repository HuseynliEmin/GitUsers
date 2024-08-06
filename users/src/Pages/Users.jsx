import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import '../components/users.css'
import { Link } from 'react-router-dom'
import Context from '../components/Context'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Loading from '../components/Loading'

function Users() {

    const { usersData, setUsersData, filterSearch, token, setFavorite, favorite, setLoading, loading } = useContext(Context)
    const Base_url = import.meta.env.VITE_API

    async function UsersData() {
        try {
            setLoading(true)
            const response = await axios.get(`${Base_url}`, {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            setLoading(false)
            const users = response.data ? response.data : []
            setUsersData(users)


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        UsersData()
    }, [])
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(favorite));
    }, [favorite]);
    function removeFavorite(id) {
        setFavorite(favorite.filter(item => item.id != id))
    }
    function isFavorite(userId) {
        return favorite.find(item => item.id == userId)
    }
    function favoriteClick(user) {
        if (isFavorite(user.id)) {
            removeFavorite(user.id)
        } else {
            setFavorite([...favorite, user])
        }
    }
    return (<>
        <div className='parentBox'>
            {loading ? <Loading/> : filterSearch?.map(item => (
                <div className='usersBox' key={item.id} >
                    <div style={{ display: 'flex' }}>
                        <img src={item.avatar_url} alt="" />
                        <span onClick={() => favoriteClick(item)}>
                            {isFavorite(item.id) ? <FaHeart /> : <CiHeart />}
                        </span>
                    </div>
                    <p>{item.login}</p>
                    <Button variant="primary"> <Link to={`/detail/${item.id}`} style={{ color: "black", textDecoration: "none" }} >Look at the details</Link></Button>{' '}

                </div>
            ))}
        </div>
    </>
    )
}

export default Users
