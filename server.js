const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const connectDb = require("./config/connectDB");
const errorHandler = require("./middleware/errorHandler");

const bookRoute = require("./routes/books");
const userRoute = require("./routes/users");
const noteRoute = require("./routes/notes");
const commentRoute = require("./routes/comments");
const foreignbookCommentRoute = require("./routes/foreignBookComments");

dotenv.config({ path: "./config/config.env" });

const app = express();

connectDb();

var whitelist = ["http://localhost:3000"];

// Өөр домэйн дээр байрлах клиент вэб аппуудаас шаардах шаардлагуудыг энд тодорхойлно
var corsOptions = {
  // Ямар ямар домэйнээс манай рест апиг дуудаж болохыг заана
  origin: function (origin, callback) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      // Энэ домэйнээс манай рест рүү хандахыг зөвшөөрнө
      callback(null, true);
    } else {
      // Энэ домэйнд хандахыг хориглоно.
      callback(new Error("Horigloj baina.."));
    }
  },
  // Клиент талаас эдгээр http header-үүдийг бичиж илгээхийг зөвшөөрнө
  allowedHeaders: "Authorization, Set-Cookie, Content-Type",
  // Клиент талаас эдгээр мэссэжүүдийг илгээхийг зөвөөрнө
  methods: "GET, POST, PUT, DELETE",
  // Клиент тал authorization юмуу cookie мэдээллүүдээ илгээхийг зөвшөөрнө
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 100 requests per windowMs
  message: "15 минутанд 500 удаа хандаж болно! ",
});

//хандалтын тоог хязгаарлах
app.use(limiter);

//http parameter pollution халдлагаас хамгаална
app.use(hpp());

app.use(cookieParser());

app.use(express.json());

app.use(cors(corsOptions));

//http header дэх мэдээллийг засна
app.use(helmet());

// Cross site scripting халдлагаас хамгаална
app.use(xss());

// MongoDB дэх халдлагаас хамгаална
app.use(mongoSanitize());

app.use("/api/v1/notes", noteRoute);
app.use("/api/v1/books", bookRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/foreignbookComments", foreignbookCommentRoute);

app.use(errorHandler);

const server = app.listen(process.env.PORT, () =>
  console.log(`server ${process.env.PORT} амжилттай ажиллаа`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
