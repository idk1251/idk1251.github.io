document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('input', formatNumber);
    });
});

function formatNumber(event) {
    let value = event.target.value.replace(/,/g, '');
    if (!isNaN(value) && value.trim() !== '') {
        value = Number(value).toLocaleString();
        event.target.value = value;
    }
}

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
    
    // Convert daysRequired to years, months, and days
    const years = Math.floor(daysRequired / 365);
    const remainingDaysAfterYears = daysRequired % 365;
    const months = Math.floor(remainingDaysAfterYears / 30);
    const days = remainingDaysAfterYears % 30;

    document.getElementById("result").innerHTML = `It will take approximately ${years} years, ${months} months, and ${days} days to reach your goal balance of ${goalBalance.toLocaleString()} Gems.`;

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

    document.getElementById("start-label").innerHTML = `0 Gems`;
    document.getElementById("current-label").innerHTML = `${currentBalance.toLocaleString()} Gems`;
    document.getElementById("goal-label").innerHTML = `${goalBalance.toLocaleString()} Gems`;
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
