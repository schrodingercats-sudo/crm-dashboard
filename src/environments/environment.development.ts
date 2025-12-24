export const environment = {
  production: false,
  firebase: {
    apiKey: process.env['NG_APP_FIREBASE_API_KEY'] || 'AIzaSyCWqmOiSs08mXXtNVpJhGb7_SG0kcyLWQ0',
    authDomain: process.env['NG_APP_FIREBASE_AUTH_DOMAIN'] || 'zyptenix-ab.firebaseapp.com',
    projectId: process.env['NG_APP_FIREBASE_PROJECT_ID'] || 'zyptenix-ab',
    storageBucket: process.env['NG_APP_FIREBASE_STORAGE_BUCKET'] || 'zyptenix-ab.firebasestorage.app',
    messagingSenderId: process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'] || '710758393566',
    appId: process.env['NG_APP_FIREBASE_APP_ID'] || '1:710758393566:web:6c008994a556ec3691044f',
    measurementId: process.env['NG_APP_FIREBASE_MEASUREMENT_ID'] || 'G-S10E7B3ZKJ'
  },
  supabase: {
    url: process.env['NG_APP_SUPABASE_URL'] || 'https://avgqiqpzemajlelrpjre.supabase.co',
    anonKey: process.env['NG_APP_SUPABASE_ANON_KEY'] || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2Z3FpcXB6ZW1hamxlbHJwanJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODY2NDAsImV4cCI6MjA1ODY2MjY0MH0.UdYfjprXMWYqRU9Y3S6t_6WIoCmJYlalQkr7-GcyoTY'
  }
};
