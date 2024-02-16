// // import React, { useState } from "react";
// // import { v4 as uuidv4 } from "uuid";
// // import Post from "./Post";
// // import { IoMdPhotos } from "react-icons/io";
// // import "./Feed.css";

// // const Feed = () => {
// //   const [posts, setPosts] = useState([]);
// //   const [text, setText] = useState("");
// //   const [photo, setPhoto] = useState(null);
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const [userReactions, setUserReactions] = useState({});

// //   const handleComment = (postId, commentText, parentCommentId) => {
// //     setPosts((prevPosts) =>
// //       prevPosts.map((post) =>
// //         post.id === postId
// //           ? {
// //               ...post,
// //               comments: [
// //                 ...post.comments,
// //                 { id: uuidv4(), text: commentText, parentCommentId },
// //               ],
// //             }
// //           : post
// //       )
// //     );
// //   };

// //   const handleDoubleClick = (postId) => {
// //     setUserReactions((prevUserReactions) => {
// //       const newReactions = { ...prevUserReactions };
// //       newReactions[postId] = null;
// //       return newReactions;
// //     });
// //   };
// //   const handleLike = (postId) => {
// //     if (!userReactions[postId] || userReactions[postId] === "like") {
// //       setPosts((prevPosts) =>
// //         prevPosts.map((post) =>
// //           post.id === postId
// //             ? {
// //                 ...post,
// //                 likes:
// //                   userReactions[postId] === "like"
// //                     ? post.likes - 1
// //                     : post.likes + 1,
// //                 reactions: {}, // Clear reactions when user likes
// //               }
// //             : post
// //         )
// //       );
// //       setUserReactions((prevUserReactions) => ({
// //         ...prevUserReactions,
// //         [postId]: userReactions[postId] === "like" ? null : "like",
// //       }));
// //     }
// //   };

// //   const handleEdit = (postId, editedText) => {
// //     // Update the post content in your state or perform API call to update on the server
// //     setPosts((prevPosts) =>
// //       prevPosts.map((post) =>
// //         post.id === postId ? { ...post, text: editedText } : post
// //       )
// //     );
// //   };

// //   const handleDelete = (postId) => {
// //     // Implement logic to delete the post with postId
// //     setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
// //   };
// //   //   // Check if the user has already given a reaction for the post

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     setPhoto(file);
// //   };
// //   // const addPostFunction = async (post) => {
// //   //   const { text, photo } = post; // Destructure newPost to get text and photo

// //   //   if (text.trim() !== "" || photo) {
// //   //     const formData = new FormData();
// //   //     formData.append("text", text);
// //   //     formData.append("photo", photo);

// //   //     try {
// //   //       const response = await fetch("http://localhost:8080/addPost", {
// //   //         method: "POST",
// //   //         body: formData,
// //   //       });

// //   //       if (response.ok) {
// //   //         const result = await response.json();
// //   //         console.log(result); // Handle the response as needed
// //   //       } else {
// //   //         console.error("Error adding post:", response.statusText);
// //   //       }
// //   //     } catch (error) {
// //   //       console.error("Error adding post:", error.message);
// //   //     }
// //   //   }
// //   // };
// //   // async function fetchPosts() {
// //   //   try {
// //   //     const response = await fetch('http://localhost:8080//updatePost/{postId}/{postContent}'); // Adjust URL if needed
// //   //     const posts = await response.json();
// //   //     setPosts(posts);
// //   //   } catch (error) {
// //   //     console.error('Error fetching posts:', error);
// //   //   }
// //   // }
// //   const addPostFunction = async (post) => {
// //     const { text, photo } = post[0]; // Access the first element of the array

// //     if ((text && text.trim()) !== "" || photo) {
// //       const formData = new FormData();
// //       formData.append("text", text);

// //       // if (photo) {
// //       //   formData.append("photo", photo);
// //       // }

// //       try {
// //         const response = await fetch('http://localhost:8080/addPost', {
// //           method: 'POST',
// //           body: formData,
// //           headers: {
// //             // Explicitly set the Content-Type header for FormData
// //             // The boundary will be automatically generated
// //             'Content-Type': 'multipart/form-data',
// //           },
// //         });

