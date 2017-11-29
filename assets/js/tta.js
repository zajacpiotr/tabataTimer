function timerApp() {
    const redSecWBtn = document.querySelector(".redSecWBtn");
    redSecWBtn.addEventListener("click", function () {
        const input = document.querySelector(".timerW");
        input.value--;
    }, false)
    const addSecWBtn = document.querySelector(".addSecWBtn");
    addSecWBtn.addEventListener("click", function () {
        const input = document.querySelector(".timerW");
        input.value++;
    }, false)
    const redSecRBtn = document.querySelector(".redSecRBtn");
    redSecRBtn.addEventListener("click", function () {
        const input = document.querySelector(".timerR");
        input.value--;
    }, false)
    const addSecRBtn = document.querySelector(".addSecRBtn");
    addSecRBtn.addEventListener("click", function () {
        const input = document.querySelector(".timerR");
        input.value++;
    }, false)
    const redIntervBtn = document.querySelector(".redIntervBtn");
    redIntervBtn.addEventListener("click", function () {
        const input = document.querySelector(".timerInterv");
        input.value--;
    }, false)
    const addIntervBtn = document.querySelector(".addIntervBtn");
    addIntervBtn.addEventListener("click", function () {
        const input = document.querySelector(".timerInterv");
        input.value++;
    }, false)
    const startApp = document.querySelector(".startApp"); //button which starting this application
    startApp.addEventListener("click", function () {
        function buttonsOff() { //function which switch buttons off
            const buttons = document.getElementsByTagName("button");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
                buttons[i].classList.add("btnInactive");
            }
        }
        buttonsOff();

        function buttonsOn() { //function which switch buttons on
            const buttons = document.getElementsByTagName("button");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = false;
                buttons[i].classList.remove("btnInactive");
            }
        }
        const inputW = document.querySelector(".timerW");
        let secondsW = inputW.value;
        const inputR = document.querySelector(".timerR");
        let secondsR = inputR.value;
        const inputInterv = document.querySelector(".timerInterv");
        let intervalsAll = inputInterv.value;
        secondsW++;
        secondsR++;
        let secondsAll = 240;
        let actualInterv = 1;
        let secondsPrep = 6;
        const textInfo = document.getElementById("textBox");
        const addRule = (function (style) { //function which helps adding rules to pseudoselectors
            const sheet = document.head.appendChild(style).sheet;
            return function (selector, css) {
                const propText = Object.keys(css).map(function (p) {
                    return p + ":" + css[p]
                }).join(";");
                sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
            }
        })(document.createElement("style"));

        function addClassRest() { //function which toggle on/off animation at rest time
            const addClassR = document.getElementById("innerAnimation");
            addClassR.classList.toggle("animateR");
        }

        function addClassWorkout() { //function which toggle on/off animation at workout time
            document.getElementById("outerAnimation").classList.toggle("animateW");
            const str = secondsW - 2;
            document.styleSheets[0].addRule('.animateW:after', "animation-duration:" + str + "s");
            document.styleSheets[0].addRule('.animateW:before', "animation-duration:" + str + "s");
        };
        intervals();

        function counterPrep() { //function whcich counting preparation time
            const showS = document.getElementById("box");
            secondsPrep--;
            showS.innerHTML = String(secondsPrep);
            textInfo.innerHTML = String("Przygotuj się!!");
            if (secondsPrep > 0) {
                setTimeout(counterPrep, 1000);
            } else {
                counterW();
                addClassWorkout();
            }
        }
        counterPrep();

        function intervals() { //function which put actual interval on the screen
            const showInterv = document.getElementById("boxTimerAll");
            showInterv.innerHTML = String(actualInterv + "/" + intervalsAll);
        }

        function counterW() { //function who count seconds to 0 at workout time
            const showS = document.getElementById("box");
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
                    const addClassW = document.getElementById("outerAnimation");
                    addClassW.classList.toggle("animateW");
                } else {
                    counterR(); // after workout time initiate a rest function
                    secondsW = inputW.value;
                    secondsW++;
                    addClassRest();
                    const addClassW = document.getElementById("outerAnimation");
                    addClassW.classList.toggle("animateW");
                    const str = secondsR - 2;
                    document.styleSheets[0].addRule('.animateR:after', "animation-duration:" + str + "s");
                    document.styleSheets[0].addRule('.animateR:before', "animation-duration:" + str + "s");
                }
            }
        }

        function counterR() { //function who count seconds to 0 at rest time
            const showS = document.getElementById("box");
            secondsR--;
            showS.innerHTML = String(secondsR);
            textInfo.innerHTML = String("Przerwa");
            if ((secondsR < 5) && (secondsAll > 9)) {
                textInfo.innerHTML = String("Przygotuj się!!");
            }
            if (secondsR > 0) {
                setTimeout(counterR, 1000);
            } else {
                if (actualInterv >= intervalsAll) {
                    showS.innerHTML = "Koniec";
                    buttonsOn();
                    addClassRest();
                } else {
                    counterW(); // after rest time initiate a workout function
                    secondsR = inputR.value;
                    secondsR++;
                    addClassRest();
                    addClassWorkout();
                    actualInterv++;
                    intervals();
                }
            }
        }
    }, false)
}
