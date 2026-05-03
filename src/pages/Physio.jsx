import { useState } from "react";
import PhysioSessionForm from "../components/PhysioSessionForm";
import {
  User, AlertTriangle, ArrowLeft, ChevronRight,
  Calendar, Clock, Activity, Moon, Zap, Heart,
  CheckCircle2, FileText, Plus, Target,
} from "lucide-react";

const ALL_EXERCISES_LOOKUP = [
  { id: 1,  name: "Jumping Jacks" },     { id: 2,  name: "High Knees" },
  { id: 3,  name: "Goblet Squats" },     { id: 4,  name: "Dumbbell Lunges" },
  { id: 5,  name: "Push-ups" },          { id: 6,  name: "Plank" },
  { id: 7,  name: "Shoulder Taps" },     { id: 8,  name: "Glute Bridges" },
  { id: 9,  name: "Goblet Squat" },      { id: 10, name: "Med Ball Throws" },
  { id: 11, name: "Hip Flexor Stretch" },{ id: 12, name: "Thoracic Rotation" },
  { id: 13, name: "Lunges" },            { id: 14, name: "Push-ups Wide" },
  { id: 15, name: "Dead Hangs" },        { id: 16, name: "Foam Roll IT Band" },
];

const URINE_COLOURS = [
  { label: "Pale Straw",         hex: "#f5e97a" },
  { label: "Translucent Yellow", hex: "#f0c93a" },
  { label: "Dark Yellow",        hex: "#d4a017" },
  { label: "Amber",              hex: "#c47d0e" },
  { label: "Brown",              hex: "#8b5e15" },
];

const MOCK_PLAYERS = [
  {
    id: 1, name: "Arjun Menon", role: "Batsman", number: "01",
    reports: [
      { id: "r1", date: "2025-05-01", time: "08:30 AM", urineColour: "Pale Straw",
        soreness: 3, fatigue: 4, sleep: 7, injury: false, injuryFile: null,
        motivation: 8, ballsBowled: 0, rpe: 5, training: ["Batting","Fielding"], achesPain: false },
      { id: "r2", date: "2025-04-30", time: "09:10 AM", urineColour: "Dark Yellow",
        soreness: 6, fatigue: 7, sleep: 5, injury: false, injuryFile: null,
        motivation: 5, ballsBowled: 0, rpe: 7, training: ["Conditioning","Match"], achesPain: true },
    ],
  },
  {
    id: 2, name: "Rahul Das", role: "Bowler", number: "02",
    reports: [
      { id: "r3", date: "2025-05-01", time: "07:45 AM", urineColour: "Amber",
        soreness: 8, fatigue: 7, sleep: 4, injury: true, injuryFile: "shoulder_mri.pdf",
        motivation: 4, ballsBowled: 120, rpe: 9, training: ["Bowling"], achesPain: true },
    ],
  },
  {
    id: 3, name: "Vivek Pillai", role: "All-rounder", number: "03",
    reports: [
      { id: "r4", date: "2025-05-01", time: "08:00 AM", urineColour: "Translucent Yellow",
        soreness: 2, fatigue: 2, sleep: 8, injury: false, injuryFile: null,
        motivation: 9, ballsBowled: 45, rpe: 4, training: ["Strength","Bowling","Batting"], achesPain: false },
    ],
  },
  { id: 4, name: "Nikhil Krishnan", role: "Wicket-keeper", number: "04", reports: [] },
];

// ─── View constants ───────────────────────────────────────────────────────────
const V_PLAYERS = "players";
const V_REPORTS = "reports";
const V_DETAIL  = "detail";
const V_SESSION = "session";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const card = (extra = {}) => ({
  backgroundColor: "#fff", borderRadius: "10px",
  border: "1px solid #e8e8e8", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", ...extra,
});

const Badge = ({ label, bg, color, border }) => (
  <span style={{
    fontSize: "11px", fontWeight: "700", padding: "2px 9px",
    borderRadius: "20px", backgroundColor: bg, color,
    border: `1px solid ${border}`,
  }}>
    {label}
  </span>
);

