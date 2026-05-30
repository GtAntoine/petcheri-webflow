/**
 * Blog posts mock data — scraped from petcheri.com/blog
 * Replace with DB queries once connected to petcheri-web-next MySQL.
 *
 * DB model: see petcheri-web-next/database/models/BlogPosts.ts
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO
  category: string;
  tags: string[];
  coverImage: string;
  readTime: number; // minutes
  content: string; // HTML
  featured?: boolean;
  /** IDs of linked Promotions (0–3). Maps to BlogPostsHasPromotions in DB. */
  promotionIds?: string[];
}

const CDN = "https://cdn.prod.website-files.com/66672b13a367b9ed2f2972b4";

export const BLOG_POSTS: BlogPost[] = [
  // ─── Série Voyage ────────────────────────────────────────────────────────────
  {
    id: "voyager-chien-preparer-depart",
    slug: "voyager-avec-son-chien-tout-preparer-avant-le-depart",
    title: "Voyager avec son chien : tout préparer avant le départ",
    excerpt: "Passeport européen, vaccins, visite vétérinaire, gestion du mal des transports… tout ce qu'il faut cocher avant de partir avec votre chien.",
    author: "Agathe",
    date: "2025-10-15",
    category: "Voyage",
    tags: ["chien", "voyage", "préparation", "vétérinaire"],
    coverImage: `${CDN}/69f1e7206cf0fb9b4423947d_Couverture%20Articles%20de%20Blog-5.png`,
    readTime: 6,
    featured: true,
    promotionIds: ["lassie", "kozoo"],
    content: `<p class="lead">"L'idée a germé un soir en regardant votre chien s'endormir au pied du canapé. Et si cette fois, il venait avec vous ?"</p>

<p>Partir en voyage avec son chien, c'est une belle aventure — à condition de bien préparer le départ. Voici tout ce qu'il faut anticiper.</p>

<h2>Évaluer si votre chien est prêt pour le voyage</h2>
<p>Avant même de sortir la valise, posez-vous les bonnes questions : votre chien tolère-t-il bien les trajets en voiture ? Comment réagit-il face aux inconnus et aux bruits inhabituels ? Est-il à l'aise pour dormir hors de chez lui ?</p>
<p>Un chien anxieux, mal socialisé ou souffrant d'anxiété de séparation risque de vivre le voyage comme une source de stress plutôt que de plaisir. Dans ce cas, une bonne garde à domicile peut s'avérer une solution plus respectueuse.</p>

<h2>La visite vétérinaire pré-départ</h2>
<p>Une consultation chez votre vétérinaire avant le départ est indispensable. Elle permet de s'assurer que votre chien est en bonne santé pour voyager et d'aborder ses besoins spécifiques :</p>
<ul>
  <li>Vaccinations à jour (rage, leptospirose, parvovirose, toux du chenil)</li>
  <li>Passeport européen pour les voyages en UE</li>
  <li>Puce électronique obligatoire en France pour les chiens nés après 2011</li>
  <li>Prévention antiparasitaire adaptée à la destination</li>
</ul>

<h2>La prévention antiparasitaire selon la destination</h2>
<p>Les risques parasitaires varient considérablement selon les régions. En Europe du Sud, votre chien sera exposé à des tiques, puces, moustiques et à la leishmaniose, absents dans les zones tempérées. Consultez votre vétérinaire 3 à 4 semaines avant le départ pour mettre en place le traitement adapté.</p>

<h2>Gérer le mal des transports</h2>
<p>Certains chiens souffrent du mal des transports. Votre vétérinaire pourra vous prescrire des médicaments adaptés ou vous conseiller des compléments naturels à base de gingembre. L'habituation progressive à la voiture, bien en amont du voyage, reste la meilleure prévention.</p>

<h2>Documents obligatoires</h2>
<p><strong>En France et en Europe :</strong></p>
<ul>
  <li>Puce électronique</li>
  <li>Passeport européen pour animaux</li>
  <li>Vaccination antirabique à jour</li>
</ul>
<p><strong>Hors UE :</strong> les exigences varient selon les pays — certains demandent des tests sérologiques dont les délais peuvent atteindre plusieurs mois. Renseignez-vous auprès de l'ambassade ou de votre vétérinaire 3 à 6 mois avant le départ.</p>`,
  },
  {
    id: "voyager-chien-transport",
    slug: "voyager-avec-son-chien-choisir-le-bon-mode-de-transport",
    title: "Voyager avec son chien : choisir le bon mode de transport",
    excerpt: "Voiture, avion ou train ? Règles, conseils pratiques et points de vigilance pour chaque moyen de transport avec votre compagnon.",
    author: "Agathe",
    date: "2025-10-18",
    category: "Voyage",
    tags: ["chien", "voyage", "voiture", "avion", "train"],
    coverImage: `${CDN}/69f1ed14d844a36509b43bc6_Couverture%20Articles%20de%20Blog-7.png`,
    readTime: 5,
    promotionIds: ["lassie", "charly-et-moi", "kozoo"],
    content: `<p class="lead">La valise est prête, le passeport de votre chien est en ordre. Reste la grande question : comment voyager ensemble ?</p>

<h2>🚗 La voiture</h2>
<p>La voiture reste le mode de transport le plus confortable pour la plupart des chiens. En France, le transport d'un animal doit être sécurisé : cage de transport, grille de séparation ou harnais homologué sont obligatoires.</p>
<p>Prévoyez une pause toutes les deux heures pour que votre chien puisse se dégourdir les pattes, s'hydrater et faire ses besoins. Donnez-lui un repas léger deux à trois heures avant le départ pour limiter les risques de mal des transports.</p>
<p><strong>À ne jamais faire :</strong> laisser votre chien seul dans la voiture en plein soleil — même 10 minutes peuvent être fatales.</p>

<h2>✈️ L'avion</h2>
<p>Les petits chiens (généralement moins de 6 à 8 kg) peuvent voyager en cabine dans un sac de transport homologué. Les chiens plus grands voyagent en soute.</p>
<p>La soute est une expérience stressante pour la plupart des chiens : obscurité, bruits, variations de température. Les races brachycéphales (bouledogues, carlins…) et les chiens anxieux nécessitent une attention particulière. Les sédatifs sont déconseillés sans avis vétérinaire.</p>

<h2>🚞 Le train</h2>
<p>La SNCF accepte les chiens de moins de 6 kg dans un sac fermé (forfait fixe) ou les chiens plus grands avec laisse et muselière au tarif demi-place passager. Les règles varient selon les compagnies ferroviaires européennes.</p>`,
  },
  {
    id: "voyager-chien-sur-place",
    slug: "voyager-avec-son-chien-bien-gerer-le-sejour-sur-place",
    title: "Voyager avec son chien : bien gérer le séjour sur place et les alternatives",
    excerpt: "Acclimatation, réglementations locales, risques spécifiques à la destination et solutions quand le voyage n'est pas la meilleure option.",
    author: "Agathe",
    date: "2025-10-22",
    category: "Voyage",
    tags: ["chien", "voyage", "séjour", "garde"],
    coverImage: `${CDN}/69f1f247cab7cc1704a7d97f_Couverture%20Articles%20de%20Blog-8.png`,
    readTime: 5,
    promotionIds: ["lassie", "zamz"],
    content: `<p class="lead">Le voyage de votre chien commence vraiment à l'arrivée. Comment lui permettre de profiter du séjour autant que vous ?</p>

<h2>Laisser le temps à l'acclimatation</h2>
<p>À l'arrivée, donnez à votre chien le temps d'explorer progressivement son nouvel environnement. Une balade tranquille dès l'arrivée, avec ses gamelles et son couchage familiers, crée une stabilité rassurante dans l'inconnu.</p>

<h2>Respecter les réglementations locales</h2>
<p>Laisse obligatoire, zones interdites aux chiens, ramassage des déjections : les règles varient d'un endroit à l'autre. Renseignez-vous avant d'arriver et respectez scrupuleusement la réglementation locale.</p>

<h2>Identifier les risques spécifiques à la destination</h2>
<p>Chaque destination présente ses propres dangers : chaleur extrême, végétation toxique, faune locale, plages polluées, insectes vecteurs de maladies. Repérez à l'avance le cabinet vétérinaire le plus proche.</p>

<h2>Gérer la chaleur et l'hydratation</h2>
<p>Les chiens régulent leur température principalement par le halètement — bien moins efficace que la transpiration humaine. En été, évitez les sorties entre 11h et 16h, assurez un accès permanent à l'eau fraîche et à l'ombre. Un coup de chaleur peut survenir très rapidement.</p>

<h2>Quand le voyage n'est pas la meilleure option</h2>
<p>Parfois, la décision la plus bienveillante est d'organiser une garde de qualité plutôt d'exposer votre chien à un voyage stressant. Chez Petcheri, nous établissons un profil détaillé de plus de 35 critères pour chaque chien afin de lui trouver la garde idéale.</p>`,
  },

  // ─── Santé & Bien-être ────────────────────────────────────────────────────────
  {
    id: "proteger-chien-chaleurs",
    slug: "proteger-son-chien-des-fortes-chaleurs",
    title: "Protéger son chien des fortes chaleurs",
    excerpt: "Coup de chaleur, brûlures de pattes, coups de soleil : tout ce que vous devez savoir pour garder votre chien en sécurité cet été.",
    author: "Elise",
    date: "2024-07-02",
    category: "Santé",
    tags: ["chien", "été", "chaleur", "santé"],
    coverImage: `${CDN}/68503a2c2cf5eac9cd067850_Sans%20titre%20(532%20x%20358%20px)-24.png`,
    readTime: 5,
    promotionIds: ["fur-love", "truffe-moustache", "zamz"],
    content: `<p class="lead">L'été rime avec sorties et aventures — mais aussi avec chaleur intense. Contrairement à nous, les chiens ne transpirent pas, ce qui les rend particulièrement vulnérables.</p>

<h2>🌡️ Les signes du coup de chaleur</h2>
<p>Les chiens n'ont pas de glandes sudoripares (sauf sous les coussinets). Ils régulent leur température uniquement par le halètement. Les signes d'alerte incluent :</p>
<ul>
  <li>Halètement rapide et bruyant</li>
  <li>Gencives ou truffe décolorées</li>
  <li>Fatigue extrême, tremblements ou vomissements</li>
  <li>Température corporelle supérieure à 40°C</li>
</ul>
<p>En cas de coup de chaleur : urgence vétérinaire immédiate. Mettez le chien à l'ombre, aérez et enveloppez-le dans des serviettes fraîches (pas glacées).</p>

<h2>🐾 Protéger les coussinets</h2>
<p>Le bitume peut atteindre 50 à 60°C en plein soleil. Testez la surface avec votre main : si c'est trop chaud pour vous, c'est trop chaud pour votre chien. Solutions :</p>
<ul>
  <li>Promenades tôt le matin ou en soirée</li>
  <li>Privilégier les surfaces herbeuses</li>
  <li>Chaussons de protection</li>
  <li>Baume protecteur non toxique</li>
</ul>

<h2>☀️ Prévenir les coups de soleil</h2>
<p>Les chiens peuvent attraper des coups de soleil sur les zones peu poilues : truffe, oreilles, ventre. Appliquez une crème solaire spéciale animal (SPF 30 minimum, sans zinc ni parabènes) et limitez l'exposition directe.</p>

<h2>💧 Hydratation et rafraîchissement</h2>
<p>Eau fraîche en permanence pendant les sorties (gamelle portable). Autres astuces : tapis de refroidissement, bandanas réfrigérants, ventilateur avec bol d'eau glacée à proximité. Pour la douche, utilisez de l'eau tiède — jamais froide — pour éviter le choc thermique.</p>

<h2>🚫 Les erreurs à ne pas commettre</h2>
<ul>
  <li>Ne jamais raser le poil (il isole aussi de la chaleur)</li>
  <li>Ne jamais laisser un chien dans une voiture</li>
  <li>Éviter l'eau froide directement sur un chien en surchauffe</li>
  <li>Ne pas forcer l'effort physique par forte chaleur</li>
</ul>`,
  },
  {
    id: "chat-frais-ete",
    slug: "5-conseils-pour-garder-votre-chat-au-frais-cet-ete",
    title: "5 conseils pour garder votre chat au frais cet été",
    excerpt: "Eau fraîche, espaces frais, brossage et jouets refroidissants : les 5 réflexes pour que votre chat passe un été confortable.",
    author: "Marion",
    date: "2024-07-15",
    category: "Santé",
    tags: ["chat", "été", "chaleur", "bien-être"],
    coverImage: `${CDN}/668eb8c42adef1ccfdb85103_Sans%20titre%20(532%20x%20358%20px)-9.png`,
    readTime: 4,
    promotionIds: ["fur-love", "zamz"],
    content: `<p class="lead">Les chats régulent moins bien leur température que les humains. Par forte chaleur, quelques ajustements simples peuvent changer leur confort du tout au tout.</p>

<h2>1. Toujours de l'eau fraîche à disposition</h2>
<p>Veillez à ce que votre chat dispose en permanence d'eau fraîche. Ajoutez des glaçons dans la gamelle ou posez plusieurs points d'eau dans le logement. Une fontaine à eau filtrée avec circulation encourage l'hydratation.</p>

<figure>
  <img src="https://cdn.prod.website-files.com/66672b13a367b9ed2f2972b4/66e9739ef3c6395568576167_668eb595aeda73101a67c539_carolien-van-oijen-E5HmmWbknoQ-unsplash1.jpeg" alt="Chat qui boit de l'eau fraîche" />
</figure>

<h2>2. Créer un espace frais</h2>
<p>Fermez volets et rideaux pour maintenir la fraîcheur intérieure. Installez un ventilateur sans que l'air soit dirigé directement sur votre chat. Tapis de refroidissement ou serviettes humides au sol offrent des alternatives appréciées.</p>

<figure>
  <img src="https://cdn.prod.website-files.com/66672b13a367b9ed2f2972b4/66e9739ef3c6395568576181_668eb595990fb40c9a9e09a5_anastacia-dvi-Kf-ZTjzNpLk-unsplash.jpeg" alt="Chat allongé au frais" />
</figure>

<h2>3. Brosser régulièrement</h2>
<p>Un brossage régulier élimine les poils morts qui retiennent la chaleur dans un pelage épais. Il prévient aussi la formation de nœuds inconfortables par temps chaud.</p>

<figure>
  <img src="https://cdn.prod.website-files.com/66672b13a367b9ed2f2972b4/66e9739ef3c63955685761a9_668eb596ddac075e00ede3e1_IMG_7056.jpeg" alt="Brossage d'un chat en été" />
</figure>

<h2>4. Des jouets rafraîchissants</h2>
<p>Proposez des jouets congelés dans du tissu humide ou des ballons d'eau. Un bol avec des jouets flottants permet un jeu interactif tout en gardant votre chat au frais.</p>

<figure>
  <img src="https://cdn.prod.website-files.com/66672b13a367b9ed2f2972b4/66e9739ef3c6395568576192_668eb595979e80ebee552b9e_madalyn-cox-kHu9yfpNm1w-unsplash.jpeg" alt="Chat qui joue avec de l'eau" />
</figure>

<h2>5. Éviter les heures les plus chaudes</h2>
<p>Limitez les sessions de jeu aux heures fraîches — tôt le matin ou en fin de soirée. Évitez de forcer l'activité en milieu de journée.</p>

<figure>
  <img src="https://cdn.prod.website-files.com/66672b13a367b9ed2f2972b4/66e9739ef3c6395568576175_668eb5954051d1bb0205279a_kate-stone-matheson-uy5t-CJuIK4-unsplash.jpeg" alt="Chat au repos par temps chaud" />
</figure>

<p><strong>Attention :</strong> halètement excessif, léthargie ou gencives pâles sont des signes d'urgence vétérinaire.</p>`,
  },
  {
    id: "poilus-froid",
    slug: "nos-poilus-ressentent-ils-le-froid",
    title: "Nos poilus ressentent-ils le froid ?",
    excerpt: "Manteaux, soins des coussinets et précautions par temps hivernal : comment protéger votre chien quand les températures chutent.",
    author: "Marion",
    date: "2023-12-01",
    category: "Santé",
    tags: ["chien", "hiver", "froid", "bien-être"],
    coverImage: `${CDN}/675b05a6b93454c2a1026311_Sans%20titre%20(532%20x%20358%20px)-11.png`,
    readTime: 4,
    promotionIds: ["truffe-moustache", "charly-et-moi"],
    content: `<p class="lead">Leur manteau naturel ne suffit pas toujours. En hiver, certains chiens ont besoin d'un coup de pouce pour rester au chaud.</p>

<h2>Comment savoir si votre chien a froid ?</h2>
<p>Votre chien vous le signale clairement : il rechigne à sortir, tremble, se recroqueville ou lève les pattes alternativement sur le sol gelé. Ces signaux méritent d'être pris au sérieux.</p>

<h2>Les chiens les plus vulnérables</h2>
<p>Chiots, seniors, petites races et chiens à poil court sont plus sensibles au froid. Pour eux, les accessoires de protection ne sont pas un luxe mais une nécessité.</p>

<h2>Les bons réflexes hivernal</h2>
<ul>
  <li><strong>Vêtements adaptés</strong> : un manteau qui laisse les pattes libres et couvre le dos et le ventre</li>
  <li><strong>Soins des coussinets</strong> : baume protecteur avant la sortie, rinçage à l'eau tiède au retour (sel de déneigement irritant)</li>
  <li><strong>Précautions neige</strong> : éviter les longues expositions, surveiller les boules de neige entre les doigts</li>
</ul>

<h2>Après la promenade</h2>
<p>Séchez votre chien soigneusement à son retour et évitez qu'il s'allonge sur un sol froid. Pour les propriétaires qui manquent de temps, des promeneurs professionnels peuvent assurer les sorties dans les meilleures conditions.</p>`,
  },

  // ─── Comportement ─────────────────────────────────────────────────────────────
  {
    id: "anxiete-separation-chien",
    slug: "anxiete-chez-le-chien",
    title: "Anxiété de séparation chez le chien : 9 signes qui ne trompent pas",
    excerpt: "Destructions, aboiements, malpropreté soudaine… Ces comportements cachent souvent une vraie souffrance. Notre comportementaliste explique les 9 signaux d'alerte.",
    author: "Inès",
    date: "2025-10-10",
    category: "Comportement",
    tags: ["chien", "anxiété", "comportement", "séparation"],
    coverImage: `${CDN}/69f0c110777617029bce6150_Couverture%20Articles%20de%20Blog.png`,
    readTime: 7,
    featured: true,
    promotionIds: ["zamz", "holistipet"],
    content: `<p class="lead">Les chiens sont des êtres profondément sociaux. Pour certains, chaque séparation devient une épreuve. Notre comportementaliste identifie les 9 signaux comportementaux de l'anxiété de séparation.</p>

<h2>Pourquoi l'anxiété de séparation passe inaperçue</h2>
<p>Destructions, aboiements excessifs, malpropreté soudaine… Ces comportements sont souvent interprétés comme de la "désobéissance" ou un "manque d'éducation". Il s'agit en réalité d'une vraie détresse émotionnelle, pas d'une volonté de nuire.</p>

<h2>Les 9 signes qui ne trompent pas</h2>

<h3>1. Destruction d'objets et de meubles</h3>
<p>Meubles rongés, portes griffées, chaussures mâchées… Le chien tente d'évacuer une tension incontrôlable. Les dégâts se concentrent souvent près des issues, là où il a regardé partir son maître.</p>

<h3>2. Aboiements ou gémissements excessifs</h3>
<p>Des vocalises prolongées signalent la tentative du chien de créer un contact et de combler un vide affectif.</p>

<h3>3. Malpropreté malgré l'apprentissage</h3>
<p>Un chien propre qui fait des accidents exclusivement pendant l'absence de son maître présente un stress qui perturbe la régulation physiologique.</p>

<h3>4. Léchage excessif ou tentatives d'évasion</h3>
<p>Léchage compulsif des pattes, mordillage de la queue, automutilation et tentatives frénétiques de s'échapper signalent un dépassement du seuil de stress.</p>

<h3>5. Signes de stress avant le départ</h3>
<p>Tremblements, hypersalivation, agitation et allers-retours compulsifs dès que vous enfilez vos chaussures ou attrapez vos clés : l'anxiété commence avant même votre départ.</p>

<h3>6. Apathie et perte d'appétit</h3>
<p>Certains chiens anxieux se retirent plutôt qu'ils n'explosent : faible énergie, désintérêt pour les jouets, isolement.</p>

<h3>7. Retrouvailles incontrôlables</h3>
<p>Une excitation intense et prolongée, des sauts, une agitation incontrôlable à votre retour reflètent la détresse vécue pendant votre absence.</p>

<h3>8. Refus de manger ou boire seul</h3>
<p>Le stress inhibe les signaux de faim. Même un bon mangeur peut refuser son repas lorsqu'il est seul.</p>

<h3>9. Ombre permanente</h3>
<p>Un chien qui refuse de vous quitter d'une pièce, même pour quelques secondes, développe une dépendance émotionnelle qui peut évoluer vers une anxiété de séparation marquée.</p>

<h2>Que faire ?</h2>
<p>Consultez d'abord votre vétérinaire pour écarter une cause médicale. Faites appel ensuite à un comportementaliste spécialisé en méthodes de renforcement positif — les techniques coercitives aggravent souvent le problème.</p>
<p>Les comportementalistes Petcheri évaluent la situation individuelle de chaque chien et proposent un accompagnement sur-mesure. L'anxiété de séparation est traitable avec les bons outils.</p>`,
  },
  {
    id: "idees-recues-petits-chiens",
    slug: "stop-aux-idees-recues-sur-les-petits-chiens",
    title: "Stop aux idées reçues sur les petits chiens !",
    excerpt: "Les petits chiens sont-ils vraiment plus agressifs ? La science du comportement canin répond à ce cliché tenace — et la réponse est plus nuancée que vous ne le pensez.",
    author: "Marion",
    date: "2025-08-20",
    category: "Comportement",
    tags: ["chien", "comportement", "petits chiens", "éducation"],
    coverImage: `${CDN}/697b3c43654f1b1ef4789681_Sans%20titre%20(532%20x%20358%20px)-27.png`,
    readTime: 8,
    promotionIds: ["holistipet", "zamz"],
    content: `<p class="lead">Les chihuahuas, teckels et pinschers nains sont souvent étiquetés "hargneux". Pourtant, la science du comportement canin raconte une histoire bien plus nuancée.</p>

<h2>Taille ≠ tempérament inné</h2>
<p>L'ANSES précise que "la race ne suffit pas pour prédire et prévenir le risque de morsure". Il n'existe pas de preuve qu'un chien mord plus uniquement parce qu'il appartient à une race ou à une catégorie de taille spécifique.</p>

<h2>Ce que disent vraiment les études</h2>
<p>Des études épidémiologiques montrent effectivement que certains petits chiens présentent une fréquence plus élevée de comportements réactifs (aboiements, grognements). Mais attention : ces comportements ne sont pas automatiquement des marqueurs d'agressivité. Ils reflètent souvent la peur, l'anxiété ou une réponse à un stimulus stressant.</p>

<h2>Le rôle déterminant de l'environnement</h2>
<p>Une étude publiée dans <em>Scientific Reports</em> souligne que les expériences vécues dans les premiers mois de vie ont un impact aussi fort que les facteurs biologiques sur l'agressivité et la peur chez les chiens.</p>
<p>Socialisation précoce, éducation cohérente, exercice adapté et enrichissement mental jouent un rôle clé — pour tous les chiens, petits ou grands.</p>

<h2>Un comportement appris, pas une fatalité</h2>
<p>La science comportementale distingue nature (génétique) et nurture (éducation, expériences). Chez les chiens, les comportements agressifs ne sont pas déterministes : une bonne socialisation peut prévenir la plupart des comportements indésirables.</p>
<p>Plutôt que de penser en termes de taille ou de race, il est plus pertinent de considérer chaque chien comme un individu unique, auquel s'appliquent les mêmes principes d'apprentissage et de respect.</p>`,
  },

  // ─── Entreprises ──────────────────────────────────────────────────────────────
  {
    id: "conciergerie-animaux-avantages-salaries",
    slug: "pourquoi-integrer-un-service-de-conciergerie-animaux-dans-vos-avantages-salaries",
    title: "Pourquoi intégrer un service de conciergerie animaux dans vos avantages salariés ?",
    excerpt: "71 % des propriétaires d'animaux souffrent de la séparation au travail. Une charge mentale invisible qui pèse sur la productivité — et qu'un avantage RH bien pensé peut résoudre.",
    author: "Anne",
    date: "2025-10-08",
    category: "Entreprises",
    tags: ["entreprises", "RH", "avantages salariés", "bien-être"],
    coverImage: `${CDN}/69f0e76509344bf68396fc66_Couverture%20Articles%20de%20Blog.jpg`,
    readTime: 6,
    content: `<p class="lead">Plus de 60 % des salariés français ont un animal de compagnie. 71 % d'entre eux souffrent de la séparation pendant les heures de travail — davantage que les 42 % qui disent manquer à leur conjoint.</p>

<h2>Une charge mentale animale méconnue</h2>
<p>La "charge mentale animale" est un facteur de stress encore peu reconnu dans les entreprises. Inquiétudes pour la garde, gestion des urgences vétérinaires, culpabilité… autant de pensées parasites qui nuisent à la concentration et à la productivité.</p>

<h2>Un enjeu de recrutement et de rétention</h2>
<p>70 % des moins de 30 ans accordent de l'importance aux politiques "pet-friendly" dans le choix de leur employeur. 72 % de ceux qui travaillent dans une entreprise accommodante ont refusé des offres comparables ailleurs. Intégrer Petcheri comme avantage salarié, c'est prendre soin de ses collaborateurs de façon concrète et mémorable.</p>

<h2>Ce que Petcheri apporte concrètement</h2>
<ul>
  <li>Matching individualisé pet-prestataire via un profil de 35 questions</li>
  <li>Visites à domicile, garde, promenades, toilettage, transport vétérinaire</li>
  <li>Auxiliaires vétérinaires formés pour les besoins spécifiques</li>
  <li>Tarifs négociés, communication interne clé en main, account manager dédié</li>
</ul>

<h2>Les chiffres parlent d'eux-mêmes</h2>
<p>96 % des propriétaires d'animaux déclarent une réduction du stress quand leur animal reçoit une garde professionnelle pendant le travail. Un investissement RH à fort retour sur engagement.</p>`,
  },
  {
    id: "pet-parenting-niveau-service",
    slug: "pet-parenting-et-niveau-de-service",
    title: "Pet parenting et niveau de service : quand le \"pet friendly\" ne suffit plus",
    excerpt: "Afficher \"pet friendly\" ne différencie plus personne. Les pet parents d'aujourd'hui attendent compétence, personnalisation et transparence — pas juste de la tolérance.",
    author: "Anne",
    date: "2025-09-05",
    category: "Entreprises",
    tags: ["pet-parenting", "service", "tendances", "marché"],
    coverImage: `${CDN}/69e0e4c5620a9e3bb600e373_Sans%20titre%20(532%20x%20358%20px)%20(1).jpg`,
    readTime: 5,
    content: `<p class="lead">Plus d'une famille française sur deux a un animal de compagnie. Les décisions importantes — où habiter, quel emploi accepter, où partir en vacances — intègrent désormais les besoins de l'animal. Bienvenue dans l'ère du pet parenting.</p>

<h2>La fin du "pet friendly" superficiel</h2>
<p>Beaucoup d'entreprises et de services ajoutent des accessoires animaliers en surface pendant que le personnel manque de formation sur le comportement animal et que les espaces s'avèrent inadaptés en pratique. Cette hypocrisie crée un écart de confiance.</p>

<h2>Les trois attentes fondamentales des pet parents</h2>
<ol>
  <li><strong>Expertise réelle :</strong> connaissance du comportement animal, formation certifiée, protocoles adaptés</li>
  <li><strong>Personnalisation :</strong> un service standard ne suffit plus — chaque animal est unique</li>
  <li><strong>Transparence :</strong> mises à jour régulières, photos, comptes-rendus en temps réel</li>
</ol>

<h2>La différenciation Petcheri</h2>
<p>Des professionnels certifiés, un suivi individualisé prenant en compte les particularités de chaque animal, et une communication continue tout au long de la prestation. Dans un marché en croissance, la qualité de service devient le facteur déterminant de la fidélité des pet parents.</p>`,
  },

  // ─── Guides ───────────────────────────────────────────────────────────────────
  {
    id: "garde-animaux-paris",
    slug: "garde-danimaux-a-paris-comment-choisir-le-bon-prestataire",
    title: "Garde d'animaux à Paris : comment choisir le bon prestataire ?",
    excerpt: "Pension, pet-sitting, visites à domicile, plateformes de mise en relation… comment s'y retrouver et choisir vraiment le bon professionnel pour votre animal à Paris ?",
    author: "Anne",
    date: "2025-09-20",
    category: "Guide",
    tags: ["garde", "Paris", "choisir", "prestataire"],
    coverImage: `${CDN}/69e885cdda1508c84dc200db_Sans%20titre%20(532%20x%20358%20px)-29.png`,
    readTime: 6,
    promotionIds: ["lassie", "kozoo"],
    content: `<p class="lead">Paris, 300 000 chiens, des centaines de prestataires de garde. Comment trouver celui qui prendra vraiment soin de votre animal ?</p>

<h2>Les différentes formules de garde</h2>
<h3>Les pensions traditionnelles</h3>
<p>Les structures collectives conviennent aux animaux très sociables, mais manquent souvent de personnalisation et sont difficiles d'accès en zone urbaine dense.</p>

<h3>Le pet-sitting chez le particulier</h3>
<p>L'atmosphère familiale est attrayante, mais la qualité est très variable. Formation, expérience, conditions d'accueil : difficile à évaluer sans une recherche approfondie.</p>

<h3>Les visites à domicile</h3>
<p>Idéales pour les chats et les animaux attachés à leur environnement. La fréquence des visites doit correspondre aux besoins réels de l'animal.</p>

<h3>Les plateformes de mise en relation</h3>
<p>Pratiques à première vue, mais sans garantie de qualité ni filet de sécurité.</p>

<h2>Les questions à poser avant de choisir</h2>
<ul>
  <li>Qui sera réellement en charge de mon animal, et quelles sont ses qualifications ?</li>
  <li>Les traitements vétérinaires et les régimes alimentaires spécifiques peuvent-ils être gérés ?</li>
  <li>La communication est-elle assurée avec mises à jour et photos régulières ?</li>
</ul>

<h2>L'approche Petcheri</h2>
<p>Un interlocuteur unique, un profil de 35 questions pour matcher votre animal au professionnel idéal, des auxiliaires vétérinaires pour les cas complexes et une communication en temps réel.</p>`,
  },
  {
    id: "animal-noel",
    slug: "un-animal-pour-noel-une-fausse-bonne-idee",
    title: "Un animal pour Noël ? Une fausse bonne idée",
    excerpt: "L'atmosphère de Noël et les réseaux sociaux font des ravages. Voici pourquoi adopter un animal sur un coup de cœur de fête peut coûter très cher — à lui et à vous.",
    author: "Romane",
    date: "2024-12-10",
    category: "Guide",
    tags: ["adoption", "Noël", "responsabilité", "guide"],
    coverImage: `${CDN}/694acc9b0339aeab175d6855_Sans%20titre%20(532%20x%20358%20px).jpg`,
    readTime: 4,
    promotionIds: ["biovetol", "truffe-moustache"],
    content: `<p class="lead">Chaque année, les refuges constatent un pic d'abandons au lendemain des fêtes. La cause : des adoptions impulsives de Noël, prises sans réflexion suffisante.</p>

<h2>Le piège de l'émotion festive</h2>
<p>L'atmosphère de Noël et l'influence des réseaux sociaux déclenchent des coups de cœur qui ignorent la réalité : adopter un animal, c'est s'engager pour 10 à 15 ans, avec des responsabilités financières et quotidiennes conséquentes.</p>

<h2>Les conséquences d'une adoption non préparée</h2>
<ul>
  <li>Refuges saturés après les fêtes</li>
  <li>Animaux stressés présentant des problèmes comportementaux</li>
  <li>Familles dépassées par des besoins qu'elles n'avaient pas anticipés</li>
</ul>

<h2>Ce qu'il faut faire avant d'adopter</h2>
<p>Prenez le temps de vous renseigner sur les besoins spécifiques de l'espèce et de la race, consultez des professionnels, et attendez que l'effervescence des fêtes soit passée avant de prendre votre décision.</p>

<h2>Une alternative : le kit d'adoption symbolique</h2>
<p>Offrir un "bon d'adoption" à ouvrir après Noël, une fois la décision mûrement réfléchie, est une bien meilleure idée. Petcheri soutient Ani'Meaux, association de sauvetage animal, pour tous ceux qui souhaitent s'investir autrement.</p>`,
  },
  {
    id: "expat-pet-guide-paris",
    slug: "the-expat-pet-guide-to-paris",
    title: "The Expat Pet Guide to Paris",
    excerpt: "Moving to Paris with your pet? Everything you need to know: microchipping, vet registration, pet-friendly parks, metro rules and the expat community.",
    author: "Mishty",
    date: "2024-08-05",
    category: "Guide",
    tags: ["expats", "Paris", "relocation", "guide"],
    coverImage: `${CDN}/68b712471b27571308c8fdda_Image%20blog.jpg`,
    readTime: 6,
    promotionIds: ["lassie", "kozoo"],
    content: `<p class="lead">Pet Cheri and Your Friend in Paris have teamed up to help expat families relocating to the French capital with their animal companions.</p>

<h2>Essential Admin Before You Arrive</h2>
<p>Every pet in France must be registered with the national identification database. Make sure your pet is microchipped and that all vaccinations are up to date, with documentation translated if necessary.</p>

<h2>Paris Pet Etiquette</h2>
<p>Over 300,000 dogs live in Paris, but behavioral standards are strictly enforced. Leashes and waste disposal bags are mandatory — fines apply for non-compliance. In most parks and public spaces, dogs must be kept on a leash.</p>

<h2>Best Pet-Friendly Spaces</h2>
<ul>
  <li>Bois de Vincennes — large off-leash areas</li>
  <li>Parc Georges Brassens — quiet green space</li>
  <li>Bois de Boulogne — forest walks</li>
  <li>Parc Martin Luther King — popular with dog owners</li>
</ul>
<p><em>Note: Jardin du Luxembourg and Tuileries do not allow dogs.</em></p>

<h2>Getting Around</h2>
<p>Small pets travel free in closed carriers (max dimensions apply). Larger dogs must be on a leash with a muzzle and require a child-fare ticket on the metro.</p>

<h2>Building Your Community</h2>
<p>Dog meetups, expat pet owner groups, and Petcheri's VIP Club are excellent ways to connect with like-minded pet parents during your relocation.</p>`,
  },
  {
    id: "10-indispensables-adopter-chat",
    slug: "10-indispensables-si-vous-adoptez-un-chat",
    title: "10 indispensables si vous adoptez un chat",
    excerpt: "Litière, alimentation, griffoir, transport, assurance… la checklist complète établie par notre comportementaliste féline pour bien accueillir votre nouveau compagnon.",
    author: "Marion",
    date: "2024-06-20",
    category: "Guide",
    tags: ["chat", "adoption", "guide", "équipement"],
    coverImage: `${CDN}/668e5e5c97a54187aad2fabe_Sans%20titre%20(532%20x%20358%20px)-7.png`,
    readTime: 5,
    promotionIds: ["homycat", "ziggy", "biovetol"],
    content: `<p class="lead">Adopter un chat, ça se prépare. Notre comportementaliste féline a dressé la liste des 10 indispensables pour bien accueillir votre nouveau compagnon.</p>

<h2>1. La litière — l'emplacement compte autant que le produit</h2>
<p>Placez-la dans un endroit calme, jamais à côté de la gamelle. Prévoyez une litière de plus que le nombre de chats. Évitez la litière silice, potentiellement toxique.</p>

<h2>2. Une alimentation de qualité</h2>
<p>Combinez croquettes et nourriture humide, plusieurs fois par jour — surtout pour les chatons. Les gamelles interactives ralentissent l'ingestion et stimulent mentalement.</p>

<h2>3. Plusieurs points d'eau</h2>
<p>Les chats boivent peu spontanément. Proposez de l'eau en plusieurs endroits, loin de la litière. Une fontaine filtrante encourage l'hydratation.</p>

<h2>4. Un arbre à chat et des espaces verticaux</h2>
<p>Les chats ont besoin de grimper et d'observer. Un arbre à chat bien placé près d'une fenêtre répond à cet instinct fondamental.</p>

<h2>5. Des griffoirs autorisés</h2>
<p>Griffoir horizontal et vertical permettent à votre chat d'entretenir ses griffes et de marquer son territoire. Mieux vaut lui en proposer qu'il n'use vos canapés.</p>

<h2>6. Des jouets variés et rotatifs</h2>
<p>Cannes à pêche, petites souris, jouets à plumes… Variez et alternez pour maintenir l'intérêt. Rangez les jouets entre deux sessions pour préserver la nouveauté.</p>

<h2>7. Un transport rigide pour le vétérinaire</h2>
<p>Un sac souple peut suffire au quotidien, mais pour les visites vétérinaires, un transport rigide est plus sécurisant et plus facile à manipuler.</p>

<h2>8. La sécurisation du logement</h2>
<p>Plantes toxiques, produits chimiques, espaces trop étroits : faites un tour de votre appartement avec les yeux d'un chat curieux avant son arrivée.</p>

<h2>9. Une assurance santé</h2>
<p>Une bonne assurance animale peut couvrir les frais vétérinaires imprévus, souvent élevés. Comparez les offres avant l'adoption.</p>

<h2>10. Du temps et de la patience</h2>
<p>L'acclimatation peut prendre plusieurs semaines. Laissez votre chat définir son propre rythme d'exploration et d'apprivoisement.</p>`,
  },

  // ─── Lifestyle & Produits ─────────────────────────────────────────────────────
  {
    id: "wishlist-chat-appartement",
    slug: "wishlist-dun-chat-dappartement",
    title: "Wishlist d'un chat d'appartement",
    excerpt: "Notre comportementaliste et Homycat, marque française de design félin, ont sélectionné 4 produits qui conjuguent instinct naturel du chat et esthétique soignée.",
    author: "Marion & Anne",
    date: "2025-05-14",
    category: "Lifestyle",
    tags: ["chat", "appartement", "design", "produits"],
    coverImage: `${CDN}/682454ca8d909036108c0673_Sans%20titre%20(532%20x%20358%20px)%20(1).png`,
    readTime: 4,
    promotionIds: ["homycat", "charly-et-moi"],
    content: `<p class="lead">Vivre en appartement n'empêche pas un chat d'être épanoui — à condition que son espace réponde à ses besoins instinctifs : grimper, observer, chasser, se gratter, se cacher et dormir.</p>

<h2>La sélection Petcheri × Homycat</h2>
<p>Homycat est une marque française qui conçoit des accessoires félins alliant respect de l'instinct du chat, design et qualité. Notre comportementaliste a sélectionné 4 produits coup de cœur.</p>

<h3>🗼 Le griffoir Tour Eiffel</h3>
<p>Un griffoir de caractère avec surfaces de griffage accessibles et structure en bois de peuplier. Les inserts en carton sont remplaçables — pour un produit qui dure.</p>

<h3>🛋️ La banquette hamac murale</h3>
<p>Un espace suspendu pour observer le monde d'en haut. Fixations magnétiques pour faciliter l'entretien, disponible en métal noir avec plusieurs coloris de coussin.</p>

<h3>🐦 Le jouet oiseau à l'herbe à chat</h3>
<p>Jouet fait main, rempli de cataire biologique pour stimuler l'instinct de chasse. Simple, efficace, irrésistible.</p>

<h3>🔤 Le Course Lettres</h3>
<p>Des griffoirs en forme de lettres personnalisables qui font office de structure d'escalade et de décoration murale.</p>

<h2>L'essentiel pour un chat d'appartement heureux</h2>
<p>Territoire vertical pour grimper et observer · Surfaces de griffage autorisées · Stimulation mentale quotidienne · Espaces de repos à l'abri du bruit.</p>`,
  },
  {
    id: "test-ziggy",
    slug: "on-a-teste-ziggy",
    title: "On a testé Ziggy (vous allez être surpris)",
    excerpt: "Ziggy, c'est la marque d'alimentation féline qui a convaincu une vétérinaire nutritionniste. On a testé pendant 4 semaines sur un chat de 11 ans. Verdict ?",
    author: "Anne",
    date: "2025-04-10",
    category: "Lifestyle",
    tags: ["chat", "alimentation", "test", "nutrition"],
    coverImage: `${CDN}/67f798ca67ce63aa9fad7c0d_Sans%20titre%20(532%20x%20358%20px)-20.png`,
    readTime: 5,
    promotionIds: ["ziggy"],
    content: `<p class="lead">Ziggy est une marque française d'alimentation féline développée avec le Dr Géraldine Blanchard, spécialiste en nutrition vétérinaire. On a testé sur Jascha, chat castré de 11 ans, pendant 4 semaines.</p>

<h2>Le concept</h2>
<p>Ziggy part d'un constat : les chats sont des hypercarnivores, et la plupart des aliments ultra-transformés ne correspondent pas à leurs besoins nutritionnels réels. La marque formule ses produits avec plus de 60 % de viande — muscles et abats (cœur, foie), pas de viande séparée mécaniquement ni de sous-produits d'abattoir.</p>

<h2>La composition en chiffres</h2>
<ul>
  <li>Pâtées : maximum 2 % de glucides, zéro céréale ni légumineuse</li>
  <li>Croquettes : moins de 24 % de glucides</li>
  <li>Acides gras : huile de colza pour l'équilibre oméga, huile de saumon pour la santé cardiovasculaire</li>
  <li>95 % des viandes et poissons sourced en France</li>
</ul>

<h2>Résultats après 4 semaines (Jascha, 11 ans)</h2>
<ul>
  <li>Digestion améliorée</li>
  <li>Meilleure vivacité en journée</li>
  <li>Pelage plus brillant (avec Omega Boost)</li>
  <li>Les pâtées conservent leur couleur 2 jours au réfrigérateur — pas d'oxydation</li>
</ul>

<p>Code promo : <strong>PETCHERIMIAOU</strong> pour 12 % de réduction sur le site Ziggy.</p>`,
  },

  // ─── Santé ────────────────────────────────────────────────────────────────────
  {
    id: "allo-bobo",
    slug: "allo-bobo",
    title: "Allô bobo ?",
    excerpt: "Visites vétérinaires à domicile, consultations en ligne, application médicale… le guide complet des nouvelles options pour soigner votre animal sans stress.",
    author: "Anne",
    date: "2025-04-03",
    category: "Santé",
    tags: ["santé", "vétérinaire", "téléconsultation", "services"],
    coverImage: `${CDN}/67f3d717d165bd498da73e63_Sans%20titre%20(532%20x%20358%20px)-19.png`,
    readTime: 5,
    promotionIds: ["lassie", "kozoo", "truffe-moustache"],
    content: `<p class="lead">Votre chien se gratte depuis ce matin. Est-ce urgent ? Faut-il appeler le vétérinaire ? Aller aux urgences ? Attendre ? Le guide des bonnes options selon la situation.</p>

<h2>La visite vétérinaire à domicile</h2>
<p>Votre animal reste dans son environnement habituel, ce qui permet au vétérinaire d'observer ses comportements naturels. Particulièrement indiqué pour les animaux anxieux, les chats qui détestent le transport ou les animaux âgés à mobilité réduite.</p>

<h2>Les consultations en ligne</h2>
<p>Plusieurs options selon le niveau d'urgence :</p>
<ul>
  <li><strong>Messagerie instantanée</strong> avec un vétérinaire — idéal pour les questions comportementales ou nutritionnelles (heures ouvrées)</li>
  <li><strong>Consultation téléphonique d'urgence</strong> 24h/24 — pour évaluer la gravité d'une situation (environ 15 €)</li>
  <li><strong>Consultation vidéo</strong> avec ordonnance possible — pour un premier diagnostic à distance (environ 39 €)</li>
</ul>

<h2>Dr Milou : l'application qui centralise tout</h2>
<p>Carnet de santé numérique, historique des vaccins, prise de rendez-vous : Dr Milou centralise le suivi médical de votre animal dans une interface simple.</p>

<h2>Comment choisir ?</h2>
<p>Question comportementale → messagerie · Inquiétude non urgente → consultation vidéo · Urgence potentielle → téléphone 24h/24 · Visite nécessaire → domicile ou cabinet selon l'anxiété de votre animal.</p>`,
  },
  {
    id: "repas-fetes-animaux",
    slug: "nos-animaux-ont-ils-droit-aux-repas-de-fetes",
    title: "Nos animaux ont-ils droit aux repas de fêtes ?",
    excerpt: "Foie gras, saumon fumé, chocolat, raisins… ce que vous pouvez partager avec votre animal et ce qui peut l'envoyer en urgence vétérinaire. Le guide de Noël.",
    author: "Nolwenn",
    date: "2023-12-15",
    category: "Santé",
    tags: ["nutrition", "Noël", "alimentation", "toxique"],
    coverImage: `${CDN}/67604e8a4499ee82edd15c22_Sans%20titre%20(532%20x%20358%20px)-12.png`,
    readTime: 5,
    promotionIds: ["canigourmand", "elmut", "ziggy"],
    content: `<p class="lead">Les fêtes mettent les yeux de vos animaux au niveau de la table de réveillon. Que peut-on partager sans risque ? La réponse tient en deux colonnes : ce qui est bon et ce qui est toxique.</p>

<h2>✅ Ce qu'on peut partager (avec modération)</h2>
<ul>
  <li><strong>Dinde ou poulet</strong> — sans peau ni assaisonnement</li>
  <li><strong>Haricots verts cuits</strong> — une bonne source de fibres</li>
  <li><strong>Un peu de fromage</strong> — si votre animal le tolère bien</li>
</ul>
<p>Vérifiez toujours l'absence d'allergies connues avant d'introduire un nouvel aliment.</p>

<h2>🚫 Ce qui est dangereux ou toxique</h2>
<ul>
  <li><strong>Foie gras</strong> — trop gras, risque de pancréatite</li>
  <li><strong>Saumon fumé</strong> — teneur en sel trop élevée</li>
  <li><strong>Os cuits</strong> — se fragmentent et peuvent perforer l'intestin</li>
  <li><strong>Châtaignes</strong> — peuvent provoquer des occlusions intestinales</li>
  <li><strong>Raisins et fruits secs</strong> — insuffisance rénale aiguë chez le chien</li>
  <li><strong>Chocolat</strong> — la théobromine est un vrai POISON pour les animaux</li>
  <li><strong>Oignons, ail, poireaux</strong> — anémie hémolytique</li>
  <li><strong>Alcool</strong> — extrêmement dangereux même en petite quantité</li>
</ul>

<h2>En cas d'ingestion accidentelle</h2>
<p>Contactez immédiatement le centre antipoison vétérinaire (France : 04 78 87 10 40) ou votre vétérinaire d'astreinte. N'induisez jamais le vomissement sans avis professionnel.</p>`,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES = [
  "Tous",
  "Santé",
  "Comportement",
  "Voyage",
  "Guide",
  "Entreprises",
  "Lifestyle",
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "Tous") return BLOG_POSTS;
  return BLOG_POSTS.filter((p) => p.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.featured);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter(
    (p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, limit);
}
