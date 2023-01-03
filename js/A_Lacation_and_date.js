const locationAndDate = document.querySelector(".location-and-date");
const today = new Date();
const month = today.getMonth();
const date = today.getDate();
const day = today.getDay();
const paddedDate = date.toString().padStart(2, "0")

const locationAndDateHtml = `
    <h1 class="location-and-date__location">台北, TW</h1>
    <div>${dayTrans(day)} ${monthTrans(month)}/${paddedDate}</div>
`;
locationAndDate.insertAdjacentHTML("beforeend", locationAndDateHtml);

function monthTrans(month) {
    let monthForEN = ``;
    if (month === 0) {
        monthForEN = `01`;
    } else if (month === 1) {
        monthForEN = `02`;
    } else if (month === 2) {
        monthForEN = `03`;
    } else if (month === 3) {
        monthForEN = `04`;
    } else if (month === 4) {
        monthForEN = `05`;
    } else if (month === 5) {
        monthForEN = `06`;
    } else if (month === 6) {
        monthForEN = `07`;
    } else if (month === 7) {
        monthForEN = `08`;
    } else if (month === 8) {
        monthForEN = `09`;
    } else if (month === 9) {
        monthForEN = `10`;
    } else if (month === 10) {
        monthForEN = `11`;
    } else if (month === 11) {
        monthForEN = `12`;
    }
    return monthForEN;
}

function dayTrans(day) {
    let dayForEN = ``;
    if (day === 0) {
        dayForEN = `週日`;
    } else if (day === 1) {
        dayForEN = `週一`;
    } else if (day === 2) {
        dayForEN = `週二`;
    } else if (day === 3) {
        dayForEN = `週三`;
    } else if (day === 4) {
        dayForEN = `週四`;
    } else if (day === 5) {
        dayForEN = `週五`;
    } else if (day === 6) {
        dayForEN = `週六`;
    }
    return dayForEN;
}


