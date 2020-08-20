import React, { useState, useContext } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { UserContext } from "../../utils/UserContext";

const NewPost = (props) => {
  const { user_id, getData } = useContext(UserContext);

  const [postToEdit, setPostToEdit] = useState({
    id: "",
    user_id: "",
    title: "",
    content: "",
    subreddit: "",
  });

  // Web API POST request

  const addNewPost = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post(`/api/posts/user/${user_id}`, {
        user_id: user_id,
        title: postToEdit.title,
        content: postToEdit.content,
        subreddit: postToEdit.subreddit,
      })
      .then((res) => {
        console.log("ADDED NEW POST", res);
        axiosWithAuth();
        getData();
        alert("New Post Added");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPostToEdit({
            user_id: user_id,
            title: "",
            content: "",
            subreddit: postToEdit.subreddit,
        });
      });
  };

  const onChangeHandler = (e) => {
    setPostToEdit({
      ...postToEdit,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="newPost">
      <h3>Add a Post</h3>
      <form onSubmit={addNewPost}>
        <input
          type="text"
          name="title"
          value={postToEdit.title}
          onChange={onChangeHandler}
          placeholder="title"
        />
        <input
          type="text"
          name="content"
          value={postToEdit.content}
          onChange={onChangeHandler}
          placeholder="content"
        />
        <button id="addButton" type="submit">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
