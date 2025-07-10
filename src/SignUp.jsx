import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  let name = "";

  const signUp = () => {
      createUserWithEmailAndPassword(auth, username, email, pass).catch((e) =>
        alert(e.message)
    );
    name = username;

  }
    

    const signUpWithGoogle = async () => {
    const service = new GoogleAuthProvider(); 
    try {
      const bestCase = await signInWithPopup(auth, service);
    } catch (err) {
      alert(err.message);
    }
    }

    return (
        <div>
            <h1>Sign up</h1>
        </div>
    )
    

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
//       <button onClick={signUp}>Sign Up</button>
//     </div>
//   );
}