// //         if (response.ok) {
// //           const result = await response.json();
// //           console.log('Post added successfully:', result);

// //           // Optionally fetch updated posts from API to reflect changes
// //           // fetchPosts();
// //         } else {
// //           console.error('Error adding post:', response.statusText);
// //         }
// //       } catch (error) {
// //         console.error('Error adding post:', error.message);
// //       }
// //     }
// //   };
// //   // const handleAddPost = async () => {
// //   //   if (text.trim() !== "" || photo) {
// //   //     // Create a new post object
// //   //     const newPost = { id: uuidv4(), text, photo, likes: 0, comments: [] };

// //   //     try {
// //   //       // Call addPostFunction with the new post object
// //   //       await addPostFunction(newPost);

// //   //       // Update the state to include the new post
// //   //       setPosts([...posts, newPost]);

// //   //       // Reset text, photo, and imagePreview
// //   //       setText("");
// //   //       setPhoto(null);
// //   //       setImagePreview(null);
// //   //     } catch (error) {
// //   //       console.error("Error adding post:", error.message);
// //   //     }
// //   //   }
// //   // };
// //   const handleAddPost = async () => {
// //     if ((text && text.trim()) || photo) {
// //       // Create a new post object
// //       const newPost = { id: uuidv4(), text, photo, likes: 0, comments: [] };

// //       try {
// //         // Call addPostFunction with an array containing the new post object
// //         await addPostFunction([newPost]);

// //         // Update the state to include the new post
// //         setPosts([...posts, newPost]);

// //         // Reset text, photo, and imagePreview
// //         setText("");
// //         setPhoto(null);
// //         setImagePreview(null);
// //       } catch (error) {
// //         console.error("Error adding post:", error.message);
// //       }
// //     }
// //   };
// //   const handleImageChange = (e) => {
// //     const selectedImage = e.target.files[0];

// //     // Check if the image has the required dimensions (450x350 pixels)
// //     if (selectedImage) {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         const img = new Image();
// //         img.src = reader.result;

// //         img.onload = () => {
// //           if (img.width === 450 && img.height === 350) {
// //             setPhoto(selectedImage);
// //             setImagePreview(reader.result);
// //           } else {
// //             // Resize the image to 450x350 pixels
// //             const canvas = document.createElement("canvas");
// //             const ctx = canvas.getContext("2d");
// //             canvas.width = 450;
// //             canvas.height = 350;
// //             ctx.drawImage(img, 0, 0, 450, 350);

// //             // Convert the resized image to a data URL
// //             const resizedDataURL = canvas.toDataURL("image/jpeg");

// //             setPhoto(dataURLtoFile(resizedDataURL, selectedImage.name));
// //             setImagePreview(resizedDataURL);
// //           }
// //         };
// //       };
// //       reader.readAsDataURL(selectedImage);
// //     }
// //   };

// //   // Function to convert a data URL to a File object
// //   const dataURLtoFile = (dataURL, fileName) => {
// //     const arr = dataURL.split(",");
// //     const mime = arr[0].match(/:(.*?);/)[1];
// //     const bstr = atob(arr[1]);
// //     let n = bstr.length;
// //     const u8arr = new Uint8Array(n);

// //     while (n--) {
// //       u8arr[n] = bstr.charCodeAt(n);
// //     }

// //     return new File([u8arr], fileName, { type: mime });
// //   };

