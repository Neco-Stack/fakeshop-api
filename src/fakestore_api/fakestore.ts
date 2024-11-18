type TProduct = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string; 
}
const URL = "https://fakestoreapi.com/products";
let allProducts: TProduct[] = [];

fetch(URL)
    .then((response: Response) => {
        if (!response.ok) {
            console.error("Response doesn´t work");
            throw new Error("Netzwerk Antwort ist negativ")
        }
        return response.json();
    })
    .then((product: TProduct[]) => {
        allProducts = product
        console.log(product);
        displayProducts(product)
        createFilterButtons()
    })
    .catch((error: Error) => {
        console.error("Fetch API Fehler wurde gemeldet", error);
    });

function displayProducts(products: TProduct[]) {
    const productList = document.getElementById('product-list');
    if (!productList) return; 
    productList.innerHTML = " ";
    products.forEach((product: TProduct) => {
        const productCard = document.createElement("div")
        productCard.innerHTML= `
            <img src="${product.image}" alt= "${product.title}">
            <h2>${product.title}</h2>
            <p>${product.price.toFixed(2)}</p>
            `;
            productList.appendChild(productCard)
    })
}

function createFilterButtons() {
    const filterContainer = document.getElementById("filter-container");
    if (!filterContainer) return;
    const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];
    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.addEventListener("click", () => filterByCategory(category));
        filterContainer.appendChild(button)
    })
}
function filterByCategory(category: string){
    let filteredProducts: TProduct[];
    if (category === "all"){
        filteredProducts = allProducts; 
    } else {
        filteredProducts = allProducts.filter(product => product.category === category);
    }
    displayProducts(filteredProducts)
}



