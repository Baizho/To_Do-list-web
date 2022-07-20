let date = new Date(); let day = date.getDate(); let month = date.getMonth() + 1; let year = date.getFullYear(); let hour = date.getHours(); let minute = date.getMinutes();
let cart = [];
let thesortoption = "CtoF";

const doListpar = document.getElementById("doList");
const storagecart = localStorage.getItem("cart");

class Item {
  constructor(name, seconds, minute, hour, day, month, year) {
    this.name = name;
    this.seconds = seconds;
    this.minute = minute;
    this.hour = hour;
    this.day = day;
    this.month = month;
    this.year = year;
  }
}

function sortCtoF() {
  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < cart.length; j++) {
      if ((cart[i].year < cart[j].year || (cart[i].year === cart[j].year && (cart[i].month < cart[j].month || (cart[i].month === cart[j].month && (cart[i].day < cart[j].day || (cart[i].day === cart[j].day && (cart[i].hour < cart[j].hour || (cart[i].hour === cart[j].hour && (cart[i].minute < cart[j].minute || (cart[i].minute === cart[j].minute && cart[i].seconds <= cart[j].seconds))))))))))) {
        const mem = cart[i];
        cart[i] = cart[j];
        cart[j] = mem;
      }
    }
  }
}
function sortFtoC() {
  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < cart.length; j++) {
      if ((cart[i].year > cart[j].year || (cart[i].year === cart[j].year && (cart[i].month > cart[j].month || (cart[i].month === cart[j].month && (cart[i].day > cart[j].day || (cart[i].day === cart[j].day && (cart[i].hour > cart[j].hour || (cart[i].hour === cart[j].hour && (cart[i].minute > cart[j].minute || (cart[i].minute === cart[j].minute && cart[i].seconds >= cart[j].seconds))))))))))) {
        const mem = cart[i];
        cart[i] = cart[j];
        cart[j] = mem;
      }
    }
  }
}

function refreshUI() {
  document.getElementById("InputForm").reset();
  let date = new Date(); let day = date.getDate(); let month = date.getMonth() + 1; let year = date.getFullYear(); let hour = date.getHours(); let minute = date.getMinutes(); let seconds = date.getSeconds();
  doListpar.innerHTML = "";
  if (thesortoption === "CtoF") { sortCtoF(); }
  if (thesortoption === "FtoC") { sortFtoC(); }
  localStorage.setItem("cart", JSON.stringify(cart));
  cart.forEach((info, index) => {
    const Name = info.name; const Seconds = info.seconds; const Minute = info.minute; const Hour = info.hour;
    const Day = info.day; const Month = info.month; const Year = info.year;
    const listinfo = document.createElement("li");
    const listtext = document.createTextNode(`Name: ${Name}  Deadline: ${Hour}:${Minute} | ${Year}/${Month}/${Day}`);
    listinfo.appendChild(listtext);
    doListpar.appendChild(listinfo);
    listinfo.classList.add("Flexrow", "Jbetween");
    const listdelete = document.createElement("button");
    let deleteinfo = document.createTextNode("Expired (Tap to delete)");
    if (Year > year) { deleteinfo = document.createTextNode("Delete"); }
    if (Year === year) {
      if (Month > month) { deleteinfo = document.createTextNode("Delete"); }
      if (Month === month) {
        if (Day > day) { deleteinfo = document.createTextNode("Delete"); }
        if (Day === day) {
          if (Hour > hour) { deleteinfo = document.createTextNode("Delete"); }
          if (Hour === hour) {
            if (Minute > minute) { deleteinfo = document.createTextNode("Delete"); }
            if (Minute === minute) {
              if (Seconds >= seconds) {
                deleteinfo = document.createTextNode("Delete");
              }
            }
          }
        }
      }
     }
      listdelete.appendChild(deleteinfo);
      listdelete.classList.add("Dbuttons","Rad", "Sizebutton");
      listinfo.appendChild(listdelete);

      listdelete.addEventListener("click", () => {
        cart.splice(index, 1);
        refreshUI();
      });
    })
}

if (storagecart !== null) {
  cart = JSON.parse(storagecart).map((item) => {
    return new Item(item.name, 0, item.minute, item.hour, item.day, item.month, item.year);
  })  
}
refreshUI();

function Applysort(form) {
  thesortoption = form.picksort.value;
  refreshUI();
  return false;
}

function deleteHistory() {
  localStorage.removeItem("cart");
  cart = [];
  refreshUI();
}
function refreshHistory() {
  refreshUI();
}

function Submitted(form) {
  document.getElementById("error").innerText = "";
  const Name = form.Objective.value; const Minute = parseInt(form.Deadlineminute.value); const Hour = parseInt(form.Deadlinehour.value);
  const Day = parseInt(form.Deadlineday.value); const Month = parseInt(form.Deadlinemonth.value); const Year = parseInt(form.Deadlineyear.value);
  const item = new Item(Name,0, Minute, Hour, Day, Month, Year);
  if (0 <= Minute && Minute <= 59 && 0 <= Hour && Hour <= 23 && 1 <= Month && Month <= 12) {
    cart.push(item);
  }
  else {
    document.getElementById("error").innerText = "error";
  }

  refreshUI();
  return false;
}