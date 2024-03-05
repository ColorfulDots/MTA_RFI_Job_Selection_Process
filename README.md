# MTA RFI: Job Selection Process Digital Solution

This repository is part of our response to the Metropolitan Transportation Authority (MTA) Request for Information (RFI) regarding the digitization of "the Pick" job selection process. This example application showcases our approach to managing jobs, postings, applicants, and overall operational workflows through a modern digital platform. 

## Overview

Utilizing NextJS, Firestore, NodeJS, and React, our application demonstrates capabilities crucial for the MTA's objectives, including authentication, real-time data storage, responsive web design, and adherence to web development best practices.

## Interactive Demo:
https://colorfuldots.com/dashboard

- Please use your credentials found in the RFI response package. 
- Note: The dashboard access and public repo will be available for 30 days.

### Key Features

- **Authentication**: Robust security for user roles, ensuring secure access for MTA staff, employees, and union representatives.
- **Job Management**: Intuitive interfaces for job postings, application submissions, and status tracking, optimized for MTA's operational needs.
- **Responsive Design**: Fully responsive solution across all devices, providing an optimal user experience regardless of access point.
- **Best Practices**: Our development process prioritizes maintainability, scalability, and security, aligning with industry standards.

## Technology Stack

- **Frontend**: Built with React and NextJS for a dynamic, interactive user experience and lightning response times.
- **Backend**: Leveraging NodeJS for server-side logic, including APIs, authentication, and application logic.
- **Database**: Utilizing Firestore for flexible, scalable real-time data management.
- **Authentication**: Implementing secure, robust authentication mechanisms to protect user data and access.

## Getting Started

To run this application locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ColorfulDots/MTA_RFI_Job_Selection_Process.git
   ```
2. **Install Dependencies**
   Navigate to the project directory and install the required dependencies.
   ```bash
   cd MTA_RFI_Job_Selection_Process
   yarn install
   ```
3. **Environment Setup**
   Copy `.env.example` to `.env`, replacing placeholders with your actual Firestore and authentication configuration.
4. **Launch the Application**
   ```bash
   yarn dev
   ```
   The application will be accessible at `http://localhost:3000`.

## License

This project and all associated source code are owned exclusively by Colorful Dots, LLC. The code is provided as an example in response to the MTA RFI and is not licensed for any other use or distribution.

## Acknowledgments

This application is intended to demonstrate our technical expertise and innovative approach in creating digital solutions for complex operational challenges. We look forward to the possibility of further collaboration with the MTA.
