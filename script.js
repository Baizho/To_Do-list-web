let date=new Date();let day=date.getDate();let month=date.getMonth()+1;let year=date.getFullYear();let hour=date.getHours();let minute=date.getMinutes();
let cart=[];

const doListpar=document.getElementById("doList");
const storagecart=localStorage.getItem("cart");

function refreshUI(){
  document.getElementById("InputForm").reset();
  let date=new Date();let day=date.getDate();let month=date.getMonth()+1;let year=date.getFullYear();let hour=date.getHours();let minute=date.getMinutes();
  doListpar.innerHTML="";
  cart.sort();
  localStorage.setItem("cart",JSON.stringify(cart));
  cart.forEach((info,index) => {
    const Name=info[5]; const Minute=info[4]; const Hour=info[3];
    const Day=info[2]; const Month=info[1]; const Year=info[0];
    const listinfo=document.createElement("li");
    const listtext=document.createTextNode(`Name: ${Name} Deadline: ${Hour}:${Minute} | ${Year}/${Month}/${Day}`);
    listinfo.appendChild(listtext);
    doListpar.appendChild(listinfo);
    listinfo.classList.add("Flexrow","Jbetween");
    const listdelete=document.createElement("button");
    let deleteinfo=document.createTextNode("Expired (Tap to delete)");
    if(Year>year){deleteinfo=document.createTextNode("Delete");}
    if(Year===year){
      if(Month>month){deleteinfo=document.createTextNode("Delete");}
      if(Month===month){
        if(Day>day){deleteinfo=document.createTextNode("Delete");}
        if(Day===day){
          if(Hour>hour){deleteinfo=document.createTextNode("Delete");}
          if(Hour===hour){
            if(Minute>=minute){deleteinfo=document.createTextNode("Delete");}
          }
        }
      }
    }
    listdelete.appendChild(deleteinfo);
    listdelete.classList.add("Dbuttons");
    listinfo.appendChild(listdelete);

    listdelete.addEventListener("click", () => {
      cart.splice(index,1);
      refreshUI();
    });
  })
}

if(storagecart!==null)
{
  cart=JSON.parse(storagecart).map((item) => {
    return [item[0],item[1],item[2],item[3],item[4],item[5]];
  })
}
refreshUI();

function deleteHistory(){
  localStorage.removeItem("cart");
  cart=[];
  refreshUI();
}
function refreshHistory(){
  refreshUI();
}

function Submitted(form) {
  document.getElementById("error").innerText="";
  const Name=form.Objective.value; const Minute=form.Deadlineminute.value; const Hour=form.Deadlinehour.value;
  const Day=form.Deadlineday.value; const Month=form.Deadlinemonth.value; const Year=form.Deadlineyear.value;
  if(0<=Minute && Minute<=59 && 0<=Hour && Hour<=23 && 1<=Month && Month<=12) {
    cart.push([parseInt(Year),parseInt(Month),parseInt(Day),parseInt(Hour),parseInt(Minute),Name]);
  }
   else
  {
    document.getElementById("error").innerText="error";
  }

  refreshUI();
  
  return false;
}