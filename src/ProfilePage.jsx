/**
 * AURA FEST — Profile Page (Discord Parody)
 * Pixel-Perfect Discord UI Clone
 */

import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const MOCK_USER = {
  name: "Darshan",
  username: "darshan_irl",
  auraId: "AURA-2025-4269",
  college: "VIT Vellore",
  branch: "Computer Science",
  paymentStatus: "paid", // "paid" | "pending"
  role: "coordinator", // "participant" | "coordinator"
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
    team: "The Rockers",
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
    team: null,
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
    team: null,
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
    team: null,
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
    team: "Solo Queue",
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
    team: null,
    color: "#ef4444",
    emoji: "🎨",
    poster: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&q=80",
  },
];

// ─────────────────────────────────────────────
// ASSETS (SVGs)
// ─────────────────────────────────────────────
const Icons = {
  Nitro: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F47FFF" stroke="#F47FFF" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  ),
  Coordinator: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#5865F2" />
      <path d="M12 8v8m-4-4h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Participant: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#3BA55C" />
      <path d="M12 16l-4-4h8l-4 4zm0-8l4 4H8l4-4z" fill="white"/>
    </svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Empty: () => (
    <svg width="180" height="100" viewBox="0 0 240 130" fill="none" xmlns="http://www.w3.org/2000/svg">
       <rect x="40" y="30" width="160" height="80" rx="8" fill="#2B2D31"/>
       <circle cx="80" cy="70" r="15" fill="#1E1F22"/>
       <rect x="110" y="60" width="60" height="8" rx="4" fill="#1E1F22"/>
       <rect x="110" y="75" width="40" height="8" rx="4" fill="#1E1F22"/>
       <circle cx="120" cy="20" r="8" fill="#5865F2" opacity="0.5"/>
       <circle cx="150" cy="15" r="5" fill="#EB459E" opacity="0.5"/>
    </svg>
  )
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("discord-parody-styles")) return;
  const style = document.createElement("style");
  style.id = "discord-parody-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Open+Sans:wght@400;600;700&display=swap');

    :root {
      --d-bg-dark: #111214;
      --d-bg-sidebar: #1E1F22;
      --d-bg-modal: #313338;
      --d-bg-card: #2B2D31;
      --d-bg-tertiary: #1E1F22;
      --d-accent: #5865F2;
      --d-accent-hover: #4752C4;
      --d-green: #23A559;
      --d-text-normal: #DBDEE1;
      --d-text-muted: #949BA4;
      --d-text-header: #F2F3F5;
      --d-divider: #3F4147;
      --d-font: 'Inter', 'Open Sans', sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: var(--d-bg-dark);
      font-family: var(--d-font);
      color: var(--d-text-normal);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    .app-root {
      display: flex;
      min-height: 100vh;
      background: #000;
      position: relative;
    }

    /* ── FAKE SIDEBAR ── */
    .fake-sidebar {
      width: 72px;
      background: var(--d-bg-sidebar);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 12px;
      gap: 8px;
      z-index: 10;
      flex-shrink: 0;
    }

    .server-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #313338;
      transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--d-text-muted);
      font-weight: 700;
      font-size: 14px;
    }

    .server-icon:hover {
      border-radius: 16px;
      background: var(--d-accent);
      color: #fff;
    }

    .server-icon.active {
      border-radius: 16px;
      background: var(--d-accent);
      color: #fff;
    }

    .server-pill {
      position: absolute;
      left: -12px;
      top: 50%;
      transform: translateY(-50%) scale(0);
      width: 8px;
      height: 8px;
      border-radius: 0 4px 4px 0;
      background: #fff;
      transition: all 0.2s;
    }
    .server-icon:hover .server-pill {
      transform: translateY(-50%) scale(1);
      left: -14px; height: 20px;
    }
    .server-icon.active .server-pill {
      transform: translateY(-50%) scale(1);
      left: -14px; height: 40px;
    }

    .sidebar-separator {
      width: 32px;
      height: 2px;
      background: #313338;
      margin: 2px 0;
    }

    /* ── MAIN CONTENT AREA ── */
    .content-area {
      flex: 1;
      background: var(--d-bg-modal);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* Background Blur Effect */
    .content-bg {
      position: absolute;
      inset: 0;
      background: url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop');
      background-size: cover;
      background-position: center;
      filter: blur(8px) brightness(0.4);
      transform: scale(1.1);
    }

    /* ── PROFILE MODAL (FULL) ── */
    .discord-modal {
      width: 800px;
      max-width: 95%;
      height: auto;
      min-height: 500px;
      background: rgba(35, 37, 41, 0.95);
      border-radius: 8px;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.2), 0 20px 60px rgba(0,0,0,0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      position: relative;
      z-index: 20;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    @keyframes modalPop {
      from { opacity: 0; transform: scale(0.9) translateY(20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    /* Banner */
    .modal-banner {
      height: 210px;
      background: linear-gradient(120deg, #A855F7 0%, #EC4899 50%, #5865F2 100%);
      position: relative;
    }

    .modal-banner::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 20%),
          url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiBvcGFjaXR5PSIwLjEiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=');
        opacity: 0.6;
    }

    /* Header Content */
    .profile-header {
      padding: 0 24px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: -50px; /* Pull up into banner */
      margin-bottom: 20px;
      pointer-events: none; /* Let clicks pass through empty space */
    }

    .header-left {
      position: relative;
      pointer-events: auto;
    }

    .avatar-wrapper {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: var(--d-bg-modal);
      padding: 8px;
      position: relative;
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      background: var(--d-bg-tertiary);
      border: 6px solid var(--d-bg-modal); /* Outer ring */
    }

    .status-indicator {
      position: absolute;
      bottom: 12px;
      right: 12px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 5px solid var(--d-bg-modal);
      z-index: 2;
    }
    .status-indicator.online { background: var(--d-green); }
    .status-indicator.idle { background: #F0B232; }

    .header-right {
      pointer-events: auto;
      display: flex;
      gap: 12px;
      padding-bottom: 12px;
    }

    .edit-btn {
      background: rgba(0,0,0,0.4);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.1);
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
      backdrop-filter: blur(4px);
    }
    .edit-btn:hover { background: rgba(0,0,0,0.6); }

    .more-btn {
      width: 36px;
      height: 36px;
      background: rgba(0,0,0,0.4);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .more-btn:hover { background: rgba(0,0,0,0.6); }

    /* User Info Block */
    .user-info-block {
      padding: 0 24px;
      margin-bottom: 24px;
    }

    .display-name {
      font-size: 28px;
      font-weight: 800;
      color: var(--d-text-header);
      line-height: 1.1;
    }

    .user-tag {
      font-size: 16px;
      color: var(--d-text-normal);
      font-weight: 500;
      opacity: 0.8;
      margin-top: 4px;
    }

    /* Tabs */
    .tabs-nav {
      display: flex;
      padding: 0 24px;
      gap: 32px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 24px;
    }

    .tab-item {
      padding: 12px 0;
      font-size: 15px;
      font-weight: 600;
      color: var(--d-text-muted);
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
    }

    .tab-item:hover { color: var(--d-text-normal); }
    .tab-item.active { color: var(--d-text-header); }

    .tab-item.active::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--d-text-header);
    }

    /* Content Layout (2 Columns) */
    .profile-body {
      display: flex;
      padding: 0 24px 32px;
      gap: 24px;
      height: 100%;
    }

    .col-left {
      width: 30%;
      min-width: 200px;
    }

    .col-right {
      width: 70%;
    }

    .section-header {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--d-text-header);
      margin-bottom: 12px;
      letter-spacing: 0.05em;
    }

    .about-text {
      font-size: 14px;
      line-height: 1.5;
      color: var(--d-text-normal);
      margin-bottom: 16px;
      white-space: pre-wrap;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
      font-size: 14px;
      color: var(--d-text-normal);
    }

    .note-box {
      background: var(--d-bg-dark);
      padding: 12px;
      border-radius: 4px;
      font-size: 13px;
      font-style: italic;
      color: var(--d-text-muted);
      border-left: 3px solid var(--d-accent);
    }

    /* Badges */
    .badges-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 24px;
      background: var(--d-bg-card);
      padding: 8px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.05);
    }

    .badge {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .badge:hover { background: rgba(255,255,255,0.1); }

    /* Rich Presence Cards (Enhanced) */
    .rich-presence-card {
      background: var(--d-bg-card);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      display: flex;
      gap: 16px;
      position: relative;
      transition: all 0.2s;
    }

    .rich-presence-card:hover {
      background: rgba(50, 50, 55, 0.9);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }

    .rp-image-container {
      position: relative;
      width: 80px;
      height: 80px;
      flex-shrink: 0;
    }

    .rp-image {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      object-fit: cover;
    }

    .rp-badge-icon {
      position: absolute;
      bottom: -6px;
      right: -6px;
      width: 28px;
      height: 28px;
      background: var(--d-bg-card);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 4px solid var(--d-bg-card);
      font-size: 14px;
    }

    .rp-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .rp-title {
      font-weight: 700;
      font-size: 16px;
      color: var(--d-text-header);
      margin-bottom: 4px;
    }

    .rp-detail {
      font-size: 14px;
      color: var(--d-text-normal);
    }

    .rp-time {
      font-size: 13px;
      color: var(--d-text-muted);
      margin-top: 4px;
    }

    .rp-actions {
      margin-top: 12px;
      display: flex;
      gap: 8px;
    }

    .rp-btn {
      background: var(--d-bg-dark);
      color: var(--d-text-normal);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 6px 14px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .rp-btn:hover { background: rgba(255,255,255,0.1); }
    .rp-btn.primary { background: var(--d-green); color: #fff; border: none; }
    .rp-btn.primary:hover { background: #1f954f; }

    /* Tooltip */
    .tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: #111214;
        color: #dbdee1;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.15s;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 10;
        margin-bottom: 8px;
    }
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: #111214 transparent transparent transparent;
    }
    .badge:hover .tooltip { opacity: 1; }

    /* ── MOBILE OPTIMIZATION ── */
    @media (max-width: 768px) {
      .fake-sidebar { display: none; }

      .content-area {
        padding: 0;
        align-items: flex-start;
        background: var(--d-bg-modal);
      }

      .content-bg { display: none; }

      .discord-modal {
        width: 100%;
        min-height: 100vh;
        border-radius: 0;
        box-shadow: none;
        background: var(--d-bg-modal);
        animation: none;
      }

      .modal-banner { height: 160px; }

      .profile-header {
        flex-direction: column;
        align-items: flex-start;
        padding: 0 20px;
        margin-top: -60px;
      }

      .header-right {
        width: 100%;
        margin-top: 16px;
        justify-content: flex-end;
      }

      .user-info-block { padding: 0 20px; }
      .display-name { font-size: 24px; }

      .tabs-nav { padding: 0 20px; overflow-x: auto; }

      .profile-body {
        flex-direction: column;
        padding: 0 20px 40px;
      }

      .col-left, .col-right { width: 100%; }

      .rich-presence-card {
        padding: 12px;
      }
      .rp-image { width: 64px; height: 64px; }
      .rp-image-container { width: 64px; height: 64px; }
    }
  `;
  document.head.appendChild(style);
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function ProfilePage({ user = MOCK_USER, events = MOCK_EVENTS }) {
  const [activeTab, setActiveTab] = useState("My Events");

  // Computed values
  const isPaid = user.paymentStatus === "paid";
  const registeredEvents = events.filter(e => e.registered);

  useEffect(() => {
    injectStyles();

    // Entrance Animation
    const tl = gsap.timeline();
    tl.fromTo(".server-icon",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }
    );
  }, []);

  return (
    <div className="app-root">
      {/* ── FAKE SIDEBAR ── */}
      <div className="fake-sidebar">
        <div className="server-icon active">
          <div className="server-pill" />
          <img src="https://api.dicebear.com/9.x/initials/svg?seed=AU" alt="Aura" style={{width:'60%', height:'60%', objectFit:'contain'}} />
        </div>
        <div className="sidebar-separator" />
        {[1, 2, 3].map((i) => (
            <div key={i} className="server-icon">
                <div className="server-pill" />
                {i}
            </div>
        ))}
        <div className="server-icon" style={{color:'#23A559', background: 'rgba(35, 165, 89, 0.1)'}}>
            +
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="content-area">
        <div className="content-bg" />

        <div className="discord-modal">
            {/* Banner */}
            <div className="modal-banner" />

            {/* Header */}
            <div className="profile-header">
                <div className="header-left">
                    <div className="avatar-wrapper">
                        <img src={user.profilePhoto} alt="Avatar" className="avatar-img" />
                        <div
                        className={`status-indicator ${isPaid ? 'online' : 'idle'}`}
                        title={isPaid ? "Paid Member" : "Registration Pending"}
                        />
                    </div>
                </div>
                <div className="header-right">
                    <button className="edit-btn">Edit Profile</button>
                    <button className="more-btn">•••</button>
                </div>
            </div>

            {/* Name & ID */}
            <div className="user-info-block">
                <div className="display-name">{user.name}</div>
                <div className="user-tag">{user.username}</div>
            </div>

            {/* Tabs */}
            <div className="tabs-nav">
                <div
                    className={`tab-item ${activeTab === 'My Events' ? 'active' : ''}`}
                    onClick={() => setActiveTab('My Events')}
                >
                    My Events
                </div>
                <div
                    className={`tab-item ${activeTab === 'User Info' ? 'active' : ''}`}
                    onClick={() => setActiveTab('User Info')}
                >
                    User Info
                </div>
                <div className="tab-item">Mutual Servers</div>
                <div className="tab-item">Mutual Friends</div>
            </div>

            {/* Body Content */}
            <div className="profile-body">
                {/* Left Column: About/Badges */}
                <div className="col-left">
                    {/* Badges */}
                    <div className="badges-row">
                        {user.role === 'coordinator' && (
                            <div className="badge">
                                <Icons.Coordinator />
                                <div className="tooltip">Aura Coordinator</div>
                            </div>
                        )}
                        {user.role === 'participant' && (
                            <div className="badge">
                                <Icons.Participant />
                                <div className="tooltip">Aura Participant</div>
                            </div>
                        )}
                        {isPaid && (
                            <div className="badge">
                                <Icons.Nitro />
                                <div className="tooltip">Aura Member (Paid)</div>
                            </div>
                        )}
                         <div className="badge">
                            <span style={{fontSize:'16px'}}>🏆</span>
                            <div className="tooltip">Early Supporter</div>
                        </div>
                    </div>

                    <div className="section-header">About Me</div>
                    <div className="about-text">
                        {user.college}<br />
                        {user.branch}
                    </div>

                    <div className="section-header">Aura ID</div>
                    <div className="about-text" style={{ fontFamily: 'monospace', background: '#111214', padding: '4px 8px', borderRadius: '4px', display:'inline-block' }}>
                        {user.auraId}
                    </div>

                    <div className="section-header">Member Since</div>
                    <div className="about-text">{user.registeredSince}</div>

                    <div className="section-header">Note</div>
                    <div className="note-box">
                        "{user.vibeStatus}"
                    </div>
                </div>

                {/* Right Column: Events */}
                <div className="col-right">
                    {activeTab === 'My Events' ? (
                        <>
                            <div className="section-header">Activity</div>
                            {registeredEvents.length > 0 ? registeredEvents.map(event => (
                                <div key={event.id} className="rich-presence-card">
                                    <div className="rp-image-container">
                                        <img src={event.poster} alt="" className="rp-image" />
                                        <div className="rp-badge-icon">
                                            <span>{event.emoji}</span>
                                        </div>
                                    </div>
                                    <div className="rp-content">
                                        <div className="rp-title">{event.name}</div>
                                        <div className="rp-detail">
                                            {event.team ? `Playing for ${event.team}` : 'Solo Queue'}
                                        </div>
                                        <div className="rp-time">
                                            Ends in 2 days
                                        </div>
                                        <div className="rp-actions">
                                            <button className="rp-btn primary">Join Lobby</button>
                                            <button className="rp-btn">Spectate</button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div style={{textAlign:'center', padding:'40px', opacity:0.6}}>
                                    <Icons.Empty />
                                    <div style={{marginTop:10}}>No active events found.</div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{padding:'40px', textAlign:'center', color:'rgba(255,255,255,0.5)'}}>
                            User Info is displayed on the left sidebar in this layout.
                        </div>
                    )}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
