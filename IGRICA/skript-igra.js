var tim;

var nizIgraca = [[],[]];
var trenutniIgrac = 0;

var nizPolja = [[],[],[],[],[],[],[]];
var nizResenja = [[],[],[],[],[],[],[]];

var nizPoljaPrvog = [[],[],[],[],[],[],[]]
var nizResenjaPrvog = [[],[],[],[],[],[],[]]
    
var nizPoljaDrugog = [[],[],[],[],[],[],[]]
var nizResenjaDrugog = [[],[],[],[],[],[],[]]

function swapPlayersBoards(){
    let k =setTimeout(function(){
        if(trenutniIgrac === 1){
            trenutniIgrac = 0;
            let vremeIgrac = document.getElementById("vremeLabel")
            vremeIgrac.innerText = "Vreme prvog"
            for(let i = 0; i < nizPoljaPrvog.length;i++){
                for(let j = 0; j < nizPoljaPrvog[i].length;j++){
                    let slika = document.createElement("img");
                    slika.style.width = "100%"
                    slika.style.height = "100%"
                    slika.className = "unetaSlika rounded"
                    nizPolja[i][j].innerHTML = "";
                    slika.src = nizPoljaPrvog[i][j];
                    nizPolja[i][j].appendChild(slika);
                }
            }
    
            for(let i = 0; i < nizResenjaPrvog.length;i++){
                for(let j = 0; j < nizResenjaPrvog[i].length;j++){
                    nizResenja[i][j].style.backgroundColor = nizResenjaPrvog[i][j];
                }
            }
        }
        else{
            trenutniIgrac = 1;
            let vremeIgrac = document.getElementById("vremeLabel")
            vremeIgrac.innerText = "Vreme drugog"
            for(let i = 0; i < nizPoljaDrugog.length;i++){
                for(let j = 0; j < nizPoljaDrugog[i].length;j++){
                    let slika = document.createElement("img");
                    slika.style.width = "100%"
                    slika.style.height = "100%"
                    slika.className = "unetaSlika rounded"
                    nizPolja[i][j].innerHTML = "";
                    slika.src = nizPoljaDrugog[i][j];
                    nizPolja[i][j].appendChild(slika);
                }
            }
    
            for(let i = 0; i < nizResenjaDrugog.length;i++){
                for(let j = 0; j < nizResenjaDrugog[i].length;j++){
                    nizResenja[i][j].style.backgroundColor = nizResenjaDrugog[i][j];
                }
            }
        }
    },200)
    
}
function otkrijResenje(){
    let resenje = [];
    resenje = document.getElementsByClassName("poljeKonacno");
    for(let i = 0; i < resenje.length;i++){
        let slika = document.createElement("img");
        slika.src = nizIgraca[trenutniIgrac][i];
        slika.style.width = "100%";
        slika.style.height = "100%"
        resenje[i].appendChild(slika);
    }
}
function resetuj(){
    $(".unetaSlika").remove();
    let polja = [];
    polja =  document.getElementsByClassName("poljeResenja");
    for(let i = 0; i < polja.length; i++){
        polja[i].style.backgroundColor = "black"
    }

}

