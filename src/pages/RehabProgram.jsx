// ============================================================
//  RehabProgram.jsx
//  Drop-in tab for the Cricket Admin Dashboard
//  Matches existing color theme (orange #e87722 accent)
//
//  Dependencies: React, Tailwind CSS, lucide-react
//
//  Usage:
//    import RehabProgram from "./RehabProgram";
//    <RehabProgram players={PLAYERS} />
//    — or omit players prop to use built-in demo data —
// ============================================================

import { useState, useRef } from "react";
import {
  Search, Filter, X, Plus, Minus, Save,
  ChevronRight, ChevronDown, ChevronUp,
  AlertTriangle, CheckCircle2, Activity,
  Download, Edit2, ArrowLeft, Heart,
  Video, Image as ImgIcon, Dumbbell, RotateCcw,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────
const DEMO_PLAYERS = [
  { id: 1, name: "Arjun Menon",    age: 23, injury: "—",               team: "Kerala CA",    status: "Available", category: "Senior"   },
  { id: 2, name: "Rahul Das",      age: 25, injury: "Shoulder Strain",  team: "Kerala CA",    status: "Injured",   category: "Senior"   },
  { id: 3, name: "Vivek Pillai",   age: 22, injury: "—",               team: "Kerala CA",    status: "Available", category: "Under-23" },
  { id: 4, name: "Sneha Krishnan", age: 22, injury: "—",               team: "Kerala Women", status: "Available", category: "Senior"   },
  { id: 5, name: "Priya Menon",    age: 19, injury: "—",               team: "Kerala Women", status: "Available", category: "Under-23" },
];

const EXERCISE_DB = [
  { id:1,  name:"Shoulder Circles",                        cat:"Mobility",    joint:"Shoulder",  muscle:"Deltoid",          equip:"None",    pos:"Standing",   emoji:"🔄", desc:"Stand tall and make large circular movements with your arms, forward then backward. Keep movements slow and controlled throughout." },
  { id:2,  name:"Shoulder Circles in Four Point Kneeling", cat:"Mobility",    joint:"Shoulder",  muscle:"Rotator Cuff",      equip:"None",    pos:"Kneeling",   emoji:"🔄", desc:"Start in four point kneeling. Lift one hand just off the ground and move your arm in clockwise then anticlockwise circles. Keep arm straight." },
  { id:3,  name:"Scapular Stabilization",                  cat:"Strength",    joint:"Shoulder",  muscle:"Trapezius",         equip:"Band",    pos:"Standing",   emoji:"💪", desc:"Stand with a resistance band anchored at waist height. Keep shoulder blade retracted as you abduct your arm to 90 degrees." },
  { id:4,  name:"Combined AROM Shoulder Pendulums",        cat:"Mobility",    joint:"Shoulder",  muscle:"Deltoid",          equip:"None",    pos:"Standing",   emoji:"🔄", desc:"Lean forward and let your arm hang freely. Use body momentum to swing the arm in small circles, gradually increasing the range." },
  { id:5,  name:"Shoulder Horizontal Abduction",           cat:"Strength",    joint:"Shoulder",  muscle:"Posterior Deltoid", equip:"Band",    pos:"Standing",   emoji:"💪", desc:"With arms at shoulder height and a resistance band, pull arms apart horizontally squeezing shoulder blades together." },
  { id:6,  name:"Shoulder Taps",                           cat:"Stability",   joint:"Shoulder",  muscle:"Core",             equip:"None",    pos:"Prone",      emoji:"⚖️", desc:"In a high plank, alternate tapping each shoulder with the opposite hand while keeping hips completely still." },
  { id:7,  name:"Single Leg Bridge",                       cat:"Strength",    joint:"Hip",       muscle:"Glutes",           equip:"None",    pos:"Supine",     emoji:"💪", desc:"Lie on your back with knees bent. Extend one leg and raise hips off the floor. Hold briefly then lower with control." },
  { id:8,  name:"Clam with Exercise Band",                 cat:"Strength",    joint:"Hip",       muscle:"Gluteus Medius",   equip:"Band",    pos:"Side-lying", emoji:"💪", desc:"Lie on side with band around thighs. Keep feet together and open the top knee like a clamshell against the resistance." },
  { id:9,  name:"Knee Extension in Sitting",               cat:"Strength",    joint:"Knee",      muscle:"Quadriceps",       equip:"Band",    pos:"Sitting",    emoji:"💪", desc:"Sit on a chair with a resistance band around your ankle. Straighten your leg, hold briefly, then lower slowly." },
  { id:10, name:"Calf Raise",                              cat:"Strength",    joint:"Ankle",     muscle:"Gastrocnemius",    equip:"None",    pos:"Standing",   emoji:"💪", desc:"Stand feet hip-width apart. Rise slowly onto toes then lower with full control. Use a wall for balance if needed." },
  { id:11, name:"Child's Pose",                            cat:"Flexibility", joint:"Spine",     muscle:"Latissimus Dorsi", equip:"None",    pos:"Kneeling",   emoji:"🧘", desc:"Sit back on your heels and extend arms forward along the floor. Hold this relaxed stretch breathing deeply." },
  { id:12, name:"AROM Hip Abduction in Side Lying",        cat:"Mobility",    joint:"Hip",       muscle:"Gluteus Medius",   equip:"None",    pos:"Side-lying", emoji:"🔄", desc:"Lie on side with legs straight. Lift top leg to about 45 degrees then lower slowly. Maintain neutral pelvis throughout." },
  { id:13, name:"Hamstring Stretch Supine",                cat:"Flexibility", joint:"Knee",      muscle:"Hamstrings",       equip:"None",    pos:"Supine",     emoji:"🧘", desc:"Lie on back and lift one leg, holding behind the thigh. Gently straighten the knee until you feel the stretch." },
  { id:14, name:"Bike Ergometer",                          cat:"Cardio",      joint:"Full Body", muscle:"Full Body",        equip:"Machine", pos:"Sitting",    emoji:"🚴", desc:"Set the bike to appropriate resistance. Maintain a steady cadence focusing on smooth circular pedal strokes." },
  { id:15, name:"Percussion Gun Shoulder",                 cat:"Recovery",    joint:"Shoulder",  muscle:"All",             equip:"Device",  pos:"Sitting",    emoji:"💆", desc:"Apply a percussion massager to the shoulder girdle muscles to promote blood flow and reduce muscle tension." },
];

const CATS   = ["All","Mobility","Strength","Stability","Flexibility","Cardio","Recovery"];
const JOINTS = ["All","Shoulder","Hip","Knee","Ankle","Spine","Full Body"];
const MUSCS  = ["All","Deltoid","Rotator Cuff","Trapezius","Gluteus Medius","Glutes","Quadriceps","Hamstrings","Core","Gastrocnemius","Latissimus Dorsi","Posterior Deltoid"];

// ─────────────────────────────────────────────────────────────
// SHARED HELPERS
// ─────────────────────────────────────────────────────────────
const initials = n => n.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();

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

const STATUS_COLORS = {
  Available: { bg: "#f0faf0", color: "#2e7d32", border: "#b8e6b8" },
  Injured:   { bg: "#fff0f0", color: "#cc3333", border: "#ffc5c5" },
  Resting:   { bg: "#fff8e1", color: "#f9a825", border: "#ffe082" },
};

const CAT_COLORS = {
  "Senior":   { bg: "#fff3e8", color: "#e87722", border: "#ffd8b0" },
  "Under-23": { bg: "#e3f2fd", color: "#1976d2", border: "#90caf9" },
  "Under-19": { bg: "#f3e5f5", color: "#7b1fa2", border: "#ce93d8" },
  "Under-16": { bg: "#f0faf0", color: "#2e7d32", border: "#b8e6b8" },
  "Under-14": { bg: "#fce4ec", color: "#c2185b", border: "#f48fb1" },
  "Under-10": { bg: "#ffebee", color: "#d32f2f", border: "#ef9a9a" },
};

const Toggle = ({ val, set }) => (
  <button
    onClick={() => set(v => !v)}
    className={`relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none ${val ? "bg-green-500" : "bg-gray-300"}`}
  >
    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${val ? "left-5" : "left-1"}`} />
  </button>
);

// ─────────────────────────────────────────────────────────────
// WORKOUT LIBRARY
// ─────────────────────────────────────────────────────────────
function WorkoutLibrary({ added, onAdd, onRemove, onCardClick, selectedId }) {
  const [search, setSearch]       = useState("");
  const [showFil, setShowFil]     = useState(false);
  const [fil, setFil]             = useState({ cat:"All", joint:"All", muscle:"All" });

  const activeCount = Object.values(fil).filter(v => v !== "All").length;
  const isAdded = id => added.some(a => a.id === id);

  const visible = EXERCISE_DB.filter(e => {
    const q = search.toLowerCase();
    return (
      (!q || e.name.toLowerCase().includes(q) || e.cat.toLowerCase().includes(q)) &&
      (fil.cat    === "All" || e.cat    === fil.cat) &&
      (fil.joint  === "All" || e.joint  === fil.joint) &&
      (fil.muscle === "All" || e.muscle === fil.muscle)
    );
  });

  return (
    <div style={{ display: "flex", height: "100%" }}>

      {/* LEFT */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, borderRight: "1px solid #f0f0f0", overflow: "hidden" }}>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "150px" }}>
            <Search size={13} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search exercises…"
              style={{ width: "100%", paddingLeft: "32px", paddingRight: "12px", paddingTop: "8px", paddingBottom: "8px", fontSize: "13px", border: "1px solid #e0e0e0", borderRadius: "6px", backgroundColor: "#f9f9f9", outline: "none" }}
              onFocus={e => (e.target.style.borderColor = "#e87722")}
              onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
            />
          </div>
          <button
            onClick={() => setShowFil(v => !v)}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", borderRadius: "6px", border: `1px solid ${showFil ? "#e87722" : "#e0e0e0"}`, backgroundColor: showFil ? "#fff3e8" : "#fff", color: showFil ? "#e87722" : "#666", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#e87722"; e.currentTarget.style.backgroundColor = "#fff3e8"; e.currentTarget.style.color = "#e87722"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = showFil ? "#e87722" : "#e0e0e0"; e.currentTarget.style.backgroundColor = showFil ? "#fff3e8" : "#fff"; e.currentTarget.style.color = showFil ? "#e87722" : "#666"; }}
          >
            <Filter size={12} /> Filters
            {activeCount > 0 && <span style={{ marginLeft: "6px", padding: "3px 8px", fontSize: "10px", fontWeight: "700", borderRadius: "12px", backgroundColor: "#e87722", color: "#fff" }}>{activeCount}</span>}
          </button>
        </div>

        {/* Filter drawer */}
        {showFil && (
          <div style={{ padding: "12px 16px", backgroundColor: "#fff3e8", borderBottom: "1px solid #ffe0b2", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-end" }}>
            {[["Category","cat",CATS],["Joint / Area","joint",JOINTS],["Muscle","muscle",MUSCS]].map(([lbl,key,opts]) => (
              <div key={key}>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{lbl}</p>
                <select
                  value={fil[key]} onChange={e => setFil(f => ({...f,[key]:e.target.value}))}
                  style={{ fontSize: "13px", border: "1px solid #e0e0e0", borderRadius: "6px", padding: "6px 8px", backgroundColor: "#fff", outline: "none", cursor: "pointer" }}
                  onFocus={e => (e.target.style.borderColor = "#e87722")}
                  onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
                >
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <button
              onClick={() => setFil({cat:"All",joint:"All",muscle:"All"})}
              style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: "600", color: "#cc3333", border: "1px solid #ffc5c5", backgroundColor: "#fff0f0", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#ffe0e0")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fff0f0")}
            >
              <RotateCcw size={11} /> Clear
            </button>
          </div>
        )}

        {/* Exercise grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))", gap: "10px", alignContent: "start" }}>
          {visible.map(ex => {
            const active = selectedId === ex.id;
            return (
              <div
                key={ex.id}
                onClick={() => onCardClick(ex)}
                style={{
                  borderRadius: "10px", border: `2px solid ${active ? "#e87722" : "#e8e8e8"}`, overflow: "hidden", cursor: "pointer", backgroundColor: active ? "#fff3e8" : "#fff", transition: "all 0.15s", boxShadow: active ? "0 0 0 3px rgba(232,119,34,0.12)" : "0 1px 4px rgba(0,0,0,0.05)"
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "#ffd8b0"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "#e8e8e8"; } }}
              >
                <div style={{ height: "80px", background: "linear-gradient(to bottom right, #f5f5f5, #e0e0e0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", userSelect: "none" }}>{ex.emoji}</div>
                <div style={{ padding: "10px" }}>
                  <p style={{ fontSize: "12px", fontWeight: "700", color: "#222", lineHeight: "1.3", marginBottom: "8px" }}>{ex.name}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "10px", fontWeight: "600", backgroundColor: "#f5f5f5", color: "#888", borderRadius: "4px", padding: "3px 8px" }}>{ex.cat}</span>
                    <button
                      onClick={e => { e.stopPropagation(); isAdded(ex.id) ? onRemove(ex.id) : onAdd(ex); }}
                      style={{ width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", backgroundColor: isAdded(ex.id) ? "#cc3333" : "#e87722", border: "none", cursor: "pointer", transition: "background-color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = isAdded(ex.id) ? "#bb2222" : "#d06a18")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = isAdded(ex.id) ? "#cc3333" : "#e87722")}
                    >
                      {isAdded(ex.id) ? <Minus size={10}/> : <Plus size={10}/>}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {visible.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", paddingTop: "40px", paddingBottom: "40px", color: "#ccc" }}>
              <Search size={26} style={{ margin: "0 auto 8px", display: "block", opacity: 0.3 }} />
              <p style={{ fontSize: "13px" }}>No exercises match</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: added panel */}
      <div style={{ width: "208px", display: "flex", flexDirection: "column", backgroundColor: "#f9f9f9", flexShrink: 0 }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>Added</span>
          <Badge label={String(added.length)} bg="#fff3e8" color="#e87722" border="#ffd8b0" />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {added.length === 0 && (
            <div style={{ textAlign: "center", paddingTop: "32px", paddingBottom: "32px", color: "#ccc" }}>
              <Dumbbell size={22} style={{ margin: "0 auto 8px", display: "block", opacity: 0.25 }} />
              <p style={{ fontSize: "12px" }}>Click + to add exercises</p>
            </div>
          )}
          {added.map(ex => (
            <div key={ex.id} style={{ ...card({ padding: "10px" }), display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "4px" }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "12px", fontWeight: "700", color: "#222", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ex.name}</p>
                <p style={{ fontSize: "10px", color: "#aaa", marginTop: "4px" }}>{ex.sets}×{ex.reps} · {ex.rest}s</p>
              </div>
              <button onClick={() => onRemove(ex.id)} style={{ color: "#ddd", cursor: "pointer", border: "none", backgroundColor: "transparent", padding: "0", flexShrink: 0, marginTop: "2px", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#cc3333")}
                onMouseLeave={e => (e.currentTarget.style.color = "#ddd")}
              >
                <X size={12}/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// EXERCISE DETAIL MODAL
// ─────────────────────────────────────────────────────────────
function ExerciseModal({ exercise, existing, onSave, onClose }) {
  const [sets,  setSets]  = useState(existing?.sets  ?? 3);
  const [reps,  setReps]  = useState(existing?.reps  ?? 10);
  const [rest,  setRest]  = useState(existing?.rest  ?? 60);
  const [notes, setNotes] = useState(existing?.notes ?? "");
  if (!exercise) return null;

  const Spin = ({ label, val, set, min=1, max=99 }) => (
    <div>
      <p style={{ fontSize: "12px", fontWeight: "700", color: "#888", marginBottom: "8px" }}>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onClick={() => set(v => Math.max(min,v-1))} style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", cursor: "pointer" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fff")}
        ><Minus size={11}/></button>
        <input type="number" value={val} onChange={e => set(Number(e.target.value))}
          style={{ width: "56px", textAlign: "center", fontSize: "13px", fontWeight: "700", color: "#222", border: "1px solid #e0e0e0", borderRadius: "6px", padding: "8px 0", outline: "none" }}
          onFocus={e => (e.target.style.borderColor = "#e87722")}
          onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
        />
        <button onClick={() => set(v => Math.min(max,v+1))} style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", cursor: "pointer" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fff")}
        ><Plus size={11}/></button>
      </div>
    </div>
  );

  const OBtn = ({ children, onClick }) => (
    <button onClick={onClick}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flex: 1, padding: "10px 16px", backgroundColor: "#e87722", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#d06a18")}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#e87722")}
    >
      {children}
    </button>
  );

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }} onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ backgroundColor: "#fff", borderRadius: "12px", width: "100%", maxWidth: "700px", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 25px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "24px 24px 0" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#222", paddingRight: "32px", lineHeight: 1.3 }}>{exercise.name}</h2>
          <button onClick={onClose} style={{ color: "#aaa", backgroundColor: "transparent", border: "none", cursor: "pointer", padding: "0", fontSize: "20px" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#666")}
            onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}
          ><X size={20}/></button>
        </div>
        <div style={{ display: "flex", gap: "24px", padding: "24px" }}>
          {/* Left */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "6px", border: "1px solid #e87722", backgroundColor: "#fff3e8", color: "#e87722", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}><Video size={11}/> Video</button>
              <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "6px", border: "1px solid #e0e0e0", backgroundColor: "#fff", color: "#888", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fff")}
              ><ImgIcon size={11}/> Images</button>
              <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "6px", border: "1px solid #e0e0e0", backgroundColor: "#fff", color: "#aaa", fontSize: "12px", fontWeight: "600", cursor: "pointer", marginLeft: "auto" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#cc3333"; e.currentTarget.style.borderColor = "#ffc5c5"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.borderColor = "#e0e0e0"; }}
              ><Heart size={11}/> Favourite</button>
            </div>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, marginBottom: "16px" }}>{exercise.desc}</p>
            <div style={{ borderRadius: "10px", background: "linear-gradient(to bottom right, #f5f5f5, #e0e0e0)", height: "176px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#e87722", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#d06a18")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#e87722")}
              >
                <Video size={18} style={{ color: "#fff", marginLeft: "2px" }}/>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[exercise.cat,exercise.joint,exercise.muscle,exercise.equip].map(t => (
                <Badge key={t} label={t} bg="#fff3e8" color="#e87722" border="#ffd8b0" />
              ))}
            </div>
          </div>
          {/* Right */}
          <div style={{ width: "208px", flexShrink: 0 }}>
            <h3 style={{ fontSize: "13px", fontWeight: "700", color: "#222", marginBottom: "16px" }}>Edit exercise</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Spin label="Sets" val={sets} set={setSets} min={1} max={10}/>
              <Spin label="Reps" val={reps} set={setReps} min={1} max={50}/>
              <div>
                <p style={{ fontSize: "12px", fontWeight: "700", color: "#888", marginBottom: "8px" }}>Rest duration</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button onClick={() => setRest(v => Math.max(0,v-10))} style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fff")}
                  ><Minus size={11}/></button>
                  <input type="number" value={rest} onChange={e => setRest(Number(e.target.value))}
                    style={{ width: "56px", textAlign: "center", fontSize: "13px", fontWeight: "700", color: "#222", border: "1px solid #e0e0e0", borderRadius: "6px", padding: "8px 0", outline: "none" }}
                    onFocus={e => (e.target.style.borderColor = "#e87722")}
                    onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
                  />
                  <span style={{ fontSize: "12px", color: "#aaa" }}>sec</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize: "12px", fontWeight: "700", color: "#888", marginBottom: "8px" }}>Notes (optional)</p>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                  placeholder="Add additional notes…"
                  style={{ width: "100%", fontSize: "12px", border: "1.5px solid #e0e0e0", borderRadius: "8px", padding: "10px 12px", outline: "none", resize: "vertical", fontFamily: "inherit", backgroundColor: "#f9f9f9" }}
                  onFocus={e => (e.target.style.borderColor = "#e87722")}
                  onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <OBtn onClick={() => onSave({...exercise,sets,reps,rest,notes})}><Save size={13}/> Save</OBtn>
              <button onClick={onClose} style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #e0e0e0", backgroundColor: "#fff", color: "#888", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fff")}
              >Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ASSIGN MODAL
// ─────────────────────────────────────────────────────────────
function AssignModal({ player, programName, onConfirm, onClose }) {
  const todayStr = new Date().toISOString().split("T")[0];
  const [startDate, setStart]    = useState(todayStr);
  const [endDate,   setEnd]      = useState("");
  const [freq,      setFreq]     = useState("specific");
  const [days,      setDays]     = useState(["Mon","Wed","Fri"]);
  const [pain,      setPain]     = useState(true);
  const [rpe,       setRpe]      = useState(true);
  const [notif,     setNotif]    = useState(true);
  const [recording, setRec]      = useState("Optional");

  const toggleDay = d => setDays(ds => ds.includes(d) ? ds.filter(x => x!==d) : [...ds,d]);
  const qDate = offset => { const d=new Date(); d.setDate(d.getDate()+offset); return d.toISOString().split("T")[0]; };
  const Head  = ({c}) => <h3 className="text-sm font-bold text-gray-800 pb-2 mb-3 border-b border-gray-100">{c}</h3>;

  return (
    <div className="fixed inset-0 bg-black/45 z-[1100] flex items-center justify-center p-4" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-[440px] max-h-[88vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Assign to {player.name}</p>
            <h2 className="text-base font-bold text-gray-900">{programName || "Rehab Program"}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
        </div>
        <div className="px-6 py-4 space-y-5">

          {/* Start date */}
          <div>
            <Head c="Start Date"/>
            <div className="flex flex-wrap gap-2 mb-3">
              {[["Today",0],["Tomorrow",1],["+1 Week",7]].map(([lbl,off]) => {
                const d = qDate(off);
                return (
                  <button key={lbl} onClick={() => setStart(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${startDate===d ? "bg-[#e87722] text-white border-[#e87722]" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}>
                    {lbl}
                  </button>
                );
              })}
            </div>
            <input type="date" value={startDate} onChange={e => setStart(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e87722]"/>
          </div>

          {/* End date */}
          <div>
            <Head c="End Date"/>
            <input type="date" value={endDate} onChange={e => setEnd(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e87722]"/>
          </div>

          {/* Frequency */}
          <div>
            <Head c="Program Frequency"/>
            <p className="text-xs text-gray-400 mb-2">How often should they perform this program?</p>
            <select value={freq} onChange={e => setFreq(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 mb-3 w-full focus:outline-none focus:border-[#e87722] cursor-pointer">
              <option value="specific">On specific days</option>
              <option value="daily">Every day</option>
              <option value="alternate">Alternate days</option>
            </select>
            {freq==="specific" && (
              <div className="flex gap-1.5 flex-wrap">
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                  <button key={d} onClick={() => toggleDay(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${days.includes(d) ? "bg-[#e87722] text-white border-[#e87722]" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}>
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Program options */}
          <div>
            <Head c="Program Options"/>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Client recording setting</p>
                <select value={recording} onChange={e => setRec(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#e87722] cursor-pointer">
                  <option>Optional</option><option>Required</option><option>Disabled</option>
                </select>
              </div>
              {[["Pain reporting",pain,setPain],["RPE reporting",rpe,setRpe],["Notifications enabled",notif,setNotif]].map(([lbl,val,set]) => (
                <div key={lbl} className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">{lbl}</p>
                  <Toggle val={val} set={set}/>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onConfirm({startDate,endDate,freq,days,pain,rpe,notif,recording})}
            className="w-full bg-[#e87722] hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            <CheckCircle2 size={15}/> Assign to Profile
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CREATE PROGRAM MODAL
// ─────────────────────────────────────────────────────────────
function CreateProgramModal({ player, onClose, onCreated }) {
  const [tab,       setTab]      = useState("workout");
  const [progName,  setProgName] = useState("");
  const [progNote,  setProgNote] = useState("");
  const [exercises, setExercises]= useState([]);
  const [selEx,     setSelEx]    = useState(null);
  const [exModal,   setExModal]  = useState(false);
  const [goals,     setGoals]    = useState("");
  const [assignOpen,setAssignOpen]=useState(false);

  const handleAdd    = ex  => { if (!exercises.some(e => e.id===ex.id)) setExercises(p=>[...p,{...ex,sets:3,reps:10,rest:60,notes:""}]); };
  const handleRemove = id  => setExercises(p => p.filter(e => e.id!==id));
  const handleClick  = ex  => { setSelEx(ex); setExModal(true); };
  const handleSave   = upd => {
    setExercises(p => p.some(e=>e.id===upd.id) ? p.map(e=>e.id===upd.id?upd:e) : [...p,upd]);
    setExModal(false);
  };

  const TABS = [
    {key:"weekly",  label:"⊙ Weekly Goals"},
    {key:"workout", label:"🔗 Workout Program"},
    {key:"quick",   label:"⊙ Quick Exercises"},
  ];

  return (
    <div className="fixed inset-0 bg-black/40 z-[900] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[940px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Creating program for</p>
            <h2 className="text-lg font-bold text-gray-900">{player.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exercises.length ? setAssignOpen(true) : alert("Add at least one exercise first")}
              className="flex items-center gap-1.5 bg-[#e87722] hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
              <CheckCircle2 size={13}/> Assign to Profile
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-2">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${tab===t.key ? "border-[#e87722] text-[#e87722]" : "border-transparent text-gray-400 hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {tab==="weekly" && (
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-3">Set weekly rehabilitation goals for <strong>{player.name}</strong>.</p>
              <textarea value={goals} onChange={e => setGoals(e.target.value)} rows={5}
                placeholder="e.g. Improve shoulder range of motion by 20°, reduce pain during overhead activities…"
                className="w-full text-sm border border-gray-200 rounded-xl p-3 resize-y focus:outline-none focus:border-[#e87722] placeholder-gray-300"/>
            </div>
          )}
          {tab==="workout" && (
            <>
              <div className="flex gap-3 px-4 py-3 border-b border-gray-100 flex-shrink-0">
                <input value={progName} onChange={e => setProgName(e.target.value)}
                  placeholder="Program name (e.g. Shoulder Rehab Phase 1)"
                  className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#e87722] placeholder-gray-300"/>
                <input value={progNote} onChange={e => setProgNote(e.target.value)}
                  placeholder="Program notes (e.g. Light mobility only)"
                  className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#e87722] placeholder-gray-300"/>
              </div>
              <div className="flex-1 overflow-hidden">
                <WorkoutLibrary added={exercises} onAdd={handleAdd} onRemove={handleRemove} onCardClick={handleClick} selectedId={selEx?.id}/>
              </div>
            </>
          )}
          {tab==="quick" && (
            <div className="p-6 text-sm text-gray-400">Quick exercises can be prescribed without a full program. Use the Workout Program tab to build a structured plan.</div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-3 border-t border-gray-100">
          <button onClick={onClose} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            <ArrowLeft size={13}/> Cancel
          </button>
          <button
            onClick={() => exercises.length ? setAssignOpen(true) : alert("Add at least one exercise to the workout")}
            className="flex items-center gap-1.5 bg-[#e87722] hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors">
            <Save size={13}/> Save Session
          </button>
        </div>
      </div>

      {exModal && selEx && (
        <ExerciseModal exercise={selEx} existing={exercises.find(e=>e.id===selEx.id)} onSave={handleSave} onClose={() => setExModal(false)}/>
      )}

      {assignOpen && (
        <AssignModal
          player={player}
          programName={progName}
          onConfirm={assignment => {
            onCreated({name:progName||"Rehab Program",notes:progNote,exercises,goals}, assignment);
            setAssignOpen(false);
          }}
          onClose={() => setAssignOpen(false)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROGRAM REPORT
// ─────────────────────────────────────────────────────────────
function ProgramReport({ player, program, assignment, onBack }) {
  const printRef = useRef();

  const handleDownload = () => {
    const win = window.open("","_blank");
    win.document.write(`<!DOCTYPE html><html><head><title>${program.name}</title>
    <style>*{box-sizing:border-box}body{font-family:sans-serif;padding:36px;color:#222;background:#fff;margin:0}
    h1{font-size:22px;font-weight:800;margin:0 0 4px}.sub{font-size:13px;color:#888;margin:0 0 24px}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:22px}
    .meta{padding:12px 14px;border:1px solid #e8e8e8;border-radius:8px}
    .meta label{font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:3px}
    .meta span{font-size:13px;font-weight:700}
    table{width:100%;border-collapse:collapse;font-size:13px}
    th{background:#fafafa;padding:10px 12px;text-align:left;font-weight:700;border-bottom:2px solid #e8e8e8;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.4px}
    td{padding:10px 12px;border-bottom:1px solid #f5f5f5}
    .badge{display:inline-block;padding:2px 9px;border-radius:20px;font-size:10px;font-weight:700;background:#fff3e8;color:#e87722;border:1px solid #ffd8b0}
    .footer{margin-top:18px;font-size:11px;color:#aaa}</style>
    </head><body>${printRef.current.innerHTML}</body></html>`);
    win.document.close(); win.print();
  };

  const daysStr = assignment.freq==="specific" ? assignment.days.join(", ") : assignment.freq==="daily" ? "Every day" : "Alternate days";

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            <ArrowLeft size={13}/> Back
          </button>
          <h2 className="text-xl font-bold text-gray-900">{program.name}</h2>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            <Edit2 size={12}/> Edit
          </button>
          <button onClick={handleDownload}
            className="flex items-center gap-1.5 bg-[#e87722] hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
            <Download size={13}/> Download PDF
          </button>
        </div>
      </div>

      {/* Printable area */}
      <div ref={printRef}>
        <h1 style={{fontSize:22,fontWeight:800,margin:"0 0 4px"}}>{program.name}</h1>
        <p className="sub" style={{fontSize:13,color:"#888",margin:"0 0 22px"}}>
          Assigned to: <strong>{player.name}</strong> · {player.injury!=="—" ? player.injury : player.team}
        </p>

        {/* Meta grid */}
        <div className="grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:22}}>
          {[
            ["Start Date",       assignment.startDate],
            ["End Date",         assignment.endDate||"Open-ended"],
            ["Frequency",        daysStr],
            ["Recording",        assignment.recording],
            ["Pain Reporting",   assignment.pain  ?"Yes":"No"],
            ["RPE Reporting",    assignment.rpe   ?"Yes (0–10)":"No"],
            ["Notifications",    assignment.notif ?"Yes":"No"],
            ["Total Exercises",  program.exercises.length],
            ["Team",             player.team],
          ].map(([lbl,val]) => (
            <div key={lbl} className="meta" style={{padding:"12px 14px",border:"1px solid #e8e8e8",borderRadius:8}}>
              <label style={{fontSize:10,color:"#aaa",textTransform:"uppercase",letterSpacing:".5px",display:"block",marginBottom:3}}>{lbl}</label>
              <span style={{fontSize:13,fontWeight:700}}>{val}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr style={{background:"#fafafa"}}>
                {["#","Exercise","Category","Sets","Reps","Rest","Notes"].map(h => (
                  <th key={h} style={{padding:"10px 12px",textAlign:"left",fontWeight:700,borderBottom:"2px solid #e8e8e8",fontSize:11,color:"#888",textTransform:"uppercase",letterSpacing:".4px"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {program.exercises.map((ex,i) => (
                <tr key={ex.id} style={{background:i%2===0?"#fff":"#fafafa"}}>
                  <td style={{padding:"10px 12px",color:"#aaa",fontSize:11}}>{i+1}</td>
                  <td style={{padding:"10px 12px",fontWeight:700}}>{ex.name}</td>
                  <td style={{padding:"10px 12px"}}>
                    <span style={{display:"inline-block",padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700,background:"#fff3e8",color:"#e87722",border:"1px solid #ffd8b0"}}>{ex.cat}</span>
                  </td>
                  <td style={{padding:"10px 12px",fontWeight:800,color:"#e87722"}}>{ex.sets}</td>
                  <td style={{padding:"10px 12px",fontWeight:700}}>{ex.reps}</td>
                  <td style={{padding:"10px 12px",color:"#666"}}>{ex.rest}s</td>
                  <td style={{padding:"10px 12px",color:"#aaa",fontSize:12}}>{ex.notes||"—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{marginTop:16,fontSize:11,color:"#aaa"}}>Generated by Palaestra Performance &amp; Rehab · {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export default function RehabProgram({ players: propPlayers }) {
  const players = propPlayers || DEMO_PLAYERS;

  const [expanded,     setExpanded]     = useState(null);
  const [creating,     setCreating]     = useState(false);
  const [activePlayer, setActivePlayer] = useState(null);
  const [programs,     setPrograms]     = useState({});
  const [viewing,      setViewing]      = useState(null);

  const handleCreated = (program, assignment) => {
    setPrograms(prev => ({...prev, [activePlayer.id]: [...(prev[activePlayer.id]||[]), {program,assignment}]}));
    setCreating(false);
  };

  const openCreate = (player, e) => { e.stopPropagation(); setActivePlayer(player); setCreating(true); };

  if (viewing) {
    return (
      <div className="min-h-screen bg-[#f4f4f4] p-7">
        <ProgramReport {...viewing} onBack={() => setViewing(null)}/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="max-w-[1200px] mx-auto px-7 py-7">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-[22px] font-extrabold text-gray-900 m-0">Rehab Programs</h1>
          <p className="text-sm text-gray-400 mt-1">Assign and manage rehabilitation programs for each player.</p>
          <div className="w-8 h-[3px] bg-[#e87722] rounded-full mt-1.5"/>
        </div>

        {/* Session card */}
        <div className="bg-white rounded-[10px] border border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,.05)] overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <Activity size={15} className="text-[#e87722]"/>
            <span className="text-sm font-bold text-gray-700">Session Action — Weekly Goals &amp; Programs</span>
          </div>

          {players.map(player => {
            const pp      = programs[player.id] || [];
            const isOpen  = expanded === player.id;
            const stColor = STATUS_COLORS[player.status] || STATUS_COLORS.Available;
            const catColor = CAT_COLORS[player.category] || CAT_COLORS.Senior;

            return (
              <div key={player.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                {/* Row */}
                <div
                  onClick={() => setExpanded(isOpen ? null : player.id)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", cursor: "pointer", backgroundColor: isOpen ? "#fff3e8" : "#fff", transition: "background-color 0.15s" }}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.backgroundColor = "#f9f9f9"; }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.backgroundColor = "#fff"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", flexShrink: 0, border: "1.5px solid", backgroundColor: isOpen ? "#e87722" : (player.status === "Injured" ? "#fff0f0" : "#fff3e8"), color: isOpen ? "#fff" : (player.status === "Injured" ? "#cc3333" : "#e87722"), borderColor: isOpen ? "#e87722" : (player.status === "Injured" ? "#ffc5c5" : "#ffd8b0")
                    }}>
                      {initials(player.name)}
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: "700", color: "#222" }}>{player.name}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px", flexWrap: "wrap" }}>
                        <Badge label={player.category} bg={catColor.bg} color={catColor.color} border={catColor.border} />
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: stColor.border }}/>
                          <span style={{ fontSize: "10px", fontWeight: "700", color: stColor.color }}>{player.status}</span>
                        </div>
                        {player.injury && player.injury!=="—" && (
                          <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", fontWeight: "600", color: "#cc3333" }}>
                            <AlertTriangle size={9}/> {player.injury}
                          </span>
                        )}
                        <span style={{ fontSize: "10px", color: "#aaa" }}>{player.team}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {pp.length>0 && (
                      <Badge label={`${pp.length} program${pp.length>1?"s":""}`} bg="#f0faf0" color="#2e7d32" border="#b8e6b8" />
                    )}
                    {isOpen ? <ChevronUp size={16} style={{ color: "#e87722" }}/> : <ChevronRight size={16} style={{ color: "#aaa" }}/>}
                  </div>
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid #ffe0b2", backgroundColor: "#fffbf7", padding: "0 20px 16px" }}>
                    <div style={{ paddingLeft: "52px", paddingTop: "12px" }}>
                      {pp.length===0 && <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "12px" }}>No programs assigned yet.</p>}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                        {pp.map((item,i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", ...card({ padding: "12px 16px" }) }}>
                            <div>
                              <p style={{ fontSize: "13px", fontWeight: "700", color: "#222" }}>{item.program.name}</p>
                              <p style={{ fontSize: "11px", color: "#aaa", marginTop: "4px" }}>
                                {item.program.exercises.length} exercise{item.program.exercises.length!==1?"s":""} · Start {item.assignment.startDate} · {item.assignment.freq==="specific" ? item.assignment.days.join(", ") : item.assignment.freq}
                              </p>
                            </div>
                            <button
                              onClick={() => setViewing({player,program:item.program,assignment:item.assignment})}
                              style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "700", color: "#2e7d32", backgroundColor: "#f0faf0", border: "1px solid #b8e6b8", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}
                              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e8f5e9")}
                              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#f0faf0")}
                            >
                              <CheckCircle2 size={11}/> View Report
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={e => openCreate(player,e)}
                        style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#e87722", color: "#fff", fontSize: "12px", fontWeight: "700", padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer" }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#d06a18")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#e87722")}
                      >
                        <Plus size={12}/> Create Program
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {creating && activePlayer && (
        <CreateProgramModal player={activePlayer} onClose={() => setCreating(false)} onCreated={handleCreated}/>
      )}
    </div>
  );
}
