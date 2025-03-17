# Database Schema for IT Equipment Management System

This directory contains the database schema and seed data for the IT Equipment Management System.

## Schema Overview

The database schema consists of the following tables:

1. **branches** - Stores information about company branches/locations
2. **departments** - Departments within each branch
3. **users** - System users with different roles (admin, manager, technician, user)
4. **equipment_types** - Types of equipment (notebook, desktop, printer, etc.)
5. **equipment** - Main equipment inventory table
6. **maintenance_records** - Records of maintenance activities
7. **notifications** - System notifications and alerts
8. **alert_rules** - Rules for generating automatic alerts

## Entity Relationship Diagram

```
+-------------+     +---------------+     +------------+
|   branches   |<----| departments   |<----| users      |
+-------------+     +---------------+     +------------+
       ^                    ^                   ^
       |                    |                   |
       |                    |                   |
+-------------+     +---------------+     +------------+
| equipment   |---->| maintenance   |     | alert     |
+-------------+     | records       |     | rules     |
       ^             +---------------+     +------------+
       |                                        |
       |                                        v
+-------------+                          +------------+
| equipment   |                          | notifications|
| types       |                          +------------+
+-------------+
```

## Setup Instructions

1. Create a PostgreSQL database for the application
2. Run the schema.sql script to create the tables
3. Run the seed.sql script to populate the database with initial data

```bash
# Example commands for PostgreSQL
psql -U your_username -d your_database -f schema.sql
psql -U your_username -d your_database -f seed.sql
```

## Database Connection

To connect to the database from the application, you'll need to set up the following environment variables:

- DB_HOST - Database host address
- DB_PORT - Database port (typically 5432 for PostgreSQL)
- DB_NAME - Database name
- DB_USER - Database username
- DB_PASSWORD - Database password

These variables should be set in your environment or in a .env file (not committed to version control).
