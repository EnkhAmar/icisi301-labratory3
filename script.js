let calendar = document.querySelector('.calendar')
let container = document.querySelector('.container')

const month_id = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/*************************************/
var calendar2021 = {jan: {1: "Сайхан амарна"}, feb: {1: "Сагсны тэмцээнтэй", 3: "Шагнал гардуулна даа", 17: "Жавхлан багшийн лаб 2-ыг хийнэ"}, mar: {2: "Энэ лабынхаа хугацааг сунгах уу яах вэ гэдэгээ шийднэ", 6: "Энд юу бичье дээ байз", 8: "Эмэгтэйчүүддээ баяр хүргэнэ дээ"}, apr: {1: "Бүгдээрээ худлаа ярьцаагаагаарай"}, may: {10: "Энэ сард ч ёстой юу ч болдоггүй сар даа"}, jun: {6: "Жавхлан багшийн төрсөн өдөр"},  jul: {4: "Хичээл амарсаан ураа"}, aug: {1: "Хөдөө явдаг цаг даа", 25: "Хичээл сонголт эхэллээ"}, sep: {1: "9-н сарын нэгэн боллоо ерөөсөө бидний баяр даа"}, oct: {13: "Сур сур бас дахин сур"}, nov: {2: "Сурсаар л бай"}, dec: {20: "Өвлийн семистер хаагдах нь дээ", 30: "Дүн гаргаж дууслаа баярлалаа баяртай"} }
/************************************/
console.table(calendar2021);
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let description = document.querySelector('.ul-desc');
description.innerHTML = '';

generateCalendar = (month, year) => {
 
    let calendar_days = document.getElementById(month_id[month]);
    let calendar_year = document.getElementById('year');
    
    calendar_days.innerHTML = '';
    calendar_year.innerHTML = year;
    

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')

                let list_item = document.createElement('li')
                list_item.classList.add('curr-date')
                list_item.innerHTML = `${month_id[month].toUpperCase()}-${currDate.getDate()}: Өнөөдөр`
                description.appendChild(list_item)
            }

            for (const property in calendar2021[month_id[month]]) {
                if (i - first_day.getDay() + 1 === parseInt(property)) {
                    day.classList.add('ntf-date');
                    
                    let list_item = document.createElement('li')
                    list_item.innerHTML = `${month_id[month].toUpperCase()}-${property}: ${calendar2021[month_id[month]][property]}`

                    description.appendChild(list_item)
                }
            }
        }
        calendar_days.appendChild(day)
    }
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

function generateAll () {
    for(let i = 0; i < 12; i++) {
        generateEachMonth(i);
    }
}

function generateEachMonth (indexOfThatMonth) {
    let newMonth = document.createElement('div');
    newMonth.classList.add('calendar');
    newMonth.classList.add(month_id[indexOfThatMonth]);
    newMonth.innerHTML = `
                        <div class="calendar-header">
                            <span class="month-change" id="prev-month"  onclick="prevMonth()">
                                <pre>&lt;</pre>
                            </span>
                            <span class="month-picker" id="month-picker">
                            ${indexOfThatMonth+1}-р сар
                            </span>
                            <span class="month-change" id="next-month" onclick="nextMonth()">
                                <pre>&gt;</pre>
                            </span>
                        </div>

                        <div class="calendar-body">
                            <div class="calendar-week-day">
                                <div>Sun</div>
                                <div>Mon</div>
                                <div>Tue</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div>Sat</div>
                            </div>
                            <div class="calendar-days" id="${month_id[indexOfThatMonth]}"></div>
                        </div>`;

    container.appendChild(newMonth);
    generateCalendar(indexOfThatMonth, curr_year.value);

}

function generateCurrentMonth (i) {
    document.getElementById('byEachMonth').textContent = "Жилээр харах";
    generateEachMonth(i);
}

let each_month_toggle = document.getElementById('byEachMonth');
let showing_each_month = false;

each_month_toggle.addEventListener("click", ToggleMonth);

function ToggleMonth () {
    if(document.querySelector('body').classList.contains("show-by-year")) {
        document.querySelector('body').classList.remove("show-by-year");
        description.innerHTML = '';
        container.removeChild(document.querySelector('.jan'));
        container.removeChild(document.querySelector('.feb'));
        container.removeChild(document.querySelector('.mar'));
        container.removeChild(document.querySelector('.apr'));
        container.removeChild(document.querySelector('.may'));
        container.removeChild(document.querySelector('.jun'));
        container.removeChild(document.querySelector('.jul'));
        container.removeChild(document.querySelector('.aug'));
        container.removeChild(document.querySelector('.sep'));
        container.removeChild(document.querySelector('.oct'));
        container.removeChild(document.querySelector('.nov'));
        container.removeChild(document.querySelector('.dec'));
        generateCurrentMonth(curr_month.value);
    } else {
        document.querySelector('body').classList.add("show-by-year");
        description.innerHTML = '';
        each_month_toggle.textContent = "Сараар харах";
        switch (curr_month.value) {
            case 0:
                container.removeChild(document.querySelector('.jan'));
                break;
            case 1:
                container.removeChild(document.querySelector('.feb'));
                break;
            case 2:
                container.removeChild(document.querySelector('.mar'));
                break;
            case 3:
                container.removeChild(document.querySelector('.apr'));
                break;
            case 4:
                container.removeChild(document.querySelector('.may'));
                break;
            case 5:
                container.removeChild(document.querySelector('.jun'));
                break;
            case 6:
                container.removeChild(document.querySelector('.jul'));
                break;
            case 7:
                container.removeChild(document.querySelector('.aug'));
                break;
            case 8:
                container.removeChild(document.querySelector('.sep'));
                break;
            case 9:
                container.removeChild(document.querySelector('.oct'));
                break;
            case 10:
                container.removeChild(document.querySelector('.nov'));
                break;
            case 11:
                container.removeChild(document.querySelector('.dec'));
                break;
        }
        generateAll();
    }
}

function prevMonth() {
    description.innerHTML = '';
    container.removeChild(document.querySelector(`.${month_id[curr_month.value]}`));
    if (--curr_month.value == -1) {
        window.alert("1-р сараас доош сар байхгүй учир 12-р сарлуу шилжлээ.");
        curr_month.value = 11;
        generateCurrentMonth(curr_month.value);
        return;
    }
    generateCurrentMonth(curr_month.value);
}

function nextMonth() {
    description.innerHTML = '';
    container.removeChild(document.querySelector(`.${month_id[curr_month.value]}`));
    if (++curr_month.value == 12) {
        window.alert("12-р сараас дээш сар байхгүй учир 1-р сарлуу шилжлээ.");
        curr_month.value = 0;
        generateCurrentMonth(curr_month.value);
        return;
    }
    generateCurrentMonth(curr_month.value);
}

let dark_mode_toggle = document.querySelector('.dark-mode-switch')

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}


generateAll();