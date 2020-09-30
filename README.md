# Twilio Autopilot Sample Setup
This is a description of a sample set up to get started with Twilio Autopilot, including a basic Function to handle dynamic content!

## What will you build
You will build a simple bot that responds to a few different tasks like:
* Greeting the user
* Giving the user today's specials!
* Allow the user to make a reservation and play back to them the reservation details
* Handing off to an "agent"

This bot is simply a start to get you familiarised with Autopilot and other Twilio products that it can utilize to expand its capabilities (for example, Twilio Functions, TwiML Bins etc).

We can't wait to see what you build with it!

## What you will need

* A Twilio account. You can start here: https://www.twilio.com/try-twilio
* (Optional) Twilio CLI installed with the Autopilot plugin. This is required if you want to import a bot via JSON: https://www.twilio.com/docs/twilio-cli/quickstart and https://www.twilio.com/docs/autopilot/twilio-autopilot-cli

## Building Steps

### Create the Function
In this sample project we will use only one Function to display dynamic content (for example, repeating to the user the booking details after they submit the booking to our bot)

* Go to https://www.twilio.com/console/functions/overview (Note: You are seeing the v2.0 of Functions which at the time of writing is our brand new format!)
* Click on "Create Service" to create your service that will host your function file (and any other files you want to add later)
* After you are in the Service page click on "+Add" to add the new Function. You can leave it as "Protected" mode which means that it can be used through Twilio and not externally
* Copy paste the code from the resources in this repo "bot.js"
* Click Save and Deploy All
* You should have something like the screen below. Notice the green tick next to the function name which means the changes have been applied
<insert image>
* Finally, copy somewhere the URL of the Function ("Copy URL" option) as it will be used later

### Create the TwiML Bin
In this sample project we use a simple TwiML Bin to simulate the handoff-to-agent functionality.

* Go to https://www.twilio.com/console/twiml-bins and create a new TwiML Bin
* Paste the following code in, using the values in the placeholders
```js
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial callerId="YOUR_TWILIO_NUMBER">
        <Number>YOUR_PERSONAL_NUMBER</Number>
    </Dial>
</Response>
```

### Create the Bot via JSON (optional - using the Twilio CLI)
In case you have installed the CLI (recommended), you can directly import the bot.json found in the resources of this repo

Make sure you change the following in the JSON body of the bot:
* Under tasks -> handoff, replace YOUR_TWIML_BIN value with the actual URL of the TwiML Bin you created above
* Under tasks -> make_reservation, replace YOUR_FUNCTION_URI value with the actual URL of the Function you created above

Then you can create the bot using the Autopilot CLI
`twilio autopilot:create -s /path/of/json`
