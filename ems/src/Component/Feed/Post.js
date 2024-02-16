// import React, { useState } from 'react';
// import { FaThumbsUp } from 'react-icons/fa';
// import Comment from './Comment';
// import { v4 as uuidv4 } from 'uuid';
// const Post = ({ post }) => {
//   const [likes, setLikes] = useState(0);
//   const [comments, setComments] = useState([]);

//   const handleLike = () => {
//     setLikes(likes + 1);
//   };

//   const handleComment = (text) => {
//     setComments([...comments, { id: uuidv4(), text }]);
//   };

//   return (
//     <div className="post">
//       <p>{post.text}</p>
//       <button onClick={handleLike}>
//         <FaThumbsUp /> {likes}
//       </button>
//       <Comment onComment={handleComment} />
//       {comments.map((comment) => (
//         <Comment key={comment.id} comment={comment} />
//       ))}
//     </div>
//   );
// };
// export default Post;
// Post.js
// import React, { useState } from 'react';

// const Post = ({ post, onComment }) => {
//   const [commentText, setCommentText] = useState('');

//   const handleComment = () => {
//     if (commentText.trim() !== '') {
//       onComment(post.id, commentText);
//       setCommentText('');
//     }
//   };

//   return (
//     <div className="post-container">
//       <p>{post.text}</p>
//       <div>
//         <input
//           type="text"
//           placeholder="Add a comment..."
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//         />
//         <button onClick={handleComment}>Comment</button>
//       </div>
//     </div>
//   );
// };

// export default Post;
// Post.js
// import React, { useState } from 'react';
// import './Post.css';

// const Post = ({ post, onLike, onComment }) => {
//   const [commentText, setCommentText] = useState('');

//   const handleLike = () => {
//     onLike(post.id);
//   };

//   const handleComment = () => {
//     if (commentText.trim() !== '') {
//       onComment(post.id, commentText);
//       setCommentText('');
//     }
//   };

//   return (
//     <div className="post-container">
//       <p>{post.text}</p>
//       <div className="post-actions">
//         <button onClick={handleLike}>Like ({post.likes})</button>
//         <input
//           type="text"
//           placeholder="Add a comment..."
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//         />
//         <button onClick={handleComment}>Comment</button>
//       </div>
//       <ul className="comments-list">
//         {post.comments.map((comment) => (
//           <li key={comment.id}>{comment.text}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Post;
// Post.js
// Post.js
// import React, { useState } from "react";
// import { BiSolidLike } from "react-icons/bi";
// import { FaHeart, FaLaugh } from "react-icons/fa";
// import { IoMdSend } from "react-icons/io";
// import { FcLike } from "react-icons/fc";
// import { MdDelete } from "react-icons/md";
// import "./Post.css";
// const Post = ({ post, onLike, onComment, onReact, onDelete}) => {
//   const [commentText, setCommentText] = useState("");
//   const [selectedReaction, setSelectedReaction] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleComment = () => {
//     if (commentText.trim() !== "") {
//       onComment(post.id, commentText, null);
//       setCommentText("");
//     }
//   };

// const handleReact = (reaction) => {
//   const newReaction = selectedReaction === reaction ? null : reaction;
//   setSelectedReaction(newReaction);

//   const currentReactions = post.reactions || {};
//   const updatedReactions = {};

//   // Clear the previous reaction
//   for (const existingReaction in currentReactions) {
//     if (existingReaction !== reaction) {
//       updatedReactions[existingReaction] = 0;
//     }
//   }

//   // Set the new reaction count
//   updatedReactions[reaction] = newReaction ? 1 : 0;

//   onReact(post.id, newReaction, updatedReactions);
// };

// const handleReact = (reaction) => {
//   const newReaction = selectedReaction === reaction ? null : reaction;
//   setSelectedReaction(newReaction);

//   const currentReactions = post.reactions || {};
//   const updatedReactions = {};

//   // Clear the previous reaction
//   for (const existingReaction in currentReactions) {
//     updatedReactions[existingReaction] = 0;
//   }

