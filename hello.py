import random

# Define the topics and subtopics
topics = {
    "Philosophy": [
        "Logic",
        "Metaphysics",
        "Aesthetics",
        "Ethics",
        "Social Philosophy",
        "Anthropological Philosophy",
        "Philosophy of Language",
        "Epistemology",
    ],
    "Language Sciences": ["Linguistics", "Philology", "Literature", "Translation"],
    "Information Sciences": ["Librarianship", "Research", "Journalism", "Museology"],
    "Administrative Sciences": ["Accounting", "Management", "Audit", "Logistics"],
    "Spirit Sciences": ["Esoteric Science", "Parapsych", "Theology", "Religion Studies"],
    "Arts": ["Visual Arts", "Plastic Arts", "Music", "Performing Arts"],
    "Moral Sciences": ["Law", "Pedagogy", "Psychology", "Politics"],
    "Social Sciences": [
        "Human Geography",
        "Sociology",
        "Regional Geography",
        "Economy Sciences",
        "History",
        "Archaeology",
        "Antrhopology",
        "Ethnology",
    ],
    "Practical Sciences": [
        "Civil Engineering",
        "Electric Engineering",
        "Electronic Engineering",
        "Mechanical Engineering",
        "Business Administration",
        "Marketing",
        "Finance",
        "Trading",
        "Services",
        "Infrastructure",
        "Goods Production",
        "Natural Resources",
        "Preventative Medicine",
        "Alternative Medicine",
        "Nursing",
    ],
    "Biological Sciences": [
        "Molecular Biology",
        "Ecology",
        "Cytology",
        "Ethology",
        "Anatomy",
        "Genetics",
        "Developmental Biology",
        "Physiology",
        "Mycology",
        "Microbiology",
        "Virology",
        "Entomology",
        "Marine Biology",
        "Botanica",
        "Zoology",
        "Paleontology",
    ],
    "Earth and space sciences": [
        "Planetology",
        "Geomorphology",
        "Hydrography",
        "Astronomy",
        "Astrophysics",
        "Oceanography",
        "Cosmology",
        "Climatology",
    ],
    "Chemistry": [
        "Analytical Chemistry",
        "Electrochemistry",
        "Inorganic Chemistry",
        "Nuclear Chemistry",
        "Organic Chemistry",
        "Petrochemistry",
        "General Chemistry",
        "Radiochemistry",
    ],
    "Physics": [
        "Mechanics",
        "Quantum Mechanics",
        "Relativity",
        "Statistical Mechanics",
        "Nuclear Physics",
        "Electricity & Magnetism",
        "Optics & Acoustics",
        "Thermodynamics",
    ],
    "Mathematics": [
        "Algebra",
        "Geometry",
        "Topology",
        "Probability",
        "Statistics",
        "Analysis",
    ],
}

# User interface for topic selection
def select_topic():
    print("Welcome to the Sentience Learning Program!")
    print("Please select a main topic:")
    for i, topic in enumerate(topics.keys(), 1):
        print(f"{i}. {topic}")
    
    try:
        choice = int(input("Enter the number of your chosen main topic: "))
        if 1 <= choice <= len(topics):
            main_topic = list(topics.keys())[choice - 1]
            return main_topic
        else:
            print("Invalid choice. Please enter a valid number.")
            return select_topic()
    except ValueError:
        print("Invalid input. Please enter a valid number.")
        return select_topic()

def select_subtopic(main_topic):
    print(f"Great! You've selected '{main_topic}' as your main topic.")
    subtopics = topics[main_topic]
    print("Please select a subtopic:")
    for i, subtopic in enumerate(subtopics, 1):
        print(f"{i}. {subtopic}")
    
    try:
        choice = int(input("Enter the number of your chosen subtopic: "))
        if 1 <= choice <= len(subtopics):
            selected_subtopic = subtopics[choice - 1]
            print(f"You've chosen '{selected_subtopic}' as your subtopic.")
        else:
            print("Invalid choice. Please enter a valid number.")
            return select_subtopic(main_topic)
    except ValueError:
        print("Invalid input. Please enter a valid number.")
        return select_subtopic(main_topic)

if __name__ == "__main__":
    main_topic = select_topic()
    select_subtopic(main_topic)
