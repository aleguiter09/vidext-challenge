# Vidext Challenge - Alejandro Guiter

A minimal collaborative canvas app developed for a technical challenge,  
featuring document management (create, save, delete) and an interactive editor built with tldraw.

## 🚀 Deployment

Project deployed on **Vercel**: [https://vidext-challenge-ag.vercel.app/](https://vidext-challenge-ag.vercel.app/)

> **Note:** The deployed version includes my personal OpenAI API key to enable the **AI Suggest Title** feature.  
> This key has limited credits and may stop working after a few attempts.  
> Locally, you can still test this feature by setting your own `OPENAI_API_KEY` in `.env.local`.

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [tRPC](https://trpc.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn](https://ui.shadcn.com/)
- [tldraw](https://tldraw.dev/)
- [Vercel](https://vercel.com/)
- Simple persistence simulated with `fileStore` (local JSON).

## ⚙️ Local setup

```bash
# 1. Clone the repo
git clone https://github.com/aleguiter09/vidext-challenge.git
cd vidext-challenge

# 2. Install dependencies
npm install

# 3. Run on dev mode
npm run dev

# 4. Open in your browser
http://localhost:3000
```

## 🔑 Environment Variables

To run the project locally and use the AI tool you need an OpenAI API key.

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Replace your_api_key_here with your own key from the OpenAI Dashboard

Note: The API key is required only for the AI feature (Suggest Title).

## 🧪 Testing the API

The backend is built with **tRPC**, which exposes procedures under `/api/trpc/*`.

You can test the API in two different ways:

### 1. Through the UI (recommended)

- Open the app at [http://localhost:3000](http://localhost:3000).
- Use the **sidebar** and **editor**:
  - Sidebar lists documents (`getAll`).
  - Opening a document triggers `getDocument`.
  - Saving changes calls `saveDocument`.
  - Deleting calls `deleteDocument`.

This is the easiest way to validate all API calls.

### 2. Using curl / Postman

#### Queries (GET/POST)

- **Get all documents**

```bash
   curl "http://localhost:3000/api/trpc/getAll"
```

- **Save a document**

```bash
  curl -X POST http://localhost:3000/api/trpc/saveDocument?batch=1 \
  -H "Content-Type: application/json" \
  -d '{"0":{"json":{"id":"123","title":"Demo","snapshot":{}}}}'
```

- **Delete a document**

```bash
  curl -X POST http://localhost:3000/api/trpc/deleteDocument?batch=1 \
  -H "Content-Type: application/json" \
  -d '{"0":{"json":{"id":"123"}}}'
```

### 🤖 AI Feature

Integrated with OpenAI API (via `openai` SDK) to suggest document titles based on the canvas snapshot.

- Click **"✨ Suggest Title"** in the editor toolbar.
- The current canvas snapshot is sent to `gpt-4o-mini`.
- The model returns a short, descriptive title suggestion.

## 🧪 Tests & CI/CD

- **Testing**: unit tests are implemented with **Vitest**.
- **Branch protection**: `master` branch is protected to only allow changes through pull requests.
- **Husky + lint-staged**: runs linters and tests before each commit & push to keep code quality.
- **GitHub Actions**: CI pipeline that runs the test suite on every pull request.

## 🚧 Improvements for the future

- Add user authentication
- Replace the file-based store with a real database
- Real-time collaborative editing
- Mobile optimization
- Integration tests E2E with Playwright
