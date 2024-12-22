import { Args, Command } from '@sapphire/framework';
import { Message } from 'discord.js';
import { BotStateManager } from '../lib/BotStateManager';

export class PinterestCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'pinterest',
            aliases: ['pin'],
            description: 'Manage Pinterest integration',
            preconditions: ['OwnerOnly']
        });
    }

    public override async messageRun(message: Message, args: Args) {
        const stateManager = BotStateManager.getInstance();
        const subcommand = await args.pick('string').catch(() => 'status');

        switch (subcommand.toLowerCase()) {
            case 'toggle':
                const newState = stateManager.togglePinterest();
                return message.reply({
                    content: `🎯 Pinterest replies have been turned ${newState ? 'ON' : 'OFF'}`,
                    allowedMentions: { repliedUser: false }
                });

            case 'set':
                const boardUrl = await args.pick('string').catch(() => null);
                if (!boardUrl) {
                    return message.reply({
                        content: '❌ Please provide a Pinterest board URL',
                        allowedMentions: { repliedUser: false }
                    });
                }
                stateManager.setPinterestBoard(boardUrl);
                return message.reply({
                    content: `✅ Pinterest board set to: ${boardUrl}`,
                    allowedMentions: { repliedUser: false }
                });

            case 'status':
            default:
                const enabled = stateManager.isPinterestEnabled();
                const board = stateManager.getPinterestBoard();
                return message.reply({
                    content: `📊 Pinterest Status:\nEnabled: ${enabled ? 'Yes ✅' : 'No ❌'}\nBoard: ${board || 'Not set'}`,
                    allowedMentions: { repliedUser: false }
                });
        }
    }
} 