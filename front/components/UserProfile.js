import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar, Button } from 'antd';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
    const { me } = useSelector(state => state.user);
    
    const dispatch = useDispatch();

    const onClickLogout = useCallback(e => {
        dispatch(logoutRequestAction);
    }, []);

    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />{me.Posts.length}</div>,
                <div key="following">팔로잉<br />{me.Posts.length}</div>,
                <div key="follower">팔로워<br />{me.Posts.length}</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onClickLogout}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;