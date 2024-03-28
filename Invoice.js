import { initialRender } from "./src/js/initialRender";
import { listener } from "./src/js/listener";
import { observer } from "./src/js/observer";

class Invoice {
    init() {
        listener();
        initialRender();
        observer();
    }
}

export default Invoice;