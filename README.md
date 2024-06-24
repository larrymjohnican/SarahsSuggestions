# SARAHSSUGGESTIONS

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Cloning the Repository

To get started with this project, you'll need to clone the repository to your local machine. Follow these steps:

1. Open a terminal or command prompt.
2. Navigate to the directory where you want to clone the repository using the `cd` command.
3. Run the following command to clone the repository: git clone https://github.com/larrymjohnican/SarahsSuggestions.git
4. Once the cloning process is complete, navigate into the project directory: cd the-name-of-your-repository

Now you have the project files on your local machine and are ready to proceed with the next installation steps!

### Installing Dependencies

After cloning the repository, you'll need to install the project dependencies. Follow these steps:

1. Navigate to the project directory if you're not already there: cd the-name-of-your-repository
2. It's recommended to create and activate a virtual environment before installing the dependencies. You can create a virtual environment using the following command: python -m venv env
This will create a new virtual environment named `env` in your project directory.

3. Activate the virtual environment:

- On Windows:

  ```
  env\Scripts\activate
  ```

- On Unix or macOS or git bash:

  ```
  source bin/activate
  ```

You should see `(env)` prefixed to your command prompt, indicating that the virtual environment is active.

4. Change to the backend folder: cd backend and install the project dependencies using the following command: 'py -m pip install -r requirements.txt' or 'python3 -m pip install -r requirements.txt'
This will install all the required packages listed in the `requirements.txt` file.

After completing these steps, you should have all the necessary dependencies installed in your virtual environment, and you're ready to proceed with the next steps!

### ACTIVATING THE SERVER
3. navigate to the backend folder: cd frontend

3. Setting up the database (if applicable)
4. Running any necessary setup scripts: frontend: npm run dev (may need to install vite 'npm install vite')
                                        backend: py manage.py runserver

## Usage

Explain how to use the project, including any important commands, configuration options, or examples.

## Contributing

If you welcome contributions from others, provide guidelines on how to contribute to your project. This may include:

- Opening issues for bug reports or feature requests
- Submitting pull requests
- Code style and guidelines

## License

Specify the license under which your project is released. For example:

This project is licensed under the [MIT License](LICENSE).