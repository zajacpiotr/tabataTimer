function timerApp() {

    var secondsAll = 0;
    var redSecWBtn = document.querySelector(".redSecWBtn");
    redSecWBtn.addEventListener("click", function () {
        var input = document.querySelector(".timerW");
        input.value--;
    }, false)
    var addSecWBtn = document.querySelector(".addSecWBtn");
    addSecWBtn.addEventListener("click", function () {
        var input = document.querySelector(".timerW");
        input.value++;
    }, false)
    var redSecRBtn = document.querySelector(".redSecRBtn");
    redSecRBtn.addEventListener("click", function () {
        var input = document.querySelector(".timerR");
        input.value--;
    }, false)
    var addSecRBtn = document.querySelector(".addSecRBtn");
    addSecRBtn.addEventListener("click", function () {
        var input = document.querySelector(".timerR");
        input.value++;
    }, false)
    var startApp = document.querySelector(".startApp"); //button which starting this application
    startApp.addEventListener("click", function () {
        var inputW = document.querySelector(".timerW");
        var secondsW = inputW.value;
        var inputR = document.querySelector(".timerR"); //in future i must change this, make a inputs a global
        var secondsR = inputR.value;
        secondsW++;
        secondsR++;
        var secondsAll = 240;
        var secondsPrep = 6;
        var textInfo = document.getElementById("textBox");


        function counterPrep() {
            var showS = document.getElementById("box");
            secondsPrep--;
            showS.innerHTML = String(secondsPrep);
            // var textInfo = document.getElementById("textBox");
            textInfo.innerHTML = String("Przygotuj się!!");
            if (secondsPrep > 0) {
                setTimeout(counterPrep, 1000);
            } else {
                counterAll();
                counterW();
                var inna = document.getElementById("test1");
                inna.classList.toggle("animateW");
            }
        }
        counterPrep();

        function counterAll() {
            var showAll = document.getElementById("boxTimerAll");
            secondsAll--;
            showAll.innerHTML = String(secondsAll);
            if (secondsAll > 0) {
                setTimeout(counterAll, 1000);
            }
        }


        function counterW() { //function who count seconds to 0 at workout time
            var showS = document.getElementById("box");
            //var inna = document.getElementById("test1");
            //inna.classList.toggle("animateT");
            secondsW--;
            showS.innerHTML = String(secondsW); //+ " " + secondsAll;
            if ((secondsW > 4) && (secondsW < 8)) {
                textInfo.innerHTML = String("Wytrzymaj jeszcze trochę!!");
            } else if ((secondsW >= 8) && (secondsW <= 16)) {
                textInfo.innerHTML = String("Jazda!!");
            } else if (secondsW > 16) {
                textInfo.innerHTML = String("Start!!");
            } else {
                textInfo.innerHTML = String("Ostatnie powtórzenia!!");
            }
            if (secondsW > 0) {
                setTimeout(counterW, 1000);
            } else {
                if (secondsAll <= 0) {
                    showS.innerHTML = "Koniec";
                } else {
                    counterR(); // after workout time initiate a rest function
                    secondsW = inputW.value;
                    secondsW++;
                    var inna = document.getElementById("test1");
                    inna.classList.toggle("animateW");


                }
            }
        }


        function counterR() { //function who count seconds to 0 at rest time
            var showS = document.getElementById("box");
            secondsR--;
            showS.innerHTML = String(secondsR); //+ " " + secondsAll;
            textInfo.innerHTML = String("Przerwa");
            if ((secondsR < 5) && (secondsAll > 9)) {
                textInfo.innerHTML = String("Przygotuj się!!");
            }
            if (secondsR > 0) {
                setTimeout(counterR, 1000);
            } else {
                if (secondsAll <= 0) {
                    showS.innerHTML = "Koniec";
                } else {
                    counterW(); // after workout time initiate a workout function
                    secondsR = inputR.value;
                    secondsR++;
                    var inna = document.getElementById("test1");
                    inna.classList.toggle("animateW");
                }
            }
        }

    }, false)
}
