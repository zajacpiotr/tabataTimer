function timerApp() {
    const secondSide = document.querySelector("#secondSide");
    const firstSide = document.querySelector("#firstSide");
    const conteinerFirstSide = document.querySelector("#conteiner");
    const conteinerSecondSide = document.querySelector("#dateConteiner")

    function dateStorage() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = "0" + dd
        }

        if (mm < 10) {
            mm = "0" + mm
        }

        today = dd + '/' + mm + '/' + yyyy;
        let len = localStorage.length - 1;
        for (let i = 0; i <= localStorage.length; i++) {
            if (localStorage["date" + i] == null) {
                if (localStorage.getItem("date" + len) == today) {
                    return
                } else {
                    localStorage.setItem("date" + i, today)
                    return
                }
            }
        }
    }

    let onceClick = true;
    secondSide.addEventListener("click", function () {
        conteinerFirstSide.classList.add("displayNone");
        conteinerSecondSide.classList.add("displayFlex");
        secondSide.classList.add("active");
        firstSide.classList.remove("active");
        // calendar
        function calendar() {
            let dateT = new Date();
            let day = dateT.getDate();
            let month = dateT.getMonth();
            let year = dateT.getFullYear();
            let firstDay = new Date(year, month, 1);
            let weekday = new Array();
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            document.getElementById("calendar").innerHTML = weekday[firstDay.getDay()];
        }
        calendar();
        const showDate = document.getElementById("innerDateConteiner");
        if (onceClick) {
            onceClick = false;
            for (i = 0; i < localStorage.length; i++) {
                showDate.innerHTML += "<br>" + localStorage.getItem("date" + i);
            }
        }

        function deleteStorage() {
            for (let i = 0; i <= localStorage.length; i++) {
                localStorage.removeItem("date" + i);
            }
        }
    }, false)
    firstSide.addEventListener("click", function () {
        conteinerFirstSide.classList.remove("displayNone");
        conteinerSecondSide.classList.remove("displayFlex");
        firstSide.classList.add("active");
        secondSide.classList.remove("active");
    }, false)
    document.querySelector(".redSecWBtn").addEventListener("click", function () {
        document.querySelector(".timerW").value--;
    }, false)
    document.querySelector(".addSecWBtn").addEventListener("click", function () {
        document.querySelector(".timerW").value++;
    }, false)
    document.querySelector(".redSecRBtn").addEventListener("click", function () {
        document.querySelector(".timerR").value--;
    }, false)
    document.querySelector(".addSecRBtn").addEventListener("click", function () {
        document.querySelector(".timerR").value++;
    }, false)
    document.querySelector(".redIntervBtn").addEventListener("click", function () {
        document.querySelector(".timerInterv").value--;
    }, false)
    document.querySelector(".addIntervBtn").addEventListener("click", function () {
        document.querySelector(".timerInterv").value++;
    }, false)
    document.querySelector(".startApp").addEventListener("click", function () {
        const inputW = document.querySelector(".timerW");
        let secondsW = inputW.value;
        const inputR = document.querySelector(".timerR");
        let secondsR = inputR.value;
        const inputInterv = document.querySelector(".timerInterv");
        let intervalsAll = inputInterv.value;

        function validationInputs() {
            if ((secondsW < 3) || (secondsR < 3)) {
                alert("Czas treningu i odpoczynku musi być powyżej 2sekund");
            } else if (intervalsAll < 1) {
                alert("Ilośc interwałów musi być większa od 0");
            } else {
                function buttonsOff() { //function which switch buttons off
                    const buttons = document.getElementsByTagName("button");
                    for (let i = 0; i < buttons.length; i++) {
                        buttons[i].disabled = true;
                        buttons[i].classList.add("btnInactive");
                    }
                }
                //buttonsOff();

                function buttonsOn() { //function which switch buttons on
                    const buttons = document.getElementsByTagName("button");
                    for (let i = 0; i < buttons.length; i++) {
                        buttons[i].disabled = false;
                        buttons[i].classList.remove("btnInactive");
                    }
                }

                function alertPlay() {
                    const alert = document.getElementById("alert").play();
                }
                let secondsAll = 240;
                let actualInterv = 1;
                let secondsPrep = 6;
                secondsW++;
                secondsR++;
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
                        alertPlay();
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
                            alertPlay();
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
                            const alertEnd = document.getElementById("endAlert").play();
                            dateStorage();
                        } else {
                            counterW(); // after rest time initiate a workout function
                            secondsR = inputR.value;
                            secondsR++;
                            addClassRest();
                            addClassWorkout();
                            actualInterv++;
                            intervals();
                            alertPlay();
                        }
                    }
                }
            }
        }
        validationInputs();
    }, false)
}
