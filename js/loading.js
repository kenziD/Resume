var frontList = document.querySelectorAll(".front-cube li");
var backList = document.querySelectorAll(".back-cube li");
var leftList = document.querySelectorAll(".left-cube li");
var rightList = document.querySelectorAll(".right-cube li");
var colorPlate = ['#F9C968', '#7284A8', ' #44ffd1', '#6369d1', '#ff99c9', '#ee4266', '#ffd23f', 'rgb(255, 255, 100)', 'rgb(255, 89, 100)', 'rgb(81, 81, 81)', 'rgb(0, 244, 203)'];
for (var j = 0; j < frontList.length; j++) {
    frontList[j].style.backgroundColor = colorPlate[j];
    leftList[j].style.backgroundColor = colorPlate[frontList.length - j - 1];
    backList[j].style.backgroundColor = colorPlate[j];
    rightList[j].style.backgroundColor = colorPlate[frontList.length - j - 1];
}
