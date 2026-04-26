export const islamiLuxMapping = {
  "opening.bismillah": ["default.openingBismillah"],
  "opening.salam": ["default.openingSalam"],

  "decorative.heroImage": ["user.decorative.heroImage", "default.decorativeHeroImage"],
  "decorative.groomImage": ["user.decorative.groomImage", "default.decorativeGroomImage"],
  "decorative.brideImage": ["user.decorative.brideImage", "default.decorativeBrideImage"],
  "decorative.ornamentStyle": ["user.decorative.ornamentStyle", "default.decorativeOrnamentStyle"],
  "decorative.accentColor": ["user.decorative.accentColor", "default.decorativeAccentColor"],

  "quran.verse": ["user.quran.verse", "default.quranVerse"],
  "quran.translation": ["user.quran.translation", "default.quranTranslation"],

  "groom.fullName": ["user.groom.fullName", "default.groomName"],
  "groom.nickname": ["user.groom.nickname", "default.groomNickname"],
  "groom.father": ["user.groom.father", "default.groomFather"],
  "groom.mother": ["user.groom.mother", "default.groomMother"],

  "bride.fullName": ["user.bride.fullName", "default.brideName"],
  "bride.nickname": ["user.bride.nickname", "default.brideNickname"],
  "bride.father": ["user.bride.father", "default.brideFather"],
  "bride.mother": ["user.bride.mother", "default.brideMother"],

  "event.date": ["user.event.date", "default.eventDate"],
  "event.dateHijri": ["user.event.dateHijri", "default.eventDateHijri"],
  "event.location": ["user.event.location", "default.location"],

  "akad.date": ["user.akad.date", "default.akadDate"],
  "akad.time": ["user.akad.time", "default.akadTime"],
  "akad.location": ["user.akad.location", "default.akadLocation"],
  "akad.address": ["user.akad.address", "default.akadAddress"],
  "akad.mapUrl": ["user.akad.mapUrl", "default.akadMapUrl"],

  "resepsi.date": ["user.resepsi.date", "default.resepsiDate"],
  "resepsi.time": ["user.resepsi.time", "default.resepsiTime"],
  "resepsi.location": ["user.resepsi.location", "default.resepsiLocation"],
  "resepsi.address": ["user.resepsi.address", "default.resepsiAddress"],
  "resepsi.mapUrl": ["user.resepsi.mapUrl", "default.resepsiMapUrl"],

  "dressCode": ["user.dressCode", "default.dressCode"],
  "message": ["user.message", "default.message"],

  "hadith": ["user.hadith", "default.hadith"],
  "hadith.translation": ["user.hadithTranslation", "default.hadithTranslation"],
  "doa": ["user.doa", "default.doa"],
  "doa.translation": ["user.doaTranslation", "default.doaTranslation"],

  "closing.message": ["user.closing.message", "default.closingMessage"],
} as const;

export type IslamiLuxField = keyof typeof islamiLuxMapping;
export type ThemeMapping = Record<string, readonly string[]>;

