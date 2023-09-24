import discord
import openai

# Set your OpenAI API key
api_key = "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"

# Initialize the OpenAI API client
openai.api_key = api_key

intents = discord.Intents.default()
intents.typing = False
intents.presences = False

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'Logged in as {client.user.name}')

@client.event
async def on_message(message):
    if message.author == client.user:
        return  # Avoid responding to our own messages
    
    # Check if the message is from the target user (replace 'target_user_id' with the user's actual ID)
    target_user_id = '484378655561351172'
    if str(message.author.id) == target_user_id:
        # Use the user's message as a prompt for GPT-3
        user_message = message.content
        
        # Generate a response from GPT-3
        response = openai.Completion.create(
            engine="davinci",
            prompt=user_message,
            temperature=0.7,
            max_tokens=50,
        )
        
        # Send the GPT-3 response to the Discord channel
        await message.channel.send(response.choices[0].text)
        return

# Replace 'YOUR_BOT_TOKEN' with the token you copied earlier
client.run('MTE1NTU4OTU3Njk0MTkxNjE2MA.GXp4a-.HaynWd11gGnIvfC5WiN-XWHU6FKLfMop0AkmM4')
