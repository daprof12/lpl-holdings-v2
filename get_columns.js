import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read from utils/supabase/client for url and key
const url = process.env.VITE_SUPABASE_URL || ''; // need to extract from file
