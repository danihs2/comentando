import Link from "next/link";
import { useGlobalContext } from "../providers/GlobalContext";
import { useEffect } from "react";

function LoginButton({ isAuthenticated }) {
  const { loggedIn, setGlobalLoggedIn } = useGlobalContext();

  useEffect(() => {
    let cookieValue = document.cookie;
    cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (cookieValue) {
      setGlobalLoggedIn(true);
    }else{
      setGlobalLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    let cookieValue = document.cookie;
    cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (cookieValue) {
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    setGlobalLoggedIn(false);
  }

  return (
    <Link href={loggedIn ? "/" : "/access"}>
      <button onClick={ loggedIn? handleLogout : null }>{loggedIn ? "Logout" : "Login"}</button>
    </Link>
  );
}

export default LoginButton;
