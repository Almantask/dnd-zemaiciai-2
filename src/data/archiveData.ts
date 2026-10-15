import { ArchiveMap, BookSpread, TrophyItem } from '../types';

/**
 * Metraščių knygos puslapiai (Prologas + sesijos).
 * isBookmarked: true nurodo, ties kuriuo puslapiu knyga atverčiama iš karto (paskutinė sesija).
 */
export const ARCHIVE_BOOK_SPREADS: BookSpread[] = [
  {
    id: 'prologue',
    sessionNumber: 0,
    tabLabel: 'Prologas',
    title: 'Prologas: Žemaitijos Miestelio Pradžia',
    dateLabel: 'XV a. pradžia — Prieš pirmąją kelionę',
    isBookmarked: false,
    storyParagraphs: [
      '[Prologo šablonas] Čia prasideda mūsų draugų kuopos metraštis. Aplink dunkso senosios Žemaitijos girios, pelkėse klaidžioja neramios dvasios, o pasienio keliuose kaukši ginkluoti raiteliai.',
      'Šiame puslapyje galite įrašyti savo kampanijos priešistorę: kaip herojai susitiko „Juodojo Lokio“ smuklėje, kokia priesaika ar bėda juos suvedė į vieną būrį.',
      'Redaguokite šį tekstą faile src/data/archiveData.ts — kiekvienas įrašas turi kairįjį istorijos puslapį ir dešinįjį iliustracijos puslapį.',
    ],
    illustrationTitle: 'Kuopos Susitikimas Miestelyje',
    illustrationCaption: 'Vieta prologo iliustracijai arba herojų portretams.',
    illustrationPlaceholderNote:
      'Įkelkite savo sesijos piešinį ar ekrano nuotrauką į public/images/ ir nurodykite kelią.',
  },
  {
    id: 'session-1',
    sessionNumber: 1,
    tabLabel: 'I Sesija',
    title: 'I Sesija: Pirmieji Žingsniai Už Miestelio Vartų',
    dateLabel: 'Sesija #1 — [Data]',
    isBookmarked: false,
    storyParagraphs: [
      '[I sesijos trumpas aprašymas — šablonas] Kuopa paliko šiltą smuklę ir leidosi į pirmąją užduotį. Kelyje netrūko nei keistų sutikimų, nei pirmųjų susirėmimų.',
      'Pagrindiniai sesijos įvykiai (užpildykite):',
      '• Su kuo kalbėjotės miestelyje prieš išvykdami;\n• Koks netikėtas sprendimas pakeitė planą;\n• Kas labiausiai pasižymėjo kovoje ar derybose.',
    ],
    illustrationTitle: 'I Sesijos Akimirka',
    illustrationCaption: 'Iliustracijos vieta pirmajai sesijai (pvz., pasala miško kelyje).',
    illustrationPlaceholderNote: 'Iliustracijos šablonas (Sesija #1)',
  },
  {
    id: 'session-2',
    sessionNumber: 2,
    tabLabel: 'II Sesija (Žymeklis)',
    title: 'II Sesija: Paskutinės Sesijos Įrašas',
    dateLabel: 'Sesija #2 (Paskutinė sesija — pažymėta juostele)',
    isBookmarked: true,
    storyParagraphs: [
      '[Paskutinės sesijos šablonas — čia guli raudona knygos juostelė!] Atvertus knygą, ji iš karto atsiverčia ties šiuo puslapiu, kad žaidėjai prisimintų, kur sustojo praėjusį kartą.',
      'Čia galite trumpai surašyti praėjusios sesijos santrauką: ką atradote, kokią paslaptį įminėte ir kur ketinate traukti toliau.',
      'Kai sužaisite naują sesiją, tiesiog pridėkite naują objektą į ARCHIVE_BOOK_SPREADS sąrašą ir perkelkite isBookmarked: true žymę.',
    ],
    illustrationTitle: 'Paskutinės Sesijos Iliustracija',
    illustrationCaption: 'Vieta praėjusios sesijos pagrindinės scenos iliustracijai.',
    illustrationPlaceholderNote: 'Iliustracijos šablonas (Paskutinė sesija)',
  },
];

/**
 * Žemėlapiai Archyvo kampe. Pradedama su 1 žemėlapiu, bet paruošta plėtrai (pirmyn / atgal).
 */
