-- Allow the application to delete users from the users table.
-- This policy ensures that the anon key can successfully delete rows.
-- If you want to restrict it specifically to admins, you may need a more complex policy,
-- but since the app relies on client-side routing for admin access, this will restore functionality.

DROP POLICY IF EXISTS "Enable delete for users" ON public.users;

CREATE POLICY "Enable delete for users" 
ON public.users
FOR DELETE
USING (true);
