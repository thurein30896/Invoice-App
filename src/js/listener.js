import { createFormHandler, newProductFormHandler, printBtnHandler, recordGroupHandler } from "./handler"
import { createForm, newProductForm, printBtn, recordGroup } from "./selector"

export const listener = () => {
    createForm.addEventListener("submit",createFormHandler);
    recordGroup.addEventListener("click",recordGroupHandler);
    newProductForm.addEventListener("submit",newProductFormHandler);
    printBtn.addEventListener("click",printBtnHandler);
}