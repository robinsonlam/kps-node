# Task Manager API - TypeScript Interview Challenge

## Outline
- [📋 Important](#important)
- [📋 Project Overview](#introduction)
- [🚀 Quick Start Guide](#quickstart)
- [🛠️ Implementation Requirements](#requirements)
- [🧪 Testing Guide](#testing)
- [💡 Tips for Success](#tips)
- [🧠 AI Use](#ai)

<div id="overview"></a>
  
## 📋 IMPORTANT 
**After you complete your work, please publish it to your own git repository and share the link with the talent team. **


## 📋 Project Overview

Welcome to the TypeScript/NodeJS interview challenge! This is a **90-minute coding exercise** where you'll implement a Task Management API with CRUD operations, validation, error handling, and testing.

### What We're Looking For
- **Following Instructions**: Complete the requirements as specified
- **Clean Code**: Write readable, maintainable TypeScript code  
- **Testing**: All provided tests must pass after implementation
- **NodeJS Skills**: Demonstrate solid understanding of NodeJS/Express concepts

### ⚠️ IMPORTANT: Tests Must Pass
This project includes **comprehensive unit and integration tests** that MUST pass when you complete your implementation. The tests serve as both validation and specification for expected behavior.

If you have questions about requirements during the interview, ask your interviewer for clarification.

**Good luck! 🚀**

---------------------------------------------------

<div id="quickstart"></div>

## 🚀 Quick Start Guide 

### 1. Install Dependencies
```bash
npm install
```

### 2. Test Your Setup
```bash
# Run the server
npm run dev

# In another terminal, test the health endpoint
curl http://localhost:3000/health
# Should return: {"status":"OK","timestamp":"..."}
```

### 3. Run Tests (Critical!)
```bash
# Run all tests (most will fail initially - that's expected!)
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch
```

### 4. Your First Steps
1. **Complete the Task interface** in `src/types/task.ts`
2. **Implement one endpoint** - Start with POST /api/tasks
3. **Run tests frequently** - They guide your implementation
4. **Build incrementally** - Make tests pass one by one

### 5. Publish Your Work
After you complete your work, please publish it to a public git repository and share the link with us.

---------------------------------------------------

<div id="requirements"></div>

## 🛠️ Implementation Requirements 

### Project Structure Quick Reference
```
src/
├── types/task.ts          # Complete the Task interface here
├── controllers/           # Implement your API endpoints
├── services/              # Business logic goes here
├── validation/            # Joi validation schemas
├── routes/                # Route definitions (mostly done)
├── middleware/            # Error handling
├── utils/                 # Helper functions
└── __tests__/             # Test files (MUST PASS!)
```

### Core Requirements (60 minutes)

#### 1. Task Model
Complete the `Task` interface in `src/types/task.ts`:
```typescript
interface Task {
  id: string;              // UUID
  title: string;           // Required, max 100 chars
  description?: string;    // Optional, max 500 chars
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;         // Optional
}
```

#### 2. API Endpoints
Implement these endpoints in `src/controllers/taskController.ts`:

- **`GET /api/tasks`** - Get all tasks
  - Support query parameters: `status`, `priority`
  - Return tasks sorted by priority (high → medium → low) then by createdAt

- **`POST /api/tasks`** - Create new task
  - Validate input using Joi
  - Auto-generate ID and timestamps
  - Default status should be 'pending'

#### 3. Validation
Implement input validation in `src/validation/taskValidation.ts`:
- Use Joi for schema validation
- Proper error messages for validation failures

#### 4. Error Handling
Implement proper error handling:
- 400 for validation errors
- 404 for not found  
- 500 for server errors
- Use the error middleware in `src/middleware/errorHandler.ts`

### Bonus Requirements (30 minutes)
If you finish early, you can:

#### 5. Enhanced Validation
Add more sophisticated validation rules:
- Prevent duplicate task titles
- Validate that due dates are in the future
- Add custom error messages for different validation failures

#### 6. Code Quality Improvements
- Add comprehensive error logging
- Implement request rate limiting
- Add API documentation comments
- Improve the error handler with more specific error types

---------------------------------------------------

<div id="testing"></div>

## 🧪 Testing Guide 

### Comprehensive Test Suite
The project includes four test files that **must all pass**:

1. **`src/__tests__/validation.test.ts`** - Joi validation schema tests
2. **`src/__tests__/taskService.test.ts`** - Business logic unit tests
3. **`src/__tests__/task.test.ts`** - API endpoint integration tests  
4. **`src/__tests__/utils.test.ts`** - Utility function tests

### Running Tests
```bash
# Run all tests (must pass!)
npm test

# Watch mode for development (recommended)
npm run test:watch

# Run specific test file
npm test -- validation.test.ts

# Run with coverage
npm test -- --coverage
```

### Test-Driven Development Approach
1. **Start by running tests** - see what's failing
2. **Read test names and expectations** - they tell you exactly what to implement
3. **Implement one feature at a time** - watch tests turn from red to green
4. **Use tests as your specification** - if a test expects specific behavior, implement that exactly

### What the Tests Expect

#### Required Service Methods (`src/services/taskService.ts`)
```typescript
// Core operations
static async createTask(data: CreateTaskRequest): Promise<Task>
static async getAllTasks(query?: TaskQueryParams): Promise<Task[]>
```

#### Required Controller Functions (`src/controllers/taskController.ts`)
```typescript
// All should be async and use (req: Request, res: Response, next: NextFunction)
export const getAllTasks = async (req, res, next) => { ... }
export const createTask = async (req, res, next) => { ... }
```

#### Required Utility Functions (`src/utils/helpers.ts`)
```typescript
export const isValidUUID = (uuid: string): boolean => { ... }
export const formatDate = (date: Date): string => { ... }
export const calculateDaysDifference = (date1: Date, date2: Date): number => { ... }
export const isDateWithin24Hours = (date: Date): boolean => { ... }
```

### Key Behaviors Expected

#### Task Creation
- Generate UUID for new tasks
- Set default status to `'pending'`
- Set `createdAt` and `updatedAt` to current timestamp
- Validate all input data

#### Task Retrieval  
- Filter by `status` and `priority` query parameters
- Sort by priority (high → medium → low) then by `createdAt`
- Return empty array if no tasks match filters

#### HTTP Status Codes
- `200` - Successful GET
- `201` - Successful POST (creation)
- `400` - Validation errors
- `500` - Server errors

### Common Test Failures and Solutions

#### "Cannot find module" errors
- Make sure you've run `npm install`
- Check that your import/export statements match expected interfaces

#### "Property does not exist" errors  
- Complete the interface definitions in `src/types/task.ts`
- Make sure all required properties are included

#### "Function not implemented" errors
- Replace `throw new Error('Not implemented')` with actual implementation
- Make sure function signatures match exactly

#### HTTP status code failures
- Check you're returning correct status codes (200, 201, 204, 400, 404)
- Make sure error responses include proper error objects

### Test Data Cleanup
The integration tests assume you implement a way to clear test data between tests:
1. Add a test-only endpoint like `DELETE /api/tasks/test-clear-all`
2. Or modify your service to have a `clearAllTasks()` method for testing
3. Or reset your in-memory storage between tests

### Success Criteria
✅ **All tests pass** - This is the minimum requirement  
✅ **Clean test output** - No skipped tests, no console errors
✅ **Fast execution** - Tests should run quickly (under 10 seconds total)

---------------------------------------------------

<div id="tips"></div>

## 💡 Tips for Success 

### Time Management Suggestions
- **0-15 min**: Read requirements, understand structure, plan approach
- **15-45 min**: Core operations implementation (GET and POST endpoints)
- **45-75 min**: Validation, error handling, make tests pass
- **75-90 min**: Polish code and bonus features

### Plan of Attack Suggestions
1. **Run tests first** - See what needs to be implemented
2. **Read test names carefully** - They describe exactly what should happen  
3. **Start with the Task interface** - Many tests depend on this
4. **Implement validation early** - Validation tests are often easiest to fix
5. **Use TypeScript effectively** - Leverage type safety and interfaces
6. **Keep it simple** - Focus on making tests pass with clean code
7. **Test frequently** - Use `npm run test:watch` for immediate feedback

---------------------------------------------------

<div id="ai"></div>

## 🧠 AI Use

We are aware of what AI solutions look like, please don't submit an AI generated solution.
