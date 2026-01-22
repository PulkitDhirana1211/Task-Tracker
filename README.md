# Task Tracker

Task Tracker is a simple **Command Line Interface (CLI)** application used to track and manage tasks. It allows you to add, update, delete, and view tasks, as well as track their progress using different statuses.

This project is designed to help you practice:
- Working with the file system
- Handling command-line arguments
- Managing data using JSON
- Building a basic CLI application without external libraries

---

## 🚀 Features

The Task Tracker CLI allows you to:

- ➕ Add a new task
- ✏️ Update an existing task
- ❌ Delete a task
- ⏳ Mark a task as **in progress**
- ✅ Mark a task as **done**
- 📋 List all tasks
- 📌 List tasks by status:
  - Done
  - Not done
  - In progress

---

## 🛠️ Requirements

- Any programming language can be used
- Runs entirely from the **command line**
- Uses **positional command-line arguments**
- Stores tasks in a **JSON file** in the current directory
- Automatically creates the JSON file if it does not exist
- Uses only **native file system modules**
- ❌ No external libraries or frameworks
- Handles errors and edge cases gracefully

---

## 📂 Data Storage

- Tasks are stored in a `tasks.json` file
- The file is created automatically on first run
- Each task typically contains:
  - Unique ID
  - Description
  - Status (`todo`, `in-progress`, `done`)
  - Timestamps (optional)

---
## 📌 Available Commands

```bash
node index.js add <task title>             # Add a new task
node index.js update <num> <new title>     # Update a task title
node index.js delete <num>                 # Delete a task
node index.js start <num>                  # Mark a task as in-progress
node index.js done <num>                   # Mark a task as done
node index.js list                         # List all tasks
node index.js list-done                    # List tasks that are done
node index.js list-todo                    # List tasks that are not done (todo)
node index.js list-in-progress             # List tasks in progress
```

## 📌 Example Commands

```bash
node index.js add "Build task tracker CLI"
node index.js add "Write README file"

node index.js start 1
node index.js done 1

node index.js update 2 "Write detailed README documentation"
node index.js delete 3

node index.js list
```

# List tasks by status
```bash
node index.js list-done
node index.js list-todo
node index.js list-in-progress
```
