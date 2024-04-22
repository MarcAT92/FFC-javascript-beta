const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

const checkInput = () => {
    const inputValue = textInput.value;

    if (!inputValue) {
        alert("Please input a value");
        return;
    } else {
        const alphanumeric = inputValue.replace(/[\W_]/g, "").toLowerCase();
        const reversed = alphanumeric.split("").reverse().join("");

        if (reversed === alphanumeric) {
            resultDiv.innerText = `${inputValue} is a palindrome`;
        } else {
            resultDiv.innerText = `${inputValue} is not a palindrome`;
        }
    }
};

checkBtn.addEventListener("click", checkInput);
