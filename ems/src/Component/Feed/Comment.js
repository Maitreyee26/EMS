
// import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const Comment = ({ comment, onComment }) => {
//   const [text, setText] = useState('');

//   const handleComment = () => {
//     if (text.trim() !== '') {
//       onComment(text);
//       setText('');
//     }
//   };

//   return (
//     <div className="comment">
//       {comment && comment.text && <p>{comment.text}</p>}
//       <input
//         type="text"
//         placeholder="Add a comment..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button onClick={handleComment}>Comment</button>
//     </div>
//   );
// };

// export default Comment;

import React, { useState, useEffect } from 'react';

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/findCommentsByPostId/${postId}`);
        if (response.ok) {
          const commentsData = await response.json();
          setComments(commentsData);
        } else {
          console.error('Failed to fetch comments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    fetchComments();
  }, [postId]); // Run the effect whenever postId changes

  return (
    <div>
      <h2>Comments for Post {postId}</h2> {/* Display the post ID */}
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
