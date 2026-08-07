/*
 * photo-data.js
 * ------------------------------------------------------------------
 * Manuell geodata-fallback for Expeditions-kartet.
 *
 * Dette er en statisk side uten database og uten byggeprosess for
 * automatisk EXIF/GPS-uttrekk. PHOTO_LOCATIONS er derfor den
 * primære datakilden kartet bruker. Hvis bilder senere leveres med
 * GPS-data i EXIF, kan et eget script lese ut koordinater og
 * generere denne filen på nytt, men frontend krever ikke det for
 * å fungere.
 *
 * SLIK LEGGER DU TIL ET NYTT STED PÅ KARTET:
 * 1. Kopier ett av objektene under.
 * 2. Sett "title" (stedsnavn), "region" (fritekst, f.eks. "Norway"
 *    eller "Italy · Europe"), og "series" (navnet på samlingen
 *    bildet hører til, f.eks. "Northern Silence").
 * 3. Sett "lat" og "lng" til stedets koordinater (bruk f.eks.
 *    Google Maps: høyreklikk på stedet -> koordinatene kopieres).
 * 4. Sett "link" til ankeret for samlingen bildet hører til
 *    (som oftest "#collections").
 * 5. Lagre filen. Kartet på forsiden leser denne listen automatisk
 *    ved sidelasting, ingen andre filer må endres.
 *
 * Hvis et sted foreløpig ikke har bilder, kan du la det stå i
 * listen med series: "Coming soon" / "Kommer snart" - markøren
 * vises fortsatt, men uten å love bilder som ikke finnes ennå.
 */

var PHOTO_LOCATIONS = [
  {
    title: 'Lofoten',
    region: 'Norway',
    series: 'Northern Silence',
    lat: 68.1,
    lng: 13.6,
    link: '#collections'
  },
  {
    title: 'Rio de Janeiro',
    region: 'Brazil · Americas',
    series: 'Travel Notes',
    lat: -22.9068,
    lng: -43.1729,
    link: '#collections'
  },
  {
    title: 'Ocean Springs, Mississippi',
    region: 'USA · Americas',
    series: 'Travel Notes',
    lat: 30.4113,
    lng: -88.8259,
    link: '#collections'
  },
  {
    title: 'Paris',
    region: 'France · Europe',
    series: 'Coming soon',
    lat: 48.8566,
    lng: 2.3522,
    link: '#collections'
  },
  {
    title: 'Bangkok',
    region: 'Thailand · Asia/Pacific',
    series: 'Coming soon',
    lat: 13.7563,
    lng: 100.5018,
    link: '#collections'
  }
];
