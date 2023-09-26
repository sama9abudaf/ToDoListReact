import React from "react";
import { useState } from "react";
import { FaUndoAlt } from "react-icons/fa";

const Header = ({ addTask }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (!text) return;
    setLoading(true);
    await addTask(text);
    setLoading(false);
    setText("");
  };

  return (
    <div className="banner flex items-center justify-center flex-col pl-12 pr-12 pt-10 pb-10 rounded-md">
      <form className="flex gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add Your Task"
          className="w-96 border-2 rounded-md px-1"
        />
        <button
          onClick={onClick}
          type="button"
          disabled={loading}
          className="cursor-pointer w-28 bg-semsem border-0 h-10 border-2-none rounded-md"
        >
          {loading ? (
            <FaUndoAlt className="flex items-center mx-auto animate-spin" />
          ) : (
            "Add"
          )}
        </button>
      </form>
    </div>
  );
};

export default Header;