//   // Set the new reaction count
//   updatedReactions[reaction] = newReaction ? 1 : 0;

//   onReact(post.id, newReaction, updatedReactions);
// };

//   const handleReact = (reaction) => {
//     const newReaction = selectedReaction === reaction ? null : reaction;
//     setSelectedReaction(newReaction);

//     const currentReactions = post.reactions || {};
//     const updatedReactions = {
//       ...currentReactions,
//       [reaction]: (currentReactions[reaction] || 0) + (newReaction ? 1 : -1),
//     };

//     onReact(post.id, newReaction, updatedReactions);
//   };

//   const handleDoubleClick = (event) => {
//     // Check if it's a double click
//     if (event.detail === 2) {
//       // Reverse the reaction
//       handleReact(selectedReaction);
//     }
//   };

//   const handleDelete = () => {
//     // Call onDelete with the post ID to delete the post
//     onDelete(post.id);
//   };

//   return (
//     <div className="post">
//       <p className="post-content">{post.text}</p>
//       {/* Display photo if available */}
//       {post.photo && <div className="post-image"><img src={URL.createObjectURL(post.photo)} alt="Post" /></div>}
//       {/* Delete button (visible only to the post owner) */}
//       {true && (
//         <button onClick={handleDelete} className="delete-button">
//           <MdDelete />
//         </button>
//       )}
//       <button onClick={() => onReact(post.id)}
//       // onDoubleClick={handleDoubleClick}
//       >
//         <BiSolidLike /> {post.likes}
//       </button>

//     <button
//         className={selectedReaction === 'heart' ? 'active-reaction heart' : ''}
//         onClick={() => handleReact('heart')}
//         onDoubleClick={handleDoubleClick}
//       >
//         <FcLike />
//         {post.reactions && post.reactions['heart'] ? post.reactions['heart'] : 0}
//       </button>
//       <button
//         className={selectedReaction === 'laugh' ? 'active-reaction haha' : 'haha'}
//         onClick={() => handleReact('laugh')}
//         onDoubleClick={handleDoubleClick}
//       >
//         <FaLaugh />
//         {post.reactions && post.reactions['laugh'] ? post.reactions['laugh'] : 0}
//       </button>

//       <div className="comments">
//         {post.comments.map((comment) => (
//           <div key={comment.id}>
//             <p>{comment.text}</p>
//           </div>
//         ))}
//       </div>

//       {/* Comment input and button */}
//       <div className="comment-input-button">
//         <input
//           type="text"
//           placeholder=" Add a comment..."
//           value={commentText}
//           className="comment-input"
//           onChange={(e) => setCommentText(e.target.value)}
//         />
//         <button className="send-button"onClick={handleComment}><IoMdSend style={{marginLeft:"5px",fontSize:"25px"}}/></button>
//       </div>
//     </div>
//   );

// };

// export default Post;

// <div className="post">
//     <p>{post.text}</p>

//     {/* Display photo if available */}
//     {post.photo && <img src={post.photo} alt="Post" />}

//     <button onClick={() => onLike(post.id)}>
//       <BiSolidLike /> {post.likes}
//     </button>

//     {/* Reaction buttons with icons */}
//     <button onClick={() => handleReact("heart")}>
//       <FaHeart />{" "}
//       {post.reactions && post.reactions["heart"]
//         ? post.reactions["heart"]
//         : 0}
//     </button>
//     <button onClick={() => handleReact("laugh")}>
//       <FaLaugh />{" "}
//       {post.reactions && post.reactions["laugh"]
//         ? post.reactions["laugh"]
//         : 0}
//     </button>

//     <div className="comments">
//       {post.comments.map((comment) => (
//         <div key={comment.id}>
//           <p>{comment.text}</p>
//         </div>
//       ))}
//     </div>

//     {/* Comment input and button */}
//     <div>
//       <input
//         type="text"
//         placeholder="Add a comment..."
//         value={commentText}
//         onChange={(e) => setCommentText(e.target.value)}
//       />

