# Xbox Lookup Bot

A simple discord bot template for sending xbox requests (shit discord base i would change)

## Install

1. Clone this repository:

    ```bash
    git clone https://github.com/obaqzcheats/xboxsearch
    cd xboxsearch
    ```

2. Install dependencies:

    ```bash
    npm install discord.js app-xbox-live prismarine-auth
    ```
    
## What this is for sped

This is a xbox lookup only command with a discord bot base where when you do /xlookup it logs into a xbox account and fetches that users info. 

## How to Use

1. **Set Up the Bot**: Deploy the bot to your preferred environment (local or server) and ensure it has permission to join your Discord server.

2. **Using the Command**:
   - Type `/xlookup` followed by the Xbox username in your Discord server.
   - Example:
     ```
     /xlookup user:obaqz
     ```
   - The bot will respond with an embedded message showing the Xbox user details, or an error if the user cannot be found.

3. **Troubleshooting**:
   - Ensure your Xbox account is linked and configured correctly if you're seeing issues with fetching data.
   - Review error messages in the console for detailed troubleshooting.
