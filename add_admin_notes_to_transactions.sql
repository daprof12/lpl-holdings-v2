-- Add admin_notes column to withdrawals, deposits and transactions tables if they don't exist

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='withdrawals' AND column_name='admin_notes') THEN
        ALTER TABLE withdrawals ADD COLUMN admin_notes TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='deposits' AND column_name='admin_notes') THEN
        ALTER TABLE deposits ADD COLUMN admin_notes TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='transactions' AND column_name='admin_notes') THEN
        ALTER TABLE transactions ADD COLUMN admin_notes TEXT;
    END IF;
END $$;
