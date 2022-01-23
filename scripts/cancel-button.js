let infoWindowClass = document.querySelector('.infowindow');
let cancelButton = infoWindowClass.querySelector('.infowindow__cancel-button');
console.log('1');

function hideProfileInfoWindow() {
  infoWindowClass.classList.add('infowindow_hide');
  console.log('2');
}

cancelButton.addEventListener('click',hideProfileInfoWindow);
console.log('3');
