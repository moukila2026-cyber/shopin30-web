-- SHOPIN30 — demandes de services
-- À exécuter dans le SQL Editor du projet Supabase dédié.

create table if not exists public.commandes (
  id uuid primary key default gen_random_uuid(),
  nom text not null check (char_length(trim(nom)) between 1 and 100),
  prenom text not null check (char_length(trim(prenom)) between 1 and 100),
  entreprise text,
  telephone text not null check (char_length(trim(telephone)) between 8 and 40),
  service text not null check (
    service in (
      'Site web professionnel',
      'Application web sur mesure',
      'CRM connecté à WhatsApp'
    )
  ),
  created_at timestamptz not null default now()
);

comment on table public.commandes is 'Demandes de devis et de services reçues par SHOPIN30.';

-- L'API de production écrit avec la clé service_role côté serveur.
-- Le rôle anon ne peut insérer qu'une demande ; aucune lecture ni modification n'est accordée.
alter table public.commandes enable row level security;
revoke all on table public.commandes from public, anon, authenticated, service_role;
grant usage on schema public to anon, service_role;
grant insert on table public.commandes to anon, service_role;

drop policy if exists "Public can submit a service request" on public.commandes;
create policy "Public can submit a service request"
  on public.commandes
  for insert
  to anon
  with check (
    char_length(trim(nom)) between 1 and 100
    and char_length(trim(prenom)) between 1 and 100
    and char_length(trim(telephone)) between 8 and 40
    and service in (
      'Site web professionnel',
      'Application web sur mesure',
      'CRM connecté à WhatsApp'
    )
  );
