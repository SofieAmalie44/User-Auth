

const userInput = document.querySelector("input")
const button = document.querySelector("button")
const outputApi = document.querySelector("#output")
const invalidP = document.querySelector("#invalidP")
const catP = document.querySelector("#catP")

button.addEventListener('click', function () {
    const userApiUrl = userInput.value;   // gets the users input value

if (userUrlIsValid(userApiUrl)) {

    outputApi.innerHTML = "";  // will clear the output div when new input

    fetch(userApiUrl)  // fetches the api url the user typed in
        .then(response => response.json())
        .then(userInputData => {
            outputApi.innerText = JSON.stringify(userInputData, null, 2);  // shows the api data in output div

        })
        .catch(error => {    // if any error in api input it will be caught and shown in console
            console.error("Error fetching data:", error);
            if (error) {   // If the user has input an invalid API, the application will display following:
                fetch('https://catfact.ninja/fact')
                    .then(response => response.json())
                    .then(catData => {
                        invalidP.innerHTML = "It seems that your API is invalid, so here is a random fact about cats:";
                        catP.innerHTML = catData.fact;  // will display in hmtl page if error occur, to tell the user the api is invalid
                    })
            }
        })
    userInput.value = "";   // will empty the input after button is clicked
    }
});
function userUrlIsValid(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}