import { useState } from "react";
import {
  ChevronRight, ChevronLeft, ArrowLeft, CheckCircle2,
  Circle, TrendingUp, Target, Users, Calendar,
  Activity, Award, AlertCircle, Edit2, X, Check,
  BarChart2, Zap, Clock, Plus,
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const PLAYERS = [
  { id: 1, name: "Rahul Das",      role: "Bowler",         status: "Injured",  avatar: "RD" },
  { id: 2, name: "Arjun Menon",   role: "Batsman",        status: "Active",   avatar: "AM" },
  { id: 3, name: "Vivek Pillai",  role: "All-rounder",    status: "Active",   avatar: "VP" },
  { id: 4, name: "Nikhil K",      role: "Wicket-keeper",  status: "Active",   avatar: "NK" },
];

const WEEKS_META = [
  { week: 1, label: "Week 1", dates: "May 6th – May 13th, 2024",  totalGoals: 10 },
  { week: 2, label: "Week 2", dates: "May 13th – May 20th, 2024", totalGoals: 19 },
  { week: 3, label: "Week 3", dates: "May 20th – May 27th, 2024", totalGoals: 10 },
  { week: 4, label: "Week 4", dates: "May 27th – Jun 3rd, 2024",  totalGoals: 10 },
  { week: 5, label: "Week 5", dates: "Jun 3rd – Jun 10th, 2024",  totalGoals: 15 },
  { week: 6, label: "Week 6", dates: "Jun 10th – Jun 17th, 2024", totalGoals: 8  },
  { week: 7, label: "Week 7", dates: "Jun 17th – Jun 24th, 2024", totalGoals: 7  },
];

const CLINICAL_GOALS = [
  { id: "c1", text: "Week 1: Pain-free daily activities",            category: "Clinical",       status: "Not Started", pain: 0, notes: "" },
  { id: "c2", text: "Week 1: Normal breathing without discomfort",   category: "Clinical",       status: "Not Started", pain: 0, notes: "" },
  { id: "c3", text: "Week 1: Full range of motion",                  category: "Clinical",       status: "Not Started", pain: 0, notes: "" },
  { id: "c4", text: "Week 1: No point tenderness",                   category: "Clinical",       status: "Not Started", pain: 0, notes: "" },
  { id: "c5", text: "Week 1: Strength progression",                  category: "Clinical",       status: "Not Started", pain: 0, notes: "" },
  { id: "r1", text: "Week 1: Follow recovery protocol",              category: "Rehabilitation", status: "Not Started", pain: 0, notes: "" },
  { id: "r2", text: "Week 1: Ice and rest as needed",                category: "Rehabilitation", status: "Not Started", pain: 0, notes: "" },
  { id: "r3", text: "Week 1: Progressive mobility exercises",        category: "Rehabilitation", status: "Not Started", pain: 0, notes: "" },
  { id: "r4", text: "Week 1: Gradual activity increase",             category: "Rehabilitation", status: "Not Started", pain: 0, notes: "" },
  { id: "r5", text: "Asymptomatic with ADL/transferring ly-sit",     category: "Clinical",       status: "Not Started", pain: 0, notes: "" },
];

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ROW_LABELS   = ["Strength", "Conditioning", "Cricket/Other", "Location", "Recovery/treatment", "Practitioner", "Fixtures"];

const buildGridData = () => {
  const grid = {};
  for (let w = 1; w <= 7; w++) {
    grid[w] = {};
    DAYS_OF_WEEK.forEach((_, di) => {
      grid[w][di] = {};
      ROW_LABELS.forEach(r => { grid[w][di][r] = ""; });
    });
  }
  // seed some sample data
  grid[1][0]["Cricket/Other"]      = "Trialled further bat - further flare";
  grid[1][2]["Cricket/Other"]      = "Withdraw from cricket";
  grid[1][2]["Location"]           = "Travel Delhi–Chennai";
  grid[1][0]["Recovery/treatment"] = "PRICE";
  grid[1][1]["Recovery/treatment"] = "PRICE";
  grid[1][2]["Recovery/treatment"] = "PRICE";
  grid[1][2]["Practitioner"]       = "John";
  grid[2][0]["Strength"]           = "BW circuit 2";
  grid[2][0]["Conditioning"]       = "Running drills";
  grid[2][1]["Conditioning"]       = "Interval training";
  grid[2][1]["Cricket/Other"]      = "Net practice";
  grid[2][0]["Location"]           = "Chennai";
  grid[2][1]["Location"]           = "Chennai";
  grid[2][2]["Location"]           = "Chennai";
  grid[2][0]["Recovery/treatment"] = "PRICE";
  grid[2][1]["Recovery/treatment"] = "Massage";
  grid[2][2]["Recovery/treatment"] = "PRICE";
  grid[2][2]["Strength"]           = "Upper body";
  return grid;
};

const WEEK_START_DATES = {
  1: ["6 May","7 May","8 May","9 May","10 May","11 May","12 May"],
  2: ["13 May","14 May","15 May","16 May","17 May","18 May","19 May"],
  3: ["20 May","21 May","22 May","23 May","24 May","25 May","26 May"],
  4: ["27 May","28 May","29 May","30 May","31 May","1 Jun","2 Jun"],
  5: ["3 Jun","4 Jun","5 Jun","6 Jun","7 Jun","8 Jun","9 Jun"],
  6: ["10 Jun","11 Jun","12 Jun","13 Jun","14 Jun","15 Jun","16 Jun"],
  7: ["17 Jun","18 Jun","19 Jun","20 Jun","21 Jun","22 Jun","23 Jun"],
};

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
const STATUS_CFG = {
  "Not Started": { bg: "#f0f0f0",  color: "#888",    border: "#e0e0e0" },
  "In Progress":  { bg: "#fff8e1", color: "#f9a825", border: "#ffe082" },
  "Completed":    { bg: "#f0faf0", color: "#2e7d32", border: "#b8e6b8" },
  "At Risk":      { bg: "#fff0f0", color: "#cc3333", border: "#ffc5c5" },
};

// ─── VIEWS ────────────────────────────────────────────────────────────────────
const V_HOME      = "home";
const V_PLAYER    = "player";
const V_GOALS     = "goals";
const V_GOAL_DETAIL = "goal_detail";
const V_PROGRESS  = "progress";
const V_FITNESS   = "fitness";

// ─── SHARED UI ────────────────────────────────────────────────────────────────
const card = (extra = {}) => ({
  backgroundColor: "#fff",
  borderRadius: "10px",
  border: "1px solid #e8e8e8",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  ...extra,
});

const OrangeBtn = ({ children, onClick, style = {} }) => (
  <button onClick={onClick} style={{
    display: "inline-flex", alignItems: "center", gap: "6px",
    padding: "9px 20px", backgroundColor: "#e87722",
    color: "#fff", border: "none", borderRadius: "8px",
    fontSize: "13px", fontWeight: "700", cursor: "pointer",
    boxShadow: "0 2px 8px rgba(232,119,34,0.28)", ...style,
  }}
    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#d06a18"}
    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#e87722"}
  >{children}</button>
);

const BackBtn = ({ label, onClick }) => (
  <button onClick={onClick} style={{
    display: "flex", alignItems: "center", gap: "6px",
    background: "none", border: "none", color: "#888",
    fontSize: "13px", fontWeight: "600", cursor: "pointer",
    marginBottom: "18px", padding: "0",
  }}>
    <ArrowLeft size={16} style={{ color: "#888" }} /> {label}
  </button>
);

const Heading = ({ title, sub }) => (
  <div style={{ marginBottom: "22px" }}>
    <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#222", marginBottom: "2px" }}>{title}</h1>
    {sub && <p style={{ fontSize: "13px", color: "#888", marginTop: "2px" }}>{sub}</p>}
    <div style={{ width: "32px", height: "3px", backgroundColor: "#e87722", borderRadius: "2px", marginTop: "5px" }} />
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function TrainerDashboard() {
  const [view,          setView]         = useState(V_HOME);
  const [activePlayer,  setActivePlayer] = useState(null);
  const [activeTab,     setActiveTab]    = useState("goals"); // goals | progress | fitness
  const [goals,         setGoals]        = useState(CLINICAL_GOALS);
  const [activeGoal,    setActiveGoal]   = useState(null);
  const [gridData,      setGridData]     = useState(buildGridData);
  const [activeWeek,    setActiveWeek]   = useState(1);
  const [editCell,      setEditCell]     = useState(null); // {day,row}
  const [editVal,       setEditVal]      = useState("");

  // ── goal detail local state ──
  const [goalStatus, setGoalStatus] = useState("Not Started");
  const [goalPain,   setGoalPain]   = useState(0);
  const [goalNotes,  setGoalNotes]  = useState("");

  const openGoal = (g) => {
    setActiveGoal(g);
    setGoalStatus(g.status);
    setGoalPain(g.pain);
    setGoalNotes(g.notes);
    setView(V_GOAL_DETAIL);
  };

  const saveGoal = () => {
    setGoals(prev => prev.map(g =>
      g.id === activeGoal.id ? { ...g, status: goalStatus, pain: goalPain, notes: goalNotes } : g
    ));
    setView(V_GOALS);
  };

  const completedCount = goals.filter(g => g.status === "Completed").length;
  const inProgressCount = goals.filter(g => g.status === "In Progress").length;
  const atRiskCount = goals.filter(g => g.status === "At Risk").length;
  const avgPain = goals.length ? (goals.reduce((s, g) => s + g.pain, 0) / goals.length).toFixed(1) : 0;

  const clinicalGoals      = goals.filter(g => g.category === "Clinical");
  const rehabGoals         = goals.filter(g => g.category === "Rehabilitation");

  const saveCell = () => {
    if (!editCell) return;
    setGridData(prev => {
      const next = { ...prev };
      next[activeWeek] = { ...next[activeWeek] };
      next[activeWeek][editCell.day] = { ...next[activeWeek][editCell.day], [editCell.row]: editVal };
      return next;
    });
    setEditCell(null);
    setEditVal("");
  };

  // ── weekly progress for chart ──
  const weeklyPct = WEEKS_META.map(wm => {
    const done = goals.filter(g => g.status === "Completed" && g.text.includes(`Week ${wm.week}`)).length;
    return { week: wm.week, pct: wm.totalGoals > 0 ? Math.round((done / wm.totalGoals) * 10) : 0 };
  });
  const maxPct = Math.max(...weeklyPct.map(w => w.pct), 1);

  // ═══════════════════════════════════════════════════════════════════
  // VIEW: HOME DASHBOARD
  // ═══════════════════════════════════════════════════════════════════
  if (view === V_HOME) return (
    <div style={{ padding: "28px", maxWidth: "1100px", margin: "0 auto" }}>
      <Heading title="Trainer Dashboard" sub="Manage player goals, fitness plans and recovery progress" />

      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Total Players",    value: PLAYERS.length,      icon: Users,     color: "#e87722" },
          { label: "Goals Completed",  value: completedCount,       icon: CheckCircle2, color: "#2e7d32" },
          { label: "In Progress",      value: inProgressCount,      icon: Activity,  color: "#f9a825" },
          { label: "At Risk",          value: atRiskCount,          icon: AlertCircle, color: "#cc3333" },
        ].map(s => (
          <div key={s.label} style={card({ padding: "16px 20px", borderLeft: `4px solid ${s.color}` })}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "22px", fontWeight: "800", color: s.color }}>{s.value}</span>
              <div style={{ width: "34px", height: "34px", borderRadius: "9px", backgroundColor: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
            </div>
            <span style={{ fontSize: "12px", color: "#888", fontWeight: "500" }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Players grid */}
      <div style={{ ...card({ padding: "0", overflow: "hidden", marginBottom: "24px" }) }}>
        <div style={{ padding: "16px 22px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Users size={15} style={{ color: "#e87722" }} />
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#333" }}>Players</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "0" }}>
          {PLAYERS.map((p, i) => (
            <div key={p.id}
              onClick={() => { setActivePlayer(p); setActiveTab("goals"); setView(V_PLAYER); }}
              style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "16px 22px", cursor: "pointer",
                borderRight: i % 2 === 0 ? "1px solid #f5f5f5" : "none",
                borderBottom: i < PLAYERS.length - 2 ? "1px solid #f5f5f5" : "none",
                transition: "background 0.12s",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#fdf8f4"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <div style={{
                width: "44px", height: "44px", borderRadius: "50%",
                backgroundColor: p.status === "Injured" ? "#fff0f0" : "#fff3e8",
                border: `2px solid ${p.status === "Injured" ? "#ffc5c5" : "#ffd8b0"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: "800",
                color: p.status === "Injured" ? "#cc3333" : "#e87722",
                flexShrink: 0,
              }}>{p.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#222" }}>{p.name}</span>
                  {p.status === "Injured" && (
                    <span style={{ fontSize: "10px", fontWeight: "700", color: "#cc3333", backgroundColor: "#fff0f0", border: "1px solid #ffc5c5", borderRadius: "20px", padding: "2px 7px" }}>Injured</span>
                  )}
                </div>
                <div style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>{p.role}</div>
              </div>
              <ChevronRight size={15} style={{ color: "#ccc" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick progress bar */}
      <div style={card({ padding: "22px" })}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <span style={{ fontSize: "15px", fontWeight: "700", color: "#333" }}>Overall Goal Progress</span>
          <span style={{ fontSize: "22px", fontWeight: "800", color: "#e87722" }}>
            {goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0}%
          </span>
        </div>
        <div style={{ height: "10px", backgroundColor: "#f0f0f0", borderRadius: "6px", overflow: "hidden", marginBottom: "12px" }}>
          <div style={{
            height: "100%", borderRadius: "6px",
            width: `${goals.length > 0 ? (completedCount / goals.length) * 100 : 0}%`,
            backgroundColor: "#e87722", transition: "width 0.5s ease",
          }} />
        </div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {[
            { label: "Completed",   count: completedCount,  color: "#2e7d32" },
            { label: "In Progress", count: inProgressCount, color: "#f9a825" },
            { label: "At Risk",     count: atRiskCount,     color: "#cc3333" },
            { label: "Not Started", count: goals.length - completedCount - inProgressCount - atRiskCount, color: "#aaa" },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: s.color }} />
              <span style={{ fontSize: "12px", color: "#555", fontWeight: "500" }}>{s.count} {s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════
  // VIEW: PLAYER HUB (tabs: goals | progress | fitness)
  // ═══════════════════════════════════════════════════════════════════
  if (view === V_PLAYER) return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

      {/* Player hero banner */}
      <div style={{
        background: "linear-gradient(135deg, #1a2340 0%, #2d3a5c 100%)",
        padding: "28px 28px 0",
        borderBottom: "1px solid #e8e8e8",
      }}>
        <button onClick={() => setView(V_HOME)} style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "none", border: "none", color: "rgba(255,255,255,0.7)",
          fontSize: "13px", fontWeight: "600", cursor: "pointer",
          marginBottom: "16px", padding: "0",
        }}>
          <ArrowLeft size={15} /> All Players
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            backgroundColor: activePlayer.status === "Injured" ? "#cc3333" : "#e87722",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", fontWeight: "800", color: "#fff",
          }}>{activePlayer.avatar}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#fff", margin: 0 }}>{activePlayer.name}</h2>
              <span style={{
                fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px",
                backgroundColor: activePlayer.status === "Injured" ? "#cc3333" : "rgba(255,255,255,0.15)",
                color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
              }}>{activePlayer.status}</span>
            </div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "3px" }}>{activePlayer.role}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0" }}>
          {[
            { key: "goals",    label: "Weekly Goals",      icon: Target },
            { key: "progress", label: "Progress",           icon: TrendingUp },
            { key: "fitness",  label: "Fitness Overview",   icon: BarChart2 },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "12px 20px", border: "none", cursor: "pointer",
                fontSize: "13px", fontWeight: "700",
                backgroundColor: "transparent",
                color: activeTab === tab.key ? "#fff" : "rgba(255,255,255,0.5)",
                borderBottom: activeTab === tab.key ? "3px solid #e87722" : "3px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <tab.icon size={15} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB: WEEKLY GOALS */}
      {activeTab === "goals" && (
        <div style={{ padding: "28px" }}>
          <Heading title="Training Goals" sub="Track your 7-week rehabilitation journey" />

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {WEEKS_META.map(wm => {
              const wGoals     = goals.filter(g => g.text.includes(`Week ${wm.week}`));
              const done       = wGoals.filter(g => g.status === "Completed").length;
              const inProg     = wGoals.filter(g => g.status === "In Progress").length;
              const atRisk     = wGoals.filter(g => g.status === "At Risk").length;
              const pct        = wm.totalGoals > 0 ? Math.round((done / wm.totalGoals) * 100) : 0;
              return (
                <div key={wm.week}
                  onClick={() => { setActiveWeek(wm.week); setView(V_GOALS); }}
                  style={{
                    ...card({ padding: "18px 20px", cursor: "pointer", transition: "all 0.15s" }),
                    borderLeft: done > 0 ? "4px solid #e87722" : "4px solid #e0e0e0",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#e87722"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(232,119,34,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = done > 0 ? "#e87722" : "#e0e0e0"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#222" }}>{wm.label}</div>
                      <div style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>{done} of {wm.totalGoals} goals completed</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "15px", fontWeight: "800", color: "#e87722" }}>{pct}%</span>
                      <ChevronRight size={16} style={{ color: "#ccc" }} />
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ height: "6px", backgroundColor: "#f0f0f0", borderRadius: "4px", overflow: "hidden", marginBottom: "10px" }}>
                    <div style={{ height: "100%", borderRadius: "4px", width: `${pct}%`, backgroundColor: "#e87722", transition: "width 0.5s" }} />
                  </div>

                  {/* Status dots */}
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    {[
                      { label: "Completed",   n: done,   color: "#2e7d32" },
                      { label: "In Progress", n: inProg, color: "#f9a825" },
                      { label: "At Risk",     n: atRisk, color: "#cc3333" },
                    ].map(s => (
                      <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: s.color }} />
                        <span style={{ fontSize: "11px", color: "#666", fontWeight: "500" }}>{s.n} {s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: PROGRESS */}
      {activeTab === "progress" && (
        <div style={{ padding: "28px" }}>
          {/* Header banner */}
          <div style={{
            background: "linear-gradient(135deg, #1a2340, #2d3a5c)",
            borderRadius: "12px", padding: "24px 28px", marginBottom: "22px",
            color: "#fff",
          }}>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#e87722", marginBottom: "4px" }}>Progress Dashboard</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>Track your rehabilitation journey</div>
          </div>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px", marginBottom: "22px" }}>
            {[
              { label: "Completion Rate", value: goals.length > 0 ? Math.round((completedCount / goals.length) * 100) + "%" : "0%", icon: Award },
              { label: "Goals Completed", value: completedCount, icon: CheckCircle2 },
              { label: "Avg Pain Level",  value: avgPain,        icon: Activity },
            ].map(s => (
              <div key={s.label} style={card({ padding: "18px", textAlign: "center" })}>
                <div style={{ fontSize: "26px", fontWeight: "800", color: "#1a2340", marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "12px", color: "#888" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div style={card({ padding: "22px", marginBottom: "22px" })}>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#333", marginBottom: "20px" }}>Weekly Completion Progress</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "160px", padding: "0 8px" }}>
              {weeklyPct.map(w => (
                <div key={w.week} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%", justifyContent: "flex-end" }}>
                  <div style={{ fontSize: "11px", color: "#888", fontWeight: "600" }}>{w.pct > 0 ? w.pct : ""}</div>
                  <div style={{
                    width: "100%", borderRadius: "6px 6px 0 0",
                    height: `${Math.max((w.pct / maxPct) * 130, 4)}px`,
                    backgroundColor: w.pct > 0 ? "#e87722" : "#f0f0f0",
                    transition: "height 0.5s",
                  }} />
                  <div style={{ fontSize: "11px", color: "#888", fontWeight: "600" }}>W{w.week}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress summary */}
          <div style={{ ...card({ padding: "18px 22px" }), backgroundColor: "#fff3e8", border: "1px solid #ffd8b0" }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#e87722", marginBottom: "6px" }}>Your Progress</div>
            <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>
              You've completed <b style={{ color: "#222" }}>{completedCount}</b> out of <b style={{ color: "#222" }}>{goals.length}</b> total goals.{" "}
              {completedCount === 0 ? "Keep going — every goal completed is a step forward!" : "Great work, keep it up!"}
            </div>
          </div>
        </div>
      )}

      {/* TAB: FITNESS OVERVIEW */}
      {activeTab === "fitness" && (
        <div style={{ padding: "28px" }}>
          {/* Header banner */}
          <div style={{
            background: "linear-gradient(135deg, #1a2340, #2d3a5c)",
            borderRadius: "12px", padding: "24px 28px", marginBottom: "22px",
          }}>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#fff", marginBottom: "4px" }}>Fitness Overview</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
              <button onClick={() => setActiveWeek(w => Math.max(1, w - 1))}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", opacity: activeWeek === 1 ? 0.3 : 1 }}>
                <ChevronLeft size={22} />
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>Week {activeWeek}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>{WEEKS_META[activeWeek - 1].dates}</div>
              </div>
              <button onClick={() => setActiveWeek(w => Math.min(7, w + 1))}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", opacity: activeWeek === 7 ? 0.3 : 1 }}>
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Grid table */}
          <div style={{ ...card({ overflow: "auto" }) }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f9f9f9" }}>
                  <th style={{ padding: "12px 14px", fontSize: "12px", fontWeight: "700", color: "#888", textAlign: "left", borderBottom: "1px solid #e8e8e8", width: "120px" }}>
                  </th>
                  {DAYS_OF_WEEK.map((day, di) => {
                    const dateStr = WEEK_START_DATES[activeWeek]?.[di] || "";
                    return (
                      <th key={day} style={{ padding: "10px 12px", fontSize: "11px", fontWeight: "700", color: "#555", textAlign: "center", borderBottom: "1px solid #e8e8e8", borderLeft: "1px solid #f0f0f0", minWidth: "90px" }}>
                        <div>{dateStr}</div>
                        <div style={{ color: "#aaa", fontWeight: "500", marginTop: "1px" }}>{day}</div>
                        <div style={{ fontSize: "14px", fontWeight: "800", color: "#222", marginTop: "2px" }}>{di}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {ROW_LABELS.map((row, ri) => (
                  <tr key={row} style={{ backgroundColor: ri % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{
                      padding: "12px 14px", fontSize: "12px", fontWeight: "600", color: "#555",
                      borderBottom: "1px solid #f5f5f5", borderRight: "1px solid #f0f0f0",
                      verticalAlign: "top", lineHeight: "1.4",
                    }}>
                      {row}
                    </td>
                    {DAYS_OF_WEEK.map((_, di) => {
                      const cellVal = gridData[activeWeek]?.[di]?.[row] || "";
                      const isEditing = editCell?.day === di && editCell?.row === row;
                      return (
                        <td key={di} style={{
                          padding: "10px 12px", fontSize: "12px", color: "#333",
                          borderBottom: "1px solid #f5f5f5", borderLeft: "1px solid #f0f0f0",
                          verticalAlign: "top", position: "relative", cursor: "pointer",
                          backgroundColor: isEditing ? "#fffaf5" : "transparent",
                          minHeight: "48px",
                        }}
                          onClick={() => { if (!isEditing) { setEditCell({ day: di, row }); setEditVal(cellVal); } }}
                        >
                          {isEditing ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                              <textarea
                                autoFocus
                                value={editVal}
                                onChange={e => setEditVal(e.target.value)}
                                onClick={e => e.stopPropagation()}
                                rows={3}
                                style={{
                                  width: "100%", padding: "6px 8px",
                                  border: "1.5px solid #e87722", borderRadius: "6px",
                                  fontSize: "12px", outline: "none", resize: "none",
                                  fontFamily: "inherit", boxSizing: "border-box",
                                }}
                              />
                              <div style={{ display: "flex", gap: "4px" }}>
                                <button onClick={e => { e.stopPropagation(); saveCell(); }}
                                  style={{ flex: 1, padding: "4px", backgroundColor: "#e87722", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "700" }}>
                                  Save
                                </button>
                                <button onClick={e => { e.stopPropagation(); setEditCell(null); setEditVal(""); }}
                                  style={{ flex: 1, padding: "4px", backgroundColor: "#f0f0f0", color: "#555", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "4px", minHeight: "24px" }}>
                              <span style={{ lineHeight: "1.4", color: cellVal ? "#333" : "#ccc" }}>
                                {cellVal || "–"}
                              </span>
                              {cellVal && (
                                <Edit2 size={11} style={{ color: "#ccc", flexShrink: 0, marginTop: "2px" }} />
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "12px", fontSize: "12px", color: "#aaa", textAlign: "right" }}>
            Click any cell to edit
          </div>
        </div>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════
  // VIEW: WEEKLY GOALS LIST
  // ═══════════════════════════════════════════════════════════════════
  if (view === V_GOALS) {
    const weekGoalsClinical = clinicalGoals.filter(g => g.text.includes(`Week ${activeWeek}`) || activeWeek > 1);
    const weekGoalsRehab    = rehabGoals.filter(g => g.text.includes(`Week ${activeWeek}`) || activeWeek > 1);
    const allWeekGoals      = [...clinicalGoals, ...rehabGoals];

    const GoalRow = ({ g }) => {
      const cfg = STATUS_CFG[g.status];
      return (
        <div onClick={() => openGoal(g)}
          style={{
            display: "flex", alignItems: "center", gap: "14px",
            padding: "15px 20px", backgroundColor: "#fff",
            borderRadius: "10px", border: "1px solid #e8e8e8",
            cursor: "pointer", marginBottom: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#e87722"; e.currentTarget.style.boxShadow = "0 3px 12px rgba(232,119,34,0.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; }}
        >
          {g.status === "Completed"
            ? <CheckCircle2 size={20} style={{ color: "#2e7d32", flexShrink: 0 }} />
            : <Circle size={20} style={{ color: "#ccc", flexShrink: 0 }} />
          }
          <span style={{ flex: 1, fontSize: "14px", color: "#222", lineHeight: "1.4" }}>{g.text}</span>
          {g.status !== "Not Started" && (
            <span style={{ fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "20px", backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, flexShrink: 0 }}>
              {g.status}
            </span>
          )}
          <ChevronRight size={16} style={{ color: "#ccc", flexShrink: 0 }} />
        </div>
      );
    };

    return (
      <div style={{ padding: "28px", maxWidth: "860px", margin: "0 auto" }}>
        <BackBtn label="Training Goals" onClick={() => setView(V_PLAYER)} />

        {/* Week nav */}
        <div style={{
          background: "linear-gradient(135deg, #1a2340, #2d3a5c)",
          borderRadius: "12px", padding: "20px 24px", marginBottom: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button onClick={() => setActiveWeek(w => Math.max(1, w - 1))}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", opacity: activeWeek === 1 ? 0.3 : 1 }}>
            <ChevronLeft size={22} />
          </button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff" }}>Week {activeWeek}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>{WEEKS_META[activeWeek - 1].dates}</div>
          </div>
          <button onClick={() => setActiveWeek(w => Math.min(7, w + 1))}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", opacity: activeWeek === 7 ? 0.3 : 1 }}>
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Clinical Goals */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ width: "4px", height: "20px", backgroundColor: "#e87722", borderRadius: "2px" }} />
            <span style={{ fontSize: "17px", fontWeight: "700", color: "#222" }}>Clinical Goals</span>
          </div>
          {clinicalGoals.map(g => <GoalRow key={g.id} g={g} />)}
        </div>

        {/* Rehab Goals */}
        <div style={{ marginTop: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ width: "4px", height: "20px", backgroundColor: "#f9a825", borderRadius: "2px" }} />
            <span style={{ fontSize: "17px", fontWeight: "700", color: "#222" }}>Rehabilitation Goals</span>
          </div>
          {rehabGoals.map(g => <GoalRow key={g.id} g={g} />)}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // VIEW: GOAL DETAIL
  // ═══════════════════════════════════════════════════════════════════
  if (view === V_GOAL_DETAIL && activeGoal) {
    const cfg = STATUS_CFG[goalStatus];
    return (
      <div style={{ padding: "28px", maxWidth: "640px", margin: "0 auto" }}>
        <BackBtn label="Goals" onClick={() => setView(V_GOALS)} />

        {/* Category badge + title */}
        <div style={{ marginBottom: "24px" }}>
          <span style={{
            fontSize: "12px", fontWeight: "700", padding: "4px 12px",
            borderRadius: "20px", backgroundColor: "#fff3e8",
            color: "#e87722", border: "1px solid #ffd8b0",
            display: "inline-block", marginBottom: "10px",
          }}>
            {activeGoal.category}
          </span>
          <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#222", lineHeight: "1.3", margin: 0 }}>
            {activeGoal.text}
          </h1>
        </div>

        {/* Status card */}
        <div style={card({ padding: "20px", marginBottom: "16px" })}>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#333", marginBottom: "14px" }}>Status</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {["Not Started", "In Progress", "Completed", "At Risk"].map(s => {
              const c = STATUS_CFG[s];
              const active = goalStatus === s;
              return (
                <div key={s} onClick={() => setGoalStatus(s)}
                  style={{
                    padding: "10px 14px", borderRadius: "9px", cursor: "pointer",
                    border: `1.5px solid ${active ? c.color : "#e0e0e0"}`,
                    backgroundColor: active ? c.bg : "#fafafa",
                    fontSize: "13px", fontWeight: active ? "700" : "500",
                    color: active ? c.color : "#666",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = c.color; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = "#e0e0e0"; }}
                >
                  {s}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pain Level card */}
        <div style={card({ padding: "20px", marginBottom: "16px" })}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#333" }}>Pain Level</div>
            <div style={{
              padding: "4px 12px", borderRadius: "20px",
              backgroundColor: goalPain >= 7 ? "#fff0f0" : goalPain >= 4 ? "#fff8e1" : "#f0faf0",
              color: goalPain >= 7 ? "#cc3333" : goalPain >= 4 ? "#f9a825" : "#2e7d32",
              border: `1px solid ${goalPain >= 7 ? "#ffc5c5" : goalPain >= 4 ? "#ffe082" : "#b8e6b8"}`,
              fontSize: "13px", fontWeight: "800",
            }}>
              {goalPain}/10
            </div>
          </div>

          {/* Slider */}
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <div style={{ height: "6px", backgroundColor: "#f0f0f0", borderRadius: "4px", position: "relative", overflow: "visible" }}>
              <div style={{ height: "100%", width: `${(goalPain / 10) * 100}%`, backgroundColor: goalPain >= 7 ? "#cc3333" : goalPain >= 4 ? "#f9a825" : "#2e7d32", borderRadius: "4px", transition: "all 0.2s" }} />
            </div>
            <input type="range" min={0} max={10} value={goalPain}
              onChange={e => setGoalPain(Number(e.target.value))}
              style={{ position: "absolute", top: "-5px", left: 0, width: "100%", opacity: 0, cursor: "pointer", height: "16px" }}
            />
            {/* Thumb visual */}
            <div style={{
              position: "absolute", top: "-5px",
              left: `calc(${(goalPain / 10) * 100}% - 8px)`,
              width: "16px", height: "16px", borderRadius: "50%",
              backgroundColor: goalPain >= 7 ? "#cc3333" : goalPain >= 4 ? "#f9a825" : "#2e7d32",
              border: "3px solid #fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              pointerEvents: "none",
            }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "11px", color: "#aaa" }}>No Pain</span>
            <span style={{ fontSize: "11px", color: "#aaa" }}>Severe</span>
          </div>
        </div>

        {/* Notes card */}
        <div style={card({ padding: "20px", marginBottom: "20px" })}>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#333", marginBottom: "12px" }}>Notes</div>
          <textarea
            value={goalNotes}
            onChange={e => setGoalNotes(e.target.value)}
            placeholder="Add notes about this goal..."
            rows={4}
            style={{
              width: "100%", padding: "10px 12px",
              border: "1.5px solid #e0e0e0", borderRadius: "8px",
              fontSize: "13px", color: "#333", outline: "none",
              resize: "vertical", boxSizing: "border-box", fontFamily: "inherit",
              backgroundColor: "#fafafa",
            }}
            onFocus={e => e.target.style.borderColor = "#e87722"}
            onBlur={e  => e.target.style.borderColor = "#e0e0e0"}
          />
        </div>

        {/* Save button */}
        <button onClick={saveGoal} style={{
          width: "100%", padding: "14px",
          backgroundColor: "#e87722", color: "#fff",
          border: "none", borderRadius: "10px",
          fontSize: "15px", fontWeight: "700", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          boxShadow: "0 3px 12px rgba(232,119,34,0.3)",
        }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#d06a18"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#e87722"}
        >
          <Check size={18} /> Save Changes
        </button>
      </div>
    );
  }

  return null;
}
