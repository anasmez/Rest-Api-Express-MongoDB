require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const router=express.Router();

const winston = require("winston");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.errors({ stack: true }),
        // winston.format.splat(),
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  logger.error(error);
});

database.once("connected", () => {
  logger.info("Database connected");
});

const app = express();
app.use(cors());
app.use(express.json());

const routes = require("./src/routes/api/api-routes");
const swaggerRoute = require("./src/routes/swagger");

app.use("/api", routes);
app.use("/", swaggerRoute);

// app.get('/player', async(req, res)=>{
//   res.sendFile(__dirname+'/bases/index.html')
// })

// router.get('/dbz', async(req, res)=>{
//   res.sendFile('./bases/index.html')
// })

app.listen(3000, () => {
  logger.info("Server started at 3000");
});

module.exports = app;