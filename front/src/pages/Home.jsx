import React from 'react';
import Banner from '../components/Banner';
import PostDashboard from '../components/PostDashboard';
import NewPost from '../components/NewPost';

function Home() {

    return (
        <>
            <Banner />
            <NewPost />
            <PostDashboard />
        </>
    );
}

export default Home;