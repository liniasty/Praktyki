//Ustawienie drużyn
$("#teamA").text(localStorage.getItem("teamA"));
$("#teamB").text(localStorage.getItem("teamB"));

//Inicjacja zmiennych
$("#punktyA").text(0);
$("#punktyB").text(0);
$("#kwarta").text(1);

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
            case 77: $("#kwarta").text(parseInt($("#kwarta").html())+1);
                break;
            case 78: $("#kwarta").text(parseInt($("#kwarta").html())-1);
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

                if (time === 600) {
                    clearInterval(timer);
                    isRunning = false; 
                }
                if (time === 1200) {
                    clearInterval(timer);
                    isRunning = false; 
                }
                if (time === 1800) {
                    clearInterval(timer);
                    isRunning = false; 
                }
                if (time === 2400) {
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
    else if (event.code === "KeyP") { 
        event.preventDefault(); 
        $("#tableB>td").get
    }
});

//faule A
$(document).ready(function () {
    const cells = $('#tableA table td'); 
    let currentIndex = 0; 

    $(document).on('keydown', function (e) {
        if (e.key === 'u') { 
            if (currentIndex < cells.length) {
                if (currentIndex == 4) { 
                    $(cells[currentIndex]).css("background-color", "red");
                } else {
                    $(cells[currentIndex]).css("background-color", "yellow"); 
                }
                currentIndex++; 
            }
        }

        if (e.key === 'h') { 
            if (currentIndex > 0) {
                currentIndex--; 
                $(cells[currentIndex]).css("background-color", ""); 
            }
        }
    });
});

//faule B
$(document).ready(function () {
    const cells = $('#tableB table td'); 
    let currentIndex = 0; 

    $(document).on('keydown', function (e) {
        if (e.key === 'p') { 
            if (currentIndex < cells.length) {
                if (currentIndex == 4) { 
                    $(cells[currentIndex]).css("background-color", "red");
                } else {
                    $(cells[currentIndex]).css("background-color", "yellow"); 
                }
                currentIndex++; 
            }
        }

        if (e.key === 'l') { 
            if (currentIndex > 0) {
                currentIndex--; 
                $(cells[currentIndex]).css("background-color", ""); 
            }
        }
    });
});

