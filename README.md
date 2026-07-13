# SDJ Services

Marketplace premium pour services numériques.

- **Étape 1** : fondations du projet et landing page.
- **Étape 2** : pages par catégorie et authentification Supabase.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript strict · Tailwind CSS · Supabase · Resend ·
React Hook Form + Zod · Lucide React · Framer Motion

## Démarrage

```bash
npm install
cp .env.local.example .env.local   # puis renseigner vos clés Supabase / Resend
npm run dev
```

## Structure

```
app/
  page.tsx                    Landing page
  services/page.tsx           Liste des catégories
  services/[slug]/page.tsx    Détail d'une catégorie + offres
  connexion/page.tsx          Connexion
  inscription/page.tsx        Création de compte
  compte/page.tsx             Espace client (protégé)
  auth/callback/route.ts      Échange du code de confirmation email
components/
  layout/                     Navbar (auth-aware), Footer
  sections/                   Sections de la landing page
  ui/                         Composants réutilisables (cards, champs, boutons)
  auth/                       Formulaires de connexion/inscription, déconnexion
lib/
  supabase.ts                 Client Supabase (Client Components)
  supabase-server.ts          Client Supabase (Server Components / Route Handlers)
  validations/                Schémas Zod
hooks/
  useUser.ts                  Hook client pour l'état d'authentification
data/                         Contenu statique typé (catégories, offres, avis, FAQ)
types/                        Types TypeScript partagés
middleware.ts                 Rafraîchissement de session + protection des routes
```

## Authentification (Étape 2)

- `/connexion` et `/inscription` utilisent React Hook Form + Zod pour la validation, et
  `@supabase/ssr` pour la session.
- `middleware.ts` rafraîchit la session Supabase à chaque requête et redirige vers `/connexion`
  toute tentative d'accès à `/compte` ou `/vendre-carte-cadeau` sans session active.
