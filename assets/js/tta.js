function timerApp() {
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
        function buttonsOff() {
            var buttons = document.getElementsByTagName("button");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
        }
        buttonsOff();

        function buttonsOn() {
            var buttons = document.getElementsByTagName("button");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = false;
            }
        }
        var inputW = document.querySelector(".timerW");
        var secondsW = inputW.value;
        var inputR = document.querySelector(".timerR"); //in future i must change this, make a inputs a global
        var secondsR = inputR.value;
        secondsW++;
        secondsR++;
        var secondsAll = 20;
        var secondsPrep = 6;
        var textInfo = document.getElementById("textBox");
        var addRule = (function (style) {
            var sheet = document.head.appendChild(style).sheet;
            return function (selector, css) {
                var propText = Object.keys(css).map(function (p) {
                    return p + ":" + css[p]
                }).join(";");
                sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
            }
        })(document.createElement("style"));

        function addClassWorkout() {
            document.getElementById("outerAnimation").classList.toggle("animateW");
            var str = secondsW - 2;
            document.styleSheets[0].addRule('.animateW:after', "animation-duration:" + str + "s");
            document.styleSheets[0].addRule('.animateW:before', "animation-duration:" + str + "s");
        };

        function counterPrep() { //preparation function 
            var showS = document.getElementById("box");
            secondsPrep--;
            showS.innerHTML = String(secondsPrep);
            textInfo.innerHTML = String("Przygotuj się!!");
            if (secondsPrep > 0) {
                setTimeout(counterPrep, 1000);
            } else {
                counterAll();
                counterW();
                addClassWorkout();
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
            secondsW--;
            showS.innerHTML = String(secondsW);
            if ((secondsW > 4) && (secondsW < 8)) { //info to User 
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
                    buttonsOn();
                    var addClassW = document.getElementById("outerAnimation");
                    addClassW.classList.toggle("animateW");
                } else {
                    counterR(); // after workout time initiate a rest function
                    secondsW = inputW.value;
                    secondsW++;
                    var addClassW = document.getElementById("outerAnimation");
                    addClassW.classList.toggle("animateW");
                    var addClassR = document.getElementById("innerAnimation");
                    addClassR.classList.toggle("animateR");
                    var str = secondsR - 2;
                    document.styleSheets[0].addRule('.animateR:after', "animation-duration:" + str + "s");
                    document.styleSheets[0].addRule('.animateR:before', "animation-duration:" + str + "s");
                }
            }
        }

        function counterR() { //function who count seconds to 0 at rest time
            var showS = document.getElementById("box");
            secondsR--;
            showS.innerHTML = String(secondsR);
            textInfo.innerHTML = String("Przerwa");
            if ((secondsR < 5) && (secondsAll > 9)) {
                textInfo.innerHTML = String("Przygotuj się!!");
            }
            if (secondsR > 0) {
                setTimeout(counterR, 1000);
            } else {
                if (secondsAll <= 0) {
                    showS.innerHTML = "Koniec";
                    buttonsOn();
                    var addClassR = document.getElementById("innerAnimation");
                    addClassR.classList.toggle("animateR");
                } else {
                    counterW(); // after rest time initiate a workout function
                    secondsR = inputR.value;
                    secondsR++;
                    var addClassR = document.getElementById("innerAnimation");
                    addClassR.classList.toggle("animateR");
                    addClassWorkout();
                }
            }
        }
    }, false)
}
