# GWF — Wellbeing, Growth & Freedom Movement

A full-stack portfolio application built with **Angular** (frontend) and **ASP.NET Core** (backend).

## What this app does

- **Home** — Landing page introducing the GWF movement
- **About** — Your story, mission, vision, and values (loaded from the API)
- **Shop** — Browse artisanal soaps, add to cart, and place orders
- **Contact** — Send messages through a contact form

## Project structure

```
GWF/
├── backend/Gwf.Api/          ← .NET Core Web API
│   ├── Controllers/          ← API endpoints
│   ├── Models/               ← Data shapes (Product, Contact, etc.)
│   └── Data/                 ← Sample product data
├── frontend/gwf-web/         ← Angular app
│   └── src/app/
│       ├── core/             ← Services & models (talks to API)
│       ├── pages/            ← Home, About, Products, Contact
│       └── shared/           ← Header, Footer
└── GWF.sln                   ← Open in Visual Studio / Rider
```

---

## Step-by-step: Run the app

### Step 1 — Start the backend (API)

Open a terminal and run:

```bash
cd backend/Gwf.Api
dotnet run
```

The API starts at **http://localhost:5048**. Open **http://localhost:5048/swagger** to see all endpoints and test them.

### Step 2 — Start the frontend (Angular)

Open a **second** terminal:

```bash
cd frontend/gwf-web
npm start
```

The app opens at **http://localhost:4200**.

> Keep both terminals running. Angular calls the .NET API over HTTP.

---

## Step-by-step: How it works (learning guide)

### Lesson 1 — The API (Backend)

The backend is a **REST API**. Each URL returns or accepts JSON data.

| Endpoint | Method | What it does |
|----------|--------|--------------|
| `/api/products` | GET | List all products |
| `/api/products/{id}` | GET | Get one product |
| `/api/about` | GET | Founder info (your bio) |
| `/api/contact` | POST | Submit contact form |
| `/api/orders` | POST | Place an order |

**Key files to explore:**

1. `backend/Gwf.Api/Models/Product.cs` — Defines what a product looks like
2. `backend/Gwf.Api/Controllers/ProductsController.cs` — Handles `/api/products` requests
3. `backend/Gwf.Api/Program.cs` — App startup; CORS lets Angular call the API

**Try this:** In Swagger, call `GET /api/products` and see the JSON response.

### Lesson 2 — Angular services (Frontend → API)

Angular **services** call the API. See `frontend/gwf-web/src/app/core/services/api.service.ts`:

```typescript
getProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.baseUrl}/products`);
}
```

Components use the service instead of calling HTTP directly.

**Try this:** Open the Shop page and watch the Network tab in DevTools — you'll see a request to `localhost:5048/api/products`.

### Lesson 3 — Routing

Routes map URLs to pages in `app.routes.ts`:

```typescript
{ path: 'about', component: AboutComponent }
```

When you visit `/about`, Angular loads `AboutComponent`.

### Lesson 4 — Components & templates

Each page is a **component** with:

- `.ts` — Logic (fetch data, handle clicks)
- `.html` — Template (what the user sees)
- `.scss` — Styles

Example: `about.component.ts` calls `api.getFounderInfo()` in `ngOnInit()` and displays the result in the template.

### Lesson 5 — Cart (client-side state)

The cart lives in `CartService` using Angular **signals**:

```typescript
private readonly items = signal<CartItem[]>([]);
```

Adding to cart updates this signal; the header badge and cart panel react automatically.

---

## Customization checklist

- [ ] **Your bio** — Edit `AboutController.cs` with your real name and story
- [ ] **Products** — Edit `ProductStore.cs` with your actual soaps and prices
- [ ] **Contact email** — Update `contact.component.html`
- [ ] **Logo** — Add your logo to `frontend/gwf-web/public/` and update `header.component.html`
- [ ] **Your photo** — Add an image to the About page (replace the placeholder)
- [ ] **Colors** — Tweak CSS variables in `src/styles.scss`

---

## Deploy for free (Render)

The repo includes a [Render](https://render.com) blueprint that deploys both the API and the Angular site on Render’s free tier.

| Service | URL (after deploy) | What it runs |
|---------|-------------------|--------------|
| **gwf-api** | `https://gwf-api.onrender.com` | ASP.NET Core API |
| **gwf-web** | `https://gwf-web.onrender.com` | Angular site |

### One-time setup (~5 minutes)

1. Create a free account at [render.com](https://render.com) (sign in with GitHub).
2. Open the blueprint link: [Deploy GWF on Render](https://dashboard.render.com/select-repo?type=blueprint)
3. Select your **Rosie1028/GWF** repository.
4. Click **Apply** — Render creates both services and deploys from `main`.

That’s it. When the deploy finishes, open **https://gwf-web.onrender.com**.

### Free tier notes

- **Static site (frontend)** — always on, no cold starts.
- **Web service (API)** — sleeps after ~15 minutes of no traffic. The first request after sleep can take ~30 seconds to wake up.
- Both services stay free as long as you’re within Render’s free limits.

### After you push code changes

Render redeploys automatically when you push to `main`:

```bash
git add .
git commit -m "Your changes"
git push
```

### Troubleshooting

| Problem | Fix |
|---------|-----|
| Shop page shows no products | Wait for the API to wake up, then refresh. Check **gwf-api** logs in the Render dashboard. |
| API build fails | Open the **gwf-api** service → **Logs** in Render. |
| Frontend can’t reach API | In **gwf-api** → **Environment**, confirm `AllowedOrigins` is `https://gwf-web.onrender.com`. |

---

## Next steps (when you're ready)

1. **Database** — Replace in-memory data with Entity Framework + SQLite/SQL Server
2. **Authentication** — Add user accounts for admin product management
3. **Payments** — Integrate Stripe for real checkout
4. **Custom domain** — Add your own domain in Render’s dashboard for each service
5. **Email** — Send real contact/order emails with SendGrid or SMTP

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular 19, TypeScript, SCSS |
| Backend | ASP.NET Core 7, C# |
| API docs | Swagger (built-in) |

---

Built with care for The Wellbeing Growth & Freedom Movement.
