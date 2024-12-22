import { Events, Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { BotStateManager } from '../lib/BotStateManager';
import { PinterestService } from '../lib/PinterestService';

interface MemeResponse {
    postLink: string;
    subreddit: string;
    title: string;
    url: string;
    nsfw: boolean;
    spoiler: boolean;
    author: string;
    ups: number;
    preview: string[];
}

export class MessageListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            event: Events.MessageCreate
        });
    }

    public async run(message: Message) {
        // Debug logging
        console.log(`Received message: "${message.content}" from ${message.author.tag}`);

        // Ignore bot messages
        if (message.author.bot) {
            console.log('Ignoring bot message');
            return;
        }

        // Ignore messages that start with the command prefix
        const prefix = process.env.COMMAND_PREFIX || '!';
        if (message.content.startsWith(prefix)) {
            console.log('Ignoring command message');
            return;
        }

        const stateManager = BotStateManager.getInstance();
        const pinterestService = PinterestService.getInstance();

        try {
            // Handle Pinterest response if enabled
            if (stateManager.isPinterestEnabled()) {
                const boardUrl = stateManager.getPinterestBoard();
                if (boardUrl) {
                    console.log('Fetching Pinterest image...');
                    const imageUrl = await pinterestService.getRandomImage(boardUrl);
                    if (imageUrl) {
                        await message.reply({
                            content: `📌 Random Pinterest image:\n${imageUrl}`,
                            allowedMentions: { repliedUser: false }
                        });
                        console.log('Pinterest reply sent successfully');
                        return;
                    }
                }
            }

            // Handle meme response if enabled
            if (stateManager.isAutoReplyEnabled()) {
                console.log('Fetching meme from API...');
                const response = await fetch('https://meme-api.com/gimme');
                
                if (!response.ok) {
                    throw new Error(`API responded with status: ${response.status}`);
                }
                
                const meme: MemeResponse = await response.json();
                console.log('Received meme:', { title: meme.title, subreddit: meme.subreddit });

                console.log('Sending meme reply...');
                await message.reply({
                    content: `**${meme.title}** from r/${meme.subreddit}\n${meme.url}`,
                    allowedMentions: { repliedUser: false }
                });
                console.log('Meme reply sent successfully');
            }
        } catch (error) {
            console.error('Error in message listener:', error);
            this.container.logger.error('Failed to fetch or send response:', error);
        }
    }
} 