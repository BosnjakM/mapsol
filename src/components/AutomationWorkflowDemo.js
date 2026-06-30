import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Grid,
  Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import RuleIcon from '@mui/icons-material/Rule';
import EmailIcon from '@mui/icons-material/Email';
import StorageIcon from '@mui/icons-material/Storage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import BoltIcon from '@mui/icons-material/Bolt';
import TimerIcon from '@mui/icons-material/Timer';
import SavingsIcon from '@mui/icons-material/Savings';

const scenarios = [
  {
    id: 'web',
    label: 'Website-Anfrage',
    name: 'Laura Meier',
    company: 'Ristorante Bellavista',
    message:
      'Hallo, wir brauchen eine moderne Website für unser Restaurant in Zürich. Budget ca. 5000 CHF, eher dringend.',
  },
  {
    id: 'auto',
    label: 'Automatisierung',
    name: 'Thomas Keller',
    company: 'Keller Logistik AG',
    message:
      'Wir verlieren viel Zeit mit manueller Dateneingabe zwischen CRM und Buchhaltung. Könnt ihr diesen Prozess automatisieren?',
  },
  {
    id: 'general',
    label: 'Kurze Frage',
    name: 'Sandra Huber',
    company: '',
    message: 'Was kostet eine kleine Landingpage?',
  },
];

const MANUAL_MINUTES = 12;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const analyzeLead = ({ name, company, message }) => {
  const text = `${message}`.toLowerCase();
  const categories = {
    website: ['website', 'webseite', 'landingpage', 'shop', 'online', 'web '],
    automation: ['automatisier', 'crm', 'prozess', 'dateneingabe', 'workflow', 'integration', 'buchhaltung'],
    urgency: ['dringend', 'schnell', 'asap', 'sofort'],
    budget: ['budget', 'chf', 'franken', 'kosten', 'preis'],
  };

  const matched = (list) => list.some((kw) => text.includes(kw));
  const hasWebsite = matched(categories.website);
  const hasAutomation = matched(categories.automation);
  const hasUrgency = matched(categories.urgency);
  const hasBudget = matched(categories.budget);

  let score = 10;
  if (company.trim()) score += 20;
  if (message.trim().length > 60) score += 15;
  if (hasWebsite) score += 20;
  if (hasAutomation) score += 20;
  if (hasUrgency) score += 10;
  if (hasBudget) score += 10;
  score = Math.min(score, 100);

  let interest = 'Allgemeine Anfrage';
  if (hasAutomation && hasWebsite) interest = 'Web & Automatisierung';
  else if (hasAutomation) interest = 'Workflow-Automatisierung';
  else if (hasWebsite) interest = 'Webentwicklung';

  const qualified = score >= 50;
  const firstName = (name.trim().split(' ')[0]) || 'dort';

  const email = {
    subject: `Ihre Anfrage bei MAPSOL – ${interest}`,
    body: `Hallo ${firstName},

vielen Dank für Ihre Anfrage${company.trim() ? ` von ${company.trim()}` : ''}. Sehr gerne besprechen wir Ihr Anliegen (${interest}) in einem kostenlosen 15-minütigen Erstgespräch.

Passt Ihnen diese Woche ein kurzer Call?

Beste Grüsse
MAPSOL – Modern AI Platform Solutions`,
  };

  const crm = {
    Name: name.trim() || '—',
    Firma: company.trim() || '—',
    Interesse: interest,
    'Lead-Score': `${score}/100`,
    Status: qualified ? 'Qualifiziert' : 'Beobachten',
    Quelle: 'Website-Formular',
    'Nächster Schritt': qualified ? 'Erstgespräch planen' : 'Follow-up in 7 Tagen',
  };

  return { score, interest, qualified, email, crm };
};

const steps = [
  { id: 'inbox', title: 'Anfrage eingegangen', short: 'Anfrage', icon: <MoveToInboxIcon />, color: '#0088ff' },
  { id: 'qualify', title: 'Qualifizierung', short: 'Prüfung', icon: <RuleIcon />, color: '#00aaff' },
  { id: 'email', title: 'E-Mail-Entwurf', short: 'E-Mail', icon: <EmailIcon />, color: '#ff7a33' },
  { id: 'crm', title: 'CRM-Eintrag', short: 'CRM', icon: <StorageIcon />, color: '#ff5500' },
];

