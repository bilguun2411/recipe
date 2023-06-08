require("@babel/polyfill");
import Search from './model/search';
import { elements, renderLoader,clearLoader } from './view/base';
import * as searchView from './view/searchView';
import Recipe  from './model/recipe';
import {clearRecipe,renderRecipe,highlightsSelectedRecipe } from './view/recipeView';
import List from './model/list';
import * as listView from './view/listView';
import Likes from './model/like';
import * as likesView from './view/likesView';

/**
 * webb app in tuluv 
 * hailtiin query
 * tuhain uzuulj bgaa
 * laked recipes
 * zahialj bgaa joriin nairlaguud
 */

const state = {};
//like tses g haaah



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
    //eniig load ruu shiljuulsen
    if(!state.likes) state.likes = new Likes();  
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
        renderRecipe(state.recipe, state.likes.isLiked(id));
    }
   
};

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));

window.addEventListener('load', e=> {
    //shineer page achaalagdahad uusne
    if(!state.likes) state.likes = new Likes();
    // //like tses garah esehiig haruu
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
    // // //like uud bval tses nd haruulah
    state.likes.likes.forEach(like => likesView.renderLikes(like));
})

const controlList = () =>{
    //nairlagin moedul uusgene
    state.list = new List();
    
    //umnuh utguudiig arilgana
    listView.clearList();
    //ug model ruu odo haragdaj bgaad jorno buh 
    state.recipe.ingredients.forEach(n => {
        //tuhain nairlaga iig model ruu hiine 
        const item = state.list.addItem(n);

        //tuhain nairlaga g delgetsend gargana
        listView.renderItem(item);
    });
};

const controlLike = () =>{
    //1. like iin model uusgene
    if(!state.likes) state.likes = new Likes();
    
    //2. odoo bga jor iin Id g olj avah
    const currentRecipeId = state.recipe.id;
    //3. like lsan esehiig shalgah
    if( state.likes.isLiked(currentRecipeId)) {
        //4.1 like g ni boliulna
        state.likes.deleteLike(currentRecipeId);
        //likeslan baidliig boliulah
        likesView.toggleLikeBtn(false);
        //like iin tsenees ystagan
        likesView.deleteLike(currentRecipeId)
        
        // console.log(state.likes)
    } else {
        //4.2 like ld ugnu
        
        const newLike = state.likes.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image_url);
        likesView.toggleLikeBtn(true);
        likesView.renderLikes(newLike)
        likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
    }
    console.log(state.likes);
   
    
}

elements.recipeDiv.addEventListener('click', e =>{
    if(e.target.matches('.recipe__btn, .recipe__btn *')){
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
})

elements.shoppingList.addEventListener('click', e =>{
    //data_itemid iin attribute g 
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //oldson id tei elemnt g ustgana 
    state.list.deleteItem(id);

    //delgetsnees ustgana
    listView.deleteItem(id);

    // obj.dataset.item
    // console.log(obj.dataset.itemid)
})