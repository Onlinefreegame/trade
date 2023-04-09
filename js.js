let table = document.getElementById("data-table");
let rowCount = 0;

async function fetchData() {
  try {
    const response = await fetch(
      "https://api.binance.com/api/v3/ticker/24hr?symbol=XRPUSDT"
    );
    const data = await response.json();
    const xrpPrice = parseFloat(data.lastPrice);
    const atr = parseFloat(data.highPrice) - parseFloat(data.lowPrice);
    const atrPercent = ((atr / xrpPrice) * 100).toFixed(2);
    const stopLoss = (xrpPrice - atr * 2).toFixed(2);
    const maximumPrice = (xrpPrice + atr * 3).toFixed(2);
    const riskPercent = (((xrpPrice - stopLoss) / xrpPrice) * 100).toFixed(2);
    const profitPercent = (((maximumPrice - xrpPrice) / xrpPrice) * 100).toFixed(2);

    let row = table.insertRow(++rowCount);
    let dateCell = row.insertCell(0);
    let xrpPriceCell = row.insertCell(1);
    let atrCell = row.insertCell(2);
    let stopLossCell = row.insertCell(3);
    let maximumPriceCell = row.insertCell(4);
    let riskCell = row.insertCell(5);
    let profitCell = row.insertCell(6);

    dateCell.innerHTML = new Date();
    xrpPriceCell.innerHTML = `₹${(xrpPrice * 74.5).toFixed(2)}`;
    atrCell.innerHTML = `${atrPercent}%`;
    stopLossCell.innerHTML = `₹${(stopLoss * 74.5).toFixed(2)}`;
    maximumPriceCell.innerHTML = `₹${(maximumPrice * 74.5).toFixed(2)}`;
    riskCell.innerHTML = `${riskPercent}% Risk`;
    profitCell.innerHTML = `${profitPercent}% Profit`;
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("refresh-data").addEventListener("click", fetchData);

fetchData();
