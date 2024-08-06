import React, { useContext, useEffect } from 'react'
import Context from '../components/Context'
import { Link } from 'react-router-dom';
import '../components/users.css'
import Button from 'react-bootstrap/Button';

function Favorite() {
    const { favorite, setFavorite } = useContext(Context)
    console.log(favorite);
    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("user")) || [];
        setFavorite(localUser);
    }, [])
    return (
        <div>

            <div className='parentBox'>
                {favorite?.map(item => (
                    <div className='usersBox' key={item?.id} >
                        <div style={{ display: 'flex' }}>
                            <img src={item?.avatar_url} alt="" />
                        </div>
                        <p>{item?.login}</p>
                        <Button variant="primary" ><Link to={`/detail/${item.id}`}style={{color:"black",textDecoration:"none"}} >Look at the details</Link></Button>
                    </div>
                ))
                }
            </div>

        </div>
    )
}

export default Favorite