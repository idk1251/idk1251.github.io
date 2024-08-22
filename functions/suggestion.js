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

    try {
        const payload = { content: `${discordUser} suggested: ${suggestionText}` };
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Failed to send suggestion: ${response.statusText}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Suggestion submitted successfully!' })
        };
    } catch (error) {
        console.error('Error submitting suggestion:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error submitting suggestion' })
        };
    }
};
