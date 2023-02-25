import { createContext, useState } from "react";

export const Store = createContext();

export default function StoreProvider(props) {
  const [todos, setTodos] = useState(() => {
    let items = localStorage.todos;
    if (items) {
      items = JSON.parse(items);
      console.log(items);
    } else {
      items = { All: [], Active: [], Completed: [] };
    }
    return items;
  });
  localStorage.todos = JSON.stringify(todos);

  const actions = {
    Add(item) {
      setTodos({
        ...todos,
        All: [...todos.All, ...item],
        Active: [...todos.Active, ...item],
      });
    },
    clear() {
      setTodos({
        All: todos.All.filter((t) => t.state === false),
        Active: todos.Active,
        Completed: [],
      });
    },
    remove(item) {
      setTodos({
        All: todos.All.filter((i) => i.id !== item.id),
        Active: todos.Active,
        Completed: todos.Completed,
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
        Completed: al.filter((el) => el.state === true),
        Active: al.filter((el) => el.state === false),
      });
    },
  };
  // console.log("to", todos);

  return (
    <Store.Provider value={{ todos, actions }}>{props.children}</Store.Provider>
  );
}
