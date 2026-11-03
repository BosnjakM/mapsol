import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { addContactRequest } from '../firebase/contactRequests';
import { Seite, Reihen } from '../components/Seite';
import { TELEFON, TELEFON_TEXT, FOTO } from '../components/premium';

// Werte bleiben 'web' und 'automation', weil das Admin-Dashboard und die Mail-Vorlagen damit arbeiten
const LEISTUNGEN = [
  { wert: 'web', text: 'Website' },
  { wert: 'automation', text: 'Automatisierung & KI' },
];

const DANACH = [
  { titel: 'Sie schreiben mir', text: 'Ein paar Sätze reichen: was Sie vorhaben oder wo es heute hakt.' },
  { titel: 'Ich antworte persönlich', text: 'In der Regel innerhalb von 24 Stunden, direkt von mir.' },
  { titel: 'Wir reden 15 Minuten', text: 'Am Telefon, per Video oder vor Ort. Kostenlos und unverbindlich.' },
];

const Kontakt = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    message: '',
    service: 'web' // web oder automation
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (newService) => {
    setFormData(prev => ({
      ...prev,
      service: newService
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // EmailJS-Parameter
    const serviceId = 'service_afpfy1j'; // Service-ID
    const templateId = 'template_fw9x2wq'; // Template-ID für Kunden-Bestätigung (BITTE AKTUALISIEREN)
    const publicKey = 'KO9HWxyOS-h0kfPdY'; // Public Key (BITTE PRÜFEN ob noch gültig)

    // EmailJS konfigurieren
    emailjs.init(publicKey);

    // Zusätzliche Informationen vorbereiten
    const form = e.target;
    form.service.value = formData.service; // Service-Typ zum Formular hinzufügen

    // Formular mit EmailJS senden (E-Mail an Kunden)
    emailjs.sendForm(serviceId, templateId, form, publicKey)
      .then(async (result) => {

        // Kontaktanfrage in Firestore speichern
        const contactRequest = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          subject: formData.subject,
          message: formData.message,
          service: formData.service,
        };

        // In Firestore speichern
        try {
          await addContactRequest(contactRequest);
        } catch (firestoreError) {
          console.error('Fehler beim Speichern in Firestore:', firestoreError);
          // Weiter machen, auch wenn Firestore fehlschlägt
        }

        // Weiterleitung zur Danke-Seite
        setLoading(false);
        navigate('/danke');

        // Admin-Benachrichtigung an contact@mapsol.ch senden
        // WICHTIG: In EmailJS muss das Template "To Email" FEST auf contact@mapsol.ch eingestellt sein!
        const adminTemplateId = 'template_gvq1rpc'; // Template-ID für Admin-Benachrichtigung (BITTE AKTUALISIEREN)
        const adminTemplateParams = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Nicht angegeben',
          service: formData.service === 'web' ? 'Web-Applikation' : 'Workflow-Automatisierung',
          subject: `🔔 Neue Kontaktanfrage: ${formData.subject}`,
          message: formData.message
        };

        // Admin-Benachrichtigung asynchron senden (blockiert nicht den Erfolg)
        emailjs.send(serviceId, adminTemplateId, adminTemplateParams, publicKey)
          .catch((adminError) => {
            console.error('Admin-Benachrichtigung fehlgeschlagen:', adminError);
            // Fehler wird ignoriert, da Kunden-E-Mail bereits erfolgreich war
          });
      })
      .catch((error) => {
        console.error('Fehler beim Senden der E-Mail:', error.text);
        setError('Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.');
        setLoading(false);
      });
  };

  return (
    <Seite>
      <Helmet>
        <title>Kontakt - MAPSOL</title>
        <meta name="description" content="Kostenloses Erstgespräch mit MAPSOL: Websites, KI-Automatisierung und Schulungen für KMU. Per Formular, E-Mail oder Telefon." />
        <link rel="canonical" href="https://www.mapsol.ch/kontakt" />
      </Helmet>

      <section className="m-sk m-kontakt-kopf">
        <div className="m-wrap">
          <span className="m-label m-sk-rubrik">Kontakt</span>
          <div className="m-kontakt-raster">
            <div className="m-kontakt-titel">
              <h1 className="m-sk-titel">Lassen Sie uns <span className="m-verlauf">reden.</span></h1>
              <p className="m-lead m-sk-lead">Das Erstgespräch ist kostenlos und unverbindlich. Schreiben Sie mir kurz, worum es geht.</p>
            </div>

            <form className="m-form m-panel m-kontakt-form" onSubmit={handleSubmit} aria-label="Kontaktformular">
              <h2 className="m-panel-titel">Nachricht schreiben</h2>
              {error && <p className="m-fehler" role="alert">{error}</p>}

              <fieldset className="m-wahl">
                <legend>Wofür interessieren Sie sich?</legend>
                <input type="hidden" name="service" value={formData.service} />
                <div className="m-wahl-knoepfe">
                  {LEISTUNGEN.map((l) => (
                    <button
                      type="button"
                      key={l.wert}
                      aria-pressed={formData.service === l.wert}
                      onClick={() => handleServiceChange(l.wert)}
                    >
                      {l.text}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="m-form-2">
                <label>
                  Name
                  <input name="name" autoComplete="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                  E-Mail
                  <input name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} required />
                </label>
              </div>
              <label>
                Betreff
                <input name="subject" value={formData.subject} onChange={handleChange} required />
              </label>
              <label>
                Nachricht
                <textarea name="message" value={formData.message} onChange={handleChange} rows={6} required />
              </label>

              <button type="submit" className="m-tlink m-tlink-gross" disabled={loading}>
                {loading ? 'Wird gesendet …' : <>Nachricht senden <span className="m-pfeil" aria-hidden="true">→</span></>}
              </button>
            </form>

            <div className="m-kontakt-danach">
              <div className="m-person-kopf">
                <img src={FOTO} alt="" width="56" height="56" />
                <div>
                  <b>Mark-Antonio Bosnjak</b>
                  <span>Sie schreiben direkt mir.</span>
                </div>
              </div>
              <span className="m-label">So geht es weiter</span>
              <Reihen eintraege={DANACH} versetzt={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Für alle, die lieber direkt anrufen oder mailen */}
      <section className="m-direkt" aria-label="Direkter Kontakt">
        <div className="m-wrap m-direkt-in">
          <a className="m-direkt-feld" href={`tel:${TELEFON}`}>
            <span className="m-label">Lieber anrufen?</span>
            <b>{TELEFON_TEXT}</b>
          </a>
          <a className="m-direkt-feld" href="mailto:contact@mapsol.ch">
            <span className="m-label">Oder per E-Mail</span>
            <b>contact@mapsol.ch</b>
          </a>
          <div className="m-direkt-feld">
            <span className="m-label">Standort</span>
            <b>Neftenbach ZH</b>
            <span>Gespräche vor Ort oder per Video, in der ganzen Deutschschweiz.</span>
          </div>
        </div>
      </section>
    </Seite>
  );
};

export default Kontakt;
