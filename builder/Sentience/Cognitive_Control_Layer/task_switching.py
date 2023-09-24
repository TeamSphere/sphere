import random
import time

def monitor_environment():
    # Simulate monitoring of environmental conditions
    temperature = random.uniform(15, 35)  # Example: Temperature in Celsius
    humidity = random.uniform(20, 80)  # Example: Humidity percentage
    return temperature, humidity

def should_switch_task(temperature):
    # Define a threshold for switching tasks
    threshold_temperature = 30  # Example: Switch tasks if temperature exceeds 30°C
    return temperature > threshold_temperature

def switch_task():
    # Implement logic for task switching
    print("Switching tasks due to changing environmental conditions.")
    # Add code to select and initiate the new task
    available_tasks = ["TaskA", "TaskB", "TaskC"]  # List of available tasks
    selected_task = random.choice(available_tasks)
    print(f"Selected task: {selected_task}")
    # Implement logic for the selected task

while True:
    temperature, humidity = monitor_environment()
    if should_switch_task(temperature):
        switch_task()
    # Add a delay to avoid continuous monitoring
    time.sleep(5)  # Delay for 5 seconds (adjust as needed)
