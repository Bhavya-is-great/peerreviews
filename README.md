Hey every one this is The repo where we have to code everything 


# Git commands to push your code
# Git: Push Code & Create a Pull Request (PR)

This guide shows the basic steps to push your code and create a Pull Request on GitHub.

---

## 1. Create a New Branch

Always create a separate branch for your work:

git checkout -b feature-branch-name

---

## 2. Add Your Changes

Stage all the changes you made:

git add .

---

## 3. Commit Changes

Save your changes with a meaningful message:

git commit -m "your message"

---

## 4. Push Branch to GitHub

Upload your branch to the remote repository:

git push origin feature-branch-name

---

## 5. Create a Pull Request (PR)

1. Go to your repository on GitHub
2. You will see a button: **"Compare & pull request"**
3. Click it
4. Add:

   * Title
   * Description
5. Click **"Create Pull Request"**

---

## Quick Flow (All Commands Together)

1. git checkout -b my-feature
2. git add .
3. git commit -m "added feature"
4. git push origin my-feature

---

## Optional (Recommended in Teams)

### Pull Latest Changes Before Starting
1. git checkout main
2. git pull origin main

### Update Your Branch with Latest Changes

1. git checkout feature-branch-name
2. git merge main

---

## Notes

* Use clear branch names (e.g., login-feature, bugfix-navbar)
* Write meaningful commit messages
* Always create PR instead of pushing directly to main


# Folder Strucutre
The folder strucutre is not complecated as you are thinking 

## Folders for frontend
> The component folde ryou see is to make components like the hero section Navbar etc...
in the component section you have to make sub folders like home projects submission means 1 folder for every page
then inside it you have to make jsx files only only jsx files of the project 


> Then there is the css folder to store all the css files there the folders inside the css folder should be exact same as in the components folder to maintain readbility 
for exacmple you have a folder named home inside the components which contains files like Hero.jsx, TaskGrid.jsx then the css folder will also contain the same thing a home folder inside that Hero.module.css and TaskGrid.module.css

We all have to use module css for compulsion in this project so that it fits to all and it is next.js friendly. Module css is as same as css nothing is different just write how to write the normal css just 2 thing you have to note that you can use id's or tags directly you can only use classes and as we are taught in the react classes we write className instead of class like className="nav" the same thing but in different in the module css like 
className={styles.nav} and on the top of the page just import one thing as below 
import styles from "@/css/..." <- at the place of ... out the folder and the file name to give numltiple classes do like className={\`${styles.nav} {styles.nav2}`}

Whereever you use hooks like useState useEffect useRef etc.. put a string "use client" on the top of the file nothing else nothing more and yeah don't write login in Page.jsx file only put components there and don't even do use client there.

## Folders for backend 

if you guys know the backend properly you will know how the folders are being made like controllers config models etc.. the same we have to do here justa routes folder will not be made it will be done my nectjs only by making folders like inside app make a folder /api/getTask/route.js -> this will make a route 
/api/getTask and in that export funcitons like const GET = function this will ahndle get request on the page

# The data

# Feedback Peer — Project Overview

A collaborative platform where users submit tasks, review others' work, and give structured feedback.

---

# 🚀 Core Idea

* Users receive tasks
* Each task has:

  * Description (.md view)
  * Submit option
  * View submissions
* Users can:

  * Submit their work
  * View others' submissions
  * Like and review them

---

# 🧭 Frontend Routes

## Public Routes

* `/` → Home page (All tasks)
* `/task/[taskId]` → Task detail page
* `/task/[taskId]/submit` → Submit solution
* `/task/[taskId]/submissions` → View all submissions

---

## Page Details

### 1. Home Page `/`

* List all tasks
* Task cards/grid view
* Basic info:

  * Title
  * Difficulty
  * Tags

---

### 2. Task Detail `/task/[taskId]`

* Task description (rendered from `.md`)
* Buttons:

  * Submit
  * View Submissions

---

### 3. Submit Page `/task/[taskId]/submit`

* Form to submit:

  * GitHub link / project link
  * Notes (optional)

---

### 4. Submissions Page `/task/[taskId]/submissions`

