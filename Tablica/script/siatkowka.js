//Ustawienie drużyn
$("#teamA").text(localStorage.getItem("teamA"));
$("#teamB").text(localStorage.getItem("teamB"));

//Inicjacja zmiennych
$("#punktyA").text(0);
$("#punktyB").text(0);
$("#set").text(1);
$("#setyA").text(0);
$("#setyB").text(0);

//Zmiana wyniku
$(document).keydown(function (event) {
    let key = (event.keyCode ? event.keyCode : event.which);
    switch(key){
            //Drużyna lewa
            case 73: $("#punktyA").text(parseInt($("#punktyA").html())+1);
                $("#akropka").css("background-color","yellow");
                $("#bkropka").css("background-color","");
                break;
            case 74: $("#punktyA").text(parseInt($("#punktyA").html())-1);
                break;
            case 85: $("#setyA").text(parseInt($("#setyA").html())+1);
                lewy()
                break;
            case 72: $("#setyA").text(parseInt($("#setyA").html())-1);
                usunLewy()
                break;
            //Drużyna prawa
            case 79: $("#punktyB").text(parseInt($("#punktyB").html())+1);
                $("#bkropka").css("background-color", "yellow");
                $("#akropka").css("background-color","");
                break;
            case 75: $("#punktyB").text(parseInt($("#punktyB").html())-1);
                break;
            case 80: $("#setyB").text(parseInt($("#setyB").html())+1);
                prawy()
                break;
            case 76: $("#setyB").text(parseInt($("#setyB").html())-1);
                usunPrawy()
                break;
            //Zamiana drużyn
            case 89: 
                var bufor=$("#teamA").html();
                $("#teamA").text($("#teamB").html());
                $("#teamB").text(bufor);
                var buforsety=$("#setyA").html();
                $("#setyA").text($("#setyB").html());
                $("#setyB").text(buforsety);
                var bufor=$("#A").html();
                $("#A").html($("#B").html());
                $("#B").html(bufor);
                break;

        }
})

//zegar
function zegar() {
    var data = new Date();
    var godzina = data.getHours();
    var min = data.getMinutes();
    var terazjest = ""+godzina+
    ((min<10)?":0":":")+min
    document.getElementById("time").innerHTML = terazjest;
    setTimeout("zegar()", 1000);
  }
  zegar();

  function lewy(){
     // Pobierz wartości z divów
     const x = $('#punktyA').text().trim();
     const y = $('#punktyB').text().trim();

     // Połącz wartości w formacie x-y
     const result = `${x}-${y}`;

     // Znajdź pierwszą pustą komórkę i wstaw wynik
     $('#A td').each(function() {
         if ($(this).text().trim() === '') {
             $(this).text(result);
             return false; // Przerwij iterację po znalezieniu pierwszej pustej komórki
         }
     });
  }
  function prawy(){
    // Pobierz wartości z divów
    const x = $('#punktyA').text().trim();
    const y = $('#punktyB').text().trim();

    // Połącz wartości w formacie x-y
    const result = `${x}-${y}`;

    // Znajdź pierwszą pustą komórkę i wstaw wynik
    $('#B td').each(function() {
        if ($(this).text().trim() === '') {
            $(this).text(result);
            return false; // Przerwij iterację po znalezieniu pierwszej pustej komórki
        }
    });
 }
 function usunLewy() {
    const komorka = $('#A td').filter(function() {
        return $(this).text().trim() !== '';
    });

    if (komorka.length > 0) {
        $(komorka[komorka.length - 1]).text('');
    }
 }
 function usunPrawy() {
    const komorka = $('#B td').filter(function() {
        return $(this).text().trim() !== '';
    });

    if (komorka.length > 0) {
        $(komorka[komorka.length - 1]).text('');
    }
 }