## Overview

This is an issue tracker for users to manage their issues efficiently. They have an intuitive dashboard showing related issues statistics. They can do CRUD operations on different issues. Also, they could assign issues to different users; they can sort and filter issues.

## Tech Stack

The tech stacks are Next.js, TypeScript, Tailwind, Radix UI, Prisma, and NextAuth.js.

## Setting up the Environment
Take a look at the env.example file
1. DATABASE_URL
The connection string for your database. If you're using MySQL, it might look like this:
```bash
DATABASE_URL="mysql://user:password@localhost:3306/your_database_name"
```
2. NEXTAUTH_SECRET
Run the following code in your terminal
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Copy the generated encoded string and set the NEXTAUTH_SECRET
```bash
NEXTAUTH_SECRET="your_generated_encoded_string"
```

