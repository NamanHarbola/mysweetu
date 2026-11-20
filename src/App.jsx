import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Heart,
  Sparkles,
  Gift,
  MailOpen,
  Star,
  Smile,
  MessageCircleHeart,
  Sun,
  Coffee,
  Feather,
  Infinity as InfinityIcon,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

/**
 * ============================================================================
 * CENTRALIZED CONTENT CONFIGURATION
 * Edit anything below to personalize Aastha's website!
 * Place your photos inside `public/photos/` named 1.jpg through 6.jpg
 * ============================================================================
 */
const SITE_CONTENT = {
  recipientName: "Aastha",

  openingScreen: {
    heading: "Hey, My Favourite Person ❤️",
    subheading:
      "I made something special for you. Just a little reminder of how much you mean to me.",
    buttonText: "Open Your Surprise 💌",
    envelopeBadge: "For Aastha",
  },

  hero: {
    eyebrow: "A Little Corner of the Internet, Just for You",
    heading: "Words will never be enough to explain how much you mean to me.",
    supportingText:
      "But I still wanted to try, so I made this little corner of the internet just for you.",
    personalNote:
      "Back in school, I used to get so excited whenever your message popped up because I was too shy to text you first. Honestly, nothing has changed—I still get that exact same feeling every time my phone lights up with your name in the morning and all throughout the day. Thank you for being my safe place, my best friend, my girlfriend & fav part of every day.",
    scrollPrompt: "There's more for you ↓",
  },

  reasonsSection: {
    badge: "Tap each card to unwrap",
    title: "10 Little Reasons Why I Love You",
    subtitle:
      "Think of these as ten tiny envelopes waiting for you to open them—one piece of my heart at a time.",
    closingNote:
      "And honestly, these are just 10 reasons. I could spend forever telling you more. ❤️",
    reasons: [
      {
        id: 1,
        title: "Your Smile",
        text: "Since day 1 i love your smile, it makes my smile bigger when i see it.",
      },
      {
        id: 2,
        title: "Your love for me",
        text: "I love that you love me back the way i love you cause thats unimageable for me, and i love that you make me feel so special.",
      },
      {
        id: 3,
        title: "Silent Understanding",
        text: "I love how you understand me, even when I struggle to explain myself.",
      },
      {
        id: 4,
        title: "All Your Little Quirks",
        text: "I love your little habits and all the tiny things that make you YOU.",
      },
      {
        id: 5,
        title: "Our Endless Talks",
        text: "Babe, I love talking to you, even when we have absolutely nothing to talk about.",
      },
      {
        id: 6,
        title: "Apki cute habbits",
        text: "I love how you say (why u hate me) so i can say i love you again and againn.",
      },
      {
        id: 7,
        title: "Your Beautiful Heart",
        text: "I love your personality since day 1 babe and also your kind heart, it makes me feel so lucky to have you in my life.",
      },
      {
        id: 8,
        title: "Being Myself",
        text: "I love that I can be completely myself around you.",
      },
      {
        id: 9,
        title: "All the gifts you've given me",
        text: "My drawer is full of the gifts you gave me,and I love that you always make me feel special with your gifts.",
      },
      {
        id: 10,
        title: "You Being You",
        text: "I love you simply because you're you, and there's nobody I'd rather have in my life.",
      },
    ],
  },

  letter: {
    sectionEyebrow: "From My Heart to Yours",
    sectionTitle: "A Little Love Letter 💌",
    dateLabel: "Written with love, for my aastha ji",
    salutation: "My favourite person,",
    paragraphs: [
      "I don't think you realize how much happiness you bring into my life. Even the smallest conversations, the silly moments, and the little things we share mean more to me than I can explain.",
      "I may not always find the perfect words to express it, but I hope you never forget how special you are to me.",
      "Thank you for being you. Thank you for all the smiles, memories, and beautiful moments.",
      "I love you, more than these little words could ever explain.",
    ],
    signOff: "Always yours ❤️",
    sealInitials: "N" ,
  },

  gallery: {
    eyebrow: "Snapshots of Us",
    title: "Little Moments, Big Memories",
    subtitle:
      "Every picture holds a laugh, a quiet glance, or a moment I wish I could replay all over again. Tap any photo to view it closer.",
    memories: [
      {
        id: 1,
        src: "/photos/5.jpg",
        caption: "First Social Outing Together",
        date: "28 June 2026",
      },
      {
        id: 2,
        src: "/photos/1.jpg",
        caption: "First Activity Together",
        date: "12 July 2026",
      },
      {
        id: 3,
        src: "/photos/3.jpg",
        caption: "First Trip!!! You are mineee....forever",
        date: "10 October 2026",
      },
      {
        id: 4,
        src: "/photos/6.jpg",
        caption: "The little flowers & surprises along the way",
        date: "6 September 2026",
      },
      {
        id: 5,
        src: "/photos/2.jpg",
        caption: "HeHe, Love the twinning outfits we wore that day",
        date: "27 September 2026",
      },
      {
        id: 6,
        src: "/photos/4.jpg",
        caption: "My lucky charm, my favourite person, my everything",
        date: "12 November 2026",
      },
    ],
  },

  surprise: {
    eyebrow: "Wait before you go...",
    title: "One More Thing...",
    subtitle: "I tucked one last little promise inside this box just for you.",
    buttonText: "There's Another Surprise 🎁",
    revealedMessage:
      "If I had to choose all over again, I'd still choose you. Every single time. ❤️",
    revealedSubtext: "Today, tomorrow, and in every lifetime.",
  },

  finale: {
    heading: "Just Remember...",
    message:
      "You are loved, appreciated, and more special to me than you could ever imagine.",
    footerNote: "Made with all my love, just for you. ❤️",
    signature: "Naman",
  },
};

