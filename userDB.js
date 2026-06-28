let API = "https://back-end-project-1-production.up.railway.app/products-api";
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
            </div>
        `;
	});
}

loadProducts()

setInterval(() => {
	loadProducts()
}, 1000);