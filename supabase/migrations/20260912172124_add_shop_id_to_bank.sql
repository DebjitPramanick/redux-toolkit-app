ALTER TABLE public."Bank"
ADD COLUMN shop_id bigint;

ALTER TABLE public."Bank"
ADD CONSTRAINT bank_shop_id_fkey
FOREIGN KEY (shop_id)
REFERENCES public."Shop"(id)
ON DELETE CASCADE;