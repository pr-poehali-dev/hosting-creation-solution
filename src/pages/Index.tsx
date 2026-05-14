import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TELEGRAM_USERNAME = "AstrixHosting";

const plans = [
  // 🇩🇪 Германия — 8 тарифов
  { id: "de-micro",  name: "MICRO",      location: "🇩🇪 Германия", price: "59",  currency: "₽/мес", cpu: "1 vCPU", ram: "2 GB",  disk: "20 GB NVMe",  bandwidth: "500 Мбит/с", slots: "до 5 слотов",  popular: false, color: "cyan",   tag: "🎮 Игровой" },
  { id: "de-lite",   name: "LITE",       location: "🇩🇪 Германия", price: "89",  currency: "₽/мес", cpu: "2 vCPU", ram: "4 GB",  disk: "30 GB NVMe",  bandwidth: "1 Гбит/с",   slots: "до 10 слотов", popular: false, color: "cyan",   tag: "🎮 Игровой" },
  { id: "de-start",  name: "START",      location: "🇩🇪 Германия", price: "139", currency: "₽/мес", cpu: "2 vCPU", ram: "6 GB",  disk: "50 GB NVMe",  bandwidth: "1 Гбит/с",   slots: "до 20 слотов", popular: false, color: "cyan",   tag: "🎮 Игровой" },
  { id: "de-plus",   name: "PLUS",       location: "🇩🇪 Германия", price: "199", currency: "₽/мес", cpu: "3 vCPU", ram: "8 GB",  disk: "70 GB NVMe",  bandwidth: "1 Гбит/с",   slots: "до 30 слотов", popular: false, color: "cyan",   tag: "🎮 Игровой" },
  { id: "de-pro",    name: "PRO",        location: "🇩🇪 Германия", price: "269", currency: "₽/мес", cpu: "4 vCPU", ram: "8 GB",  disk: "100 GB NVMe", bandwidth: "1 Гбит/с",   slots: "до 50 слотов", popular: true,  color: "cyan",   tag: "🎮 Игровой" },
  { id: "de-pro2",   name: "PRO MAX",    location: "🇩🇪 Германия", price: "349", currency: "₽/мес", cpu: "4 vCPU", ram: "12 GB", disk: "120 GB NVMe", bandwidth: "5 Гбит/с",   slots: "до 64 слотов", popular: false, color: "cyan",   tag: "⚡ Продвинутый" },
  { id: "de-ultra",  name: "ULTRA",      location: "🇩🇪 Германия", price: "449", currency: "₽/мес", cpu: "6 vCPU", ram: "16 GB", disk: "150 GB NVMe", bandwidth: "10 Гбит/с",  slots: "до 80 слотов", popular: false, color: "purple", tag: "🔥 Топ" },
  { id: "de-max",    name: "ULTRA MAX",  location: "🇩🇪 Германия", price: "599", currency: "₽/мес", cpu: "8 vCPU", ram: "32 GB", disk: "250 GB NVMe", bandwidth: "10 Гбит/с",  slots: "до 128 слотов",popular: false, color: "purple", tag: "🔥 Топ" },
  // 🇫🇮 Финляндия — 7 тарифов
  { id: "fi-lite",   name: "LITE",       location: "🇫🇮 Финляндия", price: "75",  currency: "₽/мес", cpu: "2 vCPU", ram: "4 GB",  disk: "30 GB NVMe",  bandwidth: "1 Гбит/с",   slots: "до 10 слотов", popular: false, color: "cyan",   tag: "🎮 Игровой" },
  { id: "fi-start",  name: "START",      location: "🇫🇮 Финляндия", price: "119", currency: "₽/мес", cpu: "2 vCPU", ram: "6 GB",  disk: "50 GB NVMe",  bandwidth: "1 Гбит/с",   slots: "до 20 слотов", popular: false, color: "cyan",   tag: "🎮 Игровой" },
  { id: "fi-plus",   name: "PLUS",       location: "🇫🇮 Финляндия", price: "179", currency: "₽/мес", cpu: "3 vCPU", ram: "8 GB",  disk: "70 GB NVMe",  bandwidth: "1 Гбит/с",   slots: "до 30 слотов", popular: false, color: "cyan",   tag: "🎮 Игровой" },
  { id: "fi-pro",    name: "PRO",        location: "🇫🇮 Финляндия", price: "239", currency: "₽/мес", cpu: "4 vCPU", ram: "8 GB",  disk: "100 GB NVMe", bandwidth: "1 Гбит/с",   slots: "до 50 слотов", popular: true,  color: "cyan",   tag: "🎮 Игровой" },
  { id: "fi-pro2",   name: "PRO MAX",    location: "🇫🇮 Финляндия", price: "319", currency: "₽/мес", cpu: "4 vCPU", ram: "12 GB", disk: "120 GB NVMe", bandwidth: "5 Гбит/с",   slots: "до 64 слотов", popular: false, color: "cyan",   tag: "⚡ Продвинутый" },
  { id: "fi-ultra",  name: "ULTRA",      location: "🇫🇮 Финляндия", price: "399", currency: "₽/мес", cpu: "6 vCPU", ram: "16 GB", disk: "150 GB NVMe", bandwidth: "10 Гбит/с",  slots: "до 80 слотов", popular: false, color: "purple", tag: "🔥 Топ" },
  { id: "fi-max",    name: "ULTRA MAX",  location: "🇫🇮 Финляндия", price: "539", currency: "₽/мес", cpu: "8 vCPU", ram: "32 GB", disk: "250 GB NVMe", bandwidth: "10 Гбит/с",  slots: "до 128 слотов",popular: false, color: "purple", tag: "🔥 Топ" },
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
  { q: "Как быстро активируется сервер?", a: "Сервер разворачивается автоматически в течение 60 секунд после подтверждения оплаты." },
  { q: "Какие ОС доступны?", a: "Ubuntu 20.04/22.04, Debian 11/12, CentOS 8, Windows Server 2019/2022." },
  { q: "Есть ли пробный период?", a: "Да, мы предоставляем тестовый период 24 часа на тарифе START. Напишите нам в Telegram." },
  { q: "Как оплатить?", a: "Принимаем QIWI, карты РФ, криптовалюту (USDT, BTC, ETH). Оплата через Telegram-менеджера." },
  { q: "Можно ли сменить тариф?", a: "Да, апгрейд возможен в любое время без потери данных. Разница в стоимости пересчитывается автоматически." },
];

