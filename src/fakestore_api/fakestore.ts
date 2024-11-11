type TProduct = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string; 
}
const URL = "https://fakestoreapi.com/products";

fetch(URL)
    .then((response: Response) => {
        if (!response.ok) {
            console.error("Response doesn´t work");
            throw new Error("Netzwerk Antwort ist negativ")
        }
        return response.json();
    })
    .then((product: TProduct[]) => {
        console.log(product);
        displayProducts(product)
    })
    .catch((error: Error) => {
        console.error("Fetch Fehler gemeldet", error);
    });

function displayProducts(products: TProduct[]) {
    const productList = document.getElementById('product-list');
    if (!productList) return; 
    productList.innerHTML = " ";
    products.forEach((product: TProduct) => {
        const productCard = document.createElement("div")
        productCard.innerHTML= `
            <img src="${product.image} alt= "${product.title}>
            <h2>${product.title}</h2>
            <p>${product.price.toFixed(2)}</p>
            `;
            productList.appendChild(productCard)
    })
}