# MongoDB NoSQL Analysis – Movies Dataset

## Project Overview
This project focuses on non-relational database analysis using MongoDB.  
The objective was to import a JSON dataset containing movie records and perform data exploration, filtering, and aggregation using MongoDB queries and aggregation pipelines.

## Dataset
- Dataset: `movies.json`
- ~28,000 movie documents
- Fields include title, year, genre, cast, directors, ratings, etc.

## Data Loading Process

1. Connected to MongoDB using **MongoDB Compass**
2. Created a new database and collection
3. Imported `movies.json` into the collection
4. Verified document structure and field consistency

## Query Development Environment

- MongoDB Compass → Data import and structure validation
- NoSQLBooster → Query development and aggregation pipelines

## Analysis Performed

The project includes:

- Basic CRUD operations
- Filtering with `$match`
- Grouping with `$group`
- Sorting with `$sort`
- Array processing using `$unwind`
- Field selection with `$project`
- Creation of derived collections using `$out`

Examples of analysis:
- Top actors by number of movies
- Movies grouped by genre
- Distribution by decade
- Cleaning inconsistent values (e.g., "and", "Undefined")

## Technologies Used

- MongoDB
- MongoDB Compass
- NoSQLBooster
- Aggregation Framework

## Repository Structure

- `/docs` → Full project report (PDF)
- `/queries` → MongoDB query scripts
