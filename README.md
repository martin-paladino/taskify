# Taskify

## Technologies Used

- Docker
- React
- Django
- Django REST Framework
- Material UI

## Prerequisites

Make sure you have the following tools installed on your system before proceeding:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Django](https://docs.djangoproject.com/en/4.2/intro/install/)

## Installation

1. Clone this repository: `git clone https://github.com/martin-paladino/taskify`
2. Navigate to the project directory `cd taskify`
3. Build the Docker image for the project: `docker compose build --no-cache`
4. Run the backend and frontend containers: `docker compose up`
5. If there is any problem with the frontend container, try: 
    `cd taskify/frontend`
    `npm install`
    And steps 3 and 4 again.
5. The web application will be available at `http://localhost:3000`

If you have any further questions, feel free to ask.