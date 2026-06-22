-- Add password_hash column to admin_emails for local auth
ALTER TABLE public.admin_emails
ADD COLUMN IF NOT EXISTS password_hash TEXT;

COMMENT ON COLUMN public.admin_emails.password_hash IS 'PBKDF2-SHA512 hashed password (salt:hash format)';
