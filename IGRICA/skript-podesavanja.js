

var nizPrvog = [];
var nizDrugog = [];

var isReady = false;

let tekuci = 1;
let brojIzbora= 0;


function resetuj(){
    $(".izborPolje").remove();
    brojIzbora = 0;
}

function posalji(){
    let nizSlika = document.getElementsByClassName("izborSlika");

    if(brojIzbora == 4){
        if(tekuci == 1){
            nizPrvog[0] = nizSlika[0].src;
            nizPrvog[1] = nizSlika[1].src;
            nizPrvog[2] = nizSlika[2].src;
            nizPrvog[3] = nizSlika[3].src;
            window.localStorage.setItem("prvi",JSON.stringify(nizPrvog));
            tekuci = 2;
            let paragraf = document.getElementById("izborigraca");
            paragraf.innerText = "Izbor drugog igraca"
            resetuj();
        }
        else{
            nizDrugog[0] = nizSlika[0].src;
            nizDrugog[1] = nizSlika[1].src;
            nizDrugog[2] = nizSlika[2].src;
            nizDrugog[3] = nizSlika[3].src;
            window.localStorage.setItem("drugi",JSON.stringify(nizDrugog));
            isReady = true;
            resetuj();
            window.location = "skocko-igra.html"
        }
    }
   
   

}
$(document).ready(function(){


    localStorage.setItem("prvi","");
    localStorage.setItem("drugi","");
    $(".unosPolja").on("click",function(){
        if(brojIzbora < 4){
            let divv = document.createElement("div");
            divv.className = "izborPolje"
            let slika = document.createElement("img");
            slika.className = "izborSlika";
            slika.src = $(this).find("img").attr("src");
            divv.appendChild(slika);
            $(".izbor").append(divv);
            brojIzbora++;
        }
    })
   
});

