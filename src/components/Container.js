import React, { useContext, useRef, useEffect, useState } from "react";
import { Store } from "../context/Store";
import Todos from "./Todos";

export default function Container() {
  const inputVal = useRef("");
  const store = useContext(Store);
  const [filter, setFilter] = useState("All");
  const [activeFilter, setActive] = useState(1);
  useEffect(() => {
    inputVal.current.focus();
  }, []);
  const taps = [
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Archive",
    },
    { id: 3, name: "Complete" },
  ];

  function active(item) {
    setActive(item.id);
    setFilter(item.name)
  }

  function submit(e) {
    e.preventDefault();
    store.actions.Add([
      {
        id: Date.now().toString(32),
        content: inputVal.current.value,
        state: false,
      },
    ]);
    inputVal.current.blur();
    inputVal.current.value = "";
    window.localStorage.todos = JSON.stringify(store.todos);

  }

  console.log(filter);
  return (
    <div className="container">
      <h1>TODO</h1>
      <form onSubmit={(e) => submit(e)} className="form">
        <span></span>
        <label>Currently typing </label>
        <input type="text" ref={inputVal} placeholder="Create a new todo.."/>
      </form>
      <div className="content">
        <Todos list={store.todos[filter]} />
        <div className="control">
          <span>{store.todos.All.length - store.todos.Complete.length} items left </span>
          <div className="filter">
            {taps.map((el) => (
              <span
                onClick={() => active(el)}
                key={el.id}
                className={`${activeFilter === el.id ? "active" : ""}`}
              >
                {el.name}
              </span>
            ))}
          </div>
          <span onClick={store.actions.clear}>Clear Complete</span>
        </div>
      </div>
    </div>
  );
}
