import React, { useContext, useRef, useEffect, useState } from "react";
import { Store } from "../context/Store";
import Todos from "./Todos";
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";
import darkImg from "../assets/bg-desktop-dark.jpg";
import lightImg from "../assets/bg-desktop-light.jpg";
import mobLight from "../assets/bg-mobile-light.jpg";
import mobDark from "../assets/bg-mobile-dark.jpg";

export default function Container() {
  const inputVal = useRef("");
  const store = useContext(Store);
  const [filter, setFilter] = useState("All");
  const [activeFilter, setActive] = useState(1);
  const [theme, setTheme] = useState(false);

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
      name: "Active",
    },
    { id: 3, name: "Completed" },
  ];

  function active(item) {
    setActive(item.id);
    setFilter(item.name);
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
  let ROOT = (name, val) =>
    document.documentElement.style.setProperty(name, val);
  if (theme) {
    // LIGHT
    ROOT("--bg", "hsl(0, 0%, 98%)");
    ROOT("--container", "hsl(236, 33%, 92%)");
    ROOT("--text", "hsl(233, 11%, 84%)");
    ROOT("--bg-img-disk", `url(${lightImg})`);
    
    ROOT("--bg-img-mob", `url(${mobLight})`);

    ROOT("--text", "hsl(235, 19%, 35%)");

    console.log("lighr", theme);
  } else {
    // DARK
    ROOT("--bg-img", `url(${darkImg})`);

    ROOT("--bg", "hsl(235, 21%, 11%)");
    ROOT("--container", "hsl(235, 24%, 19%)");
    ROOT("--text", "hsl(234, 11%, 52%)");
    ROOT("--bg-img-disk", `url(${mobDark})`);
    ROOT("--bg-img-mob", `url(${darkImg})`);

    console.log("dark", theme);
  }
  // console.log(filter);
  return (
    <div className="container">
      <h1>
        TODO{" "}
        <img
          onClick={() => setTheme(!theme)}
          src={theme ? moon : sun}
          alt="icon"
        />
      </h1>
      <form onSubmit={(e) => submit(e)} className="form">
        <span></span>
        <input type="text" ref={inputVal} placeholder="Create a new todo.." />
      </form>
      <div className="content">
        <Todos list={store.todos[filter]} />
        <div className="control">
          <span>{store.todos.Active.length} items left </span>
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
          <span onClick={store.actions.clear}>Clear Completed</span>
        </div>
      </div>
    </div>
  );
}
