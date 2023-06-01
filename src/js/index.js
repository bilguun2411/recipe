require("@babel/polyfill");
import Search from './model/search';



let search  = new Search("pasta");

search.getResult().then(r=>console.log(r));

