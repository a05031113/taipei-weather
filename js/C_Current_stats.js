const CWB_API_KEY = "CWB-25142137-EFE4-4F9E-9B46-D41BF5BD73D5";
const currentStats = document.querySelector(".current-stats");
let taipeiWeatherCurrentStatsData = []; // For saving weather data from API

const currentStatsModel = {
    get: function(){
        (async () => {
            try{
                /* Get weather data of taipei station (id: 466920)  */
                let response = await fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?stationId=466920&Authorization=" + CWB_API_KEY);
                let result = await response.json();
                taipeiWeatherCurrentStatsData.push({"value": result.records.location[0].weatherElement[14].elementValue, "unit": "°C", "label": "High"});
                taipeiWeatherCurrentStatsData.push({"value": result.records.location[0].weatherElement[16].elementValue, "unit": "°C", "label": "Low"});
                taipeiWeatherCurrentStatsData.push({"value": result.records.location[0].weatherElement[2].elementValue, "unit": "mps", "label": "Wind"});
                
                /* Get forecasted weather data of taipei for rain */
                response = await fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?locationName=臺北市&Authorization=" + CWB_API_KEY);
                result = await response.json();
                taipeiWeatherCurrentStatsData.push({"value": result.records.location[0].weatherElement[1].time[0].parameter.parameterName, "unit": "%", "label": "Rain"});
                
                /* Get sunrise and sunset data of taipei */
                let todayForQuery = currentStatsView.formatDateYYYYMMDD(today); // Change format
                response = await fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?locationName=臺北市&Authorization=" + CWB_API_KEY + "&dataTime=" + todayForQuery);
                result = await response.json();
                taipeiWeatherCurrentStatsData.push({"value": result.records.locations.location[0].time[0].parameter[1].parameterValue, "unit": "", "label": "Sunrise"});
                taipeiWeatherCurrentStatsData.push({"value": result.records.locations.location[0].time[0].parameter[5].parameterValue, "unit": "", "label": "Sunset"});
                
                /* Render in B: Current Stats */
                currentStatsView.showCurrentStats(taipeiWeatherCurrentStatsData);
            }catch(err){
                console.log(err);
            }
        })();
    }
}

const currentStatsView = {
    showCurrentStats: function(data){
        const taipeicurrentStatsFragment = document.createDocumentFragment();

        /* Base on CSS design */
        for(let i = 0; i < data.length; i = i + 2){
            let stats = document.createElement("div");
            for(let j = i; j < i + 2; j++){
                let value = document.createElement("div");
                value.className = "current-stats__value";
                value.textContent = data[j].value + data[j].unit;
                let label = document.createElement("div");
                label.className = "current-stats__label";
                label.textContent = data[j].label;
                stats.append(value, label);
            }
            taipeicurrentStatsFragment.appendChild(stats);
        }
        currentStats.appendChild(taipeicurrentStatsFragment);
    },

    /* Change date format as YYYYMMDD */
    formatDateYYYYMMDD: function(date){
        return [
            date.getFullYear(),
            /* getMonth() starts from 0 */
            (date.getMonth() + 1).toString().padStart(2, "0"), // If only one digit, add "0"
            (date.getDate()).toString().padStart(2, "0") // If only one digit, add "0"
        ].join("-"); // Change format as YYYY-MM-DD
    }
}

const currentStatsController = {
    init: function(){
        currentStatsModel.get();
    }
}

currentStatsController.init();