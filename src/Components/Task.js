import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { FaPen } from "react-icons/fa";

const Task = ({ id, title, onDelete, onUpdate, completed }) => {
  const [text, setText] = useState("");
  const [isReadOnly, setReadOnly] = useState(true);

  const onEnterClicked = (e) => {
    if (e.key === "Enter") {
      onUpdate(id, { title: text });
      setReadOnly(true);
    }
  };

  const onChecked = (e) => {
    onUpdate(id, { completed: e.target.checked });
  };

  useEffect(() => {
    setText(title);
  }, [title]);

  return (
    <li className="item flex gap-5">
      <input type="checkbox" onChange={onChecked} checked={completed} />
      <input
        type="text"
        value={text}
        className="inputTitle rounded-md"
        readOnly={isReadOnly}
        onKeyDown={onEnterClicked}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="icons flex gap-4 items-center">
        <FaPen
          style={{ color: " rgb(4, 4, 66)", cursor: "pointer" }}
          onClick={() => setReadOnly(false)}
        />
        <FaTrashAlt
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(id)}
        />
      </div>
    </li>
  );
};

export default Task;

// onClick={onDelete({id})}