const AutomationWorkflowDemo = () => {
  const [form, setForm] = useState(scenarios[1]);
  const [activeScenario, setActiveScenario] = useState(scenarios[1].id);
  const [stepStates, setStepStates] = useState(['idle', 'idle', 'idle', 'idle']);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [savedMin, setSavedMin] = useState(0);
  const runIdRef = useRef(0);
  const timerRef = useRef(null);
  const savedTimerRef = useRef(null);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearInterval(savedTimerRef.current);
  }, []);

  const handleScenario = (scenario) => {
    if (running) return;
    setActiveScenario(scenario.id);
    setForm(scenario);
    reset();
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const setStep = (index, state) => {
    setStepStates((prev) => {
      const next = [...prev];
      next[index] = state;
      return next;
    });
  };

  const runWorkflow = async () => {
    if (running) return;
    const myRun = ++runIdRef.current;
    clearInterval(timerRef.current);
    clearInterval(savedTimerRef.current);
    setRunning(true);
    setDone(false);
    setResult(null);
    setStepStates(['idle', 'idle', 'idle', 'idle']);
    setProgress(0);
    setElapsed(0);
    setSavedMin(0);

    const start = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed((Date.now() - start) / 1000);
    }, 70);

    const data = analyzeLead(form);

    for (let i = 0; i < steps.length; i += 1) {
      if (runIdRef.current !== myRun) {
        clearInterval(timerRef.current);
        return;
      }
      setStep(i, 'processing');
      setProgress((i / (steps.length - 1)) * 100);
      await sleep(950);
      if (runIdRef.current !== myRun) {
        clearInterval(timerRef.current);
        return;
      }
      setStep(i, 'done');
      if (i === 1) setResult((prev) => ({ ...(prev || {}), score: data.score, interest: data.interest, qualified: data.qualified }));
      if (i === 2) setResult((prev) => ({ ...(prev || {}), email: data.email }));
      if (i === 3) setResult((prev) => ({ ...(prev || {}), crm: data.crm }));
      await sleep(220);
    }

    clearInterval(timerRef.current);
    setProgress(100);
    setRunning(false);
    setDone(true);

    let s = 0;
    savedTimerRef.current = setInterval(() => {
      s += 1;
      setSavedMin(s);
      if (s >= MANUAL_MINUTES) clearInterval(savedTimerRef.current);
    }, 45);
  };

  const reset = () => {
    runIdRef.current += 1;
    clearInterval(timerRef.current);
    clearInterval(savedTimerRef.current);
    setRunning(false);
    setDone(false);
    setStepStates(['idle', 'idle', 'idle', 'idle']);
    setResult(null);
    setProgress(0);
    setElapsed(0);
    setSavedMin(0);
  };

  const renderStepContent = (stepId) => {
    if (stepId === 'inbox') {
      return (
        <Box>
          <Typography variant="body2" fontWeight={600}>{form.name || '—'}</Typography>
          {form.company && (
            <Typography variant="caption" color="text.secondary">{form.company}</Typography>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
            „{form.message}"
          </Typography>
        </Box>
      );
    }
    if (stepId === 'qualify' && result?.score != null) {
      return (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight={600}>Lead-Score</Typography>
            <Typography variant="body2" fontWeight={700} sx={{ color: result.qualified ? '#0088ff' : '#ff7a33' }}>
              {result.score}/100
            </Typography>
          </Box>
          <Box sx={{ height: 8, borderRadius: 4, bgcolor: 'divider', overflow: 'hidden', mb: 1.5 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.score}%` }}
              transition={{ duration: 0.6 }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #0088ff, #ff5500)' }}
            />
          </Box>
          <Chip
            size="small"
            label={result.qualified ? 'Qualifiziert' : 'Beobachten'}
            sx={{
              fontWeight: 600,
              color: '#fff',
              bgcolor: result.qualified ? '#0088ff' : '#ff7a33',
            }}
          />
          <Chip size="small" label={result.interest} variant="outlined" sx={{ ml: 1, fontWeight: 600 }} />
        </Box>
      );
    }
    if (stepId === 'email' && result?.email) {
      return (
        <Box>
          <Typography variant="caption" color="text.secondary">Betreff</Typography>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>{result.email.subject}</Typography>
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 1.5,
              borderRadius: 1.5,
              bgcolor: 'action.hover',
              fontSize: '0.72rem',
              fontFamily: 'inherit',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.55,
              color: 'text.secondary',
            }}
          >
            {result.email.body}
          </Box>
        </Box>
      );
    }
    if (stepId === 'crm' && result?.crm) {
      return (
        <Box>
          {Object.entries(result.crm).map(([key, value], i) => (
            <Box
              key={key}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1,
                py: 0.5,
                borderBottom: i < Object.keys(result.crm).length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Typography variant="caption" color="text.secondary">{key}</Typography>
              <Typography variant="caption" fontWeight={600} sx={{ textAlign: 'right' }}>{value}</Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return (
      <Typography variant="caption" color="text.secondary">
        Wartet auf Verarbeitung…
      </Typography>
    );
  };

  const metrics = [
    {
      icon: <TimerIcon sx={{ fontSize: 20 }} />,
      label: 'Bearbeitungszeit',
      value: `${elapsed.toFixed(1)}s`,
      color: '#0088ff',
    },
    {
      icon: <BoltIcon sx={{ fontSize: 20 }} />,
      label: 'Automatisierte Schritte',
      value: `${stepStates.filter((s) => s === 'done').length}/4`,
      color: '#00aaff',
    },
    {
      icon: <SavingsIcon sx={{ fontSize: 20 }} />,
      label: 'Zeit gespart',
      value: done ? `~${savedMin} Min` : '—',
      color: '#ff5500',
    },
  ];

  return (
    <Box>
      {/* Console / input */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(90deg, #0088ff, #ff5500)',
          }}
        />
        <Typography variant="overline" sx={{ letterSpacing: 1.5, fontWeight: 700, color: 'primary.main' }}>
          Interaktive Demo · von der Anfrage zum CRM
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7 }}>
          Eine Kundenanfrage kommt rein — lesen, qualifizieren, antworten, ins CRM eintragen.
          Was manuell ~{MANUAL_MINUTES} Minuten dauert, erledigt ein automatisierter Workflow in Sekunden,
          ohne dass ein Schritt vergessen wird. Wählen Sie ein Beispiel und starten Sie.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
          {scenarios.map((s) => (
            <Chip
              key={s.id}
              label={s.label}
              onClick={() => handleScenario(s)}
              variant={activeScenario === s.id ? 'filled' : 'outlined'}
              color={activeScenario === s.id ? 'primary' : 'default'}
              sx={{ fontWeight: 600, cursor: running ? 'default' : 'pointer' }}
            />
          ))}
        </Box>

        <Grid container spacing={2} sx={{ mb: 2.5 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Name" value={form.name} onChange={handleChange('name')} disabled={running} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Firma" value={form.company} onChange={handleChange('company')} disabled={running} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Nachricht" value={form.message} onChange={handleChange('message')} multiline minRows={2} disabled={running} />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={runWorkflow}
            disabled={running}
            startIcon={running ? <AutorenewIcon className="spin" /> : <PlayArrowIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(90deg, #0088ff, #0066cc)',
              '& .spin': { animation: 'spin 1s linear infinite' },
              '@keyframes spin': { '100%': { transform: 'rotate(360deg)' } },
            }}
          >
            {running ? 'Workflow läuft…' : 'Workflow starten'}
          </Button>
          <Button
            variant="outlined"
            onClick={reset}
            disabled={running}
            startIcon={<ReplayIcon />}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Zurücksetzen
          </Button>
        </Box>
      </Paper>

      {/* Live metrics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {metrics.map((m) => (
          <Grid item xs={4} key={m.label}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, md: 2 },
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                textAlign: 'center',
              }}
            >
              <Box sx={{ color: m.color, display: 'flex', justifyContent: 'center', mb: 0.5 }}>{m.icon}</Box>
              <Typography variant="h6" fontWeight={800} sx={{ color: m.color, lineHeight: 1.1, fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
                {m.value}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                {m.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Animated pipeline */}
      <Box sx={{ position: 'relative', mb: 3, px: 0.5 }}>
        {/* track */}
        <Box sx={{ position: 'absolute', top: 24, left: 24, right: 24, height: 3, borderRadius: 2, bgcolor: 'divider', zIndex: 0 }} />
        {/* fill */}
        <Box
          sx={{
            position: 'absolute',
            top: 24,
            left: 24,
            height: 3,
            borderRadius: 2,
            width: `calc((100% - 48px) * ${progress / 100})`,
            background: 'linear-gradient(90deg, #0088ff, #ff5500)',
            transition: 'width 0.9s ease',
            zIndex: 1,
          }}
        />
        {/* traveling glow */}
        {(running || done) && (
          <Box
            sx={{
              position: 'absolute',
              top: 24,
              left: `calc(24px + (100% - 48px) * ${progress / 100})`,
              transform: 'translate(-50%, -50%)',
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 0 0 4px rgba(0,136,255,0.25), 0 0 16px 4px rgba(255,85,0,0.5)',
              transition: 'left 0.9s ease',
              zIndex: 3,
            }}
          />
        )}

        {/* nodes */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
          {steps.map((step, index) => {
            const state = stepStates[index];
            const isDone = state === 'done';
            const isProcessing = state === 'processing';
            const activeColor = isDone || isProcessing ? step.color : undefined;
            return (
              <Box key={step.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 64 }}>
                <Box sx={{ position: 'relative', width: 48, height: 48 }}>
                  {isProcessing && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.7 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: `2px solid ${step.color}`,
                      }}
                    />
                  )}
                  <motion.div
                    animate={isProcessing ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={isProcessing ? { duration: 0.9, repeat: Infinity } : { duration: 0.3 }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: activeColor ? '#fff' : step.color,
                      background: activeColor || `${step.color}14`,
                      border: `2px solid ${activeColor || 'transparent'}`,
                      boxShadow: isProcessing ? `0 0 18px ${step.color}80` : 'none',
                    }}
                  >
                    {isDone ? <CheckCircleIcon /> : isProcessing ? (
                      <AutorenewIcon sx={{ animation: 'spin 1s linear infinite', '@keyframes spin': { '100%': { transform: 'rotate(360deg)' } } }} />
                    ) : step.icon}
                  </motion.div>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    fontWeight: isDone || isProcessing ? 700 : 500,
                    color: isDone || isProcessing ? step.color : 'text.secondary',
                    textAlign: 'center',
                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                  }}
                >
                  {step.short}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Success banner */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Box
              sx={{
                mb: 3,
                p: 2.5,
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: 'rgba(0,136,255,0.3)',
                background: 'linear-gradient(135deg, rgba(0,136,255,0.1), rgba(255,85,0,0.08))',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <CheckCircleIcon sx={{ color: '#0088ff', fontSize: 32 }} />
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography variant="subtitle1" fontWeight={800}>
                  Anfrage vollautomatisch bearbeitet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In {elapsed.toFixed(1)}s erledigt · ~{savedMin} Min Handarbeit gespart · 0 vergessene Schritte
                </Typography>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail cards */}
      <Grid container spacing={2}>
        {steps.map((step, index) => {
          const state = stepStates[index];
          const isDone = state === 'done';
          const isProcessing = state === 'processing';
          return (
            <Grid item xs={12} sm={6} md={3} key={step.id}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                style={{ height: '100%' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    height: '100%',
                    borderRadius: 2.5,
                    border: '1px solid',
                    borderColor: isDone || isProcessing ? step.color : 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                    boxShadow: isProcessing ? `0 8px 28px ${step.color}33` : 'none',
                    transform: isProcessing ? 'translateY(-3px)' : 'none',
                    opacity: state === 'idle' ? 0.85 : 1,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: step.color,
                      transform: isDone || isProcessing ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isDone || isProcessing ? '#fff' : step.color,
                        background: isDone || isProcessing ? step.color : `${step.color}14`,
                        transition: 'all 0.3s ease',
                        '& .MuiSvgIcon-root': { fontSize: 20 },
                      }}
                    >
                      {isProcessing ? (
                        <AutorenewIcon sx={{ animation: 'spin 1s linear infinite', '@keyframes spin': { '100%': { transform: 'rotate(360deg)' } } }} />
                      ) : isDone ? (
                        <CheckCircleIcon />
                      ) : (
                        step.icon
                      )}
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1 }}>
                        Schritt {index + 1}
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {step.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mb: 1.5 }} />
                  <Box sx={{ minHeight: 90 }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={state + (result ? 'r' : '')}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {state === 'idle' ? (
                          <Typography variant="caption" color="text.secondary">
                            Bereit.
                          </Typography>
                        ) : (
                          renderStepContent(step.id)
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AutomationWorkflowDemo;
