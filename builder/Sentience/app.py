from flask import Flask, render_template, request
import openai

app = Flask(__name__)

# Your OpenAI API key (you should keep it secret)
openai.api_key = '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'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_text', methods=['POST'])
def generate_text():
    # Get user input
    api_key = request.form['api_key']
    prompt = request.form['prompt']

    # Set the API key from the form
    openai.api_key = api_key

    # Call the GPT-3 API to generate text
    response = openai.Completion.create(
        engine="davinci",
        prompt=prompt,
        max_tokens=50  # Adjust as needed
    )

    # Get the generated text from the response
    generated_text = response.choices[0].text

    # Render a new HTML page with the generated text
    return render_template('generated_text.html', generated_text=generated_text)

if __name__ == '__main__':
    app.run(debug=True)
