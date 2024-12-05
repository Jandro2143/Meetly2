import React, { useEffect, useState } from 'react';
import '../css/auth.css'; // Import your CSS file for styling

function SignUp() {
  const [loading, setLoading] = useState(false); // Loading state for button

  useEffect(() => {
    // Ensure auth.js runs after the component is mounted
    const script = document.createElement('script');
    script.src = '/js/auth.js'; // Adjust the path if needed
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve form values
    const form = event.target;
    const firstName = form.first_name.value.trim();
    const lastName = form.last_name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Validate the input
    if (!firstName || !lastName || !email || !password) {
      alert('All fields are required!');
      return;
    }

    setLoading(true); // Show loading state

    try {
      // Make a POST request to the backend
      const response = await fetch("http://localhost:5000/api/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // User creation successful
        window.location.href = '/sign_in'; // Redirect to sign-in page
      } else {
        alert(data.message); // Display error message from the backend
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form id="sign-up-form" onSubmit={handleSignUp}>
        <label htmlFor="first_name">First Name</label>
        <input type="text" id="first_name" name="first_name" required />
        <label htmlFor="last_name">Last Name</label>
        <input type="text" id="last_name" name="last_name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <a href="/sign_in">Sign In</a>
      </p>
    </div>
  );
}

export default SignUp;
