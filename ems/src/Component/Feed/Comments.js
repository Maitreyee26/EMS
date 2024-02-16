import React, { useState, useEffect } from 'react';

const YourComponent = ({ postId }) => {
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

export default YourComponent;