* All submissions list
* Features:

  * 🔍 Search
  * 🔃 Sort (likes / newest / rating)
* UI:

  * Horizontal cards
  * Click → opens modal

---

### 5. Submission Modal

* Full submission details
* Like button 👍
* Review form:

  * Dynamic (comes from backend)
  * Example:

    * Folder Structure (out of 5)
    * Code Quality (out of 5)
    * UI/UX (out of 5)

---

# 🧱 Frontend Folder Structure

```
/components
  /home
    Hero.jsx
    TaskGrid.jsx
  /task
    TaskDetail.jsx
  /submission
    SubmissionCard.jsx
    SubmissionModal.jsx

/css
  /home
    Hero.module.css
    TaskGrid.module.css
  /task
    TaskDetail.module.css
  /submission
    SubmissionCard.module.css
    SubmissionModal.module.css
```

---

## ⚠️ Rules

* Use **only Module CSS**
* No global CSS
* No IDs or tags → only classes
* Import like:

```js
import styles from "@/css/home/Hero.module.css"
```

* Use like:

```jsx
<div className={styles.nav}></div>
```

* Multiple classes:

```jsx
<div className={`${styles.nav} ${styles.nav2}`}></div>
```

---

## ⚠️ Hooks Rule

* If using hooks → add at top:

```js
"use client"
```

* Do NOT:

  * Use logic in `page.jsx`
  * Use hooks in `page.jsx`

---

# 🗄️ Database Models (MongoDB)

## 1. User Model

```
User {
  _id
  name
  email
  avatar
  createdAt
}
```

---

## 2. Task Model

```
Task {
  _id
  title
  description_md
  difficulty
  tags: []
  
  reviewSchema: [
    {
      label: "Folder Structure",
      maxScore: 5
    }
  ]

  createdAt
}
```

---

## 3. Submission Model

```
Submission {
  _id
  taskId
  userId

  projectLink
  notes

  likes: Number

  reviews: [
    {
      reviewerId,
      ratings: [
        {
          label,
          score
        }
      ],
      comment
    }
  ]

  createdAt
}
```

---

# 🔌 Backend (Next.js API Routes)

## Structure

```
/app/api/
  /tasks
    route.js
  /tasks/[id]
    route.js
  /submissions
    route.js
  /submissions/[id]
    route.js
  /reviews
    route.js
```

---

# 📡 API Routes

## Tasks

### GET `/api/tasks`

* Get all tasks

### GET `/api/tasks/[id]`

* Get single task

### POST `/api/tasks`

* Create task (admin)
* Includes:

  * Title
  * Markdown description
  * Review schema

---

## Submissions

### POST `/api/submissions`

* Create submission
* Body:

```
{
  taskId,
  projectLink,
  repoLink,
  message,
}
```

---

### GET `/api/submissions?taskId=`

* Get all submissions of a task

---

### GET `/api/submissions/[id]`

* Get single submission

---

## Likes

### POST `/api/submissions/[id]/like`

* Toggle like

---

## Reviews

### POST `/api/reviews`

* Submit review

```
{
  submissionId,
  ratings: [
    { label, score }
  ],
  comment
}
```

---

# 🔄 Data Flow

1. Admin creates Task + Review Schema
2. User opens task → sees `.md`
3. User submits solution
4. Other users:

   * View submissions
   * Like
   * Review based on schema

---

# 🎯 Key Features

* Dynamic review system (backend-driven)
* Clean modular UI
* Scalable structure
* Peer learning system

---

# 🧠 Future Improvements

* Authentication
* Leaderboard
* Notifications
* Bookmark tasks
* AI feedback (optional)

---


# Work assign 
Abhinay will make the homepage that includes the nav a hero and all the tasks listed

sneha will make the tasks page where the .md file will be shown a submit task button and a view submission button and also a modal of submit taks asking for repo link live link and addtional info as text 

Sharat will make the submission page where all the submission will be listed 

Shashank lehara will make the backend part in that he have to make submissions part get and post both 

abhinav will make the Tasks part get and post both 

I will go for the whole admin and authentication part fullstack sololey