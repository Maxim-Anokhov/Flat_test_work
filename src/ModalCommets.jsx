import React from "react";
import "./ModalComments.css";


export default function ModalComments({commentsActiv, setCommentsActiv, usersPosts, thisPostId}){

  const className=commentsActiv;
  if(commentsActiv==="ModalCommentsActiv") {
    
    const post=usersPosts.find(post=>post.id === thisPostId)
    
    const comments=post.comments
    
  
  return(
    <div className={className}>
           
           
             <div className="Modal">
             <button className="clousdeButton" onClick={()=>{setCommentsActiv("ModalComments")}}>x</button>
            <h2 className="postHeader">{post.title}</h2>
            <div className="PostModal">
            
            <p >{post.body}</p>
            <p>Autor:{post.name}</p>

            </div>
            {comments.map(comment=>

            <li className="Comment" key={comment.id}>
              <p>{comment.body}</p> 
              <p>Autor:{comment.email}</p>
            </li>

          )} 
            </div>
        </div>
    )
    
  }
 
} 