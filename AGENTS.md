<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Icons — règle absolue

**Toujours utiliser les icônes itshover** (`src/components/icons/*.tsx`) en priorité sur tout autre système d'icônes.

- ✅ itshover icons (`ShieldCheckIcon`, `UsersIcon`, `SparklesIcon`, etc.)
- ❌ lucide-react (uniquement si aucune itshover ne convient et après confirmation)
- ❌ emojis dans le code JSX — **jamais, même dans des cards de contenu, des listes ou des sections "situations"**

Si aucune itshover ne correspond parfaitement au sens voulu, choisir la plus proche sémantiquement plutôt que de fallback sur un emoji.

Liste des icônes disponibles dans `src/components/icons/` :
`flame`, `graduation-cap`, `hand-heart`, `heart-handshake`, `heart`,
`magnifier`, `message-square`, `party-popper`, `paw-print`, `search`,
`send`, `shield-check`, `sparkles`, `trophy`, `truck`, `unordered-list`, `users`

Pour les icônes animées au hover de la carte entière, utiliser `AnimatedCard` (layout vertical) ou `AnimatedCardHorizontal` (layout icône-gauche / texte-droite).

## Animation itshover — déclenchement sur la card entière

**L'animation d'une icône itshover doit toujours être déclenchée par le hover de la card/div parente**, jamais par le hover de l'icône elle-même.

Pattern obligatoire :
```tsx
"use client";
const iconRef = useRef<{ startAnimation: () => void; stopAnimation: () => void }>(null);

<div
  onMouseEnter={() => iconRef.current?.startAnimation()}
  onMouseLeave={() => iconRef.current?.stopAnimation()}
>
  <Icon ref={iconRef} size={20} color="#E8705A" />
  {/* contenu */}
</div>
```

Utiliser `AnimatedCard` ou `AnimatedCardHorizontal` — ils implémentent déjà ce pattern.
Ne jamais poser l'icône seule dans un div sans ce mécanisme si l'animation est souhaitée.
