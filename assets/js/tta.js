function timerApp() {
    const secondSide = document.querySelector("#secondSide");
    const firstSide = document.querySelector("#firstSide");
    const conteinerFirstSide = document.querySelector("#conteiner");
    const conteinerSecondSide = document.querySelector("#dateConteiner");
    const addRule = (function (style) { //function which helps adding rules to pseudoselectors
        const sheet = document.head.appendChild(style).sheet;
        return function (selector, css) {
            const propText = Object.keys(css).map(function (p) {
                return p + ":" + css[p]
            }).join(";");
            sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
        }
    })(document.createElement("style"));
    let len = localStorage.length;
    let len2 = localStorage.length - 1;

    function dateStorage() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        today = {
            "one": dd,
            "two": mm,
            "three": yyyy
        }
        var memory;
        for (let i = 1; i <= len ^ 2; i += 2) {
            let retrievedObject = localStorage.getItem("date" + i);
            let retrievedObjectMem = localStorage.getItem("date" + memory);
            if (retrievedObject == null) {
                if (retrievedObjectMem == null) {
                    localStorage.setItem("date" + i, JSON.stringify(today));
                    return
                } else {
                    if (retrievedObjectMem == JSON.stringify(today)) {
                        localStorage.setItem("date" + memory, JSON.stringify(today));
                    } else {
                        localStorage.setItem("date" + i, JSON.stringify(today));
                    }
                    return
                }
            } else {
                memory = i;
            }
        }
    }
    let dateT = new Date();
    let day = dateT.getDate();
    var month = dateT.getMonth();
    let year = dateT.getFullYear();
    let firstDay = new Date(year, month, 1);
    let onceClick = true;

    function dayActive() {
        for (let i = 1; i <= len + 2; i++) {
            let checkParse = localStorage.getItem("date" + i);
            if (checkParse !== null) {
                checkParse = JSON.parse(checkParse);
                let checkParseDay = checkParse.one;
                let checkParseMonth = checkParse.two - 1;
                let checkParseYear = checkParse.three;
                for (let j = 0; j <= 31; j++) {
                    if ((checkParseDay == j) && (checkParseMonth == month) && (checkParseYear == year)) {
                        document.querySelector(".dayNr" + j).classList.add("calendarDaysActive");
                    }
                }
            }
        }
    }

    function cleanDiv(x, y) {
        let hookParent = document.querySelector(x);
        hookParent.innerHTML = "";
        const child = document.createElement("div");
        child.className = y;
        hookParent.insertAdjacentHTML("beforeend", child.outerHTML);
    }

    function calendar(x, y, z) {
        let weekday = new Array();
        weekday[0] = "Poniedziałek";
        weekday[1] = "Wtorek";
        weekday[2] = "Środa";
        weekday[3] = "Czwartek";
        weekday[4] = "Piątek";
        weekday[5] = "Sobota";
        weekday[6] = "Niedziela";
        let monthName = new Array();
        monthName[0] = "Styczeń";
        monthName[1] = "Luty";
        monthName[2] = "Marzec";
        monthName[3] = "Kwiecień";
        monthName[4] = "Maj";
        monthName[5] = "Czerwiec";
        monthName[6] = "Lipiec";
        monthName[7] = "Sierpień";
        monthName[8] = "Wrzesień";
        monthName[9] = "Październik";
        monthName[10] = "Listpad";
        monthName[11] = "Grudzień";
        const monthNameCheck = monthName[firstDay.getMonth()];
        document.querySelector(x).innerHTML = monthNameCheck + " " + year;
        if (monthNameCheck == monthName[10] || monthNameCheck == monthName[8] || monthNameCheck == monthName[5] || monthNameCheck == monthName[3]) {
            for (let i = 1; i <= 30; i++) {
                let checking = document.querySelector(y);
                const child = document.createElement("div");
                child.innerHTML = i;
                child.classList.add("calendarDays");
                child.classList.add("dayNr" + i);
                checking.insertAdjacentHTML("beforeend", child.outerHTML);
            }
        } else if (monthNameCheck == monthName[1]) {
            if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                for (let i = 1; i <= 29; i++) {
                    let checking = document.querySelector(y);
                    const child = document.createElement("div");
                    child.innerHTML = i;
                    child.classList.add("calendarDays");
                    child.classList.add("dayNr" + i);
                    checking.insertAdjacentHTML("beforeend", child.outerHTML);
                }
            } else {
                for (let i = 1; i <= 28; i++) {
                    let checking = document.querySelector(y);
                    const child = document.createElement("div");
                    child.innerHTML = i;
                    child.classList.add("calendarDays");
                    child.classList.add("dayNr" + i);
                    checking.insertAdjacentHTML("beforeend", child.outerHTML);
                }
            }
        } else {
            for (let i = 1; i <= 31; i++) {
                let checking = document.querySelector(y);
                const child = document.createElement("div");
                child.innerHTML = i;
                child.classList.add("calendarDays");
                child.classList.add("dayNr" + i);
                checking.insertAdjacentHTML("beforeend", child.outerHTML);
            }
        }
        let firstDayCalendar = firstDay.getDay() - 1;
        if (firstDayCalendar == -1) {
            firstDayCalendar = 6;
        }
        let fillerHook = document.querySelector(z); //set width for first child in calendar to set up first day of the month
        switch (firstDayCalendar) {
            case 0:
                fillerHook.style.width = "0%";
                break;
            case 1:
                fillerHook.style.width = "14.23%";
                break;
            case 2:
                fillerHook.style.width = "28.46%";
                break;
            case 3:
                fillerHook.style.width = "42.69%";
                break;
            case 4:
                fillerHook.style.width = "56.92%";
                break;
            case 5:
                fillerHook.style.width = "71.15%";
                break;
            case 6:
                fillerHook.style.width = "85.38%";
        }
        if (month == dateT.getMonth()) {
            for (let i = 0; i <= 31; i++) {
                if (day == i) {
                    document.querySelector(".dayNr" + i).classList.add("calendarToday");
                }
            }
        }
        const formContHook = document.getElementById("formCont")
        const element = document.querySelector(".calendarInner");
        const numberOfChildren = element.getElementsByTagName("*").length - 1;
        const inputWeight = document.getElementById("weightInput");
        var memory;
        for (let i = 1; i <= numberOfChildren; i++) {
            const daysClick = document.querySelector(".dayNr" + i);
            daysClick.addEventListener("click", function () {
                for (let l = 1; l <= numberOfChildren; l++) {
                    document.querySelector(".dayNr" + l).classList.remove("activeDay");
                }
                this.classList.add("activeDay");
                formContHook.classList.add("displayFlex");
                formContHook.classList.remove("displayNone");
                document.getElementById("infoPopup").innerHTML = "";
                inputWeight.value = "";
                let rect = daysClick.getBoundingClientRect();
                let rectTop = rect.top + 40;
                //let rectLeft = rect.left + 40;
                formContHook.style.setProperty("top", rectTop + "px");
                //formContHook.style.setProperty("left", rectLeft + "px");
                inputWeight.focus();
                memory = i;
            }, false)
            const exitClick = document.getElementById("exitBtn");
            exitClick.addEventListener("click", function () {
                formContHook.classList.add("displayNone");
                formContHook.classList.remove("displayFlex");
                inputWeight.value = "";
                daysClick.classList.remove("activeDay");
            }, false)
        }
        const okClick = document.getElementById("weightApprv");
        okClick.addEventListener("click", function () {
            const hookDayWeight = document.querySelector(".dayNr" + memory);
            if (inputWeight.value == "") {
                document.getElementById("infoPopup").innerHTML = "podaj wagę";
                return
            } else {
                function dateWeightManager() {
                    todayW = {
                        "oneW": memory,
                        "twoW": month,
                        "threeW": inputWeight.value
                    }
                    var memory2;
                    for (let i = 0; i <= len ^ 2; i += 2) {
                        let vh1 = localStorage.getItem("dateW" + i);
                        let vhx = localStorage.getItem("dateW" + memory2);
                        if (vh1 == null) {
                            if (vhx == null) {
                                localStorage.setItem("dateW" + i, JSON.stringify(todayW));
                                return
                            } else {
                                alert(vhx);
                                vhx2 = JSON.parse(vhx);
                                vhx = JSON.parse(vhx);
                                vhx = vhx.oneW;
                                vhx2 = vhx2.twoW;
                                if ((vhx == JSON.stringify(todayW.oneW)) && (vhx2 == JSON.stringify(todayW.twoW))) {
                                    localStorage.setItem("dateW" + memory2, JSON.stringify(todayW));
                                } else {
                                    localStorage.setItem("dateW" + i, JSON.stringify(todayW));
                                }
                                return
                            }
                        } else {
                            memory2 = i;
                        }
                    }
                }
                dateWeightManager();
                hookDayWeight.innerHTML = "<p>" + memory + "</p>" + "<p>" + inputWeight.value + "kg" + "</p>";
                formContHook.classList.add("displayNone");
                formContHook.classList.remove("displayFlex");
                inputWeight.value = "";
                document.querySelector(".dayNr" + memory).classList.remove("activeDay");
            }
        }, false)
    }

    function weightAdding() {
        for (let i = 0; i <= len * 2; i += 2) {
            let checkWeightLS = localStorage.getItem("dateW" + i);
            if (checkWeightLS != null) {
                checkWeightLS = JSON.parse(checkWeightLS);
                let checkWeightLSDay = checkWeightLS.oneW;
                let checkWeightLSMonth = checkWeightLS.twoW;
                let weightLSW = checkWeightLS.threeW;
                for (let j = 0; j <= 31; j++) {
                    if ((checkWeightLSDay == j) && (checkWeightLSMonth == month)) {
                        const weightAdd = document.querySelector(".dayNr" + j);
                        weightAdd.innerHTML = "<p>" + j + "</p>" + "<p>" + weightLSW + " kg" + "</p>";
                    }
                }
            }
        }
    }
    document.querySelector(".redMonthBtn").addEventListener("click", function () {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        firstDay = new Date(year, month, 1);
        cleanDiv(".calendarInner", "filler");
        calendar(".monthHeader", ".calendarInner", ".filler");
        dayActive();
        weightAdding();
    }, false)
    document.querySelector(".addMonthBtn").addEventListener("click", function () {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        firstDay = new Date(year, month, 1);
        cleanDiv(".calendarInner", "filler");
        calendar(".monthHeader", ".calendarInner", ".filler");
        dayActive();
        weightAdding();
    }, false)
    firstSide.addEventListener("click", function () {
        conteinerFirstSide.classList.remove("displayNone");
        conteinerSecondSide.classList.remove("displayFlex");
        firstSide.classList.add("active");
        secondSide.classList.remove("active");
    }, false)

    secondSide.addEventListener("click", function () {
        conteinerFirstSide.classList.add("displayNone");
        conteinerSecondSide.classList.add("displayFlex");
        secondSide.classList.add("active");
        firstSide.classList.remove("active");
        cleanDiv(".calendarInner", "filler");
        calendar(".monthHeader", ".calendarInner", ".filler");
        dayActive();
        weightAdding();
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
                /*const addRule = (function (style) { //function which helps adding rules to pseudoselectors
                    const sheet = document.head.appendChild(style).sheet;
                    return function (selector, css) {
                        const propText = Object.keys(css).map(function (p) {
                            return p + ":" + css[p]
                        }).join(";");
                        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
                    }
                })(document.createElement("style"));*/

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
