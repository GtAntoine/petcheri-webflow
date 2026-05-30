<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Icons — règle absolue

**Toujours utiliser les icônes itshover** (`src/components/icons/*.tsx`) en priorité sur tout autre système d'icônes.

- ✅ itshover icons (`ShieldCheckIcon`, `UsersIcon`, `SparklesIcon`, etc.)
- ❌ lucide-react (uniquement si aucune itshover ne convient et après confirmation)
- ❌ emojis dans le code JSX

Liste des icônes disponibles dans `src/components/icons/` :
`flame`, `graduation-cap`, `hand-heart`, `heart-handshake`, `heart`,
`magnifier`, `message-square`, `party-popper`, `paw-print`, `search`,
`send`, `shield-check`, `sparkles`, `trophy`, `truck`, `unordered-list`, `users`

Pour les icônes animées au hover de la carte entière, utiliser `AnimatedCard` (layout vertical) ou `AnimatedCardHorizontal` (layout icône-gauche / texte-droite).