/**
 * ============================================================================
 * DECORATIVE SVG & AMBIENT COMPONENTS
 * ============================================================================
 */
const BotanicalCorner = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M12 108C24 76 52 44 104 16"
      stroke="#D98A9C"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <path
      d="M36 74C24 68 18 56 22 44C34 46 42 56 36 74Z"
      fill="#F7C5D0"
      fillOpacity="0.45"
    />
    <path
      d="M54 56C64 66 78 68 88 60C82 48 68 46 54 56Z"
      fill="#FAD6C6"
      fillOpacity="0.55"
    />
    <path
      d="M72 38C62 30 58 18 64 10C74 14 78 26 72 38Z"
      fill="#E5DCF7"
      fillOpacity="0.6"
    />
    <circle cx="96" cy="22" r="4.5" fill="#E89CAE" fillOpacity="0.55" />
    <circle cx="103" cy="15" r="2.5" fill="#F4B89E" fillOpacity="0.65" />
  </svg>
);

const FloatingAmbientHearts = ({ count = 14 }) => {
  const shouldReduceMotion = useReducedMotion();

  const particles = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 7.3 + 5) % 94}%`,
        delay: (i * 0.85) % 6,
        duration: 9 + (i % 5) * 2.2,
        size: 11 + (i % 4) * 4,
        isSparkle: i % 3 === 0,
        drift: i % 2 === 0 ? 18 : -18,
      })),
    [count]
  );

  if (shouldReduceMotion) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "105vh", x: 0, opacity: 0, scale: 0.7 }}
          animate={{
            y: "-12vh",
            x: [0, p.drift, 0],
            opacity: [0, 0.5, 0.45, 0],
            scale: [0.75, 1, 0.9],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ left: p.left }}
          className="absolute"
        >
          {p.isSparkle ? (
            <Sparkles
              style={{ width: p.size, height: p.size }}
              className="text-[#C8B6E2]/65"
            />
          ) : (
            <Heart
              style={{ width: p.size, height: p.size }}
              className="text-[#E89CAE]/55 fill-[#F7C5D0]/50"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

/**
 * ============================================================================
 * 1. OPENING SCREEN – ENVELOPE SURPRISE
 * ============================================================================
 */
const OpeningEnvelopeScreen = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1250);
  };

  return (
    <motion.div
      key="opening-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: "blur(6px)",
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-5 py-8 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #FCE7EC 0%, #FFF9F5 45%, #F4EEFB 100%)",
      }}
    >
      {/* Ambient floating hearts */}
      <FloatingAmbientHearts count={16} />

      {/* Soft glowing orbs */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#F8C8D4]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#DFD3F5]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center text-center">
        {/* Small personalized pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#F3D1DA] shadow-sm mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C97B8E]" />
          <span className="text-xs font-medium tracking-widest uppercase text-[#8A5A65]">
            {SITE_CONTENT.openingScreen.envelopeBadge}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#4A2E35] leading-tight tracking-tight mb-4"
        >
          {SITE_CONTENT.openingScreen.heading}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg text-[#6E4D54] max-w-md leading-relaxed mb-10"
        >
          {SITE_CONTENT.openingScreen.subheading}
        </motion.p>

        {/* Animated Interactive Envelope */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55, type: "spring" }}
          onClick={handleOpenClick}
          role="button"
          tabIndex={0}
          aria-label="Open love letter envelope"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleOpenClick();
          }}
          className="relative w-72 sm:w-80 h-48 sm:h-52 cursor-pointer group mb-10 select-none"
          style={{ perspective: "1000px" }}
        >
          {/* Soft shadow under envelope */}
          <div className="absolute -bottom-4 inset-x-6 h-6 bg-[#C97B8E]/20 blur-xl rounded-full transition-all duration-500 group-hover:bg-[#C97B8E]/30" />

          {/* Envelope Back Body */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#FAD9E2] to-[#F4C4D2] border border-[#EAB4C4] shadow-xl overflow-visible">
            {/* Inner Letter Card that rises up */}
            <motion.div
              animate={
                isOpening
                  ? { y: -76, scale: 1.03, opacity: 1 }
                  : { y: 0, scale: 0.96, opacity: 0.95 }
              }
              transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
              className="absolute inset-x-4 top-3 bottom-4 rounded-xl bg-[#FFFDF9] border border-[#F3E2D8] shadow-md flex flex-col items-center justify-center p-4 z-10"
            >
              <Heart className="w-6 h-6 text-[#D86C84] fill-[#D86C84] mb-1.5" />
              <p className="font-handwriting text-xl sm:text-2xl text-[#5A3840]">
                For {SITE_CONTENT.recipientName} ✨
              </p>
              <p className="text-[11px] tracking-wider uppercase text-[#9E7680] mt-0.5">
                With all my love
              </p>
            </motion.div>

            {/* Envelope Bottom & Side Flaps (Front Pocket) */}
            <svg
              viewBox="0 0 320 200"
              className="absolute inset-0 w-full h-full z-20 pointer-events-none rounded-2xl overflow-hidden"
              preserveAspectRatio="none"
            >
              {/* Left flap */}
              <polygon points="0,0 165,108 0,200" fill="#F9D5DF" />
              {/* Right flap */}
              <polygon points="320,0 155,108 320,200" fill="#F7CCD8" />
              {/* Bottom flap */}
              <polygon
                points="0,200 160,96 320,200"
                fill="#FCE3EA"
                stroke="#EBB9C7"
                strokeWidth="1"
              />
            </svg>

            {/* Envelope Top Flap (3D Hinged) */}
            <motion.div
              animate={
                isOpening
                  ? { rotateX: 180, zIndex: 5 }
                  : { rotateX: 0, zIndex: 30 }
              }
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: "top center" }}
              className="absolute top-0 inset-x-0 h-28 pointer-events-none"
            >
              <svg
                viewBox="0 0 320 115"
                className="w-full h-full drop-shadow-sm"
                preserveAspectRatio="none"
              >
                <polygon
                  points="0,0 160,112 320,0"
                  fill="#F5C0CF"
                  stroke="#E8ACBD"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>

            {/* Wax Seal Heart on Envelope */}
            <motion.div
              animate={
                isOpening
                  ? { scale: 0, opacity: 0 }
                  : { scale: [1, 1.07, 1], opacity: 1 }
              }
              transition={
                isOpening
                  ? { duration: 0.25 }
                  : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              }
              className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-[#D95B76] to-[#B43E58] shadow-md border-2 border-[#F5A8B8]/60 flex items-center justify-center"
            >
              <Heart className="w-5 h-5 text-white fill-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpenClick}
          disabled={isOpening}
          className="relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#D96B84] via-[#DF7A8E] to-[#E69388] text-white font-medium text-base sm:text-lg shadow-lg shadow-[#D96B84]/30 hover:shadow-xl hover:shadow-[#D96B84]/40 transition-shadow cursor-pointer disabled:opacity-80"
        >
          <span>
            {isOpening
              ? "Opening your letter..."
              : SITE_CONTENT.openingScreen.buttonText}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

/**
 * ============================================================================
 * 2. HERO SECTION – HOW MUCH YOU MEAN TO ME
 * ============================================================================
 */
const HeroSection = () => {
  const scrollToReasons = () => {
    const el = document.getElementById("reasons-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 pt-16 pb-20 overflow-hidden">
      {/* Subtle radial glow behind heart */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] rounded-full bg-gradient-to-tr from-[#F8C8D4]/35 via-[#FAD8C8]/25 to-[#E4D8F8]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <BotanicalCorner className="w-28 sm:w-40 h-28 sm:h-40 absolute top-4 left-4 opacity-80" />
      <BotanicalCorner className="w-28 sm:w-40 h-28 sm:h-40 absolute top-4 right-4 scale-x-[-1] opacity-80" />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Welcome Toast Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#F3D5DD] shadow-sm mb-7"
        >
          <Heart className="w-3.5 h-3.5 text-[#D86C84] fill-[#D86C84]" />
          <span className="text-xs sm:text-sm font-medium text-[#7A505A]">
            {SITE_CONTENT.hero.eyebrow}
          </span>
        </motion.div>

        {/* Pulsing Hero Heart Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="relative mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.12, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#E6859C] blur-xl"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FFF5F7] to-[#FCE0E7] border border-[#F3C3D0] shadow-lg flex items-center justify-center"
          >
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#D8647E] fill-[#E27B93]" />
          </motion.div>
        </motion.div>

        {/* Main Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#4A2E35] leading-[1.18] tracking-tight mb-6"
        >
          {SITE_CONTENT.hero.heading}
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45 }}
          className="text-base sm:text-xl text-[#6E4D54] max-w-2xl leading-relaxed mb-8"
        >
          {SITE_CONTENT.hero.supportingText}
        </motion.p>

        {/* Editable Personal Note Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.6 }}
          className="w-full max-w-xl rounded-3xl bg-white/75 backdrop-blur-md border border-[#F4D9E0] p-6 sm:p-8 shadow-sm mb-12"
        >
          <p className="font-serif-display italic text-lg sm:text-xl text-[#583840] leading-relaxed">
            “{SITE_CONTENT.hero.personalNote}”
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={scrollToReasons}
          className="group inline-flex flex-col items-center gap-2 text-sm font-medium text-[#8C5B66] hover:text-[#4A2E35] transition-colors cursor-pointer"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="px-4 py-2 rounded-full bg-white/70 border border-[#F2D3DC] shadow-xs"
          >
            {SITE_CONTENT.hero.scrollPrompt}
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
};

/**
 * ============================================================================
 * 3. 10 REASONS WHY I LOVE YOU – INTERACTIVE 3D GIFT CARDS
 * ============================================================================
 */
const REASON_ICONS = [
  Smile,
  Sun,
  MessageCircleHeart,
  Sparkles,
  Coffee,
  Star,
  Feather,
  Heart,
  Camera,
  InfinityIcon,
];

const CARD_ACCENTS = [
  { bg: "from-[#FCE4EC] to-[#FFF5F7]", border: "border-[#F5C6D4]", pill: "bg-[#FAD1DE] text-[#8E4357]" },
  { bg: "from-[#FDE8DF] to-[#FFF8F4]", border: "border-[#F6CEBE]", pill: "bg-[#FBD8C9] text-[#8C4E3A]" },
  { bg: "from-[#EFE9FA] to-[#FAF8FE]", border: "border-[#DDD0F4]", pill: "bg-[#E4DAF7] text-[#5D4984]" },
  { bg: "from-[#FCE4EC] to-[#FDECE6]", border: "border-[#F5C9D3]", pill: "bg-[#FAD4DC] text-[#8A4656]" },
  { bg: "from-[#F9E6F0] to-[#FFF7FA]", border: "border-[#EFC8DC]", pill: "bg-[#F4D2E4] text-[#824465]" },
];

const ReasonFlipCard = ({ reason, index, isFlipped, onToggle }) => {
  const IconComponent = REASON_ICONS[index % REASON_ICONS.length];
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const formattedNumber = String(reason.id).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: (index % 5) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`Reason ${reason.id}: ${isFlipped ? reason.text : "Tap to open"}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className="h-60 sm:h-64 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D86C84] rounded-3xl"
      style={{ perspective: "1100px" }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 230,
          damping: 24,
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* FRONT OF GIFT CARD (Unopened) */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${accent.bg} border ${accent.border} p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-between text-center`}
        >
          <div className="w-full flex items-center justify-between">
            <span
              className={`text-xs font-semibold tracking-wider px-3 py-1 rounded-full ${accent.pill}`}
            >
              #{formattedNumber}
            </span>
            <Gift className="w-4 h-4 text-[#B57282]" />
          </div>

          <div className="flex flex-col items-center my-auto">
            <motion.div
              animate={{
                rotate: index % 2 === 0 ? [-3, 3, -3] : [3, -3, 3],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 3.4 + (index % 3) * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-14 h-14 rounded-2xl bg-white/85 border border-white shadow-xs flex items-center justify-center mb-3"
            >
              <IconComponent className="w-7 h-7 text-[#C9647C]" />
            </motion.div>
            <h3 className="font-serif-display text-lg font-medium text-[#4A2E35]">
              Reason #{reason.id}
            </h3>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8C5B66] bg-white/75 px-3.5 py-1.5 rounded-full border border-white/80">
            <Sparkles className="w-3 h-3 text-[#D86C84]" />
            Tap to unwrap
          </span>
        </div>

        {/* BACK OF GIFT CARD (Revealed Reason) */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 rounded-3xl bg-[#FFFDFB] border-2 border-[#EBB8C6] p-6 shadow-md flex flex-col justify-between text-center"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C46B80]">
              Reason {formattedNumber}
            </span>
            <Heart className="w-4 h-4 text-[#D86C84] fill-[#D86C84]" />
          </div>

          <div className="my-auto px-1">
            {reason.title && (
              <p className="font-serif-display text-sm font-semibold text-[#9E5264] mb-1.5">
                {reason.title}
              </p>
            )}
            <p className="text-sm sm:text-[15px] text-[#4A2E35] leading-relaxed font-medium">
              “{reason.text}”
            </p>
          </div>

          <span className="text-[11px] text-[#A27B84]">Tap to fold back</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ReasonsSection = () => {
  const [flippedIds, setFlippedIds] = useState([]);
  const reasons = SITE_CONTENT.reasonsSection.reasons;

  const toggleCard = (id) => {
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allOpened = flippedIds.length === reasons.length;

  const handleToggleAll = () => {
    if (allOpened) {
      setFlippedIds([]);
    } else {
      setFlippedIds(reasons.map((r) => r.id));
    }
  };

  return (
    <section
      id="reasons-section"
      className="relative py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE6EC] border border-[#F3C8D5] text-xs font-medium text-[#8C4B5C] mb-4">
          <Gift className="w-3.5 h-3.5 text-[#D86C84]" />
          <span>{SITE_CONTENT.reasonsSection.badge}</span>
        </div>

        <h2 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#4A2E35] mb-4">
          {SITE_CONTENT.reasonsSection.title}
        </h2>

        <p className="text-base sm:text-lg text-[#6E4D54] leading-relaxed mb-6">
          {SITE_CONTENT.reasonsSection.subtitle}
        </p>

        {/* Progress & Quick Toggle */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-white/80 backdrop-blur-sm border border-[#F2D4DC] rounded-full px-4 py-2 shadow-2xs">
          <span className="text-xs sm:text-sm font-medium text-[#7A505A]">
            Opened:{" "}
            <strong className="text-[#C95B75]">
              {flippedIds.length} / {reasons.length}
            </strong>
          </span>
          <span className="text-[#E6C5CE]">•</span>
          <button
            onClick={handleToggleAll}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#8A4D5C] hover:text-[#4A2E35] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {allOpened ? "Wrap all again" : "Unwrap all 10"}
          </button>
        </div>
      </motion.div>

      {/* 10 Interactive Gift Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {reasons.map((reason, index) => (
          <ReasonFlipCard
            key={reason.id}
            reason={reason}
            index={index}
            isFlipped={flippedIds.includes(reason.id)}
            onToggle={() => toggleCard(reason.id)}
          />
        ))}
      </div>

      {/* Closing Line after all 10 cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.2 }}
        className="mt-14 text-center"
      >
        <div className="inline-block rounded-2xl bg-white/80 backdrop-blur-sm border border-[#F3D3DC] px-6 sm:px-8 py-4 shadow-xs">
          <p className="font-serif-display italic text-lg sm:text-2xl text-[#5A3840]">
            {SITE_CONTENT.reasonsSection.closingNote}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

/**
 * ============================================================================
 * 4. A LITTLE LOVE LETTER – HANDWRITTEN STATIONERY SECTION
 * ============================================================================
 */
const LoveLetterSection = () => {
  const [sealClicked, setSealClicked] = useState(false);

  return (
    <section className="relative py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A26372]">
            {SITE_CONTENT.letter.sectionEyebrow}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#4A2E35] mt-2">
            {SITE_CONTENT.letter.sectionTitle}
          </h2>
        </motion.div>

        {/* Cream Paper Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 32, rotate: -0.6 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[28px] p-7 sm:p-12 md:p-14 shadow-xl border border-[#EAD8C9] overflow-hidden"
          style={{
            backgroundColor: "#FFFDF7",
            backgroundImage: `
              radial-gradient(#E8D6C8 0.7px, transparent 0.7px),
              linear-gradient(to bottom, transparent 31px, rgba(226, 198, 182, 0.25) 32px)
            `,
            backgroundSize: "24px 24px, 100% 32px",
          }}
        >
          {/* Decorative corner florals */}
          <BotanicalCorner className="w-24 sm:w-32 h-24 sm:h-32 absolute top-0 right-0 scale-x-[-1] opacity-70" />
          <BotanicalCorner className="w-24 sm:w-32 h-24 sm:h-32 absolute bottom-0 left-0 scale-y-[-1] opacity-70" />

          {/* Top Letter Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-5 mb-7 border-b border-[#EEDFD3]">
            <div className="flex items-center gap-2 text-[#9E6874]">
              <MailOpen className="w-4 h-4" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Personal Letter
              </span>
            </div>
            <span className="font-handwriting text-lg sm:text-xl text-[#8F656E]">
              {SITE_CONTENT.letter.dateLabel}
            </span>
          </div>

          {/* Handwritten Body with Line-by-Line Reveal */}
          <div className="relative z-10 space-y-5 font-handwriting text-2xl sm:text-[28px] text-[#482C33] leading-[1.6]">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="font-semibold text-[#7A3B4B]"
            >
              {SITE_CONTENT.letter.salutation}
            </motion.p>

            {SITE_CONTENT.letter.paragraphs.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.7, delay: 0.25 + idx * 0.18 }}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Sign-off & Red Wax Seal */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="pt-6 flex items-end justify-between gap-4"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-semibold text-[#8C3D52]">
                  {SITE_CONTENT.letter.signOff}
                </p>
              </div>

              {/* Interactive Crimson Wax Seal */}
              <motion.button
                whileHover={{ scale: 1.08, rotate: 6 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setSealClicked((prev) => !prev)}
                title="Tap the wax seal"
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg cursor-pointer shrink-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #DC536E 0%, #B3314B 65%, #8C2137 100%)",
                  boxShadow:
                    "0 8px 20px rgba(179, 49, 75, 0.35), inset 0 2px 5px rgba(255,255,255,0.35)",
                }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#F7B2C0]/55 flex flex-col items-center justify-center text-[#FFF3F5]">
                  <Heart className="w-4 h-4 fill-current mb-0.5" />
                  <span className="font-serif-display text-xs font-bold tracking-widest">
                    {SITE_CONTENT.letter.sealInitials}
                  </span>
                </div>
                {sealClicked && (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.8 }}
                    animate={{ opacity: 1, y: -44, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute whitespace-nowrap bg-[#4A2E35] text-white font-sans text-xs px-3 py-1 rounded-full shadow-md"
                  >
                    Sealed with love ❤️
                  </motion.span>
                )}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * ============================================================================
 * 5. OUR LITTLE MEMORIES – PORTRAIT-FRIENDLY GALLERY & LIGHTBOX
 * ============================================================================
 */
const MemoryPhotoFrame = ({ src, alt, className = "" }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FCE7EE] via-[#FFF6F2] to-[#EFE8FA] p-4 text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-white/85 border border-[#F3C8D5] flex items-center justify-center mb-2 shadow-2xs">
          <Heart className="w-6 h-6 text-[#D86C84] fill-[#F7C5D0]" />
        </div>
        <p className="font-serif-display text-sm font-medium text-[#5A3840]">
          Our Memory
        </p>
        <p className="text-[11px] text-[#9A717B] mt-0.5 break-all px-2">
          Add photo at {src}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

const MemoriesGallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const memories = SITE_CONTENT.gallery.memories;

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft")
        setSelectedIndex((prev) =>
          prev === 0 ? memories.length - 1 : prev - 1
        );
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) =>
          prev === memories.length - 1 ? 0 : prev + 1
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, memories.length]);

  return (
    <section className="relative py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3ECFC] border border-[#DFD2F5] text-xs font-medium text-[#65508C] mb-4">
          <Camera className="w-3.5 h-3.5" />
          <span>{SITE_CONTENT.gallery.eyebrow}</span>
        </div>

        <h2 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#4A2E35] mb-4">
          {SITE_CONTENT.gallery.title}
        </h2>

        <p className="text-base sm:text-lg text-[#6E4D54] leading-relaxed">
          {SITE_CONTENT.gallery.subtitle}
        </p>
      </motion.div>

      {/* Taller Portrait-Friendly Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-9">
        {memories.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: (idx % 3) * 0.1 }}
            whileHover={{ y: -6, rotate: idx % 2 === 0 ? 1 : -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedIndex(idx)}
            className="group cursor-pointer rounded-3xl bg-white/95 p-4 pb-6 border border-[#F3DCE2] shadow-sm hover:shadow-xl transition-all max-w-md w-full mx-auto"
          >
            {/* 3:4 Portrait Aspect Ratio with Top-Center Framing */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#FCECF0] mb-4">
              <MemoryPhotoFrame
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E35]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3.5">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-xs font-medium text-[#4A2E35] shadow-sm">
                  View full photo
                </span>
              </div>
            </div>

            <div className="px-2 flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B57282] block mb-1">
                  {item.date}
                </span>
                <p className="font-serif-display text-lg sm:text-xl text-[#4A2E35] leading-snug">
                  {item.caption}
                </p>
              </div>
              <Heart className="w-4 h-4 text-[#E3859B] group-hover:fill-[#E3859B] transition-colors shrink-0 mt-1.5" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-View Uncropped Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-[#2C1A1F]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-3xl bg-[#FFFDF9] p-4 sm:p-6 shadow-2xl border border-[#F2D5DD] my-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedIndex(null)}
                aria-label="Close photo"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 rounded-full bg-white/95 text-[#4A2E35] border border-[#F0D0D8] shadow-md flex items-center justify-center hover:bg-[#FCE8EE] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Adaptive Photo Container (Shows 100% of Portrait & Landscape Photos) */}
              <div className="relative w-full min-h-[280px] max-h-[68vh] rounded-2xl overflow-hidden bg-[#FAF0F3] flex items-center justify-center mb-5">
                <MemoryPhotoFrame
                  src={memories[selectedIndex].src}
                  alt={memories[selectedIndex].caption}
                  className="w-auto h-auto max-w-full max-h-[68vh] object-contain rounded-xl"
                />

                {/* Prev / Next Controls */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#4A2E35] shadow-md flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#4A2E35] shadow-md flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#B57282]">
                    {memories[selectedIndex].date} • {selectedIndex + 1} of{" "}
                    {memories.length}
                  </span>
                  <p className="font-serif-display text-xl sm:text-2xl text-[#4A2E35] mt-0.5">
                    {memories[selectedIndex].caption}
                  </p>
                </div>
                <Heart className="w-5 h-5 text-[#D86C84] fill-[#D86C84] hidden sm:block shrink-0" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/**
 * ============================================================================
 * 6. INTERACTIVE SURPRISE – GIFT BOX SECTION
 * ============================================================================
 */
const InteractiveSurpriseSection = () => {
  const [isOpened, setIsOpened] = useState(false);

  const burstHearts = [
    { x: -90, y: -95, delay: 0.05, scale: 1.1 },
    { x: 95, y: -85, delay: 0.1, scale: 1 },
    { x: -45, y: -125, delay: 0.15, scale: 1.25 },
    { x: 50, y: -120, delay: 0.12, scale: 0.95 },
    { x: 0, y: -140, delay: 0.08, scale: 1.3 },
    { x: -115, y: -55, delay: 0.18, scale: 0.85 },
    { x: 115, y: -55, delay: 0.2, scale: 0.9 },
  ];

  return (
    <section className="relative py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="relative rounded-[32px] bg-gradient-to-b from-white/90 to-[#FFF5F7]/90 backdrop-blur-md border border-[#F3D2DC] p-8 sm:p-14 text-center shadow-lg overflow-hidden"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A26372]">
            {SITE_CONTENT.surprise.eyebrow}
          </span>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#4A2E35] mt-2 mb-3">
            {SITE_CONTENT.surprise.title}
          </h2>

          <p className="text-base text-[#6E4D54] max-w-md mx-auto mb-10">
            {SITE_CONTENT.surprise.subtitle}
          </p>

          {/* Animated Gift Box */}
          <div className="relative h-48 flex items-center justify-center mb-8">
            {/* Heart Burst on Open */}
            <AnimatePresence>
              {isOpened &&
                burstHearts.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                    animate={{
                      x: h.x,
                      y: h.y,
                      opacity: [0, 1, 1, 0],
                      scale: h.scale,
                    }}
                    transition={{
                      duration: 1.8,
                      delay: h.delay,
                      ease: "easeOut",
                    }}
                    className="absolute pointer-events-none z-20"
                  >
                    <Heart className="w-6 h-6 text-[#D85A77] fill-[#E67E96]" />
                  </motion.div>
                ))}
            </AnimatePresence>

            {/* Gift Box Assembly */}
            <motion.div
              onClick={() => setIsOpened(true)}
              animate={
                isOpened
                  ? { scale: 0.94, y: 12 }
                  : { rotate: [-1.5, 1.5, -1.5], y: [0, -4, 0] }
              }
              transition={
                isOpened
                  ? { duration: 0.4 }
                  : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative w-32 h-32 cursor-pointer select-none"
            >
              {/* Glowing core when opened */}
              {isOpened && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.35 }}
                  className="absolute -top-6 inset-x-2 h-16 rounded-full bg-[#F8B4C4]/60 blur-xl pointer-events-none"
                />
              )}

              {/* Gift Lid */}
              <motion.div
                animate={
                  isOpened
                    ? { y: -44, rotate: -18, x: -14, opacity: 0.9 }
                    : { y: 0, rotate: 0, x: 0, opacity: 1 }
                }
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="relative z-20 -mx-2 h-8 rounded-xl bg-gradient-to-r from-[#E47891] to-[#EC9489] border border-[#D4627D] shadow-md flex items-center justify-center"
              >
                {/* Ribbon Bow */}
                <div className="absolute -top-4 flex items-center justify-center">
                  <div className="w-5 h-4 rounded-full border-4 border-[#FFF3F5] -rotate-12 -mr-1" />
                  <div className="w-5 h-4 rounded-full border-4 border-[#FFF3F5] rotate-12 -ml-1" />
                </div>
                <div className="w-5 h-full bg-[#FFF3F5]/90" />
              </motion.div>

              {/* Gift Base Box */}
              <div className="relative z-10 w-full h-24 rounded-b-2xl bg-gradient-to-b from-[#F6A6B9] to-[#E8859D] border border-[#DC6F89] shadow-lg flex items-center justify-center overflow-hidden">
                {/* Vertical Ribbon */}
                <div className="w-5 h-full bg-[#FFF3F5]/90" />
                {/* Horizontal Ribbon */}
                <div className="absolute inset-x-0 h-4 bg-[#FFF3F5]/65" />
              </div>
            </motion.div>
          </div>

          {/* Button OR Revealed Romantic Message */}
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <motion.button
                key="surprise-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpened(true)}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D96B84] to-[#E59286] text-white font-medium text-base sm:text-lg shadow-md shadow-[#D96B84]/25 hover:shadow-lg transition-all cursor-pointer"
              >
                <span>{SITE_CONTENT.surprise.buttonText}</span>
              </motion.button>
            ) : (
              <motion.div
                key="surprise-message"
                initial={{ opacity: 0, y: 18, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-[#FFFDFB] border border-[#F1C7D3] p-6 sm:p-8 shadow-sm"
              >
                <p className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#4A2E35] leading-snug mb-2">
                  “{SITE_CONTENT.surprise.revealedMessage}”
                </p>
                <p className="text-sm sm:text-base text-[#8C5B66]">
                  {SITE_CONTENT.surprise.revealedSubtext}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * ============================================================================
 * 7. FINAL SECTION – A BEAUTIFUL ENDING
 * ============================================================================
 */
const FinaleSection = () => {
  return (
    <footer
      className="relative py-24 sm:py-32 px-5 sm:px-8 text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,249,245,0) 0%, #FCE5EC 45%, #F5DFF0 100%)",
      }}
    >
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9E5A6B] mb-3"
        >
          {SITE_CONTENT.finale.heading}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#4A2E35] leading-tight mb-10"
        >
          {SITE_CONTENT.finale.message}
        </motion.h2>

        {/* Large Animated Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="relative mb-10"
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#DF6C86] blur-2xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/85 border border-[#F3C5D2] shadow-xl flex items-center justify-center"
          >
            <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-[#D65874] fill-[#E2738C]" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="space-y-2"
        >
          <p className="text-base sm:text-lg font-medium text-[#5C3A42]">
            {SITE_CONTENT.finale.footerNote}
          </p>
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8F4A5C]">
            — {SITE_CONTENT.finale.signature}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

/**
 * ============================================================================
 * MAIN APPLICATION SHELL
 * ============================================================================
 */
export default function App() {
  const [hasOpenedSurprise, setHasOpenedSurprise] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Load Google Fonts dynamically so typography works out-of-the-box
  useEffect(() => {
    const linkId = "romantic-google-fonts";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
    document.title = `For ${SITE_CONTENT.recipientName} ❤️`;
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#4A2E35] selection:bg-[#FAD2DE] selection:text-[#4A2E35] overflow-x-hidden">
      {/* Custom Font Utility Styles */}
      <style>{`
        .font-serif-display {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-handwriting {
          font-family: 'Caveat', cursive;
        }
        body {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #FFF9F5;
          overflow-x: hidden;
        }
      `}</style>

      {/* Opening Screen Overlay */}
      <AnimatePresence>
        {!hasOpenedSurprise && (
          <OpeningEnvelopeScreen onOpen={() => setHasOpenedSurprise(true)} />
        )}
      </AnimatePresence>

      {/* Main Website Content */}
      {hasOpenedSurprise && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          {/* Top Scroll Progress Bar */}
          <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E6829A] via-[#F0A48E] to-[#C8B2EB] origin-left z-40"
          />

          {/* Subtle Ambient Floating Hearts */}
          <FloatingAmbientHearts count={12} />

          {/* Section 1: Hero */}
          <HeroSection />

          {/* Divider */}
          <div className="max-w-xs mx-auto flex items-center justify-center gap-3 opacity-50">
            <div className="h-px flex-1 bg-[#E5B8C4]" />
            <Heart className="w-3.5 h-3.5 text-[#D86C84] fill-[#D86C84]" />
            <div className="h-px flex-1 bg-[#E5B8C4]" />
          </div>

          {/* Section 2: 10 Reasons Why I Love You */}
          <ReasonsSection />

          {/* Divider */}
          <div className="max-w-xs mx-auto flex items-center justify-center gap-3 opacity-50">
            <div className="h-px flex-1 bg-[#E5B8C4]" />
            <Sparkles className="w-3.5 h-3.5 text-[#B69CE0]" />
            <div className="h-px flex-1 bg-[#E5B8C4]" />
          </div>

          {/* Section 3: Handwritten Love Letter */}
          <LoveLetterSection />

          {/* Section 4: Photo Memories Gallery */}
          <MemoriesGallerySection />

          {/* Section 5: Interactive Gift Box Surprise */}
          <InteractiveSurpriseSection />

          {/* Section 6: Final Ending */}
          <FinaleSection />
        </motion.main>
      )}
    </div>
  );
}