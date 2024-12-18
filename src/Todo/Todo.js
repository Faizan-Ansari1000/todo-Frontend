import { Input } from "antd";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import ApiInstance from "../config/Apis/ApiInstance";

export default function Todo() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const add = async () => {
    if (editIndex !== null) {
      const todoId = list[editIndex]._id;
      const response = await ApiInstance.put(`/todo/${todoId}`, { text: editText });
      const updatedTodo = response.data.data;

      const updatedList = [...list];
      updatedList[editIndex] = updatedTodo;
      setList(updatedList);

      setEditIndex(null);
      setEditText('');
    } else {
      const response = await ApiInstance.post('/todo', { text });
      const newTodo = response.data.data;

      setList([...list, newTodo]);

      setText('');
    }
  };


const deleteTodo = async (i) => {
  const todoId = list[i]._id; 
  try {
    await ApiInstance.delete(`/todo/${todoId}`);

    const updatedList = list.filter((todo, i) => i !== i);
    setList(updatedList);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};


  const editTodo = (i) => {
    setEditIndex(i);
    setEditText(list[i].text);
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-black">
      <div className="w-full max-w-lg bg-gray-900 rounded-lg shadow-2xl p-8 transform transition duration-300 hover:scale-105">

        {/* Inspirational Line */}
        <p className="text-center text-gray-400 mb-4">
          Inspirations to shape the future with code – Sir Basit Ahmed, Sr. Mern Stack Developer
        </p>

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          My Todo List
        </h2>

        {/* Input Box */}
        <div className="flex mb-6 space-x-3">
          <Input
            value={editIndex !== null ? editText : text}
            onChange={(e) =>
              editIndex !== null
                ? setEditText(e.target.value)
                : setText(e.target.value)
            }
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={add}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition duration-200"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {list.map((x, i) => (
            <li
              key={x._id} // Use the unique _id as the key
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
            >
              <span className="text-white font-medium">{x.text}</span> {/* Render only the text */}
              <div className="flex space-x-3">
                <button
                  onClick={() => editTodo(i)}
                  className="text-yellow-400 hover:text-yellow-300 transition duration-200"
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => deleteTodo(i)}
                  className="text-red-500 hover:text-red-400 transition duration-200"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
