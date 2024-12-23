// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/api/auth/google/callback", // make sure this matches the one on google
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       try {
//         // Check if user exists in the database
//         let user = await prisma.user.findUnique({
//           where: { googleId: profile.id },
//         });

//         // If not, create a new user
//         if (!user) {
//           user = await prisma.user.create({
//             data: {
//               googleId: profile.id,
//               email: profile.emails[0].value,
//               name: profile.displayName,
//               avatar: profile.photos[0].value,
//             },
//           });
//         }

//         // Pass user to the next middleware
//         return cb(null, user);
//       } catch (error) {
//         return cb(error, null);
//       }
//     }
//   )
// );

// // Serialize and deserialize user (required for persistent login sessions)
// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//   const user = await prisma.user.findUnique({ where: { id } });
//   done(null, user);
// });

// app.get(
//   "/api/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/api/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect to the React app
//     res.redirect("http://localhost:5173");
//   }
// );
