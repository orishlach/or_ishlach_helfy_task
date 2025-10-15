# Task Manager App


> [!NOTE]
> A fullstack task management application built with React frontend and Express.js backend, featuring an animated task carousel interface.

## Tech Stack

<details>
  <summary> Backend</summary>


- **Node.js** with Express.js framework
- **CORS** for cross-origin requests
- **express-validator** for input validation
- **dotenv** for environment configuration

</details>


<details>
  <summary> Frontend</summary>

- **React 19** with modern hooks
- **Framer Motion** for animations and transitions
- **React Router DOM** for routing
- **Vite** for fast development and building

</details>


## Setup Instructions


> [!IMPORTANT]
> The backend server will run on **http://localhost:4000**
> 
> The frontend will run on **http://localhost:3000**





<details>
  <summary> Backend </summary>


1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

</details>


<details>
  <summary> Frontend </summary>

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```



</details>



## API Documentation


<details>
  <summary> Endpoints </summary>

#### Base URL

```
http://localhost:4000/api
```

#### Tasks
- **GET** `/tasks` - Get all tasks
- **POST** `/tasks` - Create a new task
- **PUT** `/tasks/:id` - Update a task
- **DELETE** `/tasks/:id` - Delete a task
- **PATCH** `/tasks/:id/toggle` - Toggle task completion status

#### Health Check
- **GET** `/healthcheck` - Server health status

### Task Model
```javascript
{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date,
  priority: 'low' | 'medium' | 'high'
}
```

</details>
