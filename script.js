import Model from "./Model.js";
import View from "./View.js";

class Controller {
    constructor() {
        this._model = new Model();
        this._view = new View();
        this.controllUser();
    }

    controllUser() {
        const searchInput = document.querySelector(".searchContainer__input");
        searchInput.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                this._view.render(this._model.getUserData(searchInput.value));
                searchInput.value = "";
            }
        });
    }
}

new Controller();
