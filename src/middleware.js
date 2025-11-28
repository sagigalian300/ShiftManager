// middleware.js
import { NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard']; // boss routes
const WORKER_PROTECTED_ROUTES = ['/WorkerShiftAssignments']; // worker routes
const LOGIN_URL = '/login';
const WORKER_LOGIN_URL = '/workersLogin';
const BACKEND_STATUS_URL = 'http://localhost:3001/status'; 
const BACKEND_WORKER_STATUS_URL = 'http://localhost:3001/worker-status';

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const cookieHeader = request.headers.get('cookie') || '';

    // Check if route is a boss protected route
    if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        try {
            const authStatusResponse = await fetch(BACKEND_STATUS_URL, {
                method: 'GET',
                headers: {
                    'Cookie': cookieHeader,
                },
            });

            if (authStatusResponse.ok) {
                return NextResponse.next(); 
            }
        } catch (error) {
            console.error("Backend connection error:", error);
        }

        const url = request.nextUrl.clone();
        url.pathname = LOGIN_URL;
        return NextResponse.redirect(url);
    }

    // Check if route is a worker protected route
    if (WORKER_PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        try {
            const authStatusResponse = await fetch(BACKEND_WORKER_STATUS_URL, {
                method: 'GET',
                headers: {
                    'Cookie': cookieHeader,
                },
            });

            if (authStatusResponse.ok) {
                return NextResponse.next(); 
            }
        } catch (error) {
            console.error("Worker backend connection error:", error);
        }

        const url = request.nextUrl.clone();
        url.pathname = WORKER_LOGIN_URL;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/WorkerShiftAssignments/:path*'],
};