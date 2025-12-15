import { useState } from "react";
import type { User } from "../types/user";

export const AddUserPanel = () => {
  //   console.log(`Received user [${user}]`);
  const [form, setForm] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [NameEerror, setUserNameError] = useState("");
  const [emailError, setEailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    // Basic validation
    if (!form.name || !form.userName || !form.email || !form.phone) {
      console.log("all ate required");
      setError("All required fields must be filled");
      return;
    } else {
        console.log(form.name)
                // upload record to DB
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  return (
    <div className="side-panel">
  <h3>Add User</h3>

  <div className="form-grid">
    {/* LEFT COLUMN (was right earlier) */}
    <div className="form-col">
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="userName"
        placeholder="Username"
        value={form.userName}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
    </div>

    {/* RIGHT COLUMN (was left earlier) */}
    <div className="form-col">
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />

      <button
        className="add-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add User"}
      </button>
    </div>
  </div>

 <p className="error-text">
  {error || ""}
</p>
</div>

  );
};
