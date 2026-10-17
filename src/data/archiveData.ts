import { ArchiveEntity, ArchiveMap, BookSpread, TrophyItem } from '../types';

/**
 * Metraščių knygos puslapiai (Prologas + sesijos).
 * isBookmarked: true nurodo, ties kuriuo puslapiu knyga atverčiama iš karto (paskutinė sesija).
 *
 * Nuorodų sintaksė tekste:
 *   `{green:objekto-id|Paryškintas tekstas}` arba `{green:Paryškintas tekstas}`
 * Užvedus pele iššoka pirmi keli sakiniai iš to objekto puslapio, o paspaudus — atsidaro pats objekto puslapis.
 */
export const ARCHIVE_BOOK_SPREADS: BookSpread[] = [
  {
    id: 'prologue',
    sessionNumber: 0,
    tabLabel: 'Prologas',
    romanPlate: 'PR',
    title: 'Prologas: Žemaitijos Miestelio Pradžia',
    dateLabel: 'XV a. pradžia — Prieš pirmąją kelionę',
    isBookmarked: false,
    storyParagraphs: [
      'Ilga kelionė per miglotas kalvas ir senuosius {green:zemaitijos-pasienis|Žemaitijos Pasienio} miškus atvedė mūsų drąsius keleivius prie medinių miestelio vartų. Šįkart, kitaip nei ankstesnėse pakelės užeigose, ore tvyrojo keista nuojauta — tarsi pati žemė čia saugotų seniai užmirštą paslaptį.',
      'Netrukus supratome, kad artėjame prie kažko paslaptingo ir nekasdieniško: {green:juodojo-lokio-smukle|„Juodojo Lokio“ smuklėje} prie ąžuolinio stalo susėdo skirtingų likimų herojai. Aplink kvepėjo dūmais, midumi ir šlapiomis pušų šakomis, o senolių pasakojimai apie {green:sventoji-azuolu-giria|Šventąją Ąžuolų Girią} skambėjo vis garsiau.',
      'Už lango tamsa atrodė tiršta ir gili, o uoloje iškaltame {green:senoliu-archyvas|Senolių Archyve} mūsų laukė pirmasis neužrašytas metraščio lapas. Išklausę {green:butigeidis|smuklininko Butigeidžio} perspėjimus apie pasalų kelius ir pakėlę {green:stumbro-rago-taure|Stumbro Rago taurę} už bendrą priesaiką laikytis išvien, pradėjome mūsų kuopos kelią.',
    ],
    illustrationTitle: 'Kuopos Susitikimas Miestelyje',
    illustrationCaption: 'Vieta prologo iliustracijai arba herojų portretams.',
    illustrationPlaceholderNote:
      'Įkelkite savo sesijos piešinį į public/images/ ir nurodykite illustrationUrl faile src/data/archiveData.ts.',
    illustrationScene: 'tavern',
  },
  {
    id: 'session-1',
    sessionNumber: 1,
    tabLabel: 'I Sesija',
    romanPlate: 'I',
    title: 'I Sesija: Pirmieji Žingsniai Už Miestelio Vartų',
    dateLabel: 'Sesija #1 — Pirmasis žygis',
    isBookmarked: false,
    storyParagraphs: [
      'Palikę šiltą užeigos židinį, mūsų didvyriai patraukė vingiuotu taku link {green:sventoji-azuolu-giria|Šventosios Ąžuolų Girios}. Rytinė migla kilo nuo samanotų akmenų, o tarp šimtamečių kamienų pasigirdo tolimas šakų traškesys.',
      'Kuo giliau žengėme į tankmę, tuo keistesni ženklai pasitiko kuopą — ant senų stuobrių išraižyti {green:baltu-zenklai|baltų ženklai}, apleistos stovyklavietės pėdsakai ir netikėtas susitikimas su {green:senasis-piliakalnis|Senojo Piliakalnio} {green:piliakalnio-zvalgai|žvalgais}.',
      'Prie siauro brastos tilto tamsa tarp eglių sujudėjo lyg gyva būtybė. Atsargiai ištyrę pėdsakus ir laiku pastebėję pasalos ženklus, herojai atrėmė pasalą, kaip karo grobį parsigabeno {green:skydo-umbonas|įskilusį skydo umboną} bei {green:stumbro-rago-taure|Stumbro Rago taurę} ir atvėrė kelią link tolimųjų uolynų. Pirmoji kova patvirtino — kuopa pasirengusi didesniems išbandymams.',
    ],
    illustrationTitle: 'I Sesijos Akimirka Girioje',
    illustrationCaption: 'Iliustracijos vieta pirmajai sesijai (pasala ar radinys miško kelyje).',
    illustrationPlaceholderNote: 'Iliustracijos šablonas (Sesija #1)',
    illustrationScene: 'forest',
  },
  {
    id: 'session-2',
    sessionNumber: 2,
    tabLabel: 'II Sesija',
    romanPlate: 'XC',
    title: 'II Sesija: Paslaptingasis Plyšys Uoloje',
    dateLabel: 'Sesija #2 — Paskutinė sesija (Žymeklis)',
    isBookmarked: true,
    storyParagraphs: [
      'Ilga kelionė per urvus ir skardžius, besidriekiančius aplink {green:sidabro-zingsnio-ezeras|Sidabro Žingsnio Ežerą} bei {green:ruko-pelkynai|Rūko Pelkynus}, atvedė mūsų drąsius herojus prie dar vieno didelio, siauro {green:paslaptingasis-plysys|plyšio uolos sienoje}. Tačiau šį kartą plyšys atrodė visai kitaip nei ankstesnieji.',
      'Pradėjome suprasti, kad artėjame prie kažko paslaptingo ir magiško — ant olos sienų bei grindų pasirodė vis daugiau keistų augalų. Pelėsiai ir kerpės užleido vietą didžiulėms gėlėms, milžiniškiems grybams, uogomis apsipylusiems krūmams ir net {green:svytinti-samana|švytinčiai samanai}!',
      'Pats plyšys buvo toks pat neįprastas kaip ir jo aplinka. Atrodė, kad už jo kunkuliuoja gryna, tiršta ir gili tamsa — tačiau kokia erdvė slypėjo anapus, nė vienas iš mūsų negalėjo atspėti. Visi pastebėjome iš plyšio dvelkiantį skersvėjį, kuris kilo ir leidosi lyg kvėpavimas, o ant akmens radome {green:sulankstyta-moneta|sulankstytą vario monetą}.',
      'Kuopa paruošė deglus bei ginklus ir žengė tiesiai į paslaptingąją gelmę. Čia šios sesijos užrašai ir baigiasi — o nauji įrašai metraštyje bus įrašyti po būsimosios herojų kelionės.',
    ],
    illustrationTitle: 'Paskutinės Sesijos Iliustracija',
    illustrationCaption: 'Kuopa stovi priešais paslaptingąjį, augalais apžėlusį uolos plyšį.',
    illustrationPlaceholderNote: 'Iliustracijos šablonas (Paskutinė sesija)',
    illustrationScene: 'cavern',
  },
];

