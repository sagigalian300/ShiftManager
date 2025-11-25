// middleware.js
import { NextResponse } from 'next/server';
// 🚫 Remove: import axios from 'axios'; 

const PROTECTED_ROUTES = ['/dashboard']; // must be authenticated to get into them.
const LOGIN_URL = '/login';
// ⚠️ Ensure this URL is correct:
const BACKEND_STATUS_URL = 'http://localhost:3001/status'; 

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        
        const cookieHeader = request.headers.get('cookie') || '';

        try {
            // ✅ Use the native 'fetch' API instead of Axios
            const authStatusResponse = await fetch(BACKEND_STATUS_URL, {
                method: 'GET',
                // 2. Crucial: Forward the HTTP-only cookie
                headers: {
                    'Cookie': cookieHeader,
                },
            });

            // 3. Manually check for a successful status (200-299)
            if (authStatusResponse.ok) {
                // Status is 200: User is authenticated.
                return NextResponse.next(); 
            }
            
            // If status is NOT 2xx (e.g., 401), execution falls to the catch block logically
            // or the subsequent redirect code if you prefer to handle it outside catch.

        } catch (error) {
            // This catch block primarily handles network errors (e.g., backend is down)
            console.error("Backend connection error:", error);
        }

        // Redirect unauthenticated/unreachable user to login
        const url = request.nextUrl.clone();
        url.pathname = LOGIN_URL;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};