// import css files?

export const metadata = {
  title: "Carpoolio",
  description:
    "Organized carpooling for events, festivals, and trips. Find a ride, share a ride. Figure out who's going in who's car.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head> */}
      {/* <link rel="icon" href="/icon.png" /> */}
      {/* <title>carpoolio</title> */}
      {/* </head> */}
      <body>
        <div id="root">{children}</div>
        {/* <script type="module" src="/src/index.jsx"></script> */}
      </body>
    </html>
  );
}
