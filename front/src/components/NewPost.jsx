import axios from "axios";
import React, { useState } from 'react';
import Banner from '../components/Banner';
import '../styles/NewPost.css';

function NewPost() {

    const submitForm = () => {
        // Prevent the default submit and page reload
        submitForm.preventDefault();
        const formData = new FormData();
        formData.append('post', { 'message': setMessage, 'title': setTitle });
        formData.append('media', setSelectedMedia);

        axios
            .post("http://localhost:3000/api/posts", formData)
            .then(
                (response) => {
                    alert("File Upload success");
                }
            ).catch(
                (error) => {
                    alert("File Upload Error");
                });
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
                 <label htmlFor="title"> Title <span>*</span> </label>
                 <input
                     type="title"
                     name="title"
                     id="title"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                 />
                 <label htmlFor="messgae"> Message <span>*</span> </label>
                 <textarea
                     type="message"
                     name="message"
                     id="message"
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                 />
                 <label htmlFor="file"> File Upload </label>
                 <div className="exp"><input
                     type="file"
                     name="file"
                     id="file"
                 value={media}
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