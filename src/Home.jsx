// import '<div className=""></div>/index.css';

import "./App.css";
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "./firebase";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

import { Routes, Route } from 'react-router-dom';
// import LogIn from './LogIn';
// import SignUp from './SignUp';



export default function Home() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  let name = "";


    const navigate = useNavigate();


  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => setUser(u));
    const unsubPosts = onSnapshot(
      query(collection(db, "posts"), orderBy("createdAt", "desc")),
      (snap) => setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data()})))
    );
    return () => {
      unsubAuth();
      unsubPosts();
    };
  }, []);

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


    const deletePost = async (id) => {
      try {
        await deleteDoc(doc(db, "posts", id));
      } catch (e) {
        alert("Could not delete post: " + e.message);
      }
    }

  const logIn = () => {
    signInWithEmailAndPassword(auth, email, pass).catch((e) =>
      alert(e.message)
    );
  }
    

  const logOut = () => signOut(auth);

  const delAccount = () =>
    deleteUser(auth.currentUser).catch((e) => alert(e.message));

  const post = async () => {
    if (!message.trim()) return;

    if (signUpWithGoogle) {
      await addDoc(collection(db, "posts"), {
      
      name: user.email,
      text: message,
      createdAt: serverTimestamp(),
    }); 

    } else {
      await addDoc(collection(db, "posts"), {
      
      name: name,
      text: message,
      createdAt: serverTimestamp(),
    });
    
    }
    
    setMessage("");
  };

  return (
    
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>ASB HUB</h2>
      <button onClick={() => navigate("/login")}>Log In</button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      {!user ? (
        <>
          <input placeholder = "Name" value = { username } onChange = {(e) => setUsername(e.target.value)}/>
          <br></br>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <br></br>
          <input placeholder="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)}/>
          <br></br>

          <button onClick={signUp}>Sign Up</button>
          <button onClick={logIn}>Log In</button>
          <button onClick = {signUpWithGoogle}>Log In With Google</button>
        </>
      ) : (
        <>
          <p>Logged in as <b>{user.email}</b></p>
          <button onClick={logOut}>Log Out</button>
          <button onClick={delAccount}>Delete Account</button>
          <hr />
          <input placeholder="Write a message" value={message} onChange={(e) => setMessage(e.target.value)}/>
          <button onClick={post}>Post</button>
          <ul>
                {posts.map((p, i) => {
                  let time = "Just now";
                  if (p.createdAt && p.createdAt.toDate) {
                  const date = p.createdAt.toDate();
                  const currentTime = new Date();
                  const diffExtended = currentTime - date;
                  const diffMins = Math.floor(diffExtended / 60000);
                  const diffHours = Math.floor(diffExtended / 60);
                  const diffDays = Math.floor(diffExtended/24);
                  time = date.toLocaleString();

                  if (diffMins < 1) {
                    time = "Just now"; // similar to instagram
                  } else if (diffMins < 60) {
                    time = `${diffMins} min${diffMins === 1 ? "" : "s"} ago`;
                  } else if (diffHours < 24) {
                    time = `${diffHours} min${diffHours === 1 ? "" : "s"} ago`;

                  } else {
                    time = `${diffDays} min${diffDays === 1 ? "" : "s"} ago`;

                  }

                }

                  return (
              <li key={i}>
               <b>{p.name}</b> [{time}]: {p.text}
                {user && p.name === user.email && (
                <button onClick={() => deletePost(p.id)}>Delete</button>
              )}
      </li>
    );
  })}
</ul>
        </>
      )}
    </div>
  );
}


// // export default function Home() {
// //   return (
// //     <div>
// //       <h1>Hello from Home</h1>
// //     </div>
// //   );
// // }

// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div>
//       <h1>Home</h1>
//       <Link to="/login">Login</Link><br />
//       <Link to="/signup">Signup</Link>
//     </div>
//   );
// }
