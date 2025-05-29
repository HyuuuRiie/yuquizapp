// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LayoutClient from "../layout/layoutClient";
// import Home from "./client/Home";
// import Quiz from "./client/Quiz";
// import Login from "./client/Login";
// import Register from "./client/Register";
// import React from "react";
// import { GlobalProvider } from "../context/GlobalContext";
// import Cookies from "js-cookie";
// import { Navigate } from "react-router-dom";

// function App() {
//   const LoginRoute = (props) => {
//     if (Cookies.get("token") !== undefined) {
//       return <Navigate to={"/"} />;
//     } else if (Cookies.get("token") === undefined) {
//       return props.children;
//     }
//   };

//   return (
//     <>
//       <GlobalProvider>
//         <Router>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <LayoutClient>
//                   <Home />
//                 </LayoutClient>
//               }
//             />
//             <Route
//               path="/quiz"
//               element={
//                 <LayoutClient>
//                   <Quiz />
//                 </LayoutClient>
//               }
//             />
//             <Route
//               path="/login"
//               element={
//                 <LoginRoute>
//                   <Login />
//                 </LoginRoute>
//               }
//             />
//             <Route
//               path="/Register"
//               element={
//                 <LoginRoute>
//                   <Register />
//                 </LoginRoute>
//               }
//             />
//           </Routes>
//         </Router>
//       </GlobalProvider>
//     </>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LayoutClient from "../layout/layoutClient";
import Home from "./client/Home";
import Quiz from "./client/Quiz";
import Login from "./client/Login";
import Register from "./client/Register";
import React from "react";
import { GlobalProvider } from "../context/GlobalContext";
import { AuthProvider, useAuth } from "../context/AuthContext";

function LoginRoute({ children }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <LayoutClient>
                  <Home />
                </LayoutClient>
              }
            />
            <Route
              path="/quiz"
              element={
                <LayoutClient>
                  <Quiz />
                </LayoutClient>
              }
            />
            <Route
              path="/login"
              element={
                <LoginRoute>
                  <Login />
                </LoginRoute>
              }
            />
            <Route
              path="/register"
              element={
                <LoginRoute>
                  <Register />
                </LoginRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
