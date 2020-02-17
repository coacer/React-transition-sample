import React, { useReducer, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles.css";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      const data = state.filter(value => value.id !== action.payload);
      return data;
    default:
      return state;
  }
};

export default function App() {
  const [posts, dispatch] = useReducer(reducer, []);
  const [title, setTitle] = useState("");

  const handleAddClick = () => {
    const post = {
      id: posts.length,
      title
    };
    dispatch({
      type: "ADD",
      payload: post
    });
    setTitle("");
  };

  const handleDeleteClick = id => {
    dispatch({
      type: "DELETE",
      payload: id
    });
  };

  return (
    <div className="App">
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handleAddClick}>送信</button>
      <TransitionGroup>
        {posts.map(post => {
          return (
            <CSSTransition key={post.id} timeout={500} classNames="fade">
              <div>
                <p>{post.id}</p>
                <p>{post.title}</p>
                <button onClick={() => handleDeleteClick(post.id)}>削除</button>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}
