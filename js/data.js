/*
 * Maison Éclat — contenu du site. Modifiez ce fichier pour adapter le modèle.
 */
window.SITE = {
  nom: 'Maison Éclat',
  email: 'bonjour@maison-eclat.fr',
  telephone: '+33 1 99 00 12 34',
  adresse: '12 rue de l’Exemple, 13100 Votre Ville',
  carte: { lat: 43.5283, lng: 5.4497 },          // position de l’institut sur la carte
  // Formspree / FormSubmit : collez l’URL ici pour recevoir les messages. Vide = ouverture de la messagerie.
  formEndpoint: '',

  categories: [
    {
      id: 'visage', titre: 'Soins du visage',
      intro: 'Chaque soin est un soin esthétique complet : nettoyage profond, gommage et peeling adaptés à votre peau, combinés si vous le souhaitez à un massage holistique. Un diagnostic personnalisé précède chaque séance.',
      soins: [
        { titre: 'Soin Relax', img: 'img/relax.webp', texte: 'Libère la peau de ses impuretés tout en offrant une détente totale grâce aux techniques de massage holistique. Une bulle de douceur pour relâcher les tensions.' },
        { titre: 'Soin Relax & Sculpte', img: 'img/sculpte.webp', texte: 'Des gestes manuels précis pour sculpter et remodeler le visage : teint lifté, raffermi et éclatant, selon les besoins de chacune.' },
        { titre: 'Relax, Sculpte & Lift buccal', img: 'img/lift.webp', texte: 'Le soin sculptant et liftant associé au massage buccal pour tonifier l’ovale du visage et détendre les muscles profonds jusqu’au cou et au décolleté.' },
        { titre: 'HydraSkin Boost', img: 'img/hydra.webp', texte: 'Nettoie, exfolie et hydrate la peau en profondeur grâce à un équipement de dernière génération et des actifs de qualité.' }
      ]
    },
    {
      id: 'massages-visage', titre: 'Massages du visage',
      intro: 'L’expertise du facialiste : connaître la peau, la morphologie et les muscles du visage pour travailler en profondeur, avec des techniques non invasives.',
      soins: [
        { titre: 'Rituel Hinoki', img: 'img/hinoki.webp', texte: 'Inspiré des traditions japonaises, ce rituel utilise les propriétés apaisantes du bois de Hinoki pour un modelage à la fois dynamique et relaxant.' },
        { titre: 'Massage inspiré du Kobido', img: 'img/kobido.webp', texte: 'Le massage facial traditionnel japonais : stimule la circulation, raffermit les muscles et révèle une peau éclatante.' },
        { titre: 'Drainage lymphatique visage', img: 'img/drainage.webp', texte: 'Élimine les toxines, décongestionne et stimule le système lymphatique. Idéal après une période de fatigue.' },
        { titre: 'Gua Sha', img: 'img/guasha.webp', texte: 'Un massage ancestral aux pierres naturelles — quartz, jade ou améthyste — pour apaiser, réparer et illuminer.' },
        { titre: 'Soin intra-buccal', img: 'img/buccal.webp', texte: 'Détend intensément les muscles autour et à l’intérieur de la bouche, où s’accumulent les tensions, et remodèle les contours du visage.' }
      ]
    },
    {
      id: 'corps', titre: 'Massages du corps',
      intro: 'Des techniques inspirées de traditions ancestrales du monde entier, pour vous accompagner à chaque étape de la vie et garder le lien avec votre corps.',
      soins: [
        { titre: 'Massage du ventre', img: 'img/moi.webp', texte: 'Inspiré du Chi Nei Tsang, ce massage des organes internes aide le « deuxième cerveau » à libérer ses blocages et à retrouver le calme.' },
        { titre: 'Rebozo', img: 'img/rebozo.webp', texte: 'Tradition mexicaine : un châle doux et enveloppant, des balancements bienveillants pour une relaxation profonde et réconfortante.' },
        { titre: 'Drainage lymphatique corps', img: 'img/drainage-corps.webp', texte: 'Draine les toxines, réduit la rétention d’eau et stimule la circulation pour une sensation de légèreté incomparable.' }
      ]
    },
    {
      id: 'signature', titre: 'Soins signature',
      intro: 'Nos soins exclusifs et sur mesure combinent plusieurs techniques holistiques, fruit de nombreuses années d’expérience dans l’univers du spa.',
      soins: [
        { titre: 'Signature Face Sculpting', img: 'img/signature.webp', texte: 'Massages avancés, lifting naturel et soins énergétiques pour raffermir, stimuler la circulation et réveiller l’éclat de la peau.' },
        { titre: 'Soin Harmony', img: 'img/harmony.webp', texte: 'Une expérience globale qui équilibre le corps, l’esprit et l’énergie vitale, pour retrouver vitalité et harmonie intérieure.' }
      ]
    },
    {
      id: 'ateliers', titre: 'Ateliers & formations',
      intro: 'Partagez le bien-être : ateliers conviviaux pour découvrir les gestes, et formations complètes pour les professionnelles.',
      soins: [
        { titre: 'Ateliers', img: 'img/atelier.webp', texte: 'Découvrez différentes techniques de massage lors d’ateliers interactifs, en solo, entre amies ou entre collègues.' },
        { titre: 'Formations', img: 'img/formation.webp', texte: 'Formation en massage holistique et énergétique : techniques avancées et approches complètes, en individuel ou en groupe.' }
      ]
    }
  ],

  temoignages: [
    { texte: 'Une vraie professionnelle, généreuse et à l’écoute. Je ressors à chaque fois apaisée.', nom: 'Amel B.' },
    { texte: 'Très empathique et aux petits soins, j’ai adoré ma séance. Ma peau n’a jamais été aussi lumineuse.', nom: 'Marion C.' },
    { texte: 'Séance au top, comme d’habitude. Le soin sculptant est devenu mon rendez-vous du mois.', nom: 'Nadia Z.' },
    { texte: 'Un professionnalisme irréprochable. Je valide, j’approuve et je recommande les yeux fermés.', nom: 'Laure F.' }
  ]
};
