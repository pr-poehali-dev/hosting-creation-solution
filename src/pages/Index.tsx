import { useState } from "react";
import Icon from "@/components/ui/icon";

const TELEGRAM_USERNAME = "HellwayYT";

const plans = [
  {
    id: "start",
    name: "START",
    location: "🇩🇪 Германия",
    price: "149",
    currency: "₽/мес",
    cpu: "2 vCPU",
    ram: "4 GB",
    disk: "50 GB NVMe",
    bandwidth: "1 Гбит/с",
    popular: false,
    color: "cyan",
  },
  {
    id: "pro",
    name: "PRO",
    location: "🇩🇪 Германия",
    price: "349",
    currency: "₽/мес",
    cpu: "4 vCPU",
    ram: "8 GB",
    disk: "100 GB NVMe",
    bandwidth: "1 Гбит/с",
    popular: true,
    color: "cyan",
  },
  {
    id: "ultra",
    name: "ULTRA",
    location: "🇩🇪 Германия",
    price: "699",
    currency: "₽/мес",
    cpu: "8 vCPU",
    ram: "16 GB",
    disk: "200 GB NVMe",
    bandwidth: "10 Гбит/с",
    popular: false,
    color: "purple",
  },
  {
    id: "start-fi",
    name: "START FI",
    location: "🇫🇮 Финляндия",
    price: "129",
    currency: "₽/мес",
    cpu: "2 vCPU",
    ram: "4 GB",
    disk: "50 GB NVMe",
    bandwidth: "1 Гбит/с",
    popular: false,
    color: "cyan",
  },
  {
    id: "pro-fi",
    name: "PRO FI",
    location: "🇫🇮 Финляндия",
    price: "299",
    currency: "₽/мес",
    cpu: "4 vCPU",
    ram: "8 GB",
    disk: "100 GB NVMe",
    bandwidth: "1 Гбит/с",
    popular: false,
    color: "cyan",
  },
  {
    id: "ultra-fi",
    name: "ULTRA FI",
    location: "🇫🇮 Финляндия",
    price: "599",
    currency: "₽/мес",
    cpu: "8 vCPU",
    ram: "16 GB",
    disk: "200 GB NVMe",
    bandwidth: "10 Гбит/с",
    popular: false,
    color: "purple",
  },
];

const features = [
  { icon: "Cpu", title: "AMD Ryzen 9 3900", desc: "12 ядер / 24 потока. Максимальная производительность для ваших задач." },
  { icon: "Zap", title: "NVMe SSD накопители", desc: "Скорость чтения до 3500 МБ/с. Мгновенный отклик баз данных и файловой системы." },
  { icon: "Globe", title: "Европейская инфраструктура", desc: "Дата-центры в Германии и Финляндии. Низкая задержка для европейских пользователей." },
  { icon: "RefreshCw", title: "Авто-развёртывание", desc: "Сервер готов за 60 секунд. Автоматическая настройка ОС и сетевых параметров." },
  { icon: "Shield", title: "DDoS-защита", desc: "Фильтрация атак до 1 Тбит/с. Ваш сервер всегда онлайн." },
  { icon: "BarChart2", title: "Управление ресурсами", desc: "Панель мониторинга в реальном времени. Масштабирование в один клик." },
];

const faqs = [
  {
    q: "Как быстро активируется сервер?",
    a: "Сервер разворачивается автоматически в течение 60 секунд после подтверждения оплаты.",
  },
  {
    q: "Какие ОС доступны?",
    a: "Ubuntu 20.04/22.04, Debian 11/12, CentOS 8, Windows Server 2019/2022.",
  },
  {
    q: "Есть ли пробный период?",
    a: "Да, мы предоставляем тестовый период 24 часа на тарифе START. Напишите нам в Telegram.",
  },
  {
    q: "Как оплатить?",
    a: "Принимаем QIWI, карты РФ, криптовалюту (USDT, BTC, ETH). Оплата через Telegram-менеджера.",
  },
  {
    q: "Можно ли сменить тариф?",
    a: "Да, апгрейд возможен в любое время без потери данных. Разница в стоимости пересчитывается автоматически.",
  },
];

