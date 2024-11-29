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

// Zmienne globalne
var timerObj = document.getElementById("time");
var timer = null;
var time = 0;
let isRunning = false;
let globalPause = false; // Flaga globalnej pauzy dla kar

// Formatowanie czasu
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Funkcja pauzowania i wznawiania timerów kar
function toggleKaraTimers(pause) {
    globalPause = pause;
}

// Zmiana czasu z MM:SS na sekundy
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

// Obsługa zdarzeń klawiatury
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") { // Start/Stop timera
        event.preventDefault();
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            toggleKaraTimers(true); // Pauzuj kary
        } else {
            timer = setInterval(() => {
                time++;
                timerObj.textContent = formatTime(time);

                // Automatyczne zatrzymanie po 30 minutach
                if (time === 1800) {
                    clearInterval(timer);
                    isRunning = false;
                    toggleKaraTimers(true); // Pauzuj kary
                }
                // Automatyczne zatrzymanie po 60 minutach
                if (time === 3600) {
                    clearInterval(timer);
                    isRunning = false;
                    toggleKaraTimers(true); // Pauzuj kary
                }
            }, 1000);
            isRunning = true;
            toggleKaraTimers(false); // Wznów kary
        }
    } else if (event.code === "KeyR") { // Reset
        event.preventDefault();
        clearInterval(timer);
        time = 0;
        timerObj.textContent = formatTime(time);
        isRunning = false;
        toggleKaraTimers(true); // Pauzuj kary
    } else if (event.code === "KeyD") { // Ustaw niestandardowy czas
        event.preventDefault();
        const userInput = prompt("Podaj czas w formacie MM:SS", "00:00");
        const newTime = parseTime(userInput);
        if (newTime !== null) {
            clearInterval(timer);
            time = newTime;
            timerObj.textContent = formatTime(time);
            isRunning = false;
            toggleKaraTimers(true); // Pauzuj kary
        } else {
            alert("Niepoprawny format czasu. Użyj MM:SS.");
        }
    }
});


$(document).ready(function () {
    let karaTimers = []; // Tablica przechowująca identyfikatory interwałów dla każdej kary
    const initialTime = 2 * 60; // Czas początkowy (2 minuty w sekundach)

    // Funkcja do formatowania czasu
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Funkcja obsługująca odliczanie dla konkretnej kary
    function startKaraTimer(row) {
        let timeRemaining = initialTime;

        function updateTimer() {
            if (globalPause) return; // Jeśli globalna pauza, nie odliczaj
            if (timeRemaining > 0) {
                timeRemaining--;
                row.find("td").text(formatTime(timeRemaining));
            } else {
                clearInterval(karaTimers[row.index() - 1]); // Zatrzymanie konkretnego timera
                row.remove(); // Usunięcie wiersza z tabeli po zakończeniu kary
            }
        }

        // Rozpoczęcie odliczania co sekundę
        const intervalId = setInterval(updateTimer, 1000);
        karaTimers.push(intervalId); // Zapisanie identyfikatora do tablicy
    }

    // Obsługa klawisza "p" do dodawania nowych kar
    $(document).on("keypress", function (event) {
        if (event.key === "u") {
            const newRow = $("<tr><td></td></tr>");
            $("#tableB table").append(newRow);

            newRow.find("td").text(formatTime(initialTime));
            startKaraTimer(newRow);
        }
        if (event.key === "p") {
            const newRow = $("<tr><td></td></tr>");
            $("#tableB table").append(newRow);

            newRow.find("td").text(formatTime(initialTime));
            startKaraTimer(newRow);
        }
    });
});