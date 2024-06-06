import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zhrvlyxaeskqgjcaacpu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocnZseXhhZXNrcWdqY2FhY3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1OTMyMzksImV4cCI6MjAzMzE2OTIzOX0.RyFFl0y5jSFaQd6ZZklislNhxE6XteMSFzqAZJhb9sQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})