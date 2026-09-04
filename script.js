const btn = document.querySelector('#searchBTN');
let data;
let tempC,tempF,humidity,wind,cloud;

function fetchData(place = 'Kathmandu') {
    let api_key = "617584e629e64c8d9f725934260309";
    let url =  `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${encodeURIComponent(place)}`

    try {
        fetch(url)
        .then(Response => {
            return Response.json();
        })
        .then(result => {
            data = result;
            seperateData(data);
            addToFrontEnd();
        })
        .catch(err => {
            console.log('Error Occured' + err);
        });
    } catch {
        alert('Try again later');
    }
}

btn.addEventListener('click', e=> {
    const place = document.getElementById("head_search");
    fetchData(`${place.value}`);
});

function seperateData(obj) {
    tempC = obj['current']['temp_c'];
    tempF = obj['current']['temp_f'];
    humidity = obj['current']['humidity'];
    wind = obj['current']['wind_mph'];
    cloud = obj['current']['cloud'];
}

function addToFrontEnd() {
    document.getElementById("firstHeadThree").innerHTML = `Temperature: ${tempC}&#8451`;
    document.getElementById("secondHeadThree").innerHTML = `Temperature: ${tempF}&#847`;
    document.getElementById("thirdHeadThree").innerHTML = `Humidity: ${humidity}%`;
    document.getElementById("fourHeadThree").innerHTML = `Wind: ${wind}km/h`;
    document.getElementById("fiveHeadThree").innerHTML = `Cloud: ${cloud}%`;
}