const ScorePill = ({ value, max = 10 }) => {
  const pct   = value / max;
  const color = pct >= 0.7 ? "#cc3333" : pct >= 0.4 ? "#e87722" : "#2e7d32";
  return (
    <span style={{ fontSize: "13px", fontWeight: "700", color }}>
      {value}<span style={{ fontSize: "11px", color: "#aaa", fontWeight: "500" }}>/{max}</span>
    </span>
  );
};

const DetailRow = ({ icon: Icon, label, value }) => (
  <div style={{
    display: "flex", alignItems: "center",
    padding: "11px 0", borderBottom: "1px solid #f5f5f5", gap: "10px",
  }}>
    <Icon size={15} style={{ color: "#e87722", flexShrink: 0 }} />
    <span style={{ fontSize: "13px", color: "#888", width: "160px", flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: "13px", color: "#222", fontWeight: "600" }}>{value}</span>
  </div>
);

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

const Heading = ({ title, sub }) => (
  <div style={{ marginBottom: "20px" }}>
    <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#222", marginBottom: "2px" }}>{title}</h1>
    {sub && <p style={{ fontSize: "13px", color: "#888" }}>{sub}</p>}
    <div style={{ width: "32px", height: "3px", backgroundColor: "#e87722", borderRadius: "2px", marginTop: "4px" }} />
  </div>
);

const BackBtn = ({ label, onClick }) => (
  <button onClick={onClick}
    style={{
      display: "flex", alignItems: "center", gap: "6px",
      background: "none", border: "none", color: "#888",
      fontSize: "13px", fontWeight: "600", cursor: "pointer",
      marginBottom: "18px", padding: "0",
    }}>
    <ArrowLeft size={16} style={{ color: "#888" }} /> {label}
  </button>
);

