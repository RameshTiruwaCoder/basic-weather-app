const btn = document.querySelector('#searchBTN');
let tempC,tempF,humidity,wind,cloud,cityName,icon,data;

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
            console.log(result);
            seperateData(data);
            addToFrontEnd();
        })
        .catch(err => {
            alert("Enter place name correctly");
        });
    } catch {
        alert('Try again later with proper name');
    }
}

btn.addEventListener('click', e=> {
    const place = document.getElementById("head_search");
    fetchData(`${place.value}`);
    place.value = "";
});

function seperateData(obj) {
    tempC = obj['current']['temp_c'];
    tempF = obj['current']['temp_f'];
    humidity = obj['current']['humidity'];
    wind = obj['current']['wind_mph'];
    cloud = obj['current']['cloud'];
    cityName = obj['location']['name'];
    icon = `https:${obj['current']['condition']['icon']}`;
}

function addToFrontEnd() {
    document.getElementById("cityPlaceHolder").innerText = `${cityName}`;
    document.getElementById("firstHeadThree").innerHTML = `Temperature: ${tempC}°C`;
    document.getElementById("secondHeadThree").innerHTML = `Temperature: ${tempF}°F`;
    document.getElementById("thirdHeadThree").innerHTML = `Humidity: ${humidity}%`;
    document.getElementById("fourHeadThree").innerHTML = `Wind: ${wind}mph`;
    document.getElementById("weatherIMG").setAttribute('src', icon);
    document.getElementById("fiveHeadThree").innerHTML = `Cloud: ${cloud}%`;
}