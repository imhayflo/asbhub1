
// import { Routes, Route } from "react-router-dom";
// import Home from "./Home.jsx";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       {/* <Route path="/login" element={<LogIn />} />
//       <Route path="/signup" element={<SignUp />} />
//       <Route path="/dashboard" element={<Dashboard />} /> */}



//     </Routes>
//   );
// }

import { Routes, Route } from "react-router-dom";
import Home from "./Home";
// import LogIn from "./LogIn";
// import SignUp from "./SignUp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} /> */}
    </Routes>
  );
}
