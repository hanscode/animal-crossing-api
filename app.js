/******************************************
Treehouse Code Adventures:
Animal Crossing API
Author - Hans Steffens
******************************************/

/** Header Parameters required for accessing to the Nookipedia API.  */
const options = {
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "f07b60b0-794d-48c7-8d52-c2ba255d210c",
    "Accept-Version": "1.0.0",
  },
};

const card = document.querySelector(".villager_card");

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

/**
 * Asycn function that uses a fetch() call
 * to get data and return a response in json format.
 * @param {string} url - The Nookipedia Endpoint url.
 * @param {string} options - The request header parameters.
 */

async function getJSON(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  //console.log(data);
  return data;
}

getJSON("https://api.nookipedia.com/villagers?nhdetails=true", options)
  .then((data) => generateVillager(data))
  .catch((error) => console.log("Looks like there was a problem!", error));

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function getRandomVillager(array) {
  // Variable that uses `Math.floor`, `Math.random` and the length of the array parameter to generate a random number
  const randomNumber = Math.floor(Math.random() * array.length);
  // Variable that gets the villager object
  let randomVillager = array[randomNumber];
  // `return` the random villager variable
  return randomVillager;
}

function generateVillager(data) {
  const villagers = data.filter((villager) => villager.nh_details !== null);
  const villager = getRandomVillager(villagers);
  const attributes = ["species", "personality", "birthday", "hobby"];
  const birthday = `${villager.birthday_month} ${villager.birthday_day}`;
  const hobby = `${villager.nh_details.hobby}`;

  // Insert chat bubble at the top of the card.
  card.insertAdjacentHTML(
    "afterbegin",
    `<div class="villager_icon__wrapper">
        <figure class="villager_icon__image">
            <img src="${villager.nh_details.icon_url}" width="128" height="128">
         </figure>
    </div>

    <div class="chat_bubble">
        <div class="villager_quote">
            ${villager.quote}<br>"<em>${villager.phrase}</em>"
        </div>
        <img src="assets/chat-bubble.png" alt="bubble">
        <div class="villager_tag_div" style="background-color:#${villager.title_color};">
            <div class="villager_tag_name" style="color:#${villager.text_color};">
                ${villager.name}
            </div>
        </div>
    </div>`
  );

  // Insert villager attributes below the chat bubble.
  attributes.map((attribute) => {
    card.insertAdjacentHTML(
      "beforeend",
      `<div class="villager_details ${attribute}_bg">
            <div class="villager_attribute">${attribute}</div>
            <div class="villager_data">
                <figure class="villager_data_icon">
                    <img src="${
                      attribute == "hobby"
                        ? "assets/" + hobby + ".svg"
                        : "assets/" + attribute + ".svg"
                    }" alt="icon">
                </figure>
                <span>${
                  attribute == "birthday"
                    ? birthday
                    : attribute == "hobby"
                    ? hobby
                    : villager[attribute]
                }</span>
            </div>
        </div>
        `
    );
  });
}