/**
 * Susijusių objektų (vietų, daiktų, žmonių, ženklų) puslapiai metraštyje.
 * Pirmieji keli sakiniai iš `paragraphs[0]` automatiškai rodomi užvedus pele ant nuorodos!
 */
export const ARCHIVE_ENTITIES: Record<string, ArchiveEntity> = {
  'sventoji-azuolu-giria': {
    id: 'sventoji-azuolu-giria',
    category: 'vieta',
    categoryLabel: 'Vietovė • Šventvietė',
    title: 'Šventoji Ąžuolų Giria',
    subtitle: 'Šimtamečių ąžuolų tankmė į šiaurės vakarus nuo miestelio',
    romanPlate: 'V·I',
    paragraphs: [
      'Šventoji Ąžuolų Giria — sena, tanki giria šiaurės vakaruose, kurioje šimtamečiai ąžuolai auga taip glaudžiai, jog net vidurdienį po jų laja tvyro prieblanda ir vėsus rūkas. Vietiniai žmonės tiki, kad čia nuo neatmenamų laikų rusena senųjų dievų atmintis, todėl be reikalo kirsti medį ar triukšmauti šioje girioje laikoma dideliu prasižengimu.',
      'Per girią vingiuoja vos įžiūrimas samanotas takas, vedantis link {green:senasis-piliakalnis|Senojo Piliakalnio} ir upės brastos. Ant daugelio senų stuobrių ir akmenų čia išraižyti apsauginiai {green:baltu-zenklai|baltų ženklai}, įspėjantys keleivius apie pavojingas klampynes ir pasalas.',
      'Pirmojo žygio metu mūsų kuopa čia susidūrė su {green:piliakalnio-zvalgai|piliakalnio žvalgais} ir prie brastos tilto atrėmė pirmąją pasalą, iš kurios parsigabeno {green:stumbro-rago-taure|Stumbro Rago taurę}.',
    ],
    keyFacts: [
      { label: 'Tipas', value: 'Senolių miškas ir šventvietė' },
      { label: 'Kryptis', value: 'Šiaurės vakarai nuo miestelio' },
      { label: 'Būsena', value: 'Išžvalgyta I Sesijoje' },
    ],
    relatedIds: ['senasis-piliakalnis', 'baltu-zenklai', 'piliakalnio-zvalgai', 'stumbro-rago-taure'],
    illustrationTitle: 'Šventosios Ąžuolų Girios Takas',
    illustrationCaption: 'Samanoti rieduliai ir šimtamečiai ąžuolai, skendintys rytinėje migloje.',
    illustrationScene: 'forest',
  },

  'senasis-piliakalnis': {
    id: 'senasis-piliakalnis',
    category: 'vieta',
    categoryLabel: 'Vietovė • Gynybinis kalnas',
    title: 'Senasis Piliakalnis',
    subtitle: 'Apžėlusi medinės pilies kalva prie upės vingio',
    romanPlate: 'V·II',
    paragraphs: [
      'Senasis Piliakalnis stūkso ties staigiu upės vingiu, apsuptas stačių šlaitų ir senų gynybinių pylimų liekanų. Prieš kelis dešimtmečius čia stovėjo medinė žemaičių pilaitė, saugojusi {green:zemaitijos-pasienis|Žemaitijos Pasienio} kelius nuo plėšikų ir kryžiuočių žvalgų.',
      'Nors senosios sienos apdegusios ir apžėlusios krūmynais, ant piliakalnio aikštelės vis dar budi {green:piliakalnio-zvalgai|Senojo Piliakalnio žvalgai}, iš aukštai stebintys dūmus virš {green:sventoji-azuolu-giria|Šventosios Ąžuolų Girios}.',
      'Po piliakalnio šlaitu, pasak {green:butigeidis|smuklininko Butigeidžio}, slepiasi užgriuvę rūsiai, kuriuose senieji gynėjai slėpdavo ginklus ir atsargas.',
    ],
    keyFacts: [
      { label: 'Tipas', value: 'Piliakalnis / Griuvėsiai' },
      { label: 'Reikšmė', value: 'Stebėjimo postas prie upės brastos' },
      { label: 'Atrasta', value: 'I Sesijos metu' },
    ],
    relatedIds: ['piliakalnio-zvalgai', 'sventoji-azuolu-giria', 'zemaitijos-pasienis', 'skydo-umbonas'],
    illustrationTitle: 'Senasis Piliakalnis virš Upės Vingio',
    illustrationCaption: 'Medinių įtvirtinimų liekanos ir sargybos laužas kalvos viršūnėje.',
    illustrationScene: 'hillfort',
  },

  'zemaitijos-pasienis': {
    id: 'zemaitijos-pasienis',
    category: 'vieta',
    categoryLabel: 'Vietovė • Kraštas',
    title: 'Žemaitijos Pasienis',
    subtitle: 'Neramus miškų, pelkių ir piliakalnių ruožas LDK vakaruose',
    romanPlate: 'V·III',
    paragraphs: [
      'Žemaitijos Pasienis — kalvotas, neįžengiamomis giriomis ir klampynėmis apaugęs XV a. Lietuvos Didžiosios Kunigaikštystės pakraštys. Čia susikerta pirklių vilkstinių keliai, senosios pagoniškos šventvietės ir pavojingos niekieno žemės.',
      'Pagrindinė saugi keliautojų užuovėja šiame krašte yra mūsų miestelis su {green:juodojo-lokio-smukle|„Juodojo Lokio“ smukle} ir {green:senoliu-archyvas|Senolių Archyvu}. Už miestelio vartų plyti {green:sventoji-azuolu-giria|Šventoji Ąžuolų Giria}, o toliau pietryčiuose dunkso pavojingi {green:ruko-pelkynai|Rūko Pelkynai}.',
    ],
    keyFacts: [
      { label: 'Laikmetis', value: 'XV a. pradžia (LDK)' },
      { label: 'Saugios vietos', value: 'Miestelis, „Juodojo Lokio“ smuklė' },
      { label: 'Pavojai', value: 'Pasalos, pelkių padarai, senieji urvai' },
    ],
    relatedIds: ['juodojo-lokio-smukle', 'senoliu-archyvas', 'sventoji-azuolu-giria', 'ruko-pelkynai'],
    illustrationTitle: 'Žemaitijos Pasienio Kelių Kryžkelė',
    illustrationCaption: 'Senasis pasienio kelias, vedantis pro koplytstulpius ir girios tankmę.',
    illustrationScene: 'forest',
  },

  'juodojo-lokio-smukle': {
    id: 'juodojo-lokio-smukle',
    category: 'vieta',
    categoryLabel: 'Vietovė • Miestelio užeiga',
    title: '„Juodojo Lokio“ Smuklė',
    subtitle: 'Šilta ąžuolinių rąstų užeiga ir nuotykių ieškotojų susitikimo vieta',
    romanPlate: 'V·IV',
    paragraphs: [
      '„Juodojo Lokio“ smuklė — didžiausia ir triukšmingiausia miestelio užeiga, kurioje visada kvepia kadagiais rūkyta šerniena, dūminiu alumi ir šlapiomis keliautojų skraistėmis. Virš sunkių ąžuolinių durų kabo paties šeimininko jaunystėje sumedžioto lokio kaukolė.',
      'Užeigą tvirta ranka prižiūri {green:butigeidis|smuklininkas Butigeidis}, kuris ne tik pilsto midų, bet ir renka visas naujienas iš pravažiuojančių pirklių bei {green:piliakalnio-zvalgai|piliakalnio žvalgų}. Būtent prie šios smuklės didžiojo stalo prasidėjo mūsų kuopos istorija.',
    ],
    keyFacts: [
      { label: 'Šeimininkas', value: 'Smuklininkas Butigeidis' },
      { label: 'Paskirtis', value: 'Poilsis (Long Rest), atsargos, gandai' },
      { label: 'Žymiausias gėrimas', value: 'Kunigaikščių brandintas midus' },
    ],
    relatedIds: ['butigeidis', 'stumbro-rago-taure', 'senoliu-archyvas'],
    illustrationTitle: '„Juodojo Lokio“ Smuklės Didžioji Menė',
    illustrationCaption: 'Krosnies ugnis, ąžuolinis stalas ir kuopos pasitarimas prieš žygį.',
    illustrationScene: 'tavern',
  },

  'senoliu-archyvas': {
    id: 'senoliu-archyvas',
    category: 'vieta',
    categoryLabel: 'Vietovė • Metraščių saugykla',
    title: 'Senolių Archyvas',
    subtitle: 'Uoloje iškaltas žinių, žemėlapių ir trofėjų kambarys',
    romanPlate: 'V·V',
    paragraphs: [
      'Senolių Archyvas — po senąja kalva uoloje iškalta skliautuota menė, kurioje saugomi {green:zemaitijos-pasienis|Žemaitijos Pasienio} žemėlapiai, karališki pergamentai ir Didžioji Metraščių Knyga. Pro aukštus langus čia krinta saulės spinduliai, apšviečiantys skaitymo pultą.',
      'Greta pagrindinės salės yra geležimi kaustytos durys į Trofėjų menę, kurioje kuopa saugo savo žygių radinius: {green:stumbro-rago-taure|Stumbro Rago taurę}, {green:skydo-umbonas|įskilusį skydo umboną}, {green:svytinti-samana|švytinčią samaną} ir {green:sulankstyta-moneta|sulankstytą vario monetą}.',
    ],
    keyFacts: [
      { label: 'Vieta', value: 'Miestelio šiaurinė kalva' },
      { label: 'Eksponatai', value: 'Metraščių knyga, LDK žemėlapis, Trofėjų menė' },
    ],
    relatedIds: ['stumbro-rago-taure', 'skydo-umbonas', 'svytinti-samana', 'sulankstyta-moneta'],
    illustrationTitle: 'Senolių Archyvo Skliautai',
    illustrationCaption: 'Didžioji Metraščių Knyga ant ąžuolinio pulto ir sieniniai pergamentai.',
    illustrationScene: 'archive',
  },

  'sidabro-zingsnio-ezeras': {
    id: 'sidabro-zingsnio-ezeras',
    category: 'vieta',
    categoryLabel: 'Vietovė • Kalvų ežeras',
    title: 'Sidabro Žingsnio Ežeras',
    subtitle: 'Veidrodinio vandens ežeras tarp skardžių ir požeminių urvų',
    romanPlate: 'V·VI',
    paragraphs: [
      'Sidabro Žingsnio Ežeras — gilus, šaltinių maitinamas vandens telkinys, įsispraudęs tarp kalkakmenio skardžių pakeliui į {green:ruko-pelkynai|Rūko Pelkynus}. Mėnesienos naktimis jo paviršiuje matyti sidabrinis akmenų takas, atsirandantis tik nuslūgus vandeniui.',
      'Šiauriniame ežero krante atsiveria drėgnos olos, kuriose II Sesijos metu kuopa aptiko {green:paslaptingasis-plysys|paslaptingąjį plyšį uoloje} bei rinko {green:svytinti-samana|švytinčią samaną}.',
    ],
    keyFacts: [
      { label: 'Tipas', value: 'Gilus skardžių ežeras ir urvų sistema' },
      { label: 'Ypatybė', value: 'Povandeninė akmenų brasta' },
      { label: 'Atrasta', value: 'II Sesijos žygyje' },
    ],
    relatedIds: ['ruko-pelkynai', 'paslaptingasis-plysys', 'svytinti-samana'],
    illustrationTitle: 'Sidabro Žingsnio Ežero Skardžiai',
    illustrationCaption: 'Rūke skendintis ežero krantas ir tamsios uolų angos.',
    illustrationScene: 'lake',
  },

  'ruko-pelkynai': {
    id: 'ruko-pelkynai',
    category: 'vieta',
    categoryLabel: 'Vietovė • Klampynė',
    title: 'Rūko Pelkynai',
    subtitle: 'Pavojingos pietryčių klampynės, kuriose klaidžioja žaltvykslės',
    romanPlate: 'V·VII',
    paragraphs: [
      'Rūko Pelkynai — beribės klampynės ir durpynai į pietryčius nuo {green:sidabro-zingsnio-ezeras|Sidabro Žingsnio Ežero}, kur tiršta migla nesisklaido net vasaros vidurdienį. Medžiotojai pasakoja, kad čia kompaso rodyklė sukasi ratu, o po kupstais slepiasi senų žygių liekanos.',
      'Keliaujant pelkynų pakraščiu link uolynų, herojams teko pasikliauti {green:baltu-zenklai|baltų ženklais} ir {green:butigeidis|smuklininko Butigeidžio} įduotomis kelionės atsargomis, kol galiausiai buvo pasiektas {green:paslaptingasis-plysys|paslaptingasis plyšys uoloje}.',
    ],
    keyFacts: [
      { label: 'Tipas', value: 'Pelkynai ir durpynai' },
      { label: 'Kryptis', value: 'Pietryčiai nuo miestelio' },
      { label: 'Būsena', value: 'Pavojinga / Iš dalies išžvalgyta' },
    ],
    relatedIds: ['sidabro-zingsnio-ezeras', 'paslaptingasis-plysys', 'svytinti-samana'],
    illustrationTitle: 'Rūko Pelkynų Kūlgrinda',
    illustrationCaption: 'Kreivos pelkių pušys ir po vandeniu paslėptas akmenų kelias.',
    illustrationScene: 'lake',
  },

  'paslaptingasis-plysys': {
    id: 'paslaptingasis-plysys',
    category: 'zenklai',
    categoryLabel: 'Vieta ir Reiškinys • Požemių paslaptis',
    title: 'Paslaptingasis Plyšys Uoloje',
    subtitle: 'Keistais augalais apžėlęs skardžio plyšys, alsuojantis gilia tamsa',
    romanPlate: 'R·I',
    paragraphs: [
      'Paslaptingasis Plyšys Uoloje — siauras, aukštas įtrūkis požeminės olos sienoje netoli {green:sidabro-zingsnio-ezeras|Sidabro Žingsnio Ežero}, iš kurio ritmingai lyg milžino kvėpavimas dvelkia šiltas skersvėjis. Aplink plyšį akmuo apaugęs neįprastomis didžiulėmis gėlėmis, milžiniškais grybais ir {green:svytinti-samana|švytinčia samana}.',
      'Už plyšio tvyro tokia tiršta, beveik apčiuopiama tamsa, kad net deglų šviesa joje prityla. Ant slenksčio akmens kuopa aptiko {green:sulankstyta-moneta|sulankstytą vario monetą} — ženklą, kad kažkas čia jau bandė žengti anksčiau.',
    ],
    keyFacts: [
      { label: 'Vieta', value: 'Olos prie Sidabro Žingsnio Ežero' },
      { label: 'Keista savybė', value: 'Kvėpuojantis skersvėjis ir magiška augmenija' },
      { label: 'Sesija', value: 'II Sesijos kulminacija' },
    ],
    relatedIds: ['sidabro-zingsnio-ezeras', 'svytinti-samana', 'sulankstyta-moneta'],
    illustrationTitle: 'Paslaptingasis Plyšys Uolos Sienoje',
    illustrationCaption: 'Kuopa stovi priešais tamsų urvo plyšį, apsuptą keistų grybų ir žiedų.',
    illustrationScene: 'cavern',
  },

  butigeidis: {
    id: 'butigeidis',
    category: 'asmuo',
    categoryLabel: 'Asmuo • Miestelio veikėjas',
    title: 'Smuklininkas Butigeidis',
    subtitle: '„Juodojo Lokio“ smuklės šeimininkas ir buvęs pasienio karys',
    romanPlate: 'A·I',
    paragraphs: [
      'Smuklininkas Butigeidis — plačiapetis, žilabarzdis {green:juodojo-lokio-smukle|„Juodojo Lokio“ smuklės} šeimininkas, jaunystėje pats tarnavęs {green:piliakalnio-zvalgai|Senojo Piliakalnio žvalgų} būryje. Ant jo dilbio vis dar matyti senas kardo randas, o po prekystaliu jis visada laiko paruoštą ąžuolinį vėzdą.',
      'Butigeidis pirmasis įspėjo mūsų kuopą apie neramius ženklus {green:sventoji-azuolu-giria|Šventojoje Ąžuolų Girioje} ir patarė pasiimti negendančių atsargų prieš traukiant į {green:ruko-pelkynai|Rūko Pelkynus}. Kai kuopa grįžo su {green:stumbro-rago-taure|Stumbro Rago taure}, jis pats pripylė ją geriausio kunigaikščių midaus.',
    ],
    keyFacts: [
      { label: 'Vaidmuo', value: '„Juodojo Lokio“ smuklės šeimininkas' },
      { label: 'Būdas', value: 'Svetingas, bet griežtas tvarkos sergėtojas' },
      { label: 'Ryšiai', value: 'Pažįsta žvalgus, pirklius ir archyvarus' },
    ],
    relatedIds: ['juodojo-lokio-smukle', 'piliakalnio-zvalgai', 'stumbro-rago-taure'],
    illustrationTitle: 'Smuklininkas Butigeidis prie Ąžuolinės Statinės',
    illustrationCaption: 'Senasis užeigos šeimininkas su midaus ąsočiu ir raktų ryšuliu.',
    illustrationScene: 'innkeeper',
  },

  'piliakalnio-zvalgai': {
    id: 'piliakalnio-zvalgai',
    category: 'zmones',
    categoryLabel: 'Žmonės • Sargybos brolija',
    title: 'Senojo Piliakalnio Žvalgai',
    subtitle: 'Pasienio pėdsekiai ir lankininkai, saugantys girios takus',
    romanPlate: 'A·II',
    paragraphs: [
      'Senojo Piliakalnio Žvalgai — nedidelė, bet patyrusi vietinių pėdsekių ir šaulių brolija, įsikūrusi ant {green:senasis-piliakalnis|Senojo Piliakalnio} viršūnės. Jie dėvi pilkšvai žalias vilnones skraistes, leidžiančias nepastebimai susilieti su {green:sventoji-azuolu-giria|Šventosios Ąžuolų Girios} kamienais.',
      'Žvalgai medžiose palieka slaptus {green:baltu-zenklai|baltų ženklus}, kuriais perspėja savus apie pasalas ir užnuodytus šaltinius. Pirmojoje sesijoje jie pasidalijo žiniomis su mūsų kuopa apie prie brastos tilto tūnančius užpuolikus.',
    ],
    keyFacts: [
      { label: 'Buveinė', value: 'Senasis Piliakalnis ir girios stovyklos' },
      { label: 'Ginkluotė', value: 'Uosiniai lankai, medžiokliniai peiliai, ragai' },
      { label: 'Sąjungininkai', value: 'Smuklininkas Butigeidis ir mūsų kuopa' },
    ],
    relatedIds: ['senasis-piliakalnis', 'sventoji-azuolu-giria', 'baltu-zenklai', 'butigeidis'],
    illustrationTitle: 'Senojo Piliakalnio Žvalgų Sargyba',
    illustrationCaption: 'Du apsiaustais vilkintys žvalgai stebi girios brastą nuo kalvos šlaito.',
    illustrationScene: 'scouts',
  },

  'stumbro-rago-taure': {
    id: 'stumbro-rago-taure',
    category: 'daiktas',
    categoryLabel: 'Daiktas • I Sesijos trofėjus',
    title: 'Stumbro Rago Taurė',
    subtitle: 'Žalvariu kaustyta apeiginė taurė, parnešta iš pirmojo žygio',
    romanPlate: 'D·I',
    paragraphs: [
      'Stumbro Rago Taurė — masyvus, tamsaus stumbro rago indas, apkaustytas kaltiniu žalvariu su išraižytais saulės ir žalčių ornamentais. Jei pridedi šį ragą prie ausies, lyg ir girdisi tolimas {green:juodojo-lokio-smukle|„Juodojo Lokio“ smuklės} šurmulys bei dainos.',
      'Kuopa šią taurę atrado ir išgelbėjo pirmojo žygio į {green:sventoji-azuolu-giria|Šventąją Ąžuolų Girią} metu. Dabar ji garbingai saugoma {green:senoliu-archyvas|Senolių Archyvo} trofėjų menės viršutinėje lentynoje ir išimama tik švenčiant pergales.',
    ],
    keyFacts: [
      { label: 'Kategorija', value: 'Trofėjus / Apeiginis daiktas' },
      { label: 'Vieta archyve', value: 'Viršutinė lentyna, kairė' },
      { label: 'Keista savybė', value: 'Pridėjus prie ausies girdisi tolimas smuklės šurmulys' },
    ],
    relatedIds: ['senoliu-archyvas', 'sventoji-azuolu-giria', 'juodojo-lokio-smukle', 'skydo-umbonas'],
    illustrationTitle: 'Žalvariu Kaustyta Stumbro Rago Taurė',
    illustrationCaption: 'Trofėjų menės eksponatas su baltiškais apkaustų raštais.',
    illustrationScene: 'horn',
  },

  'skydo-umbonas': {
    id: 'skydo-umbonas',
    category: 'daiktas',
    categoryLabel: 'Daiktas • Kovos relikvija',
    title: 'Įskilęs Skydo Umbonas',
    subtitle: 'Geležinis skydo vidurys su giliu kirvio įkirtimu',
    romanPlate: 'D·II',
    paragraphs: [
      'Įskilęs Skydo Umbonas — sunkus kaltos geležies gaubtas iš seno ąžuolinio skydo vidurio, perrėžtas giliu dviašmenio kirvio smūgiu. Jis vis dar kvepia dūmais, geležimi ir {green:sventoji-azuolu-giria|Šventosios Ąžuolų Girios} pušų sakais.',
      'Šis skydo fragmentas primena kritinį smūgį, kurį mūsų kuopos priekinės linijos karys atrėmė mūšyje prie siauro brastos tilto netoli {green:senasis-piliakalnis|Senojo Piliakalnio}. Dabar relikvija puikuojasi {green:senoliu-archyvas|Senolių Archyvo} centriniame stende.',
    ],
    keyFacts: [
      { label: 'Kategorija', value: 'Kovos relikvija (I Sesija)' },
      { label: 'Vieta archyve', value: 'Centrinis stendas' },
      { label: 'Keista savybė', value: 'Vis dar kvepia dūmais ir pušų sakais' },
    ],
    relatedIds: ['senoliu-archyvas', 'sventoji-azuolu-giria', 'senasis-piliakalnis', 'stumbro-rago-taure'],
    illustrationTitle: 'Įskilęs Geležinis Skydo Umbonas',
    illustrationCaption: 'Kovos relikvija su kniedėmis ir giliu kirvio ašmenų pėdsaku.',
    illustrationScene: 'shield',
  },

  'svytinti-samana': {
    id: 'svytinti-samana',
    category: 'daiktas',
    categoryLabel: 'Daiktas • II Sesijos radinys',
    title: 'Keistas Stiklainis su Švytinčia Samana',
    subtitle: 'Užantspauduotas indas, naktimis skleidžiantis blankią žalsvą šviesą',
    romanPlate: 'D·III',
    paragraphs: [
      'Keistas Stiklainis su Švytinčia Samana — storo pūsto stiklo indas, užlietas vašku, kurio viduje auga gyva žalsvai švytinti samana iš urvų prie {green:sidabro-zingsnio-ezeras|Sidabro Žingsnio Ežero}. Keisčiausia tai, kad ši samana sužimba pastebimai ryškiau, kai kas nors kambaryje pameluoja.',
      'Kuopa šį pavyzdį surinko II Sesijos metu prie {green:paslaptingasis-plysys|paslaptingojo uolos plyšio}, kur olos sienos buvo nusėtos milžiniškais grybais ir nepažįstamais žiedais. Dabar stiklainis apšviečia {green:senoliu-archyvas|Senolių Archyvo} dešiniąją lentyną.',
    ],
    keyFacts: [
      { label: 'Kategorija', value: 'Alcheminis / Magiškas radinys' },
      { label: 'Vieta archyve', value: 'Viršutinė lentyna, dešinė' },
      { label: 'Keista savybė', value: 'Švyti ryškiau, kai kas nors šalia pameluoja' },
    ],
    relatedIds: ['paslaptingasis-plysys', 'sidabro-zingsnio-ezeras', 'senoliu-archyvas'],
    illustrationTitle: 'Stiklainis su Švytinčia Urvų Samana',
    illustrationCaption: 'Vašku užantspauduotas indas su magiškai rusenančia augmenija.',
    illustrationScene: 'moss',
  },

  'sulankstyta-moneta': {
    id: 'sulankstyta-moneta',
    category: 'daiktas',
    categoryLabel: 'Daiktas • Sesijos kuriozas',
    title: 'Sulankstyta Vario Moneta',
    subtitle: 'Strėlės peršauta ar dantimis perkąsta sena pasienio moneta',
    romanPlate: 'D·IV',
    paragraphs: [
      'Sulankstyta Vario Moneta — sena, pažaliavusi varinė moneta su vos įžiūrimu dvigubo kryžiaus ir ieties antgalio įspaudu, perlenkta pusiau. Kuopos nariai ją laiko laimę nešančiu talismanu, išgelbėjusiu nuo pražūtingų spąstų.',
      'Moneta buvo rasta ant akmeninio slenksčio ties {green:paslaptingasis-plysys|paslaptinguoju plyšiu uoloje}, netoli {green:ruko-pelkynai|Rūko Pelkynų}. Dabar ji saugoma {green:senoliu-archyvas|Senolių Archyvo} apatinėje vitrinoje.',
    ],
    keyFacts: [
      { label: 'Kategorija', value: 'Sesijos kuriozas / Talismanas' },
      { label: 'Vieta archyve', value: 'Apatinė vitrina' },
      { label: 'Keista savybė', value: 'Laimę nešantis niekutis' },
    ],
    relatedIds: ['paslaptingasis-plysys', 'senoliu-archyvas', 'ruko-pelkynai'],
    illustrationTitle: 'Sulankstyta Vario Moneta',
    illustrationCaption: 'Senas pasaginių ženklų denaras, perlenktas per patį vidurį.',
    illustrationScene: 'runes',
  },

  'baltu-zenklai': {
    id: 'baltu-zenklai',
    category: 'zenklai',
    categoryLabel: 'Ženklai • Girios įraižai',
    title: 'Senieji Baltų Ženklai',
    subtitle: 'Ant stuobrių ir akmenų išraižyti apsauginiai bei žvalgybiniai simboliai',
    romanPlate: 'Z·I',
    paragraphs: [
      'Senieji Baltų Ženklai — ant šimtamečių ąžuolų žievės ir samanotų riedulių peiliu išraižyti geometriniai simboliai: Perkūno kryžiai, žalčio vingiai ir Saulės žiedai. Juos {green:sventoji-azuolu-giria|Šventojoje Ąžuolų Girioje} palieka tiek senieji vaidilos, tiek {green:piliakalnio-zvalgai|Senojo Piliakalnio žvalgai}.',
      'Kiekvienas įraižas turi prasmę tiems, kurie moka skaityti miško kalbą: vieni ženklai rodo saugią brastą ar švarų šaltinį, kiti įspėja apie artėjančią pasalą ar prakeiktą vietą {green:ruko-pelkynai|Rūko Pelkynuose}.',
    ],
    keyFacts: [
      { label: 'Paskirtis', value: 'Apsauga ir slaptos žvalgų nuorodos' },
      { label: 'Kur sutinkami', value: 'Šventoji Ąžuolų Giria, Senasis Piliakalnis' },
    ],
    relatedIds: ['sventoji-azuolu-giria', 'piliakalnio-zvalgai', 'senasis-piliakalnis'],
    illustrationTitle: 'Akmenyje ir Medyje Išraižyti Baltų Ženklai',
    illustrationCaption: 'Apsauginės runos ir žvalgų paliktos žymės prie girios tako.',
    illustrationScene: 'runes',
  },
};

