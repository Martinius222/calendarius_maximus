var cellElems = document.getElementsByClassName("cellSpace");
var hoursCells = document.getElementsByClassName("col1");
var appointmentStatusCell = document.getElementsByClassName("col2");
var hoursTableElem = document.getElementById("hoursTable");

class Cell {
    constructor(dayElem) {
        this._day = dayElem;
        this._totHoursBooked = 0;
        this._fullyBooked = false;
        this._clicked = false;
        this._hours = [
            { time: "08.00 - 08.50", booked: false },
            { time: "09.00 - 09.50", booked: false },
            { time: "10.00 - 10.50", booked: false },
            { time: "11.00 - 11.50", booked: false },
            { time: "12.00 - 12.50", booked: false },
            { time: "13.00 - 13.50", booked: false },
            { time: "14.00 - 14.50", booked: false },
            { time: "15.00 - 15.50", booked: false },
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

var dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

var monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September",
    "Oktober", "November", "Desember"];

var calDays = [];

for (let i = 1; i <= cellElems.length - 4; i++) {

    calDays.push(new Cell(new Date(2019, 9, i)));

    cellElems[i].innerHTML = calDays[i - 1]._day.getDate();

    if (calDays[i - 1]._day.getDay() != 0 && calDays[i - 1]._day.getDay() != 6) {
        cellElems[i].style.backgroundColor = "white";
    } else {
        cellElems[i].style.backgroundColor = "lightgrey";
    }

    cellElems[i].addEventListener("click", function () {
        hoursTableElem.style.visibility = "visible";
        for (let i = 1; i <= cellElems.length - 4; i++) {
            if (calDays[i - 1]._day.getDay() != 0 && calDays[i - 1]._day.getDay() != 6) {
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
                appointmentStatusCell[n].innerHTML = "LEDIG";
                appointmentStatusCell[n].style.backgroundColor = "white";
                appointmentStatusCell[n].style.color = "black";
                hoursCells[n].style.backgroundColor = "white";
                hoursCells[n].style.color = "black";

            }
        }
    })

}

function populateCalendar(n) {
    if (n > 240) {
        console.log("To high a number to populate calendar with - max limit is 240")
    } else {
        for (let i = 0; i < n; i++) {
            calDays[Math.floor(Math.random() * 30)]._hours[Math.floor(Math.random() * 8)].booked = true;
        }
    }
}



// test = new Cell(new Date(2019, 9, 30));
// console.log(test);

// test = new Cell(1)
// console.log(test.printCellHeader());
// test.printCellHours();

// // var testD = new Date(2019, 9, 0);
// // console.log(testD)

// var testDates = [];
// for (let n = 1; n <= 31; n++) {
//     testDates.push(new Date(2019, 9, n))

// }

// for (let p = 0; p < testDates.length; p++) {
//     console.log(dayNames[testDates[p].getDay()] + " " + 
//     testDates[p].getDate() + " " + monthNames[testDates[p].getMonth()] + " " +
//                 testDates[p].toLocaleString("en-GB"))

// }

// // for (let p = 0; p < testDates.length; p++) {
// //     console.log(dayNames[testDates[p].getDay()])

// // }

/* TO DO
// Add same script to this index.html and bookings overview html file thus linking
// functionality and add persistence through JSON and Local Storage.
// May the source be with us all....
*/