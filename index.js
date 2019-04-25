var TelegramBot = require('node-telegram-bot-api'); //Telegram bot library for node js
var token = '827265475:AAGa996FKJh68tmCWcK0jLBdbXz42icRlSY'; //token of the bot from BotFather
var bot = new TelegramBot(token, {polling:true}); //run our bot from local
var request = require('request');
bot.onText(/\/movie (.+)/,function(msg,match){
    var movie = match[1];
    var chatId = msg.chat.id;    
    request(`http://www.omdbapi.com/?apikey=64c20200&t=${movie}`,function(error,response,body){
        if(!error && response.statusCode == 200){
            bot.sendMessage(chatId, '_Looking for _' + movie + '...', {parse_mode:'Markdown'})
            .then(function(msg){
                var res = JSON.parse(body);
                // bot.sendMessage(chatId, 'Result: \nTitle: ' + res.Title + '\nYear: ' + res.Year + '\nRated: ' + res.Rated + '\nReleased: ' + res.Released);
                // we can also send the cover of the movie and the data as a caption
                bot.sendPhoto(chatId, res.Poster, {caption: 'Result: \nTitle: ' + res.Title + '\nYear: ' + res.Year + '\nRated: ' + res.Rated + '\nReleased: ' + res.Released })
            })         
        }
    });
});
