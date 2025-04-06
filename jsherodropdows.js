var cur_team_e = [0,0,0,0,0,0];
var cur_team_a = [0,0,0,0,0,0];

for(var x = 0; x < 2; x++)
    {
        let team;
        if(x == 0){
            team = "e";
        } else {
            team = "a";
        }
        function addDrop(dropdown){
            const ul = document.createElement("ul");
            ul.class = "dropdown-menu";
            for(var i = 1; i < heros.length+1; i++)
                {
                    const opt = document.createElement("option");
                    const form = document.createElement("div");
                    form.className = "form-check";
                    const input = document.createElement("input");
                    input.class = "form-check-input";
                    input.type = "radio";
                    input.name = "flexRadioDefault";
                    input.id = "flexRadioDefault" + i;
                    input.setAttribute("checked", "");
                    input.value = heros[i-1].hero_file_name;
                    const label = document.createElement("label");
                    label.id = "form-check-label";
                    label.setAttribute("for", "flexRadioDefault"+i);
                    form.appendChild(input);
                    form.appendChild(label);
                    ul.appendChild(form);
                    form.textContent = heros[i-1].hero_name;
                    opt.appendChild(form)
                    dropdown.appendChild(opt);
                }
                const newOption = document.createElement("option");
                newOption.value = "newOption";
                newOption.textContent = "New Option";
                dropdown.appendChild(newOption);     
        }
        for(let j = 1; j < 7; j++)
        {
            const dropdown = document.createElement("select");
            dropdown.id = (team+"_hero_picker_"+j);
            const sel = document.createElement("option");
            sel.value = ("default");
            sel.textContent = ("Pick a hero");
            dropdown.appendChild(sel);
            addDrop(dropdown);
            const pic = document.getElementById(team+"_hero_pic_"+j);
            const col = document.getElementById(team+"_hero_col_"+j);
            col.appendChild(dropdown);
            dropdown.addEventListener("change", function() {
                let sel_hero = dropdown.value;
                let file_hero = " ";
                for(let i = 0; i < heros.length; i++){
                    if(sel_hero == heros[i].hero_name){
                        file_hero = heros[i].hero_file_name;
                        if(team == 'e')
                        {
                            cur_team_e[j-1] = heros[i]
                        } else {
                            cur_team_a[j-1] = heros[i]
                        }
                    }
                }
                if(file_hero != " "){
                        pic.src = "Hero_pics\\"+file_hero+"_Tile.png";
                } else {
                    console.log("character not found");
                }
            
            });
        }
    
    }

    for(let i = 0; i < 2; i++){
        let p;
        if(i == 0){
            p = "fav";
        } else {
            p = "les";
        }
    const dropdown = document.createElement("select");
    dropdown.id = (p+"_hero_picker");
    const sel = document.createElement("option");
    sel.value = ("default");
    sel.textContent = ("Pick a hero");
    dropdown.appendChild(sel);
    addDrop(dropdown);
    const col = document.getElementById(p+"_hero_col");
    col.appendChild(dropdown);
    if(i == 0){    
    const fav_btn = document.getElementById("fav_btn");
        fav_btn.addEventListener("click", function() {
            let sel_hero = dropdown.value;
            for(let i = 0; i < heros.length; i++){
                if(sel_hero == heros[i].hero_name){
                    let dup = false;
                    let favs_len = 0
                    if(favs[0] != null){
                        favs_len = favs.length;
                    }
                    for(let x = 0; x < favs_len; x++){
                        if(sel_hero == favs[x]){
                            dup = true;
                        }
                    }
                    if(!dup){
                    // favs.push(heros[i].hero_name);
                    favs.push(heros[i]);
                    localStorage.setItem("favs", JSON.stringify(favs));
                    }
                }
            }
        });
    } else {
        const les_btn = document.getElementById("les_btn");
        les_btn.addEventListener("click", function() {
            let sel_hero = dropdown.value;
            for(let i = 0; i < heros.length; i++){
                if(sel_hero == heros[i].hero_name){
                    let dup = false;
                    let least_len = 0
                    if(least != null){
                        least_len = least.length;
                    }
                    for(let x = 0; x < least_len; x++){
                        if(sel_hero == least[x]){
                            dup = true;
                        }
                    }
                    if(!dup){
                    // least.push(heros[i].hero_name);
                    least.push(heros[i]);
                    localStorage.setItem("least", JSON.stringify(least));
                    }
                }
            }
        });
    }
    }