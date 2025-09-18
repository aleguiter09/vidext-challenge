# Vidext Challenge - Alejandro Guiter

Simple **tldraw** editor

## 🚀 Deployment

Project deployed on **Vercel**:  
👉 [https://vidext-challenge-ag.vercel.app/](https://vidext-challenge-ag.vercel.app/)

---

## 🛠️ Technologies Used

- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [tRPC](https://trpc.io/)
- [TailwindCSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [tldraw](https://tldraw.dev/)
- [Vercel](https://vercel.com/)
- Simple persistence simulated with `fileStore` (local JSON).

---

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

---

## 🧪 Test the API

---

## 🧪 Tests & CI/CD

- ✅ **Testing**: unit tests are implemented with **Vitest**.
- 🔒 **Branch protection**: `master` branch is protected to only allow changes through pull requests.
- 🐶 **Husky + lint-staged**: runs linters and tests before each commit & push to keep code quality.
- ⚙️ **GitHub Actions**: CI pipeline that runs the test suite on every pull request.

---

## 🚧 Improvements for the future

- Add user authentication
- Replace the file-based store with a real database
- Real-time collaborative editing
- Mobile optimization
- Integration tests E2E with Playwright
