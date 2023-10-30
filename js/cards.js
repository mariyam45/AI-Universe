const loadCards = async (cardLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayCards(data.data.tools, cardLimit);
};

const displayCards = (cards, cardLimit) => {
  const cardsContainer = document.getElementById("cards-area");

  // display-6 cards
  const showAll = document.getElementById("btn-showall");
  if (cardLimit && cards.length > 6) {
    cards = cards.slice(0, 6);
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  // --------------

  cards.forEach((card) => {
    const cardCont = document.createElement("div");
    cardCont.innerHTML = `
        <div class="card card-compact w-96 bg-base-100 border">
          <figure class="px-6 pt-6">
            <img src="${
              card.image ? card.image : `easy-fixes-for-no-wifi-connection.jpg`
            }" alt="Shoes" class="rounded-xl" />
          </figure>
          <div class="card-body mx-2">
            <h2 class="card-title">Features</h2>
            <p>1. ${card.features[0]}</p>
            <p>2. ${card.features[1]}</p>
            <p>3. ${card.features[2]}</p> 
            <hr>
            <div class="card-actions justify-between">
                <div>
                  <h2 class="card-title">${card.name}</h2>
                  <p> ${card.published_in}</p>
                </div>
              
                  <label onclick="loadCardDetails('${
                    card.id
                  }')" for="my_modal_6" class="btn btn-circle btn-outline   bg-red-50 text-red-500">  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"" /></svg></label>
                
                


            
            </div>
          </div>
        </div>
    `;
    cardsContainer.appendChild(cardCont);
  });
  toggleLoader(false);
  //   processSearch(6);
};

// --------

const processSearch = (cardLimit) => {
  toggleLoader(true);
  loadPhones(cardLimit);
};
// ---------

document.getElementById("showAll").addEventListener("click", function () {
  processSearch();
});
// const limitCards = (cardLimit) => {

// }

// add loader-------------
const toggleLoader = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("hidden");
  } else {
    loaderSection.classList.add("hidden");
  }
};
toggleLoader(true);

const loadCardDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayCardDetails(data.data);
};

const displayCardDetails = (card) => {
  console.log(card);
  const leftCardDetails = document.getElementById("card-left");
  leftCardDetails.innerHTML = `

                    <h2 class="card-title font-bold">${card.description}</h2>
                    <div id="price " class="flex flex-col md:flex-row mt-3">
                      <div
                        class="text-center mb-2 px-2 py-2 bg-base-100 me-3 rounded-xl text-green-600 font-bold"
                      >
                        ${
                          card.pricing[0].price
                            ? card.pricing[0].price
                            : "Free of Cost"
                        }
                        Basic
                      </div>
                      <div
                        class="text-center mb-2 px-2 py-2 me-3 bg-base-100 rounded-xl text-orange-500 font-bold"
                      >
                      ${
                        card.pricing[1].price
                          ? card.pricing[1].price
                          : "Free of Cost"
                      }
                      Pro
                      </div>
                      <div
                        class="text-center mb-2 px-2 py-2 me-1 bg-base-100 rounded-xl text-red-500 font-bold"
                      >
                        ${
                          card.pricing[2].price
                            ? card.pricing[2].price
                            : "Free of Cost"
                        }
                      </div>
                    </div>

                    <div id="lists" class="flex justify-between mt-4">
                      <ul>
                        <h2 class="text-md md:text-xl font-bold">Features</h2>
                        <li>1. ${
                          card.features["1"].feature_name
                            ? card.features["1"].feature_name
                            : "No data Found"
                        }</li>
                        <li>2.  ${
                          card.features["2"].feature_name
                            ? card.features["2"].feature_name
                            : "No data Found"
                        }</li>
                        <li>3.  ${
                          card.features["3"].feature_name
                            ? card.features["3"].feature_name
                            : "No data Found"
                        }</li>
                      </ul>
                      <ul class='md:ms-2'>
                        <h2 class="text-md md:text-xl font-bold ">
                          Integrations
                        </h2>
                        <li>1.${
                          card.integrations[0]
                            ? card.integrations[0]
                            : "No data Found"
                        }</li>
                        <li>2. ${
                          card.integrations[1]
                            ? card.integrations[1]
                            : "No data Found"
                        }</li>
                        <li>3. ${
                          card.integrations[2]
                            ? card.integrations[2]
                            : "No data Found"
                        }</li>
                      </ul>
                    </div>

  `;

  const rightCardDetails = document.getElementById("card-right");
  rightCardDetails.innerHTML = `
    <div class="card w-64 md:w-96 bg-base-100 border">
                    <div class="avatar indicator absolute top-6 right-14">
                      <span
                        class="indicator-item badge bg-red-500 border-0 text-white font-bold py-4 px-4 rounded-xl"
                        >${
                          card.accuracy.score * 100
                        }% <small> accuracy</small></span
                      >
                    </div>
                    <figure class="md:p-6 p-3 mb-0">
                      <img
                        src="${
                          card.image_link[0]
                            ? card.image_link[0]
                            : card.image_link[1]
                        }"
                        alt="A Image"
                        class="rounded-xl"
                      />
                    </figure>
                    <div class="card-body items-center text-center mt-0">
                      <h2 class="card-title">${
                        card.input_output_examples[0].input
                          ? card.input_output_examples[0].input
                          : card.input_output_examples[1].input
                      }</h2>
                      <p>${
                        card.input_output_examples[0].output
                          ? card.input_output_examples[0].output
                          : card.input_output_examples[1].output
                      }</p>
                    </div>
                  </div>
  `;
};

// processSearch(6);

loadCards();
