const table = [];
const babuk = ["", "X", "O", "F", "H"]
let kijon = 1;
let jatekosokszama = 2;
let nyert = 0;
let meddigjatszuk = 3;

// Tábla feltöltése
for(let i = 0; i < 9; i++){
    table.push([])
    for(let j = 0; j < 9; j++){
        table[i].push([])
        for(let k = 0; k < 3; k++){
            table[i][j].push(0);
        }
    }
}

megjelenit();
//Teszt();
function Teszt(){
     /* ÁtlóVizsgálat */
     let vege = false;
     console.log(table.length + maxTableRowLength(table));
     for(let g = 0; g < (table.length + maxTableRowLength(table)) && !vege; g++){
        for(let i = 0, j = 1 - table.length + g; i < table.length + g && !vege; i++ , j++){
            try {
                table[i][j][0] = 3;
            } catch (error) {
                 
            }
            try {
               // table[i][maxTableRowLength(table) - j][0] = 4;
            } catch (error) {
                
            }
            //vege = tobbmint3(lenni);
        }
        mem = [0, 0, 0, 0];
    }
    megjelenit();
}

function megjelenit(){
    let s = "<table>";
    for(let i = 0; i < table.length; i++){
        s+="<tr>";
        for(let j= 0; j < table[i].length; j++){
            s+=`<td onclick=\"lep(${i}, ${j})\" class=\"negyzet borda feher\">${babuk[table[i][j][0]]}</td>`;
        }
        s+="</tr>";
    }
    s+="</table>";
    document.getElementsByClassName("amoba")[0].innerHTML = s;
}

function lep(mezoX, mezoY){
    //console.log(event.target);
    //event.target.innerHTML = "X";
    if(table[mezoX][mezoY][0] == 0){
        table[mezoX][mezoY][0] = kijon;
        JatekosLepett();
        megjelenit();
        nyert = vizsgal();
        document.getElementsByClassName("kinyert")[0].innerHTML = nyert =! 0 ? `${nyert}. Játékos` : "Senki";
    }
}

function JatekosLepett(){
    kijon = kijon >= jatekosokszama ? 1 : kijon + 1;
    if(kijon == 2){ // Gép lép
        let arr = keresUres();
        lep(arr[0], arr[1]);
        kijon = 1;
    }
}

function keresUres(){
    let talal = false;
    for(var i = 0; i < table.length && !talal; i++){
        for(var j= 0; j < table[i].length && !talal; j++){
            talal = table[i][j][0] == 0;
        }
    }
    return [i-1, j-1];
}
function vizsgal(){
    let vege = false;
    let lenni = [0, 0, 0, 0];
    let mem = [0, 0, 0, 0];
    let kinyertvalojaban = 0;
    // KeresztX
    // KeresztY
    for(let i = 0; i < table.length && !vege; i++){
        mem = [0, 0, 0, 0];
        for(let j = 0; j < table[i].length && !vege; j++){
            lenni[0] = mem[0] != 0 && table[i][j][0] == mem[0] ? lenni[0] + 1 : table[i][j][0] > 0 ? 1 : 0;
            lenni[1] = mem[1] != 0 && table[j][i][0] == mem[1] ? lenni[1] + 1 : table[j][i][0] > 0 ? 1 : 0;
            mem[0] = table[i][j][0];
            mem[1] = table[j][i][0];
            console.log(lenni, mem)
            vege = tobbmint3(lenni);
            kinyertvalojaban = nyertvalaki(lenni, mem);
        }
    }
    // ÁtlóVizsgálat
    for(let g = 0; g < (table.length + maxTableRowLength(table)) && !vege; g++){
        mem = [0, 0, 0, 0];
        for(let i = 0, j = 1 - table.length + g; i < table.length + g && !vege; i++ , j++){
            try {
                 lenni[2] = mem[2] != 0 && table[i][j][0] == mem[2] ? 
                    lenni[2] + 1 : table[i][j][0] > 0 ? 1 : 0; // Főátló
                 mem[2] = table[i][j][0];
                // table[i][j][0] = 3;
            } catch (error) {
                
            }
            try {
                lenni[3] = mem[3] != 0 && table[i][maxTableRowLength(table) - j][0] == mem[3] ?
                    lenni[3] + 1 : table[i][maxTableRowLength(table) - j][0] > 0 ? 1 : 0; // Mellékátló
                mem[3] = table[i][maxTableRowLength(table) - j][0];
               // table[i][maxTableRowLength(table) - j][0] = 4;
            } catch (error) {
                console.log("Ezt beszoptam.")
            }
            vege = tobbmint3(lenni);
            kinyertvalojaban = nyertvalaki(lenni, mem);
        }
    }
    return kinyertvalojaban;
}

function tobbmint3(lenni){
    let van = false;
    for(let i = 0; i < lenni.length && !van; i++){
        van = lenni[i] >= meddigjatszuk;
    }
    return van; 
}

function nyertvalaki(lenni, mem){
    let van = false;
    let kinyertvalojaban = 0;
    for(let i = 0; i < lenni.length && !van; i++){
        kinyertvalojaban = lenni[i] >= meddigjatszuk ? mem[i] : 0;
        van = true;
    }
    return kinyertvalojaban;
}

function maxTableRowLength(matrix){
    maxValue = matrix[0].length;
    for(let i = 1; i < matrix.length; i++){
        maxValue = maxValue < matrix[i].length ? matrix[i].length : maxValue;
    }
    return maxValue;
}