function buyPlan(planName: string) {
  const msg = encodeURIComponent(`Хочу купить тариф ${planName} на Astrix Hosting`);
  window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${msg}`, "_blank");
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050a0f] text-white overflow-x-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 grid-bg opacity-60 pointer-events-none z-0" />
      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(0,255,255,0.06) 0%, transparent 70%)" }} />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(191,95,255,0.06) 0%, transparent 70%)" }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(5,10,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,255,0.1)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center animate-pulse-glow"
            style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.3), rgba(0,128,255,0.3))", border: "1px solid rgba(0,255,255,0.6)" }}>
            <span className="font-orbitron text-[10px] font-black text-cyan-400">AX</span>
          </div>
          <span className="font-orbitron text-lg font-bold tracking-widest neon-text">ASTRIX</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[["hero", "Главная"], ["pricing", "Тарифы"], ["features", "Характеристики"], ["about", "О нас"], ["faq", "FAQ"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="font-ibm text-sm tracking-wider text-gray-400 hover:text-cyan-400 transition-colors duration-300 uppercase">
              {label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => window.open("http://2.26.80.222", "_blank")}
            className="neon-btn-purple px-5 py-2 rounded text-sm font-semibold flex items-center gap-2">
            <Icon name="LayoutDashboard" size={14} />
            Панель
          </button>
          <button onClick={() => buyPlan("START")}
            className="neon-btn px-5 py-2 rounded text-sm font-semibold">
            Начать
          </button>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden text-cyan-400" onClick={() => setNavOpen(!navOpen)}>
          <Icon name={navOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* Mobile menu */}
      {navOpen && (
        <div className="fixed inset-0 z-40 pt-20" style={{ background: "rgba(5,10,15,0.97)", backdropFilter: "blur(20px)" }}>
          <div className="flex flex-col items-center gap-6 pt-10">
            {[["hero", "Главная"], ["pricing", "Тарифы"], ["features", "Характеристики"], ["about", "О нас"], ["faq", "FAQ"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="font-orbitron text-lg tracking-widest text-gray-300 hover:text-cyan-400 transition-colors uppercase">
                {label}
              </button>
            ))}
            <button onClick={() => { buyPlan("START"); setNavOpen(false); }}
              className="neon-btn px-8 py-3 rounded text-base font-semibold mt-4">
              Начать
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full animate-spin-slow opacity-20"
            style={{ border: "1px solid rgba(0,255,255,0.3)", borderTopColor: "transparent" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full animate-spin-slow opacity-10"
            style={{ border: "1px solid rgba(191,95,255,0.5)", borderBottomColor: "transparent", animationDirection: "reverse" }} />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs tracking-widest uppercase"
            style={{ border: "1px solid rgba(0,255,255,0.3)", background: "rgba(0,255,255,0.05)", color: "rgba(0,255,255,0.8)" }}>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Европейские серверы онлайн
          </div>

          <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-none animate-glitch"
            style={{ color: "var(--neon-cyan)", textShadow: "0 0 20px var(--neon-cyan), 0 0 60px var(--neon-cyan)" }}>
            ASTRIX
          </h1>

          <p className="font-orbitron text-lg md:text-2xl font-light tracking-[0.2em] text-gray-300 mb-4 animate-fade-in-up stagger-2">
            HOSTING НОВОГО ПОКОЛЕНИЯ
          </p>

          <p className="font-ibm text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-3">
            VPS-серверы в Германии и Финляндии на базе AMD Ryzen&nbsp;9&nbsp;3900.<br />
            Автоматическое развёртывание за 60 секунд.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-4">
            <button onClick={() => scrollTo("pricing")}
              className="neon-btn px-8 py-4 rounded text-base font-semibold">
              Выбрать тариф
            </button>
            <button onClick={() => scrollTo("features")}
              className="neon-btn-purple px-8 py-4 rounded text-base font-semibold">
              Характеристики
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto animate-fade-in-up stagger-5">
            {[["99.9%", "Uptime"], ["< 60с", "Развёртывание"], ["24/7", "Поддержка"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-orbitron text-2xl font-bold" style={{ color: "var(--neon-cyan)" }}>{val}</div>
                <div className="font-ibm text-xs text-gray-500 uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="font-ibm text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
          <Icon name="ChevronDown" size={20} className="text-cyan-400 opacity-60" />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-orbitron text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon-cyan)" }}>Тарифные планы</span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mt-3 text-white">ВЫБЕРИТЕ МОЩНОСТЬ</h2>
            <p className="font-ibm text-gray-400 mt-4 text-base">Все серверы на AMD Ryzen 9 3900 · NVMe SSD · Мгновенное развёртывание</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.id}
                className={`relative rounded-xl p-6 ${plan.popular ? "card-glow-featured" : "card-glow"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold font-orbitron tracking-wider"
                    style={{ background: "var(--neon-cyan)", color: "#050a0f" }}>
                    ПОПУЛЯРНЫЙ
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="font-orbitron text-xs tracking-widest text-gray-500 uppercase">{plan.location}</span>
                    <h3 className="font-orbitron text-xl font-bold mt-1"
                      style={{ color: plan.color === "purple" ? "var(--neon-purple)" : "var(--neon-cyan)" }}>
                      {plan.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-orbitron text-3xl font-black text-white">{plan.price}</span>
                    <span className="font-ibm text-xs text-gray-500 block">{plan.currency}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: "Cpu", val: plan.cpu },
                    { icon: "MemoryStick", val: plan.ram + " RAM" },
                    { icon: "HardDrive", val: plan.disk },
                    { icon: "Wifi", val: plan.bandwidth },
                  ].map(({ icon, val }) => (
                    <div key={val} className="flex items-center gap-3">
                      <Icon name={icon} size={14} className="text-cyan-400 opacity-70" fallback="Server" />
                      <span className="font-ibm text-sm text-gray-300">{val}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => buyPlan(plan.name)}
                  className={`w-full py-3 rounded text-sm font-semibold transition-all duration-300 ${
                    plan.color === "purple" ? "neon-btn-purple" : "neon-btn"
                  }`}>
                  КУПИТЬ ТАРИФ
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-orbitron text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon-cyan)" }}>Технологии</span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mt-3 text-white">ХАРАКТЕРИСТИКИ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card-glow rounded-xl p-6 group">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(0,255,255,0.1)", border: "1px solid rgba(0,255,255,0.2)" }}>
                  <Icon name={f.icon} size={22} className="text-cyan-400" fallback="Server" />
                </div>
                <h3 className="font-orbitron text-sm font-bold text-white mb-2 tracking-wide">{f.title}</h3>
                <p className="font-ibm text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CPU highlight */}
          <div className="mt-10 rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.05), rgba(191,95,255,0.05))", border: "1px solid rgba(0,255,255,0.2)" }}>
            <div className="font-orbitron text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">Процессор</div>
            <div className="font-orbitron text-2xl md:text-4xl font-black text-white mb-2">AMD Ryzen 9 3900</div>
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              {[["12", "Ядер"], ["24", "Потоков"], ["3.8", "ГГц Base"], ["4.6", "ГГц Boost"]].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="font-orbitron text-xl font-bold" style={{ color: "var(--neon-cyan)" }}>{val}</div>
                  <div className="font-ibm text-xs text-gray-500 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-orbitron text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon-cyan)" }}>Компания</span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mt-3 text-white">О НАС</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="card-glow rounded-2xl p-8">
              <h3 className="font-orbitron text-lg font-bold mb-4" style={{ color: "var(--neon-cyan)" }}>
                Astrix Hosting
              </h3>
              <p className="font-ibm text-gray-400 leading-relaxed mb-4">
                Мы предоставляем высокопроизводительные VPS-серверы в Европе для разработчиков, геймеров и бизнеса.
                Наша инфраструктура построена на новейшем железе и обеспечивает максимальную стабильность.
              </p>
              <p className="font-ibm text-gray-400 leading-relaxed">
                Поддержка работает 24/7 через Telegram — быстрые ответы и реальная помощь в настройке серверов.
              </p>
              <button onClick={() => window.open(`https://t.me/${TELEGRAM_USERNAME}`, "_blank")}
                className="neon-btn mt-6 px-6 py-3 rounded text-sm font-semibold flex items-center gap-2 w-full justify-center">
                <Icon name="Send" size={16} />
                Написать в Telegram
              </button>
            </div>

            <div className="space-y-4">
              {[
                { icon: "MapPin", title: "Локации", desc: "Германия (Frankfurt) и Финляндия (Helsinki)" },
                { icon: "Clock", title: "Развёртывание", desc: "Автоматически за 60 секунд после оплаты" },
                { icon: "Headphones", title: "Поддержка", desc: "Telegram 24/7, ответ в течение 15 минут" },
                { icon: "Lock", title: "Безопасность", desc: "DDoS-защита, изолированные среды" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(0,255,255,0.03)", border: "1px solid rgba(0,255,255,0.1)" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,255,255,0.1)" }}>
                    <Icon name={item.icon} size={16} className="text-cyan-400" fallback="Info" />
                  </div>
                  <div>
                    <div className="font-orbitron text-xs font-bold text-white tracking-wide">{item.title}</div>
                    <div className="font-ibm text-sm text-gray-400 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-orbitron text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon-cyan)" }}>Вопросы</span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mt-3 text-white">FAQ</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden transition-all duration-300"
                style={{ border: openFaq === i ? "1px solid rgba(0,255,255,0.4)" : "1px solid rgba(0,255,255,0.1)", background: "rgba(7,14,22,0.8)" }}>
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-ibm text-sm md:text-base font-medium text-white pr-4">{faq.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="text-cyan-400 flex-shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="font-ibm text-sm text-gray-400 leading-relaxed"
                      style={{ borderTop: "1px solid rgba(0,255,255,0.1)", paddingTop: "16px" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl p-10"
            style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.08), rgba(191,95,255,0.08))", border: "1px solid rgba(0,255,255,0.25)", boxShadow: "0 0 80px rgba(0,255,255,0.08)" }}>
            <h2 className="font-orbitron text-2xl md:text-4xl font-black text-white mb-4">ГОТОВ НАЧАТЬ?</h2>
            <p className="font-ibm text-gray-400 mb-8 text-base">
              Выбери тариф и получи мощный сервер в Европе за 60 секунд
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => scrollTo("pricing")} className="neon-btn px-8 py-4 rounded text-base font-semibold">
                ВЫБРАТЬ ТАРИФ
              </button>
              <button onClick={() => window.open(`https://t.me/${TELEGRAM_USERNAME}`, "_blank")}
                className="neon-btn-purple px-8 py-4 rounded text-base font-semibold flex items-center justify-center gap-2">
                <Icon name="Send" size={16} />
                TELEGRAM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center"
        style={{ borderTop: "1px solid rgba(0,255,255,0.1)" }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="font-orbitron text-sm font-bold tracking-widest neon-text">ASTRIX</span>
          <span className="text-gray-600">·</span>
          <span className="font-ibm text-xs text-gray-500">Hosting нового поколения</span>
        </div>
        <p className="font-ibm text-xs text-gray-600">© 2025 Astrix Hosting. Все права защищены.</p>
      </footer>
    </div>
  );
}