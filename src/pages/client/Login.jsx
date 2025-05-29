import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import Swal from "sweetalert2";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);
      Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Berhasil Login.",
            timer: 1000,
            showConfirmButton: false, // warna tombol
          });
      navigate("/");
    } catch (err) {
      Swal.fire({
            icon: "error",
            title: "Gagal Login",
            text: "Pastikan Email dan Password sudah benar!",
            timer: 1000,
            showConfirmButton: false, // warna tombol
          });
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="md:container w-full h-screen flex justify-center mx-auto">
        <div className="flex justify-center flex-col gap-10 ">
          <div className="bg-white shadow-md p-5 rounded-md">
            <div className="flex flex-col gap-3">
              <div className="flex-col gap-4 mb-5">
                <h1 className="text-xl font-bold">Welcome back, Fellas 👋</h1>
                <p className="text-sm">
                  Welcome back! Please enter your details
                </p>
              </div>
              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <input
                  value={input.email}
                  onChange={handleChange}
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="border px-4 py-2 w-full lg:w-72 rounded-md"
                />
                <input
                  value={input.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  className="border px-4 py-2 w-full lg:w-72 rounded-md"
                  placeholder="Password"
                />
                <div className="flex gap-24">
                  <div className="flex items-center gap-1">
                    <input
                      className="border"
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                    />
                    <label className="text-xs" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <p className="underline text-xs">Forgot password?</p>
                </div>
                <div className="flex-col">
                  <button
                    type="submit"
                    className="flex justify-center bg-indigo-600 hover:bg-indigo-500 hover:text-black border-b-4 border-indigo-900 text-white font-semibold p-2 rounded-md w-full lg:w-72 gap-2"
                  >
                    Login
                  </button>
                </div>
                <div className="flex justify-center w-72">
                  <p className="text-xs">
                    Don’t have an account?
                    <Link to={"/register"} className="font-semibold ml-1">
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
