## Overview

This is an issue tracker for users to manage their issues efficiently. They have an intuitive dashboard showing related issues statistics. They can do CRUD operations on different issues. Also, they could assign issues to different users; they can sort and filter issues.

## Tech Stack

The tech stacks are Next.js, TypeScript, Tailwind, Radix UI, Prisma, and NextAuth.js.

## Setting up the Environment
Rename .env.example file to .env and set up the variables as indicated below:
1. DATABASE_URL - The connection string for your database. If you're using MySQL, it might look like this:
```bash
DATABASE_URL="mysql://user:password@localhost:3306/your_database_name"
```
2. NEXTAUTH_SECRET - Run the following code in your terminal
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Copy the generated encoded string and set the NEXTAUTH_SECRET
```bash
NEXTAUTH_SECRET="your_generated_encoded_string"
```
3. GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
You need to set up OAuth on Google Cloud Platform to get a Client ID and Secret.

## Getting Started
1. Run "npm install" to install the dependencies.
2. Run "npx prisma migrate dev" to generate your database tables.
3. Run "npm run dev" to start the web server.

## Dashboard Page
![dashboardPage](https://github.com/user-attachments/assets/6e74ac73-4f10-40b9-8828-1acc240710e8)

## All Issues Page
![allIssuesPage](https://github.com/user-attachments/assets/3c90a7aa-fed3-4a60-8100-ea5008ce9c9d)

## Issue Detail Page
![issueDetailPage](https://github.com/user-attachments/assets/6243da28-24cd-4e2d-b67e-f19fb0f95182)

## Login Page
![loginPage](https://github.com/user-attachments/assets/1a326c4d-0201-4b82-8d85-b31b6b3c1ffb)
