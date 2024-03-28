import { recordGroup, recordTotal } from "./selector";
import Swal from 'sweetalert2';

export const createRow = ({id,name,price},quantity) => {
    const cost = price * quantity;
    const recordTemplate = document.querySelector("#recordTemplate");
    const row = recordTemplate.content.cloneNode(true);
    const rowUi = row.querySelector(".row");
    rowUi.setAttribute("row-id",id);
    const productName = row.querySelector(".row-name");
    const productQuantity = row.querySelector(".row-quantity");
    const productPrice = row.querySelector(".row-price");
    const rowCost = row.querySelector(".row-cost");

    productName.innerText = name;
    productQuantity.innerText = quantity;
    productPrice.innerText = price;
    rowCost.innerText = cost;
    return row;
}

export const totalCost = () => {
    const cost = document.querySelectorAll(".row-cost");
    const total = [...cost].reduce((pv,cv) => pv + parseFloat(cv.innerText) ,0);
    recordTotal.innerText = total;
}

export const deleteRow = (e) => {
    const row = e.target.closest(".row");
    row.classList.remove("animate__backInDown")
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            row.classList.add("animate__backOutDown");
            row.addEventListener("animationend",() => {
                row.classList.remove("animate__backOutDown");
                row.remove();
                // totalCost();
            })
        }
      });
}

export const updateQuantity = (productId,q) => {
    const row = document.querySelector(`[row-id='${productId}']`)
    const currentQuantity = row.querySelector(".row-quantity");
    const currentCost = row.querySelector(".row-cost");
    const currentPrice = row.querySelector(".row-price");
    if(q > 0 || currentQuantity.innerText > 1){
        currentQuantity.innerText = parseInt(currentQuantity.innerText) + q;
        currentCost.innerText = currentQuantity.innerText * currentPrice.innerText;
        // totalCost();
    }
}


export const recordObserver = () => {
    const run = () => {
      // console.log("U change row group");
      totalCost();
    };
  
    const observerOption = {
      childList: true,
      subtree: true,
    };
  
    const observer = new MutationObserver(run);
  
    observer.observe(recordGroup, observerOption);
  };