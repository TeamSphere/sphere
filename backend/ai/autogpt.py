import openai

# Set up your OpenAI API credentials
openai.api_key = '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'

# Define a function to generate code using AutoGPT
def generate_code(prompt):
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=prompt,
        max_tokens=100,  # Adjust the desired length of generated code
        n=1,  # Set the number of completions to generate
        stop=None,  # Stop generating after a certain token (optional)
        temperature=0.7,  # Control the randomness of the generated output
    )

    if 'choices' in response and len(response.choices) > 0:
        return response.choices[0].text.strip()
    else:
        return None

# Example usage
prompt = '''
function add(a, b) {
    return a + b
}

'''
generated_code = generate_code(prompt)

if generated_code:
    print("Generated code:")
    print(generated_code)
else:
    print("Code generation failed.")