export const ARCHIVE_ENTITY_LIST: ArchiveEntity[] = Object.values(ARCHIVE_ENTITIES);

/**
 * Pašalina `{green:id|Tekstas}` arba `{green:Tekstas}` žymas iš sakinio,
 * palikdamas tik skaitomą tekstą (naudojama ištraukiant pirmus kelis sakinius).
 */
export function stripEntityMarkup(text: string): string {
  return text.replace(/\{green:([^}]+)\}/g, (_, inner: string) => {
    const pipeIndex = inner.indexOf('|');
    return pipeIndex >= 0 ? inner.slice(pipeIndex + 1) : inner;
  });
}

/**
 * Ištraukia pirmus kelis sakinius (`maxSentences`) tiesiai iš objekto puslapio pastraipų.
 */
export function getEntityPreviewSentences(
  entity: ArchiveEntity,
  maxSentences = 2
): string {
  const fullCleanText = entity.paragraphs
    .map((p) => stripEntityMarkup(p).trim())
    .join(' ');
  const sentences = fullCleanText.match(/[^.!?…]+[.!?…]+/g);
  if (!sentences || sentences.length === 0) {
    return fullCleanText;
  }
  return sentences
    .slice(0, maxSentences)
    .map((s) => s.trim())
    .join(' ');
}