//       {/* File input for photos */}
//       <input type="file" accept="image/*" onChange={handleFileChange} />

//       <button onClick={handleComment}>Comment</button>

//       {/* Button to post with text and photo */}
//       <button onClick={handlePost}>Post</button>
//     </div>
//   </div>
// );

// const handleFileChange = (e) => {
//   const file = e.target.files[0];
//   setSelectedFile(file);
// };

// const handlePost = () => {
//   // Check if there's either text or a photo to post
//   if (commentText.trim() === "" && !selectedFile) {
//     return;
//   }

//   // You may need to handle the photo upload here
//   // For simplicity, you can pass the file to the onPost callback
//   onPost(post.id, commentText, selectedFile);

//   // Reset the input fields
//   setCommentText("");
//   setSelectedFile(null);
// };

import React, { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Post.css";

const Post = ({
  post,
  onLike,
  onComment,
  onReact,
  onDelete,
  onEdit,
  onDeleteComment,
  onEditComment,
  currentUser,
  addPost,
  commentOwner
}) => {
  const [commentText, setCommentText] = useState("");
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);
  currentUser=true;
  commentOwner=true;
  const canDeleteComment = (commentOwner) =>
    currentUser && (currentUser === commentOwner || currentUser === post.owner);

  const canEditComment = (commentOwner) =>
    currentUser && currentUser === commentOwner;

  const handleComment = () => {
    if (commentText.trim() !== "") {
      onComment(post.id, commentText, null);
      setCommentText("");
    }
  };

  const handleReact = (reaction) => {
    const newReaction = selectedReaction === reaction ? null : reaction;
    setSelectedReaction(newReaction);

    const currentReactions = post.reactions || {};
    const updatedReactions = {
      ...currentReactions,
      [reaction]: (currentReactions[reaction] || 0) + (newReaction ? 1 : -1),
    };

    onReact(post.id, newReaction, updatedReactions);
  };

 
  const handleAddPost = () => {
  // You can use the addPost function here
  addPost({ text:"", photo: null, likes: 0, comments: [] });
};
  const handleDelete = () => {
    onDelete(post.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(post.id, editedText);
    setIsEditing(false);
  };

  const handleDeleteComment = (commentId) => {
    onDeleteComment(commentId);
  };

  const handleEditComment = (commentId) => {
    onEditComment(commentId);
  };

  return (
    <div
      className="post"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="edit-textarea"
        />
      ) : (
        <p className="post-content">{post.text}</p>
      )}

      {post.photo && (
        <div className="post-image">
          <img src={URL.createObjectURL(post.photo)} alt="Post" />
        </div>
      )}

      <button onClick={() => onLike(post.id)}>
        <BiSolidLike className="like-button" /> {post.likes}
      </button>

      <div className="post-actions">
        {currentUser && (currentUser === post.owner || !post.owner) && (
          <>
            <button onClick={handleDelete} className="feed-delete-button">
              <MdDelete />
            </button>
            <button
              onClick={isEditing ? handleSaveEdit : handleEdit}
              className="feed-edit-button"
            >
              {isEditing ? "Save" : <MdEdit />}
            </button>
          </>
        )}
      </div>

      <div className="comments">
        {post.comments.map((comment) => (
          <div key={comment.id}>
            {canDeleteComment(comment.owner) && (
              <button onClick={() => handleDeleteComment(comment.id)}>
                Delete Comment
              </button>
            )}
            {canEditComment(comment.owner) && (
              <button onClick={() => handleEditComment(comment.id)}>
                Edit Comment
              </button>
            )}
            <p>{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="comment-input-button">
        <input
          type="text"
          placeholder=" Add a comment..."
          value={commentText}
          className="comment-input"
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="send-button" onClick={handleComment}>
          <IoMdSend style={{ marginLeft: "5px", fontSize: "25px" }} />
        </button>
      </div>
    </div>
  );
};

export default Post;