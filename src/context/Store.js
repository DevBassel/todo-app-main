import { createContext, useState } from "react";

export const Store = createContext();

export default function StoreProvider(props) {
  const [todos, setTodos] = useState(() => {
    let items = localStorage.todos;
    if (items) {
      items = JSON.parse(items);
      console.log(items);
    } else {
      items = { All: [], Archive: [], Complete: [] };
    }
    return items;
  });
  localStorage.todos = JSON.stringify(todos);

  const actions = {
    Add(item) {
      setTodos({
        ...todos,
        All: [...todos.All, ...item],
        Archive: [...todos.Archive, ...item],
      });
    },
    clear() {
      setTodos({
        All: todos.All.filter((t) => t.state === false),
        Archive: todos.Archive,
        Complete: [],
      });
    },
    remove(item) {
      setTodos({
        All: todos.All.filter((i) => i.id !== item.id),
        Archive: todos.Archive,
        Complete: todos.Complete,
      });
    },
    update(item) {
      let index = todos.All.findIndex((i) => i.id === item.id);
      let al = [
        ...todos.All.slice(0, index),
        Object.assign({}, todos.All[index], {
          state: !todos.All[index].state,
        }),
        ...todos.All.slice(index + 1),
      ];

      setTodos({
        All: al,
        Complete: al.filter((el) => el.state === true),
        Archive: al.filter((el) => el.state === false),
      });
    },
  };
  // console.log("to", todos);

  return (
    <Store.Provider value={{ todos, actions }}>{props.children}</Store.Provider>
  );
}
