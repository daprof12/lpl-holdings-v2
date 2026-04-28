-- Allow the application to read and update SMTP configuration from the frontend.
-- This policy ensures that the anon key can successfully select, insert, and update rows in smtp_config.

DROP POLICY IF EXISTS "Enable all operations for smtp_config" ON public.smtp_config;

CREATE POLICY "Enable all operations for smtp_config" 
ON public.smtp_config
FOR ALL
USING (true)
WITH CHECK (true);
