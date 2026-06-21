let API = "http://127.0.0.1:8000/auth-api";

async function createUser(username, email, password, role) {
	let response = await fetch(
		`${API}/signup?username=${username}&email=${email}&password=${password}&role=${role}`,
		{
			method: "POST"
		}
	);

	let data = await response.json();
	console.log(data);
}

async function handleSignup(event) {
	event.preventDefault();

	let username = document.querySelector("#username").value;
	let email = document.querySelector("#email").value;
	let password = document.querySelector("#password").value;
	let confirmPassword = document.querySelector("#confirmPassword").value;
	let role = document.querySelector("#role").value;

	if (password !== confirmPassword) {
		alert("Passwords do not match");
		return;
	}

	if (role === "admin") {
		role = 1;
	}
	else {
		role = 0;
	}

	await createUser(
		username,
		email,
		password,
		role
	);

	document.querySelector("#username").value = "";
	document.querySelector("#email").value = "";
	document.querySelector("#password").value = "";
	document.querySelector("#confirmPassword").value = "";
	document.querySelector("#role").selectedIndex = 0;

	window.location.href = "login.html";
}