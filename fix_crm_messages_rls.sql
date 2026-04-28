-- Allow the application to read and update CRM messages from the frontend.
-- This policy ensures that the anon key can successfully select, insert, update, and delete rows in crm_messages.

DROP POLICY IF EXISTS "Enable all operations for crm_messages" ON public.crm_messages;

CREATE POLICY "Enable all operations for crm_messages" 
ON public.crm_messages
FOR ALL
USING (true)
WITH CHECK (true);
