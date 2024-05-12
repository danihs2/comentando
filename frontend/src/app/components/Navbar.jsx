"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LoginButton from './LoginButton';
import { useGlobalContext } from '../providers/GlobalContext';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { loggedIn, setGlobalLoggedIn } = useGlobalContext();
  useEffect(() => {
    console.log("Use Effect - Nav: ", loggedIn);
    let cookieValue = document.cookie;
    cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    console.log("CookieValue: ", cookieValue);
    if (cookieValue) {
        setGlobalLoggedIn(true);
    }else{
        setGlobalLoggedIn(false);
    }
  }, []);

  return (
    <header >
      <div className="netflixLogo">
        <Link href="/">
          <img src="https://github.com/danihs2/comentando/blob/main/frontend/public/RESEFLIX-13-4-2024.png?raw=true" alt="Logo Image" />
        </Link>
      </div>
      <nav className="main-nav">
        <Link href="/">
          Home
        </Link>
        <Link href="/about">
          About Us
        </Link>
        {loggedIn && (
          <Link href="/myComments">
            My Comments
          </Link>
        )
        }
      </nav>
      <nav className="sub-nav">
        <LoginButton isAuthenticated={isAuthenticated} />
      </nav>
    </header>
  );
}

export default Navbar;
