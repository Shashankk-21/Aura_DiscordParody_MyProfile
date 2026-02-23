/**
 * AURA FEST — Profile Page
 * Discord-inspired | GenZ Theme | Dark Purple + Neons
 *
 * Dependencies to install:
 *   npm install gsap
 *
 * Google Fonts used (add to your index.html <head>):
 *   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
 */

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

// ─────────────────────────────────────────────
// MOCK DATA — Replace with backend API responses
// ─────────────────────────────────────────────
const MOCK_USER = {
  name: "Darshan",
  username: "darshan_irl",
  auraId: "AURA-2025-4269",
  college: "VIT Vellore",
  paymentStatus: "paid", // "paid" | "pending"
  profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=DarshanAura&backgroundColor=b6e3f4",
  registeredSince: "Feb 10, 2025",
  vibeStatus: "main character, no cap fr fr 💀",
};

const MOCK_EVENTS = [
  {
    id: 1,
    name: "Battle of Bands",
    date: "Mar 15",
    time: "6:00 PM",
    registered: true,
    color: "#a855f7",
    emoji: "🎸",
    poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80",
  },
  {
    id: 2,
    name: "Dance Mania",
    date: "Mar 16",
    time: "4:00 PM",
    registered: true,
    color: "#ec4899",
    emoji: "💃",
    poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&q=80",
  },
  {
    id: 3,
    name: "Cosplay Fiesta",
    date: "Mar 16",
    time: "2:00 PM",
    registered: false,
    color: "#06b6d4",
    emoji: "🎭",
    poster: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=200&q=80",
  },
  {
    id: 4,
    name: "Beatbox Battle",
    date: "Mar 17",
    time: "5:00 PM",
    registered: false,
    color: "#f59e0b",
    emoji: "🎤",
    poster: "https://images.unsplash.com/photo-1571266028243-d220c6a7327e?w=200&q=80",
  },
  {
    id: 5,
    name: "Open Mic Night",
    date: "Mar 17",
    time: "8:00 PM",
    registered: true,
    color: "#10b981",
    emoji: "🎙️",
    poster: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&q=80",
  },
  {
    id: 6,
    name: "Art Slam",
    date: "Mar 18",
    time: "3:00 PM",
    registered: false,
    color: "#ef4444",
    emoji: "🎨",
    poster: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&q=80",
  },
];

