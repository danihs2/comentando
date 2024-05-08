"use client";
import { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useGlobalContext } from "../providers/GlobalContext";

function Acces() {
    const [isLogin, setIsLogin] = useState(true);
    const { loggedIn, setGlobalLoggedIn } = useGlobalContext();

    useEffect(() => {
        console.log("Use Effect - loggedIn: ", loggedIn);
        let cookieValue = document.cookie;
        cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        console.log("CookieValue: ", cookieValue);
        if (cookieValue) {
            setGlobalLoggedIn(true);
            window.location.href = '/';
        }else{
            setGlobalLoggedIn(false);
        }
    }, []);

    const handleLoginClick = () => {
        setIsLogin(true);
    };

    const handleSignupClick = () => {
        setIsLogin(false);
    };

    return (
        <>
            <div className="shadow-sm p-6">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                    <div className="bg-gray-100 border-b rounded-t-xl pt-3 px-4 md:pt-4 md:px-5 dark:bg-slate-800 dark:border-gray-700">
                        <nav className="flex space-x-2" aria-label="Tabs">
                            <a
                                className={`-mb-px py-3 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-700 focus:z-10 dark:border-gray-700 dark:hover:text-gray-400 ${isLogin ? 'bg-white border-b-transparent dark:bg-slate-900  dark:border-b-gray-800 border' : ''}`}
                                href="#!"
                                onClick={handleLoginClick}
                            >
                                Ya tengo cuenta
                            </a>
                            <a
                                className={`-mb-px py-3 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-700 focus:z-10 dark:border-gray-700 dark:hover:text-gray-400 ${!isLogin ? 'bg-white border-b-transparent dark:bg-slate-900  dark:border-b-gray-800 border' : ''}`}
                                href="#!"
                                onClick={handleSignupClick}
                            >
                                Crear cuenta
                            </a>
                        </nav>
                    </div>
                    <div className="text-center md:py-5 md:px-5 inline-block">
                        {isLogin ? <Login /> : <Register />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Acces;