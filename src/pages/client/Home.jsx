import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold">Welcome to Yu Quiz App</h1>
        <p className="text-lg">Test your knowledge and have fun!</p>
        <Link
          to={user ? "/quiz" : "login"}
          className="flex items-center bg-indigo-600 hover:bg-indigo-500 hover:text-white border-b-4 border-indigo-900 text-white hover:text-black font-semibold rounded-md py-4 px-5"
        >
          {user ? "Play Yu Quiz App" : "Start Yu Quiz App"}
        </Link>
      </div>
    </div>
  );
};

export default Home;
