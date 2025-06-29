// import express, { Application } from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from "path";

// import IndexRoute from "./routers/index";
// import connectDatabase from "./helpers/database/connect-database";
// import customErrorHandler from "./middlewares/erros/custom-error-handler";


// dotenv.config({
//   path: path.resolve(__dirname, "./config/config.env")
// });

// connectDatabase();

// const PORT = process.env.PORT || 5000;
// const app: Application = express();

// app.use(express.json());
// app.use(cors());

// app.use("/api", IndexRoute);

// app.use(customErrorHandler);

// const server = app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT} : ${process.env.NODE_ENV}`);
// });

// process.on("unhandledRejection", (err: any) => {
//   console.log(`Logged Error: ${err}`);

//   server.close(() => process.exit(1));
// });




import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import IndexRoute from "./routers/index";
import connectDatabase from "./helpers/database/connect-database";
import customErrorHandler from "./middlewares/erros/custom-error-handler";

// ✅ Load environment variables from config file
dotenv.config();

// ✅ Connect to MongoDB
connectDatabase();

// ✅ Set the port — Render provides process.env.PORT automatically
const PORT = process.env.PORT || 5000;
const app: Application = express();

// ✅ Middleware setup
app.use(express.json());
app.use(cors());

// ✅ Mount all routes under /api
app.use("/api", IndexRoute);

// ✅ Custom error handler
app.use(customErrorHandler);

// ✅ Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// ✅ Gracefully handle unhandled rejections
process.on("unhandledRejection", (err: any) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});

