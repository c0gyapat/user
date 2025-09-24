const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const API_URL = "http://localhost:5000";

registerForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(registerForm);
	const data = Object.fromEntries(formData.entries());

	if (!data.username || !data.password || !data.passwordAgain) {
		alert("All fields are required");
		return;
	}

	if (data.password !== data.passwordAgain) {
		alert("Passwords do not match");
		return;
	}
	console.log("Registering user:", data);
	try {
		const response = await fetch(API_URL + "/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: data.username,
				password: data.password,
				passwordAgain: data.passwordAgain,
			}),
		});

		const result = await response.json();
		alert(result.message);
	} catch (error) {
		alert("Error: " + error.message);
	}
});
loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(loginForm);
	const data = Object.fromEntries(formData.entries());
	if (!data.username || !data.password) {
		alert("All fields are required");
		return;
	}

	try {
		const response = await fetch(API_URL + "/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: data.username,
				password: data.password,
			}),
		});

		const result = await response.json();
		alert(result.message);
	} catch (error) {
		alert("Error: " + error.message);
	}
});
