import Link from "next/link";

function LoginButton({ isAuthenticated }) {
  return (
    <Link href={isAuthenticated ? "/logout" : "/access"}>
      <button>{isAuthenticated ? "Logout" : "Login"}</button>
    </Link>
  );
}

export default LoginButton;
