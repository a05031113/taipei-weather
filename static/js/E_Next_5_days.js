const dayList = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];

const next5Days = document.querySelector(".next-5-days");

const next5DaysHeading = document.createElement("h2");
next5DaysHeading.className = "next-5-days__heading";

const next5DaysContainer = document.createElement("div");
next5DaysContainer.className = "next-5-days__container";

next5DaysHeading.textContent = "未來一週天氣預報";
next5Days.appendChild(next5DaysHeading);

async function getNext5Days(){
    const responseMinT = await fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-4EE89E2B-0ADB-450A-9356-994E3551B7BB&locationName=%E8%87%BA%E5%8C%97%E5%B8%82&elementName=MinT");
    const dataMinT = await responseMinT.json();
    const next5DaysTime = dataMinT.records.locations[0].location[0].weatherElement[0].time;
    const responseMaxT = await fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-4EE89E2B-0ADB-450A-9356-994E3551B7BB&locationName=%E8%87%BA%E5%8C%97%E5%B8%82&elementName=MaxT");
    const dataMaxT = await responseMaxT.json();
    const responseRain = await fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-4EE89E2B-0ADB-450A-9356-994E3551B7BB&locationName=%E8%87%BA%E5%8C%97%E5%B8%82&elementName=PoP12h");
    const dataRain = await responseRain.json();
    const responseWind = await fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-4EE89E2B-0ADB-450A-9356-994E3551B7BB&locationName=%E8%87%BA%E5%8C%97%E5%B8%82&elementName=WS");
    const dataWind = await responseWind.json();
    const responseWx = await fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-4EE89E2B-0ADB-450A-9356-994E3551B7BB&locationName=%E8%87%BA%E5%8C%97%E5%B8%82&elementName=Wx");
    const dataWx = await responseWx.json();

    for (let i = 1;i<next5DaysTime.length;i+=2){
        const next5DaysRow = document.createElement("div");
        next5DaysRow.className = "next-5-days__row";

        //Date
        const next5DaysDate = document.createElement("div");
        next5DaysDate.className = "next-5-days__date";
        const next5DaysLabelDate = document.createElement("div");
        next5DaysLabelDate.className = "next-5-days__label";
        const weekDate = dataMinT.records.locations[0].location[0].weatherElement[0].time[i].startTime;
        const weekDay = weekDate.split(" ")[0];
        next5DaysDate.textContent = dayList[new Date(weekDay).getDay()];
        next5DaysLabelDate.textContent = weekDate.split("-")[1] + "/" + weekDate.split("-")[2].split(" ")[0];
        next5DaysDate.appendChild(next5DaysLabelDate);

        //icon
        const next5DaysIcon = document.createElement("div");
        next5DaysIcon.className = "next-5-days__icon";
        let imgData = dataWx.records.locations[0].location[0].weatherElement[0].time[i].elementValue[1].value;
        const sunny = ["01"];
        const mostlySunny = ["02","03"];
        const cloudy = ["04","05","06","07"];
        if (sunny.includes(imgData)){
            imgData = "sunny";
        }else if (mostlySunny.includes(imgData)){
            imgData = "mostly-sunny";
        }else if (cloudy.includes(imgData)){
            imgData = "cloudy";
        }else{
            imgData = "rainy";
        };
        const img = document.createElement("img");
        img.src = `img/${imgData}.png`;
        img.style.width = "3em" 
        next5DaysIcon.appendChild(img);

        //minT
        const next5DaysLow = document.createElement("div");
        next5DaysLow.className = "next-5-days__low";
        const next5DaysLabelLow = document.createElement("div");
        next5DaysLabelLow.className = "next-5-days__label";
        let minT = dataMinT.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value;
        next5DaysLow.textContent = minT+"°";
        next5DaysLabelLow.textContent = "最低溫度";
        next5DaysLow.appendChild(next5DaysLabelLow);

        //maxT
        const next5DaysHigh = document.createElement("div");
        next5DaysHigh.className = "next-5-days__high";
        const next5DaysLabelHigh = document.createElement("div");
        next5DaysLabelHigh.className = "next-5-days__label";
        let maxT = dataMaxT.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value;
        next5DaysHigh.textContent = maxT+"°";
        next5DaysLabelHigh.textContent = "最高溫度";
        next5DaysHigh.appendChild(next5DaysLabelHigh);

        //rain
        const next5DaysRain = document.createElement("div");
        next5DaysRain.className = "next-5-days__rain";
        const next5DaysLabelRain = document.createElement("div");
        next5DaysLabelRain.className = "next-5-days__label";
        let weekRain = dataRain.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value;
        if (weekRain == " ") {
            weekRain = "0";
        };
        next5DaysRain.textContent = `${weekRain}%`;
        next5DaysLabelRain.textContent = "降雨機率";
        next5DaysRain.appendChild(next5DaysLabelRain);

        //wind
        const next5DaysWind = document.createElement("div");
        next5DaysWind.className = "next-5-days__wind";
        const next5DaysLabelWind = document.createElement("div");
        next5DaysLabelWind.className = "next-5-days__label";
        let weekWind = dataWind.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value;
        next5DaysWind.textContent = weekWind+"m/s";
        next5DaysLabelWind.textContent = "陣風風速";
        next5DaysWind.appendChild(next5DaysLabelWind);

        next5DaysRow.appendChild(next5DaysDate);
        next5DaysRow.appendChild(next5DaysIcon);
        next5DaysRow.appendChild(next5DaysLow);
        next5DaysRow.appendChild(next5DaysHigh);
        next5DaysRow.appendChild(next5DaysRain);
        next5DaysRow.appendChild(next5DaysWind);
        next5DaysContainer.appendChild(next5DaysRow);
    };
    next5Days.appendChild(next5DaysContainer);
};

if (document.readyState === "complete"){
    getNext5Days();
} else {
    document.addEventListener("DOMContentLoaded", getNext5Days);
};
