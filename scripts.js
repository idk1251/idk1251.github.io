function updateProgressBar() {
    const initialBalance = parseFloat(document.getElementById("initialBalance").value.replace(/,/g, ""));
    const goalBalance = parseFloat(document.getElementById("goalBalance").value.replace(/,/g, ""));
    const progressBar = document.getElementById("progress-fill");

    if (isNaN(initialBalance) || isNaN(goalBalance) || goalBalance <= initialBalance) {
        progressBar.style.width = '0%';
        document.getElementById("start-label").textContent = "0 Gems";
        document.getElementById("current-label").textContent = "0 Gems";
        document.getElementById("goal-label").textContent = "0 Gems";
    } else {
        const progressPercent = ((initialBalance / goalBalance) * 100).toFixed(2);
        progressBar.style.width = `${progressPercent}%`;
        document.getElementById("start-label").textContent = `${initialBalance.toLocaleString()} Gems`;
        document.getElementById("current-label").textContent = `${initialBalance.toLocaleString()} Gems`;
        document.getElementById("goal-label").textContent = `${goalBalance.toLocaleString()} Gems`;
    }
}

function updateGoalBalance() {
    const rankValue = parseFloat(document.getElementById("rankSelect").value);
    if (!isNaN(rankValue)) {
        document.getElementById("goalBalance").value = rankValue.toLocaleString();
    }
}

function calculateDays() {
    const initialBalance = parseFloat(document.getElementById("initialBalance").value.replace(/,/g, ""));
    const goalBalance = parseFloat(document.getElementById("goalBalance").value.replace(/,/g, ""));

    if (isNaN(initialBalance) || isNaN(goalBalance) || goalBalance <= initialBalance) {
        document.getElementById("result").textContent = "Invalid input or goal balance must be greater than initial balance.";
        return;
    }

    const growthRate = 1.01; // Assume 1% growth per day
    let currentBalance = initialBalance;
    let days = 0;

    while (currentBalance < goalBalance) {
        currentBalance *= growthRate;
        days++;
    }

    document.getElementById("result").textContent = `It will take approximately ${days} days to reach your goal balance of ${goalBalance.toLocaleString()} Gems.`;

    updateProgressBar();
}

function calculateGoal() {
    const balanceGems = parseFloat(document.getElementById("balanceGems").value.replace(/,/g, ""));
    const timeUnit = document.getElementById("timeUnit").value;
    const timeAmount = parseInt(document.getElementById("timeAmount").value);

    if (isNaN(balanceGems) || isNaN(timeAmount) || timeAmount <= 0) {
        document.getElementById("goalResult").textContent = "Invalid input. Please enter valid numbers.";
        return;
    }

    const growthRate = 1.01; // Assume 1% growth per day
    let growthPeriods;

    switch (timeUnit) {
        case "days":
            growthPeriods = timeAmount;
            break;
        case "weeks":
            growthPeriods = timeAmount * 7;
            break;
        case "months":
            growthPeriods = timeAmount * 30;
            break;
        case "years":
            growthPeriods = timeAmount * 365;
            break;
        default:
            document.getElementById("goalResult").textContent = "Invalid time unit.";
            return;
    }

    let finalBalance = balanceGems * Math.pow(growthRate, growthPeriods);

    document.getElementById("goalResult").textContent = `After ${timeAmount} ${timeUnit}(s), your balance will be approximately ${finalBalance.toLocaleString()} Gems.`;
}

function closeDonatePopup() {
    document.getElementById("donatePopup").style.display = "none";
}

function openDonatePopup() {
    document.getElementById("donatePopup").style.display = "block";
}
