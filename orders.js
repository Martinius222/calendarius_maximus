var testService = document.getElementById("testService");
var testDate = document.getElementById("testDate");
var importLocalStorage = localStorage.getItem("SKtest");
console.log(importLocalStorage);
var parsedOrders = JSON.parse(importLocalStorage);
console.log(parsedOrders);

testService.innerHTML = parsedOrders[0]._slcService;
testDate.innerHTML = parsedOrders[0]._slcDate;
