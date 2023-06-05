export default class Likes {
    constructor(){
        this.likes =[]
    }

    addLike (id, title, author, img) {
        const like = {id , title, author, img}
        this.likes.push(like);
        return like;
    }

    deleteLike (id){
        // id gedeg Id tei ortsiin index g massive s olno
        const index = this.likes.findIndex(el=> el.id === id);
        //ug index deerh element g ustgana
        this.likes.splice(index,1);
    }

    isLiked(id){
         return this.likes.findIndex(el=>el.id===id) !== -1 ;
    }

    getNumberOfLikes () {
        return this.likes.length;
    }

}