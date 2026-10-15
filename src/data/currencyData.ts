import { CurrencyEntry } from '../types';

export const CURRENCY_TITLE = 'LDK XV a. pinigai ir D&D 5e atitikmenys';

export const CURRENCY_INTRO =
  'Šiame pasaulyje atsiskaitymai vyksta Lietuvos Didžiosios Kunigaikštystės (Vytauto Didžiojo laikmečio) monetomis, kurios tiesiogiai atitinka standartinę D&D 5e pinigų sistemą:';

export const CURRENCY_DATA: CurrencyEntry[] = [
  {
    id: 'denaras',
    ltName: '1 Denaras (arba Penigas)',
    altName: 'Penigas',
    dndCode: '1 CP',
    dndFull: 'Copper Piece',
    conversion: 'Bazinis smulkus vienetas',
    description:
      'Smulkiausia moneta (Vytauto laikų mažas denaras su Gediminaičių stulpais arba ietigaliu). Naudojama kasdieniam duonos kepalui, bokalui alaus ar paprastai vakarienei įsigyti.',
    badgeColor: 'from-amber-800 to-orange-900 border-amber-600/60 text-amber-200',
  },
  {
    id: 'grasis',
    ltName: '1 Grašis (Prahos grašis)',
    altName: 'Prahos grašis',
    dndCode: '1 SP',
    dndFull: 'Silver Piece',
    conversion: '1 Grašis = 10 Denarų',
    description:
      'Pagrindinė kasdienės prekybos sidabrinė moneta (1 Grašis = 10 Denarų). Už kelis grašius gausite sočią užeigos vakarienę, kelionės davinį ar tvarkingą nakvynę.',
    badgeColor: 'from-slate-600 to-slate-800 border-slate-300/60 text-slate-100',
  },
  {
    id: 'auksinas',
    ltName: '1 Auksinas (Dukatas)',
    altName: 'Vengriškas dukatas / Puskapė grašių',
    dndCode: '1 GP',
    dndFull: 'Gold Piece',
    conversion: '1 Auksinas = 10 Grašių = 100 Denarų',
    description:
      'Didelės vertės vengriškas auksinis dukatas arba puskapė grašių (1 Auksinas = 10 Grašių = 100 Denarų). Tokiais pinigais atsiskaito pirkliai, bajorai ir patyrę nuotykių ieškotojai.',
    badgeColor: 'from-yellow-600 to-amber-700 border-yellow-300/80 text-yellow-100',
  },
  {
    id: 'kapa',
    ltName: '1 Sidabro lydinys (Kapa / Rublis)',
    altName: 'Kapa / Lietuviškas rublis',
    dndCode: '10 GP (1 PP)',
    dndFull: 'Platinum Piece',
    conversion: '1 Kapa = 10 Auksinų = 100 Grašių = 1000 Denarų',
    description:
      'Sunkus sidabro lydinys (kapa arba rublis), atitinkantis 10 GP (1 PP – Platinum Piece). Naudojamas stambiems sandoriams, žirgams, brangiems ginklams ar kunigaikščių dovanoms.',
    badgeColor: 'from-indigo-800 to-slate-900 border-indigo-300/70 text-indigo-100',
  },
];
