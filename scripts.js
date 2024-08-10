function calculateDays() {
    const initialBalanceInput = document.getElementById("initialBalance").value.replace(/,/g, '');
    const goalBalanceInput = document.getElementById("goalBalance").value.replace(/,/g, '');
    const initialBalance = parseInt(initialBalanceInput, 10);
    const goalBalance = parseInt(goalBalanceInput, 10);

    if (isNaN(initialBalance) || isNaN(goalBalance) || goalBalance <= initialBalance) {
        document.getElementById("result").innerHTML = "Please enter valid values.";
        return;
    }

    const growthRate = 0.01;
    const daysRequired = Math.ceil(Math.log(goalBalance / initialBalance) / Math.log(1 + growthRate));
    document.getElementById("result").innerHTML = `Days required to reach the goal: ${daysRequired} days.`;

    updateProgressBar(initialBalance, goalBalance);
}

function updateGoalBalance() {
    const rankSelect = document.getElementById("rankSelect");
    const selectedValue = rankSelect.value;
    document.getElementById("goalBalance").value = parseInt(selectedValue).toLocaleString();
}

function updateProgressBar(currentBalance, goalBalance) {
    const progressFill = document.getElementById("progress-fill");
    const percentage = (currentBalance / goalBalance) * 100;
    progressFill.style.width = `${percentage}%`;

    document.getElementById("start-label").innerHTML = `${currentBalance.toLocaleString()} Gems`;
    document.getElementById("goal-label").innerHTML = `${goalBalance.toLocaleString()} Gems`;
    document.getElementById("current-label").innerHTML = `${currentBalance.toLocaleString()} Gems`;
}

function calculateGoal() {
    const balanceGemsInput = document.getElementById("balanceGems").value.replace(/,/g, '');
    const balanceGems = parseInt(balanceGemsInput, 10);
    const timeUnit = document.getElementById("timeUnit").value;
    const timeAmountInput = document.getElementById("timeAmount").value.replace(/,/g, '');
    const timeAmount = parseInt(timeAmountInput, 10);

    if (isNaN(balanceGems) || isNaN(timeAmount)) {
        document.getElementById("goalResult").innerHTML = "Please enter valid values.";
        return;
    }

    const growthRate = 0.01;
    const totalDays = convertTimeToDays(timeUnit, timeAmount);
    const goalBalance = Math.floor(balanceGems * Math.pow(1 + growthRate, totalDays));

    document.getElementById("goalResult").innerHTML = `Goal balance after ${timeAmount} ${timeUnit}: ${goalBalance.toLocaleString()} Gems.`;
}

function convertTimeToDays(unit, amount) {
    switch (unit) {
        case "days":
            return amount;
        case "weeks":
            return amount * 7;
        case "months":
            return amount * 30;
        case "years":
            return amount * 365;
        default:
            return 0;
    }
}

function closeDonatePopup() {
    document.getElementById("donatePopup").style.display = "none";
}
