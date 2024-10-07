const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const config = require('./config.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const rest = new REST({ version: '10' }).setToken(config.token);

client.once('ready', async () => {
    const commands = client.commands.map(cmd => cmd.data.toJSON());

    try {
        await rest.put(
            Routes.applicationCommands(config.id),
            { body: commands },
        );
        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }

    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        console.log(`${interaction.user.username} just used ${interaction.commandName}`)
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(config.token);
