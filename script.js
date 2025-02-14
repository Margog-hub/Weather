const APIKEY ='f7eaf92e445b66f98a073ec01d42535f'

const $cardsBox = document.getElementById("cards-box")
const $locationFort = document.getElementById("location-form")
const $locationInput = document.getElementById("location-form-input")
let currentCard =null

 async function getWeatherData(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`);
  
  const data = await response.json()
  return data
}

function getNewCard() {
  const $card = document.createElement("div");
  $card.classList.add("card");
  $card.innerHTML = `

  <div class="card__inner">
  <!--  шапка-->
  <div class="card__head">
    <div class="card__head-left">
      <div class="card__icon"></div>
      <div class="card__head-left-title">
        <h3 class="card__title">Moscov</h3>
        <span class="card__desc">Description</span>
      </div>
    </div>
    <div class="card__head-right card-param">
      <svg class="card-param__icon" xmlns="http://www.w3.org/2000/svg" width="32" height= "32px" data-name="Layer 1" viewBox="0 0 96 96">
        <path d="M54.54 94a18.65 18.65 0 0 1-2.23-.13 19.78 19.78 0 0 1-4.9-38.1V9.18a7.18 7.18 0 1 1 14.35 0v46.58A19.79 19.79 0 0 1 54.54 94Zm0-90a5.18 5.18 0 0 0-5.17 5.18v47.28a1 1 0 0 1-.68.95 17.81 17.81 0 1 0 11.71 0 1 1 0 0 1-.68-.95V9.18A5.18 5.18 0 0 0 54.58 4Z"/>
        <path d="M54.58 85.59A11.39 11.39 0 1 1 66 74.2a11.4 11.4 0 0 1-11.42 11.39Zm0-20.78A9.39 9.39 0 1 0 64 74.2a9.41 9.41 0 0 0-9.42-9.39Z"/>
        <path d="M54.58 64.81a1 1 0 0 1-1-1V14.26a1 1 0 0 1 2 0v49.55a1 1 0 0 1-1 1ZM77.58 9.79h-8.82a1 1 0 0 1 0-2h8.82a1 1 0 1 1 0 2ZM73.17 19.75h-4.41a1 1 0 0 1 0-2h4.41a1 1 0 0 1 0 2ZM77.58 29.71h-8.82a1 1 0 0 1 0-2h8.82a1 1 0 0 1 0 2ZM73.17 39.66h-4.41a1 1 0 0 1 0-2h4.41a1 1 0 0 1 0 2ZM77.58 49.62h-8.82a1 1 0 0 1 0-2h8.82a1 1 0 0 1 0 2ZM42 40.84a11 11 0 1 1 7-19.38 1 1 0 0 1 .12 1.41 1 1 0 0 1-1.4.13 9 9 0 1 0 0 13.77A1 1 0 0 1 49 38.31a11 11 0 0 1-7 2.53ZM42 13.24a1 1 0 0 1-1-1v-6a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1ZM29.56 18.41a1 1 0 0 1-.71-.29l-4.22-4.23A1 1 0 0 1 26 12.48l4.23 4.22a1 1 0 0 1 0 1.42 1 1 0 0 1-.67.29ZM24.39 30.89h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2ZM25.34 47.59a1 1 0 0 1-.71-1.71l4.22-4.22a1 1 0 0 1 1.42 0 1 1 0 0 1 0 1.41L26 47.29a1 1 0 0 1-.66.3ZM42 54.5a1 1 0 0 1-1-1v-6a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1Z"/>
      </svg>
      <span class="card-param-text">
        <span class="card-param-value card-param-value_temp"></span>
        <sup>o</sup>C
      </span>

    </div>
  </div>
  <!-- футер -->
  <div class="card__footer">
    <div class="card__footer-left">
      <!-- svg -->
  
  <svg xmlns="http://www.w3.org/2000/svg" class="card-param__icon xml:space="preserve" width="32" height= "32px" style="enable-background:new 0 0 512.001 512.001" viewBox="0 0 512.001 512.001">
        <path d="M280.503 66.696c-26.499-26.341-69.487-26.214-95.828.284-8.054 8.102-8.015 21.198.086 29.251 8.102 8.055 21.199 8.015 29.251-.086 10.26-10.321 27.005-10.371 37.326-.111 10.321 10.26 10.371 27.005.11 37.326-4.923 4.952-11.739 7.786-18.806 7.786H20.684C9.261 141.146 0 150.407 0 161.83c0 11.423 9.261 20.684 20.684 20.684h212.041c17.92 0 35.424-7.276 48.063-19.989 26.34-26.498 26.213-69.486-.285-95.829zM351.403 349.445c-12.637-12.714-30.141-19.99-47.977-19.99l-.277.001H20.684C9.261 329.456 0 338.716 0 350.14s9.261 20.684 20.684 20.684h282.659c6.981 0 13.799 2.834 18.721 7.786 10.26 10.321 10.211 27.066-.11 37.326-4.982 4.951-11.586 7.675-18.605 7.675h-.081c-7.05-.021-13.67-2.786-18.639-7.785-8.053-8.103-21.15-8.14-29.25-.087-8.102 8.053-8.141 21.149-.087 29.25 12.76 12.837 29.756 19.935 47.855 19.989h.207c18.022 0 34.979-6.993 47.768-19.705 26.496-26.342 26.622-69.331.281-95.828z"/>
        <path d="M488.816 140.973c-15.003-15.04-34.965-23.339-56.207-23.365h-.104c-21.205 0-41.147 8.246-56.162 23.223-8.088 8.068-8.104 21.164-.037 29.251 8.068 8.09 21.163 8.102 29.251.038 7.205-7.188 16.774-11.143 26.95-11.143h.05c10.194.013 19.773 3.994 26.972 11.212 14.861 14.899 14.83 39.11-.068 53.971-7.186 7.168-16.734 11.125-26.846 11.143H20.684C9.261 235.302 0 244.562 0 255.985c0 11.424 9.261 20.684 20.684 20.684H432.65c21.151-.038 41.047-8.285 56.024-23.224 31.047-30.969 31.11-81.425.142-112.472z"/>
      </svg>

       <span class="card-param-text_footer">
        <span class="card-param-value card-param-value_wind"></span>
        м/c
       </span>
    </div>
    <div class="card__footer-right">
      <!-- svg -->
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height= "32px" class="card-param__icon">
    <path d="M26 12a3.898 3.898 0 0 1-4-3.777 3.902 3.902 0 0 1 .653-2.064l2.517-3.745a1.038 1.038 0 0 1 1.66 0l2.485 3.696A3.97 3.97 0 0 1 30 8.223 3.898 3.898 0 0 1 26 12Zm0-7.237-1.656 2.463a1.89 1.89 0 0 0-.344.997 2.014 2.014 0 0 0 4 0 1.98 1.98 0 0 0-.375-1.047ZM23.5 30h-15a6.496 6.496 0 0 1-1.3-12.862 8.994 8.994 0 0 1 17.6 0A6.496 6.496 0 0 1 23.5 30ZM16 12a7 7 0 0 0-6.941 6.145l-.1.812-.815.064A4.496 4.496 0 0 0 8.5 28h15a4.496 4.496 0 0 0 .356-8.979l-.815-.064-.099-.812A7.002 7.002 0 0 0 16 12Z"/>
    <path d="M0 0h32v32H0z" data-name="&lt;Transparent Rectangle&gt;" style="fill:none"/></svg>
      <span class="card-param-text_footer">
        <span class="card-param-value card-param-value_humidity"></span>
        %
       </span>
    </div>
  </div>
</div>
  `
  return {
    $card,
    $icon: $card.querySelector(".card__icon"),
    $title: $card.querySelector(".card__title"),
    $temp: $card.querySelector(".card-param-value_temp"),
    $desc: $card.querySelector(".card__desc"),
    $wind: $card.querySelector(".card-param-value_wind"),
    $humidity: $card.querySelector(".card-param-value_humidity"),
  }
}

$locationFort.addEventListener("submit", function (event) {
  event.preventDefault()

  const newCard = getNewCard();
  const location = $locationInput.value.trim()
  $locationInput.value = ''

  $cardsBox.prepend(newCard.$card)

  setTimeout(async function () {
    newCard.$card.classList.add("loading")
    try{

    const data =  await getWeatherData(location)
    // Перевіряємо картку чи є таке місто 
    if (data.cod === "404") {
      alert("Город не найден. Проверьте правильность ввода!");
      newCard.$card.remove(); // видаляємо картку
      return;
  }

    newCard.$icon.style.backgroundImage =`
    url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)
    `
    newCard.$title.textContent = data.name;
    newCard.$desc.textContent = data.weather[0].description;
    newCard.$temp.textContent = Math.round(data.main.temp);
    newCard.$wind.textContent = data.wind.speed;
    newCard.$humidity.textContent = data.main.humidity;

    console.log(data);
    
    setTimeout(function () {

      // зміна стилю форми
      document.querySelector(".app__container").classList.add("app__container_top")
      
     // document.body.style.backgroundImage =`url(img/bg/${data.weather[0].icon}.jpeg)`
      if(currentCard != null) {
        currentCard.$card.classList.add("glass")
      }
      currentCard = newCard
      newCard.$card.classList.remove("loading")
      newCard.$card.classList.add("full")
    }, 800)
  } catch (error) {
    alert("Произошла ошибка при загрузке данных. Попробуйте позже.");
    console.error("Ошибка запроса:", error);
    newCard.$card.remove(); // видаляємо картку якщо помилка
  } }, 30)
})

