import React, { useState } from "react";
import axios from "axios";

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/register", {
        firstName,
        lastName,
        email,
        password,
      });
      alert("Registration successful!");
    } catch (err) {
      alert("Error registering user.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register?</h2>
      Click link below
      <a href="http://localhost:3001/register">Register</a>
    </form>
  );
}

export default Registration;
