import { Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class OwnerOnlyPrecondition extends Precondition {
    public override async messageRun(message: Message) {
        // Get the application info to find the owner
        const application = await this.container.client.application?.fetch();
        const isOwner = application?.owner?.id === message.author.id;

        return isOwner 
            ? this.ok()
            : this.error({ message: 'Only the bot owner can use this command!' });
    }
}

declare module '@sapphire/framework' {
    interface Preconditions {
        OwnerOnly: never;
    }
} 