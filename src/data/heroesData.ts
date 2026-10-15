import { TavernHero } from '../types';

export const TAVERN_HEROES: TavernHero[] = [
  {
    id: 'ranger',
    name: 'Šaulys (Ranger)',
    classTitle: 'Girių pėdsekys ir lankininkas',
    dndClass: 'Ranger',
    specialty: 'Pozicionavimas, žvalgyba, nuotolinė kova ir kaip išnaudoti aplinką',
    greeting:
      '„Sėskis tyliau, nebaidyk sėkmės. Girioje ir kovoje laimi ne tas, kuris garsiausiai šaukia, o tas, kuris pirmas užima aukštumą. Ko nori paklausti?“',
    hotspot: {
      x: 56,
      y: 41,
      width: 9,
      height: 22,
    },
    topics: [
      {
        id: 'ranger-positioning',
        title: 'Pozicionavimas ir priedangos (Positioning & Cover)',
        category: 'Pozicionavimas',
        summary: 'Kaip išnaudoti medžius, stalus, akmenis ir aukštumas D&D kovoje.',
        placeholderNote: '[Šablonas — čia galite įrašyti savo grupės pavyzdžius]',
        tips: [
          'Pusinė priedanga (Half Cover) prideda +2 prie AC ir Dexterity gelbėjimosi metimų, o trijų ketvirčių priedanga (Three-Quarters Cover) — net +5.',
          'Niekada nestovėk atviroje vietoje po šūvio: iššauk iš už kampo ar medžio ir likusiu judėjimu (Movement) vėl pasislėpk.',
          'Stebėk siauras vietas (tarpdurį, tiltą) — priversk priešus eiti po vieną link mūsų kario.',
        ],
      },
      {
        id: 'ranger-ranged',
        title: 'Šaudymas ir atstumo valdymas',
        category: 'Taktika',
        summary: 'Kada šaudyti iš toli, o kada keisti poziciją.',
        placeholderNote: '[Šablonas — papildykite savo namų taisyklėmis ar patarimais]',
        tips: [
          'Jei šalia tavęs (5 pėdų atstumu) stovi priešas, tolimosios atakos (Ranged Attacks) gauna Disadvantage — pirmiausia atsitrauk arba padėk priekinei linijai.',
          'Pažymėk pavojingiausią taikinį (pvz., su Hunter’s Mark) ir sutelk visos kuopos ugnį į vieną priešą vienu metu.',
        ],
      },
      {
        id: 'ranger-fun',
        title: 'Kaip žvalgybą ir šūvius padaryti smagesnius',
        category: 'Žaidimo džiaugsmas',
        summary: 'Idėjos gyvesniam vaidmens atlikimui (Roleplay) kovoje ir kelionėje.',
        placeholderNote: '[Šablonas — įrašykite savo mėgstamus aprašymus]',
        tips: [
          'Užuot sakęs „šaunu į gobliną“, apibūdink, į kur taikai ir kaip išnaudoji aplinką (pvz., „peršaunu virvę, laikančią šviestuvą“).',
          'Kelionės metu užduok DM klausimus apie pėdsakus, vėjo kryptį, paukščių elgesį — tai atveria užuominas apie pasalas.',
        ],
      },
    ],
  },
  {
    id: 'warrior',
    name: 'Karys (Warrior)',
    classTitle: 'Šarvuotas priekinės linijos gynėjas',
    dndClass: 'Fighter / Warrior',
    specialty: 'Artima kova (Melee), linijos laikymas ir komandos apsauga',
    greeting:
      '„Žiūrėk į mano skydą — kiekvienas įkirtimas ant jo reiškia smūgį, kuris nekliuvo mūsų burtininkui ar dvasininkui. Nori išmokti stovėti tvirtai?“',
    hotspot: {
      x: 63,
      y: 45,
      width: 11,
      height: 28,
    },
    topics: [
      {
        id: 'warrior-melee',
        title: 'Artima kova (Melee) ir erdvės kontrolė',
        category: 'Artima kova',
        summary: 'Kaip surišti priešus kovoje ir neleisti jiems praeiti pro šalį.',
        placeholderNote: '[Šablonas — čia galite įrašyti savo Kario patarimus]',
        tips: [
          'Tavo pagrindinis darbas — stovėti tarp pavojingiausio priešo ir silpnesnių grupės narių. Jei priešas bėga pro tave, naudok Proginę ataką (Opportunity Attack).',
          'Nepamiršk Grapple (sugriebimo) ir Shove (pastūmimo / pargriovimo): pargriautas (Prone) priešas suteikia Advantage visiems artimos kovos smūgiams!',
        ],
      },
      {
        id: 'warrior-positioning',
        title: 'Pozicionavimas priekinėje linijoje',
        category: 'Pozicionavimas',
        summary: 'Kur stovėti, kad netrukdytum saviškių burtams ir šūviams.',
        placeholderNote: '[Šablonas — papildykite savo grupės taktika]',
        tips: [
          'Stenkis neapsupti priešo taip, kad užblokuotum savo burtininko plotinius burtus (AoE, pvz., Burning Hands ar Shatter).',
          'Užimk tarpdurį arba siaurą koridorių ir, jei esi sunkiai sužeistas, naudok Dodge veiksmą — kol priešai nepataiko į tave, šaulys ir burtininkas juos pribaigs.',
        ],
      },
      {
        id: 'warrior-fun',
        title: 'Kaip artimą kovą padaryti įspūdingą',
        category: 'Žaidimo džiaugsmas',
        summary: 'Kaip išvengti nuobodaus „kertu su kardu — pataikiau / nepataikiau“.',
        placeholderNote: '[Šablonas — įrašykite savo kovos šūkius ir triukus]',
        tips: [
          'Apibūdink ginklo judesius, skydo smūgius, stalo apvertimą ar smėlio metimą į akis.',
          'Net kai nepataikai, sugalvok smagią priežastį: gal kirvis įsmigo į ąžuolinę siją, o gal priešas vos spėjo atšokti.',
        ],
      },
    ],
  },
  {
    id: 'mage',
    name: 'Burtininkas / Žiniuonis',
    classTitle: 'Ženklų, dainų ir burtų žinovas',
    dndClass: 'Spellcaster (Wizard / Bard)',
    specialty: 'Burtai (Spells), lauko kontrolė ir išradingas magijos panaudojimas',
    greeting:
      '„Burtas nėra vien ugnies kamuolys, drauge. Vienas gerai parinktas kerų žodis gali užbaigti mūšį dar jam neprasidėjus. Apie kokią magiją pasišnekėsime?“',
    hotspot: {
      x: 70,
      y: 39,
      width: 9,
      height: 18,
    },
    topics: [
      {
        id: 'mage-spells',
        title: 'Burtų valdymas ir Koncentracija (Spells & Concentration)',
        category: 'Burtai',
        summary: 'Kaip nešvaistyti burtų lizdų (Spell Slots) ir išlaikyti koncentraciją.',
        placeholderNote: '[Šablonas — čia galite pridėti savo burtų sąrašą ar pastabas]',
        tips: [
          'Vienu metu gali palaikyti tik VIENĄ Concentration burtą! Prieš leisdamas naują burtą, patikrink, ar jis nenutrauks jau veikiančio.',
          'Cantrips (neriboti smulkūs burtai) yra tavo duona kasdienė — taupyk stiprius Spell Slots kritinėms akimirkoms.',
          'Kontrolės burtai (Sleep, Web, Hold Person) dažnai nulemia kovą efektyviau nei paprasta žala.',
        ],
      },
      {
        id: 'mage-fun',
        title: 'Kaip burtus padaryti kūrybiškus ne kovos metu',
        category: 'Žaidimo džiaugsmas',
        summary: 'Iliuzijos, ženklai ir burtų pritaikymas pokalbiuose bei galvosūkiuose.',
        placeholderNote: '[Šablonas — įrašykite savo mėgstamus burtų derinius]',
        tips: [
          'Smulkūs burtai kaip Minor Illusion, Prestidigitation ar Thaumaturgy leidžia gąsdinti priešus, nukreipti sargybinių dėmesį ar sukurti įspūdingą atmosferą smuklėje.',
          'Apibūdink, kaip atrodo tavo burtai XV a. Žemaitijos pasaulyje — gal tai žalčio ženklas, gintaro dulkės ar sena sutartinė.',
        ],
      },
    ],
  },
  {
    id: 'cleric',
    name: 'Dvasininkas (Cleric)',
    classTitle: 'Tikėjimo, palaiminimų ir gydymo meistras',
    dndClass: 'Cleric',
    specialty: 'Gydymas (Healing), komandos stiprinimas (Buffs) ir išgyvenamumas',
    greeting:
      '„Žaizdas užgydyti lengva, bet tikras išminčius neleidžia draugui kristi. Sėskis, parodysiu šiameraštyje, kada gydyti, o kada smogti šventa ugnimi.“',
    hotspot: {
      x: 78,
      y: 41,
      width: 10,
      height: 24,
    },
    topics: [
      {
        id: 'cleric-healing',
        title: 'Gydymo menas (Healing) — kada gydyti, o kada atakuoti',
        category: 'Gydymas',
        summary: 'Kodėl D&D 5e gydymas kovoje veikia kitaip nei kompiuteriniuose žaidimuose.',
        placeholderNote: '[Šablonas — čia galite papildyti savo Dvasininko patarimais]',
        tips: [
          'Svarbiausias burtas — Healing Word (Bonus Action, iš toli): juo gali pakelti ant žemės parkritusį (0 HP) draugą ir vis tiek atlikti ataką ar Cantrip tą patį ėjimą!',
          'Nesistenk kovoje išgydyti kiekvieno įbrėžimo — priešų žala dažniausiai didesnė už gydymą. Geriau nukauk priešą arba palaikyk Bless (+1d4 atakoms ir gelbėjimosi metimams).',
        ],
      },
      {
        id: 'cleric-support',
        title: 'Komandos stiprinimas ir pozicija',
        category: 'Komandinis darbas',
        summary: 'Kaip išlaikyti ryšį su visa kuopa mūšio įkarštyje.',
        placeholderNote: '[Šablonas — papildykite savo komandos deriniais]',
        tips: [
          'Laikykis vidurinėje linijoje — pakankamai arti kario, kad pasiektum jį gydymo burtais, bet toliau nuo tiesioginių priešo smūgių.',
          'Po kovos nepamiršk Trumpojo poilsio (Short Rest) ir Hit Dice panaudojimo, kad sutaupytum burtų lizdus.',
        ],
      },
      {
        id: 'cleric-fun',
        title: 'Kaip gydymą ir maldas paversti įsimintina istorija',
        category: 'Žaidimo džiaugsmas',
        summary: 'Charakterio ir pasaulio spalvų įnešimas į dvasininko veiksmus.',
        placeholderNote: '[Šablonas — įrašykite savo maldas ar posakius]',
        tips: [
          'Kiekvieną kartą gydydamas ar laimindamas draugą, ištark trumpą palinkėjimą, priesaką ar draugišką pašiepimą.',
          'Dvasininkas nėra tik „gydymo baterija“ — jis turi tvirtus įsitikinimus, moralinius klausimus ir didelę įtaką bendraujant su miestelio žmonėmis.',
        ],
      },
    ],
  },
];
