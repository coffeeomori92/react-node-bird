import React from 'react';
import { Button, Icon, Card, Avatar } from 'antd';

const PostCard = ({ post }) => {
    return (
        <>
        <Card
            key={+post.createdAt}
            cover={post.img && <img src={post.img} alt="example" />}
            actions={[
                <Icon type="retweet" key="retweet" />,
                <Icon type="heart" key="heart" />,
                <Icon type="message" key="message" />,
                <Icon type="ellipsis" key="ellipsis" />
            ]}
            extra={<Button>팔로우</Button>}
        >
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={post.content}
            />
        </Card>
        </>
    );
};

export default PostCard;