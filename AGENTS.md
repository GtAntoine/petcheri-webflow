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
`checked`, `flame`, `footprints`, `graduation-cap`, `hand-heart`, `heart-handshake`, `heart`,
`home`, `magnifier`, `message-square`, `party-popper`, `paw-print`, `scissors`, `search`,
`send`, `shield-check`, `sparkles`, `trophy`, `truck`, `unordered-list`, `users`

Pour les icônes animées au hover de la carte entière, utiliser :
- `AnimatedCard` — layout vertical (icône + `children` en colonne), prop `iconBg` optionnelle pour cercle coloré
- `AnimatedCardHorizontal` — layout icône-gauche / texte-droite, prop `iconBg` + `iconColor` + `iconStrokeWidth`
- `GuaranteesSection` — section "Nos garanties" prête à l'emploi (4 cartes `AnimatedCard` en grille)

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
  <Icon ref={iconRef} size={20} color="var(--color-rouge)" />
  {/* contenu */}
</div>
```

Utiliser `AnimatedCard` ou `AnimatedCardHorizontal` — ils implémentent déjà ce pattern.
Ne jamais poser l'icône seule dans un div sans ce mécanisme si l'animation est souhaitée.
