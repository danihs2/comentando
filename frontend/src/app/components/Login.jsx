"use client";
//import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../providers/GlobalContext";

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { loggedIn, setGlobalLoggedIn } = useGlobalContext();

    useEffect(() => {
        console.log("Use Effect - loggedIn: ", loggedIn);
        let cookieValue = document.cookie;
        cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        console.log("CookieValue: ", cookieValue);
        if (cookieValue) {
            setGlobalLoggedIn(true);
        }else{
            setGlobalLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        console.log("Use Effect - loggedIn: ", loggedIn);
        if (loggedIn) {
            window.location.href = '/';
        }
    }, [loggedIn]);

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
            console.log(data);
            if (data.detail === "No User matches the given query.") {
                window.alert("Usuario no encontrado");
            } else if (data.token) { // Si hay un token en la respuesta
                console.log(data)
                setGlobalLoggedIn(true);
                window.alert("Usuario encontrado");
                document.cookie = `token=${data.token}`;
                document.cookie = `username=${data.username}`;
                console.log("Cookie: ", document.cookie);
            } else {
                window.alert("Error en la autenticación: " + data.detail);
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