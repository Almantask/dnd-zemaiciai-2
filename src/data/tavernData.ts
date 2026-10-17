import { ShopItem } from '../types';

export const TAVERN_KEEPER = {
  name: 'Smuklininkas Butigeidis',
  role: '„Juodojo Lokio“ smuklės šeimininkas',
  greeting:
    'Sveiki atvykę į „Juodojo Lokio“ smuklę, keliautojai! Nusišluostykite žemaitišką purvą nuo batų, sėskitės arčiau krosnies. Ką šiandien pasiūlyti — karšto viralo, putojančio midaus ar šiltą gultą nakčiai?',
  hotspot: {
    x: 16,
    y: 35,
    width: 14,
    height: 34,
  },
};

export const TAVERN_ITEMS: ShopItem[] = [
  // 1. Maistas ir gėrimai (Food, Drink, and Lodging – PHB p. 158)
  {
    id: 'meal-squalid',
    category: 'food',
    name: 'Prasta skurdžio žinia (dienai)',
    dndTerm: 'Meals (Squalid)',
    price: '3 denarai (3 CP)',
    description: 'Miežinė košė be taukų, prėskas ruginis paplotėlis ir šaltas vanduo.',
    statsAndEffects:
      'Palaiko gyvybingumą 1 dienai (apsaugo nuo išsekimo / Exhaustion dėl bado), tačiau nesuteikia jokio moralinio ar socialinio pranašumo.',
    visualDescription:
      'Mediniame apdaužytame dubenėlyje patiekta pilkšva vandeninga miežinė košė ir kietas ruginis paplotėlis.',
    shopkeeperComment:
      '„Jei kišenėse švilpauja vėjai, o skrandis groja maršus — užteks, kad ant kojų išstovėtum. Tik nesiskųsk, kad šaukštas be lašinių!“',
    whenToUse:
      'Naudoti, kai taupote kiekvieną denarą arba norite suvaidinti vargšą piligrimą / elgetą ir nekelti įtarimų.',
  },
  {
    id: 'meal-poor',
    category: 'food',
    name: 'Paprasta valstiečių vakarienė (dienai)',
    dndTerm: 'Meals (Poor)',
    price: '6 denarai (6 CP)',
    description:
      'Tiršta žirnių ir kopūstų sriuba su spirgais, ruginė duona su kanapių sėklomis ir puodelis rūgštaus raugalo (girių).',
    statsAndEffects:
      'Pilnas 1 dienos maisto davinys. Sušildo po kelionės per lietų ar darganą, palaiko normalią sveikatos būklę.',
    visualDescription:
      'Garais besiveržiantis molinis dubuo tirštos kopūstienės su spirgais ir riekė tamsios duonos, pabarstytos grūstomis kanapėmis.',
    shopkeeperComment:
      '„Štai čia tai tikras žemaičio maistas! Po tokio dubens ir malkas kapoti, ir su vilkais miške galynėtis gali.“',
    whenToUse:
      'Kasdienis pasirinkimas paprastiems samdiniams ir keliautojams — nebrangu, sotu ir padeda lengviau susidraugauti su vietiniais valstiečiais.',
  },
  {
    id: 'meal-modest',
    category: 'food',
    name: 'Sotus užeigos maistas (dienai)',
    dndTerm: 'Meals (Modest)',
    price: '5 grašiai (5 SP)',
    description:
      'Troškinta aviena arba šerniena, kepta lydeka su krienais, sūris su kmynais ir pilnas geros medaus girios ar alaus ąsotis.',
    statsAndEffects:
      'Kokybiškas 1 dienos išlaikymas. Puikiai atstato jėgas prieš ilgąjį poilsį (Long Rest) ir palaiko gerą nuotaiką kuopoje.',
    visualDescription:
      'Didelė medinė lenta su sultingu šernienos kepsniu, tarkuotais krienais kvepiančia lydeka, kieto sūrio luitu ir putojančiu ąsočiu.',
    shopkeeperComment:
      '„Šerną vakar medžiotojai iš girios parvilko, o lydeka dar rytą upėje uodega pliaukšėjo! Valgyk į sveikatą — jėgų rytoj prireiks.“',
    whenToUse:
      'Standartinis pasirinkimas nuotykių ieškotojų grupei prieš lemiamą žygį arba grįžus iš pavojingos užduoties.',
    counterHotspot: {
      x: 24,
      y: 69,
      width: 9,
      height: 9,
      label: 'Šernienos kumpis ant lentos',
    },
  },
  {
    id: 'meal-comfortable',
    category: 'food',
    name: 'Svečių ir pirklių puota (dienai)',
    dndTerm: 'Meals (Comfortable)',
    price: '8 grašiai (8 SP)',
    description:
      'Žvėriena, kepti tetervinai, riebūs lašiniai, blynai su uogienėmis ir stambus dubuo karšto prieskoniais kvepiančio midaus.',
    statsAndEffects:
      'Aukštos kokybės vaišės. Padeda užmegzti pažintis su pirkliais, seniūnais ar amatininkais prie gretimų stalų.',
    visualDescription:
      'Apskritas varinis padėklas su apskrudusiais tetervinais, medumi ir bruknėmis gardintais blynais bei garuojančiu prieskoniniu midumi.',
    shopkeeperComment:
      '„Kai Hanzos pirkliai ar valsčiaus tijūnas užsuka, šitą stalą dengiu. Pavaišink svarbų žmogų — liežuvis jam pats atsiriš!“',
    whenToUse:
      'Puikiai tinka, kai norite išgauti informaciją iš turtingesnių miestelėnų, švęsti sėkmingą grobį ar įsiteikti NPC.',
  },
  {
    id: 'meal-wealthy',
    category: 'food',
    name: 'Bajoriška puota (dienai)',
    dndTerm: 'Meals (Wealthy / Aristocratic)',
    price: '2 auksinai (2 GP)',
    description:
      'Gulbės, stumbro kepsniai, įvežtiniai pietų prieskoniai (šafranas, pipirai), geriausio kelerių metų brandinimo kunigaikščių midus ir Vakarų Europos vynas.',
    statsAndEffects:
      'Aristokratiško lygio puota. Atkreipia visos smuklės dėmesį, kelia reputaciją bajorų ir didikų akyse.',
    visualDescription:
      'Prabangiai papuoštas stalas su stumbro nugarinės kepsniais, šafranu auksuojančiais padažais ir sidabrinėmis taurėmis.',
    shopkeeperComment:
      '„Oho! Ar tik nebūsite iš paties didžiojo kunigaikščio dvaro?! Tuoj pat liepsiu virtuvėje atpjauti geriausią stumbro kumpį ir atkimšti senąją statinę!“',
    whenToUse:
      'Naudoti per derybas su bajorais, švenčiant didelę pergalę arba norint pademonstruoti grupės statusą bei turtus.',
  },
  {
    id: 'drink-ale-pint',
    category: 'drink',
    name: 'Miežinis / Dūminis alus (1 bokalas)',
    dndTerm: 'Ale (pint)',
    price: '4 denarai (4 CP)',
    description: 'Tamsus, tirštas vietinis alus, virtas kaimo bravoruose.',
    statsAndEffects:
      'Numalšina troškulį, drąsina širdį. Išgėrus per daug — galimas Constitution patikrinimas dėl apsvaigimo.',
    visualDescription:
      'Sunkus ąžuolinis bokalas su metaliniais lankais, sklidinas tamsaus, dūmais kvepiančio alaus su tiršta puta.',
    shopkeeperComment:
      '„Dūminis, ant alksnio malkų salyklas džiovintas! Vienas bokalas — dulkėms nuplauti, antras — dainai užtraukti.“',
    whenToUse:
      'Geriausias būdas pradėti pokalbį su smuklės lankytojais ar herojais prie stalo, nepasirodant pasipūtusiam.',
    counterHotspot: {
      x: 30,
      y: 60,
      width: 6,
      height: 9,
      label: 'Alaus bokalai',
    },
  },
  {
    id: 'drink-ale-gallon',
    category: 'drink',
    name: 'Medaus gira arba silpnas midus (ąsotis)',
    dndTerm: 'Ale (gallon)',
    price: '2 grašiai (2 SP)',
    description: 'Didelis ąsotis lengvo, gaivinančio medaus gėrimo (gidos).',
    statsAndEffects:
      'Užtenka visai 4–5 nuotykių ieškotojų grupei (apie 8 bokalus). Gaivina, bet greitai neapsvaigina.',
    visualDescription:
      'Didelis molinis ąsotis su išraižytais žalčių raštais, pilnas gintarinės spalvos kvepiančios medaus giros.',
    shopkeeperComment:
      '„Imkite visą ąsotį ant stalo — ir pigiau išeis, ir nereikės kas penkias minutes manęs šaukti, kol žemėlapius nagrinėjate!“',
    whenToUse:
      'Kai visa grupė susėda planuoti žygio arba nori pavaišinti visą stalą nebijodama ryte pabusti skaudančia galva.',
  },
  {
    id: 'drink-wine-common',
    category: 'drink',
    name: 'Smuklės midus / Vynas (taurė)',
    dndTerm: 'Wine (common)',
    price: '2 grašiai (2 SP)',
    description: 'Stacionarus, saldus medaus midus arba paprastas raudonas uogų vynas.',
    statsAndEffects:
      'Šildo kūną ir pakelia nuotaiką. Tinka ramiems pokalbiams su mokslinčiais, dvasininkais ar burtininkais.',
    visualDescription:
      'Gludinta molinė taurė su tamsiu serbentų ir vyšnių vynu arba tirštu liepų medaus midumi.',
    shopkeeperComment:
      '„Saldus kaip vasaros vakaras! Jei alus per kartus, šitas midus sušildys iki pat pirštų galiukų.“',
    whenToUse:
      'Tinka vaišinti išrankesnius pašnekovus, žiniuonius ar šventikus.',
  },
  {
    id: 'drink-wine-fine',
    category: 'drink',
    name: 'Kunigaikščių brandintas midus (butelis)',
    dndTerm: 'Wine (fine)',
    price: '10 auksinų (10 GP)',
    description:
      'Daug metų kamštinėse statinėse brandintas kilmingas midus, kurį geria tik bajorai ir karaliaus pasiuntiniai.',
    statsAndEffects:
      'Išskirtinė dovana ar vaišės. Gali suteikti įtikinėjimo (Persuasion) pranašumą bendraujant su kilmingais NPC, jei įteikiamas kaip dovana.',
    visualDescription:
      'Storo stiklo pūstas butelis, užlietas raudonu vašku su kunigaikščio antspaudu.',
    shopkeeperComment:
      '„Šitą butelį laikau po užraktu! Dešimt žiemų ąžuolo statinėje po žeme brendo. Vienas gurkšnis — kaip grynas auksas.“',
    whenToUse:
      'Neštis kaip vertingą dovaną bajorui, vaidilai ar svarbiam asmeniui, kurio palankumo siekiate.',
    counterHotspot: {
      x: 6,
      y: 79,
      width: 6,
      height: 15,
      label: 'Brandinto midaus butelis',
    },
  },
  {
    id: 'travel-bread',
    category: 'travel',
    name: 'Duonos kepalas (kelionei)',
    dndTerm: 'Loaf of bread',
    price: '2 denarai (2 CP)',
    description: 'Sunkus, juodas ruginis duonos kepalas, keptas ant ajerų lapų.',
    statsAndEffects:
      'Paprastas maistas 1 dienai kelionėje. Lėtai žiedėja, išlieka valgomas net po savaitės kuprinėje.',
    visualDescription:
      'Apvalus, tamsia pluta apskrudęs ruginis kepalas, apačioje įsispaudusiais džiovintų ajerų lapais.',
    shopkeeperComment:
      '„Mūsų duonelė ant ajerų kepta — nei pelija, nei trupa. Įsimesk į krepšį, miške užeigos nerasi!“',
    whenToUse:
      'Pigi atsarga trumpoms išvykoms arba norint pamaitinti sutiktus vargšus ar gyvūnus.',
    counterHotspot: {
      x: 13,
      y: 74,
      width: 11,
      height: 11,
      label: 'Ruginės duonos kepalas',
    },
  },
  {
    id: 'travel-rations',
    category: 'travel',
    name: 'Rūkyta mėsa / Sūris (kelionei)',
    dndTerm: 'Rations (1 day)',
    price: '5 grašiai (5 SP)',
    description:
      'Džiovinta šerniena, sūdyti lašiniai, ruginiai džiūvėsiai ir kietas varškės sūris (tinkamas ilgai žygiuoti).',
    statsAndEffects:
      'Standartinis D&D 5e „Rations (1 day)“. Negendantis sausas davinys tolimoms kelionėms per pelkes ir girias.',
    visualDescription:
      'Drobiniame maišelyje surišti kieto kmynų sūrio gabalai, kadagiais rūkyti lašiniai ir ruginiai džiūvėsiai.',
    shopkeeperComment:
      '„Jei traukiate link pelkių ar kryžiuočių pasienio, be šito ryšulėlio nė žingsnio neženkite. Negenda net mėnesį!“',
    whenToUse:
      'Būtina įsigyti prieš iškeliaujant iš miestelio į ilgesnes nei vienos dienos ekspedicijas.',
    counterHotspot: {
      x: 34,
      y: 64,
      width: 10,
      height: 9,
      label: 'Kietas sūris su kmynais',
    },
  },
  {
    id: 'travel-feed',
    category: 'travel',
    name: 'Žirgo pašaras (1 dienai)',
    dndTerm: 'Feed (per day)',
    price: '5 denarai (5 CP)',
    description: 'Maišelis avižų ir geras glėbys šieno smuklės tvartelyje.',
    statsAndEffects:
      'Išlaiko žirgą ar nešulinį gyvulį sotų 1 parą. Svarbu žiemą arba vietovėse, kur nėra ganyklų.',
    visualDescription:
      'Storas lininis maišas, pilnas švarių auksinių avižų ir kvepiančio pievų šieno.',
    shopkeeperComment:
      '„Kas žirgą myli, tas pats pėsčias nevaikšto! Pašerk savo žemaituką avižomis, tai iš bet kokios bėdos išneš.“',
    whenToUse:
      'Naudoti nakvojant smuklėje su žirgais arba leidžiantis į tankias girias ir pelkes.',
    counterHotspot: {
      x: 49,
      y: 75,
      width: 8,
      height: 14,
      label: 'Avižų maišas žirgui',
    },
  },

  // 2. Nakvynė ir paslaugos smuklėje (Lodging)
  {
    id: 'lodging-squalid',
    category: 'lodging',
    name: 'Šiaudinis gultas tvartelyje',
    dndTerm: 'Inn (Squalid)',
    price: '7 denarai (7 CP)',
    description: 'Vieta ant šiaudų tvartelyje šalia žirgų – pigiausia, bet šilta nakvynė.',
    statsAndEffects:
      'Leidžia atlikti ilgąjį poilsį (Long Rest) po stogu. Daiktai nesaugomi, todėl verta pasisaugoti ilgapirščių.',
    visualDescription:
      'Šiltas šiaudų kalnas kampe prie pat žirgų gardų, kur nuo gyvulių kvėpavimo net žiemą nebūna šalta.',
    shopkeeperComment:
      '„Žirgai prikvėpuoja šilumos, šiaudai sausi — ko daugiau vargšui keliautojui reikia? Tik piniginę po galva pasikišk!“',
    whenToUse:
      'Kai norite tik praleisti naktį po stogu už mažiausią kainą arba nenorite palikti savo žirgų be priežiūros.',
  },
  {
    id: 'lodging-poor',
    category: 'lodging',
    name: 'Bendras suolas / Aslos grindys',
    dndTerm: 'Inn (Poor)',
    price: '2 grašiai (2 SP)',
    description:
      'Vieta ant bendrųjų smuklės salės grindų prie krosnies (reikia turėti savo kailinį guolį).',
    statsAndEffects:
      'Ilgasis poilsis (Long Rest) šiltoje salėje prie baltos krosnies. Girdėsite visus naktinius smuklės gandus.',
    visualDescription:
      'Platus ąžuolinis suolas ir kailiais išklota vieta prie pat šiltos baltos koklinės krosnies.',
    shopkeeperComment:
      '„Prie krosnies kaulus iššildysi, tik jei kas naktį knarkia — ant manęs nepyk!“',
    whenToUse:
      'Geras pasirinkimas norint nugirsti vėlyvus lankytojų pokalbius arba stebėti, kas naktį įeina į smuklę.',
  },
  {
    id: 'lodging-modest',
    category: 'lodging',
    name: 'Bendras kambarys (Lova su čiužiniu)',
    dndTerm: 'Inn (Modest)',
    price: '5 grašiai (5 SP)',
    description:
      'Vieta bendrame kambaryje su keliais kitais keliautojais (lovos su šiaudų čiužiniais).',
    statsAndEffects:
      'Patikimas ir ramus Ilgasis poilsis (Long Rest) antrame aukšte.',
    visualDescription:
      'Antrojo aukšto kamarėlė su tvarkingomis medinėmis lovomis, kimštais šiaudų čiužiniais ir lininiais užvalkalais.',
    shopkeeperComment:
      '„Švarūs šiaudai, minkštas čiužinys — atsigulsi kaip akmuo, atsikelsi kaip jaunas erelis!“',
    whenToUse:
      'Standartinė patogi nakvynė nuotykių ieškotojams po sunkios kovos dienos.',
  },
  {
    id: 'lodging-comfortable',
    category: 'lodging',
    name: 'Atskiras kambarys (su lova ir langu)',
    dndTerm: 'Inn (Comfortable)',
    price: '8 grašiai (8 SP)',
    description:
      'Atskiras mažas kambarėlis virš smuklės su tikra lova, vilnone antklode ir rankų praustuvu.',
    statsAndEffects:
      'Visiškai privatus Ilgasis poilsis (Long Rest) su rakinamomis durimis. Saugu tartis apie slaptus planus.',
    visualDescription:
      'Jaukus rąstinis kambarėlis su storu vilnoniu apklotu, vaško žvake, moliniu praustuvu ir geležine velke ant durų.',
    shopkeeperComment:
      '„Duodu raktą į rankas — niekas per slenkstį nežengs. Galite ramiai savo žemėlapius ir radinius apžiūrėti.“',
    whenToUse:
      'Kai grupei reikia privatumo aptarti slaptus reikalus, paslėpti radinius arba ramiai išsimiegoti be pašalinių akių.',
    counterHotspot: {
      x: 41,
      y: 78,
      width: 6,
      height: 11,
      label: 'Kambarių raktų ryšulys',
    },
  },
  {
    id: 'lodging-wealthy',
    category: 'lodging',
    name: 'Bajorų ložė / Saugi skrynios menė',
    dndTerm: 'Inn (Wealthy / Aristocratic)',
    price: '2 auksinai (2 GP)',
    description:
      'Didelis, šildytas kambarys su patvaria ąžuoline skrynia daiktams rakinti, kilimais ir švaria patalyne.',
    statsAndEffects:
      'Aukščiausio saugumo ir patogumo poilsis. Sunki kaustyta skrynia apsaugo brangius daiktus nuo vagysčių.',
    visualDescription:
      'Erdvi viršutinė menė su austais raštuotais kilimais, kailiniais patalais ir geležimi kaustyta ąžuoline skrynia.',
    shopkeeperComment:
      '„Čia apsistoja tik didikai ir žemaičių seniūnai. Skrynia su dviem spynomis — net pats velnias neatrakins!“',
    whenToUse:
      'Kai nešiojatės itin vertingas relikvijas ar dokumentus ir norite visiško saugumo.',
  },
  {
    id: 'lodging-bath',
    category: 'lodging',
    name: 'Pirtis / Prakaito kubilas',
    dndTerm: 'Bath',
    price: '1 grašis (1 SP)',
    description:
      'Karštas vanduo, vanta ir kubilas smuklės pirtelėje – nuplauna kelionės purvą ir suteikia žvalumo.',
    statsAndEffects:
      'Nuplauna pelkių dumblą, kraują ir kvapus. Padeda nedaryti neigiamo įspūdžio prieš susitikimą su kilmingaisiais ar dvasininkais.',
    visualDescription:
      'Dūminės pirtelės garas, kvepiantis beržinėmis ir kadaginėmis vantomis bei karštu ąžuoliniu kubilu.',
    shopkeeperComment:
      '„Iš pelkės išlindęs pas tijūną neisi! Išsikaitink pirtelėje, beržine vanta šonus išsiplak — kaip iš naujo gimęs būsi.“',
    whenToUse:
      'Po kovų pelkėse ar požemiuose, prieš einant į derybas, archyvą ar pas garbingus miestelio žmones.',
  },
];
