import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/auth.css"; // Import your CSS file for styling

function SignIn() {
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate(); // React Router's navigation hook

  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve form values
    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Validate the input
    if (!email || !password) {
      alert("Both email and password are required!");
      return;
    }

    setLoading(true); // Show loading state

    try {
      // Make a POST request to the backend
      const response = await fetch("http://localhost:5000/api/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Sign-in successful

        // Store the user's unique ID in sessionStorage
        if (data.user && data.user.uniqueId) {
          const uniqueId = data.user.uniqueId;

          // Save the unique ID to sessionStorage for persistence
          sessionStorage.setItem("userId", uniqueId);

          // Redirect to /home/:uniqueId
          navigate(`/home/${uniqueId}`);
        } else {
          console.error("Unique ID is missing in the response.");
          alert("An error occurred. Please try again.");
          return;
        }
      } else {
        alert(data.message); // Display error message from the backend
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign In</h1>
      <form id="sign-in-form" onSubmit={handleSignIn}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <p>
        Don't have an account? <a href="/sign_up">Sign Up</a>
      </p>
    </div>
  );
}

export default SignIn;
