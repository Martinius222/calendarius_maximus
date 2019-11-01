var cellElems = document.getElementsByClassName("cellSpace");
var hoursCells = document.getElementsByClassName("col1");
var appointmentStatusCell = document.getElementsByClassName("col2");
var hoursTableElem = document.getElementById("hoursTable");
var modalElem = document.getElementById("modalBackground");
var orderModalElem = document.getElementById("orderModal");
var confirmBtnElem = document.getElementById("confirmButton");
var confModalElem = document.getElementById("confirmationModal");
var dateFieldElem = document.getElementById("dateField");
var timeFieldElem = document.getElementById("timeField");
var confDateElem = document.getElementById("confirmedDate");
var confTimeElem = document.getElementById("confirmedTime");

class Cell {
    constructor(dayElem) {
        this._day = dayElem;
        this._totHoursBooked = 0;
        this._fullyBooked = false;
        this._clicked = false;
        this._hours = [
            { time: "08.00", booked: false },
            { time: "09.00", booked: false },
            { time: "10.00", booked: false },
            { time: "11.00", booked: false },
            { time: "12.00", booked: false },
            { time: "13.00", booked: false },
            { time: "14.00", booked: false },
            { time: "15.00", booked: false },
        ];
    }

    printCellHeader() {
        return "Day: " + this._day + "\n" +
            "Total hours booked: " + this._totHoursBooked + "\n" +
            "Clicked: " + this._clicked + "\n" +
            "Day fully booked: " + this._fullyBooked;

    }

    printCellHours() {
        for (let i = 0; i < this._hours.length; i++) {
            console.log(this._hours[i]);

        }
    }

    //Setters

    set day(d) {
        this._day = x;
    }

    set totHoursBooked(tot) {
        this._totHoursBooked = tot;
    }

    set fullyBooked(f) {
        this._fullyBooked = f;
    }

    set clicked(c) {
        this._clicked = c;
    }


};
 class Order {
     constructor(service, fullDate) {
         this._slcService = service;
         this._slcDate = fullDate;
     }
 }

var dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

var monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September",
    "Oktober", "November", "Desember"];

var calDays = [];
var dataBuffer = [];
let slcDay;
let slcDate;
let slcMonth;
let slcHour;



for (let i = 1; i <= cellElems.length - 4; i++) {

    calDays.push(new Cell(new Date(2019, 9, i)));

    cellElems[i].innerHTML = calDays[i - 1]._day.getDate();

    if (calDays[i - 1]._day.getDay() != 0 && calDays[i - 1]._day.getDay() != 6) {
        cellElems[i].style.backgroundColor = "white";
    } else {
        cellElems[i].style.backgroundColor = "lightgrey";
    }

    cellElems[i].addEventListener("click", function () {

        if (calDays[i - 1]._day.getDay() != 0 && calDays[i - 1]._day.getDay() != 6) {
            hoursTableElem.style.visibility = "visible";
        } else {
            hoursTableElem.style.visibility = "hidden";
        }

        for (let i = 1; i <= cellElems.length - 4; i++) {
            if (calDays[i - 1]._day.getDay() != 0 && calDays[i - 1]._day.getDay() != 6 && calDays[i -1]._totHoursBooked != 8) {
                cellElems[i].style.backgroundColor = "white";
            } else {
                cellElems[i].style.backgroundColor = "lightgrey";
            }

        }
        cellElems[i].style.backgroundColor = "lightblue";
        
        for (let n = 0; n < hoursCells.length; n++) {
            hoursCells[n].innerHTML = calDays[i - 1]._hours[n].time;

            if (calDays[i - 1]._hours[n].booked == true) {
                appointmentStatusCell[n].innerHTML = "OPPTATT";
                appointmentStatusCell[n].style.backgroundColor = "grey";
                appointmentStatusCell[n].style.color = "white";
                hoursCells[n].style.backgroundColor = "grey";
                hoursCells[n].style.color = "white";

            } else {
                hoursCells[n].addEventListener("click", function(){
                    // let slcDay;
                    // let slcDate;
                    // let slcMonth;
                    // let slcHour;
                    modalElem.style.display = "flex";
                    orderModalElem.style.display = "block";

                    slcDay = dayNames[calDays[i - 1]._day.getDay()];
                    slcDate = calDays[i - 1]._day.getDate();
                    slcMonth = monthNames[calDays[i - 1]._day.getMonth()];
                    slcHour = calDays[i - 1]._hours[n].time
                    dateFieldElem.innerHTML = slcDay + " " +
                                              slcDate + " " +
                                              slcMonth;
                    timeFieldElem.innerHTML = "kl. " + slcHour;

                    console.log(slcDay);
                    console.log(slcDate);
                });

                appointmentStatusCell[n].innerHTML = "LEDIG";
                appointmentStatusCell[n].style.backgroundColor = "white";
                appointmentStatusCell[n].style.color = "black";
                hoursCells[n].style.backgroundColor = "white";
                hoursCells[n].style.color = "black";

            }
        }
    })

}



modalElem.addEventListener("click", function(event){
    if (modalElem !== event.target) return;
    modalElem.style.display = "none";
    orderModalElem.style.display = "none";
    
})

var testExportArray = []

confirmBtnElem.addEventListener("click", function(){
    orderModalElem.style.display = "none";
    confModalElem.style.display = "flex";

    let joinedDate = slcDay + " " + slcDate + " " + slcMonth + " Kl. " + slcHour;
    confDateElem.innerHTML = joinedDate
    confTimeElem.innerHTML = "kl. " + slcHour;

    testExportArray.push(new Order("Akupunktur", joinedDate));

    console.log("Instanciated " + testExportArray);
    myJSON = JSON.stringify(testExportArray);
    console.log("Stringyfied " + myJSON);
    localStorage.setItem("SKtest", myJSON);
    console.log("Sent to localstorage");


})

// // testJSON = new Order("Test Service", "Test Date");
// console.log("Instanciated " + testExportArray);
// myJSON = JSON.stringify(testExportArray);
// console.log("Stringyfied " + myJSON);
// localStorage.setItem("SKtest", myJSON);
// console.log("Sent to localstorage");

function populateCalendar(n) {
    if (n > 240) {
        console.log("To high a number to populate calendar with - max limit is 240")
    } else {
        for (let i = 0; i < n; i++) {
            calDays[Math.floor(Math.random() * 30)]._hours[Math.floor(Math.random() * 8)].booked = true;
        }
    }
}

populateCalendar(240);

for (let i = 1; i <= cellElems.length - 4; i++) {
    for (let n = 0; n < hoursCells.length; n++) {
        if (calDays[i - 1]._hours[n].booked == true) {
            calDays[i -1]._totHoursBooked++;
            
        }
    }

    if (calDays[i -1]._totHoursBooked == 8) {
        cellElems[i].style.backgroundColor = "lightgrey";
    }
}


/* TO DO
// Add same script to this index.html and bookings overview html file thus linking
// functionality and add persistence through JSON and Local Storage.
// May the source be with us all.... 
// 
// Add rendering of more orders on orders page (iterate imported array and render boxes)
//
// KNOWN BUGS
// User can click out and remove confirmation modal box (need to remove modal background
// event listener)
// 
// 
// 
// 
*/