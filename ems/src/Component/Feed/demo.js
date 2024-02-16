const handleLike = (postId) => {
    if (!userReactions[postId] || userReactions[postId] === "like") {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes:
                  userReactions[postId] === "like"
                    ? post.likes - 1
                    : post.likes + 1,
                reactions: 0,
              }
            : post
        )
      );
      setUserReactions((prevUserReactions) => ({
        ...prevUserReactions,
        [postId]: userReactions[postId] === "like" ? null : "like",
      }));
    }
  };
  
  const handleReact = (postId) => {
    if (!userReactions[postId] || userReactions[postId] === "react") {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                reactions:
                  userReactions[postId] === "react"
                    ? post.reactions - 1
                    : post.reactions + 1,
                likes: 0,
              }
            : post
        )
      );
      setUserReactions((prevUserReactions) => ({
        ...prevUserReactions,
        [postId]: userReactions[postId] === "react" ? null : "react",
      }));
    }
  };
  
  const handleDoubleClick = (postId) => {
    setUserReactions((prevUserReactions) => ({
      ...prevUserReactions,
      [postId]: null,
    }));
  };
  
  ////gjhgjhgjhg
    // const handleLike = (postId) => {
  //   if (!userReactions[postId]) {
  //     setPosts((prevPosts) =>
  //       prevPosts.map((post) =>
  //         post.id === postId ? { ...post, likes: post.likes + 1 } : post
  //       )
  //     );
  //     setUserReactions((prevUserReactions) => ({
  //       ...prevUserReactions,
  //       [postId]: { type: "like", given: true },
  //     }));
  //   }
  // };

  // const handleReact = (postId, reaction) => {
  //   // Check if the user has already given a reaction for the post
  //   if (userReactions[postId]) {
  //     const { type: previousReaction } = userReactions[postId];

  //     // Toggle reactions (decrease the count of the previous reaction)
  //     setPosts((prevPosts) =>
  //       prevPosts.map((prevPost) =>
  //         prevPost.id === postId
  //           ? {
  //               ...prevPost,
  //               reactions: {
  //                 ...prevPost.reactions,
  //                 [previousReaction]: Math.max(
  //                   (prevPost.reactions?.[previousReaction] || 0) - 1,
  //                   0
  //                 ),
  //                 [reaction]: (prevPost.reactions?.[reaction] || 0) + 1,
  //               },
  //             }
  //           : prevPost
  //       )
  //     );
  // }
  // const handleLike = (postId) => {
  //   if (!userReactions[postId] || userReactions[postId] === "like") {
  //     setPosts((prevPosts) =>
  //       prevPosts.map((post) =>
  //         post.id === postId
  //           ? {
  //               ...post,
  //               likes:
  //                 userReactions[postId] === "like"
  //                   ? post.likes - 1
  //                   : post.likes + 1,
  //               reactions: 0,
  //             }
  //           : post
  //       )
  //     );
  //     setUserReactions((prevUserReactions) => ({
  //       ...prevUserReactions,
  //       [postId]: userReactions[postId] === "like" ? null : "like",
  //     }));
  //   }
  // };

  // const handleReact = (postId) => {
  //   if (!userReactions[postId] || userReactions[postId] === "react") {
  //     setPosts((prevPosts) =>
  //       prevPosts.map((post) =>
  //         post.id === postId
  //           ? {
  //               ...post,
  //               reactions:
  //                 userReactions[postId] === "react"
  //                   ? post.reactions - 1
  //                   : post.reactions + 1,
  //               likes: 0,
  //             }
  //           : post
  //       )
  //     );
  //     setUserReactions((prevUserReactions) => ({
  //       ...prevUserReactions,
  //       [postId]: userReactions[postId] === "react" ? null : "react",
  //     }));
  //   }
  // };
  // const handleDoubleClick = (postId) => {
  //   setUserReactions((prevUserReactions) => {
  //     const newReactions = { ...prevUserReactions };
  //     newReactions[postId] = null;
  //     return newReactions;
  //   });
  // };
  //Toggle user's reaction
      // setUserReactions((prevUserReactions) => ({
  //       ...prevUserReactions,
  //       [postId]: { type: reaction, given: true },
  //     }));
  //   } else {
  //     // If the user has not given a reaction for the post, add the new reaction
  //     setPosts((prevPosts) =>
  //       prevPosts.map((prevPost) =>
  //         prevPost.id === postId
  //           ? {
  //               ...prevPost,
  //               reactions: {
  //                 ...prevPost.reactions,
  //                 [reaction]: (prevPost.reactions?.[reaction] || 0) + 1,
  //               },
  //             }
  //           : prevPost
  //       )
  //     );

  //     // Set the user's reaction
  //     setUserReactions((prevUserReactions) => ({
  //       ...prevUserReactions,
  //       [postId]: { type: reaction, given: true },
  //     }));
  //   }
  // };