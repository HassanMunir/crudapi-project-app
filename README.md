# Express.js CI Pipeline

This project implements a Continuous Integration (CI) pipeline for an Express.js-based CRUD API. The CI pipeline runs various stages including linting, unit and integration tests, Docker image building, static analysis, and test coverage upload.

## Project Structure

- **API**: Express.js-based CRUD API with routes for managing products.
- **Docker**: Dockerfile to containerize the application.
- **CI Pipeline**: GitHub Actions configuration to automate the build and test process.

## GitHub Actions Pipeline

The CI pipeline is triggered on any push to the `main` branch or on pull requests. It runs the following jobs:

### 1. **Test Job**

This job runs on an Ubuntu-based runner and performs the following steps:

1. **Checkout Code**: The pipeline checks out the latest code from the repository.
2. **Set up Node.js**: The pipeline sets up Node.js version 18 using `actions/setup-node@v3`.
3. **Install Dependencies**: Runs `npm install` to install the project dependencies.
4. **Build Docker Image**: Builds a Docker image with the tag `crudapi-project`.
5. **Linting**: Runs `npx eslint` to check code quality and identify issues.
6. **Unit Tests**: Runs unit tests using `npm run test:unit`.
7. **Integration Tests**: Runs integration tests using `npm run test:integration`.
8. **Verify Code Formatting**: Ensures code formatting with `npx prettier --check`.
9. **Run SAST (Semgrep)**: Runs static analysis using `npx semgrep --config=auto --dry-run`.
10. **Upload Test Coverage**: Uploads the test coverage reports using `actions/upload-artifact@v3`.

## API Overview

The project provides endpoints for managing products, including CRUD operations. It uses MongoDB for data storage and Mongoose for ORM.

### **API Endpoints**

- **GET /api/products**: Fetch all products.
- **GET /api/products/:id**: Fetch a single product by its ID.
- **POST /api/products**: Create a new product.
- **PUT /api/products/:id**: Update an existing product.
- **DELETE /api/products/:id**: Delete a product by its ID.

## Tests

The project contains both unit and integration tests for the product API:

### Unit Tests

- Test that all products are fetched correctly.
- Test that a product can be created.
- Test the root endpoint (`/`) for a welcome message.

### Integration Tests

- Test that the API gracefully handles invalid product IDs.
- Test that the API handles non-existent products for update and delete operations.

## Docker Setup

The project includes a Dockerfile to containerize the Express.js API.

### Dockerfile Overview

- **Base Image**: Uses the official Node.js 18 image.
- **Install Dependencies**: Runs `npm install` to install the app dependencies.
- **Application Code**: Copies the project files into the container.
- **Expose Port**: Exposes port 3000 to run the server.
- **Start Command**: The container runs `npm run serve` to start the application.

## Prerequisites

- **Node.js**: Version 18 is required to run the project.
- **MongoDB**: MongoDB database connection string should be updated in the code.
