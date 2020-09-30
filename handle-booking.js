//const axios = require('axios').default;

exports.handler = function(context, event, callback) {

    let memory = JSON.parse(event.Memory);

    let first_name = memory.twilio.collected_data.make_reservation.answers.first_name.answer;
    let date = memory.twilio.collected_data.make_reservation.answers.date.answer;
    let time = memory.twilio.collected_data.make_reservation.answers.time.answer;
    let party_size = memory.twilio.collected_data.make_reservation.answers.party_size.answer;

    console.log(first_name, date, time, party_size);

    let resp = {
        "actions": [
            {
                "say": "Great thank you " + first_name + " I checked that the slot is available and booked it for you! See you on " + date + " at " + time + "!"
            }
        ]
    }
    callback(null, resp);

    //The below is an example on how you can use Functions during an Autopilot session to reach to other services e.g. get information from a database during an appointment booking
    /*
    const config = {
        method: "get",
        baseURL: "https://BASE",
        url: "/LINK",
        headers: {
            'TFN': 'XXXX',
            'Cookie': 'XXXX'
        }
    }

    axios(config)
    .then(function (response) {
        console.log(response.data);

        let after_database = {
               "actions": [
                   {
                       "say" : "We reached a database!"
                   }
               ]
        };
        callback(null, after_database);
    })
    .catch(function (error) {
        console.log(error);
        callback(error);
    });
    */

};
