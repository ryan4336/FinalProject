import { useState } from "react";
import axios from "axios";

export default function CreateItem() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/items", { name })
      .then(() => alert("Created!"))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Item</h2>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
