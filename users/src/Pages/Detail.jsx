import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Context from '../components/Context';
import Card from 'react-bootstrap/Card';
import Loading from '../components/Loading';
function Detail() {
    const { id } = useParams()

    const { token, loading, setLoading } = useContext(Context)
    const [userDetail, setUserDetail] = useState()
    console.log(id);
    async function getUserDetail() {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/user/${id}`, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        setLoading(false)
        setUserDetail(res.data)
    }
    useEffect(() => {
        getUserDetail()
    }, [])
    return (
        <div className='details'>
            {loading ? <Loading /> :
                <Card className='userBox' style={{ width: '18rem', backgroundColor: "azure" }}>
                    <Card.Img variant="top" src={userDetail?.avatar_url} />
                    <Card.Body>
                        <Card.Title>Name:{userDetail?.login}</Card.Title>
                        <Card.Text>
                            Followers:{userDetail?.followers}
                        </Card.Text>
                        <Card.Text>
                            Following:{userDetail?.following}
                        </Card.Text>

                    </Card.Body>
                </Card>
            }
        </div>
    )
}

export default Detail