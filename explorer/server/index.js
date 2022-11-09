const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var dotenv = require("dotenv");
var env = process.env;
dotenv.config();

const models = require("./models/index.js");
var indexRouter = require("./routes/index");
//const yaml = require("yamljs");
//const swaggerUI = require("swagger-ui-express");

const app = express();
const PORT = process.env.SERVER_PORT || 8080;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    })
);
// Route 설정
app.use("/", indexRouter);

// 스웨거 API docs
//const openAPIDocument = yaml.load("./api/api_docs.yaml");
//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openAPIDocument));

models.sequelize
    .sync()
    .then(() => {   
        app.listen(PORT, async () => {
            console.log(`DB연결 성공 및 HTTP ${PORT} 구동중`);
        });  
    })
    .catch((err) => {
        console.log("연결 실패");
        console.log(err);
    });
