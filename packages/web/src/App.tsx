import { useState, useEffect } from 'react'
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import './App.css'
import Post, { postProps } from './components/posts';
import Form from './components/form';




export function Login() {
  const { login, register } = useKindeAuth();
  return (
    <div className="flex  flex-col items-center">
      <h1 className="text-4xl font-bold">Welcome to Vacation Blogger</h1>
      <p className="text-xl">Please login to continue</p>
      <div className="mt-8 flex flex-col gap-y-4">
        <button className="border" onClick={() => login()}>Login</button>
        <button className="border" onClick={() => register()}>Register</button>
      </div>
    </div>
  );
}

function App() {

  const [posts, setPosts] = useState<postProps[]>([]);
  const { getToken, isAuthenticated } = useKindeAuth();
   
  async function fetchData() {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }


    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/posts",
    {
      headers: {
        Authorization: token,
      },  
    }
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    console.log(data)

    setPosts(() => [...data])
  }


useEffect(() => {
  if (!getToken || !isAuthenticated) {
    return
  }
  fetchData()
}, [getToken, isAuthenticated]);

  if (!isAuthenticated) {
    return <Login />;
  }
  console.log(posts)

  return (
    <div className="App mx-auto">   
      <Form />
      {posts && posts.map((post, index) => (
      <Post key={index} post={post} />
      ))}   
    </div>
  );
}

export default App

