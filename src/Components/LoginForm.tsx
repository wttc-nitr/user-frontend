import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginUser = async () => {
    const data = await fetch('http://localhost:3000/user/login',{
      method: "POST",
      headers: {
        "username": username,
        "password": password
      }
    });

    const json = await data.json();
    // console.log(json);

    if (json?.token) {
      localStorage.setItem('token', json.token);
      navigate('/user/dashboard');
    }
    else alert(json?.message);
  }

  return (
    <div className="p-4 w-full">
      <h3 className="text-xl font-light text-center my-2">Learners&apos; Login:</h3>
      <form>
        <label htmlFor="username" className="">username:</label> <br />
        <input 
          type="email" 
          id="username" 
          value={username} 
          onChange={(e) => {
            setUsername(e.target.value)
          }} 
          placeholder="type username..." 
          className="border-2 py-2 px-4 rounded-lg block w-full"
        /> 
        <br/>
        <label htmlFor="password" className="">password:</label> 
        <br />
        <input 
          type="password" 
          id="password" 
          placeholder="type password..." 
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          className="border-2 py-2 px-4 rounded-lg block w-full"
        /> 
        <br/>

        <input 
            type="submit" 
            value="Login" 
            className="block p-3 bg-slate-500 text-white text-center w-full rounded-lg cursor-pointer hover:bg-slate-400"
            onClick={(e) => {
              e.preventDefault();
              handleLoginUser();
            }}
        />
        
        <span className="mt-4 block text-center text-sm font-light">
          or
          <Link to={"/user/signup"}>
            <span 
              className="mx-1 px-3 py-1 bg-red-300 text-black rounded-lg cursor-pointer hover:bg-orange-300"
              >
              Sign-up
            </span>
          </Link>
        </span>
        
      </form>
    </div>
  )
}

export default LoginForm;