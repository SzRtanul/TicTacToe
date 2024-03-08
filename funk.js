const table = [];
const babuk = ["", "X", "O"]
let kijon = 1;
let jatekosokszama = 2;

for(let i = 0; i<3; i++){
    table.push([])
    for(let j = 0; j<3; j++){
        table[i].push([])
        for(let k = 0; k<3; k++){
            table[i][j].push(0);
        }
    }
}

megjelenit();
function megjelenit(){
    let s = "<table>";
    for(let i = 0; i < table.length; i++){
        s+="<tr>";
        for(let j= 0; j < table.length; j++){
            console.log(table[i][j][0])
            s+=`<td onclick=\"lep(${i}, ${j})\" class=\"negyzet borda feher\">${babuk[table[i][j][0]]}</td>`;
        }
        s+="</tr>";
    }
    document.getElementsByClassName("amoba")[0].innerHTML = s;
}
function lep(mezoX, mezoY){
    //console.log(event.target);
    //event.target.innerHTML = "X";
    if(kijon==1 && table[mezoX][mezoY][0] == 0){
        console.log()
        table[mezoX][mezoY][0] = kijon;
        megjelenit();
    }
}

function JatekosLepett(){
    kijon = kijon >= jatekosokszama ? 1 : kijon + 1;
    if(kijon == 2){
        lep(keresUres()[0], keresUres()[1])
        kijon = 1;
    }
}

function keresUres(){
    let talal = false;
    for(var i = 0; i < table.length && !talal; i++){
        for(var j= 0; j < table.length && !talal; j++){
            talal = table[i][j][0] == 0;
        }
    }
    return i, j;
}