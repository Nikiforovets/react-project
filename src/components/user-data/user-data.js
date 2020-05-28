import React from 'react';
import './user-data.css';
const UserData = ({ image, username, date }) => {
    return (
        <div className='user-data'>
            <div className='link'>
                <img alt='' src={image} />
            </div>
            <div>
                <div className='link'>
                    <div>{username}</div>
                </div>
                <p>{date}</p>
            </div>
        </div>)
}

export default UserData;