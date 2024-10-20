import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../../Context/ChatProvider";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { setUser } = ChatState();

  function SignInFunc(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/user/signin`, {
        email,
        password,
      })
      .then((response) => {
        toast.success("Successfully Signin");
        navigate("/");
        console.log(response);
        const { token } = response.data;
        console.log(token);
        setUser(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
      })
      .catch(() => {
        toast.error("Incorrect email or password. Please try again.");
      });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

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
  }
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);
  return (
    <div className="flex items-center bg-gray-800 justify-center min-h-screen">
      <form
        onSubmit={SignInFunc}
        className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
      >
        <h2 className="text-4xl dark:text-white font-bold text-center">
          Sign In
        </h2>
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
            onClick={togglePasswordVisibility}
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
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </p>
          <p>
            <Link
              to={"dd"}
              className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
            >
              Forgot Password
            </Link>
          </p>
        </div>
        <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
          Sign In
        </button>
        <button
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
          className="w-full my-3 py-2 bg-red-500 shadow-lg shadow-red-500/50 hover:shadow-red-500/40 text-white font-semibold rounded-lg"
        >
          Get Guest User Credentials
        </button>

        <p className="text-gray-500 dark:text-gray-400 text-center">
          Create an account
          <Link
            to="/sign-up"
            className="ml-2 font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignIn;
