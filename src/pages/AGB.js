import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/PageHero';

const sections = [
  {
    title: '1. Geltungsbereich',
    paragraphs: [
      'Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für alle Verträge zwischen MAPSOL, vertreten durch Mark-Antonio Bosnjak (nachfolgend "Anbieter"), und seinen Kunden (nachfolgend "Auftraggeber") für die Erbringung von Webentwicklungs- und Automatisierungs-Dienstleistungen.',
      'Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.',
    ],
  },
  {
    title: '2. Vertragsschluss',
    paragraphs: [
      'Die Darstellung der Dienstleistungen auf der Website stellt kein rechtlich bindendes Angebot, sondern eine unverbindliche Aufforderung zur Bestellung dar.',
      'Der Vertrag kommt durch die Annahme eines individuellen Angebots oder durch die Bestätigung eines Auftrags durch den Anbieter zustande. Angebote des Anbieters sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind.',
    ],
  },
  {
    title: '3. Leistungsumfang',
    paragraphs: [
      'Der Umfang der zu erbringenden Leistungen ergibt sich aus dem individuellen Angebot oder der Auftragsbestätigung. Änderungen oder Erweiterungen des Leistungsumfangs bedürfen der schriftlichen Vereinbarung.',
      'Der Anbieter bemüht sich, die vereinbarten Termine einzuhalten. Lieferfristen sind jedoch nur verbindlich, wenn sie vom Anbieter ausdrücklich schriftlich bestätigt wurden.',
    ],
  },
  {
    title: '4. Mitwirkungspflichten des Auftraggebers',
    paragraphs: [
      'Der Auftraggeber ist verpflichtet, dem Anbieter alle für die Durchführung des Auftrags notwendigen Informationen, Materialien und Zugangsdaten rechtzeitig zur Verfügung zu stellen.',
      'Der Auftraggeber stellt sicher, dass er über alle Rechte an den zur Verfügung gestellten Materialien verfügt und keine Rechte Dritter verletzt werden.',
    ],
  },
  {
    title: '5. Vergütung und Zahlungsbedingungen',
    paragraphs: [
      'Die Vergütung für die zu erbringenden Leistungen richtet sich nach dem individuellen Angebot oder der Auftragsbestätigung. Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer.',
      'Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zu zahlen, sofern nicht anders vereinbart. Bei Zahlungsverzug ist der Anbieter berechtigt, Verzugszinsen in gesetzlicher Höhe zu berechnen.',
    ],
  },
  {
    title: '6. Abnahme und Gewährleistung',
    paragraphs: [
      'Der Auftraggeber ist verpflichtet, die erbrachten Leistungen unverzüglich zu prüfen und abzunehmen. Die Abnahme gilt als erfolgt, wenn der Auftraggeber nicht innerhalb von 14 Tagen nach Bereitstellung der Leistung Mängel schriftlich rügt.',
      'Bei berechtigten Mängelrügen hat der Anbieter das Recht zur Nachbesserung. Schlägt die Nachbesserung fehl, kann der Auftraggeber Minderung verlangen oder vom Vertrag zurücktreten.',
    ],
  },
  {
    title: '7. Haftung',
    paragraphs: [
      'Der Anbieter haftet für Schäden nur bei Vorsatz und grober Fahrlässigkeit. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, es sei denn, es handelt sich um die Verletzung einer wesentlichen Vertragspflicht.',
      'Die Haftung ist in jedem Fall auf den vertragstypischen, vorhersehbaren Schaden begrenzt und umfasst nicht entgangenen Gewinn oder mittelbare Schäden.',
    ],
  },
  {
    title: '8. Urheberrechte und Nutzungsrechte',
    paragraphs: [
      'Alle im Rahmen der Leistungserbringung entstehenden urheberrechtlichen Nutzungsrechte an den erstellten Werken gehen erst nach vollständiger Zahlung der vereinbarten Vergütung auf den Auftraggeber über.',
      'Der Anbieter hat das Recht, auf erbrachte Leistungen als Referenz hinzuweisen und diese für eigene Werbezwecke zu nutzen, sofern nicht ausdrücklich anders vereinbart.',
    ],
  },
  {
    title: '9. Datenschutz',
    paragraphs: [
      'Der Anbieter erhebt, verarbeitet und nutzt personenbezogene Daten nur im Rahmen der gesetzlichen Bestimmungen. Nähere Informationen finden sich in der Datenschutzerklärung des Anbieters.',
    ],
  },
  {
    title: '10. Schlussbestimmungen',
    paragraphs: [
      'Es gilt das Recht der Schweizerischen Eidgenossenschaft unter Ausschluss des UN-Kaufrechts.',
      'Erfüllungsort und Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist Zürich, Schweiz, soweit gesetzlich zulässig.',
      'Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.',
    ],
  },
];

const AGB = () => {
  const stand = new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Box sx={{ pb: 10 }}>
      <Helmet>
        <title>Allgemeine Geschäftsbedingungen | MAPSOL</title>
        <meta name="description" content="Allgemeine Geschäftsbedingungen von MAPSOL - Lesen Sie unsere AGB für die Nutzung unserer Dienstleistungen." />
        <link rel="canonical" href="https://www.mapsol.ch/agb" />
      </Helmet>

      <PageHero
        eyebrow="MAPSOL"
        title="AGB"
        subtitle={`Allgemeine Geschäftsbedingungen — Stand: ${stand}.`}
      />

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            {sections.map((section, index) => (
              <Box key={section.title} sx={{ mb: index < sections.length - 1 ? 4 : 0 }}>
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  {section.title}
                </Typography>
                {section.paragraphs.map((p, i) => (
                  <Typography key={i} variant="body1" paragraph>
                    {p}
                  </Typography>
                ))}
              </Box>
            ))}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AGB;
