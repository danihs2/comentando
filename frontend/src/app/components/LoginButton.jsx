function LoginButton({ isAuthenticated }) {
  return (
    <button>{isAuthenticated ? 'Log Out' : 'Log In'}</button>
  );
}

export default LoginButton;