/**
 * Pagal `{green:...}` vidinį tekstą suranda susijusį `ArchiveEntity` ir rodomą pavadinimą.
 */
export function resolveArchiveEntity(innerToken: string): {
  entity?: ArchiveEntity;
  label: string;
} {
  const pipeIndex = innerToken.indexOf('|');
  if (pipeIndex >= 0) {
    const id = innerToken.slice(0, pipeIndex).trim();
    const label = innerToken.slice(pipeIndex + 1);
    return {
      entity: ARCHIVE_ENTITIES[id],
      label,
    };
  }

  const label = innerToken.trim();
  const normalized = label.toLowerCase();

  // Tiesioginė arba linksniuotų formų paieška
  if (normalized.includes('ąžuolų gir')) {
    return { entity: ARCHIVE_ENTITIES['sventoji-azuolu-giria'], label };
  }
  if (normalized.includes('piliakaln') && normalized.includes('žvalg')) {
    return { entity: ARCHIVE_ENTITIES['piliakalnio-zvalgai'], label };
  }
  if (normalized.includes('piliakaln')) {
    return { entity: ARCHIVE_ENTITIES['senasis-piliakalnis'], label };
  }
  if (normalized.includes('pasien')) {
    return { entity: ARCHIVE_ENTITIES['zemaitijos-pasienis'], label };
  }
  if (normalized.includes('juodojo lokio') || normalized.includes('smukl')) {
    return { entity: ARCHIVE_ENTITIES['juodojo-lokio-smukle'], label };
  }
  if (normalized.includes('archyv')) {
    return { entity: ARCHIVE_ENTITIES['senoliu-archyvas'], label };
  }
  if (normalized.includes('butigeid')) {
    return { entity: ARCHIVE_ENTITIES['butigeidis'], label };
  }
  if (normalized.includes('sidabro žingsn')) {
    return { entity: ARCHIVE_ENTITIES['sidabro-zingsnio-ezeras'], label };
  }
  if (normalized.includes('rūko pelk')) {
    return { entity: ARCHIVE_ENTITIES['ruko-pelkynai'], label };
  }
  if (normalized.includes('stumbro rago')) {
    return { entity: ARCHIVE_ENTITIES['stumbro-rago-taure'], label };
  }
  if (normalized.includes('umbon') || normalized.includes('skydo')) {
    return { entity: ARCHIVE_ENTITIES['skydo-umbonas'], label };
  }
  if (normalized.includes('saman')) {
    return { entity: ARCHIVE_ENTITIES['svytinti-samana'], label };
  }
  if (normalized.includes('monet')) {
    return { entity: ARCHIVE_ENTITIES['sulankstyta-moneta'], label };
  }
  if (normalized.includes('baltų ženkl')) {
    return { entity: ARCHIVE_ENTITIES['baltu-zenklai'], label };
  }
  if (normalized.includes('plyš')) {
    return { entity: ARCHIVE_ENTITIES['paslaptingasis-plysys'], label };
  }

  return { entity: ARCHIVE_ENTITIES[normalized], label };
}

/**
 * Žemėlapiai Archyvo sienoje. Paspaudus atverčiamas visas lapas.
 */
export const ARCHIVE_MAPS: ArchiveMap[] = [
  {
    id: 'map-ldk-xv',
    mapNumber: 1,
    title: 'Lietuvos Didžioji Kunigaikštystė, XV a.',
    regionSubtitle: 'Magni Ducatus Lithuaniae',
    acquiredNote: 'Sieninis archyvo žemėlapis',
    imageUrl: '/images/ldk-map.jpg',
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

