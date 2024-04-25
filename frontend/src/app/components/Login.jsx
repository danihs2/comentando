"use client";
//import { cookies } from "next/headers";
import { useState } from "react";
import { useGlobalContext } from "../providers/GlobalContext";

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    //const [ loggedIn, setGlobalLoggedIn ] = useGlobalContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Data a enviar: ", username, password);
        try {
            let data = await fetch(`${process.env.NEXT_PUBLIC_OUR_API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            data = await data.json();
            //data.detail?? console.error(data.detail);
            //console.log(data.detail);
            if (data.detail == "No User matches the given query.") {
                window.alert("Usuario no encontrado");
            } else {
                window.alert("Usuario encontrado");
                console.log(data)
                //Guardar en el local storage data.token
                localStorage.setItem('token', data.token);
                // imprimir el token recuperado del local storage
                console.log(localStorage.getItem('token'));

                /*let cookieValue = document.cookie;
                if(cookieValue != null){
                    cookieValue = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('token='))
                    .split('=')[1];
                    console.log("CookieValue: " + cookieValue);
                }*/
                //cookies.set('token', data.token, { expires, httpOnly: true });
                //setGlobalLoggedIn(true);
                //console.log("GlobalLogin: ", globalLogin);
                //console.log(cookies.get('token'));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        User Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;