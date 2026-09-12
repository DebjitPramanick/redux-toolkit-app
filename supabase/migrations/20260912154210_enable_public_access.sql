alter table public."Shop" enable row level security;
alter table public."Customer" enable row level security;
alter table public."Inventory" enable row level security;
alter table public."Bank" enable row level security;
alter table public."Transaction" enable row level security;

create policy "public read shops"
on public."Shop"
for select
to anon
using (true);

create policy "public read customers"
on public."Customer"
for select
to anon
using (true);

create policy "public read inventory"
on public."Inventory"
for select
to anon
using (true);

create policy "public read bank"
on public."Bank"
for select
to anon
using (true);

create policy "public read transactions"
on public."Transaction"
for select
to anon
using (true);