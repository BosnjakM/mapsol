import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PaymentsIcon from '@mui/icons-material/Payments';
import InsightsIcon from '@mui/icons-material/Insights';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SmsIcon from '@mui/icons-material/Sms';
import ReplyIcon from '@mui/icons-material/Reply';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';
import BackupIcon from '@mui/icons-material/Backup';
import LockIcon from '@mui/icons-material/Lock';
import SpeedIcon from '@mui/icons-material/Speed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TireRepairIcon from '@mui/icons-material/TireRepair';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import InboxIcon from '@mui/icons-material/Inbox';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

/*
 * Benachrichtigungen für das Handy oben in jedem Ratgeber-Artikel (Illustration, als „Beispiel“ beschriftet).
 * Pro Artikel über den Pfad, sonst passend zur Kategorie. Neuer Artikel ohne Eintrag = Kategorie-Standard.
 */

const KATEGORIE = {
  Website: {
    zeile: 'Donnerstag, unterwegs',
    meldungen: [
      { icon: LanguageIcon, app: 'Website', titel: 'Neue Anfrage', text: 'Offerte über das Kontaktformular' },
      { icon: PhoneIcon, app: 'Google', titel: 'Anruf über Google', text: 'Jemand hat Ihre Nummer angetippt', orange: true },
      { icon: EventAvailableIcon, app: 'Kalender', titel: 'Termin gebucht', text: 'Fr 10:00 · Erstberatung' },
      { icon: StarIcon, app: 'Google', titel: 'Neue Bewertung', text: '5 Sterne', orange: true },
    ],
  },
  Google: {
    zeile: 'Dienstag, im Betrieb',
    meldungen: [
      { icon: DirectionsIcon, app: 'Google Maps', titel: 'Route angefragt', text: 'Jemand ist auf dem Weg zu Ihnen' },
      { icon: PhoneIcon, app: 'Google Maps', titel: 'Anruf über Ihr Profil', text: 'Direkt aus der Karte', orange: true },
      { icon: StarIcon, app: 'Google', titel: 'Neue Bewertung', text: '5 Sterne' },
      { icon: LanguageIcon, app: 'Website', titel: 'Besuch über Google', text: 'Von Ihrem Unternehmensprofil', orange: true },
    ],
  },
  Garagen: {
    zeile: 'Montag, in der Werkstatt',
    meldungen: [
      { icon: TireRepairIcon, app: 'Online-Buchung', titel: 'Service gebucht', text: 'Mo 07:30 · Reifenwechsel' },
      { icon: DirectionsCarIcon, app: 'Website', titel: 'Anfrage zu einer Occasion', text: 'Probefahrt am Samstag?', orange: true },
      { icon: PhoneIcon, app: 'Google Maps', titel: 'Anruf über Google', text: 'Suche „Garage in der Nähe“' },
      { icon: StarIcon, app: 'Google', titel: 'Neue Bewertung', text: '5 Sterne nach dem Service', orange: true },
    ],
  },
  'Online-Buchung': {
    zeile: 'Freitag, im Salon',
    meldungen: [
      { icon: EventAvailableIcon, app: 'Online-Buchung', titel: 'Neuer Termin', text: 'Do 14:00 · Haarschnitt' },
      { icon: NotificationsActiveIcon, app: 'Erinnerung', titel: 'Erinnerung verschickt', text: 'An alle Termine von morgen', orange: true },
      { icon: EventRepeatIcon, app: 'Online-Buchung', titel: 'Termin verschoben', text: 'Kundin hat selbst auf Fr 11:00 verschoben' },
      { icon: EventAvailableIcon, app: 'Online-Buchung', titel: 'Lücke wieder gefüllt', text: 'Abgesagter Termin neu gebucht', orange: true },
    ],
  },
  Automatisierung: {
    zeile: 'Montag, im Büro',
    meldungen: [
      { icon: MarkEmailReadIcon, app: 'Website', titel: 'Neue Anfrage', text: 'Automatisch als Kontakt erfasst' },
      { icon: RequestQuoteIcon, app: 'Automatisierung', titel: 'Offertenentwurf bereit', text: 'Nur noch prüfen und senden', orange: true },
      { icon: PaymentsIcon, app: 'Buchhaltung', titel: 'Zahlung eingegangen', text: 'Rechnung als bezahlt markiert' },
      { icon: InsightsIcon, app: 'Wochenbericht', titel: 'Ihre Woche auf einen Blick', text: 'Umsatz, Offerten, offene Rechnungen', orange: true },
    ],
  },
};

