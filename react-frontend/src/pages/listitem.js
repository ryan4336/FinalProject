import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  }, []);

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/api/items/${id}`)
      .then(() => setItems(items.filter(i => i._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>All Items</h2>
      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <Link to={`/edit/${item._id}`}>Edit</Link>
          <button onClick={() => deleteItem(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
