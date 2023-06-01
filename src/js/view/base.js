export const elements = {
    searchFrom: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    searchResulstDiv: document.querySelector(".results"),
    searchResultList: document.querySelector(".results__list"),
    
};
export const elementString = {
    loader: 'loader'
}

export const clearLoader = () =>{
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}

export const renderLoader = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"</use>
            </svg>
        </div>
    `;
    
    parent.insertAdjacentHTML("afterbegin",loader);
};