// //   return (
// //     <div className="feed-container">
// //       <h2 className="feed-container-header">Feed</h2>
// //       <div>
// //         <textarea
// //           type="text"
// //           placeholder="What's on your mind?"
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //           style={{
// //             fontSize: "16px", // Adjust font size
// //             border: "1px solid #ccc", // Add a border
// //             borderRadius: "5px", // Add border radius for rounded corners
// //             width: "600px", // Set the width to 50px
// //             overflow: "auto", // Add overflow property to show scrollbar
// //             marginRight: "120px", // Add some margin to separate from other elements
// //             height: "150px",
// //           }}
// //         />
// //         <div className="feed-post">
// //           <label htmlFor="file-upload" className="file-upload-label">
// //             <IoMdPhotos
// //               style={{
// //                 color: "rgb(67, 255, 4)",
// //                 marginRight: "5px",
// //                 fontSize: "20px",
// //               }}
// //             />
// //             Photos
// //           </label>
// //           <input
// //             id="file-upload"
// //             type="file"
// //             accept="image/*"
// //             style={{ display: "none" }}
// //             onChange={handleImageChange}
// //           />
// //           {/* Display image preview */}
// //           {imagePreview && (
// //             <div>
// //               <img
// //                 src={imagePreview}
// //                 alt="Selected"
// //                 className="image-preview"
// //               />
// //             </div>
// //           )}
// //           {/* <button className="feed-post-button" onClick={handlePost}>
// //             Post
// //           </button> */}
// //              <button className="feed-post-button" onClick={handleAddPost}>
// //             Post
// //           </button>
// //         </div>

// //       </div>

// //         {posts
// //   .slice()
// //   .reverse()
// //   .map((post) => (
// //     <Post
// //       key={post.id}
// //       post={post}
// //       onLike={() => handleLike(post.id)}
// //       onDoubleClick={() => handleDoubleClick(post.id)}
// //       onComment={handleComment}
// //       onDelete={() => handleDelete(post.id)}
// //       onEdit={handleEdit}
// //       addPost={addPostFunction}
// //     />
// //   ))}

// //     </div>
// //   );
// // };

// // export default Feed;
// import React, { useState, useEffect, createContext, useContext } from "react";
// import { v4 as uuidv4 } from "uuid";
// import "./Feed.css";
// import { BiSolidLike } from "react-icons/bi";
// import { useAuth } from "../AuthContext";
// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   const [text, setText] = useState("");
//   const { empId } = useAuth();
//   useEffect(() => {
//     console.log("EmpId in Feed:", empId);
//   }, [empId]);

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/findAllPosts");
//       const data = await response.json();

//       // Set the fetched posts in the state
//       setPosts(data);
//       console.log(data);
//     } catch (error) {
//       console.error("Error fetching posts:", error.message);
//     }
//   };
//   // console.log(empid);
//   useEffect(() => {
//     // Fetch all posts when the component mounts
//     fetchPosts();
//   }, []); // Empty dependency array to run the effect only once when the component mounts

//   const handleAddPost = async () => {
//     if (text.trim() !== "") {
//       const newPost = { id: uuidv4(), text, likes: 0, comments: [], empId };
//       console.log(newPost);

//       try {
//         // Add a new post
//         await fetch("http://localhost:8080/addPost", {
//           method: "POST",
//           body: JSON.stringify({
//             // post_id:newPost.id,
//             employeeEntity: {
//               empId: empId,
//             },
//             post: newPost.text,
//           }), // Send the entire newPost object
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         // Fetch updated posts after adding a new post
//         fetchPosts();

//         // Reset text input
//         setText("");
//       } catch (error) {
//         console.error("Error adding post:", error.message);
//       }
//     }
//   };

//   // const handleLike = async (postid) => {
//   //   try {
//   //     // Add a like to the post
//   //     await fetch("http://localhost:8080/addLike", {
//   //       method: "POST",
//   //       body: JSON.stringify({
//   //         postEntity:{
//   //         postId: postid,
//   //       },
//   //       employeeEntity:{
//   //         empId:empId
//   //       }, }),
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //     });

//   //     // Fetch updated posts after adding a like
//   //     fetchPosts();
//   //   } catch (error) {
//   //     console.error("Error adding like:", error.message);
//   //   }
//   // };
//   const handleAddComment = async (postid, comment) => {
//     try {
//       // Add a comment to the post
//       await fetch("http://localhost:8080/addComment", {
//         method: "POST",
//         body: JSON.stringify({
//           postEntity: {
//             postId: postid,
//           },
//           comment: comment,
//           employeeEntity: {
//             empId: empId,
//           },
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       console.log(postid);
//       // Fetch updated posts after adding a comment
//       fetchPosts();
//     } catch (error) {
//       console.error("Error adding comment:", error.message);
//     }
//   };
//   const handleLike = async (postid) => {
//     try {
//       // Add a like to the post
//       await fetch("http://localhost:8080/addLike", {
//         method: "POST",
//         body: JSON.stringify({
//           postEntity: {
//             postId: postid,
//           },
//           employeeEntity: {
//             empId: empId,
//           },
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       // Fetch updated posts after adding a like
//       fetchPosts();
//     } catch (error) {
//       console.error("Error adding like:", error.message);
//     }
//   };
//   return (
//     <div className="feed-container">
//       <h2 className="feed-container-header">Feed</h2>
//       <div>
//         <textarea
//           type="text"
//           placeholder="What's on your mind?"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <button className="feed-post-button" onClick={handleAddPost}>
//           Post
//         </button>
//       </div>

