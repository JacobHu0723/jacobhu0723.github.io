let fetch;

async function loadFetch() {
    fetch = (await import('node-fetch')).default;
}

async function getAccessToken() {
    await loadFetch();
    const tenantId = '9794930c-dab4-4943-9c2c-5fdd411760cb';
    const clientId = '7044225b-1aeb-4851-961a-bd03e8ac4d7b';
    const clientSecret = '0Xy8Q~8VHWpFxrhL95iswI.aurHXAgrpwJvQTbe7';
    const scope = 'https://graph.microsoft.com/.default';

    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const postData = `client_id=${clientId}&scope=${scope}&client_secret=${clientSecret}&grant_type=client_credentials`;

    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postData
    });

    if (response.ok) {
        const data = await response.json();
        return data.access_token;
    } else {
        console.error('An error occurred while getting the access token');
        const errorText = await response.text();
        console.error('Response:', errorText);
        return null;
    }
}

async function sendEmail(accessToken) {
    await loadFetch();
    const userId = 'a7029b6b-cf26-425c-8b0d-0aa6c2445326';
    const graphEndpoint = `https://graph.microsoft.com/v1.0/users/${userId}/sendMail`;

    const mail = {
        message: {
            subject: 'Test email',
            body: {
                contentType: 'Text',
                content: 'This is a test email'
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: 'jacobhu0723@outlook.com'
                    }
                }
            ]
        }
    };

    const response = await fetch(graphEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(mail)
    });

    if (response.ok) {
        console.log('Email sent successfully');
    } else {
        console.error('An error occurred while sending the email');
    }
}

async function main() {
    await loadFetch();
    const accessToken = await getAccessToken();
    if (accessToken) {
        await sendEmail(accessToken);
    }
}

main();