function buyPlan(planName: string) {
  const msg = encodeURIComponent(`Хочу купить тариф ${planName} на Astrix Hosting`);
  window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${msg}`, "_blank");
}

// Хук: появление при скролле
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Хук: счётчик цифр
function useCounter(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

// Частицы на холсте
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; hue: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() > 0.6 ? 280 : 180,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.opacity})`;
        ctx.fill();
      });
      // Линии между близкими частицами
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,255,255,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

// Компонент карточки тарифа с анимацией наведения
function PlanCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl p-6 cursor-default"
      style={{
        background: plan.popular
          ? "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,128,255,0.07))"
          : "linear-gradient(135deg, rgba(7,14,22,0.9), rgba(5,10,15,0.95))",
        border: hovered
          ? plan.color === "purple" ? "1px solid rgba(191,95,255,0.6)" : "1px solid rgba(0,255,255,0.6)"
          : plan.popular ? "1px solid rgba(0,255,255,0.5)" : "1px solid rgba(0,255,255,0.15)",
        boxShadow: hovered
          ? plan.color === "purple"
            ? "0 8px 60px rgba(0,0,0,0.8), 0 0 50px rgba(191,95,255,0.25), inset 0 0 30px rgba(191,95,255,0.05)"
            : "0 8px 60px rgba(0,0,0,0.8), 0 0 50px rgba(0,255,255,0.25), inset 0 0 30px rgba(0,255,255,0.05)"
          : plan.popular
            ? "0 8px 50px rgba(0,0,0,0.7), 0 0 50px rgba(0,255,255,0.18)"
            : "0 4px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,255,0.04)",
        transform: hovered ? "translateY(-8px) scale(1.02)" : inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        opacity: inView ? 1 : 0,
        transition: `transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.6s ease ${index * 0.08}s, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold font-orbitron tracking-wider"
          style={{ background: "var(--neon-cyan)", color: "#050a0f" }}>
          ПОПУЛЯРНЫЙ
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-ibm text-xs px-2 py-0.5 rounded-full"
              style={{ background: plan.color === "purple" ? "rgba(191,95,255,0.15)" : "rgba(0,255,255,0.1)", color: plan.color === "purple" ? "var(--neon-purple)" : "var(--neon-cyan)", border: `1px solid ${plan.color === "purple" ? "rgba(191,95,255,0.3)" : "rgba(0,255,255,0.2)"}` }}>
              {plan.tag}
            </span>
          </div>
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
      <div className="space-y-2.5 mb-6">
        {[{ icon: "Cpu", val: plan.cpu }, { icon: "MemoryStick", val: plan.ram + " RAM" }, { icon: "HardDrive", val: plan.disk }, { icon: "Wifi", val: plan.bandwidth }, { icon: "Gamepad2", val: plan.slots }].map(({ icon, val }) => (
          <div key={val} className="flex items-center gap-3">
            <Icon name={icon} size={13} className="text-cyan-400 opacity-70" fallback="Server" />
            <span className="font-ibm text-sm text-gray-300">{val}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => buyPlan(plan.name)}
        className={`w-full py-3 rounded text-sm font-semibold transition-all duration-300 ${plan.color === "purple" ? "neon-btn-purple" : "neon-btn"}`}>
        КУПИТЬ ТАРИФ
      </button>
    </div>
  );
}

// Счётчик с анимацией
function AnimatedStat({ value, label, suffix = "" }: { value: number | string; label: string; suffix?: string }) {
  const { ref, inView } = useInView(0.3);
  const numVal = typeof value === "number" ? value : 0;
  const count = useCounter(numVal, inView);
  return (
    <div ref={ref} className="text-center" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
      <div className="font-orbitron text-2xl font-bold" style={{ color: "var(--neon-cyan)" }}>
        {typeof value === "number" ? count + suffix : value}
      </div>
      <div className="font-ibm text-xs text-gray-500 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

// Компонент секции с reveal
function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className={className}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(50px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>
      {children}
    </div>
  );
}

// Типающийся текст
function TypewriterText({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, texts]);
  return (
    <span>
      {displayed}
      <span className="animate-pulse" style={{ color: "var(--neon-cyan)" }}>|</span>
    </span>
  );
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [pricingTab, setPricingTab] = useState("de");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [panelModal, setPanelModal] = useState(false);
  const [form, setForm] = useState({ name: "", tg: "", email: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const [promoModal, setPromoModal] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState<"forms" | "logs">("forms");
  const [openChat, setOpenChat] = useState<number | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});
  const [chats, setChats] = useState<Record<number, { from: "admin" | "user"; text: string; time: string }[]>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendReply = (idx: number) => {
    const text = (replyTexts[idx] || "").trim();
    if (!text) return;
    const msg = { from: "admin" as const, text, time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) };
    setChats(prev => ({ ...prev, [idx]: [...(prev[idx] || []), msg] }));
    setReplyTexts(prev => ({ ...prev, [idx]: "" }));
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const ADMIN_CODE = "adminHell123";

  // Хранилище заявок (в реальности было бы на бэке, тут localStorage)
  const [submissions, setSubmissions] = useState<{ name: string; tg: string; email: string; comment: string; date: string }[]>(() => {
    try { return JSON.parse(localStorage.getItem("astrix_forms") || "[]"); } catch { return []; }
  });
  const [logs] = useState([
    { time: "14.05.2025 18:42", event: "Заявка от @darkstar99 — тариф PRO DE", type: "form" },
    { time: "14.05.2025 17:31", event: "Открыта панель 2.26.80.222", type: "panel" },
    { time: "14.05.2025 16:55", event: "Заявка от @nickfury — тариф ULTRA FI", type: "form" },
    { time: "14.05.2025 15:10", event: "Промокод активирован — adminHell123", type: "promo" },
    { time: "14.05.2025 12:03", event: "Посетитель открыл сайт", type: "visit" },
    { time: "13.05.2025 22:17", event: "Заявка от @player2025 — тариф LITE DE", type: "form" },
    { time: "13.05.2025 19:44", event: "Клик «Купить» — тариф GAME PRO FI", type: "buy" },
    { time: "13.05.2025 11:30", event: "Посетитель открыл сайт", type: "visit" },
  ]);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim() === ADMIN_CODE) {
      setIsAdmin(true);
      setPromoModal(false);
      setPromoInput("");
      setPromoError(false);
    } else {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 2000);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = { ...form, date: new Date().toLocaleString("ru-RU") };
    const updated = [entry, ...submissions];
    setSubmissions(updated);
    localStorage.setItem("astrix_forms", JSON.stringify(updated));
    const msg = encodeURIComponent(
      `📋 Заявка на аккаунт в панели:\n👤 Имя: ${form.name}\n💬 Telegram: ${form.tg}\n📧 Email: ${form.email}\n📝 Комментарий: ${form.comment}`
    );
    window.open(`https://t.me/HellwayYT?text=${msg}`, "_blank");
    setFormSent(true);
  };
  const heroRef = useRef<HTMLElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  // Следим за мышью для эффекта свечения в Hero
  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#050a0f] text-white overflow-x-hidden">
      {/* Анимированные частицы */}
      <ParticleCanvas />

      {/* Background grid */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none z-0" />

      {/* Cursor glow */}
      <div className="fixed pointer-events-none z-0 rounded-full"
        style={{
          left: mousePos.x - 200, top: mousePos.y - 200,
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(0,255,255,0.04) 0%, transparent 70%)",
          transition: "left 0.1s ease, top 0.1s ease",
        }} />

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

        <div className="hidden md:flex items-center gap-8">
          {[["hero", "Главная"], ["pricing", "Тарифы"], ["features", "Характеристики"], ["about", "О нас"], ["faq", "FAQ"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="font-ibm text-sm tracking-wider text-gray-400 hover:text-cyan-400 transition-colors duration-300 uppercase relative group">
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: "var(--neon-cyan)" }} />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => window.open("http://2.26.80.222", "_blank")}
            className="neon-btn-purple px-5 py-2 rounded text-sm font-semibold flex items-center gap-2">
            <Icon name="LayoutDashboard" size={14} />
            Панель
          </button>
          <button onClick={() => setPanelModal(true)}
            className="neon-btn px-5 py-2 rounded text-sm font-semibold flex items-center gap-2">
            <Icon name="ClipboardList" size={14} />
            Заявка
          </button>
          <button onClick={() => isAdmin ? setIsAdmin(false) : setPromoModal(true)}
            className="px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-all duration-300"
            style={isAdmin
              ? { background: "rgba(0,255,100,0.15)", border: "1px solid rgba(0,255,100,0.5)", color: "#00ff64" }
              : { background: "rgba(255,200,0,0.08)", border: "1px solid rgba(255,200,0,0.3)", color: "rgba(255,200,0,0.8)" }}>
            <Icon name={isAdmin ? "ShieldCheck" : "Tag"} size={14} />
            {isAdmin ? "Админ" : "Промокод"}
          </button>
        </div>

        <button className="md:hidden text-cyan-400" onClick={() => setNavOpen(!navOpen)}>
          <Icon name={navOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* Mobile menu */}
      {navOpen && (
        <div className="fixed inset-0 z-40 pt-20" style={{ background: "rgba(5,10,15,0.97)", backdropFilter: "blur(20px)" }}>
          <div className="flex flex-col items-center gap-6 pt-10">
            {[["hero", "Главная"], ["pricing", "Тарифы"], ["features", "Характеристики"], ["about", "О нас"], ["faq", "FAQ"]].map(([id, label], i) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="font-orbitron text-lg tracking-widest text-gray-300 hover:text-cyan-400 transition-colors uppercase"
                style={{ animationDelay: `${i * 0.05}s` }}>
                {label}
              </button>
            ))}
            <button onClick={() => { window.open("http://2.26.80.222", "_blank"); setNavOpen(false); }}
              className="neon-btn-purple px-8 py-3 rounded text-base font-semibold flex items-center gap-2 mt-2">
              <Icon name="LayoutDashboard" size={16} />
              Панель
            </button>
            <button onClick={() => { setPanelModal(true); setNavOpen(false); }}
              className="neon-btn px-8 py-3 rounded text-base font-semibold flex items-center gap-2">
              <Icon name="ClipboardList" size={16} />
              Заявка
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section ref={heroRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Вращающиеся кольца */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full animate-spin-slow"
            style={{ border: "1px solid rgba(0,255,255,0.12)", borderTopColor: "rgba(0,255,255,0.5)", borderRightColor: "transparent" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full animate-spin-slow"
            style={{ border: "1px solid rgba(191,95,255,0.1)", borderBottomColor: "rgba(191,95,255,0.4)", animationDirection: "reverse", animationDuration: "14s" }} />
          <div className="absolute w-[300px] h-[300px] rounded-full animate-spin-slow"
            style={{ border: "1px dashed rgba(0,255,255,0.08)", animationDuration: "8s" }} />
          {/* Центральное свечение */}
          <div className="absolute w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,255,255,0.07) 0%, transparent 70%)", animation: "pulse-glow 3s ease-in-out infinite" }} />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs tracking-widest uppercase animate-fade-in-up"
            style={{ border: "1px solid rgba(0,255,255,0.3)", background: "rgba(0,255,255,0.05)", color: "rgba(0,255,255,0.8)" }}>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Европейские серверы онлайн
          </div>

          <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-none animate-glitch"
            style={{ color: "var(--neon-cyan)", textShadow: "0 0 20px var(--neon-cyan), 0 0 60px var(--neon-cyan)" }}>
            ASTRIX
          </h1>

          <p className="font-orbitron text-lg md:text-2xl font-light tracking-[0.2em] text-gray-300 mb-4 animate-fade-in-up stagger-2">
            <TypewriterText texts={["ИГРОВЫЕ СЕРВЕРЫ В ЕВРОПЕ", "АВТОДЕПЛОЙ ЗА 60 СЕКУНД", "AMD RYZEN 9 · МИНИМАЛЬНЫЙ ПИНГ"]} />
          </p>

          <p className="font-ibm text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-3">
            Игровые серверы в Германии и Финляндии на базе AMD Ryzen&nbsp;9&nbsp;3900.<br />
            Минимальный пинг · Автоматическое развёртывание за 60 секунд.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-4">
            <button onClick={() => scrollTo("pricing")}
              className="neon-btn px-8 py-4 rounded text-base font-semibold relative overflow-hidden group">
              <span className="relative z-10">Выбрать тариф</span>
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.2), transparent)" }} />
            </button>
            <button onClick={() => scrollTo("features")}
              className="neon-btn-purple px-8 py-4 rounded text-base font-semibold relative overflow-hidden group">
              <span className="relative z-10">Характеристики</span>
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{ background: "linear-gradient(90deg, transparent, rgba(191,95,255,0.2), transparent)" }} />
            </button>
          </div>

          {/* Stats с анимированными счётчиками */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            <AnimatedStat value={99} label="Uptime" suffix=".9%" />
            <AnimatedStat value="< 60с" label="Развёртывание" />
            <AnimatedStat value={247} label="Серверов онлайн" />
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
          <RevealSection className="text-center mb-10">
            <span className="font-orbitron text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon-cyan)" }}>Тарифные планы</span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mt-3 text-white">ВЫБЕРИТЕ МОЩНОСТЬ</h2>
            <p className="font-ibm text-gray-400 mt-4 text-base">Все серверы на AMD Ryzen 9 3900 · NVMe SSD · Мгновенное развёртывание</p>
          </RevealSection>

          {/* Вкладки локаций */}
          <RevealSection className="flex justify-center mb-10">
            <div className="flex rounded-xl overflow-hidden p-1 gap-1"
              style={{ background: "rgba(0,255,255,0.05)", border: "1px solid rgba(0,255,255,0.15)" }}>
              {[
                { key: "de", label: "🇩🇪 Германия" },
                { key: "fi", label: "🇫🇮 Финляндия" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setPricingTab(key)}
                  className="px-6 py-2.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider transition-all duration-300"
                  style={pricingTab === key ? {
                    background: "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,128,255,0.15))",
                    color: "var(--neon-cyan)",
                    boxShadow: "0 0 20px rgba(0,255,255,0.2)",
                    border: "1px solid rgba(0,255,255,0.4)",
                  } : {
                    color: "rgba(150,150,150,0.8)",
                    border: "1px solid transparent",
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {plans
              .filter(p => pricingTab === "de" ? p.location.includes("Германия") : p.location.includes("Финляндия"))
              .map((plan, i) => <PlanCard key={plan.id} plan={plan} index={i} />)}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <span className="font-orbitron text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon-cyan)" }}>Технологии</span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mt-3 text-white">ХАРАКТЕРИСТИКИ</h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <RevealSection key={i} delay={i * 0.07}>
                <div className="card-glow rounded-xl p-6 group h-full">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: "rgba(0,255,255,0.1)", border: "1px solid rgba(0,255,255,0.2)" }}>
                    <Icon name={f.icon} size={22} className="text-cyan-400" fallback="Server" />
                  </div>
                  <h3 className="font-orbitron text-sm font-bold text-white mb-2 tracking-wide">{f.title}</h3>
                  <p className="font-ibm text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* CPU highlight */}
          <RevealSection delay={0.2} className="mt-10">
            <div className="rounded-2xl p-8 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.05), rgba(191,95,255,0.05))", border: "1px solid rgba(0,255,255,0.2)" }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,255,0.04) 0%, transparent 70%)" }} />
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
          </RevealSection>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-12">
            <span className="font-orbitron text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon-cyan)" }}>Компания</span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mt-3 text-white">О НАС</h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <RevealSection delay={0.1}>
              <div className="card-glow rounded-2xl p-8">
                <h3 className="font-orbitron text-lg font-bold mb-4" style={{ color: "var(--neon-cyan)" }}>Astrix Hosting</h3>
                <p className="font-ibm text-gray-400 leading-relaxed mb-4">
                  Мы предоставляем высокопроизводительные VPS-серверы в Европе для разработчиков, геймеров и бизнеса.
                  Наша инфраструктура построена на новейшем железе и обеспечивает максимальную стабильность.
                </p>
                <p className="font-ibm text-gray-400 leading-relaxed">
                  Поддержка работает 24/7 через Telegram — быстрые ответы и реальная помощь в настройке серверов.
                </p>
                <button onClick={() => window.open(`https://t.me/${TELEGRAM_USERNAME}`, "_blank")}
                  className="neon-btn mt-6 px-6 py-3 rounded text-sm font-semibold flex items-center gap-2 w-full justify-center relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2"><Icon name="Send" size={16} />@AstrixHosting в Telegram</span>
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.15), transparent)" }} />
                </button>
              </div>
            </RevealSection>

            <div className="space-y-4">
              {[
                { icon: "MapPin", title: "Локации", desc: "Германия (Frankfurt) и Финляндия (Helsinki)" },
                { icon: "Clock", title: "Развёртывание", desc: "Автоматически за 60 секунд после оплаты" },
                { icon: "Headphones", title: "Поддержка", desc: "Telegram 24/7, ответ в течение 15 минут" },
                { icon: "Lock", title: "Безопасность", desc: "DDoS-защита, изолированные среды" },
              ].map((item, i) => (
                <RevealSection key={i} delay={0.1 + i * 0.07}>
                  <div className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
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
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealSection className="text-center mb-16">
            <span className="font-orbitron text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon-cyan)" }}>Вопросы</span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mt-3 text-white">FAQ</h2>
          </RevealSection>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <RevealSection key={i} delay={i * 0.06}>
                <div className="rounded-xl overflow-hidden"
                  style={{
                    border: openFaq === i ? "1px solid rgba(0,255,255,0.4)" : "1px solid rgba(0,255,255,0.1)",
                    background: "rgba(7,14,22,0.8)",
                    boxShadow: openFaq === i ? "0 0 30px rgba(0,255,255,0.08)" : "none",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}>
                  <button
                    className="w-full flex items-center justify-between p-5 text-left group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-ibm text-sm md:text-base font-medium text-white pr-4 group-hover:text-cyan-300 transition-colors duration-200">{faq.q}</span>
                    <div style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
                      <Icon name="ChevronDown" size={18} className="text-cyan-400 flex-shrink-0" />
                    </div>
                  </button>
                  <div style={{
                    maxHeight: openFaq === i ? "200px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}>
                    <p className="font-ibm text-sm text-gray-400 leading-relaxed px-5 pb-5"
                      style={{ borderTop: "1px solid rgba(0,255,255,0.1)", paddingTop: "16px" }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6">
        <RevealSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl p-10 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.08), rgba(191,95,255,0.08))", border: "1px solid rgba(0,255,255,0.25)", boxShadow: "0 0 80px rgba(0,255,255,0.08)" }}>
              {/* Анимированный фон */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full animate-spin-slow"
                  style={{ border: "1px solid rgba(0,255,255,0.06)", borderTopColor: "transparent" }} />
                <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full animate-spin-slow"
                  style={{ border: "1px solid rgba(191,95,255,0.06)", animationDirection: "reverse", animationDuration: "12s" }} />
              </div>
              <h2 className="font-orbitron text-2xl md:text-4xl font-black text-white mb-4 relative z-10">ГОТОВ НАЧАТЬ?</h2>
              <p className="font-ibm text-gray-400 mb-8 text-base relative z-10">
                Выбери тариф и получи мощный сервер в Европе за 60 секунд
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <button onClick={() => scrollTo("pricing")}
                  className="neon-btn px-8 py-4 rounded text-base font-semibold relative overflow-hidden group">
                  <span className="relative z-10">ВЫБРАТЬ ТАРИФ</span>
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.2), transparent)" }} />
                </button>
                <button onClick={() => window.open(`https://t.me/${TELEGRAM_USERNAME}`, "_blank")}
                  className="neon-btn-purple px-8 py-4 rounded text-base font-semibold flex items-center justify-center gap-2 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2"><Icon name="Send" size={16} />@ASTRIXHOSTING</span>
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(191,95,255,0.2), transparent)" }} />
                </button>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* МОДАЛКА ПАНЕЛИ */}
      {panelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(5,10,15,0.92)", backdropFilter: "blur(16px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) { setPanelModal(false); setFormSent(false); } }}>
          <div className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(7,14,22,0.98), rgba(5,10,15,0.99))", border: "1px solid rgba(191,95,255,0.4)", boxShadow: "0 0 80px rgba(191,95,255,0.15), 0 0 40px rgba(0,255,255,0.08)" }}>

            {/* Закрыть */}
            <button onClick={() => { setPanelModal(false); setFormSent(false); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-cyan-400 transition-colors z-10">
              <Icon name="X" size={20} />
            </button>

            <div className="p-8">
              {/* Иконка */}
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(191,95,255,0.15)", border: "1px solid rgba(191,95,255,0.4)" }}>
                <Icon name="LayoutDashboard" size={26} className="text-purple-400" />
              </div>

              <h3 className="font-orbitron text-xl font-bold text-white mb-2">Доступ к панели</h3>
              <p className="font-ibm text-gray-400 text-sm leading-relaxed mb-6">
                Для входа в панель управления необходимо создать аккаунт. Напишите разработчику&nbsp;
                <span style={{ color: "var(--neon-cyan)" }}>@HellwayYT</span> в Telegram — он создаст ваш аккаунт.
              </p>

              {/* Кнопка Telegram */}
              <button onClick={() => window.open("https://t.me/HellwayYT?text=Привет! Хочу получить аккаунт в панели Astrix Hosting", "_blank")}
                className="w-full neon-btn py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 mb-6 relative overflow-hidden group">
                <span className="relative z-10 flex items-center gap-2">
                  <Icon name="Send" size={16} />
                  Написать @HellwayYT в Telegram
                </span>
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.15), transparent)" }} />
              </button>

              {/* Разделитель */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px" style={{ background: "rgba(0,255,255,0.1)" }} />
                <span className="font-ibm text-xs text-gray-600 uppercase tracking-widest">или заполните форму</span>
                <div className="flex-1 h-px" style={{ background: "rgba(0,255,255,0.1)" }} />
              </div>

              {!formSent ? (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div>
                    <label className="font-ibm text-xs text-gray-500 uppercase tracking-wider block mb-1.5">Ваше имя *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-2.5 rounded-lg font-ibm text-sm text-white placeholder-gray-600 outline-none transition-all duration-300"
                      style={{ background: "rgba(0,255,255,0.04)", border: "1px solid rgba(0,255,255,0.15)" }}
                      onFocus={e => e.target.style.borderColor = "rgba(0,255,255,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(0,255,255,0.15)"} />
                  </div>
                  <div>
                    <label className="font-ibm text-xs text-gray-500 uppercase tracking-wider block mb-1.5">Telegram *</label>
                    <input required value={form.tg} onChange={e => setForm({ ...form, tg: e.target.value })}
                      placeholder="@username"
                      className="w-full px-4 py-2.5 rounded-lg font-ibm text-sm text-white placeholder-gray-600 outline-none transition-all duration-300"
                      style={{ background: "rgba(0,255,255,0.04)", border: "1px solid rgba(0,255,255,0.15)" }}
                      onFocus={e => e.target.style.borderColor = "rgba(0,255,255,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(0,255,255,0.15)"} />
                  </div>
                  <div>
                    <label className="font-ibm text-xs text-gray-500 uppercase tracking-wider block mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-2.5 rounded-lg font-ibm text-sm text-white placeholder-gray-600 outline-none transition-all duration-300"
                      style={{ background: "rgba(0,255,255,0.04)", border: "1px solid rgba(0,255,255,0.15)" }}
                      onFocus={e => e.target.style.borderColor = "rgba(0,255,255,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(0,255,255,0.15)"} />
                  </div>
                  <div>
                    <label className="font-ibm text-xs text-gray-500 uppercase tracking-wider block mb-1.5">Комментарий</label>
                    <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })}
                      placeholder="Какой тариф вас интересует, ваши пожелания..."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg font-ibm text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 resize-none"
                      style={{ background: "rgba(0,255,255,0.04)", border: "1px solid rgba(0,255,255,0.15)" }}
                      onFocus={e => e.target.style.borderColor = "rgba(0,255,255,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(0,255,255,0.15)"} />
                  </div>
                  <button type="submit"
                    className="w-full neon-btn-purple py-3 rounded-lg text-sm font-semibold mt-2 flex items-center justify-center gap-2">
                    <Icon name="Send" size={15} />
                    Отправить заявку
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(0,255,255,0.1)", border: "1px solid rgba(0,255,255,0.4)" }}>
                    <Icon name="Check" size={28} className="text-cyan-400" />
                  </div>
                  <p className="font-orbitron text-base font-bold text-white mb-2">Заявка отправлена!</p>
                  <p className="font-ibm text-sm text-gray-400">@HellwayYT свяжется с вами и создаст аккаунт в ближайшее время.</p>
                  <button onClick={() => { setPanelModal(false); setFormSent(false); setForm({ name: "", tg: "", email: "", comment: "" }); }}
                    className="neon-btn mt-5 px-6 py-2 rounded text-sm font-semibold">
                    Закрыть
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛКА ПРОМОКОДА */}
      {promoModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          style={{ background: "rgba(5,10,15,0.95)", backdropFilter: "blur(20px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) { setPromoModal(false); setPromoInput(""); setPromoError(false); } }}>
          <div className="relative w-full max-w-sm rounded-2xl p-8"
            style={{ background: "linear-gradient(135deg, rgba(7,14,22,0.99), rgba(5,10,15,1))", border: "1px solid rgba(255,200,0,0.3)", boxShadow: "0 0 60px rgba(255,200,0,0.1)" }}>
            <button onClick={() => { setPromoModal(false); setPromoInput(""); setPromoError(false); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-yellow-400 transition-colors">
              <Icon name="X" size={18} />
            </button>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: "rgba(255,200,0,0.1)", border: "1px solid rgba(255,200,0,0.3)" }}>
              <Icon name="Tag" size={22} className="text-yellow-400" />
            </div>
            <h3 className="font-orbitron text-lg font-bold text-white mb-1">Промокод</h3>
            <p className="font-ibm text-sm text-gray-500 mb-6">Введите промокод для активации</p>
            <form onSubmit={handlePromoSubmit} className="space-y-4">
              <input
                autoFocus
                value={promoInput}
                onChange={e => { setPromoInput(e.target.value); setPromoError(false); }}
                placeholder="Введите промокод..."
                className="w-full px-4 py-3 rounded-lg font-ibm text-sm text-white placeholder-gray-600 outline-none transition-all duration-300"
                style={{ background: "rgba(255,200,0,0.04)", border: promoError ? "1px solid rgba(255,80,80,0.7)" : "1px solid rgba(255,200,0,0.2)" }} />
              {promoError && (
                <p className="font-ibm text-xs text-red-400 flex items-center gap-1.5">
                  <Icon name="AlertCircle" size={12} />
                  Неверный промокод
                </p>
              )}
              <button type="submit"
                className="w-full py-3 rounded-lg font-orbitron text-sm font-semibold transition-all duration-300"
                style={{ background: "rgba(255,200,0,0.15)", border: "1px solid rgba(255,200,0,0.4)", color: "#ffc800" }}>
                Активировать
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN PANEL */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-[90] w-full max-w-xl">
          <div className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "rgba(5,10,15,0.97)", border: "1px solid rgba(0,255,100,0.4)", boxShadow: "0 0 60px rgba(0,255,100,0.1)" }}>
            {/* Шапка */}
            <div className="flex items-center justify-between px-5 py-3"
              style={{ borderBottom: "1px solid rgba(0,255,100,0.15)", background: "rgba(0,255,100,0.05)" }}>
              <div className="flex items-center gap-2">
                <Icon name="ShieldCheck" size={16} className="text-green-400" />
                <span className="font-orbitron text-xs font-bold tracking-widest text-green-400">ADMIN PANEL</span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse ml-1" />
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setAdminTab("forms")}
                  className="font-ibm text-xs px-3 py-1 rounded transition-all duration-200"
                  style={adminTab === "forms" ? { background: "rgba(0,255,100,0.2)", color: "#00ff64", border: "1px solid rgba(0,255,100,0.4)" } : { color: "rgba(150,150,150,0.6)", border: "1px solid transparent" }}>
                  Заявки ({submissions.length})
                </button>
                <button onClick={() => setAdminTab("logs")}
                  className="font-ibm text-xs px-3 py-1 rounded transition-all duration-200"
                  style={adminTab === "logs" ? { background: "rgba(0,255,100,0.2)", color: "#00ff64", border: "1px solid rgba(0,255,100,0.4)" } : { color: "rgba(150,150,150,0.6)", border: "1px solid transparent" }}>
                  Логи
                </button>
                <button onClick={() => setIsAdmin(false)} className="text-gray-600 hover:text-red-400 transition-colors ml-2">
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>

            {/* Контент */}
            <div className="overflow-y-auto" style={{ maxHeight: "320px" }}>
              {adminTab === "forms" ? (
                submissions.length === 0 ? (
                  <div className="text-center py-10">
                    <Icon name="Inbox" size={28} className="text-gray-700 mx-auto mb-2" />
                    <p className="font-ibm text-sm text-gray-600">Заявок пока нет</p>
                  </div>
                ) : (
                  <div className="divide-y" style={{ borderColor: "rgba(0,255,100,0.08)" }}>
                    {submissions.map((s, i) => (
                      <div key={i}>
                        {/* Шапка заявки */}
                        <button className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                          onClick={() => setOpenChat(openChat === i ? null : i)}>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                              style={{ background: "rgba(0,255,100,0.15)", color: "#00ff64" }}>
                              {s.name[0]?.toUpperCase()}
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-2">
                                <span className="font-ibm text-sm font-medium text-white">{s.name}</span>
                                <span className="font-ibm text-xs text-cyan-400">{s.tg}</span>
                              </div>
                              <p className="font-ibm text-xs text-gray-600 truncate max-w-[200px]">{s.comment || s.email || "Без комментария"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {(chats[i]?.length || 0) > 0 && (
                              <span className="font-ibm text-xs px-2 py-0.5 rounded-full"
                                style={{ background: "rgba(0,255,100,0.15)", color: "#00ff64" }}>
                                {chats[i].length}
                              </span>
                            )}
                            <Icon name={openChat === i ? "ChevronUp" : "ChevronDown"} size={14} className="text-gray-600" />
                          </div>
                        </button>

                        {/* Раскрывающийся чат */}
                        {openChat === i && (
                          <div style={{ borderTop: "1px solid rgba(0,255,100,0.06)", background: "rgba(0,0,0,0.3)" }}>
                            {/* Инфо о заявке */}
                            <div className="px-5 py-3 space-y-1" style={{ borderBottom: "1px solid rgba(0,255,100,0.06)" }}>
                              {s.email && <p className="font-ibm text-xs text-gray-500">📧 {s.email}</p>}
                              {s.comment && <p className="font-ibm text-xs text-gray-400">💬 {s.comment}</p>}
                              <p className="font-ibm text-xs text-gray-600">🕐 {s.date}</p>
                            </div>

                            {/* Сообщения чата */}
                            <div className="px-5 py-3 space-y-2 overflow-y-auto" style={{ maxHeight: "160px" }}>
                              {/* Исходное сообщение от пользователя */}
                              <div className="flex justify-start">
                                <div className="max-w-[80%] px-3 py-2 rounded-xl rounded-tl-sm"
                                  style={{ background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.15)" }}>
                                  <p className="font-ibm text-xs text-gray-300">{s.comment || "Нет комментария"}</p>
                                  <p className="font-ibm text-[10px] text-gray-600 mt-1">{s.name} · {s.date}</p>
                                </div>
                              </div>
                              {/* Сообщения администратора */}
                              {(chats[i] || []).map((msg, mi) => (
                                <div key={mi} className={`flex ${msg.from === "admin" ? "justify-end" : "justify-start"}`}>
                                  <div className="max-w-[80%] px-3 py-2 rounded-xl"
                                    style={msg.from === "admin"
                                      ? { background: "rgba(0,255,100,0.12)", border: "1px solid rgba(0,255,100,0.25)", borderBottomRightRadius: "4px" }
                                      : { background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.15)", borderBottomLeftRadius: "4px" }}>
                                    <p className="font-ibm text-xs text-gray-200">{msg.text}</p>
                                    <p className="font-ibm text-[10px] text-gray-600 mt-1">
                                      {msg.from === "admin" ? "Вы" : s.name} · {msg.time}
                                    </p>
                                  </div>
                                </div>
                              ))}
                              <div ref={chatEndRef} />
                            </div>

                            {/* Поле ввода */}
                            <div className="px-5 py-3 flex gap-2" style={{ borderTop: "1px solid rgba(0,255,100,0.06)" }}>
                              <input
                                value={replyTexts[i] || ""}
                                onChange={e => setReplyTexts(prev => ({ ...prev, [i]: e.target.value }))}
                                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(i); } }}
                                placeholder="Написать ответ..."
                                className="flex-1 px-3 py-2 rounded-lg font-ibm text-xs text-white placeholder-gray-600 outline-none"
                                style={{ background: "rgba(0,255,100,0.05)", border: "1px solid rgba(0,255,100,0.2)" }} />
                              <button onClick={() => sendReply(i)}
                                className="px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-200 hover:opacity-90"
                                style={{ background: "rgba(0,255,100,0.15)", border: "1px solid rgba(0,255,100,0.3)", color: "#00ff64" }}>
                                <Icon name="Send" size={13} />
                              </button>
                              <button onClick={() => window.open(`https://t.me/${s.tg.replace("@", "")}`, "_blank")}
                                title="Открыть в Telegram"
                                className="px-3 py-2 rounded-lg flex items-center transition-all duration-200 hover:opacity-90"
                                style={{ background: "rgba(0,180,255,0.1)", border: "1px solid rgba(0,180,255,0.25)", color: "#00bfff" }}>
                                <Icon name="ExternalLink" size={13} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="divide-y" style={{ borderColor: "rgba(0,255,100,0.08)" }}>
                  {logs.map((log, i) => {
                    const colors: Record<string, string> = { form: "#00ff64", panel: "#bf5fff", promo: "#ffc800", visit: "#00bfff", buy: "#ff6040" };
                    const icons: Record<string, string> = { form: "ClipboardList", panel: "LayoutDashboard", promo: "Tag", visit: "Eye", buy: "ShoppingCart" };
                    return (
                      <div key={i} className="flex items-center gap-3 px-5 py-3">
                        <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: `${colors[log.type]}18` }}>
                          <Icon name={icons[log.type]} size={11} fallback="Activity" style={{ color: colors[log.type] }} />
                        </div>
                        <span className="font-ibm text-sm text-gray-300 flex-1">{log.event}</span>
                        <span className="font-ibm text-xs text-gray-600 flex-shrink-0">{log.time}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(0,255,255,0.1)" }}>
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