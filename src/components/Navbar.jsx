import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Cek user yang sedang login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Anda Sudah Logout",
          timer: 1000,
          showConfirmButton: false,
        });
    navigate("/");
  };

  return (
    <header className="fixed w-full">
      <nav className="bg-white shadow-lg z-50 py-4">
        <div className="md:container mx-auto">
          <div className="flex items-center justify-between mx-4">
            <div className="text-2xl md:text-3xl font-bold text-indigo-600">
              <h1>Yu Quiz App</h1>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <p className="text-sm font-medium text-gray-700">
                    Hello, <span className="text-indigo-600">
                      {user.displayName || user.email}
                    </span>👋
                  </p>
                  <button
                    onClick={handleLogout}
                    className="bg-indigo-600 text-white hover:text-black hover:bg-indigo-500 font-medium rounded-md py-2 px-5"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-indigo-600 hover:bg-indigo-500 hover:text-black  text-white font-medium rounded-md py-2 px-5"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
