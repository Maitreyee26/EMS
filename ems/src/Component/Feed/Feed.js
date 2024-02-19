import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Feed.css";
import { BiSolidLike } from "react-icons/bi";
import { useAuth } from "../AuthContext";
import { IoMdSend } from "react-icons/io";
// import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { RiMoreLine, RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [commentTexts, setCommentTexts] = useState({}); // State for comment texts for
  const [likesCount, setLikesCount] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const [postCreatorsInfo, setPostCreatorsInfo] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [editPostText, setEditPostText] = useState({}); // S
  const { empId } = useAuth();
  // const { username }=useAuth();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    console.log("EmpId in Feed:", empId);
  }, [empId]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://ems-backend-production-3f3d.up.railway.app/findAllPosts"
      );
      // const response = await fetch("https://localhost:8080/findAllPosts");
      const data = await response.json();
      setPosts(data.reverse()); // Reverse the order of posts
      console.log(data);
      const creatorsInfo = {};
      for (const post of data) {
        const creatorInfo = await fetchCreatorInfo(post.employeeEntity.empId);
        creatorsInfo[post.postId] = creatorInfo;
      }
      setPostCreatorsInfo(creatorsInfo);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    if (postText.trim() !== "") {
      const newPost = {
        id: uuidv4(),
        text: postText,
        likes: 0,
        comments: [],
        empId,
      };

      try {
        await fetch(
          "https://ems-backend-production-3f3d.up.railway.app/addPost",
          {
            method: "POST",
            body: JSON.stringify({
              employeeEntity: {
                empId: empId,
              },
              post: newPost.text,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        fetchPosts();
        setPostText("");
      } catch (error) {
        console.error("Error adding post:", error.message);
      }
    }
  };
  const handleUpdatePost = async (postId, newPostContent) => {
    try {
      await fetch(
        `https://ems-backend-production-3f3d.up.railway.app/updatePost/${postId}/${newPostContent}`,
        {
          method: "PUT",
        }
      );

      fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await fetch(
        `https://ems-backend-production-3f3d.up.railway.app/deletePost/${postId}`,
        {
          method: "DELETE",
        }
      );

      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleAddComment = async (postId, event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const commentText = commentTexts[postId]; // Get the comment text for the specific post

    if (commentText && commentText.trim() !== "") {
      try {
        await fetch(
          "https://ems-backend-production-3f3d.up.railway.app/addComment",
          {
            method: "POST",
            body: JSON.stringify({
              postEntity: {
                postId: postId,
              },
              comment: commentText,
              employeeEntity: {
                empId: empId,
              },
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        fetchPosts();
        setCommentTexts({ ...commentTexts, [postId]: "" }); // Clear the comment text for the specific post
      } catch (error) {
        console.error("Error adding comment:", error.message);
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      // Check if the post is already liked by the user
      const alreadyLiked = likedPosts.includes(postId);

      // If already liked, remove the like
      if (alreadyLiked) {
        // Perform the removal of like
        await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/removeLikeByEmpIdAndPostId/${empId}/${postId}`,
          {
            method: "DELETE",
          }
        );

        // Remove the post from the likedPosts state
        setLikedPosts(likedPosts.filter((id) => id !== postId));

        // Fetch the updated posts after removing the like
        fetchPosts();

        // Show alert for like removal
        alert("Like removed successfully");
      } else {
        // If not already liked, add the like
        const response = await fetch(
          "https://ems-backend-production-3f3d.up.railway.app/addLike",
          {
            method: "POST",
            body: JSON.stringify({
              postEntity: {
                postId: postId,
              },
              employeeEntity: {
                empId: empId,
              },
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add like");
        }

        // Add the post to likedPosts state
        setLikedPosts([...likedPosts, postId]);

        // Fetch the updated posts after adding the like
        fetchPosts();
      }
    } catch (error) {
      console.error("Error adding or removing like:", error.message);
    }
  };
  const fetchLikesForPost = async (postId) => {
    try {
      const response = await fetch(
        `https://ems-backend-production-3f3d.up.railway.app/findLikesByPostId/${postId}`
      );
      if (response.ok) {
        const likesData = await response.json();
        // console.log("lii",likesData);
        return likesData.length; // Assuming the API returns an array of likes
      } else {
        console.error(`Failed to fetch likes for post ${postId}`);
        return 0;
      }
    } catch (error) {
      console.error(`Error fetching likes for post ${postId}:`, error.message);
      return 0;
    }
  };
  const Comment = ({ postId, loggedInEmpId }) => {
    const [comments, setComments] = useState([]);
    const [renderedComments, setRenderedComments] = useState([]);

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/findCommentsByPostId/${postId}`
        );
        if (response.ok) {
          const commentsData = await response.json();
          setComments(commentsData);
        } else {
          console.error("Failed to fetch comments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    useEffect(() => {
      fetchComments();
    }, [postId]);

    useEffect(() => {
      const fetchProfilePictureAndName = async (empId) => {
        try {
          const response = await fetch(
            `https://ems-backend-production-3f3d.up.railway.app/findEmployeeById/${empId}`
          );
          if (response.ok) {
            const employeeData = await response.json();
            const profilePictureResponse = await fetch(
              `https://ems-backend-production-3f3d.up.railway.app/viewProfilePicture/${empId}`
            );
            if (profilePictureResponse.ok) {
              const imageBlob = await profilePictureResponse.blob();
              const profilePicture = URL.createObjectURL(imageBlob);
              return { profilePicture, employeeName: employeeData.emp_name };
            } else {
              console.error(
                `Failed to fetch profile picture for employee with ID ${empId}`
              );
              return null;
            }
          } else {
            console.error(`Failed to fetch employee with ID ${empId}`);
            return null;
          }
        } catch (error) {
          console.error(
            `Error fetching data for employee with ID ${empId}:`,
            error.message
          );
          return null;
        }
      };

      const renderComments = async () => {
        const rendered = await Promise.all(
          comments.map(async (comment) => {
            const { profilePicture, employeeName } =
              await fetchProfilePictureAndName(comment.employeeEntity.empId);
            console.log(comment.employeeEntity.empId);
            const handleDelete = async () => {
              if (
                window.confirm("Are you sure you want to delete this comment?")
              ) {
                await handleDeleteComment(comment.commentId);
              }
            };

            const handleUpdate = async (previousComment) => {
              const updatedComment = prompt(
                "Enter updated comment:",
                previousComment
              );
              if (updatedComment !== null) {
                await handleUpdateComment(comment.commentId, updatedComment);
              }
            };

            // Check if the logged-in user is the commenter
            const isCommenter = empId === comment.employeeEntity.empId;

            return (
              <li key={comment.commentId}>
                <div className="comment-container">
                  {profilePicture && (
                    <div>
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="commenter-profile-picture"
                      />
                    </div>
                  )}
                  <div className="comment-details">
                    <div className="comment-header">
                      <strong>{employeeName}</strong>
                      {isCommenter && (
                        <>
                          <div className="comment-buttons">
                            <button
                              className="comment-edit-button"
                              onClick={() => handleUpdate(comment.comment)}
                            >
                              <RiEdit2Line />
                            </button>{" "}
                            <button
                              className="comment-delete-button"
                              onClick={handleDelete}
                            >
                              {" "}
                              <RiDeleteBinLine />
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    <p className="comment-text"> {comment.comment}</p>
                    {/* Only show update and delete buttons if the logged-in user is the commenter */}
                  </div>
                </div>
              </li>
            );
          })
        );
        setRenderedComments(rendered);
      };

      renderComments();
    }, [comments]);

    const handleDeleteComment = async (commentId) => {
      try {
        await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/deleteComment/${commentId}`,
          {
            method: "DELETE",
          }
        );
        // After successful deletion, fetch the updated comments
        fetchComments();
      } catch (error) {
        console.error("Error deleting comment:", error.message);
      }
    };

    const handleUpdateComment = async (commentId, updatedComment) => {
      try {
        await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/updateComment/${commentId}/${updatedComment}`,
          {
            method: "PUT",
          }
        );
        // After successful update, fetch the updated comments
        fetchComments();
      } catch (error) {
        console.error("Error updating comment:", error.message);
      }
    };

    return (
      <div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {renderedComments}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    // Fetch likes count for each post
    const fetchLikesCounts = async () => {
      const counts = {};
      for (const post of posts) {
        const likesCount = await fetchLikesForPost(post.postId);
        counts[post.postId] = likesCount;
      }
      setLikesCount(counts);
    };
    fetchLikesCounts();
  }, [posts]);
  const fetchCreatorInfo = async (creatorId) => {
    try {
      const response = await fetch(
        `https://ems-backend-production-3f3d.up.railway.app/findEmployeeById/${creatorId}`
      );
      if (response.ok) {
        const creatorData = await response.json();
        const profilePictureResponse = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/viewProfilePicture/${creatorId}`
        );
        if (profilePictureResponse.ok) {
          const imageBlob = await profilePictureResponse.blob();
          const profilePicture = URL.createObjectURL(imageBlob);
          return { profilePicture, employeeName: creatorData.emp_name };
        } else {
          console.error(
            `Failed to fetch profile picture for employee with ID ${creatorId}`
          );
          return null;
        }
      } else {
        console.error(`Failed to fetch employee with ID ${creatorId}`);
        return null;
      }
    } catch (error) {
      console.error(
        `Error fetching data for employee with ID ${creatorId}:`,
        error.message
      );
      return null;
    }
  };

  return (
    <div className="feed-container">
      <h2 className="feed-container-header">Dashboard</h2>
      <div>
        <textarea
          type="text"
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          style={{
            fontSize: "16px", // Adjust font size
            border: "1px solid #ccc", // Add a border
            borderRadius: "5px", // Add border radius for rounded corners
            width: "600px", // Set the width to 50px
            overflow: "auto", // Add overflow property to show scrollbar
            marginRight: "120px", // Add some margin to separate from other elements
            height: "150px",
          }}
        />
        <button className="feed-post-button" onClick={handleAddPost}>
          Post
        </button>
      </div>

      {posts.map((post) => (
        <div key={post.postId} className="post-content">
          <div style={{ position: "relative" }}>
            {post.employeeEntity.empId === empId && (
              <div style={{ position: "absolute", top: 0, right: 0 }}>
                <button
                  className="feed-edit-button"
                  onClick={() => setEditMode(post.postId)}
                >
                  <RiEdit2Line />
                </button>
                <button
                  className="feed-delete-button"
                  onClick={() => handleDeletePost(post.postId)}
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            )}
          </div>
          {postCreatorsInfo[post.postId] && (
            <div className="postcreator-info">
              <img
                className="postcreator-profile-picture"
                src={postCreatorsInfo[post.postId].profilePicture}
                alt="Profile"
              />
              <p style={{ marginTop: "10px" }}>
                <strong>{postCreatorsInfo[post.postId].employeeName}</strong>
              </p>
            </div>
          )}

          {editMode === post.postId ? (
            <div className="edit-mode-post">
              <textarea
                value={
                  editPostText[post.postId] !== undefined
                    ? editPostText[post.postId]
                    : post.text
                }
                onChange={(e) =>
                  setEditPostText({
                    ...editPostText,
                    [post.postId]: e.target.value,
                  })
                }
              />
              <button
                onClick={() => {
                  handleUpdatePost(
                    post.postId,
                    editPostText[post.postId] || post.text
                  );
                  setEditMode(null); // Exit edit mode
                }}
                className="edit-mode-save"
              >
                Save
              </button>
            </div>
          ) : (
            <p>{post.post}</p>
          )}
          <button
            className={
              likedPosts.includes(post.postId)
                ? "like-button-main liked"
                : "like-button-main"
            }
            onClick={() => handleLike(post.postId)}
          >
            <BiSolidLike className="like-button" /> {likesCount[post.postId]}
          </button>
          <div className="comment-input-div">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentTexts[post.postId] || ""} // Use comment text for the specific post
              className="comment-input"
              onChange={(e) =>
                setCommentTexts({
                  ...commentTexts,
                  [post.postId]: e.target.value,
                })
              } // Update comment text for the specific post
            />
            <button
              className="send-button"
              onClick={(event) => handleAddComment(post.postId, event)}
            >
              <IoMdSend style={{ marginLeft: "5px", fontSize: "25px" }} />
            </button>
          </div>
          <Comment postId={post.postId} />

          <ul>
            {post.comments &&
              post.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Feed;

