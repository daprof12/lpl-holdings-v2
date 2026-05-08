-- Create a new public bucket for CRM images
INSERT INTO storage.buckets (id, name, public)
VALUES ('crm-images', 'crm-images', true)
ON CONFLICT (id) DO NOTHING;

-- 1. Allow public access to view images (required for emails)
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'crm-images' );

-- 2. Allow authenticated admins to upload images
CREATE POLICY "Auth Upload Access"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'crm-images' AND auth.role() = 'authenticated' );

-- 3. Allow authenticated admins to update their images
CREATE POLICY "Auth Update Access"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'crm-images' AND auth.role() = 'authenticated' );

-- 4. Allow authenticated admins to delete images
CREATE POLICY "Auth Delete Access"
ON storage.objects FOR DELETE
USING ( bucket_id = 'crm-images' AND auth.role() = 'authenticated' );
