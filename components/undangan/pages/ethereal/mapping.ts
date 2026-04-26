export const etherealMapping = {
  "opening.title": ["user.opening.title", "default.openingTitle"],
  "opening.subtitle": ["user.opening.subtitle", "default.openingSubtitle"],
  "opening.buttonText": ["user.opening.buttonText", "default.openingButtonText"],

  "decorative.heroImage": ["user.decorative.heroImage", "default.decorativeHeroImage"],
  "decorative.groomImage": ["user.decorative.groomImage", "default.decorativeGroomImage"],
  "decorative.brideImage": ["user.decorative.brideImage", "default.decorativeBrideImage"],
  "decorative.ornamentStyle": ["user.decorative.ornamentStyle", "default.decorativeOrnamentStyle"],
  "decorative.accentColor": ["user.decorative.accentColor", "default.decorativeAccentColor"],
  "decorative.animation": ["user.decorative.animation", "default.decorativeAnimation"],

  "groom.fullName": ["user.groom.fullName", "default.groomName"],
  "groom.nickname": ["user.groom.nickname", "default.groomNickname"],
  "groom.father": ["user.groom.father", "default.groomFather"],
  "groom.mother": ["user.groom.mother", "default.groomMother"],
  "groom.instagram": ["user.groom.instagram", "default.groomInstagram"],

  "bride.fullName": ["user.bride.fullName", "default.brideName"],
  "bride.nickname": ["user.bride.nickname", "default.brideNickname"],
  "bride.father": ["user.bride.father", "default.brideFather"],
  "bride.mother": ["user.bride.mother", "default.brideMother"],
  "bride.instagram": ["user.bride.instagram", "default.brideInstagram"],

  "event.date": ["user.event.date", "default.eventDate"],
  "event.dateHijri": ["user.event.dateHijri", "default.eventDateHijri"],
  "event.location": ["user.event.location", "default.eventLocation"],

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

  "story.title": ["user.story.title", "default.storyTitle"],
  "story.meet": ["user.story.meet", "default.storyMeet"],
  "story.date": ["user.story.date", "default.storyDate"],
  "story.proposal": ["user.story.proposal", "default.storyProposal"],
  "story.wedding": ["user.story.wedding", "default.storyWedding"],

  "gift.title": ["user.gift.title", "default.giftTitle"],
  "gift.message": ["user.gift.message", "default.giftMessage"],
  "gift.account1Bank": ["user.gift.account1Bank", "default.giftAccount1Bank"],
  "gift.account1Number": ["user.gift.account1Number", "default.giftAccount1Number"],
  "gift.account1Name": ["user.gift.account1Name", "default.giftAccount1Name"],
  "gift.account2Bank": ["user.gift.account2Bank", "default.giftAccount2Bank"],
  "gift.account2Number": ["user.gift.account2Number", "default.giftAccount2Number"],
  "gift.account2Name": ["user.gift.account2Name", "default.giftAccount2Name"],
  "gift.qrisUrl": ["user.gift.qrisUrl", "default.giftQrisUrl"],

  "rsvp.title": ["user.rsvp.title", "default.rsvpTitle"],
  "rsvp.subtitle": ["user.rsvp.subtitle", "default.rsvpSubtitle"],

  "wishes.title": ["user.wishes.title", "default.wishesTitle"],
  "wishes.subtitle": ["user.wishes.subtitle", "default.wishesSubtitle"],

  "closing.message": ["user.closing.message", "default.closingMessage"],
  "closing.thankYou": ["user.closing.thankYou", "default.closingThankYou"],
  "closing.coupleNames": ["user.closing.coupleNames", "default.closingCoupleNames"],

  "music.url": ["user.music.url", "default.musicUrl"],
  "music.title": ["user.music.title", "default.musicTitle"],
  "music.artist": ["user.music.artist", "default.musicArtist"],
} as const;

export type EtherealField = keyof typeof etherealMapping;

