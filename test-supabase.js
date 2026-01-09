import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ejxtszboggueshgungqz.supabase.co';
const supabaseKey = 'sb_publishable_V5xseB3jGUJQsSAhu6eHRQ_ojqM0Z7U';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing Supabase connection with waitlist table...');

    // Test 1: Try to read from table
    const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Read error:', error);
    } else {
        console.log('Read success:', data);
    }

    // Test 2: Try to insert test email
    const timestamp = new Date().getTime();
    const testEmail = 'test-' + timestamp + '@example.com';
    const { data: insertData, error: insertError } = await supabase
        .from('waitlist')
        .insert([{ email: testEmail }])
        .select();

    if (insertError) {
        console.error('Insert error:', insertError);
    } else {
        console.log('Insert success:', insertData);
    }
}

testConnection();
