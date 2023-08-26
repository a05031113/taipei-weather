CWB_API_KEY = 'CWB-D5F377C3-35F2-446E-9622-2103986E9AE2'
const time = new Date();
let records = null;

fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization="+CWB_API_KEY)
.then(res => {
    return res.json();
}).then(result => {

    // create current-temperature container
    const current_temperature = document.querySelector(".current-temperature");
    const current_temperature_icon_container = document.createElement("div");
    current_temperature_icon_container.classList.add("current-temperature__icon-container")
    const current_temperature_icon = document.createElement("img");
    current_temperature_icon.classList.add("current-temperature__icon")
    current_temperature_icon.setAttribute("alt","")
    current_temperature_icon_container.appendChild(current_temperature_icon)

    const current_temperature_content_container = document.createElement("div")
    current_temperature_content_container.classList.add("current-temperature__content-container")
    const current_temperature_value = document.createElement("div")
    current_temperature_value.classList.add("current-temperature__value")
    const current_temperature_summary = document.createElement("div")
    current_temperature_summary.classList.add("current-temperature__summary")

    current_temperature_content_container.appendChild(current_temperature_value)
    current_temperature_content_container.appendChild(current_temperature_summary)

    current_temperature.appendChild(current_temperature_icon_container)
    current_temperature.appendChild(current_temperature_content_container)

    //get API data
    const T_data = result.records.locations[0].location[9].weatherElement[3].time[0].elementValue[0].value;
    current_temperature_value.textContent = T_data + "°";

    const wx_content = result.records.locations[0].location[9].weatherElement[1].time[0].elementValue[0].value;
    current_temperature_summary.textContent = wx_content;

    const wx_value = result.records.locations[0].location[9].weatherElement[1].time[0].elementValue[1].value;

    switch (wx_value) { 
        case "01":
            current_temperature_icon.setAttribute("src", "img/sunny.png"); 
            break;
        case "02","03":
            current_temperature_icon.setAttribute("src", "img/mostly-sunny.png");
            break;
        case "04","05","06","07":
            current_temperature_icon.setAttribute("src", "img/cloudy.png"); 
            break;
        default:
            current_temperature_icon.setAttribute("src", "img/rainy.png");
            break;     
    }
});