const TABS = ["Events", "Activity", "Squad"];

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("aura-profile-styles")) return;
  const style = document.createElement("style");
  style.id = "aura-profile-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .aura-profile-root {
      min-height: 100vh;
      background: #07070f;
      font-family: 'DM Sans', sans-serif;
      color: #e2e8f0;
      position: relative;
      overflow: hidden;
    }

    /* ── Animated mesh background ── */
    .aura-bg {
      position: fixed;
      inset: 0;
      z-index: 0;
      background:
        radial-gradient(ellipse 80% 60% at 20% 20%, rgba(124,58,237,0.18) 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 80% 80%, rgba(168,85,247,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 50% 50% at 50% 50%, rgba(236,72,153,0.06) 0%, transparent 70%),
        #07070f;
      animation: bgPulse 8s ease-in-out infinite alternate;
    }

    @keyframes bgPulse {
      0%   { filter: hue-rotate(0deg) brightness(1); }
      100% { filter: hue-rotate(12deg) brightness(1.05); }
    }

    /* Noise overlay */
    .aura-bg::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.04;
      pointer-events: none;
    }

    /* Floating orbs */
    .aura-orb {
      position: fixed;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      animation: orbFloat 12s ease-in-out infinite;
      z-index: 0;
    }
    .aura-orb-1 { width: 400px; height: 400px; background: rgba(124,58,237,0.15); top: -100px; left: -100px; animation-delay: 0s; }
    .aura-orb-2 { width: 300px; height: 300px; background: rgba(236,72,153,0.1); bottom: -50px; right: 10%; animation-delay: -4s; }
    .aura-orb-3 { width: 250px; height: 250px; background: rgba(168,85,247,0.12); top: 40%; right: -80px; animation-delay: -8s; }

    @keyframes orbFloat {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33%       { transform: translate(30px, -30px) scale(1.05); }
      66%       { transform: translate(-20px, 20px) scale(0.95); }
    }

    /* ── Layout ── */
    .aura-container {
      position: relative;
      z-index: 1;
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 24px 60px;
    }

    .aura-header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
      opacity: 0;
    }

    .aura-logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 22px;
      background: linear-gradient(135deg, #a855f7, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: 0.05em;
    }

    .aura-logo span {
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.15em;
      display: block;
      background: linear-gradient(135deg, #c084fc, #f472b6);
      -webkit-background-clip: text;
      background-clip: text;
      opacity: 0.7;
    }

    .aura-nav-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      color: rgba(255,255,255,0.4);
      font-family: 'DM Sans', sans-serif;
      font-style: italic;
    }

    .aura-nav-badge::before {
      content: '';
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #23d18b;
      box-shadow: 0 0 8px #23d18b;
      animation: blinkDot 2s ease-in-out infinite;
    }

    @keyframes blinkDot {
      0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
    }

    /* ── Main grid ── */
    .aura-grid {
      display: grid;
      grid-template-columns: 340px 1fr;
      gap: 20px;
      align-items: start;
    }

    @media (max-width: 860px) {
      .aura-grid { grid-template-columns: 1fr; }
    }

    /* ── Glass card base ── */
    .glass-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      position: relative;
      overflow: hidden;
    }

    .glass-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%);
      pointer-events: none;
    }

    /* ── Left Panel ── */
    .profile-card {
      padding: 0;
      opacity: 0;
    }

    .profile-banner {
      height: 100px;
      border-radius: 20px 20px 0 0;
      background: linear-gradient(135deg, #4c1d95 0%, #7c3aed 40%, #a855f7 70%, #ec4899 100%);
      position: relative;
      overflow: hidden;
    }

    .profile-banner::after {
      content: '';
      position: absolute;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      animation: bannerShift 6s linear infinite;
    }

    @keyframes bannerShift { 0% { background-position: 0 0; } 100% { background-position: 60px 60px; } }

    .profile-body {
      padding: 0 20px 24px;
    }

    .profile-avatar-wrap {
      position: relative;
      width: 88px;
      height: 88px;
      margin-top: -44px;
      margin-bottom: 12px;
    }

    .profile-avatar {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      border: 5px solid #07070f;
      object-fit: cover;
      background: #1a1a2e;
      display: block;
    }

    .avatar-glow {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      background: conic-gradient(from 0deg, #a855f7, #ec4899, #7c3aed, #a855f7);
      z-index: -1;
      animation: avatarSpin 4s linear infinite;
      filter: blur(3px);
      opacity: 0.7;
    }

    @keyframes avatarSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

    .status-dot {
      position: absolute;
      bottom: 6px;
      right: 6px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #23d18b;
      border: 3px solid #07070f;
      box-shadow: 0 0 10px #23d18b;
    }

    .profile-name {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 26px;
      color: #fff;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .profile-username {
      font-size: 13px;
      color: rgba(255,255,255,0.4);
      margin-top: 2px;
      font-style: italic;
      letter-spacing: 0.03em;
    }

    /* Vibe bubble */
    .vibe-bubble {
      margin: 14px 0;
      background: rgba(168,85,247,0.12);
      border: 1px solid rgba(168,85,247,0.2);
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 12.5px;
      color: #c4b5fd;
      display: flex;
      align-items: center;
      gap: 8px;
      font-style: italic;
      position: relative;
    }

    .vibe-bubble::before {
      content: '+';
      width: 20px; height: 20px;
      background: rgba(168,85,247,0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #a855f7;
      flex-shrink: 0;
      font-style: normal;
    }

    /* Info rows */
    .info-divider {
      height: 1px;
      background: rgba(255,255,255,0.06);
      margin: 16px 0;
    }

    .info-label {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
      margin-bottom: 4px;
    }

    .info-value {
      font-size: 14px;
      color: rgba(255,255,255,0.85);
      font-weight: 500;
    }

    .info-block {
      margin-bottom: 14px;
    }

    /* Aura ID chip */
    .aura-id-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(124,58,237,0.15);
      border: 1px solid rgba(124,58,237,0.3);
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 13px;
      font-family: 'DM Sans', monospace;
      color: #c084fc;
      letter-spacing: 0.05em;
      cursor: pointer;
      transition: all 0.2s;
    }

    .aura-id-chip:hover {
      background: rgba(124,58,237,0.25);
      box-shadow: 0 0 20px rgba(124,58,237,0.3);
    }

    .aura-id-chip .copy-icon { font-size: 11px; opacity: 0.6; }

    /* Payment badge */
    .payment-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .payment-badge.paid {
      background: rgba(35, 209, 139, 0.12);
      border: 1px solid rgba(35, 209, 139, 0.3);
      color: #23d18b;
      box-shadow: 0 0 16px rgba(35,209,139,0.1);
    }

    .payment-badge.pending {
      background: rgba(245,158,11,0.12);
      border: 1px solid rgba(245,158,11,0.3);
      color: #fbbf24;
    }

    .payment-badge .badge-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    /* Edit button */
    .edit-btn {
      width: 100%;
      margin-top: 18px;
      padding: 11px;
      border-radius: 12px;
      border: none;
      background: linear-gradient(135deg, #7c3aed, #a855f7);
      color: #fff;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      letter-spacing: 0.05em;
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
    }

    .edit-btn::after {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 0; height: 0;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s, opacity 0.6s;
      opacity: 0;
    }

    .edit-btn:hover { box-shadow: 0 0 30px rgba(168,85,247,0.5); transform: translateY(-1px); }
    .edit-btn:active::after { width: 300px; height: 300px; opacity: 0; }

    /* ── Right Panel ── */
    .events-card {
      opacity: 0;
    }

    /* Tabs */
    .tabs-bar {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 16px 20px 0;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }

    .tab-btn {
      padding: 8px 16px 12px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      color: rgba(255,255,255,0.4);
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      letter-spacing: 0.05em;
      transition: all 0.2s;
      position: relative;
      top: 1px;
    }

    .tab-btn:hover { color: rgba(255,255,255,0.7); }

    .tab-btn.active {
      color: #fff;
      border-bottom-color: #a855f7;
    }

    /* Events grid */
    .events-panel {
      padding: 20px;
    }

    .events-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .events-header-title {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
    }

    .events-count {
      font-size: 11px;
      background: rgba(168,85,247,0.2);
      color: #c084fc;
      padding: 3px 9px;
      border-radius: 20px;
      font-weight: 600;
    }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    @media (max-width: 700px) {
      .events-grid { grid-template-columns: repeat(2, 1fr); }
    }

    /* Event card */
    .event-card {
      border-radius: 14px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
      min-height: 130px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    .event-card:hover {
      transform: translateY(-4px) scale(1.02);
    }

    .event-card.registered:hover {
      box-shadow: 0 12px 40px rgba(168,85,247,0.3);
    }

    .event-card-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transition: transform 0.4s;
    }

    .event-card:hover .event-card-bg { transform: scale(1.08); }

    .event-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(7,7,15,0.95) 0%, rgba(7,7,15,0.4) 60%, transparent 100%);
    }

    .event-card-overlay.unregistered {
      background: linear-gradient(to top, rgba(7,7,15,0.97) 0%, rgba(7,7,15,0.7) 100%);
    }

    .event-card-content {
      position: relative;
      z-index: 1;
      padding: 10px 12px;
    }

    .event-emoji {
      font-size: 20px;
      display: block;
      margin-bottom: 4px;
    }

    .event-name {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 13px;
      color: #fff;
      line-height: 1.2;
    }

    .event-datetime {
      font-size: 10.5px;
      color: rgba(255,255,255,0.5);
      margin-top: 3px;
    }

    .event-status-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 3px 7px;
      border-radius: 20px;
      margin-top: 6px;
    }

    .event-status-chip.reg {
      background: rgba(35,209,139,0.15);
      color: #23d18b;
      border: 1px solid rgba(35,209,139,0.25);
    }

    .event-status-chip.unreg {
      background: rgba(255,255,255,0.07);
      color: rgba(255,255,255,0.4);
      border: 1px solid rgba(255,255,255,0.1);
    }

    .event-plus-btn {
      position: absolute;
      top: 10px; right: 10px;
      width: 28px; height: 28px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.5);
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s;
      z-index: 2;
    }

    .event-card:hover .event-plus-btn {
      background: rgba(168,85,247,0.3);
      border-color: rgba(168,85,247,0.5);
      color: #c084fc;
    }

    /* Activity / Squad placeholder */
    .placeholder-panel {
      padding: 60px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      color: rgba(255,255,255,0.25);
      font-size: 13px;
      text-align: center;
    }

    .placeholder-panel .placeholder-icon {
      font-size: 40px;
      opacity: 0.4;
    }

    /* ── Copied toast ── */
    .toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(60px);
      background: rgba(35,209,139,0.15);
      border: 1px solid rgba(35,209,139,0.3);
      color: #23d18b;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.05em;
      backdrop-filter: blur(10px);
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s;
      opacity: 0;
      z-index: 9999;
      pointer-events: none;
    }

    .toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function ProfilePage({ user = MOCK_USER, events = MOCK_EVENTS }) {
  const [activeTab, setActiveTab] = useState("Events");
  const [toast, setToast] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Refs for GSAP targets
  const headerRef = useRef(null);
  const profileCardRef = useRef(null);
  const eventsCardRef = useRef(null);
  const eventCardsRef = useRef([]);

  useEffect(() => {
    injectStyles();

    // ── GSAP Entrance Animations ──
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0)
      .fromTo(
        profileCardRef.current,
        { opacity: 0, x: -40, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.7 },
        0.15
      )
      .fromTo(
        eventsCardRef.current,
        { opacity: 0, x: 40, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.7 },
        0.25
      )
      .fromTo(
        eventCardsRef.current.filter(Boolean),
        { opacity: 0, y: 20, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07 },
        0.55
      );

    // Subtle continuous float on profile card
    gsap.to(profileCardRef.current, {
      y: -5,
      duration: 3.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      // Cleanup GSAP tweens on unmount
      gsap.killTweensOf([profileCardRef.current, eventsCardRef.current]);
    };
  }, []);

  // Hover tilt on profile card
  const handleProfileHover = (e) => {
    const card = profileCardRef.current;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, { rotateY: x * 6, rotateX: -y * 6, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
  };

  const handleProfileLeave = () => {
    gsap.to(profileCardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.auraId).catch(() => {});
    setCopiedId(true);
    setToast(true);
    setTimeout(() => { setToast(false); setCopiedId(false); }, 2000);
  };

  const registeredCount = events.filter((e) => e.registered).length;

  return (
    <div className="aura-profile-root">
      {/* Background layers */}
      <div className="aura-bg" />
      <div className="aura-orb aura-orb-1" />
      <div className="aura-orb aura-orb-2" />
      <div className="aura-orb aura-orb-3" />

      <div className="aura-container">
        {/* Header */}
        <div className="aura-header-bar" ref={headerRef} style={{ opacity: 0 }}>
          <div className="aura-logo">
            AURA
            <span>Cultural Fest 2025</span>
          </div>
          <div className="aura-nav-badge">online · GenZ edition</div>
        </div>

        {/* Main Grid */}
        <div className="aura-grid">
          {/* ── LEFT PANEL ── */}
          <div
            className="glass-card profile-card"
            ref={profileCardRef}
            onMouseMove={handleProfileHover}
            onMouseLeave={handleProfileLeave}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Banner */}
            <div className="profile-banner" />

            <div className="profile-body">
              {/* Avatar */}
              <div className="profile-avatar-wrap">
                <div className="avatar-glow" />
                <img
                  className="profile-avatar"
                  src={user.profilePhoto}
                  alt={user.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=7c3aed&color=fff&size=200`;
                  }}
                />
                <div className="status-dot" title="Online" />
              </div>

              {/* Name */}
              <div className="profile-name">{user.name}</div>
              <div className="profile-username">{user.username}</div>

              {/* Vibe status bubble */}
              <div className="vibe-bubble">{user.vibeStatus}</div>

              <div className="info-divider" />

              {/* Aura ID */}
              <div className="info-block">
                <div className="info-label">Aura ID</div>
                <div
                  className="aura-id-chip"
                  onClick={handleCopyId}
                  title="Click to copy"
                >
                  {copiedId ? "✓ Copied!" : user.auraId}
                  <span className="copy-icon">{copiedId ? "" : "⧉"}</span>
                </div>
              </div>

              {/* College */}
              <div className="info-block">
                <div className="info-label">College</div>
                <div className="info-value">🏛️ {user.college}</div>
              </div>

              {/* Member since */}
              <div className="info-block">
                <div className="info-label">Registered Since</div>
                <div className="info-value">📅 {user.registeredSince}</div>
              </div>

              {/* Payment */}
              <div className="info-block">
                <div className="info-label">Payment Status</div>
                <span className={`payment-badge ${user.paymentStatus}`}>
                  <span className="badge-dot" />
                  {user.paymentStatus === "paid" ? "✓ Paid" : "⏳ Pending"}
                </span>
              </div>

              <div className="info-divider" />

              {/* Events summary */}
              <div className="info-block">
                <div className="info-label">Events Registered</div>
                <div className="info-value" style={{ fontSize: 22, fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
                  <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {registeredCount}
                  </span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginLeft: 6, WebkitTextFillColor: "rgba(255,255,255,0.35)" }}>
                    / {events.length} events
                  </span>
                </div>
              </div>

              {/* Edit profile button */}
              <button className="edit-btn">✎ Edit Profile</button>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="glass-card events-card" ref={eventsCardRef}>
            {/* Tabs */}
            <div className="tabs-bar">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Events board */}
            {activeTab === "Events" && (
              <div className="events-panel">
                <div className="events-header">
                  <div className="events-header-title">
                    {registeredCount > 0 ? "Your Events Board" : "Discover Events"}
                  </div>
                  <div className="events-count">{registeredCount} registered</div>
                </div>

                <div className="events-grid">
                  {events.map((event, i) => (
                    <div
                      key={event.id}
                      className={`event-card ${event.registered ? "registered" : "unregistered"}`}
                      ref={(el) => (eventCardsRef.current[i] = el)}
                      style={{
                        boxShadow: event.registered
                          ? `0 0 0 1px ${event.color}33, inset 0 0 0 1px ${event.color}22`
                          : "0 0 0 1px rgba(255,255,255,0.05)",
                      }}
                    >
                      {/* Poster BG */}
                      <div
                        className="event-card-bg"
                        style={{ backgroundImage: `url(${event.poster})` }}
                      />
                      {/* Overlay */}
                      <div
                        className={`event-card-overlay ${!event.registered ? "unregistered" : ""}`}
                        style={event.registered ? {
                          background: `linear-gradient(to top, rgba(7,7,15,0.97) 0%, ${event.color}22 100%)`,
                        } : {}}
                      />

                      {/* Plus button for unregistered */}
                      {!event.registered && (
                        <div className="event-plus-btn">+</div>
                      )}

                      {/* Content */}
                      <div className="event-card-content">
                        <span className="event-emoji">{event.emoji}</span>
                        <div className="event-name">{event.name}</div>
                        <div className="event-datetime">
                          {event.date} · {event.time}
                        </div>
                        <span className={`event-status-chip ${event.registered ? "reg" : "unreg"}`}>
                          {event.registered ? "● Registered" : "○ Explore"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity placeholder */}
            {activeTab === "Activity" && (
              <div className="placeholder-panel">
                <div className="placeholder-icon">⚡</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: "rgba(255,255,255,0.5)" }}>
                  No recent activity
                </div>
                <div>Your fest activity will appear here</div>
              </div>
            )}

            {/* Squad placeholder */}
            {activeTab === "Squad" && (
              <div className="placeholder-panel">
                <div className="placeholder-icon">👾</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: "rgba(255,255,255,0.5)" }}>
                  Squad feature coming soon
                </div>
                <div>Link up with your crew at Aura 2025</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <div className={`toast ${toast ? "show" : ""}`}>✓ Aura ID copied!</div>
    </div>
  );
}
