"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Wrench,
  Drill,
  PlugZap,
  Tv,
  LampCeiling,
  BedDouble,
  Sofa,
  Languages,
  MapPin,
  ChevronRight,
  Send,
  CalendarClock,
} from "lucide-react";

const WHATSAPP_NUMBER = "+4917632574296"; // E.164
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hallo! Ich interessiere mich für Ihre Dienstleistungen."
)}`;

// Text-only i18n (no JSX inside!)
const DICT = {
  de: {
    locale: "de",
    dir: "ltr",
    brand: "Kabel & Möbel Service Ruhrgebiet",
    tagline: "Montage, Demontage & Entsorgung – schnell, sauber, zuverlässig",
    cta_primary: "Jetzt anfragen",
    cta_secondary: "WhatsApp-Chat",
    hero_bullets: [
      "Kabelmanagement & TV-Anbringung",
      "Möbel Ein- & Ausbau, Küche & Schlafzimmer",
      "E‑Geräte & Möbel Entsorgung (gegen Aufpreis)",
    ],
    services_title: "Unsere Leistungen",
    services: [
      {
        key: "cable",
        title: "Kabelmanagement (Organisieren)",
        desc: "Kabelkanäle, Verstecken, Beschriften – ordentlich & sicher.",
      },
      {
        key: "furniture",
        title: "Möbel Ein- & Ausbau",
        desc: "Schränke, Regale, Betten – fachgerecht montiert und demontiert.",
      },
      {
        key: "kitchen",
        title: "Küche Montage",
        desc: "Küchenaufbau, Arbeitsplatten, Geräte platzieren (ohne Elektro-/Wasseranschluss).",
      },
      {
        key: "bedroom",
        title: "Schlafzimmer Montage",
        desc: "Betten, Kleiderschränke, Kommoden – präzise Montage.",
      },
      {
        key: "lights",
        title: "Lichter & Vorhänge",
        desc: "Leuchten montieren, Vorhangstangen und Rollos anbringen.",
      },
      {
        key: "tv",
        title: "TV‑Anbringung",
        desc: "Wandhalterung, Ausrichtung & Kabel sauber verlegt.",
      },
      {
        key: "disposal",
        title: "Möbel & E‑Geräte Entsorgung",
        desc: "Abholung & fachgerechte Entsorgung – gegen Transportaufpreis.",
      },
    ],
    area_title: "Einsatzgebiet",
    area_text:
      "Ruhrgebiet (NRW). Transporte/Entsorgung auch darüber hinaus gegen Aufpreis.",
    process_title: "So läuft's ab",
    steps: [
      {
        title: "Anfrage senden",
        text: "Kontakt per WhatsApp, Telefon oder Formular.",
      },
      {
        title: "Termin vereinbaren",
        text: "Wir nennen Ihnen einen fairen Festpreis und einen Termin.",
      },
      {
        title: "Ausführung",
        text: "Schnell, sauber und sicher – inklusive Aufräumen.",
      },
    ],
    contact_title: "Kontakt",
    contact_text: "Schreiben Sie uns auf WhatsApp oder rufen Sie direkt an.",
    form_name: "Ihr Name",
    form_phone: "Telefonnummer (z. B. +49 …)",
    form_msg: "Nachricht (Was brauchen Sie?)",
    form_send: "Per WhatsApp senden",
    footer_note: `© ${new Date().getFullYear()} Kabel & Möbel Service Ruhrgebiet. Alle Rechte vorbehalten.`,
  },
  en: {
    locale: "en",
    dir: "ltr",
    brand: "Cable & Furniture Service Ruhr Area",
    tagline: "Assembly, disassembly & disposal – fast, tidy, reliable",
    cta_primary: "Get a quote",
    cta_secondary: "WhatsApp chat",
    hero_bullets: [
      "Cable management & TV mounting",
      "Furniture install/removal, kitchen & bedroom",
      "Appliance & furniture disposal (surcharge)",
    ],
    services_title: "Our Services",
    services: [
      {
        key: "cable",
        title: "Cable management (organizing)",
        desc: "Trunking, hiding, labeling – tidy & safe.",
      },
      {
        key: "furniture",
        title: "Furniture assembly & removal",
        desc: "Wardrobes, shelves, beds – properly done.",
      },
      {
        key: "kitchen",
        title: "Kitchen assembly",
        desc: "Setup, worktops, placing appliances (no electrical/plumbing hookup).",
      },
      {
        key: "bedroom",
        title: "Bedroom assembly",
        desc: "Beds, closets, dressers – precise installation.",
      },
      {
        key: "lights",
        title: "Lights & curtains",
        desc: "Mounting lights, curtain rails and blinds.",
      },
      {
        key: "tv",
        title: "TV mounting",
        desc: "Wall bracket, alignment & clean cabling.",
      },
      {
        key: "disposal",
        title: "Furniture & e‑appliance disposal",
        desc: "Collection & proper disposal – surcharge.",
      },
    ],
    area_title: "Service Area",
    area_text:
      "Ruhr area (NRW). Transport/disposal beyond region with surcharge.",
    process_title: "How it works",
    steps: [
      { title: "Send request", text: "Contact via WhatsApp, phone or form." },
      { title: "Schedule", text: "We give you a fair fixed price and a time." },
      { title: "Job done", text: "Fast, tidy and safe – we clean up." },
    ],
    contact_title: "Contact",
    contact_text: "Message us on WhatsApp or call directly.",
    form_name: "Your name",
    form_phone: "Phone number (e.g. +49 …)",
    form_msg: "Message (What do you need?)",
    form_send: "Send via WhatsApp",
    footer_note: `© ${new Date().getFullYear()} Cable & Furniture Service Ruhr Area. All rights reserved.`,
  },
  ar: {
    locale: "ar",
    dir: "rtl",
    brand: "خدمة الكوابل والأثاث – الرور",
    tagline: "تركيب، فك وتركيب، وتخلّص من النفايات – بسرعة ونظافة وموثوقية",
    cta_primary: "اطلب عرض سعر",
    cta_secondary: "واتساب",
    hero_bullets: [
      "تنظيم الكوابل وتثبيت الشاشات",
      "تركيب/فك الأثاث، المطابخ وغرف النوم",
      "التخلّص من الأثاث والأجهزة (مع أجرة نقل)",
    ],
    services_title: "خدماتنا",
    services: [
      {
        key: "cable",
        title: "تنظيم الكوابل",
        desc: "قنوات وأسلاك مخفية وترتيب منظّم وآمن.",
      },
      {
        key: "furniture",
        title: "تركيب وفك الأثاث",
        desc: "خزائن، رفوف، أسِرّة – شغل محترف.",
      },
      {
        key: "kitchen",
        title: "تركيب المطابخ",
        desc: "تركيب المطبخ وتجهيز السطوح ووضع الأجهزة (دون توصيل كهرباء/ماء).",
      },
      {
        key: "bedroom",
        title: "غرف النوم",
        desc: "أسِرّة وخزائن وكومودينات – تركيب دقيق.",
      },
      {
        key: "lights",
        title: "الإنارة والستائر",
        desc: "تثبيت وحدات الإنارة وقضبان الستائر والستائر الدوّارة.",
      },
      {
        key: "tv",
        title: "تثبيت الشاشات",
        desc: "حوامل جداريّة، ضبط الميل والأسلاك مرتبة.",
      },
      {
        key: "disposal",
        title: "التخلّص من الأثاث والأجهزة",
        desc: "جمع ونقل وتخلّص قانوني – أجرة إضافية.",
      },
    ],
    area_title: "نطاق العمل",
    area_text:
      "منطقة الرور (شمال الراين). النقل/التخلّص خارج المنطقة مقابل أجرة إضافية.",
    process_title: "كيف تتم الخدمة",
    steps: [
      { title: "أرسل طلبك", text: "واتساب أو اتصال أو نموذج." },
      { title: "تحديد الموعد", text: "سعر ثابت عادل وموعد مناسب." },
      { title: "التنفيذ", text: "عمل سريع ونظيف وآمن – مع ترتيب المكان." },
    ],
    contact_title: "تواصل معنا",
    contact_text: "راسلنا على واتساب أو اتصل مباشرة.",
    form_name: "اسمك",
    form_phone: "رقم الهاتف (مثال +49 …)",
    form_msg: "الرسالة (شو بتحتاج؟)",
    form_send: "إرسال عبر واتساب",
    footer_note: `© ${new Date().getFullYear()} خدمة الكوابل والأثاث – الرور. جميع الحقوق محفوظة.`,
  },
  tr: {
    locale: "tr",
    dir: "ltr",
    brand: "Kablo & Mobilya Hizmeti Ruhr",
    tagline: "Montaj, demontaj ve atık – hızlı, temiz, güvenilir",
    cta_primary: "Teklif iste",
    cta_secondary: "WhatsApp sohbet",
    hero_bullets: [
      "Kablo düzenleme & TV montajı",
      "Mobilya kurulum/söküm, mutfak & yatak odası",
      "Mobilya & elektrikli eşya atımı (ücretli)",
    ],
    services_title: "Hizmetlerimiz",
    services: [
      {
        key: "cable",
        title: "Kablo yönetimi",
        desc: "Kablo kanalı, gizleme, etiketleme.",
      },
      {
        key: "furniture",
        title: "Mobilya montaj/söküm",
        desc: "Dolap, raf, yatak – profesyonel.",
      },
      {
        key: "kitchen",
        title: "Mutfak montajı",
        desc: "Kurulum ve cihaz yerleşimi (elektrik/su bağlantısı yok).",
      },
      {
        key: "bedroom",
        title: "Yatak odası montajı",
        desc: "Yatak, gardırop, şifonyer.",
      },
      {
        key: "lights",
        title: "Aydınlatma & perdeler",
        desc: "Avize, perde rayı ve stor perde.",
      },
      {
        key: "tv",
        title: "TV montajı",
        desc: "Duvar askısı, hizalama ve kablo düzeni.",
      },
      {
        key: "disposal",
        title: "Mobilya & cihaz atımı",
        desc: "Toplama ve uygun bertaraf – ek ücret.",
      },
    ],
    area_title: "Hizmet Bölgesi",
    area_text: "Ruhr bölgesi (KRV). Bölge dışı nakliye/bertaraf ek ücretli.",
    process_title: "Nasıl çalışır",
    steps: [
      { title: "Talep gönder", text: "WhatsApp, telefon veya form." },
      { title: "Randevu al", text: "Adil sabit fiyat ve zaman." },
      { title: "Uygulama", text: "Hızlı, temiz, güvenli – toparlama." },
    ],
    contact_title: "İletişim",
    contact_text: "WhatsApp'tan yazın veya direkt arayın.",
    form_name: "Adınız",
    form_phone: "Telefon (örn. +49 …)",
    form_msg: "Mesaj (Neye ihtiyacınız var?)",
    form_send: "WhatsApp ile gönder",
    footer_note: `© ${new Date().getFullYear()} Kablo & Mobilya Hizmeti Ruhr. Tüm hakları saklıdır.`,
  },
  it: {
    locale: "it",
    dir: "ltr",
    brand: "Servizio Cavi & Mobili – Ruhr",
    tagline: "Montaggio, smontaggio e smaltimento – rapido, pulito, affidabile",
    cta_primary: "Richiedi preventivo",
    cta_secondary: "Chat WhatsApp",
    hero_bullets: [
      "Gestione cavi & montaggio TV",
      "Montaggio/smontaggio mobili, cucina & camera",
      "Smaltimento mobili & elettrodomestici (supplemento)",
    ],
    services_title: "I nostri servizi",
    services: [
      {
        key: "cable",
        title: "Gestione cavi",
        desc: "Canaline, occultamento, etichettatura – ordine e sicurezza.",
      },
      {
        key: "furniture",
        title: "Montaggio & smontaggio mobili",
        desc: "Armadi, scaffali, letti – professionale.",
      },
      {
        key: "kitchen",
        title: "Montaggio cucina",
        desc: "Installazione, piani lavoro, posizionamento elettrodomestici (senza allacci).",
      },
      {
        key: "bedroom",
        title: "Montaggio camera da letto",
        desc: "Letti, armadi, cassettiere – precisione.",
      },
      {
        key: "lights",
        title: "Luci & tende",
        desc: "Montaggio lampade, binari e tende.",
      },
      {
        key: "tv",
        title: "Montaggio TV",
        desc: "Staffa a muro, allineamento, cablaggio pulito.",
      },
      {
        key: "disposal",
        title: "Smaltimento mobili & elettrodom.",
        desc: "Ritiro e smaltimento – supplemento.",
      },
    ],
    area_title: "Area di servizio",
    area_text:
      "Area della Ruhr (NRW). Trasporto/smaltimento fuori zona con supplemento.",
    process_title: "Come funziona",
    steps: [
      { title: "Invia richiesta", text: "WhatsApp, telefono o modulo." },
      { title: "Fissa appuntamento", text: "Prezzo fisso equo e orario." },
      {
        title: "Esecuzione",
        text: "Veloce, pulito e sicuro – riordino finale.",
      },
    ],
    contact_title: "Contatti",
    contact_text: "Scrivici su WhatsApp o chiamaci direttamente.",
    form_name: "Il tuo nome",
    form_phone: "Telefono (es. +49 …)",
    form_msg: "Messaggio (Di cosa hai bisogno?)",
    form_send: "Invia via WhatsApp",
    footer_note: `© ${new Date().getFullYear()} Servizio Cavi & Mobili – Ruhr. Tutti i diritti riservati.`,
  },
  ru: {
    locale: "ru",
    dir: "ltr",
    brand: "Сервис кабелей и мебели — Рур",
    tagline: "Сборка, разборка и утилизация — быстро, чисто, надежно",
    cta_primary: "Запросить цену",
    cta_secondary: "Чат WhatsApp",
    hero_bullets: [
      "Менеджмент кабелей и монтаж ТВ",
      "Сборка/разборка мебели, кухня и спальня",
      "Утилизация мебели и техники (за доплату)",
    ],
    services_title: "Наши услуги",
    services: [
      {
        key: "cable",
        title: "Организация кабелей",
        desc: "Каналы, скрытие, маркировка — аккуратно и безопасно.",
      },
      {
        key: "furniture",
        title: "Сборка и разборка мебели",
        desc: "Шкафы, полки, кровати — профессионально.",
      },
      {
        key: "kitchen",
        title: "Монтаж кухни",
        desc: "Установка, столешницы, расстановка техники (без подключения).",
      },
      {
        key: "bedroom",
        title: "Монтаж спальни",
        desc: "Кровати, шкафы, комоды — точно и аккуратно.",
      },
      {
        key: "lights",
        title: "Свет и шторы",
        desc: "Монтаж светильников, карнизов и жалюзи.",
      },
      {
        key: "tv",
        title: "Монтаж ТВ",
        desc: "Кронштейн, выравнивание и аккуратные кабели.",
      },
      {
        key: "disposal",
        title: "Утилизация мебели и техники",
        desc: "Вывоз и утилизация — за доплату.",
      },
    ],
    area_title: "Зона обслуживания",
    area_text: "Рурская область (NRW). За пределами — с доплатой.",
    process_title: "Как это работает",
    steps: [
      { title: "Отправьте запрос", text: "WhatsApp, телефон или форма." },
      { title: "Назначим время", text: "Честная фиксированная цена и время." },
      {
        title: "Выполним работу",
        text: "Быстро, чисто и безопасно — наведём порядок.",
      },
    ],
    contact_title: "Контакты",
    contact_text: "Пишите в WhatsApp или звоните напрямую.",
    form_name: "Ваше имя",
    form_phone: "Телефон (напр. +49 …)",
    form_msg: "Сообщение (что нужно?)",
    form_send: "Отправить в WhatsApp",
    footer_note: `© ${new Date().getFullYear()} Сервис кабелей и мебели — Рур. Все права защищены.`,
  },
};

type LangKey = keyof typeof DICT;
const LANGS: { key: LangKey; label: string }[] = [
  { key: "de", label: "Deutsch" },
  { key: "en", label: "English" },
  { key: "ar", label: "العربية" },
  { key: "tr", label: "Türkçe" },
  { key: "it", label: "Italiano" },
  { key: "ru", label: "Русский" },
];

function iconFor(key: string) {
  switch (key) {
    case "cable":
      return <PlugZap className="w-6 h-6" />;
    case "furniture":
      return <Sofa className="w-6 h-6" />;
    case "kitchen":
      return <Drill className="w-6 h-6" />;
    case "bedroom":
      return <BedDouble className="w-6 h-6" />;
    case "lights":
      return <LampCeiling className="w-6 h-6" />;
    case "tv":
      return <Tv className="w-6 h-6" />;
    case "disposal":
      return <Wrench className="w-6 h-6" />;
    default:
      return <Wrench className="w-6 h-6" />;
  }
}

export default function LandingPage() {
  const [lang, setLang] = useState<LangKey>("de");
  const t = useMemo(() => DICT[lang], [lang]);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.locale;
  }, [t]);

  function sendWhatsAppMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name")?.toString() || "").trim();
    const phone = (fd.get("phone")?.toString() || "").trim();
    const msg = (fd.get("message")?.toString() || "").trim();
    const composed = `${name ? name + " | " : ""}${
      phone ? phone + " | " : ""
    }${msg}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      composed || "Hallo! Interesse an Service."
    )}`;
    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
              <Wrench className="w-5 h-5" />
            </span>
            <div className="font-semibold">{t.brand}</div>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 opacity-70" />
            <select
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm"
              value={lang}
              onChange={(e) => setLang(e.target.value as LangKey)}
            >
              {LANGS.map((l) => (
                <option key={l.key} value={l.key}>
                  {l.label}
                </option>
              ))}
            </select>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              className="ml-2 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-white text-sm shadow hover:shadow-md"
            >
              <MessageCircle className="w-4 h-4" /> {t.cta_secondary}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.15),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_40%)]" />
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            >
              {t.tagline}
            </motion.h1>
            <ul className="mt-6 space-y-2 text-slate-700">
              {t.hero_bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-white shadow hover:shadow-md"
              >
                <MessageCircle className="w-5 h-5" /> {t.cta_primary}
              </a>
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 shadow-sm"
              >
                <Phone className="w-5 h-5" /> +49 176 32574296
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="w-4 h-4" /> {t.area_text}
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "cable", label: "Cable" },
                { key: "tv", label: "TV" },
                { key: "lights", label: "Lights" },
                { key: "bedroom", label: "Bedroom" },
              ].map(({ key, label }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200"
                >
                  {iconFor(key)}
                  <div className="mt-3 font-medium text-slate-800">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          {t.services_title}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.services.map((s) => (
            <div
              key={s.key}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  {iconFor(s.key)}
                </span>
                <div className="font-semibold">{s.title}</div>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          {t.process_title}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {t.steps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
                  {i === 0 ? (
                    <MessageCircle className="w-5 h-5" />
                  ) : i === 1 ? (
                    <CalendarClock className="w-5 h-5" />
                  ) : (
                    <Wrench className="w-5 h-5" />
                  )}
                </span>
                <span>{step.title}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Area */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {t.area_title}
        </h2>
        <p className="text-slate-700">{t.area_text}</p>
      </section>

      {/* Contact / Chat */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{t.contact_title}</h3>
            <p className="mt-2 text-slate-600">{t.contact_text}</p>
            <form onSubmit={sendWhatsAppMessage} className="mt-4 space-y-3">
              <input
                name="name"
                placeholder={t.form_name}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 shadow-sm"
              />
              <input
                name="phone"
                placeholder={t.form_phone}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 shadow-sm"
              />
              <textarea
                name="message"
                placeholder={t.form_msg}
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 shadow-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-white shadow hover:shadow-md"
              >
                <Send className="w-4 h-4" /> {t.form_send}
              </button>
            </form>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">WhatsApp</h3>
            <p className="mt-2 text-slate-600">+49 176 32574296</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-white shadow hover:shadow-md"
            >
              <MessageCircle className="w-5 h-5" /> {t.cta_secondary}
            </a>
          </div>
        </div>
      </section>
      {/* Price List */}
      <section id="prices" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          {t.locale === "de" ? "Preisübersicht" : "Price List"}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Kabelmanagement", price: "ab 40 €" },
            { name: "TV-Anbringung", price: "ab 50 €" },
            { name: "Lichter & Vorhänge", price: "ab 45 €" },
            { name: "Küche Montage", price: "ab 150 €" },
            { name: "Schlafzimmer Montage", price: "ab 120 €" },
            {
              name: "Möbel & E-Geräte Entsorgung",
              price: "ab 60 € + Transport",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="font-semibold text-slate-900">{item.name}</div>
              <div className="text-emerald-600 mt-1 text-sm">{item.price}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          *Preise sind Richtwerte, genaue Kosten nach Aufwand & Entfernung.
        </p>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          {t.locale === "de" ? "Galerie" : "Gallery"}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "/gallery1.png",
            "/gallery2.png",
            "/gallery3.png",
            "/gallery4.png",
            "/gallery5.png",
            "/gallery6.png",
          ].map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md bg-white"
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-auto object-cover aspect-[3/2]"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600 flex flex-wrap gap-3 justify-between">
          <div>
            © {new Date().getFullYear()} Kabel & Möbel Service Ruhrgebiet. Alle
            Rechte vorbehalten.
          </div>
          <div className="flex gap-3">
            <a href="/impressum" className="hover:underline">
              Impressum
            </a>
            <a href="/datenschutz" className="hover:underline">
              Datenschutz
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        className="fixed bottom-5 right-5 rounded-full bg-emerald-600 p-4 shadow-lg hover:shadow-xl text-white"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* JSON-LD structured data (TEXT ONLY, no JSX) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            name: DICT.de.brand,
            areaServed: "Ruhrgebiet, NRW, Germany",
            telephone: "+49 176 32574296",
            sameAs: [WHATSAPP_LINK],
            serviceType:
              "Montage, Demontage, Entsorgung, TV, Lichter, Vorhänge, Küche, Schlafzimmer, Kabelmanagement",
          }),
        }}
      />
    </div>
  );
}
