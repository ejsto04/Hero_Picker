const rand_button = document.getElementById("rand_generate");
rand_button.addEventListener("click", function() {
    let num = Math.random()*(heros.length-1);
    num = Math.round(num);
    const r_pic = document.getElementById("rand_hero_pic");
    let cur = r_pic.src;
    let ind = cur.indexOf("_Tile");
    cur = cur.substring(41,ind)
    while(cur == heros[num].hero_file_name){
        num = Math.random()*(heros.length-1);
        num = Math.round(num);
    }
    r_pic.src = "Hero_pics\\"+heros[num].hero_file_name+"_Tile.png";
});

const gen_btn = document.getElementById("main_gen");
gen_btn.addEventListener("click", function() {
    let user_sel_char;
    let role = strat;
    let rec_role = "Strategist";
    if(cur_team_a.length < 6){
        user_sel_char = false;
    } else {
        user_sel_char = true;
    }
    let a_strat = 0;
    let a_van = 0;
    let a_duel = 0;
    let e_strat = 0;
    let e_van = 0;
    let e_duel = 0;
    let dive_count = 0;
    let poke_count = 0;
    let brawl_count = 0;
    let sug_type = 0;

    for(let i = 0; i < cur_team_e.length;i++){
        if(cur_team_e[i] != 0){
            let type = cur_team_e[i].hero_role;
            if(type == "brawl"){
                brawl_count++
            } else if (type == "poke"){
                poke_count++;
            } else {
                dive_count++;
            }
        }
    }

    if(poke_count > brawl_count && poke_count > dive_count){
        sug_type = dive;
    } 

    if(dive_count > brawl_count && dive_count > poke_count){
        sug_type = brawl;
    }

    if(brawl_count > poke_count && brawl_count > dive_count){
        sug_type = poke;
    } 
    let a_len = cur_team_a.length;
    if(user_sel_char){
        a_len--;
    }
    for(let i = 0; i < a_len; i++){
        if(cur_team_a[i] != 0){
            let role = cur_team_a[i].hero_class;
            if(role == "Strategist"){
                a_strat++;
            } else if (role == "Vanguard"){
                a_van++;
            } else {
                a_duel++;
            }
        }
    }

    for(let i = 0; i < cur_team_e.length; i++){
        if(cur_team_e[i] != 0){
            let role = cur_team_e[i].hero_class;
            if(role == "Strategist"){
                e_strat++;
            } else if (role == "Vanguard"){
                e_van++;
            } else {
                e_duel++;
            }
        }
    }

    if(a_strat == 2){
        if(a_van == 2){
            rec_role = "Duelist";
            role = duel;
        } else if(a_duel == 2){
            rec_role = "Vanguard";
            role = van;
        } 
    }

    if(a_strat != 0){
        if(a_van == 0){
            rec_role = "Vanguard";
            role = van;
        } else if (a_duel == 0){
        rec_role = "Duelist";
        role = duel;
        }
    }

    if(a_strat >= 3){
        if(a_duel == 2){
            rec_role = "Vanguard";
            role = van;
        } else {
            rec_role = "Duelist";
            role = duel;
        }
    }

    let sugs = [];

    if(sug_type != 0){
        for(let i= 0; i < role.length;i++){
            for(let j = 0; j < sug_type.length; j++){
                if(role[i].hero_name == sug_type[j].hero_name){
                    sugs.push(role[i]);
                }
            }
        }
    } else {
    sugs = role;
    }
    
    console.log("You should play a : " + rec_role);
    getHero(sugs, rec_role);
});

function getHero(role, h_class){
    const reason = document.getElementById("reason");
    const best = document.getElementById("best");
    const suggest = document.getElementById("suggest");
    role1 = role.slice();
    let tup = 0;
    
    for(let i = 0; i < cur_team_a.length; i++){
        for(let x = 0; x < role1.length; x++){
            if(role1[x].hero_name == cur_team_a[i].hero_name){
                role1.splice(x,1);
            }
        }
    }
    //let sug_hero = role1[0];
    suggest.textContent = "You could play: ";
    if(role1.length == 0){
        suggest.insertAdjacentText('beforeend', "anyone");
    } else {
        for(let i = 0; i < role1.length; i++){
            if(i < role1.length-1){
                suggest.insertAdjacentText('beforeend', role1[i].hero_name+", ");
            } else {
                suggest.insertAdjacentText('beforeend', role1[i].hero_name);
            }
        }
    }

    let sug_hero = [];
    for(let i = 0; i < cur_team_a.length-1; i++){
        if(cur_team_a[i] != 0){
            for(let x = 0; x < cur_team_a[i].teamup.length; x++){
                for(let p = 0; p < role1.length; p++){
                    if(cur_team_a[i].teamup[x] == role1[p].hero_name){
                        sug_hero.push(role1[p]);
                        tup = 1;
                    }
                }
            }
        }
    }
    if(tup == 0){
        sug_hero = role1;
    }

    if(sug_hero.length>1){
        for(let i = 0; i < sug_hero.length; i++){
            if(least.includes(sug_hero[i].hero_name)){
                sug_hero.splice(i,i);
                i--;
            }
        }
    }
    let max_wp = [-1,-1];
    for(let i = 0; i < sug_hero.length; i++){
        if(sug_hero[i].win_rate > max_wp[0]){
            max_wp[0] = sug_hero[i].win_rate;
            max_wp[1] = i;
        }
    }
    let best_pick = sug_hero[max_wp[1]];
        for(let i = 0; i < favs.length; i++){
            if(role1.includes(favs[i])){
                best_pick = favs[i];
            }
    }
    if(role1.length == 0 && favs.length != 0 ){
        best_pick = favs[0];
    } else if (role1.length == 0){
        best_pick = heros[20];
    }
     
    best.textContent = "The best pick is: "+best_pick.hero_name;


    reason.textContent = "Because: ";
    if(tup == 0){
        
        reason.insertAdjacentText('beforeend', "There are no teamups");
    } else {
        reason.insertAdjacentText('beforeend', "This character has a good teamup");
    }

    const user_drop = document.getElementById("a_hero_picker_6")
    user_drop.value = best_pick.hero_name;
    const user_hero = document.getElementById("a_hero_pic_6");
    user_hero.src = "Hero_pics\\"+best_pick.hero_file_name+"_Tile.png";
}


