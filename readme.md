## 🚀 3. Install Express and TypeScript

```bash
npm install express
npm install --save-dev typescript @types/express ts-node nodemon @types/node


## 📦 Explanation of Packages

| Package           | Purpose                             |
|-------------------|-----------------------------------|
| `express`         | Web framework                     |
| `typescript`      | TypeScript compiler               |
| `@types/express`  | Type definitions for Express      |
| `ts-node`         | Run TypeScript files directly     |
| `nodemon`         | Auto-reload the server on changes |
| `@types/node`     | Node.js type definitions          |

⚙️ 4. Create tsconfig.json

npx tsc --init

#Replace the contents of tsconfig.json with:

{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}

🗂️ 5. Create Project Structure

mkdir src
touch src/index.ts


📝 6. Update package.json Scripts

In package.json, add:

"scripts": {
  "dev": "nodemon src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}

🚀 7. Run the App
Start in development:

npm run build


#Run compiled app:
npm start

✅ 4. Compiles to JavaScript
TypeScript gets transpiled to JavaScript using tsc or ts-node.

You don’t run .ts files directly in production; you run the compiled .js files from /dist.


https://chatgpt.com/share/683983ae-3dc0-8001-b2dc-f6fc4bb3b591


What is the Spread Operator?
The spread operator looks like three dots ... and it’s used to “spread out” the elements of an array or the properties of an object.

Why use it?
To copy arrays or objects without modifying the original.

To combine arrays or objects easily.

To pass multiple values when a function expects separate arguments.

Examples:
1. Spread with Arrays

const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5];

console.log(moreNumbers); // Output: [1, 2, 3, 4, 5]
...numbers takes each element from numbers and adds it individually.

We added 4 and 5 after spreading.

2. Copy an Array

const original = [10, 20, 30];
const copy = [...original];

copy.push(40);

console.log(original); // Output: [10, 20, 30] (unchanged)
console.log(copy);     // Output: [10, 20, 30, 40]
Spread operator creates a new array copy.

Changing copy does NOT affect original.

3. Spread with Objects

const user = { name: "Alice", age: 25 };
const updatedUser = { ...user, age: 26, city: "New York" };

console.log(updatedUser);
// Output: { name: "Alice", age: 26, city: "New York" }
...user spreads all properties from user into the new object.

Then we override age and add city.

Quick Summary for Beginners:
... (spread operator) = spread elements or properties out.

Helps to copy, merge, or expand arrays/objects.

Keeps original data safe by creating new copies.


🧩 What is Middleware?
In simple terms:

Middleware is a function that runs between when a request is received by the server and when a response is sent back.# node-swaggy-practice


src/
│
├── config/              # Configuration (e.g., DB, environment, CORS)
│   ├── db.ts
│   └── env.ts
│
├── controllers/         # Handle HTTP requests/responses
│   └── user.controller.ts
│
├── models/              # Mongoose or TypeORM models
│   └── user.model.ts
│
├── routes/              # Define API routes
│   └── user.routes.ts
│
├── middleware/          # Custom middleware (auth, error, logger, etc.)
│   └── auth.middleware.ts
│
├── services/            # Business logic (separate from controller)
│   └── user.service.ts
│
├── interfaces/          # TypeScript interfaces & types
│   └── user.interface.ts
│
├── utils/               # Utility functions/helpers
│   └── generateToken.ts
│
├── app.ts               # Express app setup
├── server.ts            # Entry point (starts the server)
└── types/               # Global TypeScript types
    └── express.d.ts     # Extend Request/Response objects

