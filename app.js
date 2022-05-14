// Megadjuk a termékek árát, nevét, képét
var items = {
    "Alma":{
        value:110,
        img:"./img/alma.jpg"
    },
    "Banán":{
        value:100,
        img:"./img/banan.jpg"
    },
    "Kenyér":{
        value:670,
        img:"./img/kenyer.jpg"
    },
    "Zsemle":{
        value:150,
        img:"./img/zsemle.jpg"
    },
    "Pogácsa":{
        value:275,
        img:"./img/pogacsa.jpg"
    },
    "Dinnye":{
        value:1490,
        img:"./img/dinnye.jpg"
    },
    "Ásványvíz":{
        value:150,
        img:"./img/water.jpg"
    },
    "Barack":{
        value:90,
        img:"./img/barack.jpg"
    },
    "Körte":{
        value:75,
        img:"./img/korte.jpg"
    }
}
// Létrehozzuk a változókat
let egyenleg = 10000;
let price = 0;
let kosarOpen = 1;
var kosar = {}

// Hozzá adja a kosárhoz az adott terméket
function kosarhozAdd(item) {
    if(kosar.hasOwnProperty(item)){
        kosar[item] += 1
    }else{
        kosar[item] = 1;
    }
    displayItems();
}

// Kivonja a kosárból az adott terméket
function kosarbolElvon(item) {
    if(kosar.hasOwnProperty(item)){
        delete kosar[item]
    }
    displayItems();
}

// Betölti a termékeket illetve a kosár tartalmát 
function displayItems() {  
    price = 0;
    document.getElementById("display").innerHTML = "";
    for(const i in items) {
        if(items.hasOwnProperty(i)){
            document.getElementById("display").innerHTML += "<div class='item'><img src='"+items[i].img+"'><div class='pricetagD'><p class='pricetag'>"+i+" "+items[i].value+"Ft</p><button onclick='kosarhozAdd(\""+i+"\")'><i class='fa fa-plus'></i></button></div></div>"
        }
    }
    document.getElementById("display2").innerHTML = "";
    // Kilistázza kosarat, közben összeszámolja a termékek árát
    for(const i in kosar) {
        if(kosar.hasOwnProperty(i) && kosar[i] !== 0){
            document.getElementById("display2").innerHTML += kosar[i]+" "+i+" "+kosar[i]*items[i].value+"Ft <button class='delBtn' onclick='kosarbolElvon(\""+i+"\")'><i class='fa fa-close'></i></button><br>";
        }
        price += kosar[i]*items[i].value
        if(price > egyenleg) document.getElementsByClassName("price")[0].style.color = "red"; else document.getElementsByClassName("price")[0].style.color = null;
        document.getElementsByClassName("price")[0].textContent = "Összesen: " + price + "Ft";
        document.getElementsByClassName("price")[1].textContent = "Egyenleg: " + egyenleg + "Ft";
    }
    if(price == 0) {
        document.getElementsByClassName("price")[0].textContent = "Összesen: 0Ft";
        document.getElementsByClassName("price")[0].style.color = null;
    }
    setWidth();
}

// A képernyőhöz igazítja a termékeket, és eltünteti a kosarat ha túl kicsi a kép
function setWidth() {
    if(getComputedStyle(document.querySelector('.kosar')).display == "none" && document.getElementById("body").offsetWidth*0.8 <= 1380){
        document.getElementById("display").style.width = null;
    } else if(document.getElementById("body").offsetWidth >= 1380) {
        document.getElementById("display").style.width = document.getElementById("body").offsetWidth - 360 +"px";
    } else {
        document.getElementById("display").style.width = null;
    }
}

// Kis nézetben a kosarat megjeleníti vagy bezárja
function showKosar() {
    if(kosarOpen == 1) kosarOpen = 2; else kosarOpen = 1;
    if(kosarOpen == 2) {
        document.getElementsByClassName("kosarBtn")[0].innerHTML = "<i class='fa fa-close'></i>"
        document.getElementById("kosar").style.display = "block";  
    } else {
        document.getElementsByClassName("kosarBtn")[0].innerHTML = "<i class='fa fa-shopping-cart'></i>"
        document.getElementById("kosar").style.display = null; 
    }
}

// Fizetési mechanizmus
function pay(){
    if(price != 0) { //Ha a price "0" akkor tudjuk hogy a kosár üres
        if(price > egyenleg){
            alert("Nincs elég kereted a termékekre!")
        }else {
            // Kialerteli, hogy mit vett a felhasználó majd elvonja az összeget az egyenlegből
            let list = ""
            for(const i in kosar){
                if(list == "") list += kosar[i] + " x " + i
                else list += "\n" + kosar[i] + " x " + i
            }
            if(!alert("Sikeres vásárlás!\n"+list)) {
                kosar = {}
                egyenleg -= price
                document.getElementsByClassName("price")[1].textContent = "Egyenleg: " + egyenleg + "Ft";
                displayItems();
            }
        }
    } else alert("Üres a kosár, nincs mit megvenni.")
}
// Az oldal betöltése után ezek futnak le először
window.addEventListener("resize", setWidth); // Ezzel az adott functiont meghívjuk minden alkalommal amikor átméretezzük a weboldalt
displayItems();