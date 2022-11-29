const sendSingleDeviceNotification = async ({ notification }) => {

    const APIURL = "https://fcm.googleapis.com/fcm/send"
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "key=AAAANsaLQLk:APA91bH6_dDF1p2eHz0aqEyU9QzkNaiqU20I8q5M_ZVVWzGYH9vPJMNxmZKMY4Wkw2F9yqSywyeQAVmosbyvKJjjX_H1GNkRCamMWVZ0xU64KUqFcRYdDra58PONFn2afUNt1wLv9_Ll");

    const raw = JSON.stringify({
        "data": {},
        "notification": {
            "body": notification.body,
            "title": notification.title
        },
        "to": notification.token
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch(APIURL, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export default { sendSingleDeviceNotification };