$(document).ready( function(){


    let timeFirst = 60;
    let timeSecond = 60;

    let gameOn = false;
    let tekuciRed = 0;
    let tekucaKolona = 0;
    let tekuciRedResenja = 0;
   
    let nizResenjaGet = document.querySelectorAll(".poljeResenja");
    let nizPoljaGet = document.querySelectorAll(".unetoPolje");

    let nizPrvog = JSON.parse(localStorage.getItem("prvi"));
    let nizDrugog = JSON.parse(localStorage.getItem("drugi"));

    nizIgraca[0] = nizPrvog;
    nizIgraca[1] = nizDrugog;

    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 4; j++){
            nizPolja[i][j] = nizPoljaGet[i*4 + j];
        }
    }

    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 4; j++){
            nizResenja[i][j] = nizResenjaGet[i*4 + j];
        }
    }

    $("#nIgra").on("click",function(){
        tekuciRed = 0;
        tekucaKolona = 0;
        tekuciRedResenja = 0;
        timeFirst = 60;
        timeSecond = 60;
        document.getElementById("startT").disabled = false;
        document.getElementById("nIgra").disabled = true;
        gameOn = false;
        resetuj();
        window.location = "skocko-podesavanja.html"
    });

    $("#startT").on("click",function(){
        gameOn = true;
        document.getElementById("startT").disabled = true;
        document.getElementById("nIgra").disabled = false;

        tim = setInterval(function(){
            if(trenutniIgrac === 0){
                timeFirst--;
                let labl = document.getElementById("vreme");
                labl.value = timeFirst;
                if(timeFirst === 0){
                    otkrijResenje();
                    alert("Pobednik je drugi igrac!");
                    clearInterval(tim);
                }
            }
            else{
                timeSecond--;
                let labl = document.getElementById("vreme");
                labl.value = timeSecond;
                if(timeSecond === 0){
                    otkrijResenje();
                    alert("Pobednik je drugi igrac!");
                    clearInterval(tim);
                }
            }
        },1000)

    });  

    $(".unosPolja").on("click",function(){
        
        if(gameOn === true){
                let numOfReds = 0;
                let numOfYellows = 0;
                let slika = document.createElement("img");
                slika.className = "unetaSlika rounded";
                slika.src = $(this).find("img").attr("src");
                slika.style.width = "100%";
                slika.style.height = "100%";    
                nizPolja[tekuciRed][tekucaKolona].appendChild(slika);

                if(trenutniIgrac == 0){
                    nizPoljaPrvog[tekuciRed][tekucaKolona] = slika.src;
                }
                else{
                    nizPoljaDrugog[tekuciRed][tekucaKolona] = slika.src;
                }
                if(tekucaKolona == 3) {
                    numOfReds = 0;
                    numOfYellows = 0;
                    let arrayUsedFirst = [];
                    let arrayIndexFirst = 0;
                    let arrayUsedSecond = [];
                    let arrayIndexSecond = 0;

                    for(let i = 0; i < 4;i++){
                       
                        if(nizPolja[tekuciRed][i].children[0].src == nizIgraca[trenutniIgrac][i]){
                            arrayUsedFirst[arrayIndexFirst++] = i;
                            arrayUsedSecond[arrayIndexSecond++] = i;
                            numOfReds++;
                        }
                    }

                    for(let i = 0; i < 4; i++){

                        let flag2 = false;
                        for(let k = 0; k < arrayUsedFirst.length;k++){
                            if(arrayUsedFirst[k] == i) flag2 = true;
                        }

                        if(flag2 == true) continue;

                        for(let j = 0; j < 4; j++){

                            let flag1 = false;
                            for(let k = 0; k < arrayUsedSecond.length;k++){
                                if(arrayUsedSecond[k] == j) flag1 = true;
                            }

                            if(flag1 == false && nizPolja[tekuciRed][i].children[0].src == nizIgraca[trenutniIgrac][j]){
                                arrayUsedFirst[arrayIndexFirst++] = i;
                                arrayUsedSecond[arrayIndexSecond++] = j;
                                numOfYellows++;
                                break;
                            }
                        }

                    }


                    for(let i = 0; i < numOfReds; i++){
                        nizResenja[tekuciRed][i].style.backgroundColor = "red"
                    }

                    for(let i = numOfReds; i < numOfReds + numOfYellows;i++){
                
                        nizResenja[tekuciRed][i].style.backgroundColor = "yellow"
                    }

                    if(trenutniIgrac === 0){
                       for(let m = 0; m < 4; m++){
                           nizResenjaPrvog[tekuciRed][m] = nizResenja[tekuciRed][m].style.backgroundColor
                       } 
                    }
                    else{
                        for(let m = 0; m < 4; m++){
                            nizResenjaDrugog[tekuciRed][m] = nizResenja[tekuciRed][m].style.backgroundColor
                        } 
                    }
                    if(trenutniIgrac === 1) tekuciRed++;
                    if(numOfReds == 4){
                        gameOn = false;
                        let kj = setTimeout(function(){
                            otkrijResenje();
                            if(trenutniIgrac === 0){
                                alert("Pobednik je prvi igrac");
                            }
                            else{
                                alert("Pobednik je drugi igrac");
                            }
                            tekuciRed = 0;
                            tekucaKolona = 0;
                            trenutniIgrac = 0;
                            clearInterval(tim);
                            resetuj();
                        },500)
                        return;
                    }

                }

                tekucaKolona = (tekucaKolona + 1) % 4;

                if(tekuciRed == 7){
                    gameOn = false;
                    let kj = setTimeout(function(){
                        alert("Rezultat je neresen");
                        tekucaKolona = 0;
                        tekuciRed = 0;
                        trenutniIgrac = 0;
                        resetuj();
                        swapPlayersBoards();
                        clearInterval(tim);
                    },1000)
                   
                    return;
                }

                if(tekucaKolona === 0){
                    resetuj();
                    swapPlayersBoards();
                }
                
        }
    });

});