export const ARCHIVE_MAPS: ArchiveMap[] = [
  {
    id: 'map-1',
    mapNumber: 1,
    title: 'I Žemėlapis: Žemaitijos Паsienio Apylinkės',
    regionSubtitle: 'Pirmasis kuopos turimas žemėlapis su žinomomis vietovėmis',
    acquiredNote: 'Gautas I-ojoje iteracijoje (pradinis žinomas regionas)',
    markers: [
      {
        id: 'loc-town',
        name: 'Mūsų Miestelis (Užeiga ir Archyvas)',
        type: 'Gyvenvietė',
        x: 48,
        y: 54,
        status: 'Atidaryta / Saugi vieta',
        description:
          '[Vietovės šablonas] Pagrindinė herojų bazė su „Juodojo Lokio“ smukle, uoloje iškaltu Archyvu ir amatininkų dirbtuvėmis.',
      },
      {
        id: 'loc-woods',
        name: 'Šventoji Ąžuolų Giria',
        type: 'Miškas',
        x: 28,
        y: 34,
        status: 'Žinoma vietovė',
        description:
          '[Vietovės šablonas] Sena giria šiaurės vakaruose. Čia galite įrašyti, ką žaidėjai jau sužinojo apie šią vietą.',
      },
      {
        id: 'loc-swamp',
        name: 'Rūko Pelkynai',
        type: 'Pelkė',
        x: 72,
        y: 66,
        status: 'Gandai / Neištyrinėta',
        description:
          '[Vietovės šablonas] Klampynės pietryčiuose, apie kurias smuklėje pasakoja vietiniai medžiotojai.',
      },
      {
        id: 'loc-hillfort',
        name: 'Senasis Piliakalnis',
        type: 'Griuvėsiai / Piliakalnis',
        x: 66,
        y: 28,
        status: 'Pažymėta žemėlapyje',
        description:
          '[Vietovės šablonas] Apžėlęs piliakalnis prie upės vingio. Puiki vieta būsimos sesijos nuotykiui.',
      },
    ],
  },
];

/**
 * Kitas kambarys (Trofėjų ir keistų radinių muziejus / sesijų prisiminimų albumas).
 */
export const ARCHIVE_TROPHIES: TrophyItem[] = [
  {
    id: 'trophy-1',
    name: 'Stumbro Rago Taurė',
    sessionLabel: 'I Sesijos prisiminimas',
    category: 'Trofėjus',
    shortNote: 'Apkaustyta žalvariu taurė, parnešta iš pirmojo žygio.',
    fullStoryPlaceholder:
      '[Trofėjaus istorijos šablonas] Čia įrašykite, kaip kuopa gavo šį daiktą, kas jį laimėjo ar išgelbėjo ir kodėl jis atsidūrė muziejaus lentynoje.',
    quirkNote: 'Jei pridedi prie ausies, lyg ir girdisi tolimas smuklės šurmulys.',
    shelfSlot: 'Viršutinė lentyna, kairė',
  },
  {
    id: 'trophy-2',
    name: 'Įskilęs Skydo Umbonas',
    sessionLabel: 'I Sesijos prisiminimas',
    category: 'Kovos relikvija',
    shortNote: 'Geležinis skydo vidurys su giliu kirvio įkirtimu.',
    fullStoryPlaceholder:
      '[Trofėjaus istorijos šablonas] Šis skydo fragmentas primena kritinį smūgį, kurį pavyko atremti pirmajame mūšyje.',
    quirkNote: 'Vis dar kvepia dūmais ir pušų sakais.',
    shelfSlot: 'Centrinis stendas',
  },
  {
    id: 'trophy-3',
    name: 'Keistas Stiklainis su Švytinčia Samana',
    sessionLabel: 'II Sesijos radinys',
    category: 'Keistas daiktas',
    shortNote: 'Užantspauduotas indas, naktimis skleidžiantis blankią žalsvą šviesą.',
    fullStoryPlaceholder:
      '[Trofėjaus istorijos šablonas] Vienas iš tų keistų daiktų, kuriuos žaidėjai nusprendė pasiimti su savimi, nors niekas nežinojo kam jis skirtas.',
    quirkNote: 'Švyti ryškiau, kai kas nors kambaryje pameluoja.',
    shelfSlot: 'Viršutinė lentyna, dešinė',
  },
  {
    id: 'trophy-4',
    name: 'Sulankstyta Vario Moneta',
    sessionLabel: 'II Sesijos prisiminimas',
    category: 'Sesijos kuriozas',
    shortNote: 'Perkasta dantimis ar strėlės peršauta sena moneta.',
    fullStoryPlaceholder:
      '[Trofėjaus istorijos šablonas] Vieta juokingam ar netikėtam sesijos įvykiui aprašyti (kaip asmeniniame grupės nuotykių albume).',
    quirkNote: 'Laimę nešantis niekutis.',
    shelfSlot: 'Apatinė vitrina',
  },
];
