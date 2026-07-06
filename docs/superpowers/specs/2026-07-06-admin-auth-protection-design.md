# Design Spec: Admin Route Protection and Authentication Setup

This document specifies the technical design for securing the `/admin` CMS routes and restricting login credentials for BekasiGo.

## 1. Objectives

- **Route Protection & Redirect**: Intercept unauthorized requests to any `/admin/*` path (except `/admin/login`) and automatically redirect the user to `/admin/login`.
- **Disable Auto-Login/Bypass**: Ensure `/admin` is fully secured immediately upon access, preventing any automatic bypasses.
- **Default Credentials Restriction**: Restrict staging/development login exclusively to:
  - **Email/Username**: `admin`
  - **Password**: `admin123`
- **Google Auth Behavior**: Ensure the Google Sign-in action only triggers on explicit user interaction (i.e. clicking "Continue with Google"), setting the appropriate session token/cookie correctly.

---

## 2. Proposed Changes

We will implement a hybrid server-side + client-side authentication guard:

1. **Next.js Server Middleware (`middleware.js`)**
   - Intercepts all requests targeting `/admin` or its subroutes (excluding `/admin/login`).
   - Verifies the presence of the `admin_token` cookie.
   - If missing, issues a `307 Temporary Redirect` to `/admin/login`.

2. **Client-Side Page Shell Guard (`components/admin/AdminShell.jsx`)**
   - Adds a local React state check for the `admin_token` cookie.
   - Prevents UI layout flashing by rendering a loading shell while redirecting if the cookie is not present.
   - Updates the "Sign out" action to clear the `admin_token` cookie and redirect.

3. **Autentikasi Mock (`lib/admin/mockAuth.js`)**
   - Changes validation logic to ONLY allow the username/email `admin` with password `admin123`.
   - Returns a mock session payload.

4. **Login Form Component (`components/admin/LoginForm.jsx`)**
   - Updates validation to allow the username `admin` (bypassing the strict email format checker).
   - Upon successful credentials/Google login, sets the `admin_token` cookie (and honors the "Remember me" option).

---

## 3. Alternative Approaches Considered

### Option A: Pure Client-Side Redirect in Layout
- **Pros**: Easy to implement; no server configuration or Next.js middleware required.
- **Cons**: Might cause a brief layout flash (FOUC) of dashboard stats before the JavaScript bundles load and trigger the redirect.

### Option B: Server-Side Next.js Middleware + Client-Side Cookie Guard (Recommended)
- **Pros**: Zero UI flash; secure on the HTTP level; clean separation of concerns.
- **Cons**: Requires creating a root `middleware.js` file, which is easily done and standard.

---

## 4. Detailed Component Changes

### 4.1. [NEW] `middleware.js` (Root)
Create a middleware file in the project root to intercept all `/admin` routes.
```javascript
import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

### 4.2. [MODIFY] [LoginForm.jsx](file:///e:/Kompetisi-DCN-2026/Production%20State%20-%20BekasiGo/BekasiGo-DMO/components/admin/LoginForm.jsx)
- Allow `admin` in form input validation.
- Set `admin_token` cookie on successful login (credentials or Google).

### 4.3. [MODIFY] [mockAuth.js](file:///e:/Kompetisi-DCN-2026/Production%20State%20-%20BekasiGo/BekasiGo-DMO/lib/admin/mockAuth.js)
- Update mock login rules to match the default credentials (`admin` / `admin123`).

### 4.4. [MODIFY] [AdminShell.jsx](file:///e:/Kompetisi-DCN-2026/Production%20State%20-%20BekasiGo/BekasiGo-DMO/components/admin/AdminShell.jsx)
- Clean up cookie on "Sign out" click.
- Prevent layout flash with a client-side loading check.
