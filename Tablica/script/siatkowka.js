//Ustawienie drużyn
$("#teamA").text(localStorage.getItem("teamA"));
$("#teamB").text(localStorage.getItem("teamB"));

//Inicjacja zmiennych
$("#punktyA").text(0);
$("#punktyB").text(0);
$("#set").text(1);
$("#setyA").text(0);
$("#setyB").text(0);

// funkcje
function sety(){
    $("#set").text((parseInt($("#setyA").html())+parseInt($("#setyB").html()))+1);
}

//Zmiana wyniku
$(document).keydown(function (event) {
    let key = (event.keyCode ? event.keyCode : event.which);
    switch(key){
            //Drużyna lewa
            case 73: $("#punktyA").text(parseInt($("#punktyA").html())+1);
                break;
            case 74: $("#punktyA").text(parseInt($("#punktyA").html())-1);
                break;
            case 85: $("#setyA").text(parseInt($("#setyA").html())+1);
                sety()
                break;
            case 72: $("#setyA").text(parseInt($("#setyA").html())-1);
                sety()
                break;
            //Drużyna prawa
            case 79: $("#punktyB").text(parseInt($("#punktyB").html())+1);
                break;
            case 75: $("#punktyB").text(parseInt($("#punktyB").html())-1);
                break;
            case 80: $("#setyB").text(parseInt($("#setyB").html())+1);
                sety()
                break;
            case 76: $("#setyB").text(parseInt($("#setyB").html())-1);
                sety()
                break;
            //Zamiana drużyn
            case 89: var bufor=$("#teamA").html();
                $("#teamA").text($("#teamB").html());
                $("#teamB").text(bufor);
                break;

        }
})