//Ustawienie drużyn
$("#teamA").text(localStorage.getItem("teamA"));
$("#teamB").text(localStorage.getItem("teamB"));

//Inicjacja zmiennych
$("#punktyA").text(0);
$("#punktyB").text(0);

//Zmiana wyniku
$(document).keydown(function (event) {
    let key = (event.keyCode ? event.keyCode : event.which);
    switch(key){
            //Drużyna lewa
            case 73: $("#punktyA").text(parseInt($("#punktyA").html())+1);
                break;
            case 74: $("#punktyA").text(parseInt($("#punktyA").html())-1);
                break;
            //Drużyna prawa
            case 79: $("#punktyB").text(parseInt($("#punktyB").html())+1);
                break;
            case 75: $("#punktyB").text(parseInt($("#punktyB").html())-1);
                break;
            //Zamiana drużyn
            case 89: var bufor=$("#teamA").html();
                $("#teamA").text($("#teamB").html());
                $("#teamB").text(bufor);
                break;
    }
})

//zmienne do timera
var timerObj = document.getElementById("time");
var timer = null; 
var time = 0; 
let isRunning = false; 

// Formatowanie tekstu
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); 
    const secs = seconds % 60; 
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`; 
}

// Zmiana czasu
function parseTime(input) {
    const parts = input.split(":"); 
    if (parts.length === 2) {
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        if (!isNaN(minutes) && !isNaN(seconds)) {
            return minutes * 60 + seconds; 
        }
    }
    return null;
}

// klikanie guzików
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") { 
        event.preventDefault(); // Zapobiega domyślnemu przewijaniu strony spacją
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
        } else {
            timer = setInterval(() => {
                time++;
                timerObj.textContent = formatTime(time); 

                if (time === 2700) {
                    clearInterval(timer);
                    isRunning = false; 
                }
                if (time === 5400) {
                    clearInterval(timer);
                    isRunning = false; 
                }
            }, 1000);
            isRunning = true;
        }
    } else if (event.code === "KeyR") { 
        event.preventDefault();
        clearInterval(timer); 
        time = 0; 
        timerObj.textContent = formatTime(time); 
        isRunning = false; 
    } else if (event.code === "KeyD") { 
        event.preventDefault(); 
        const userInput = prompt("Podaj czas w formacie MM:SS", "00:00"); 
        const newTime = parseTime(userInput); 
        if (newTime !== null) {
            clearInterval(timer); 
            time = newTime; 
            timerObj.textContent = formatTime(time); 
            isRunning = false; 
        } else {
            alert("Niepoprawny format czasu. Użyj MM:SS.");
        }
    }
});
