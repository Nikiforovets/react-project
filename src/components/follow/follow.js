import React, { useState } from 'react';
import SwapService from '../../services/swap-service';
import './follow.css';

const Follow = ({ following, username = '', history }) => {
    const swapService = new SwapService;

    let string, style;
    if (following) {
        string = 'Unfollow';
        style = 'follow-button follow';
    } else {
        string = 'Follow';
        style = 'follow-button unfollow';
    }

    const [followString, setFollowString] = useState(string);
    const [followStyle, setFollowStyle] = useState(style);

    const followUser = () => {
        if (localStorage.getItem('token')) {
            if (followString === 'Follow') {
                swapService.postFollow(username);
                setFollowString('Unfollow');
                setFollowStyle('follow-button follow')
            } else {
                swapService.deleteFollow(username);
                setFollowString('Follow');
                setFollowStyle('follow-button unfollow')
            }
        } else {
            history.push('/login');
        }
    }

    return (
        <div onClick={followUser} className={followStyle}>
            <span>+ {followString} {username}</span>
        </div>
    );
}

export default Follow;