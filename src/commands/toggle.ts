import { Command } from '@sapphire/framework';
import { Message } from 'discord.js';
import { BotStateManager } from '../lib/BotStateManager';

export class ToggleCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'toggle',
            aliases: ['switch'],
            description: 'Toggle automatic meme replies on/off',
            preconditions: ['OwnerOnly']
        });
    }

    public override async messageRun(message: Message) {
        const stateManager = BotStateManager.getInstance();
        const newState = stateManager.toggleAutoReply();
        
        return message.reply({
            content: `🔄 Auto-replies have been turned ${newState ? 'ON' : 'OFF'}`,
            allowedMentions: { repliedUser: false }
        });
    }
} 