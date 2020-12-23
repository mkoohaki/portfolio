/*
  File name: main.js
  Author: Meisam Koohaki
  Web site name: MEISAM KOOHAKI PORTFOLIO
  File description: javascript file for the project website (Assignment-1)
*/
var h2 = document.querySelector('h2');
var fName = document.getElementById('fName');
var lName = document.getElementById('lName');
var btn = document.getElementById('submit_button_pdf');

h2.addEventListener('mouseenter', function () {
    h2.style.boxShadow = '0 0 35px #7B68EE';
    h2.style.backgroundColor = '#6c5adb';
    h2.style.color = '#ffffff';
    h2.style.border = '3px #483D8B solid';
});

h2.addEventListener('mouseleave', function () {
    h2.style.boxShadow = '0 0 10px #7B68EE';
    h2.style.backgroundColor = '#C7E9ED';
    h2.style.color = '#483D8B';
    h2.style.border = '3px #7B68EE solid';
});

//These placeholders do not work! I do not know why.
btn.onclick = function () {
    //fName.placeholder = 'Enter First Name';
    //lName.placeholder = 'Enter Last Name';
    fName.style.backgroundColor = 'blue';
    lName.style.backgroundColor = 'blue';
}