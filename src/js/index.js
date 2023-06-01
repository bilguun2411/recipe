require("@babel/polyfill");
import Search from './model/search';
import { elements, renderLoader,clearLoader } from './view/base';
import * as searchView from './view/searchView';

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

