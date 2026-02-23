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
      --d-bg-card: #2B2D31;
      --d-bg-modal: #313338;
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
    }

    .app-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    /* ── PROFILE MODAL ── */
    .discord-modal {
      width: 600px;
      max-width: 100%;
      background: var(--d-bg-card); /* Fallback */
      background: var(--d-bg-modal);
      border-radius: 8px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.24);
      overflow: hidden;
      position: relative;
    }

    .modal-banner {
      height: 120px; /* Shortened banner height per Discord style */
      background: linear-gradient(90deg, #A855F7 0%, #EC4899 100%); /* Fest themed abstract */
      position: relative;
    }

    .modal-banner::after {
        content: '';
        position: absolute;
        inset: 0;
        background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiBvcGFjaXR5PSIwLjEiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=');
        opacity: 0.3;
    }

    .profile-header {
      padding: 0 16px;
      position: relative;
      margin-bottom: 20px;
    }

    .avatar-wrapper {
      width: 130px;
      height: 130px;
      margin-top: -70px;
      position: relative;
      border-radius: 50%;
      background: var(--d-bg-modal);
      padding: 6px; /* Discord has a border around the avatar matching the bg */
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      background: var(--d-bg-tertiary);
    }

    .status-indicator {
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 4px solid var(--d-bg-modal);
      z-index: 2;
    }
    .status-indicator.online { background: var(--d-green); }
    .status-indicator.idle { background: #F0B232; }
    .status-indicator.dnd { background: #F23F43; }
    .status-indicator.offline { background: #80848E; }

    .badges-container {
      position: absolute;
      top: 12px;
      right: 16px;
      background: var(--d-bg-dark);
      border-radius: 8px;
      padding: 4px;
      display: flex;
      gap: 4px;
      border: 1px solid rgba(0,0,0,0.2);
    }

    .badge {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        border-radius: 4px;
    }
    .badge:hover { background: rgba(255,255,255,0.05); }

    .user-details {
      background: var(--d-bg-dark);
      margin: 16px;
      border-radius: 8px;
      padding: 16px;
    }

    .username-section {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .display-name {
      font-size: 20px;
      font-weight: 700;
      color: var(--d-text-header);
      line-height: 1.2;
    }

    .user-tag {
      font-size: 14px;
      color: var(--d-text-normal);
      font-weight: 500;
    }

    .edit-btn {
        background: var(--d-accent);
        color: white;
        border: none;
        padding: 6px 16px;
        border-radius: 3px;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: background 0.2s;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .edit-btn:hover { background: var(--d-accent-hover); }

    .divider {
      height: 1px;
      background: var(--d-divider);
      margin: 12px 0;
    }

    /* ── TABS ── */
    .tabs-nav {
      display: flex;
      padding: 0 16px;
      gap: 20px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      margin-top: 10px;
    }

    .tab-item {
      padding: 10px 0;
      font-size: 14px;
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
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--d-text-header);
    }

    /* ── TAB CONTENT ── */
    .tab-content {
      padding: 16px;
      min-height: 300px;
    }

    .section-header {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--d-text-muted);
      margin-bottom: 8px;
      letter-spacing: 0.02em;
    }

    .about-text {
      font-size: 14px;
      line-height: 1.5;
      color: var(--d-text-normal);
      margin-bottom: 16px;
    }

    .info-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
    }
    .info-icon { font-size: 16px; opacity: 0.7; }

    /* ── RICH PRESENCE CARDS ── */
    .rich-presence-card {
        background: var(--d-bg-tertiary); /* Lighter gray for activities */
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 12px;
        display: flex;
        gap: 12px;
        position: relative;
        transition: transform 0.1s;
    }

    .rich-presence-card:hover {
        background: rgba(43, 45, 49, 0.8);
    }

    .rp-image-container {
        position: relative;
        width: 60px;
        height: 60px;
        flex-shrink: 0;
    }

    .rp-image {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        object-fit: cover;
    }

    .rp-badge-icon {
        position: absolute;
        bottom: -4px;
        right: -4px;
        width: 20px;
        height: 20px;
        background: var(--d-bg-tertiary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--d-bg-tertiary);
        font-size: 12px;
    }

    .rp-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .rp-title {
        font-weight: 700;
        font-size: 14px;
        color: var(--d-text-header);
        margin-bottom: 2px;
    }

    .rp-detail {
        font-size: 13px;
        color: var(--d-text-normal);
    }

    .rp-time {
        font-size: 12px;
        color: var(--d-text-muted);
        margin-top: 2px;
    }

    /* Empty state */
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        text-align: center;
        opacity: 0.7;
    }

    .empty-text {
        margin-top: 16px;
        font-size: 14px;
        color: var(--d-text-muted);
    }

    .empty-btn {
        margin-top: 16px;
        background: #383A40;
        color: var(--d-text-normal);
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 13px;
        cursor: pointer;
    }
    .empty-btn:hover { background: #404249; }

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

    /* Mobile */
    @media (max-width: 600px) {
        .discord-modal { height: 100vh; border-radius: 0; }
        .app-container { padding: 0; align-items: flex-start; }
    }
  `;
  document.head.appendChild(style);
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function ProfilePage({ user = MOCK_USER, events = MOCK_EVENTS }) {
  const [activeTab, setActiveTab] = useState("User Info");

  // Computed values
  const isPaid = user.paymentStatus === "paid";
  const registeredEvents = events.filter(e => e.registered);

  useEffect(() => {
    injectStyles();

    // Entrance Animation
    gsap.fromTo(".discord-modal",
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
    );
  }, []);

  return (
    <div className="app-container">
      <div className="discord-modal">
        {/* Banner */}
        <div className="modal-banner" />

        <div className="profile-header">
          {/* Avatar */}
          <div className="avatar-wrapper">
            <img src={user.profilePhoto} alt="Avatar" className="avatar-img" />
            <div
              className={`status-indicator ${isPaid ? 'online' : 'idle'}`}
              title={isPaid ? "Paid Member" : "Registration Pending"}
            />
          </div>

          {/* Badges */}
          <div className="badges-container">
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
          </div>

          {/* User Details Box */}
          <div className="user-details">
            <div className="username-section">
              <div>
                <div className="display-name">{user.name}</div>
                <div className="user-tag">{user.username}</div>
              </div>
              <button className="edit-btn">
                <Icons.Edit /> Edit Profile
              </button>
            </div>

            <div className="divider" />

             {/* Tabs within the user card or below? Discord puts tabs below the user header info usually.
                 Wait, the design says "Activity / Events Section: Create a tabbed interface".
                 In Discord "Full Profile", there are tabs: "User Info", "Mutual Servers", "Mutual Friends".
                 So I will place tabs here. */}

             <div className="tabs-nav">
                <div
                    className={`tab-item ${activeTab === 'User Info' ? 'active' : ''}`}
                    onClick={() => setActiveTab('User Info')}
                >
                    User Info
                </div>
                <div
                    className={`tab-item ${activeTab === 'My Events' ? 'active' : ''}`}
                    onClick={() => setActiveTab('My Events')}
                >
                    My Events
                </div>
             </div>

             {/* Tab Content Area */}
             <div className="tab-content">
                {activeTab === 'User Info' && (
                    <div className="animate-fade-in">
                        <div className="section-header">About Me</div>
                        <div className="info-row">
                            <span className="info-icon">🎓</span>
                            <span className="about-text" style={{marginBottom:0}}>{user.college}</span>
                        </div>
                        <div className="info-row" style={{marginBottom: '16px'}}>
                            <span className="info-icon">💻</span>
                            <span className="about-text" style={{marginBottom:0}}>{user.branch}</span>
                        </div>

                        <div className="section-header">Aura ID</div>
                        <div className="about-text" style={{ fontFamily: 'monospace', background: '#111214', padding: '4px 8px', borderRadius: '4px', display:'inline-block' }}>
                            {user.auraId}
                        </div>

                        <div className="section-header" style={{ marginTop: '16px' }}>Member Since</div>
                        <div className="about-text">{user.registeredSince}</div>

                        <div className="section-header" style={{ marginTop: '16px' }}>Note</div>
                        <div className="about-text">
                            <span style={{ fontStyle: 'italic', opacity: 0.8 }}>"{user.vibeStatus}"</span>
                        </div>
                    </div>
                )}

                {activeTab === 'My Events' && (
                    <div className="animate-fade-in">
                        {registeredEvents.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="section-header">Activity</div>
                                {registeredEvents.map(event => (
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <Icons.Empty />
                                <div className="empty-text">No active games... err, events found.</div>
                                <button className="empty-btn">Find a Game</button>
                            </div>
                        )}
                    </div>
                )}
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
