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
* Click on `Create Service` to create your service that will host your function file (and any other files you want to add later)
* After you are in the Service page click on `+Add` to add the new Function. You can leave it as "Protected" mode which means that it can be used through Twilio and not externally
* Copy paste the code from the resources in this repo `handle-booking.js`
* Click `Save` and then `Deploy All`
* You should have something like the screen below. Notice the green tick next to the function name which means the changes have been applied
<insert image>
* Finally, copy somewhere the URL of the Function (`Copy URL` option) as it will be used later

### Create the TwiML Bin
In this sample project we use a simple TwiML Bin to simulate the handoff-to-agent functionality.

* Go to https://www.twilio.com/console/twiml-bins and create a new TwiML Bin
* Paste the following code in, replacing the values in the placeholders. In this case we set our personal number as the "agent" that the call will be sent to, just to prove the handoff flow
```js
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial callerId="YOUR_TWILIO_NUMBER">
        <Number>YOUR_PERSONAL_NUMBER</Number>
    </Dial>
</Response>
```

###  Option 1: Create the Bot via JSON using Twilio CLI
In case you have installed the CLI (recommended), you can directly import the `bot.json` found in the resources of this repo

Make sure you change the following in the JSON body of the bot:
* Under `tasks` -> `handoff`, replace `YOUR_TWIML_BIN` value with the actual URL of the TwiML Bin you created above
* Under `tasks` -> `make_reservation`, replace `YOUR_FUNCTION_URI` value with the actual URL of the Function you created above

Then you can create the bot using the Autopilot CLI
`twilio autopilot:create -s /path/of/json`

### Option 2: Create the Bot from the Twilio Console
You can fully create and manage the bot from the Twilio Console. Here are the steps to start with a basic one:

* Go to https://www.twilio.com/console/autopilot and choose if you will create the Bot via a Template or From Scratch. We will add some tasks either way
* Next step is to add some tasks. Simply click `Add Task` for the ones not in your task list and then add the relevant json body. Specifically

### greeting
Greeting task will already be on your list, so simply edit its code by clicking on `Program`

```js
{
	"actions": [
		{
			"say": "Welcome to the Mos Eisley Cantina! You will never find a more wretched hive of scum and villainy. I can provide you today’s specials, connect you with a host, or help you make a reservation."
		},
		{
			"listen": true
		}
	]
}
```

### make_reservation

Add your function URI
```js
{
	"actions": [
		{
			"collect": {
				"name": "make_reservation",
				"questions": [
					{
						"question": {
							"say": "Great, I can help you with that. What's your first name?"
						},
						"name": "first_name",
						"type": "Twilio.FIRST_NAME"
					},
					{
						"question": {
							"say": "What day would you like your reservation for?"
						},
						"name": "date",
						"type": "Twilio.DATE"
					},
					{
						"question": {
							"say": "Nice, at what time?"
						},
						"name": "time",
						"type": "Twilio.TIME"
					},
					{
						"question": {
							"say": "For how many humans, wookies, droids, jawas, ewoks, life forms?"
						},
						"name": "party_size",
						"type": "Twilio.NUMBER"
					}
				],
				"on_complete": {
					"redirect": {
						"method": "POST",
						"uri": "YOUR_FUNCTION_URI"
					}
				}
			}
		}
	]
}
```

### todays_specials

```js
{
	"actions": [
		{
			"say": "Today's specials include: bantha milk, Rootleaf Stew (made from yarum seeds, mushroom spores, galla seeds, and sohli bark on Dagobah), Spice Runner Hard Cider, Klatooine Paddy Frogs, Levitating Shuura (sweet and juicy fruit native to the planet Naboo), jawa juice, and the Cantina Special "
		},
		{
			"listen": true
		}
	]
}
```

### handoff 

Add your twiml bin url
```js
{
	"actions": [
		{
			"say": "Hold on, we are connecting you with Chalmun, owner of the Cantina"
		},
		{
			"handoff": {
				"method": "POST",
				"channel": "voice",
				"uri": "YOUR_TWIML_BIN_URL "
			}
		}
	]
}
```
