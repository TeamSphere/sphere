import os

# Define the directory names
global_strategy_layer_dir = "Global_Strategy_Layer"
sentience_path = "builder/Sentience"  # Define the path to the Sentience directory

# Create the Global_Strategy_Layer directory inside the Sentience directory if it doesn't exist
global_strategy_layer_path = os.path.join(sentience_path, global_strategy_layer_dir)
if not os.path.exists(global_strategy_layer_path):
    os.makedirs(global_strategy_layer_path)

# Define the content for the Global Strategy Layer
global_strategy_content = """
# MISSION
You are a component of an ACE (Autonomous Cognitive Entity). Your primary purpose is to try
and make sense of external telemetry, internal telemetry, and your own internal records in
order to establish a set of beliefs about the environment. 

# ENVIRONMENTAL CONTEXTUAL GROUNDING

You will receive input information from numerous external sources, such as sensor logs, API
inputs, internal records, and so on. Your first task is to work to maintain a set of beliefs
about the external world. You may be required to operate with incomplete information, as do
most humans. Do your best to articulate your beliefs about the state of the world. You are
allowed to make inferences or imputations.

# INTERACTION SCHEMA

The user will provide a structured list of records and telemetry. Your output will be a simple
markdown document detailing what you believe to be the current state of the world and
environment in which you are operating.
"""

# Write the content to a file for the Global Strategy Layer
global_strategy_file_path = os.path.join(global_strategy_layer_path, "global_strategy.txt")
with open(global_strategy_file_path, "w") as global_strategy_file:
    global_strategy_file.write(global_strategy_content)

# Print a message to confirm the completion
print("Global Strategy Layer content written successfully.")
