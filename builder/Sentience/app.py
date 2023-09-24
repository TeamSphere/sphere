from flask import Flask, request, jsonify, render_template
import openai

app = Flask(__name__)

# Set your OpenAI API key here
openai.api_key = "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"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/process_text', methods=['POST'])
def process_text():
    user_message = request.form.get("user_message")

    # Generate a response from Chat GPT
    chat_gpt_response = openai.Completion.create(
        engine="davinci",
        prompt=user_message,
        max_tokens=50,  # Adjust the max_tokens as needed
        n=1
    ).choices[0].text

    # Process the Chat GPT response through the Aspirational Layer
    aspirational_layer_response = process_aspirational_layer(chat_gpt_response)

    return jsonify({
        "chat_gpt_response": chat_gpt_response,
        "aspirational_layer_response": aspirational_layer_response,
    })

def process_aspirational_layer(input_text):
    # Implement Aspirational Layer processing logic here
    # You can customize this part to align with your Aspirational Layer's role
    return "Let's work towards a better future."

if __name__ == '__main__':
    app.run(debug=True)
