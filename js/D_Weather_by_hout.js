const weatherByHour = document.querySelector(".weather-by-hour");
const urlD = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=";
const apiKeyD= "CWB-5311B7D6-B010-4FDD-A17C-9CC48FCE5F87";
const locationD = "&locationName=臺北市";

fetch(urlD + apiKeyD + locationD).then((response)=>{
    return response.json();
}).then((data)=>{
    // create weather-by-hour container
    const weatherByHourHeading = document.createElement("h2");
    weatherByHourHeading.classList.add("weather-by-hour__heading");
    weatherByHourHeading.textContent = "今日天氣預報";
    const weatherByHourContainer = document.createElement("div");
    weatherByHourContainer.classList.add("weather-by-hour__container");
    weatherByHour.appendChild(weatherByHourHeading);
    weatherByHour.appendChild(weatherByHourContainer);

    // store temperature and weather
    const tempD = data["records"]["locations"][0]["location"][0]["weatherElement"][3]["time"];
    const weatherD = data["records"]["locations"][0]["location"][0]["weatherElement"][1]["time"];

    // append data every 3 hours in the container 
    for (let i = 0; i < 7; i++) {
        const item = document.createElement("div");
        item.classList.add("weather-by-hour__item");
        weatherByHourContainer.appendChild(item);
        const hour = document.createElement("div");
        hour.classList.add("weather-by-hour__hour");
        const dataTime = tempD[i]["dataTime"].split(" ")[1].slice(0, 2); // convert dataTime into hour form
        switch (dataTime) { // set the time text
            case "00":
                hour.textContent = "12am";
                break;
            case "03":
                hour.textContent = "3am";
                break;
            case "06":
                hour.textContent = "6am";
                break;
            case "09":
                hour.textContent = "9pm";
                break;
            case "12":
                hour.textContent = "12pm";
                break;
            case "15":
                hour.textContent = "3pm";
                break;
            case "18":
                hour.textContent = "6pm";
                break;
            case "21":
                hour.textContent = "9pm";
                break;
        }
        const img = document.createElement("img");
        const weatherDCode = weatherD[i]["elementValue"][1]["value"]; // get weather code
        switch (weatherDCode) { // set the weather icon
            case "01":
                img.setAttribute("src", "img/sunny.png"); // sunny
                break;
            case "02":
            case "03":
                img.setAttribute("src", "img/mostly-sunny.png"); // mostly-sunny
                break;
            case "04":
            case "05":
            case "06":
            case "07":
                img.setAttribute("src", "img/rainy.png"); // cloudy
                break;
            default:
                img.setAttribute("src", "img/rainy.png"); // rainy
        }
        img.style.width = "3em"; // can remove it once the file path is aligned
        const degree = document.createElement("div");
        degree.textContent = tempD[i]["elementValue"][0]["value"] + "°C";
        item.appendChild(hour);
        item.appendChild(img);
        item.appendChild(degree);
    }
});