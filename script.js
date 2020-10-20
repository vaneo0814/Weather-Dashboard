var apiKey = "aaf8eceac24449085c5be7ce04f1f018";
var userInput = $("search-term").val.trim();
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + userInput + apiKey;