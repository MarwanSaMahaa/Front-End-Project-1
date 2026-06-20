let popups = document.querySelector(".popups");
let editPopup = document.querySelector(".edit-popup");
let delPopup = document.querySelector(".delete-popup");
let createPopup = document.querySelector(".create-popup");
let currentProduct = "";

function editModal() {
	popups.classList.toggle("hidden");
	editPopup.classList.toggle("hidden");
}

function delModal() {
	popups.classList.toggle("hidden");
	delPopup.classList.toggle("hidden");
}

function createModal() {
	popups.classList.toggle("hidden");
	createPopup.classList.toggle("hidden");
}

let API = "https://back-end-project-1-production.up.railway.app/products-api";

async function getProducts() {
	let response = await fetch(`${API}/products`);
	let data = await response.json();
	console.log(data);
}

async function getProduct(name) {
	let response = await fetch(`${API}/product?name=${name}`);
	let data = await response.json();
	console.log(data);
}

async function createProduct(name, price, quantity) {
	let response = await fetch(
		`${API}/product?name=${name}&price=${price}&quantity=${quantity}`, {
			method: "POST"
		}
	);

	let data = await response.json();
	console.log(data);
}

async function updateProduct(oldName, newName, price, quantity) {
	let response = await fetch(
		`${API}/product?old_name=${oldName}&new_name=${newName}&price=${price}&quantity=${quantity}`, {
			method: "PUT"
		}
	);

	let data = await response.json();
	console.log(data);
}

async function deleteProduct(name) {
	let response = await fetch(`${API}/product?name=${name}`, {
		method: "DELETE"
	});

	let data = await response.json();
	console.log(data);
}

let container = document.querySelector(".card-container");

async function loadProducts() {
	let response = await fetch(`${API}/products`);
	let data = await response.json();

	container.innerHTML = "";

	if (data.length === 0) {
		container.innerHTML = `
        <p class="no-products">
            No products found, Create a product.
        </p>
    `;
		return;
	}
	data.forEach(product => {
		container.innerHTML += `
            <div class="card">
                <div class="left-side">
                    <p class="name">${product[0]}</p>

                    <div class="product-info">
                        <p class="price">
                            <span class="gray">Price: </span>$${product[1]}
                        </p>

                        <p class="quantity">
                            <span class="gray">Quantity: </span>${product[2]}
                        </p>
                    </div>
                </div>

                <div class="icons">
    <i
        onclick="startEdit('${product[0]}', '${product[1]}', '${product[2]}')"
        class="fa-regular fa-pen-to-square">
    </i>

    <i
        onclick="startDelete('${product[0]}')"
        class="fa-solid fa-trash-can">
    </i>
</div>
            </div>
        `;
	});
}

async function handleCreateProduct(event) {
	event.preventDefault();

	let name = document.querySelector(".create-popup .name-input").value;
	let price = document.querySelector(".create-popup .price-input").value;
	let quantity = document.querySelector(".create-popup .quantity-input").value;

	await createProduct(name, price, quantity);

	createModal();
	loadProducts();

	document.querySelector(".create-popup .name-input").value = "";
	document.querySelector(".create-popup .price-input").value = "";
	document.querySelector(".create-popup .quantity-input").value = "";
}

loadProducts();

function startEdit(name, price, quantity) {
	currentProduct = name;

	document.querySelector(".edit-name-input").value = name;
	document.querySelector(".edit-price-input").value = price;
	document.querySelector(".edit-quantity-input").value = quantity;

	editModal();
}

function startDelete(name) {
	currentProduct = name;
	delModal();
}

async function handleEditProduct(event) {
	event.preventDefault();

	let newName = document.querySelector(".edit-name-input").value;
	let price = document.querySelector(".edit-price-input").value;
	let quantity = document.querySelector(".edit-quantity-input").value;

	await updateProduct(
		currentProduct,
		newName,
		price,
		quantity
	);

	editModal();
	loadProducts();
}

async function confirmDelete() {
	await deleteProduct(currentProduct);

	delModal();
	loadProducts();
}