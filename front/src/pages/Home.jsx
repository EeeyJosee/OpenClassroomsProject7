import axios from "axios";
import React, { useEffect } from 'react';
import Banner from '../components/Banner';
import PostDashboard from '../components/PostDashboard';

function Home() {

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/posts', config)
            .then(
                response => {
                    // console.log(response.data)
                }
            ).catch(
                (error) => {
                    console.log(error.response.data)
                    setErrorMessage(`❌ ${error.response.data.error}`);
                }
            );
        // empty dependency array means this effect runs once
    }, []);

    // authentication details for get request
    const auth = JSON.parse(localStorage.getItem('auth')).token;
    const config = {
        headers: { Authorization: `Bearer ${auth}` }
    };
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
        <>
            <Banner />
            <PostDashboard />

        </>
    );
}

export default Home;