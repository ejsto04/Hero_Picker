var favs = [];
var least = [];
let past_favs = localStorage.getItem("favs");
let past_least = localStorage.getItem("least");
if(past_favs != null && past_favs != []){
    for(let i = 0; i < (JSON.parse(past_favs)).length; i++){
        favs.push((JSON.parse(past_favs))[i]);
    }
}
if(past_least != null && past_least != []){
    for(let i = 0; i < (JSON.parse(past_least)).length; i++){
        least.push((JSON.parse(past_least))[i]);
    }
}

