function addMaleCelebrity() {
    console.log("adding celebrity");
    var shade = document.getElementById("shade");
    var celebrityName = this.parentNode.getElementByName("celebrityName");
    var celebrityCard = document.createElement("div");
    celebrityCard.className = "male-celebrity";
    celebrityCard.innerText = celebrityName;
    shade.appendChild(celebrityCard)
}

function addFemaleCelebrity() {
    console.log("adding celebrity");
    var shade = document.getElementById("shade");
    var celebrityName = this.parentNode.getElementByName("celebrityName");
    var celebrityCard = document.createElement("div");
    celebrityCard.className = "female-celebrity";
    celebrityCard.innerText = celebrityName;
    shade.appendChild(celebrityCard)
}

function initializeApplication() {
    var controlPanel = document.getElementById("control-panel");

    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "celebtrityName");
    nameInput.setAttribute("defaultValue", "Celebrity name");

    var buttonMale = document.createElement("button");
    buttonMale.innerHTML = "Add male";
    buttonMale.addEventListener("click", addMaleCelebrity);

    var buttonFemale = document.createElement("button");
    buttonFemale.innerHTML = "Add female";
    buttonMale.addEventListener("click", addFemaleCelebrity);

    var buttonNextDay = document.createElement("button");
    buttonNextDay.innerHTML = "Next day";

    var intervalInput = document.createElement("input");
    intervalInput.setAttribute("type", "number");
    intervalInput.setAttribute("value", 3);

    var buttonAutoSimulate = document.createElement("button");
    buttonAutoSimulate.innerHTML = "Auto simulate";

    controlPanel.appendChild(nameInput);
    controlPanel.appendChild(buttonMale);
    controlPanel.appendChild(buttonFemale);
    controlPanel.appendChild(document.createElement("br"));
    controlPanel.appendChild(buttonNextDay);  
    controlPanel.appendChild(document.createElement("br"));
    controlPanel.appendChild(intervalInput);
    controlPanel.appendChild(document.createTextNode("×0.1s"));
    controlPanel.appendChild(buttonAutoSimulate);
}

document.addEventListener("DOMContentLoaded", initializeApplication)