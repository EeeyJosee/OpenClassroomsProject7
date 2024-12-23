import axios from "axios";
import React, { useState } from 'react';
import '../styles/NewPost.css';

function NewPost() {

    const submitForm = (e) => {
        // prevent the default submit and page reload
        e.preventDefault();
        const formData = new FormData();

        // don't know why this works but it does!!
        if (media == '') {
            formData.append('title', title);
            formData.append('message', message);
        }
        else {
            const payload = { message: message, title: title };
            formData.append('post', JSON.stringify(payload));
            formData.append('media', media);
        }

        if (title && message) {
            axios
                .post("http://localhost:3000/api/posts", formData, config)
                .then(
                    (response) => {
                        alert("New Post Created!");
                        window.location.reload();
                    }
                ).catch(
                    (error) => {
                        alert("Post was not created!");
                    });
        }
        else {
            alert('A required field is missing!');
        }
    };

    // authentication details for get request
    const auth = JSON.parse(localStorage.getItem('auth')).token;
    const config = {
        headers: { Authorization: `Bearer ${auth}`, 'content-type': 'multipart/form-data' }
    };

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [media, setSelectedMedia] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    return (

        <div className="createPostContainer">
            <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Close" : "Create Post"}
            </button>

            {isExpanded ?

                <div>
                    <form action="" id="newPost" method="post" onSubmit={submitForm}>
                        <h2> Create Post </h2>
                        <label htmlFor="title"> Title <span className="requiredField">*</span> </label>
                        <input
                            type="title"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="message"> Message <span className="requiredField">*</span> </label>
                        <textarea
                            type="message"
                            name="message"
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <label htmlFor="file"> File Upload </label>
                        <div className="fileSubmitContainer">
                            <input
                                type="file"
                                name="file"
                                id="file"
                                onChange={(e) => setSelectedMedia(e.target.files[0])}
                            />
                            <div className="item">
                                <input type="submit" id="submit" value="Submit" />
                            </div>
                        </div>
                    </form>
                </div>

                : null}

        </div>
    );
};

export default NewPost