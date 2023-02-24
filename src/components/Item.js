import React, { useContext } from "react";
import { Store } from "../context/Store";

export default function Item(props) {
  const store = useContext(Store);
  const item = props.el;

  function rm() {
    store.actions.remove(item);
  }
  function done() {
    store.actions.update(item);
  }
  return (
    <>
      <span
        onClick={done}
        className={`status ${item.state ? "done" : ""}`}
      ></span>
      <p>{item.content}</p>
      <span onClick={rm} className="remove"></span>
    </>
  );
}