- `/auth/callback` échange le code reçu par email (confirmation d'inscription) contre une
  session.
- La navbar affiche automatiquement « Mon compte » à la place de « Connexion » une fois
  l'utilisateur authentifié.
- Pensez à activer la confirmation par email dans votre projet Supabase (Authentication →
  Providers → Email) et à renseigner l'URL de redirection `/auth/callback` dans
  Authentication → URL Configuration.

## Catégories et offres (Étape 2)

`/services` liste les 9 catégories ; `/services/[slug]` affiche les offres correspondantes
(`data/plans.ts`). Les prix et offres actuels sont des **données de démonstration** — à
remplacer par le vrai catalogue Supabase.

## Vendre une carte cadeau (Étape 3)

`/vendre-carte-cadeau` est protégée par `middleware.ts` : un visiteur non connecté est
redirigé vers `/connexion?next=/vendre-carte-cadeau`.

Le formulaire (`components/sell-gift-card/SellGiftCardForm.tsx`) :
- calcule une estimation en direct à partir de `data/giftcard-brands.ts` (taux indicatifs,
  à remplacer par une table Supabase pour pouvoir les modifier sans redéploiement) ;
- envoie la photo optionnelle de la carte vers le bucket Storage `gift-card-proofs` ;
- insère la demande dans la table `gift_card_submissions`.

Schéma Supabase à créer avant de tester ce flux :

```sql
create table gift_card_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  brand text not null,
  value_amount numeric not null,
  code text not null,
  contact_phone text not null,
  proof_url text,
  status text not null default 'pending', -- pending | offer_sent | accepted | rejected | paid
  offer_amount_fcfa numeric,
  created_at timestamptz not null default now()
);

alter table gift_card_submissions enable row level security;

create policy "Users can insert their own submissions"
  on gift_card_submissions for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own submissions"
  on gift_card_submissions for select
  using (auth.uid() = user_id);
```

Le code de la carte (`code`) est une donnée sensible : ne l'exposez jamais dans une réponse
publique de l'API et restreignez l'accès en lecture à un rôle `service_role` côté admin plutôt
qu'aux utilisateurs eux-mêmes une fois la demande traitée.

Storage : créez un bucket **privé** `gift-card-proofs` (Storage → New bucket, décocher "Public
bucket") avec une policy limitant l'upload/lecture au propriétaire du fichier
(`storage.objects` : `auth.uid()::text = (storage.foldername(name))[1]`). Le composant actuel
appelle `getPublicUrl`, qui suppose un bucket public — à remplacer par des URLs signées
(`createSignedUrl`) une fois le bucket passé en privé, ce qui est recommandé pour ce cas d'usage.

## Emails transactionnels (Étape 4)

Deux emails sont en place via Resend, avec un template HTML partagé aux couleurs de la marque
(`lib/email/layout.ts`) :

1. **Carte reçue** (`app/api/emails/gift-card-submitted/route.ts`) — déclenché automatiquement
   par `SellGiftCardForm` juste après l'insertion en base. La route revérifie la session et
   relit la demande côté serveur (impossible de falsifier le contenu de l'email depuis le
   client). Un échec d'envoi n'empêche pas l'utilisateur de voir l'écran de confirmation.
2. **Offre reçue** (`app/api/emails/gift-card-offer/route.ts`) — appelé depuis le tableau de
   bord admin (voir ci-dessous) une fois qu'un montant est confirmé. Met à jour
   `gift_card_submissions.status` et `offer_amount_fcfa`, puis envoie l'email.

Pour activer l'envoi réel : renseignez `RESEND_API_KEY` et `RESEND_FROM_EMAIL` dans
`.env.local`, et vérifiez votre domaine d'envoi dans le tableau de bord Resend (Domains → Add
Domain) — un domaine non vérifié renvoie une erreur 403, comme rencontré précédemment sur ce
projet.

## Tableau de bord admin (Étape 5)

`/admin` est réservé aux comptes ayant `role: "admin"` dans leur **`app_metadata`** Supabase —
volontairement différent de `user_metadata` (utilisé pour le nom complet), qui reste modifiable
par l'utilisateur lui-même depuis le client. `app_metadata` ne peut être modifié qu'avec la
clé `service_role`, donc uniquement depuis votre back-office ou le tableau de bord Supabase.

Le contrôle d'accès est fait à deux niveaux :
- `middleware.ts` bloque toute requête vers `/admin/*` si l'utilisateur n'est pas connecté ou
  n'a pas `app_metadata.role === "admin"` ;
- `app/admin/layout.tsx` revérifie la même condition côté Server Component, par précaution.

**Promouvoir un utilisateur en admin** (à exécuter une fois, depuis un script serveur ou le SQL
editor Supabase) :

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
where email = 'admin@sdjservices.com';
```

Ou via l'API admin Supabase (service role) :

```ts
await supabaseAdmin.auth.admin.updateUserById(userId, {
  app_metadata: { role: "admin" },
});
```

**Pages disponibles :**
- `/admin` — compteurs par statut de demande
- `/admin/cartes-cadeaux` — liste de toutes les demandes
- `/admin/cartes-cadeaux/[id]` — détail d'une demande (code de la carte, photo, contact) avec
  un formulaire pour envoyer l'offre, qui appelle `/api/emails/gift-card-offer` désormais
  protégé par la session admin plutôt que par un secret partagé.

Ces pages utilisent le client `service_role` (`lib/supabase-admin.ts`) pour lire/écrire toutes
les demandes sans contrainte RLS — c'est sûr uniquement parce que l'accès à `/admin` est déjà
vérifié en amont ; ne réutilisez pas ce client dans une route accessible sans ce contrôle.

L'aperçu de la photo de la carte suppose toujours un bucket Storage public (voir note
ci-dessous) — à adapter en URL signée (`createSignedUrl`) en même temps que le bucket
`gift-card-proofs` passera en privé.

## Statuts finaux et historique client (Étape 6)

Depuis `/admin/cartes-cadeaux/[id]`, deux actions (`components/admin/StatusActions.tsx`) marquent
une demande comme **payée** ou **refusée** via une Server Action
(`lib/actions/gift-card-status.ts`) qui revérifie le rôle admin avant d'écrire, puis rafraîchit
les pages admin concernées. Ces boutons disparaissent une fois la demande déjà finalisée
(`paid`/`rejected`).

`/compte` affiche désormais l'historique des cartes cadeaux soumises par le client connecté
(marque, valeur, statut, offre le cas échéant), via le client Supabase habituel — la policy RLS
`Users can view their own submissions` s'en charge. Le **code de la carte n'est volontairement
pas sélectionné** dans cette vue : ce n'est pas une donnée que le client doit revoir une fois
soumise. Notez cependant que la policy RLS actuelle autorise techniquement la lecture de toutes
les colonnes de ses propres lignes — pour verrouiller vraiment le champ `code` après traitement,
il faudra soit le vider après paiement, soit le déplacer dans une table séparée accessible
uniquement en `service_role`.

## Prochaines étapes (hors périmètre de cette livraison)

- Intégration shadcn/ui pour les composants de formulaire et de dashboard
- Pages légales (confidentialité, conditions générales)
- Email de confirmation de commande pour les catégories de services (une fois le module de
  commande construit)
- Bucket `gift-card-proofs` en privé + URLs signées (voir section "Vendre une carte cadeau")
- Verrouillage du champ `code` après traitement (voir ci-dessus)
- Filtrage/recherche dans `/admin/cartes-cadeaux`, pagination si le volume augmente

## Note

Ce scaffold a été généré sans exécution de `npm install` (pas d'accès réseau dans cet
environnement) — vérifiez les versions de dépendances avant la première installation.
