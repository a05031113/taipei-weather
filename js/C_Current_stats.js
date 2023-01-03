const CWB_API_KEY = "CWB-25142137-EFE4-4F9E-9B46-D41BF5BD73D5";
const currentStats = document.querySelector(".current-stats");
let taipeiWeatherCurrentStatsData = []; // For saving weather data from API

const currentStatsModel = {
    get: function(){
        (async () => {
            try{
                /* Get weather data of taipei */
                let src =
                    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization="
                    + CWB_API_KEY
                    + "&locationName=臺北";
                let response = await fetch(src);
                let result = await response.json();
                taipeiWeatherCurrentStatsData.push({
                        "value": result.records.location[0].weatherElement[14].elementValue, // D_TX
                        "unit": "°",
                        "label": "最高溫度"
                    });
                taipeiWeatherCurrentStatsData.push({
                        "value": result.records.location[0].weatherElement[16].elementValue, // D_TN
                        "unit": "°",
                        "label": "最低溫度"
                    });
                taipeiWeatherCurrentStatsData.push({
                        "value": parseInt(result.records.location[0].weatherElement[2].elementValue), // WDSD
                        "unit": "m/s",
                        "label": "陣風風速"
                    });
                
                /* Get forecasted weather data of taipei for rain */
                src =
                    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?&Authorization="
                    + CWB_API_KEY
                    + "&locationName=臺北市";
                response = await fetch(src);
                result = await response.json();
                taipeiWeatherCurrentStatsData.push({
                        "value": result.records.location[0].weatherElement[1].time[0].parameter.parameterName, 
                        "unit": "%",
                        "label": "降雨機率"
                    });
                
                /* Get sunrise and sunset data of taipei */
                let todayForQuery = currentStatsModel.formatDateYYYYMMDD(today); // Change format
                src =
                    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization="
                    + CWB_API_KEY
                    + "&locationName=臺北市";
                response = await fetch(src + "&dataTime=" + todayForQuery);
                result = await response.json();
                console.log(result);
                taipeiWeatherCurrentStatsData.push({
                        "value": result.records.locations.location[0].time[0].parameter[1].parameterValue, 
                        "unit": "",
                        "label": "日出時間"
                    });
                taipeiWeatherCurrentStatsData.push({
                        "value": result.records.locations.location[0].time[0].parameter[5].parameterValue,
                        "unit": "",
                        "label": "日落時間"
                    });
                
                /* Render in C: Current Stats */
                currentStatsView.showCurrentStats(taipeiWeatherCurrentStatsData);
            }catch(err){
                console.log(err);
            }
        })();
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
    }
}

const currentStatsController = {
    init: function(){
        currentStatsModel.get();
    }
}

currentStatsController.init();