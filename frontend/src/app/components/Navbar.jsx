"use client"
import { useState } from 'react';
import Link from 'next/link';
import LoginButton from './LoginButton';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <header >
      <div className="netflixLogo">
        <Link href="/">
          <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/logo.PNG?raw=true" alt="Logo Image" />
        </Link>
      </div>
      <nav className="main-nav">
        <Link href="/">
          Home
        </Link>
        <Link href="/about">
          About Us
        </Link>
        <Link href="/college-life">
          College Life
        </Link>
      </nav>
      <nav className="sub-nav">
        <LoginButton isAuthenticated={isAuthenticated} />
      </nav>
    </header>
  );
}

export default Navbar;
