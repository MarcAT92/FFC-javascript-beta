// Define the price and cash-in-drawer (cid)
const price = 19.5;
let cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

// Constants for document elements
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueOutput = document.getElementById("change-due");
const cidContainer = document.getElementById("cid-container");

// Display CID in HTML
function displayCID() {
    cidContainer.innerHTML = "<h2>Cash in Drawer (CID)</h2>";
    cid.forEach(item => {
        cidContainer.innerHTML += `<p>${item[0]}: $${item[1].toFixed(2)}</p>`;
    });
}

displayCID(); // Display CID initially

// Function to handle the purchase button click
purchaseBtn.addEventListener("click", function() {
    const cash = parseFloat(cashInput.value);
    if (!cash) {
        alert("Please Enter CASH Value!!");
        return;
    } else if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (cash === price) {
        changeDueOutput.innerText = "No change due - customer paid with exact cash";
        return;
    }
    const changeDue = calculateChange(price, cash, cid);
    changeDueOutput.innerText = changeDue;
    displayCID(); // Update CID display after purchase
});

// Function to calculate the change due
function calculateChange(price, cash, cid) {
    let change = cash - price;
    let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0);

    if (change > totalCid) {
        return "Status: INSUFFICIENT_FUNDS";
    } else if (change === totalCid) {
        // When total CID equals the change due, return "Status: CLOSED"
        return "Status: CLOSED " + cid
            .filter(item => item[1] > 0) // Only include non-zero coins/bills
            .sort((a, b) => {
                // Sort the currency in descending order of value
                const currencyValues = {
                    "ONE HUNDRED": 100,
                    "TWENTY": 20,
                    "TEN": 10,
                    "FIVE": 5,
                    "ONE": 1,
                    "QUARTER": 0.25,
                    "DIME": 0.1,
                    "NICKEL": 0.05,
                    "PENNY": 0.01
                };

                return currencyValues[b[0]] - currencyValues[a[0]];
            })
            .map(item => `${item[0]}: $${item[1].toFixed(2)}`)
            .join(" ");
    } else {
        let changeArray = [];
        const currencyValues = {
            "ONE HUNDRED": 100,
            "TWENTY": 20,
            "TEN": 10,
            "FIVE": 5,
            "ONE": 1,
            "QUARTER": 0.25,
            "DIME": 0.1,
            "NICKEL": 0.05,
            "PENNY": 0.01
        };

        cid.reverse(); // Start from the largest denomination first

        for (let i = 0; i < cid.length; i++) {
            let currencyName = cid[i][0];
            let currencyTotal = cid[i][1];
            let currencyValue = currencyValues[currencyName];
            let currencyAmount = Math.min(currencyTotal, Math.floor(change / currencyValue) * currencyValue);

            if (currencyAmount > 0) {
                changeArray.push([currencyName, currencyAmount]);
                change -= currencyAmount;
                change = Math.round(change * 100) / 100; // Round to two decimal places
                // Update CID after deducting the currency amount
                cid[i][1] -= currencyAmount;
            }
        }

        if (change > 0) {
            return "Status: INSUFFICIENT_FUNDS";
        } else {
            return "Status: OPEN " + changeArray.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(" ");
        }
    }
}
