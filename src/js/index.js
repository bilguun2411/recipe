require("@babel/polyfill");
import Search from './model/search';
import { elements, renderLoader,clearLoader } from './view/base';
import * as searchView from './view/searchView';
import Recipe  from './model/recipe';
import {clearRecipe,renderRecipe,highlightsSelectedRecipe } from './view/recipeView';
import List from './model/list';
import * as listView from './view/listView';

/**
 * webb app in tuluv 
 * hailtiin query
 * tuhain uzuulj bgaa
 * laked recipes
 * zahialj bgaa joriin nairlaguud
 */

const state = {};

const controlSearch = async () => {
    
    //1.eb s hailtiin tlhuur ug avna
    const query = searchView.getInput();
    
    if(query){
         // 2) Шинээр хайлтын обьектийг үүсгэж өгнө.
        state.search = new Search(query);

        // 3) Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ.
        searchView.clearSearchQuery();
        searchView.clearSearchResult();
        renderLoader(elements.searchResulstDiv);
        // 4) Хайлтыг гүйцэтгэнэ
        await state.search.getResult();
       
        // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
        clearLoader();
        
        if(state.search.result === undefined ) alert("bhgui")
        else searchView.renderRecipes(state.search.result);
        //console.log(state.search.result);
    }
};

elements.searchFrom.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
} );

elements.searchButton.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goto = parseInt(btn.dataset.goto,10);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result,goto)
    }
} );


///joriin controller 

///hash g barij uguh 
const controlRecipe = async () => {
    //1.url s id g salgaj avna
    const id = window.location.hash.replace("#","");
    if(id){
         // console.log(id);

        //2.joriin model g uusgej ugnu
        state.recipe= new Recipe(id)
        //3.UI delgeteiig betlgene
        clearRecipe();
        renderLoader(elements.recipeDiv);
        highlightsSelectedRecipe(id);
        //4joriig tataj avch irne
        await state.recipe.getRecipe();
        //5.jor guitseh hugatsaa bolon orts tootsno 
        clearLoader();
        state.recipe.calcTime();
        state.recipe.calcQty();
        //6.joroo uzuulne
        renderRecipe(state.recipe);
    }
   
};

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));

const controlList = () =>{
    //nairlagin moedul uusgene
    state.list = new List();
    listView.clearList();
    //ug model ruu odo haragdaj bgaad jorno buh 
    state.recipe.ingredients.forEach(n => {
        state.list.addItem(n);
        listView.renderItem(n);
    });
};

elements.recipeDiv.addEventListener('click', e =>{
    if(e.target.matches('.recipe__btn, .recipe__btn *')){
        controlList();
    }
})