var discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');


//configure logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize:true});
logger.level = 'debug';

//init discord bot

var bot = new discord.Client({
    token:auth.token,
    autorun:true
});

bot.on('ready', function (evt){
    logger.info('Connected');
    logger.info('Logged in as: ' + bot.username + '(' + bot.id + ')' );

});

bot.on('message', function (user, userID, channelID, message, evt) {
    if(message.substring(0,1) == '!'){
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch(cmd){
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'hello': 
                bot.sendMessage({
                    to:channelID,
                    message: 'Go die in a fire <@' + userID + '>!'
                });
                break;
            case 'roll' :
                bot.sendMessage({
                    to:channelID,
                    message: 'Are you trying to make me work <@' + userID + '>? WELL ARE YA?'
                });
                break;        
            case 'gay' :
                bot.sendMessage ({
                    to:channelID,
                    message: "no u"
                });
                break;                
            case 'help' : 
                bot.sendMessage( {
                    to:channelID,
                    message: "I swear if you tell me to !roll, !ping, or !hello, I WILL CUT YOU!"
                });
            break;
            case 'mission' :
                if( args[0] == 'accomplished'){
                    bot.sendMessage({
                        to: channelID,
                        message : 'https\:\/\/i.kym-cdn.com\/photos\/images\/newsfeed\/000\/073/178\/President-George-W.-Bush-Mission-Accomplished.jpg?1318992465'
                    });
                } //Smalle comment
                break;
            case 'Knobz': 
                bot.sendMessage({
                    to: channelID,
                    message : "I don't mean to be offensive buuuttt......."
                });
                break;
            default : {
                bot.sendMessage({
                    to:channelID,
                    message: "Well I bet your mom would like to " + cmd + ' ' + args.join(' ')
                })
            }
        }
    } else if (message.startsWith('/roll')){

        var val =  message.substr("/roll".length);

        // var args = message.split(' ');
        // logger.info('args are ' + args.join(', '));

        
        var regex = /(\d+)?[d|D](\d+)\s*(adv|dis)?/g;         

        var match = regex.exec(val.trim());        

        var multS = match[1];
        var typeS = match[2];
        var adv = match[3];

        logger.info("multS: " + multS);
        logger.info("typeS: " + typeS);
        logger.info("adv: " + adv);

        var mult = NaN
        if(multS == '' || multS == undefined){
            mult = 1
        } else {
            mult = parseInt(multS);
        }

        var type = parseInt(typeS);

        logger.info('mult is ' + mult);


        
        if (mult == NaN || type == NaN){
            bot.sendMessage({
                to:channelID,
                message: "I wasn't unable to understand that command"
            });
        } else {
            var sum1 = 0;
            var vals1 = [];
            for(var i = 0; i < mult; i++){
                var val = Math.floor(Math.random() * type) + 1;
                sum1 += val;
                logger.info("Rolled a " + val);
                vals1.push(val);
            }
            
            var sum2 = 0;
            var vals2 = [];
            for(var i = 0; i < mult; i++){
                var val = Math.floor(Math.random() * type) + 1;
                sum2 += val;
                vals2.push(val);
            }
        

            var s = "<@" + userID + "> `rolled a ";
            if(adv == '' || adv == undefined){
                s += + sum1 + "` (*" + vals1.join(" + ") + "*)";
            } else {
                if(adv == 'adv'){
                    if(sum1 > sum2) {
                        s += + sum1 + "` (*" + vals1.join(" + ") + "*, ~~"+ vals2.join(" + ") + "~~)";
                    } else {
                        s += + sum2 + "` (*" + vals2.join(" + ") + "*, ~~"+ vals1.join(" + ") + "~~)";
                    }
                } else {
                    if(sum1 > sum2) {
                        s += + sum2 + "` (*" + vals2.join(" + ") + "*, ~~"+ vals1.join(" + ") + "~~)";
                    } else {
                        s += + sum1 + "` (*" + vals1.join(" + ") + "*, ~~"+ vals2.join(" + ") + "~~)";
                    }
                }
            }

            bot.sendMessage({
                to:channelID,
                message: s
            });
        }



        logger.info
    }
});


class DiceRoll {
    constructor (mult, type, adv) {
        this.mult = mult;
        this.height = height;
        this.adv = adv
    }

    roll(){

    }
}
