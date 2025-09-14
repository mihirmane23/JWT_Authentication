- The app runs at `http://localhost:4200`.
- Update `auth.service.ts` with the correct backend URL if needed (e.g., for production).

## Usage

### Running the Application
1. Start the backend (`dotnet run` in `JWTAuthenticationImplementation`).
2. Start the frontend (`ng serve` in `jwt-auth-frontend`).
3. Open `http://localhost:4200/login` in your browser.
4. Log in with username `test` and password `password`.
- On success, you'll be redirected to `/protected`, which fetches data from the protected backend endpoint.
5. If not logged in, protected routes redirect to login.
6. Logout from the protected page clears the token and redirects to login.

### Testing
- **Browser DevTools**: Use Network tab to inspect requests (e.g., login POST without JWT, protected GET with `Authorization: Bearer <jwt>`).
- **Postman/cURL**: Test backend endpoints as described in backend setup.
- **Debug Logs**: Check browser console for logs in `login.component.ts` and `auth.service.ts`.

## Frontend Explanation (Angular Standalone App)

This frontend uses Angular 18+ standalone components (no NgModules). Key features include JWT handling, route protection, and automatic token attachment to API requests.

### Key Components and Files
- **LoginComponent (`login.component.ts`)**: Handles the login form. Uses `[(ngModel)]` for two-way binding and submits credentials to `AuthService`. On success, redirects to `/protected`.
- **ProtectedComponent (`protected.component.ts`)**: Fetches data from a protected backend endpoint. Includes a logout button.
- **AuthService (`auth.service.ts`)**: Manages login, token storage (in `localStorage`), and auth checks. Provided at root level (`providedIn: 'root'`).
- **AuthInterceptor (`auth.interceptor.ts`)**: Automatically adds `Authorization: Bearer <jwt>` to HTTP requests if a token exists. Registered globally via `withInterceptors` in `app.config.ts`.
- **AuthGuard (`auth.guard.ts`)**: Protects routes like `/protected`. Checks if logged in via `AuthService`; redirects to login if not. Used in `app.routes.ts`.
- **Routing (`app.routes.ts`)**: Defines routes with guards and redirects.
- **App Config (`app.config.ts`)**: Bootstraps providers, including router and HTTP client with interceptors. No need for `@NgModule`; everything is standalone.

### How Registration Works (Standalone Angular)
In standalone Angular, components, services, and providers are registered declaratively:
- **Services**: Use `providedIn: 'root'` in `@Injectable` for global availability (e.g., `AuthService`).
- **Interceptors**: Register via `withInterceptors([authInterceptor])` in `provideHttpClient` (in `app.config.ts`).
- **Guards**: Define as functions and attach to routes in `app.routes.ts` (e.g., `canActivate: [authGuard]`).
- **Components**: Mark as `standalone: true` and import modules like `FormsModule` directly in the component.
- **Bootstrap**: In `main.ts`, use `bootstrapApplication` with `appConfig` to provide global setups.

No `AppModule` is needed—everything is tree-shakable and lazy-loaded where possible.

### How JWT Flow Works in Frontend
1. **Login**: Form submits credentials to backend via `AuthService.login()`. No JWT sent here.
2. **Token Storage**: On success, store JWT in `localStorage` (use HttpOnly cookies in production for security).
3. **Protected Requests**: `AuthInterceptor` clones requests and adds `Authorization: Bearer <jwt>` automatically for all HTTP calls (e.g., in `ProtectedComponent`).
4. **Route Protection**: `AuthGuard` checks `isLoggedIn()` before allowing access to routes.
5. **Logout**: Clears token and redirects.

### Security Notes
- **Token Storage**: `localStorage` is vulnerable to XSS; use HttpOnly cookies or IndexedDB in production.
- **HTTPS**: Ensure backend uses HTTPS.
- **CORS**: Backend has CORS enabled for `http://localhost:4200`.
- **Production**: Use environment variables for API URLs, secure secrets, and add token refresh logic.

### Integration with One Identity
This example uses simple credentials. For One Identity, modify the backend to integrate with its API (e.g., OAuth/OIDC). The frontend can adapt by changing the login flow to handle redirects or tokens from One Identity.

## Troubleshooting
- **CORS Errors**: Ensure backend `Program.cs` has `app.UseCors("AllowAngularApp")` with correct origins.
- **401 Unauthorized**: Check credentials, token expiry (30 min), or interceptor.
- **Form Issues**: Ensure `FormsModule` is imported in components.
- **Debug**: Add console logs and use browser Network/Console tabs.

For issues, open a GitHub issue or check logs.

## License
MIT License. Feel free to use and modify.
