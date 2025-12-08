import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditItem() {
  const { id } = useParams();
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/items/${id}`)
      .then(res => setName(res.data.name))
      .catch(err => console.log(err));
  }, [id]);

  const updateItem = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/items/${id}`, { name })
      .then(() => alert("Updated!"))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={updateItem}>
      <h2>Edit Item</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
