const MyAPI = `aabc2d80d4fa3ce7753b95e3e67cc534`;
const weatherform = document.querySelector(".main");
const cityinput = document.querySelector(".cityname");
const card = document.querySelector(".card");

weatherform.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityinput.value;

    if(city){
         try{
          const weatherdata = await getweatherdata(city);
          displayweatherinfo(weatherdata)
         }
         catch(error){
         displayerror(error);
         }
    }
    else{
        displayerror("Teri, dal ta ha ya nahi?");
    }

    
})

async function getweatherdata(city) {
    
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MyAPI}`;

    const response = await fetch(apiurl);

    if(!response.ok){
        throw new Error("Oye! Insan ka bacha ban")
    }

    return await response.json();

}

function displayweatherinfo(data){

    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";



    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const desdisplay = document.createElement("p");
    const weatheremo = document.createElement("p");

    citydisplay.textContent = city ;
    citydisplay.classList.add("discity");

    tempdisplay.textContent = `${(temp - 273.5).toFixed(1)} ℃` ;
    tempdisplay.classList.add("distemp");

    humiditydisplay.textContent = `Humidity level: ${humidity}` ;
    humiditydisplay.classList.add("dishum");

    desdisplay.textContent = description ;
    desdisplay.classList.add("disweather");

    weatheremo.textContent = getweatheremoji(id) ;
    weatheremo.classList.add("disemo");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(desdisplay);
    card.appendChild(weatheremo);
}

function getweatheremoji(weatherid){

    switch(true){
        case(weatherid >= 200 && weatherid < 300):
             return "⛈";
        case(weatherid >= 300 && weatherid < 400):
             return "🌧";
        case(weatherid >= 500 && weatherid < 600):
             return "🌧";
        case(weatherid >= 600 && weatherid < 700):
             return "❄";
        case(weatherid >= 700 && weatherid < 800):
             return "🌫";
        case(weatherid === 800):
             return "☀";
        case(weatherid >= 801 && weatherid < 810):
             return "☁";
        default:
            return "❓";
    }

}
    

function displayerror(message){

    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("diserror");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}