//       {posts.map((post) => (
//         <div key={post.postId} className="feed-post">
//           <p>{post.post}</p>
//           <button onClick={() => handleLike(post.postId)}>

//             <BiSolidLike className="like-button" /> ({post.likes})
//           </button>
//           <div>
//             <input
//               type="text"
//               placeholder="Add a comment..."
//               onChange={(e) => setText(e.target.value)}
//             />
//             <button onClick={() => handleAddComment(post.postId, text)}>
//               Add Comment
//             </button>
//           </div>
//           <ul>
//             {post.comments &&
//               post.comments.map((comment, index) => (
//                 <li key={index}>{comment}</li>
//               ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Feed;
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

  const { empId } = useAuth();
  // const { username }=useAuth();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    console.log("EmpId in Feed:", empId);
  }, [empId]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/findAllPosts");
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
        await fetch("http://localhost:8080/addPost", {
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
        });

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
        `http://localhost:8080/updatePost/${postId}/${newPostContent}`,
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
      await fetch(`http://localhost:8080/deletePost/${postId}`, {
        method: "DELETE",
      });

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
        await fetch("http://localhost:8080/addComment", {
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
        });

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
        await fetch(`http://localhost:8080/removeLikeByEmpIdAndPostId/${empId}/${postId}`, {
          method: "DELETE",
        });
  
        // Remove the post from the likedPosts state
        setLikedPosts(likedPosts.filter((id) => id !== postId));
  
        // Fetch the updated posts after removing the like
        fetchPosts();
  
        // Show alert for like removal
        alert("Like removed successfully");
      } else {
        // If not already liked, add the like
        const response = await fetch("http://localhost:8080/addLike", {
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
        });
  
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
        `http://localhost:8080/findLikesByPostId/${postId}`
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

  // const Comment = ({ postId }) => {
  //   const [comments, setComments] = useState([]);
  //   const [renderedComments, setRenderedComments] = useState([]);

  //   useEffect(() => {
  //     const fetchComments = async () => {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:8080/findCommentsByPostId/${postId}`
  //         );
  //         if (response.ok) {
  //           const commentsData = await response.json();
  //           setComments(commentsData);
  //         } else {
  //           console.error("Failed to fetch comments:", response.statusText);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching comments:", error.message);
  //       }
  //     };

  //     fetchComments();
  //   }, [postId]);

  //   useEffect(() => {
  //     const fetchProfilePictureAndName = async (empId) => {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:8080/findEmployeeById/${empId}`
  //         );
  //         if (response.ok) {
  //           const employeeData = await response.json();
  //           const profilePictureResponse = await fetch(
  //             `http://localhost:8080/viewProfilePicture/${empId}`
  //           );
  //           if (profilePictureResponse.ok) {
  //             const imageBlob = await profilePictureResponse.blob();
  //             const profilePicture = URL.createObjectURL(imageBlob);
  //             return { profilePicture, employeeName: employeeData.emp_name };
  //           } else {
  //             console.error(
  //               `Failed to fetch profile picture for employee with ID ${empId}`
  //             );
  //             return null;
  //           }
  //         } else {
  //           console.error(`Failed to fetch employee with ID ${empId}`);
  //           return null;
  //         }
  //       } catch (error) {
  //         console.error(
  //           `Error fetching data for employee with ID ${empId}:`,
  //           error.message
  //         );
  //         return null;
  //       }
  //     };

  //     const renderComments = async () => {
  //       const rendered = await Promise.all(
  //         comments.map(async (comment) => {
  //           const { profilePicture, employeeName } =
  //             await fetchProfilePictureAndName(comment.employeeEntity.empId);

  //           return (
  //             <li key={comment.commentId}>
  //               <div className="comment-container">
  //                 {profilePicture && (
  //                   <div>
  //                     <img
  //                       src={profilePicture}
  //                       alt="Profile"
  //                       className="commenter-profile-picture"
  //                     />
  //                   </div>
  //                 )}
  //                 <div className="comment-details">
  //                   <strong>{employeeName}</strong>
  //                   <p className="comment-text"> {comment.comment}</p>
  //                 </div>
  //               </div>
  //             </li>
  //           );
  //         })
  //       );
  //       setRenderedComments(rendered);
  //     };

  //     renderComments();
  //   }, [comments]);

  //   return (
  //     <div>
  //       <ul style={{ listStyleType: "none", padding: 0 }}>
  //         {renderedComments}
  //       </ul>
  //     </div>
  //   );
  // };


//chatgpt




const Comment = ({ postId, loggedInEmpId }) => {
  const [comments, setComments] = useState([]);
  const [renderedComments, setRenderedComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/findCommentsByPostId/${postId}`
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
          `http://localhost:8080/findEmployeeById/${empId}`
        );
        if (response.ok) {
          const employeeData = await response.json();
          const profilePictureResponse = await fetch(
            `http://localhost:8080/viewProfilePicture/${empId}`
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
            console.log(comment.employeeEntity.empId)
          const handleDelete = async () => {
            if (window.confirm("Are you sure you want to delete this comment?")) {
              await handleDeleteComment(comment.commentId);
            }
          };

          const handleUpdate = async () => {
            const updatedComment = prompt("Enter updated comment:");
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
                    <button className="comment-edit-button"onClick={handleUpdate}>  <RiEdit2Line /></button>
                      <button className="comment-delete-button"onClick={handleDelete}> <RiDeleteBinLine /></button>
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
      await fetch(`http://localhost:8080/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      // After successful deletion, fetch the updated comments
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  const handleUpdateComment = async (commentId, updatedComment) => {
    try {
      await fetch(`http://localhost:8080/updateComment/${commentId}/${updatedComment}`, {
        method: "PUT",
      });
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


// const Comment = ({ postId, empId, post}) => {
//   const [comments, setComments] = useState([]);
//   const [renderedComments, setRenderedComments] = useState([]);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/findCommentsByPostId/${postId}`
//       );
//       if (response.ok) {
//         const commentsData = await response.json();
//         setComments(commentsData);
//       } else {
//         console.error("Failed to fetch comments:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching comments:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [postId]);
//   const fetchPostsByEmployeeId = async () => {
//     try {
//         const response = await fetch(`http://localhost:8080/findPostByEmployeeId/${empId}`);
//         if (response.ok) {
//             const postsData = await response.json();
//             // Process the fetched posts as needed
//             console.log("Posts fetched by employee ID:", postsData);
//         } else {
//             console.error("Failed to fetch posts by employee ID:", response.statusText);
//         }
//     } catch (error) {
//         console.error("Error fetching posts by employee ID:", error.message);
//     }
// };

// useEffect(() => {
//     fetchComments();
//     fetchPostsByEmployeeId(); // Call the function to fetch posts by employee ID
// }, [postId, empId]);

//   useEffect(() => {
//     const fetchProfilePictureAndName = async (empId) => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/findEmployeeById/${empId}`
//         );
//         if (response.ok) {
//           const employeeData = await response.json();
//           const profilePictureResponse = await fetch(
//             `http://localhost:8080/viewProfilePicture/${empId}`
//           );
//           if (profilePictureResponse.ok) {
//             const imageBlob = await profilePictureResponse.blob();
//             const profilePicture = URL.createObjectURL(imageBlob);
//             return { profilePicture, employeeName: employeeData.emp_name };
//           } else {
//             console.error(
//               `Failed to fetch profile picture for employee with ID ${empId}`
//             );
//             return null;
//           }
//         } else {
//           console.error(`Failed to fetch employee with ID ${empId}`);
//           return null;
//         }
//       } catch (error) {
//         console.error(
//           `Error fetching data for employee with ID ${empId}:`,
//           error.message
//         );
//         return null;
//       }
//     };

//     const renderComments = async () => {
//       const rendered = await Promise.all(
//         comments.map(async (comment) => {
//           const { profilePicture, employeeName } =
//             await fetchProfilePictureAndName(comment.employeeEntity.empId);

//           const handleDelete = async () => {
//             if (window.confirm("Are you sure you want to delete this comment?")) {
//               await handleDeleteComment(comment.commentId);
//             }
//           };

//           const handleUpdate = async () => {
//             const updatedComment = prompt("Enter updated comment:");
//             if (updatedComment !== null) {
//               await handleUpdateComment(comment.commentId, updatedComment);
//             }
//           };

//           // Check if the logged-in user is the commenter or the post creator
//           const isCommenterOrCreator = empId === comment.employeeEntity.empId;
//           const isPostCreator = empId === post.employeeEntity.empId;
//           return (
//             <li key={comment.commentId}>
//               <div className="comment-container">
//                 {profilePicture && (
//                   <div>
//                     <img
//                       src={profilePicture}
//                       alt="Profile"
//                       className="commenter-profile-picture"
//                     />
//                   </div>
//                 )}
//                 <div className="comment-details">
//                   <strong>{employeeName}</strong>
//                   <p className="comment-text"> {comment.comment}</p>
//                   {/* Only show update and delete buttons if the logged-in user is the commenter or the post creator */}
//                   {isCommenterOrCreator && (
//                     <>
//                       <button onClick={handleUpdate}>Update</button>
//                       <button onClick={handleDelete}>Delete</button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </li>
//           );
//         })
//       );
//       setRenderedComments(rendered);
//     };

//     renderComments();
//   }, [comments]);

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await fetch(`http://localhost:8080/deleteComment/${commentId}`, {
//         method: "DELETE",
//       });
//       // After successful deletion, fetch the updated comments
//       fetchComments();
//     } catch (error) {
//       console.error("Error deleting comment:", error.message);
//     }
//   };

//   const handleUpdateComment = async (commentId, updatedComment) => {
//     try {
//       await fetch(`http://localhost:8080/updateComment/${commentId}/${updatedComment}`, {
//         method: "PUT",
//       });
//       // After successful update, fetch the updated comments
//       fetchComments();
//     } catch (error) {
//       console.error("Error updating comment:", error.message);
//     }
//   };

//   return (
//     <div>
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {renderedComments}
//       </ul>
//     </div>
//   );
// };







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
        `http://localhost:8080/findEmployeeById/${creatorId}`
      );
      if (response.ok) {
        const creatorData = await response.json();
        const profilePictureResponse = await fetch(
          `http://localhost:8080/viewProfilePicture/${creatorId}`
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

      {/* {posts.map((post) => (
        <div key={post.postId} className="post-content">
            <p>{post.post}</p>
          {post.employeeEntity.empId===empId && (
              
            <>
              <button onClick={() => handleUpdatePost(post.postId, prompt("Enter new post content:"))}>
  <RiEdit2Line /> 
</button>
<button onClick={() => handleDeletePost(post.postId)}>
  <RiDeleteBinLine /> 
</button>

</>
          )} */}

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
              <p style={{"marginTop":"10px"}}><strong>{postCreatorsInfo[post.postId].employeeName}</strong></p>
            </div>
          )}
          {/* <p>{post.post}</p> */}

          {editMode === post.postId ? (
          <div className="edit-mode-post">
            <textarea
              value={postText[post.postId] !== undefined ? postText[post.postId] : post.text}
              onChange={(e) =>
                setPostText({
                  ...postText,
                  [post.postId]: e.target.value,
                })
              }
            />
            <button
              onClick={() => {
                handleUpdatePost(post.postId, postText[post.postId] || post.text);
                setEditMode(null); // Exit edit mode
              }}
              className="edit-mode-save"
            >
              Save
            </button>
          </div>
        ): (
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
