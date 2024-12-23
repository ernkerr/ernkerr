// export default function LogIn() {
//   const handleLogin = () => {
//     window.location.href = `${
//       import.meta.env.VITE_API_BASE_URL
//     }/api/auth/google`; // Backend endpoint
//   };

//   return <button onClick={handleLogin}>Login with Google</button>;
// }

// import GoogleLogin from "react-google-login";

// export default function Login() {
//   const responseGoogle = (response) => {
//     // Send the token to your backend for verification
//     fetch("/api/auth/google", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ tokenId: response.tokenId }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // Handle the response from your backend
//         console.log(data);
//       });
//   };

//   return (
//     <div>
//       <GoogleLogin
//         clientId="YOUR_GOOGLE_CLIENT_ID"
//         buttonText="Login with Google"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//         cookiePolicy={"single_host_origin"}
//       />
//     </div>
//   );
// }
