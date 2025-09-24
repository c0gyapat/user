import bcrypt from "bcrypt";
import Database from "better-sqlite3";
import express from "express";

const PORT = 5500;

const db = new Database("database.db");
db.pragma("journal_mode = WAL");

const app = express();
app.use(express.json());

app.post("/register", (req, res) => {
	const { username, password, passwordAgain } = req.body;

	if (!username || !password || !passwordAgain) {
		return res.status(400).json({ message: "All fields are required" });
	}

	if (password !== passwordAgain) {
		return res.status(400).json({ message: "Passwords do not match" });
	}

	const pwHash = bcrypt.hashSync(password, 10);

	const stmt = db.prepare(
		"INSERT INTO users (username, password) VALUES (?, ?)"
	);
	stmt.run(username, pwHash);
	res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
	const { username, password } = req.body;

	const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
	const user = stmt.get(username);

	if (user && bcrypt.compareSync(password, user.password)) {
		res.status(200).json({ message: "Login successful" });
	} else {
		res.status(401).json({ message: "Invalid username or password" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
