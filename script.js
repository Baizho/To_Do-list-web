let date = new Date(); let day = date.getDate(); let month = date.getMonth() + 1; let year = date.getFullYear(); let hour = date.getHours(); let minute = date.getMinutes();
let cart = [];
let thesortoption = "CtoF";
let searchitem = "";

const doListpar = document.getElementById("doList");
const storagecart = localStorage.getItem("todocart");

$("#baricon").mouseenter(() => {
  const parshowproj=document.getElementById("showproj");
  if(parshowproj.style.display==="block") {
    parshowproj.style.display="none";
  }
   else {
      parshowproj.style.display="block";
    }
});
$("#showproj").mouseleave(() => {
  const parshowproj=document.getElementById("showproj");
  parshowproj.style.display="none";
});

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

function check(s1, s2) {
  const search = s1.toLowerCase();
  const itemn = s2.toLowerCase();
  if (search.length > itemn.length) { return 0; }
  for (let i = 0; i < search.length; i++) {
    if (search[i] !== itemn[i]) { return 0; }
  }
  return 1;
}

function refreshUI() {
  document.getElementById("InputForm").reset();
  date = new Date(); day = date.getDate(); month = date.getMonth() + 1; year = date.getFullYear(); hour = date.getHours();  minute = date.getMinutes();  seconds = date.getSeconds();
  doListpar.innerHTML = "";
  if (thesortoption === "CtoF") { sortCtoF(); }
  if (thesortoption === "FtoC") { sortFtoC(); }
  localStorage.setItem("todocart", JSON.stringify(cart));
  let cnt=0;
  cart.forEach((info, index) => {
    const Name = info.name; const Seconds = info.seconds; const Minute = info.minute; const Hour = info.hour;
    const Day = info.day; const Month = info.month; const Year = info.year;
    if (check(searchitem, info.name) === 1) {
      cnt++;
      const listinfo = document.createElement("li");
      let thehour = String(Hour), theminute = String(Minute), themonth = String(Month), theday = String(Day);
      if (thehour.length === 1) thehour = "0" + thehour;
      if (theminute.length === 1) theminute = "0" + theminute;
      if (theday.length === 1) theday = "0" + theday;
      if (themonth.length === 1) themonth = "0" + themonth;
      const listtext = document.createTextNode(`Name: ${Name} --- Deadline: ${thehour}:${theminute} | ${Year}/${themonth}/${theday}`);
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
      listdelete.classList.add("Dbuttons", "Rad", "Sizebutton");
      listinfo.appendChild(listdelete);

      listdelete.addEventListener("click", () => {
        cart.splice(index, 1);
        refreshUI();
      });
    }
  })
  if(cnt===0) {
    const thetext=document.createTextNode("nothing");
    const area=document.createElement("div");
    area.appendChild(thetext);
    area.style.fontSize="30px";
    doListpar.appendChild(area);
  }
}

function Changesearch(inp) {
  searchitem = inp.value;
  const paroptions=document.getElementById("searchoptions");
  paroptions.innerHTML="";
  cart.forEach((item) => {
    if(check(searchitem,item.name)===1 && searchitem.length>0) {
      const newoption=document.createElement("option");
      const thetext=document.createTextNode(`${item.name}`);
      newoption.appendChild(thetext);
      paroptions.appendChild(newoption);
    }
  })
  refreshUI();
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
  const item = new Item(Name, 0, Minute, Hour, Day, Month, Year);
  if (0 <= Minute && Minute <= 59 && 0 <= Hour && Hour <= 23 && 1 <= Month && Month <= 12) {
    cart.push(item);
  }
  else {
    document.getElementById("error").innerText = "error";
  }

  refreshUI();
  return false;
}