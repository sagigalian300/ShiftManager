import { NextResponse } from "next/server";
import { urlConnector } from "./utils/urlConnector";

// 1. Define routes and their allowed roles
const BOSS_ROUTES = ["/shifts", "/workers", "/roles"];
const WORKER_ROUTES = ["/workersShiftAssignments"];
const ADMIN_ROUTES = ["/admin"];

const LOGIN_URL = "/login";
const UNAUTHORIZED_URL = "/unauthorized";
const BACKEND_STATUS_URL = urlConnector + "status"; // Single endpoint

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const cookieHeader = request.headers.get("cookie") || "";

  // --- FIXED MATCHING LOGIC ---
  // We check: Is it an exact match? OR Does it start with "route/"?
  // This prevents "/workers" from matching "/workersShiftAssignments"

  const isBossRoute = BOSS_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isWorkerRoute = WORKER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAdminRoute = ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // 2. Perform ONE Unified Auth Check
  try {
    const res = await fetch(BACKEND_STATUS_URL, {
      method: "GET",
      headers: { Cookie: cookieHeader },
    });

    if (!res.ok) {
      // Token is invalid/missing -> Go to Login
      const url = request.nextUrl.clone();
      url.pathname = LOGIN_URL;
      return NextResponse.redirect(url);
    }

    const userData = await res.json();
    const userRoles = userData.roles || [];

    // 3. Check Permissions
    // Scenario A: User is trying to access Admin Routes
    if (isAdminRoute) {
      const isAdmin = userRoles.includes("admin");
      if (!isAdmin) {
        const url = request.nextUrl.clone();
        url.pathname = UNAUTHORIZED_URL;
        return NextResponse.redirect(url);
      }
    }

    // Scenario B: User is trying to access Boss Routes
    if (isBossRoute) {
      const isBoss = userRoles.includes("boss") || userRoles.includes("admin");
      if (!isBoss) {
        // User is logged in (e.g. Worker) but NOT a boss -> Unauthorized
        const url = request.nextUrl.clone();
        url.pathname = UNAUTHORIZED_URL;
        return NextResponse.redirect(url);
      }
    }

    // Scenario C: User is trying to access Worker Routes
    if (isWorkerRoute) {
      const isWorker = userRoles.includes("worker");
      // Optional: Do bosses also have access to worker views?
      // If yes: const isAllowed = isWorker || userRoles.includes("boss");
      if (!isWorker) {
        const url = request.nextUrl.clone();
        url.pathname = UNAUTHORIZED_URL;
        return NextResponse.redirect(url);
      }
    }

    // If we passed the checks, allow access
    return NextResponse.next();
  } catch (error) {
    console.error("Auth check failed:", error);
    // If backend is down, safer to redirect to login
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_URL;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/shifts/:path*",
    "/workers/:path*",
    "/roles/:path*",
    "/workersShiftAssignments/:path*",
    "/admin/:path*",
  ],
};
