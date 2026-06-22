-- Author: Antigravity
-- Date: 2026-06-17
-- Task: Oracle Migration - Step 1: User Schema Creation
-- Purpose: Creates the schema owner WANNASINGH and grants required privileges.

-- Create the user
DROP USER WANNASINGH CASCADE;
CREATE USER WANNASINGH IDENTIFIED BY "gPLtbSg7CNf2HDh";

-- Grant roles
GRANT CONNECT, RESOURCE, DWROLE TO WANNASINGH;

-- Quotas and default tablespaces
ALTER USER WANNASINGH DEFAULT TABLESPACE DATA TEMPORARY TABLESPACE TEMP;
ALTER USER WANNASINGH QUOTA UNLIMITED ON DATA;
