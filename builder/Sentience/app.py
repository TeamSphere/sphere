from flask import Flask, request, jsonify, render_template
from cognitive_control import CognitiveControlLayer
from agent_model import AgentModelLayer  # Import the AgentModelLayer class
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
cognitive_control = CognitiveControlLayer()
agent_model = AgentModelLayer()  # Initialize the AgentModelLayer

@app.route('/')
def home():
    return render_template('index.html')  # Render the HTML template

@app.route('/process_message', methods=['POST'])
def process_message():
    user_message = request.json.get('message')

    # Access the API key from the environment variable
    api_key = os.getenv("OPENAI_API_KEY")

    # Use the Cognitive Control Layer to generate a response
    cognitive_response = cognitive_control.process_message(user_message, api_key)

    # Prepare the response
    response = {
        "message": cognitive_response,
    }

    return jsonify(response)

@app.route('/process_agent_model', methods=['POST'])
def process_agent_model():
    # Receive inputs (e.g., telemetry data, sensor feeds) from the request
    inputs = request.json  # Adjust this based on your input format

    # Update the Agent Model Layer's self-model
    agent_model.update_self_model(inputs)

    # Refine strategic direction based on the self-model
    strategic_direction = request.json.get('strategic_direction')  # Example input
    refined_direction = agent_model.refine_strategic_direction(strategic_direction)

    # Perform self-modification if needed
    agent_model.self_modify()

    # Generate northbound and southbound outputs
    outputs = agent_model.generate_outputs()

    return jsonify(outputs)


if __name__ == '__main__':
    app.run(debug=True)
