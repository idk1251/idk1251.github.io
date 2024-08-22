const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    const { rollUsername } = JSON.parse(event.body);

    if (!rollUsername) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing username' })
        };
    }

    const webhookUrl = process.env.DISCORD_ROLL_WEBHOOK_URL;
    const winningNumbers = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
    const roll = Math.floor(Math.random() * 100000) + 1;

    const isWinningNumber = winningNumbers.includes(roll);
    const message = isWinningNumber
        ? `${rollUsername} rolled ${roll} and won! Congratulations! You will receive your 100M gems in 1 - 24 hours.`
        : `${rollUsername} rolled ${roll} but lost!`;

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message })
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message })
        };
    } catch (error) {
        console.error('Error processing roll:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error processing roll' })
        };
    }
};
