import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import http from "http";
import "./config/connectDataBase";
import AuthRouter from "./routers/Auth";
import BannerRouter from "./routers/Banner";
import CartRouter from "./routers/Cart";
import CategoryRouter from "./routers/Category";
import InfoRouter from "./routers/Info";
import MesssageRouter from "./routers/Messsage";
import OptionRouter from "./routers/Option";
import ProductRouter from "./routers/Product";
import ReviewRouter from "./routers/Review";
import UserRouter from "./routers/User";

const app = express();

const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.use((req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} ${
      res.statusCode
    } ${res.get("Content-Length") || "-"} ${
      res.get("X-Response-Time") || "-"
    } ms`
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "assets")));

app.use("/api", AuthRouter);
app.use("/api/banner", BannerRouter);
app.use("/api/carts", CartRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/infos", InfoRouter);
app.use("/api/message", MesssageRouter);
app.use("/api/options", OptionRouter);
app.use("/api/products", ProductRouter);
app.use("/api/reviews", ReviewRouter);
app.use("/api/user", UserRouter);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
