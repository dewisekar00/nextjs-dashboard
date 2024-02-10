import type { NextAuthConfig } from 'next-auth';

//It specifies custom page routes related to authentication.
// In this case, it sets the signIn page to /login. This means that when a user tries to sign in, they will be redirected to the /login page.

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // ini authorization untuk semisal user mau ke /dashboar maka dia akan dikembalikan ke login kalo belum login
  // Protecting your routes with Next.js Middleware
  callbacks: {
    // authorized callback is triggered when a user attempts to access a protected route (e.g., /dashboard).
    authorized({ auth, request: { nextUrl } }) {
//digunakan untuk memeriksa apakah objek pengguna tersedia atau tidak, dan mengonversi hasilnya menjadi tipe data boolean yang jelas (true atau false).
      const isLoggedIn = !!auth?.user;
      //  cara untuk memeriksa apakah pengguna sedang mencoba mengakses halaman dashboard atau tidak.
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      // ini buat ngecek kalo user mau ke /dashboard
      if (isOnDashboard) {
        if (isLoggedIn) 
        return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      //jika kita tidak berada di dalam blok if atau else if, yang berarti kita tidak dalam kondisi khusus di mana pengguna mencoba mengakses halaman dashboard atau belum, kita mengembalikan nilai true. Ini menunjukkan bahwa aksi yang sedang diambil adalah di luar kendali autentikasi dan pengguna diizinkan untuk melakukannya.

      return true;
    },
  },
  //The providers option is an array where you list different login options.
  providers: [], 
} satisfies NextAuthConfig;

//  exports an authConfig object. This object will contain the configuration options for NextAuth.js.
