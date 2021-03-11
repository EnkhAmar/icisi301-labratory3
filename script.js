let calendar = document.querySelector('.calendar')

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
        generateCalendar(i, curr_year.value)
    }
    document.querySelector('.each-month-toggle span').innerHTML = "Сараар харах";
}

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value;
    description.innerHTML = '';
    generateAll();
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value;
    description.innerHTML = '';
    generateAll();
}

let dark_mode_toggle = document.querySelector('.dark-mode-switch')

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}

let each_month_toggle = document.querySelector('.each-month-toggle span')

function generateMonth () {
    document.querySelector('.each-month-toggle span').innerHTML = "Жилээр харах";
    
    document.querySelector('body').style.gridTemplateColumns = "repeat(2, 1fr)";
    document.querySelector('.dec').style.display = "block";
    document.querySelector('.dec').style.justifyContent = "center";
    
}

each_month_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('each-month-false');
    document.querySelector('body').classList.toggle('each-month-true');
    if (document.querySelector('body').classList.contains("each-month-false")) {
        generateAll();
    } else {
        generateMonth();
    }
    
}

generateAll();