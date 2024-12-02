# AiProject - AI-Powered Image Generation Platform

![AiProject Logo](https://aiproject-hx8r.onrender.com/images/logo.png)  <!-- Optional logo -->

AiProject is a web-based platform that allows users to generate images using advanced AI algorithms. The platform uses Cloudflare for AI-based image generation and Google Cloud for storage. Built with React on the frontend, Express.js on the backend, and MongoDB Atlas for database management, AiProject provides a user-friendly interface for text-to-image generation.

Deployed on [Render](https://aiproject-hx8r.onrender.com/), AiProject offers a seamless experience for generating and managing AI-generated artwork.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

AiProject allows users to input descriptive text prompts to generate AI-driven images. The platform utilizes Cloudflare’s AI model for text-to-image generation, while user data and images are stored in Google Cloud Storage. The app offers user authentication, galleries to view generated images, and various community features to share artwork.

Key features include:
- **AI Image Generation**: Text-based prompts generate unique images using Cloudflare’s AI model.
- **User Authentication**: Users can register, log in, and manage profiles securely.
- **Image Gallery**: View and save generated images.
- **Storage**: All images are stored in Google Cloud Storage.

Explore more at [AiProject Website](https://aiproject-hx8r.onrender.com/).

---
## Tech Stack

AiProject leverages a combination of powerful technologies to deliver a fast and responsive platform:

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MongoDB Atlas
- **AI**: Cloudflare’s AI model for image generation
- **Storage**: Google Cloud Storage for storing generated images
- **Deployment**: Render
- **Authentication**: Managed with JWT (if you decide to add authentication in the future)
- **Testing**: Jest and Supertest

---

## Features

- **AI Image Generation**: Generate images from descriptive text prompts.
- **User Authentication**: Secure registration and login (JWT can be added in future iterations).
- **Image Gallery**: View, download, and share AI-generated images.
- **Cloud Storage**: Images are stored securely in Google Cloud Storage.

---

## Installation

To set up the project locally, follow the steps below:

### Prerequisites:
- [Node.js](https://nodejs.org/) v14+
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (for cloud database)
- [Google Cloud Platform](https://cloud.google.com/) credentials for cloud storage
- [Cloudflare](https://www.cloudflare.com/) account for AI services

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/RonElmalech/AiProject.git
Navigate to the project directory:

cd AiProject
Install dependencies:

npm install
Create a .env file in the root of the project and add the following environment variables:

CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_MODEL_ID=your-cloudflare-model-id
GCLOUD_KEY_FILE=path-to-your-gcloud-key-file
GCLOUD_PROJECT_ID=your-gcloud-project-id
GCLOUD_STORAGE_BUCKET=your-gcloud-storage-bucket
MONGODB_URL=your-mongodb-url
Run the application locally:

npm start
Visit http://localhost:5000 in your browser.

## Usage

After logging in, users can input a descriptive text prompt to generate an AI-powered image. Once the image is generated, it will be stored in Google Cloud Storage, and users can view and share it.

### Example API Request:
You can interact with the API using Postman or cURL:

#### POST /generate
- **Description**: Generate an image from a text prompt.
- **Request Body**:
   ```json
   {
     "prompt": "A futuristic city skyline at sunset"
   }
Response:
{
  "imageUrl": "https://aiproject-hx8r.onrender.com/images/generated_image.png"
}
API Documentation
Below are the essential API endpoints for interacting with the backend:

POST /generate
Description: Generate an image based on a text prompt.
Request Body:
{
  "prompt": "string"
}
Response:
{
  "imageUrl": "string"
}


## Testing

AiProject includes unit tests using Jest and Supertest to ensure the reliability of the backend. 

### Run Unit Tests with Jest:

npm run test
Test Coverage:
The test coverage ensures that critical components, such as image generation and API routes, are thoroughly tested.

Contributing
We welcome contributions to AiProject! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature-name).
Make your changes and commit them (git commit -am 'Add new feature').
Push to your fork (git push origin feature-name).
Open a pull request.
Ensure your code follows the existing code style and includes appropriate tests.

License
MIT License - See the LICENSE file for details.

Contact
For any questions, feedback, or collaboration inquiries, feel free to reach out:

Email: ronelmalechh@gmail.com
GitHub: RonElmalech
Acknowledgements
Thanks to Cloudflare for providing the AI model for image generation.
Thanks to Google Cloud for storage solutions.
Special thanks to the open-source community for the tools and libraries that make this project possible.