// ─── Main component ───────────────────────────────────────────────────────────
const Physio = () => {
  const [players]      = useState(MOCK_PLAYERS);
  const [view,           setView]         = useState(V_PLAYERS);
  const [activePlayer,   setActivePlayer] = useState(null);
  const [activeReport,   setActiveReport] = useState(null);
  const [savedSessions,  setSavedSessions] = useState({});

  const hasInjury  = (p) => p.reports.some((r) => r.injury);
  const latestDate = (p) => p.reports.length ? p.reports[0].date : null;

  const openPlayer = (player) => { setActivePlayer(player); setActiveReport(null); setView(V_REPORTS); };
  const openReport = (report) => { setActiveReport(report); setView(V_DETAIL); };

  const goBack = () => {
    if (view === V_SESSION) { setView(V_DETAIL); return; }
    if (view === V_DETAIL)  { setView(V_REPORTS); setActiveReport(null); return; }
    if (view === V_REPORTS) { setView(V_PLAYERS); setActivePlayer(null); return; }
  };

  const handleSaveSession = (data) => {
    setSavedSessions((p) => ({
      ...p,
      [activeReport.id]: { ...data, savedAt: new Date().toLocaleDateString("en-IN") },
    }));
    alert("✅ Session saved for " + activePlayer.name);
    setView(V_DETAIL);
  };

  // ── SESSION FORM ──────────────────────────────────────────────────────────
  if (view === V_SESSION) return (
    <PhysioSessionForm
      player={activePlayer}
      report={activeReport}
      onBack={goBack}
      onSave={handleSaveSession}
    />
  );

  // ── PLAYER LIST ───────────────────────────────────────────────────────────
  if (view === V_PLAYERS) return (
    <div style={{ padding: "28px", maxWidth: "1000px", margin: "0 auto" }}>
      <Heading title="Physio Dashboard" sub="All players under your supervision" />

      <div style={{ display: "flex", gap: "14px", marginBottom: "22px", flexWrap: "wrap" }}>
        {[
          { label: "Total Players",   value: players.length,                                                          color: "#e87722" },
          { label: "Reports Today",   value: players.filter((p) => p.reports.some((r) => r.date === "2025-05-01")).length, color: "#2e7d32" },
          { label: "Injured Players", value: players.filter(hasInjury).length,                                         color: "#cc3333" },
          { label: "No Report Today", value: players.filter((p) => !p.reports.some((r) => r.date === "2025-05-01")).length, color: "#888" },
        ].map((s) => (
          <div key={s.label} style={{ ...card({ padding: "14px 20px", minWidth: "150px", borderLeft: `4px solid ${s.color}` }) }}>
            <span style={{ fontSize: "22px", fontWeight: "800", color: s.color, display: "block" }}>{s.value}</span>
            <span style={{ fontSize: "12px", color: "#888", fontWeight: "500" }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div style={card({ overflow: "hidden" })}>
        <div style={{ padding: "14px 22px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "8px" }}>
          <User size={15} style={{ color: "#e87722" }} />
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#333" }}>Players</span>
        </div>

        {players.map((player, i) => {
          const injured = hasInjury(player);
          return (
            <div key={player.id} onClick={() => openPlayer(player)}
              style={{
                display: "flex", alignItems: "center", padding: "15px 22px",
                borderBottom: i < players.length - 1 ? "1px solid #f5f5f5" : "none",
                gap: "14px", cursor: "pointer", transition: "background 0.12s",
                borderLeft: injured ? "3px solid #cc3333" : "3px solid transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = injured ? "#fff8f8" : "#fdf8f4")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                backgroundColor: injured ? "#fff0f0" : "#fff3e8",
                border: `1.5px solid ${injured ? "#ffc5c5" : "#ffd8b0"}`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <User size={18} style={{ color: injured ? "#cc3333" : "#e87722" }} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#222" }}>{player.name}</span>
                  {injured && (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: "4px",
                      fontSize: "10px", fontWeight: "700", color: "#cc3333",
                      backgroundColor: "#fff0f0", border: "1px solid #ffc5c5",
                      borderRadius: "20px", padding: "2px 8px",
                    }}>
                      <AlertTriangle size={10} /> Injured
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>{player.role}</div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                {player.reports.length > 0 ? (
                  <>
                    <div style={{ fontSize: "12px", color: "#888" }}>{formatDate(latestDate(player))}</div>
                    <div style={{ fontSize: "11px", color: "#e87722", fontWeight: "600", marginTop: "2px" }}>
                      {player.reports.length} report{player.reports.length > 1 ? "s" : ""}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: "11px", color: "#bbb" }}>No reports yet</div>
                )}
              </div>
              <ChevronRight size={16} style={{ color: "#ccc", flexShrink: 0 }} />
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── REPORT INBOX ─────────────────────────────────────────────────────────
  if (view === V_REPORTS) return (
    <div style={{ padding: "28px", maxWidth: "860px", margin: "0 auto" }}>
      <BackBtn label="All Players" onClick={() => { setView(V_PLAYERS); setActivePlayer(null); }} />

      <div style={{ ...card({ padding: "18px 22px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "14px" }) }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "50%",
          backgroundColor: hasInjury(activePlayer) ? "#fff0f0" : "#fff3e8",
          border: `2px solid ${hasInjury(activePlayer) ? "#ffc5c5" : "#ffd8b0"}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <User size={20} style={{ color: hasInjury(activePlayer) ? "#cc3333" : "#e87722" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "17px", fontWeight: "700", color: "#222" }}>{activePlayer.name}</span>
            {hasInjury(activePlayer) && <Badge label="Injured" bg="#fff0f0" color="#cc3333" border="#ffc5c5" />}
          </div>
          <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
            {activePlayer.role} · {activePlayer.reports.length} daily report{activePlayer.reports.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {activePlayer.reports.length === 0 ? (
        <div style={{ ...card({ padding: "48px", textAlign: "center" }) }}>
          <FileText size={36} style={{ color: "#ddd", margin: "0 auto 12px", display: "block" }} />
          <p style={{ fontSize: "15px", fontWeight: "700", color: "#555" }}>No reports submitted yet</p>
          <p style={{ fontSize: "13px", color: "#aaa", marginTop: "4px" }}>Reports will appear here once the player submits them</p>
        </div>
      ) : (
        <div style={card({ overflow: "hidden" })}>
          <div style={{ padding: "12px 22px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "6px" }}>
            <Clock size={14} style={{ color: "#e87722" }} />
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#333" }}>Daily Reports — Latest First</span>
          </div>

          {[...activePlayer.reports]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((report, i, arr) => {
              const high   = report.soreness >= 7 || report.fatigue >= 7;
              const rowBg  = report.injury ? "#fff8f8" : "transparent";
              return (
                <div key={report.id} onClick={() => openReport(report)}
                  style={{
                    display: "flex", alignItems: "center", padding: "15px 22px",
                    borderBottom: i < arr.length - 1 ? "1px solid #f5f5f5" : "none",
                    gap: "14px", cursor: "pointer",
                    borderLeft: report.injury ? "3px solid #cc3333" : "3px solid transparent",
                    backgroundColor: rowBg, transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = report.injury ? "#ffeded" : "#fdf8f4")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = rowBg)}
                >
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "10px",
                    backgroundColor: report.injury ? "#fff0f0" : (i === 0 ? "#fff3e8" : "#f5f5f5"),
                    border: `1.5px solid ${report.injury ? "#ffc5c5" : (i === 0 ? "#ffd8b0" : "#e8e8e8")}`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <span style={{ fontSize: "13px", fontWeight: "800", color: report.injury ? "#cc3333" : (i === 0 ? "#e87722" : "#555") }}>
                      {new Date(report.date).getDate()}
                    </span>
                    <span style={{ fontSize: "9px", fontWeight: "600", textTransform: "uppercase", color: report.injury ? "#cc3333" : (i === 0 ? "#e87722" : "#aaa") }}>
                      {new Date(report.date).toLocaleString("en-IN", { month: "short" })}
                    </span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: report.injury ? "#cc3333" : "#222" }}>
                        Daily Report — {formatDate(report.date)}
                      </span>
                      {i === 0 && !report.injury && <Badge label="Latest"    bg="#fff3e8" color="#e87722" border="#ffd8b0" />}
                      {report.injury             && <Badge label="⚠ Injury"  bg="#fff0f0" color="#cc3333" border="#ffc5c5" />}
                      {high && !report.injury    && <Badge label="High Load" bg="#fff8e1" color="#f9a825" border="#ffe082" />}
                    </div>
                    <div style={{ display: "flex", gap: "16px", marginTop: "5px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "11px", color: "#888" }}>Soreness <b style={{ color: report.soreness >= 7 ? "#cc3333" : "#555" }}>{report.soreness}/10</b></span>
                      <span style={{ fontSize: "11px", color: "#888" }}>Fatigue  <b style={{ color: report.fatigue  >= 7 ? "#cc3333" : "#555" }}>{report.fatigue}/10</b></span>
                      <span style={{ fontSize: "11px", color: "#888" }}>Sleep    <b style={{ color: "#555" }}>{report.sleep}h</b></span>
                      <span style={{ fontSize: "11px", color: "#888" }}>RPE      <b style={{ color: "#555" }}>{report.rpe}/10</b></span>
                    </div>
                  </div>

                  <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "11px", color: "#bbb" }}>{report.time}</span>
                    <ChevronRight size={15} style={{ color: report.injury ? "#ffc5c5" : "#ccc" }} />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );

  // ── REPORT DETAIL ─────────────────────────────────────────────────────────
  if (view === V_DETAIL) {
    const r       = activeReport;
    const session = savedSessions[r.id];
    const urineHex = URINE_COLOURS.find((c) => c.label === r.urineColour)?.hex || "#f5e97a";

    return (
      <div style={{ padding: "28px", maxWidth: "860px", margin: "0 auto" }}>
        <BackBtn label={`${activePlayer.name}'s Reports`} onClick={goBack} />

        {/* Report header */}
        <div style={{ ...card({ padding: "18px 22px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }) }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#fff3e8", border: "1.5px solid #ffd8b0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FileText size={18} style={{ color: "#e87722" }} />
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#222" }}>Daily Report</div>
              <div style={{ fontSize: "12px", color: "#888" }}>{formatDate(r.date)} · {r.time} · {activePlayer.name}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {r.injury    && <Badge label="⚠ Injury Reported" bg="#fff0f0" color="#cc3333" border="#ffc5c5" />}
            {r.achesPain && !r.injury && <Badge label="Aches / Pain" bg="#fff8e1" color="#f9a825" border="#ffe082" />}
          </div>
        </div>

        {/* Metrics grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: "12px", marginBottom: "20px" }}>
          {[
            { icon: Activity, label: "Soreness",    value: <ScorePill value={r.soreness} /> },
            { icon: Zap,      label: "Fatigue",     value: <ScorePill value={r.fatigue} /> },
            { icon: Moon,     label: "Sleep",       value: <span style={{ fontSize: "13px", fontWeight: "700", color: "#222" }}>{r.sleep}h</span> },
            { icon: Heart,    label: "Motivation",  value: <ScorePill value={r.motivation} /> },
            { icon: Activity, label: "RPE",         value: <ScorePill value={r.rpe} /> },
            { icon: Target,   label: "Balls Bowled",value: <span style={{ fontSize: "13px", fontWeight: "700", color: "#222" }}>{r.ballsBowled}</span> },
          ].map((m) => (
            <div key={m.label} style={card({ padding: "14px 16px" })}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                <m.icon size={14} style={{ color: "#e87722" }} />
                <span style={{ fontSize: "11px", color: "#888", fontWeight: "500" }}>{m.label}</span>
              </div>
              {m.value}
            </div>
          ))}
        </div>

        {/* Detail rows */}
        <div style={{ ...card({ padding: "6px 22px 4px", marginBottom: "20px" }) }}>
          <DetailRow icon={Calendar}     label="Date"             value={formatDate(r.date)} />
          <DetailRow icon={Clock}        label="Submitted At"     value={r.time} />
          <DetailRow icon={Activity}     label="Urine Colour"
            value={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: urineHex, border: "1px solid #ddd" }} />
                {r.urineColour}
              </div>
            }
          />
          <DetailRow icon={CheckCircle2} label="Training Sessions"
            value={
              r.training.length > 0 ? (
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {r.training.map((t) => (
                    <span key={t} style={{ fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "20px", backgroundColor: "#fff3e8", color: "#e87722", border: "1px solid #ffd8b0" }}>{t}</span>
                  ))}
                </div>
              ) : "None"
            }
          />
          {r.injuryFile && (
            <DetailRow icon={FileText} label="Injury Report"
              value={<span style={{ color: "#e87722", fontWeight: "600", textDecoration: "underline", cursor: "pointer" }}>{r.injuryFile}</span>}
            />
          )}
        </div>

        {/* Saved session summary */}
        {session && (
          <div style={{ ...card({ padding: "18px 22px", marginBottom: "20px", borderLeft: "4px solid #2e7d32" }) }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <CheckCircle2 size={17} style={{ color: "#2e7d32" }} />
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#2e7d32" }}>Session Saved — {session.savedAt}</span>
            </div>
            {session.sessionAction === "refer" && (
              <p style={{ fontSize: "13px", color: "#555" }}>Player referred to the medical/doctor team.</p>
            )}
            {session.sessionAction === "workout" && session.selectedExercises?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "6px" }}>
                {ALL_EXERCISES_LOOKUP
                  .filter((e) => session.selectedExercises.includes(e.id))
                  .map((e) => (
                    <span key={e.id} style={{ fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px", backgroundColor: "#fff3e8", color: "#b05a00", border: "1px solid #ffd8b0" }}>
                      {e.name}
                    </span>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Create Session CTA — only for injured reports */}
        {r.injury && (
          <div style={{ ...card({ padding: "20px 22px", borderLeft: "4px solid #cc3333" }) }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <AlertTriangle size={18} style={{ color: "#cc3333" }} />
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#cc3333" }}>Injury Detected</div>
                  <div style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>
                    Create a session to document treatment and assign a plan
                  </div>
                </div>
              </div>
              <button
                onClick={() => setView(V_SESSION)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "10px 22px", backgroundColor: "#e87722",
                  color: "#fff", border: "none", borderRadius: "8px",
                  fontSize: "13px", fontWeight: "700", cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(232,119,34,0.3)", flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d06a18")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e87722")}
              >
                <Plus size={15} /> Create Session
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Physio;