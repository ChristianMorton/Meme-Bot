import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, Partials } from 'discord.js';

const client = new SapphireClient({
    defaultPrefix: process.env.COMMAND_PREFIX || '!',
    regexPrefix: /^(hey +)?bot[,! ]/i,
    caseInsensitiveCommands: true,
    logger: {
        level: LogLevel.Debug
    },
    loadMessageCommandListeners: true,
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User
    ]
});

// Add error handling for the client
client.on('error', (error) => {
    console.error('Discord client error:', error);
});

// Log when the bot connects and registers commands
client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    console.log('Bot is ready to serve memes!');
    console.log('Registered commands:');
    client.stores.get('commands').forEach(command => {
        console.log(`- ${command.name}`);
    });
});

client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error('Failed to login:', error);
}); 