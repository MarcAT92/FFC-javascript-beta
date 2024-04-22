const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");

const validatePhoneNumber = () => {
    const phoneNumber = userInput.value.trim();

    if (!phoneNumber) {
        alert("Please provide a phone number");
        return;
    }

    const regex = /^(1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/;
    if (regex.test(phoneNumber)) {
        resultsDiv.textContent = "Valid US number: " + phoneNumber;
    } else {
        resultsDiv.textContent = "Invalid US number: " + phoneNumber;
    }
};

const clearResults = () => {
    userInput.value = "";
    resultsDiv.textContent = "";
};

checkBtn.addEventListener("click", validatePhoneNumber);
clearBtn.addEventListener("click", clearResults);
