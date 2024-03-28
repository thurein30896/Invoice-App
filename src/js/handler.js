import { createRow, deleteRow, totalCost, updateQuantity } from "./function";
import { productRender } from "./product";
import { createForm, newProductForm, recordGroup } from "./selector";
import products from "./variable";
import Swal from 'sweetalert2';

export const printBtnHandler = () => {
    print();
}

export const createFormHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(createForm);
    const currentProductId = parseInt(formData.get("productName"));
    const currentProduct = products.find((product) => product.id === currentProductId);
    const currentQuantity = parseInt(formData.get("productPrice"));
    const isExistedRow= recordGroup.querySelector(
        `[row-id= '${currentProductId}']`
      );
    if(isExistedRow){
        updateQuantity(isExistedRow.getAttribute("row-id"),currentQuantity);
    }else{
        recordGroup.append(createRow(currentProduct,currentQuantity));
        // totalCost();
    }
    createForm.reset();
}

export const recordGroupHandler = (e) => {
    if(e.target.classList.contains("row-del-btn")){
        deleteRow(e);
    }else if(e.target.classList.contains("q-sub")){
        updateQuantity(e.target.closest(".row").getAttribute("row-id"),-1);
    }else if(e.target.classList.contains("q-add")){
        updateQuantity(e.target.closest(".row").getAttribute("row-id"),1);
    }
}


export const newProductFormHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(newProductForm);
    const newProduct = {
        id : Date.now(),
        name : formData.get("new_product_name"),
        price : formData.get("new_product_price")
    }
    products.push(newProduct);
    

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Product add successfully"
      });
      productRender(products);
      newProductForm.reset();
}