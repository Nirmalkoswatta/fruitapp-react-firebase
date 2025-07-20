import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { auth } from "./firebase";

function AddFruit() {
  const [form, setForm] = useState({ name: '', amount: 0, price: 0 });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "fruits"), (snapshot) => {
      setFruits(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {
      await addDoc(collection(db, "fruits"), {
        name: form.name,
        amount: Number(form.amount),
        price: Number(form.price)
      });
      setSuccess("Fruit added!");
      setForm({ name: '', amount: 0, price: 0 });
    } catch (err) {
      setSuccess("Error adding fruit: " + (err.message || err.toString()));
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <button
        onClick={() => auth.signOut()}
        style={{ float: "right", marginBottom: 16 }}
        className="auth-link"
      >
        Logout
      </button>
      <form onSubmit={handleSubmit}>
        <h2>Add Fruit</h2>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          min="0"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          min="0"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Fruit"}
        </button>
        {success && <div style={{ marginTop: 8 }}>{success}</div>}
      </form>
      <hr style={{ margin: "2rem 0" }} />
      <h3>Fruits List</h3>
      <ul>
        {fruits.map(fruit => (
          <li key={fruit.id}>
            <strong>{fruit.name}</strong> - Amount: {fruit.amount}, Price: {fruit.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddFruit; 