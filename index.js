const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const { render } = require("ejs");
// const clucksRouter = require("./routes/clucks");
// const router = express.Router();

const knex = require("./db/client");

const app = express();
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use((request, response, next) => {
	const { username } = request.cookies;
	response.locals.username = username;
	next();
});

app.get("/", (req, res) => {
	res.render("welcome");
});

// Sign in page below

app.get("/sign_in", (req, res) => {
	res.render("sign_in");
});

app.post("/sign_in", (req, res) => {
	const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30;
	const { username } = req.body;
	console.log(username);
	res.cookie("username", username, { maxAge: COOKIE_MAX_AGE });
	res.redirect("/sign_in");
});

app.post("/sign_out", (req, res) => {
	res.clearCookie("username");
	res.redirect("/sign_in");
});

// cluck form page

app.get("/cluck", (req, res) => {
	res.render("form");
});

// post new cluck
app.post("/", (request, response) => {
	const { content, logoUrl } = request.body;
	console.log(content, logoUrl);

	knex("cluckr")
		.insert(
			{
				username: request.cookies.username || "Anonymous",
				logoUrl,
				content,
			},
			"*"
		) // 2nd arg of "*" outputs an array of objects representing the rows that we inserted
		.then((data) => {
			let id = data[0].id;
			// This path is from the host, not /articles
			// 	// It allows us to redirect to other routers
			response.redirect("/index");
		});
});

// index page

app.get("/index", (req, res) => {
	knex("cluckr")
		.select("*")
		.from("cluckr")
		.then((data) => {
			res.render("index", { data });
		});
});

// app.use("/clucks", clucksRouter);
const PORT = 3000;
const ADDRESS = "localhost";

app.listen(PORT, ADDRESS, () => {
	console.log(`Server listenning on http://${ADDRESS}:${PORT}`);
});
