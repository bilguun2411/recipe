export default class Likes {
    constructor(){
        this.readDataFromLocalStorage();
        if(!this.likes) this.likes =[];
        // this.likes =[];
    }

    addLike (id, title, author, img) {
        const like = {id , title, author, img}
        this.likes.push(like);
        //storage ruu save 
        this.saveDataToLocalStorage();
        return like;
    }

    deleteLike (id){
        // id gedeg Id tei ortsiin index g massive s olno
        const index = this.likes.findIndex(el=> el.id === id);
        //ug index deerh element g ustgana
        this.likes.splice(index,1);

        //storage ruu hadgalna
        this.saveDataToLocalStorage();
    }

    isLiked(id){
         return this.likes.findIndex(el => el.id===id) !== -1 ;
    }

    getNumberOfLikes () {
        return this.likes.length;
    }

    saveDataToLocalStorage () {
        localStorage.setItem("likes", JSON.stringify(this.likes) );
    }

    readDataFromLocalStorage(){
        this.likes = JSON.parse(localStorage.getItem('likes'));
    }
    

}