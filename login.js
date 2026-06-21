let API = "https://back-end-project-1-production.up.railway.app/auth-api";

async function loginUser(username, password) {
	let response = await fetch(
		`${API}/login?username=${username}&password=${password}`,
		{
			method: "POST"
		}
	);

	let data = await response.json();
	console.log(data);

	return data;
}

async function handleLogin(event) {
	event.preventDefault();

	let username = document.querySelector("#username").value;
	let password = document.querySelector("#password").value;

	let data = await loginUser(
		username,
		password
	);

	if (data.success) {
		localStorage.setItem("userId", data.id);
		localStorage.setItem("username", data.username);
		localStorage.setItem("email", data.email);
		localStorage.setItem("role", data.role);

		window.location.href = "index.html";
	}
	else {
		alert(data.message);
	}
}