import React, { useState, useEffect } from "react";
import ModalComments from "./ModalCommets";
import "./ListPosts.css"


export default function ListMesseges() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
   
    const [commentsActiv, setCommentsActiv] = useState("ModalComments")
    const [thisPostId, setThisPostId] = useState()
    const urlPosts = "https://jsonplaceholder.typicode.com/posts";
    const urlUsers = "https://jsonplaceholder.typicode.com/users";
    const urlComments = "https://jsonplaceholder.typicode.com/comments";

    async function getDataPosts() {

        const requestPosts = await fetch(urlPosts)
        const responsePosts = await requestPosts.json()
        setPosts(responsePosts)

        const requestUsers = await fetch(urlUsers)
        const responseUsers = await requestUsers.json()
        const modifiUsers=responseUsers.map(user=>{return{
           userId: user.id,
            name:user.name,
            userName:user.username,
            website:user.website
        }})
        setUsers(modifiUsers)

        const requestComments = await fetch(urlComments)
        const responseComments = await requestComments.json()
        setComments(responseComments)



    }

    useEffect(() => { getDataPosts() }, [])


    const usersPosts=posts.map(post => {
        const user=users.find(user => user.userId === post.userId);
        return {
            ...post,
            ...user,
            comments: comments.filter(comment => comment.postId === post.id)
        }
    });




    function openModalComments(e) {
        const id = e.target.parentElement.parentElement.value
        setCommentsActiv("ModalCommentsActiv")
        setThisPostId(id)
        
    }




    return (
        <div className="ListPosts">

            <ul className="wrapPost" >
                <ModalComments
                    commentsActiv={commentsActiv} setCommentsActiv={setCommentsActiv}
                    usersPosts={usersPosts} 
                    thisPostId={thisPostId}
                />
                {usersPosts.map((post, key) =>

                    <li key={post.id} value={post.id} className="Post">
                        <h2 className="Header">{post.title}</h2>
                        <p className="Massege">{post.body}</p>
                        <div className="wrapButton" >
                            <p className="postAutor">Autor: {post.name}</p><button onClick={e => openModalComments(e)} className="commentsButton">Comments: {post.comments.length} </button>
                        </div>
                    </li>
                )
                }
                  <ModalComments
                    commentsActiv={commentsActiv} setCommentsActiv={setCommentsActiv}
                    usersPosts={usersPosts} 
                    thisPostId={thisPostId}
                />
            </ul>

        </div>
    )
}