import { create } from 'lodash';
import { elements } from './base.js'

//Private 
const renderRecipe = recipe =>{
    //console.log(recipe.title);
    const markup = `
    <li>
                    <a class="results__link results__link" href=${recipe.recipe_id}>
                        <figure class="results__fig">
                            <img src=${recipe.image_url} alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend',markup);
};
export const clearSearchQuery = () =>{
    elements.searchInput.value ='';
}
export const clearSearchResult = () =>{
    elements.searchResultList.innerHTML = '';
    elements.searchButton.innerHTML = '';
}
export const getInput = () => elements.searchInput.value ;
export const renderRecipes = (recipes,currentPage=1,resPerPage=5) =>{
    //hailtiin ur dung huudaslaj uzuuleh
    const start =(currentPage-1) *resPerPage;
    const end  = currentPage * resPerPage;
    recipes.slice(start,end).forEach(renderRecipe);

    //huadsnii tovch gargaj ireh
    const totalPages = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage,totalPages);
    
};
//type ==> prev , next
const createButton = (page , type,direction) => 
    `<button class="btn-inline results__btn--${type}" data-goto=${page}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${direction}"></use>
        </svg>
        <span>Хуудас ${page}</span>
    </button>`;

const renderButtons = (currentPage,totalPages) =>{
    let button ; 
    if(currentPage ===1 && totalPages>1 ){
        //ehnii huudas 
        button = createButton(2,'next','right')
    } else if ( currentPage < totalPages){
        //umnuh daraagin huudas
        button = createButton(currentPage-1,'prev','left')
        button += createButton(currentPage+1,'next','right')
    } else if (currentPage = totalPages){
        //suuliind huudas 
        button = createButton(currentPage-1,'prev','left')
    }

    elements.searchButton.insertAdjacentHTML('afterbegin',button);
    
};

