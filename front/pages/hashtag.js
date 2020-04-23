import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostCard from '../components/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';

const Hashtag = ({ tag }) => {
    const { mainPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag
        });
    }, []);
    
    return (
        <>
        {
            mainPosts.map(p => {
                return <PostCard key={+p.createdAt} post={p} />;
            })
        }
        </>
    );
};

Hashtag.getInitialProps = async (context) => {
    console.log('hashtag getInitialProps', context.query.tag);
    return { tag: context.query.tag };
};

export default Hashtag;