const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    const { discordUser, suggestionText } = JSON.parse(event.body);

    if (!discordUser || !suggestionText) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing required fields' })
        };
    }

    const webhookUrl = process.env.DISCORD_SUGGESTION_WEBHOOK_URL;

    const payload = { content: `${discordUser} suggested: ${suggestionText}` };
    
    await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Suggestion submitted successfully!' })
    };
};
