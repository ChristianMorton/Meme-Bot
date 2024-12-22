# Rando Meme Discord Bot 🤖

A modular Discord bot built with TypeScript and SapphireJS that randomly responds to messages with either memes from Reddit or images from a Pinterest board. This bot was entirely created by AI using Cursor's AI coding assistant.

## 🌟 Features

- Randomly responds to messages with memes from Reddit's meme API
- Can alternatively respond with images from a specified Pinterest board
- Both meme and Pinterest responses can be toggled independently
- Built with TypeScript for type safety and better development experience
- Uses SapphireJS framework for modular command handling
- Owner-only command protection
- Detailed logging for debugging

## 🛠️ Technologies Used

- TypeScript
- Discord.js
- SapphireJS Framework
- Node-fetch for API calls
- Cheerio for Pinterest scraping
- Built entirely using AI assistance

## 🚀 Setup & Deployment

1. Clone this repository:
   ```bash
   git clone https://github.com/ChristianMorton/Meme-Bot
   cd rando-meme
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your Discord bot token:
   ```
   DISCORD_TOKEN=your_discord_bot_token_here
   COMMAND_PREFIX=!
   ```

5. Build the TypeScript code:
   ```bash
   npm run build
   ```

6. Start the bot:
   ```bash
   npm start
   ```

For development, you can use:
```bash
npm run dev
```

## 🎮 Commands

All commands are restricted to the bot owner for security:

### Meme Commands
- `!toggle` - Toggle automatic meme responses on/off
- `!switch` - Alias for toggle

### Pinterest Commands
- `!pinterest toggle` - Toggle Pinterest responses on/off
- `!pinterest set <url>` - Set the Pinterest board URL
- `!pinterest status` - Check Pinterest settings
- `!pin` - Alias for pinterest commands

## 🤖 AI Creation

This bot was created entirely through AI assistance using Cursor's AI coding assistant. The development process included:

1. Initial scaffolding of the TypeScript/SapphireJS project
2. Implementation of the meme response system using the Reddit meme API
3. Addition of Pinterest board scraping functionality
4. Implementation of command handling and owner-only restrictions
5. Error handling and logging system
6. Modular design for easy expansion

The AI handled:
- Project structure setup
- Dependency management
- Type definitions
- API integration
- Command system implementation
- Error handling
- Documentation

## 🔧 Configuration

- `DISCORD_TOKEN`: Your Discord bot token (required)
- `COMMAND_PREFIX`: Custom prefix for commands (default: !)

## 📝 Notes

- The bot requires the "Message Content Intent" to be enabled in your Discord Developer Portal
- Pinterest scraping is done client-side and may need adjustments if Pinterest's structure changes
- All commands are owner-only for security
- The bot ignores messages from other bots
- Command messages (starting with prefix) won't trigger meme/Pinterest responses

## 🤝 Contributing

This bot was created by AI, but human contributions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Suggest new features or integrations

## 📜 License

This project is open source and available under the MIT License.

## PS: This README was created by Cursor's AI coding assistant.