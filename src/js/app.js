let burger = document.getElementById("burger"); //Hämtar burgerikonen
let menu = document.getElementById("menu"); //Hämtar navigeringen

burger.addEventListener("click", burgerMenu);
/*Funktion som hämtar vilken "display" navigeringen har. 
Om den är "none" så visas hamburgermenyn vid klick på knappen och om den är synlig (block) så kommer den istället att döljas.*/
function burgerMenu() {
  //Hämtar menyns egentliga displaystyle med getComputedStyle
  let menuDisplay = window.getComputedStyle(menu).getPropertyValue("display");

  //Kollar menyns computed style
  if (menuDisplay === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}
