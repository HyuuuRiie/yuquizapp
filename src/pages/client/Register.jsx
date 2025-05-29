import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  
  const [input, setInput] = useState({ 
    name: "" ,
    email: "", 
    password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      // Simpan username ke Firebase Auth
      await updateProfile(userCredential.user, {
        displayName: input.name,
      });
      
      Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Registrasi berhasil. Silakan login.",
      timer: 1000,
      showConfirmButton: false,
    });
      navigate("/login");
    } catch (err) {
      Swal.fire({
      icon: "error",
      title: "Gagal Registrasi",
      timer: 1000,
      showConfirmButton: false,
    });
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="md:container w-full h-screen flex justify-center mx-auto">
        <div className="flex justify-center flex-col gap-10 ">
          <div className="bg-white shadow-md p-5 rounded-md">
            <div className="flex-col gap-2 mb-5">
              <h1 className="text-xl text-center font-bold">Create Your Account! 🤩</h1>
            </div>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <input
                value={input.name}
                onChange={handleChange}
                className="border px-4 py-2 w-72 rounded-md"
                placeholder="Username"
                name="name"
                type="text"
              />
              <input
                value={input.email}
                onChange={handleChange}
                className="border px-4 py-2 w-72 rounded-md"
                placeholder="Email"
                name="email"
                type="text"
              />
              <input
                value={input.password}
                onChange={handleChange}
                className="border px-4 py-2 w-72 rounded-md"
                placeholder="Password"
                name="password"
                type="password"
              />
              <div className="flex gap-1">
                <input
                  className="border"
                  type="checkbox"
                  required
                  id="termsAndConditions"
                />
                <label className="text-xs" htmlFor="termsAndConditions">
                  I accept the Terms and Conditions
                </label>
              </div>
              <div className="flex-col">
                <button
                  type="submit"
                  className="flex justify-center bg-indigo-600 hover:bg-indigo-500 border-b-4 border-indigo-900 text-white hover:text-black font-semibold p-2 rounded-md w-full lg:w-72 gap-2"
                >
                  Register
                </button>
                <div className="flex-col w-72">
                  <div className="flex justify-center w-72 mt-2">
                    <p className="text-xs">
                      Do you have an account?
                      <Link to="/login" className="font-semibold ml-1">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
