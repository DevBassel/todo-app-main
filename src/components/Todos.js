import Item from "./Item";

export default function Todos(props) {
  return (
    <ul className="todos">
      {props.list.map((item) => {
        return (
          <li key={item.id} className="todo">
            <Item el={item} />
          </li>
        );
      })}
    </ul>
  );
}
