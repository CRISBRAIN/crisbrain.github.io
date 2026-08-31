(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-M5NE2TCYLR';
  var CONSENT_KEY = 'crisbrain_analytics_consent_v1';

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Privacy-first Google Consent Mode v2. Advertising remains disabled.
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  var loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(loader);

  function saveConsent(value) {
    try { window.localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }

  function readConsent() {
    try { return window.localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function grantAnalytics() {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('event', 'page_view', {
      page_location: window.location.href,
      page_title: document.title
    });
  }

  function labels() {
    var lang = String(document.documentElement.lang || navigator.language || 'en').toLowerCase().split('-')[0];
    var copy = {
      pt: ['Privacidade e análise', 'O CRISBRAIN usa análise de tráfego apenas para entender descoberta e uso. Publicidade e personalização permanecem desativadas.', 'Aceitar análise', 'Continuar sem análise', 'Política de Privacidade'],
      en: ['Privacy and analytics', 'CRISBRAIN uses traffic analytics only to understand discovery and usage. Advertising and personalization remain disabled.', 'Accept analytics', 'Continue without analytics', 'Privacy Policy'],
      de: ['Datenschutz und Analyse', 'CRISBRAIN verwendet Traffic-Analysen nur, um Auffindbarkeit und Nutzung zu verstehen. Werbung und Personalisierung bleiben deaktiviert.', 'Analyse akzeptieren', 'Ohne Analyse fortfahren', 'Datenschutz'],
      fr: ['Confidentialité et analyse', 'CRISBRAIN utilise les statistiques de trafic uniquement pour comprendre la découverte et l’usage. La publicité et la personnalisation restent désactivées.', 'Accepter l’analyse', 'Continuer sans analyse', 'Confidentialité'],
      pl: ['Prywatność i analityka', 'CRISBRAIN używa analityki ruchu wyłącznie do zrozumienia odkrywania i korzystania. Reklamy i personalizacja pozostają wyłączone.', 'Akceptuj analitykę', 'Kontynuuj bez analityki', 'Polityka prywatności'],
      it: ['Privacy e analisi', 'CRISBRAIN usa l’analisi del traffico solo per comprendere scoperta e utilizzo. Pubblicità e personalizzazione restano disattivate.', 'Accetta analisi', 'Continua senza analisi', 'Privacy'],
      es: ['Privacidad y analítica', 'CRISBRAIN usa analítica de tráfico solo para comprender descubrimiento y uso. La publicidad y la personalización permanecen desactivadas.', 'Aceptar analítica', 'Continuar sin analítica', 'Privacidad'],
      nl: ['Privacy en analyse', 'CRISBRAIN gebruikt verkeersanalyse alleen om vindbaarheid en gebruik te begrijpen. Advertenties en personalisatie blijven uitgeschakeld.', 'Analyse accepteren', 'Doorgaan zonder analyse', 'Privacybeleid'],
      sv: ['Integritet och analys', 'CRISBRAIN använder trafikanalys endast för att förstå upptäckt och användning. Annonsering och personalisering förblir avstängda.', 'Acceptera analys', 'Fortsätt utan analys', 'Integritetspolicy']
    };
    return copy[lang] || copy.en;
  }

  function showBanner() {
    if (document.getElementById('crisbrain-analytics-consent')) return;
    var c = labels();
    var box = document.createElement('section');
    box.id = 'crisbrain-analytics-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', c[0]);
    box.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483647;max-width:760px;margin:auto;background:#111;color:#fff;padding:16px;border-radius:12px;font:14px/1.45 Arial,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.28)';
    box.innerHTML = '<strong style="display:block;margin-bottom:6px">' + c[0] + '</strong>' +
      '<span>' + c[1] + '</span>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">' +
      '<button id="crisbrain-ga-accept" style="padding:9px 12px;border:0;border-radius:8px;font-weight:700;cursor:pointer">' + c[2] + '</button>' +
      '<button id="crisbrain-ga-decline" style="padding:9px 12px;border:1px solid #aaa;border-radius:8px;background:#111;color:#fff;cursor:pointer">' + c[3] + '</button>' +
      '<a href="/privacy/" style="align-self:center;color:#fff;text-decoration:underline">' + c[4] + '</a>' +
      '</div>';
    document.body.appendChild(box);

    document.getElementById('crisbrain-ga-accept').addEventListener('click', function () {
      saveConsent('granted');
      grantAnalytics();
      box.remove();
    });
    document.getElementById('crisbrain-ga-decline').addEventListener('click', function () {
      saveConsent('denied');
      box.remove();
    });
  }

  var saved = readConsent();
  if (saved === 'granted') {
    grantAnalytics();
  } else if (saved !== 'denied') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner, { once: true });
    } else {
      showBanner();
    }
  }
})();
