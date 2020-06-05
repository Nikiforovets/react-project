import React from 'react';
import SwapService from '../../services/swap-service';
import './follow.css';

const Follow = ({ following, username = '' }) => {
    const swapService = new SwapService;

    let followString, style;
    if (following) {
        followString = 'Unfollow';
        style = 'follow-button follow';
    } else {
        followString = 'Follow';
        style = 'follow-button unfollow';
    }

    const followUser = () => {
        if (following) {
            swapService.deleteFollow(username);
        } else {
            swapService.postFollow(username);
        }
    }

    return (
        <div onClick={followUser} className={style}>
            <span>+ {followString} {username}</span>
        </div>
    );
}

export default Follow;