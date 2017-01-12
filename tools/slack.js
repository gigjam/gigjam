var SlackBot = require('slackbots');

// create a bot 
var bot = new SlackBot({
    token: process.env.SLACK_BOT_API_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: process.env.SLACK_BOT_API_NAME
});

// more information about additional params https://api.slack.com/methods/chat.postMessage 
var params = {
    icon_emoji: ':cat:'
};

exports.start = (callback) => {
    bot.on('start', function() {
        // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
        bot.postMessageToChannel('estimate', 'meow!', params);
    });
}

exports.notifyEstimate = (message) => {
    bot.postMessageToChannel('estimate', message, params);
}