const ARTIKEL = {
  '/ratgeber/bexio-automatisieren': {
    zeile: 'Montag, im Büro',
    meldungen: [
      { icon: MarkEmailReadIcon, app: 'Website', titel: 'Neue Anfrage', text: 'Offerte für einen Badumbau' },
      { icon: PersonAddIcon, app: 'bexio', titel: 'Kontakt angelegt', text: 'Ohne Abtippen, ohne Duplikat', orange: true },
      { icon: RequestQuoteIcon, app: 'bexio', titel: 'Offertenentwurf bereit', text: 'Nur noch prüfen und senden' },
      { icon: PaymentsIcon, app: 'bexio', titel: 'Zahlung zugeordnet', text: 'Rechnung als bezahlt markiert', orange: true },
    ],
  },
  '/ratgeber/ki-automatisierung-kmu': {
    zeile: 'Mittwoch, im Büro',
    meldungen: [
      { icon: InboxIcon, app: 'Postfach', titel: 'Anfrage erkannt', text: 'Mail sortiert und zugeordnet' },
      { icon: EditNoteIcon, app: 'Assistent', titel: 'Antwortentwurf bereit', text: 'Bitte prüfen, dann senden', orange: true },
      { icon: ReceiptLongIcon, app: 'Buchhaltung', titel: 'Beleg abgelegt', text: 'Rechnung aus dem Postfach erfasst' },
      { icon: EventAvailableIcon, app: 'Kalender', titel: 'Termin eingetragen', text: 'Aus der Kundenmail übernommen', orange: true },
    ],
  },
  '/ratgeber/was-kostet-eine-website-schweiz': {
    zeile: 'Donnerstag, unterwegs',
    meldungen: [
      { icon: RocketLaunchIcon, app: 'Website', titel: 'Ihre Website ist online', text: 'Fixpreis, wie offeriert' },
      { icon: LanguageIcon, app: 'Website', titel: 'Neue Anfrage', text: 'Offerte über das Kontaktformular', orange: true },
      { icon: PhoneIcon, app: 'Google', titel: 'Anruf über Google', text: 'Jemand hat Ihre Nummer angetippt' },
      { icon: EventAvailableIcon, app: 'Kalender', titel: 'Termin gebucht', text: 'Fr 10:00 · Erstberatung', orange: true },
    ],
  },
  '/ratgeber/wix-jimdo-oder-website-erstellen-lassen': {
    zeile: 'Dienstag, im Betrieb',
    meldungen: [
      { icon: LanguageIcon, app: 'Website', titel: 'Neue Anfrage', text: 'Offerte für einen Küchenumbau' },
      { icon: TravelExploreIcon, app: 'Google', titel: 'Besuch über die Suche', text: '„Schreiner Winterthur“', orange: true },
      { icon: PhoneIcon, app: 'Google', titel: 'Anruf über Google', text: 'Direkt aus den Suchergebnissen' },
      { icon: EventAvailableIcon, app: 'Kalender', titel: 'Termin gebucht', text: 'Mo 08:00 · Besichtigung', orange: true },
    ],
  },
  '/ratgeber/website-wartung-schweiz': {
    zeile: 'Sonntag, in der Nacht',
    uhrzeit: '03:12',
    meldungen: [
      { icon: SecurityUpdateGoodIcon, app: 'Wartung', titel: 'Updates installiert', text: 'Sicherheitsupdates eingespielt' },
      { icon: BackupIcon, app: 'Wartung', titel: 'Backup erstellt', text: 'Nächtliche Sicherung erfolgreich', orange: true },
      { icon: LockIcon, app: 'Wartung', titel: 'SSL-Zertifikat erneuert', text: 'Verbindung bleibt verschlüsselt' },
      { icon: SpeedIcon, app: 'Wartung', titel: 'Website geprüft', text: 'Erreichbar, schnell, Formular funktioniert', orange: true },
    ],
  },
  '/ratgeber/website-relaunch': {
    zeile: 'Mittwoch, Relaunch-Tag',
    meldungen: [
      { icon: RocketLaunchIcon, app: 'Website', titel: 'Neue Website ist live', text: 'Auf allen Geräten geprüft' },
      { icon: AltRouteIcon, app: 'Weiterleitungen', titel: 'Alte Adressen umgeleitet', text: 'Keine Seite läuft ins Leere', orange: true },
      { icon: TravelExploreIcon, app: 'Search Console', titel: 'Sitemap eingereicht', text: 'Google kennt die neuen Seiten' },
      { icon: LanguageIcon, app: 'Website', titel: 'Erste Anfrage', text: 'Über die neue Website', orange: true },
    ],
  },
  '/ratgeber/google-unternehmensprofil-anleitung': {
    zeile: 'Dienstag, im Betrieb',
    meldungen: [
      { icon: PlaceIcon, app: 'Google', titel: 'Profil bestätigt', text: 'Ihr Betrieb erscheint in Maps' },
      { icon: PhotoCameraIcon, app: 'Google', titel: 'Fotos veröffentlicht', text: 'Team, Räume und Arbeit', orange: true },
      { icon: DirectionsIcon, app: 'Google Maps', titel: 'Route angefragt', text: 'Jemand ist auf dem Weg zu Ihnen' },
      { icon: PhoneIcon, app: 'Google Maps', titel: 'Anruf über Ihr Profil', text: 'Direkt aus der Karte', orange: true },
    ],
  },
  '/ratgeber/google-bewertungen-sammeln': {
    zeile: 'Freitag, Feierabend',
    uhrzeit: '17:48',
    meldungen: [
      { icon: SmsIcon, app: 'Nachrichten', titel: 'Bewertungslink gesendet', text: 'Nach dem abgeschlossenen Auftrag' },
      { icon: StarIcon, app: 'Google', titel: 'Neue Bewertung', text: '5 Sterne', orange: true },
      { icon: ReplyIcon, app: 'Google', titel: 'Antwort veröffentlicht', text: 'Persönlich, mit Namen' },
      { icon: StarIcon, app: 'Google', titel: 'Neue Bewertung', text: '4 Sterne mit Foto', orange: true },
    ],
  },
  '/ratgeber/online-terminbuchung-kmu': KATEGORIE['Online-Buchung'],
  '/ratgeber/garage-marketing-schweiz': KATEGORIE.Garagen,
};

export const handyFuer = (a) => ARTIKEL[a.pfad] || KATEGORIE[a.kategorie] || KATEGORIE.Website;
