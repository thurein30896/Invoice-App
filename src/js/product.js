import { productGroup, productSelect } from "./selector";

export const createProduct = (name,price) => {
    const productTemplate = document.querySelector("#productTemplate");
    const product = productTemplate.content.cloneNode(true);
    product.querySelector(".product-name").innerText = name;
    product.querySelector(".product-price").innerText = price;
    return product;
}

export const productRender = (products) => {
    productSelect.innerText = "";
    productGroup.innerText = "";
    products.forEach(({id,name,price}) => {
        productSelect.append(new Option(name,id));
        productGroup.append(createProduct(name,price));
    })
}