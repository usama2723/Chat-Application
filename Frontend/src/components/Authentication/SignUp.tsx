import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const toggleAcceptTerms = () => {
    setAcceptTerms(!acceptTerms);
  };

  function SignUpFunc(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!acceptTerms) {
      toast.error("Please accept the Terms & Conditions");
      return;
    }

    const Obj = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(Obj);

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/user/signup`, Obj)
      .then(() => {
        toast.success("Account Created");
        const existingUsers = JSON.parse(localStorage.getItem("userInfo") || "[]");

        // Append the new user to the array
        const updatedUsers = [...existingUsers, Obj];

        // Save the updated array of users back to localStorage
        localStorage.setItem("userInfo", JSON.stringify(updatedUsers));

        navigate("/sign-in");
      })
      .catch(() => {
        toast.error("error when signing up");
      });
  }

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    switch (e.target.name) {
      case "name":
        setName(value);
        break;
    }
    switch (e.target.name) {
      case "email":
        setEmail(value);
        break;
    }
    switch (e.target.name) {
      case "password":
        setPassword(value);
        break;
    }
    switch (e.target.name) {
      case "confirm password":
        setConfirmPassword(value);
        break;
    }
  }

  return (
    <div className="flex items-center bg-gray-800 justify-center min-h-screen">
      <form
        onSubmit={SignUpFunc}
        className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
      >
        <h2 className="text-4xl dark:text-white font-bold text-center">
          Sign Up
        </h2>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Name:</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            required
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Password:</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            required
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("password")}
            className="absolute translate-x-72 translate-y-10  text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex flex-col text-gray-400 py-2">
          <label>Confirm Password:</label>
          <input
            name="confirm password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleChange}
            required
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("confirmPassword")}
            className="absolute translate-x-72 translate-y-10  text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="flex justify-between text-gray-400 py-2">
          <p className="flex items-center">
            <input
              className="mr-2"
              type="checkbox"
              checked={acceptTerms}
              onChange={toggleAcceptTerms}
            />
            Accept Terms & Conditions
          </p>
        </div>
        <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
          Sign Up
        </button>

        <p className="text-gray-500 dark:text-gray-400 text-center">
          Already a member?
          <Link
            to={"/sign-in"}
            className=" ml-2 font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignUp;
