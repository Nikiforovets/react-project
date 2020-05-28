import React from 'react';
import './follow.css';

const Follow = ({ following, username = '' }) => {
    let followString, style;
    if (following) {
        followString = 'Unfollow';
        style = 'follow-button follow';
    } else {
        followString = 'Follow';
        style = 'follow-button unfollow';
    }
    return (
        <div className={style}>
            <span>+ {followString} {username}</span>
        </div>

    );
}

export default Follow;