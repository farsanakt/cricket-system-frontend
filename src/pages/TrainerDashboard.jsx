import { useState } from "react";
import {
  ChevronRight, ChevronLeft, ArrowLeft, CheckCircle2,
  Circle, TrendingUp, Target, Users, Calendar,
  Activity, Award, AlertCircle, Edit2,
  BarChart2, Plus, Trash2, Clock, Repeat, Dumbbell,
  FileText, Eye, Check,
} from "lucide-react";

// ─── EXERCISE LIBRARY ─────────────────────────────────────────────────────────
const EXERCISE_LIBRARY = [
  {
    id:"e1", name:"Core Activation in Side Lying", category:"Core",
    defaultReps:"30 seconds", defaultRest:"60 seconds", defaultSets:3, equipment:"",
    howTo:[
      "Lie on your side with your body in a straight line, knees slightly bent.",
      "Keeping the rest of your body still, engage your core as prescribed.",
      "Maintain the hold for the prescribed time and then relax to complete the exercise.",
      "Remember to maintain your breathing throughout the exercise.",
    ],
    images:[
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=340&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=340&fit=crop",
    ],
  },
  {
    id:"e2", name:"Crunch with an Exercise Band", category:"Core",
    defaultReps:"10 reps", defaultRest:"60 seconds", defaultSets:3, equipment:"Yellow exercise band",
    howTo:[
      "The exercise band should be fixed to an object above your head.",
      "Keeping your arms in the same position, curl your head and shoulders off the ground.",
      "Then lower your body down to complete the exercise.",
      "Remember to keep your lower back flat throughout the exercise.",
    ],
    images:[
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=340&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=340&fit=crop",
    ],
  },
  {
    id:"e3", name:"Dead Bug", category:"Core",
    defaultReps:"10 reps", defaultRest:"60 seconds", defaultSets:3, equipment:"",
    howTo:[
      "Bend your hips and knees to raise your legs into the air, then lift your arms up so fingers point to the ceiling.",
      "Keeping your torso on the ground, lower one arm and your opposite leg to the ground.",
      "Lift them back up and repeat on the opposite side to complete the exercise.",
      "Remember to avoid arching your back throughout the exercise.",
    ],
    images:[
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&h=340&fit=crop",
      "https://images.unsplash.com/photo-1578763363228-6e8428de69b2?w=500&h=340&fit=crop",
    ],
  },
  {
    id:"e4", name:"Hanging Straight Leg Raise", category:"Core",
    defaultReps:"10 reps", defaultRest:"60 seconds", defaultSets:3, equipment:"Pull-up bar",
    howTo:[
      "Hang from a pull-up bar with both hands, arms fully extended.",
      "Keeping your legs straight, raise your feet up in front of you.",
      "Then lower your legs down to complete the exercise.",
      "Remember to maintain your breathing throughout the exercise.",
    ],
    images:[
      "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=500&h=340&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&h=340&fit=crop",
    ],
  },
  {
    id:"e5", name:"Oblique Crunch in Side Lying", category:"Core",
    defaultReps:"10 reps", defaultRest:"60 seconds", defaultSets:3, equipment:"",
    howTo:[
      "Lie on your side with your bottom arm extended and top arm behind your head.",
      "Keeping your lower body still, lift your head and shoulders up towards your hips.",
      "Lower your body back down to complete the exercise.",
      "Remember to maintain your breathing throughout the exercise.",
    ],
    images:[
      "https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=500&h=340&fit=crop",
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=500&h=340&fit=crop",
    ],
  },
  {
    id:"e6", name:"Back Extension", category:"Posterior Chain",
    defaultReps:"10 reps", defaultRest:"60 seconds", defaultSets:3, equipment:"",
    howTo:[
      "Lie face down on a mat with your arms extended along your sides.",
      "As you exhale, lift your head and chest slightly off the mat.",
      "Hold this position briefly and then as you inhale, lower yourself back down.",
      "Remember to keep your legs together and head in line with your back.",
    ],
    images:[
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&h=340&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=340&fit=crop",
    ],
  },
  {
    id:"e7", name:"Pallof Press on Bosu Ball", category:"Core Stability",
    defaultReps:"10 reps", defaultRest:"60 seconds", defaultSets:3, equipment:"Yellow exercise band, Bosu ball",
    howTo:[
      "Stand on a Bosu ball. Fix the exercise band to an object at chest height beside you.",
      "Bend your elbows to bring your hands up to your chest.",
      "Keeping your chest straight, extend your arms forward, then bring them back in.",
      "Remember to keep your shoulders relaxed and resist the pull of the band.",
    ],
    images:[
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&h=340&fit=crop",
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&h=340&fit=crop",
    ],
  },
  {
    id:"e8", name:"Single Leg Bosch Hold", category:"Balance & Stability",
    defaultReps:"30 seconds", defaultRest:"60 seconds", defaultSets:6, equipment:"",
    howTo:[
      "Keeping your shoulders on the ground, raise your hips into the air.",
      "Lift one heel just off the ground, driving your other heel back and down into the floor.",
      "Hold this position for the prescribed time.",
      "Then relax to complete the exercise. Remember to maintain your breathing.",
    ],
    images:[
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&h=340&fit=crop",
      "https://images.unsplash.com/photo-1542766788-a2f588f447ee?w=500&h=340&fit=crop",
    ],
  },
  {
    id:"e9", name:"Hamstring Bridge Walk Out and In", category:"Posterior Chain",
    defaultReps:"10 reps", defaultRest:"60 seconds", defaultSets:3, equipment:"",
    howTo:[
      "Lie on your back with knees bent and feet flat. Lift your hips into the air.",
      "Keeping your hips raised, walk your feet out until your hips are just above the floor.",
      "Then walk your feet back in to complete the exercise.",
      "Remember to maintain your breathing throughout the exercise.",
    ],
    images:[
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=340&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=340&fit=crop",
    ],
  },
  {
    id:"e10", name:"Goblet Squat", category:"Lower Body",
    defaultReps:"12 reps", defaultRest:"60 seconds", defaultSets:3, equipment:"Dumbbell or kettlebell",
    howTo:[
      "Hold a dumbbell or kettlebell vertically at chest height with both hands.",
      "Stand with feet shoulder-width apart, toes slightly turned out.",
      "Lower your body into a squat, keeping your chest up and knees tracking over toes.",
      "Push through your heels to return to standing. Maintain your breathing throughout.",
    ],
    images:[
      "https://images.unsplash.com/photo-1567598508481-65985588e295?w=500&h=340&fit=crop",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=340&fit=crop",
    ],
  },
];

const CATEGORIES = [...new Set(EXERCISE_LIBRARY.map(e => e.category))];

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const INITIAL_PLAYERS = [
  {
    id:1, name:"Rahul Das", role:"Bowler", status:"Injured", avatar:"RD",
    programs:[
      {
        id:"prog1", name:"Side Strain Phase 2", client:"Rahul Das",
        practitioner:"Dr. Arun", timePeriod:"28 Nov 2024 – 25 Dec 2024",
        howOften:"Whenever", when:"Any time", createdAt:"2024-11-27",
        exercises:[
          {...EXERCISE_LIBRARY[0], instanceId:"i1", reps:"30 seconds", rest:"60 seconds", sets:3, notes:""},
          {...EXERCISE_LIBRARY[1], instanceId:"i2", reps:"10 reps",    rest:"60 seconds", sets:3, notes:""},
          {...EXERCISE_LIBRARY[2], instanceId:"i3", reps:"10 reps",    rest:"60 seconds", sets:3, notes:""},
          {...EXERCISE_LIBRARY[3], instanceId:"i4", reps:"10 reps",    rest:"60 seconds", sets:3, notes:""},
          {...EXERCISE_LIBRARY[4], instanceId:"i5", reps:"10 reps",    rest:"60 seconds", sets:3, notes:""},
        ],
      },
    ],
  },
  {id:2, name:"Arjun Menon",  role:"Batsman",       status:"Active", avatar:"AM", programs:[]},
  {id:3, name:"Vivek Pillai", role:"All-rounder",   status:"Active", avatar:"VP", programs:[]},
  {id:4, name:"Nikhil K",     role:"Wicket-keeper", status:"Active", avatar:"NK", programs:[]},
];

const WEEKS_META = [
  {week:1,label:"Week 1",dates:"May 6 – May 13",  totalGoals:10},
  {week:2,label:"Week 2",dates:"May 13 – May 20", totalGoals:19},
  {week:3,label:"Week 3",dates:"May 20 – May 27", totalGoals:10},
  {week:4,label:"Week 4",dates:"May 27 – Jun 3",  totalGoals:10},
  {week:5,label:"Week 5",dates:"Jun 3 – Jun 10",  totalGoals:15},
  {week:6,label:"Week 6",dates:"Jun 10 – Jun 17", totalGoals:8 },
  {week:7,label:"Week 7",dates:"Jun 17 – Jun 24", totalGoals:7 },
];

const GOALS_DATA = [
  {id:"c1",text:"Pain-free daily activities",          category:"Clinical",       status:"Not Started",pain:0,notes:""},
  {id:"c2",text:"Normal breathing without discomfort", category:"Clinical",       status:"Not Started",pain:0,notes:""},
  {id:"c3",text:"Full range of motion",                category:"Clinical",       status:"Not Started",pain:0,notes:""},
  {id:"c4",text:"No point tenderness",                 category:"Clinical",       status:"Not Started",pain:0,notes:""},
  {id:"c5",text:"Strength progression",                category:"Clinical",       status:"Not Started",pain:0,notes:""},
  {id:"r1",text:"Follow recovery protocol",            category:"Rehabilitation", status:"Not Started",pain:0,notes:""},
  {id:"r2",text:"Ice and rest as needed",              category:"Rehabilitation", status:"Not Started",pain:0,notes:""},
  {id:"r3",text:"Progressive mobility exercises",      category:"Rehabilitation", status:"Not Started",pain:0,notes:""},
  {id:"r4",text:"Gradual activity increase",           category:"Rehabilitation", status:"Not Started",pain:0,notes:""},
];

const DAYS_LABELS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const ROW_LABELS=["Strength","Conditioning","Cricket/Other","Location","Recovery/treatment","Practitioner","Fixtures"];
const buildGrid=()=>{const g={};for(let w=1;w<=7;w++){g[w]={};DAYS_LABELS.forEach((_,i)=>{g[w][i]={};ROW_LABELS.forEach(r=>{g[w][i][r]="";});});}return g;};
const WEEK_DATES={1:["6 May","7 May","8 May","9 May","10 May","11 May","12 May"],2:["13 May","14 May","15 May","16 May","17 May","18 May","19 May"],3:["20 May","21 May","22 May","23 May","24 May","25 May","26 May"],4:["27 May","28 May","29 May","30 May","31 May","1 Jun","2 Jun"],5:["3 Jun","4 Jun","5 Jun","6 Jun","7 Jun","8 Jun","9 Jun"],6:["10 Jun","11 Jun","12 Jun","13 Jun","14 Jun","15 Jun","16 Jun"],7:["17 Jun","18 Jun","19 Jun","20 Jun","21 Jun","22 Jun","23 Jun"]};
const STATUS_CFG={"Not Started":{bg:"#f0f0f0",color:"#888",border:"#e0e0e0"},"In Progress":{bg:"#fff8e1",color:"#f9a825",border:"#ffe082"},"Completed":{bg:"#f0faf0",color:"#2e7d32",border:"#b8e6b8"},"At Risk":{bg:"#fff0f0",color:"#cc3333",border:"#ffc5c5"}};

// ─── VIEWS ────────────────────────────────────────────────────────────────────
const V={HOME:"home",PLAYER:"player",GOALS:"goals",GOAL_D:"goal_d",PROGRAMS:"programs",PROG_D:"prog_d",PROG_C:"prog_c",EX_D:"ex_d"};

// ─── SHARED UI ────────────────────────────────────────────────────────────────
const card=(x={})=>({backgroundColor:"#fff",borderRadius:"10px",border:"1px solid #e8e8e8",boxShadow:"0 1px 4px rgba(0,0,0,0.05)",...x});
const Heading=({title,sub})=>(<div style={{marginBottom:"22px"}}><h1 style={{fontSize:"20px",fontWeight:"700",color:"#222",margin:0}}>{title}</h1>{sub&&<p style={{fontSize:"13px",color:"#888",marginTop:"4px"}}>{sub}</p>}<div style={{width:"32px",height:"3px",backgroundColor:"#e87722",borderRadius:"2px",marginTop:"6px"}}/></div>);
const BackBtn=({label,onClick})=>(<button onClick={onClick} style={{display:"flex",alignItems:"center",gap:"6px",background:"none",border:"none",color:"#888",fontSize:"13px",fontWeight:"600",cursor:"pointer",marginBottom:"18px",padding:"0"}} onMouseEnter={e=>(e.currentTarget.style.color="#e87722")} onMouseLeave={e=>(e.currentTarget.style.color="#888")}><ArrowLeft size={15}/> {label}</button>);
const OBtn=({children,onClick,style={}})=>(<button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:"7px",padding:"9px 20px",backgroundColor:"#e87722",color:"#fff",border:"none",borderRadius:"8px",fontSize:"13px",fontWeight:"700",cursor:"pointer",boxShadow:"0 2px 8px rgba(232,119,34,0.28)",...style}} onMouseEnter={e=>(e.currentTarget.style.backgroundColor="#d06a18")} onMouseLeave={e=>(e.currentTarget.style.backgroundColor="#e87722")}>{children}</button>);
const inputStyle={width:"100%",padding:"9px 12px",border:"1.5px solid #e0e0e0",borderRadius:"7px",fontSize:"13px",color:"#333",backgroundColor:"#f9f9f9",outline:"none",boxSizing:"border-box",fontFamily:"inherit"};
const InputF=({label,value,onChange,placeholder,type="text"})=>(<div><label style={{fontSize:"11px",fontWeight:"700",color:"#888",display:"block",marginBottom:"4px",letterSpacing:"0.4px"}}>{label}</label><input type={type} value={value} onChange={onChange} placeholder={placeholder} style={inputStyle} onFocus={e=>(e.target.style.borderColor="#e87722")} onBlur={e=>(e.target.style.borderColor="#e0e0e0")}/></div>);

// ─── PROGRAM CREATE FORM ──────────────────────────────────────────────────────
function ProgramCreateForm({player,onSave,onCancel}){
  const[form,setForm]=useState({name:"",practitioner:"Dr. Arun",timePeriod:"",howOften:"Whenever",when:"Any time",exercises:[]});
  const[libOpen,setLibOpen]=useState(false);
  const[catFilter,setCatFilter]=useState("All");
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const addEx=(ex)=>{setForm(f=>({...f,exercises:[...f.exercises,{...ex,instanceId:`${ex.id}_${Date.now()}`,reps:ex.defaultReps,rest:ex.defaultRest,sets:ex.defaultSets,notes:""}]}));setLibOpen(false);};
  const updEx=(idx,k,v)=>setForm(f=>{const e=[...f.exercises];e[idx]={...e[idx],[k]:v};return{...f,exercises:e};});
  const remEx=(idx)=>setForm(f=>({...f,exercises:f.exercises.filter((_,i)=>i!==idx)}));
  const filtered=catFilter==="All"?EXERCISE_LIBRARY:EXERCISE_LIBRARY.filter(e=>e.category===catFilter);
  const handleSave=()=>{if(!form.name.trim()){alert("Enter a program name.");return;}if(form.exercises.length===0){alert("Add at least one exercise.");return;}onSave({...form,id:`prog_${Date.now()}`,createdAt:new Date().toISOString().split("T")[0],client:player.name});};

  return(
    <div style={{padding:"28px",maxWidth:"860px",margin:"0 auto"}}>
      <BackBtn label="Back to Programs" onClick={onCancel}/>
      <Heading title="Create Weekly Program" sub={`For ${player.name} · ${player.role}`}/>

      {/* Meta */}
      <div style={card({padding:"22px",marginBottom:"16px"})}>
        <div style={{fontSize:"13px",fontWeight:"700",color:"#333",marginBottom:"16px",display:"flex",alignItems:"center",gap:"7px"}}><FileText size={14} style={{color:"#e87722"}}/> Program Details</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
          <InputF label="PROGRAM NAME"  value={form.name}          onChange={e=>set("name",e.target.value)}         placeholder="e.g. Side Strain Phase 2"/>
          <InputF label="PRACTITIONER"  value={form.practitioner}  onChange={e=>set("practitioner",e.target.value)} placeholder="Practitioner name"/>
          <InputF label="TIME PERIOD"   value={form.timePeriod}    onChange={e=>set("timePeriod",e.target.value)}   placeholder="e.g. 28 Nov 2024 – 25 Dec 2024"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
            <InputF label="HOW OFTEN" value={form.howOften} onChange={e=>set("howOften",e.target.value)} placeholder="Whenever"/>
            <InputF label="WHEN"      value={form.when}     onChange={e=>set("when",e.target.value)}     placeholder="Any time"/>
          </div>
        </div>
      </div>

      {/* Exercises */}
      <div style={card({padding:"22px",marginBottom:"16px"})}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}}>
          <div style={{fontSize:"13px",fontWeight:"700",color:"#333",display:"flex",alignItems:"center",gap:"7px"}}><Dumbbell size={14} style={{color:"#e87722"}}/> Exercises ({form.exercises.length})</div>
          <OBtn onClick={()=>setLibOpen(true)} style={{padding:"7px 14px",fontSize:"12px"}}><Plus size={13}/> Add Exercise</OBtn>
        </div>

        {form.exercises.length===0?(
          <div style={{textAlign:"center",padding:"32px",backgroundColor:"#f9f9f9",borderRadius:"9px",border:"1.5px dashed #e0e0e0"}}>
            <Dumbbell size={28} style={{color:"#ddd",margin:"0 auto 10px",display:"block"}}/>
            <p style={{fontSize:"14px",fontWeight:"700",color:"#aaa"}}>No exercises added yet</p>
            <p style={{fontSize:"12px",color:"#bbb",marginTop:"4px"}}>Click "Add Exercise" to pick from the library</p>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            {form.exercises.map((ex,idx)=>(
              <div key={ex.instanceId} style={{border:"1.5px solid #e8e8e8",borderRadius:"10px",overflow:"hidden"}}>
                <div style={{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",backgroundColor:"#fafafa",borderBottom:"1px solid #f0f0f0"}}>
                  <div style={{width:"26px",height:"26px",borderRadius:"50%",backgroundColor:"#e87722",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"800",color:"#fff",flexShrink:0}}>{idx+1}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"14px",fontWeight:"700",color:"#222"}}>{ex.name}</div>
                    <div style={{fontSize:"11px",color:"#888",marginTop:"1px"}}>{ex.category}</div>
                  </div>
                  <button onClick={()=>remEx(idx)} style={{background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",borderRadius:"6px",color:"#cc3333"}} onMouseEnter={e=>(e.currentTarget.style.backgroundColor="#fff0f0")} onMouseLeave={e=>(e.currentTarget.style.backgroundColor="transparent")}><Trash2 size={15}/></button>
                </div>
                <div style={{padding:"12px 16px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px"}}>
                  {[{label:"REPS / TIME",key:"reps",val:ex.reps},{label:"REST",key:"rest",val:ex.rest},{label:"SETS",key:"sets",val:String(ex.sets)},{label:"EQUIPMENT",key:"equipment",val:ex.equipment}].map(f=>(
                    <div key={f.key}>
                      <label style={{fontSize:"10px",fontWeight:"700",color:"#aaa",display:"block",marginBottom:"3px"}}>{f.label}</label>
                      <input value={f.val} onChange={e=>updEx(idx,f.key,e.target.value)} style={{...inputStyle,fontSize:"12px",padding:"6px 10px"}} onFocus={e=>(e.target.style.borderColor="#e87722")} onBlur={e=>(e.target.style.borderColor="#e0e0e0")}/>
                    </div>
                  ))}
                </div>
                <div style={{padding:"0 16px 12px"}}>
                  <label style={{fontSize:"10px",fontWeight:"700",color:"#aaa",display:"block",marginBottom:"3px"}}>NOTES</label>
                  <input value={ex.notes} onChange={e=>updEx(idx,"notes",e.target.value)} placeholder="Additional notes..." style={{...inputStyle,fontSize:"12px",padding:"6px 10px"}} onFocus={e=>(e.target.style.borderColor="#e87722")} onBlur={e=>(e.target.style.borderColor="#e0e0e0")}/>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{display:"flex",gap:"12px"}}>
        <OBtn onClick={handleSave}><FileText size={15}/> Save Program</OBtn>
        <button onClick={onCancel} style={{padding:"10px 20px",backgroundColor:"#fff",color:"#555",border:"1.5px solid #e0e0e0",borderRadius:"8px",fontSize:"13px",fontWeight:"600",cursor:"pointer"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#e87722";e.currentTarget.style.color="#e87722";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e0e0e0";e.currentTarget.style.color="#555";}}>Cancel</button>
      </div>

      {/* Library modal */}
      {libOpen&&(
        <div style={{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.45)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
          <div style={{...card({padding:"0",overflow:"hidden"}),width:"100%",maxWidth:"680px",maxHeight:"82vh",display:"flex",flexDirection:"column"}}>
            <div style={{padding:"18px 22px",borderBottom:"1px solid #f0f0f0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div><div style={{fontSize:"16px",fontWeight:"700",color:"#222"}}>Exercise Library</div><div style={{fontSize:"12px",color:"#888",marginTop:"2px"}}>{EXERCISE_LIBRARY.length} exercises</div></div>
              <button onClick={()=>setLibOpen(false)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"22px",color:"#aaa",lineHeight:1,width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"6px"}} onMouseEnter={e=>(e.currentTarget.style.backgroundColor="#f5f5f5")} onMouseLeave={e=>(e.currentTarget.style.backgroundColor="transparent")}>×</button>
            </div>
            <div style={{padding:"12px 22px",borderBottom:"1px solid #f0f0f0",display:"flex",gap:"8px",flexWrap:"wrap"}}>
              {["All",...CATEGORIES].map(c=>(
                <button key={c} onClick={()=>setCatFilter(c)} style={{padding:"5px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:`1.5px solid ${catFilter===c?"#e87722":"#e0e0e0"}`,backgroundColor:catFilter===c?"#fff3e8":"#f9f9f9",color:catFilter===c?"#e87722":"#666"}}>{c}</button>
              ))}
            </div>
            <div style={{overflowY:"auto",flex:1}}>
              {filtered.map((ex,i)=>(
                <div key={ex.id} onClick={()=>addEx(ex)}
                  style={{display:"flex",alignItems:"center",gap:"14px",padding:"14px 22px",borderBottom:i<filtered.length-1?"1px solid #f5f5f5":"none",cursor:"pointer",transition:"background 0.12s"}}
                  onMouseEnter={e=>(e.currentTarget.style.backgroundColor="#fdf8f4")}
                  onMouseLeave={e=>(e.currentTarget.style.backgroundColor="transparent")}
                >
                  <div style={{width:"36px",height:"36px",borderRadius:"9px",backgroundColor:"#fff3e8",border:"1.5px solid #ffd8b0",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Dumbbell size={16} style={{color:"#e87722"}}/></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"14px",fontWeight:"700",color:"#222"}}>{ex.name}</div>
                    <div style={{fontSize:"11px",color:"#888",marginTop:"1px"}}>{ex.category} · {ex.defaultReps} · {ex.defaultSets} sets{ex.equipment?` · ${ex.equipment}`:""}</div>
                  </div>
                  <div style={{padding:"5px 10px",backgroundColor:"#fff3e8",border:"1px solid #ffd8b0",borderRadius:"7px",fontSize:"12px",fontWeight:"700",color:"#e87722",flexShrink:0}}>+ Add</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PROGRAM DETAIL ───────────────────────────────────────────────────────────
function ProgramDetail({program,onBack,onExerciseClick}){
  return(
    <div style={{padding:"28px",maxWidth:"860px",margin:"0 auto"}}>
      <BackBtn label="Back to Programs" onClick={onBack}/>

      {/* Header — MoveHealth PDF style */}
      <div style={card({padding:"26px",marginBottom:"20px"})}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:"14px",marginBottom:"20px",paddingBottom:"20px",borderBottom:"1px solid #f0f0f0"}}>
          <div>
            <div style={{fontSize:"11px",color:"#aaa",fontWeight:"600",marginBottom:"4px",textTransform:"uppercase",letterSpacing:"0.4px"}}>Program Name</div>
            <div style={{fontSize:"26px",fontWeight:"800",color:"#222",lineHeight:"1.2"}}>{program.name}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:"11px",color:"#aaa",fontWeight:"600",marginBottom:"3px",textTransform:"uppercase",letterSpacing:"0.4px"}}>Practitioner</div>
            <div style={{fontSize:"15px",fontWeight:"700",color:"#333"}}>{program.practitioner}</div>
            <div style={{fontSize:"12px",color:"#888",marginTop:"2px"}}>{program.createdAt}</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:"18px"}}>
          {[{label:"Client",val:program.client},{label:"Time Period",val:program.timePeriod||"—"},{label:"How Often",val:program.howOften},{label:"When",val:program.when}].map(f=>(
            <div key={f.label}>
              <div style={{fontSize:"11px",color:"#aaa",fontWeight:"600",marginBottom:"3px",textTransform:"uppercase",letterSpacing:"0.4px"}}>{f.label}</div>
              <div style={{fontSize:"15px",fontWeight:"700",color:"#333"}}>{f.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise count */}
      <div style={{...card({padding:"13px 20px",marginBottom:"20px",backgroundColor:"#fff3e8",border:"1px solid #ffd8b0"}),display:"flex",alignItems:"center",gap:"10px"}}>
        <Dumbbell size={17} style={{color:"#e87722"}}/>
        <span style={{fontSize:"14px",fontWeight:"700",color:"#b05a00"}}>You have {program.exercises.length} exercise{program.exercises.length!==1?"s":""}</span>
      </div>

      {/* Exercise rows */}
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {program.exercises.map((ex,idx)=>(
          <div key={ex.instanceId||ex.id} onClick={()=>onExerciseClick(ex,idx+1)}
            style={{...card({padding:"0",overflow:"hidden",cursor:"pointer",transition:"all 0.15s"}),borderLeft:"4px solid #e87722"}}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 14px rgba(232,119,34,0.12)";e.currentTarget.style.transform="translateY(-1px)";}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.05)";e.currentTarget.style.transform="translateY(0)";}}
          >
            <div style={{display:"flex",alignItems:"center",gap:"14px",padding:"16px 20px"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"50%",backgroundColor:"#fff3e8",border:"1.5px solid #ffd8b0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:"800",color:"#e87722",flexShrink:0}}>{idx+1}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:"15px",fontWeight:"700",color:"#222",marginBottom:"5px"}}>{ex.name}</div>
                <div style={{display:"flex",gap:"18px",flexWrap:"wrap"}}>
                  {[{icon:Repeat,val:ex.reps},{icon:Clock,val:`${ex.rest} rest`},{icon:BarChart2,val:`${ex.sets} sets`},...(ex.equipment?[{icon:Dumbbell,val:ex.equipment}]:[])].map((d,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:"5px"}}><d.icon size={12} style={{color:"#aaa"}}/><span style={{fontSize:"12px",color:"#666",fontWeight:"500"}}>{d.val}</span></div>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:"6px",padding:"5px 11px",backgroundColor:"#f5f5f5",borderRadius:"20px",fontSize:"11px",color:"#888",fontWeight:"600",flexShrink:0}}><Eye size={11}/> View details</div>
              <ChevronRight size={15} style={{color:"#ccc",flexShrink:0}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EXERCISE DETAIL VIEW ─────────────────────────────────────────────────────
function ExerciseDetailView({exercise,number,onBack}){
  const[imgErr,setImgErr]=useState({});
  return(
    <div style={{padding:"28px",maxWidth:"860px",margin:"0 auto"}}>
      <BackBtn label="Back to Program" onClick={onBack}/>

      {/* Header */}
      <div style={{...card({padding:"0",overflow:"hidden",marginBottom:"22px"}),borderLeft:"4px solid #e87722"}}>
        <div style={{padding:"16px 20px",backgroundColor:"#fafafa",borderBottom:"1px solid #f0f0f0",display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{width:"32px",height:"32px",borderRadius:"50%",backgroundColor:"#e87722",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:"800",color:"#fff",flexShrink:0}}>{number}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:"17px",fontWeight:"800",color:"#222",marginBottom:"5px"}}>{exercise.name}</div>
            <div style={{display:"flex",gap:"18px",flexWrap:"wrap"}}>
              {[exercise.reps,`${exercise.rest} rest`,`${exercise.sets} sets`,...(exercise.equipment?[exercise.equipment]:[])].map((v,i)=>(
                <span key={i} style={{fontSize:"13px",color:"#666"}}>{v}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Images grid — mimics MoveHealth PDF photo layout */}
      {exercise.images?.length>0&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"12px",marginBottom:"24px"}}>
          {exercise.images.map((src,i)=>(
            <div key={i} style={{borderRadius:"10px",overflow:"hidden",border:"1px solid #e8e8e8",position:"relative",backgroundColor:"#f0f0f0",aspectRatio:"4/3"}}>
              {!imgErr[i]?(
                <img src={src} alt={`${exercise.name} step ${i+1}`} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
                  onError={()=>setImgErr(p=>({...p,[i]:true}))}/>
              ):(
                <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#f4f4f4"}}>
                  <Dumbbell size={32} style={{color:"#ddd",marginBottom:"8px"}}/>
                  <span style={{fontSize:"12px",color:"#bbb",fontWeight:"600"}}>Step {i+1}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* How to perform */}
      <div style={card({padding:"22px",marginBottom:"16px"})}>
        <div style={{fontSize:"15px",fontWeight:"700",color:"#222",marginBottom:"18px",display:"flex",alignItems:"center",gap:"8px"}}><Target size={16} style={{color:"#e87722"}}/> How to Perform</div>
        <ol style={{margin:0,padding:0,listStyle:"none",display:"flex",flexDirection:"column",gap:"14px"}}>
          {exercise.howTo?.map((step,i)=>(
            <li key={i} style={{display:"flex",alignItems:"flex-start",gap:"12px"}}>
              <div style={{width:"26px",height:"26px",borderRadius:"50%",backgroundColor:"#fff3e8",border:"1.5px solid #ffd8b0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"700",color:"#e87722",flexShrink:0,marginTop:"1px"}}>{i+1}</div>
              <span style={{fontSize:"14px",color:"#444",lineHeight:"1.65"}}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {exercise.notes&&(
        <div style={{...card({padding:"16px 20px"}),backgroundColor:"#fff3e8",border:"1px solid #ffd8b0"}}>
          <div style={{fontSize:"13px",fontWeight:"700",color:"#e87722",marginBottom:"4px"}}>Notes</div>
          <div style={{fontSize:"13px",color:"#666"}}>{exercise.notes}</div>
        </div>
      )}
    </div>
  );
}

// ─── PROGRAMS LIST ────────────────────────────────────────────────────────────
function ProgramsList({player,allPlayers,setAllPlayers,onBack}){
  const[view,setView]=useState(V.PROGRAMS);
  const[activeProg,setActiveProg]=useState(null);
  const[activeEx,setActiveEx]=useState(null);
  const[activeExNum,setActiveExNum]=useState(1);
  const p=allPlayers.find(x=>x.id===player.id)||player;

  const handleSave=(prog)=>{
    setAllPlayers(prev=>prev.map(x=>x.id===p.id?{...x,programs:[prog,...x.programs]}:x));
    setView(V.PROGRAMS);
  };

  if(view===V.PROG_C) return <ProgramCreateForm player={p} onSave={handleSave} onCancel={()=>setView(V.PROGRAMS)}/>;
  if(view===V.PROG_D&&activeProg) return <ProgramDetail program={activeProg} onBack={()=>setView(V.PROGRAMS)} onExerciseClick={(ex,num)=>{setActiveEx(ex);setActiveExNum(num);setView(V.EX_D);}}/>;
  if(view===V.EX_D&&activeEx) return <ExerciseDetailView exercise={activeEx} number={activeExNum} onBack={()=>setView(V.PROG_D)}/>;

  return(
    <div style={{padding:"28px",maxWidth:"900px",margin:"0 auto"}}>
      <BackBtn label="All Players" onClick={onBack}/>
      <div style={card({padding:"18px 22px",marginBottom:"22px",display:"flex",alignItems:"center",gap:"14px"})}>
        <div style={{width:"46px",height:"46px",borderRadius:"50%",backgroundColor:p.status==="Injured"?"#fff0f0":"#fff3e8",border:`2px solid ${p.status==="Injured"?"#ffc5c5":"#ffd8b0"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"800",color:p.status==="Injured"?"#cc3333":"#e87722",flexShrink:0}}>{p.avatar}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:"17px",fontWeight:"800",color:"#222"}}>{p.name}</div>
          <div style={{fontSize:"12px",color:"#888",marginTop:"2px"}}>{p.role} · {p.programs.length} program{p.programs.length!==1?"s":""}</div>
        </div>
        <OBtn onClick={()=>setView(V.PROG_C)}><Plus size={14}/> New Program</OBtn>
      </div>

      <div style={{fontSize:"11px",fontWeight:"700",color:"#aaa",letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:"12px"}}>Weekly Programs ({p.programs.length})</div>

      {p.programs.length===0?(
        <div style={card({padding:"48px",textAlign:"center"})}>
          <Dumbbell size={36} style={{color:"#ddd",margin:"0 auto 12px",display:"block"}}/>
          <p style={{fontSize:"15px",fontWeight:"700",color:"#555"}}>No programs yet</p>
          <p style={{fontSize:"13px",color:"#aaa",marginTop:"4px"}}>Create a weekly rehab or training program</p>
          <OBtn onClick={()=>setView(V.PROG_C)} style={{marginTop:"16px"}}><Plus size={14}/> Create Program</OBtn>
        </div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {p.programs.map(prog=>(
            <div key={prog.id} onClick={()=>{setActiveProg(prog);setView(V.PROG_D);}}
              style={card({padding:"18px 20px",cursor:"pointer",transition:"all 0.15s",borderLeft:"4px solid #e87722"})}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 14px rgba(232,119,34,0.12)";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.05)";e.currentTarget.style.transform="translateY(0)";}}
            >
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"10px"}}>
                <div>
                  <div style={{fontSize:"17px",fontWeight:"800",color:"#222",marginBottom:"3px"}}>{prog.name}</div>
                  <div style={{fontSize:"12px",color:"#888",marginBottom:"10px"}}>{prog.timePeriod||prog.createdAt} · {prog.practitioner}</div>
                  <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                    <span style={{fontSize:"11px",fontWeight:"700",padding:"2px 9px",borderRadius:"20px",backgroundColor:"#fff3e8",color:"#e87722",border:"1px solid #ffd8b0"}}>{prog.exercises.length} exercise{prog.exercises.length!==1?"s":""}</span>
                    <span style={{fontSize:"11px",fontWeight:"600",padding:"2px 9px",borderRadius:"20px",backgroundColor:"#f5f5f5",color:"#666",border:"1px solid #e0e0e0"}}>{prog.howOften} · {prog.when}</span>
                  </div>
                </div>
                <ChevronRight size={16} style={{color:"#ccc",flexShrink:0,marginTop:"4px"}}/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN TRAINER DASHBOARD ───────────────────────────────────────────────────
export default function TrainerDashboard(){
  const[players,setPlayers]=useState(INITIAL_PLAYERS);
  const[view,setView]=useState(V.HOME);
  const[activePlayer,setActivePlayer]=useState(null);
  const[activeTab,setActiveTab]=useState("goals");
  const[goals,setGoals]=useState(GOALS_DATA);
  const[activeGoal,setActiveGoal]=useState(null);
  const[goalStatus,setGoalStatus]=useState("Not Started");
  const[goalPain,setGoalPain]=useState(0);
  const[goalNotes,setGoalNotes]=useState("");
  const[gridData,setGridData]=useState(buildGrid);
  const[activeWeek,setActiveWeek]=useState(1);
  const[editCell,setEditCell]=useState(null);
  const[editVal,setEditVal]=useState("");

  const completedCount=goals.filter(g=>g.status==="Completed").length;
  const inProgressCount=goals.filter(g=>g.status==="In Progress").length;
  const atRiskCount=goals.filter(g=>g.status==="At Risk").length;
  const avgPain=goals.length?(goals.reduce((s,g)=>s+g.pain,0)/goals.length).toFixed(1):0;
  const clinicalGoals=goals.filter(g=>g.category==="Clinical");
  const rehabGoals=goals.filter(g=>g.category==="Rehabilitation");
  const weeklyPct=WEEKS_META.map(wm=>({week:wm.week,pct:wm.totalGoals>0?Math.round((goals.filter(g=>g.status==="Completed"&&g.text.includes(`Week ${wm.week}`)).length/wm.totalGoals)*10):0}));
  const maxPct=Math.max(...weeklyPct.map(w=>w.pct),1);

  const openGoal=(g)=>{setActiveGoal(g);setGoalStatus(g.status);setGoalPain(g.pain);setGoalNotes(g.notes);setView(V.GOAL_D);};
  const saveGoal=()=>{setGoals(prev=>prev.map(g=>g.id===activeGoal.id?{...g,status:goalStatus,pain:goalPain,notes:goalNotes}:g));setView(V.GOALS);};
  const saveCell=()=>{if(!editCell)return;setGridData(prev=>{const n={...prev};n[activeWeek]={...n[activeWeek]};n[activeWeek][editCell.day]={...n[activeWeek][editCell.day],[editCell.row]:editVal};return n;});setEditCell(null);setEditVal("");};

  // Programs — own component tree
  if(view===V.PROGRAMS) return <ProgramsList player={activePlayer} allPlayers={players} setAllPlayers={setPlayers} onBack={()=>{setActiveTab("goals");setView(V.PLAYER);}}/>;

  const TABS=[
    {key:"goals",    label:"Weekly Goals",    icon:Target},
    {key:"programs", label:"Programs",        icon:Dumbbell},
    {key:"progress", label:"Progress",        icon:TrendingUp},
    {key:"fitness",  label:"Fitness Overview",icon:BarChart2},
  ];

  const GoalRow=({g})=>{
    const cfg=STATUS_CFG[g.status];
    return(
      <div onClick={()=>openGoal(g)}
        style={{display:"flex",alignItems:"center",gap:"14px",padding:"15px 20px",backgroundColor:"#fff",borderRadius:"10px",border:"1px solid #e8e8e8",cursor:"pointer",marginBottom:"8px",boxShadow:"0 1px 3px rgba(0,0,0,0.04)",transition:"all 0.15s"}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="#e87722";e.currentTarget.style.boxShadow="0 3px 12px rgba(232,119,34,0.1)";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="#e8e8e8";e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.04)";}}
      >
        {g.status==="Completed"?<CheckCircle2 size={20} style={{color:"#2e7d32",flexShrink:0}}/>:<Circle size={20} style={{color:"#ccc",flexShrink:0}}/>}
        <span style={{flex:1,fontSize:"14px",color:"#222",lineHeight:"1.4"}}>{g.text}</span>
        {g.status!=="Not Started"&&<span style={{fontSize:"11px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px",backgroundColor:cfg.bg,color:cfg.color,border:`1px solid ${cfg.border}`,flexShrink:0}}>{g.status}</span>}
        <ChevronRight size={16} style={{color:"#ccc",flexShrink:0}}/>
      </div>
    );
  };

  // ── HOME ──
  if(view===V.HOME) return(
    <div style={{padding:"28px",maxWidth:"1100px",margin:"0 auto"}}>
      <Heading title="Trainer Dashboard" sub="Manage player goals, programs and fitness plans"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:"14px",marginBottom:"24px"}}>
        {[{label:"Total Players",value:players.length,icon:Users,color:"#e87722"},{label:"Goals Completed",value:completedCount,icon:CheckCircle2,color:"#2e7d32"},{label:"In Progress",value:inProgressCount,icon:Activity,color:"#f9a825"},{label:"At Risk",value:atRiskCount,icon:AlertCircle,color:"#cc3333"}].map(s=>(
          <div key={s.label} style={card({padding:"16px 20px",borderLeft:`4px solid ${s.color}`})}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}}>
              <span style={{fontSize:"22px",fontWeight:"800",color:s.color}}>{s.value}</span>
              <div style={{width:"34px",height:"34px",borderRadius:"9px",backgroundColor:s.color+"18",display:"flex",alignItems:"center",justifyContent:"center"}}><s.icon size={16} style={{color:s.color}}/></div>
            </div>
            <span style={{fontSize:"12px",color:"#888",fontWeight:"500"}}>{s.label}</span>
          </div>
        ))}
      </div>
      <div style={card({overflow:"hidden"})}>
        <div style={{padding:"16px 22px",borderBottom:"1px solid #f0f0f0",display:"flex",alignItems:"center",gap:"8px"}}><Users size={15} style={{color:"#e87722"}}/><span style={{fontSize:"14px",fontWeight:"700",color:"#333"}}>Players</span></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))"}}>
          {players.map((p,i)=>(
            <div key={p.id} onClick={()=>{setActivePlayer(p);setActiveTab("goals");setView(V.PLAYER);}}
              style={{display:"flex",alignItems:"center",gap:"14px",padding:"16px 22px",cursor:"pointer",borderRight:i%2===0?"1px solid #f5f5f5":"none",borderBottom:i<players.length-2?"1px solid #f5f5f5":"none",transition:"background 0.12s"}}
              onMouseEnter={e=>(e.currentTarget.style.backgroundColor="#fdf8f4")}
              onMouseLeave={e=>(e.currentTarget.style.backgroundColor="transparent")}
            >
              <div style={{width:"44px",height:"44px",borderRadius:"50%",backgroundColor:p.status==="Injured"?"#fff0f0":"#fff3e8",border:`2px solid ${p.status==="Injured"?"#ffc5c5":"#ffd8b0"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:"800",color:p.status==="Injured"?"#cc3333":"#e87722",flexShrink:0}}>{p.avatar}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <span style={{fontSize:"14px",fontWeight:"700",color:"#222"}}>{p.name}</span>
                  {p.status==="Injured"&&<span style={{fontSize:"10px",fontWeight:"700",color:"#cc3333",backgroundColor:"#fff0f0",border:"1px solid #ffc5c5",borderRadius:"20px",padding:"2px 7px"}}>Injured</span>}
                </div>
                <div style={{fontSize:"12px",color:"#888",marginTop:"1px"}}>{p.role} · {p.programs.length} program{p.programs.length!==1?"s":""}</div>
              </div>
              <ChevronRight size={15} style={{color:"#ccc"}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── PLAYER HUB ──
  if([V.PLAYER,V.GOALS,V.GOAL_D].includes(view)) return(
    <div style={{maxWidth:"1100px",margin:"0 auto"}}>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#1a2340 0%,#2d3a5c 100%)",padding:"28px 28px 0",borderBottom:"1px solid #e8e8e8"}}>
        <button onClick={()=>setView(V.HOME)} style={{display:"flex",alignItems:"center",gap:"6px",background:"none",border:"none",color:"rgba(255,255,255,0.7)",fontSize:"13px",fontWeight:"600",cursor:"pointer",marginBottom:"16px",padding:"0"}}><ArrowLeft size={15}/> All Players</button>
        <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"24px"}}>
          <div style={{width:"52px",height:"52px",borderRadius:"50%",backgroundColor:activePlayer?.status==="Injured"?"#cc3333":"#e87722",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:"800",color:"#fff"}}>{activePlayer?.avatar}</div>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <h2 style={{fontSize:"20px",fontWeight:"800",color:"#fff",margin:0}}>{activePlayer?.name}</h2>
              <span style={{fontSize:"11px",fontWeight:"700",padding:"3px 10px",borderRadius:"20px",backgroundColor:activePlayer?.status==="Injured"?"#cc3333":"rgba(255,255,255,0.15)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)"}}>{activePlayer?.status}</span>
            </div>
            <div style={{fontSize:"13px",color:"rgba(255,255,255,0.6)",marginTop:"3px"}}>{activePlayer?.role}</div>
          </div>
        </div>
        <div style={{display:"flex"}}>
          {TABS.map(tab=>(
            <button key={tab.key} onClick={()=>{setActiveTab(tab.key);if(tab.key==="programs"){setView(V.PROGRAMS);}else{setView(V.PLAYER);}}}
              style={{display:"flex",alignItems:"center",gap:"7px",padding:"12px 20px",border:"none",cursor:"pointer",fontSize:"13px",fontWeight:"700",backgroundColor:"transparent",color:activeTab===tab.key?"#fff":"rgba(255,255,255,0.5)",borderBottom:activeTab===tab.key?"3px solid #e87722":"3px solid transparent",transition:"all 0.15s"}}>
              <tab.icon size={15}/> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Goals tab */}
      {activeTab==="goals"&&view===V.PLAYER&&(
        <div style={{padding:"28px"}}>
          <Heading title="Training Goals" sub="Track your 7-week rehabilitation journey"/>
          {WEEKS_META.map(wm=>{
            const done=goals.filter(g=>g.status==="Completed"&&g.text.includes(`Week ${wm.week}`)).length;
            const inP=goals.filter(g=>g.status==="In Progress"&&g.text.includes(`Week ${wm.week}`)).length;
            const atR=goals.filter(g=>g.status==="At Risk"&&g.text.includes(`Week ${wm.week}`)).length;
            const pct=wm.totalGoals>0?Math.round((done/wm.totalGoals)*100):0;
            return(
              <div key={wm.week} onClick={()=>setView(V.GOALS)}
                style={{...card({padding:"18px 20px",cursor:"pointer",transition:"all 0.15s",marginBottom:"12px"}),borderLeft:`4px solid ${done>0?"#e87722":"#e0e0e0"}`}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#e87722";e.currentTarget.style.boxShadow="0 4px 14px rgba(232,119,34,0.12)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=done>0?"#e87722":"#e0e0e0";e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.05)";}}
              >
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
                  <div><div style={{fontSize:"16px",fontWeight:"700",color:"#222"}}>{wm.label}</div><div style={{fontSize:"12px",color:"#888",marginTop:"1px"}}>{done} of {wm.totalGoals} goals completed</div></div>
                  <div style={{display:"flex",alignItems:"center",gap:"8px"}}><span style={{fontSize:"15px",fontWeight:"800",color:"#e87722"}}>{pct}%</span><ChevronRight size={16} style={{color:"#ccc"}}/></div>
                </div>
                <div style={{height:"6px",backgroundColor:"#f0f0f0",borderRadius:"4px",overflow:"hidden",marginBottom:"10px"}}><div style={{height:"100%",borderRadius:"4px",width:`${pct}%`,backgroundColor:"#e87722",transition:"width 0.5s"}}/></div>
                <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
                  {[{label:"Completed",n:done,color:"#2e7d32"},{label:"In Progress",n:inP,color:"#f9a825"},{label:"At Risk",n:atR,color:"#cc3333"}].map(s=>(
                    <div key={s.label} style={{display:"flex",alignItems:"center",gap:"5px"}}><div style={{width:"8px",height:"8px",borderRadius:"50%",backgroundColor:s.color}}/><span style={{fontSize:"11px",color:"#666",fontWeight:"500"}}>{s.n} {s.label}</span></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Goals list */}
      {activeTab==="goals"&&view===V.GOALS&&(
        <div style={{padding:"28px",maxWidth:"860px",margin:"0 auto"}}>
          <BackBtn label="Training Goals" onClick={()=>setView(V.PLAYER)}/>
          <div style={{background:"linear-gradient(135deg,#1a2340,#2d3a5c)",borderRadius:"12px",padding:"20px 24px",marginBottom:"24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <button onClick={()=>setActiveWeek(w=>Math.max(1,w-1))} style={{background:"none",border:"none",cursor:"pointer",color:"#fff",opacity:activeWeek===1?0.3:1}}><ChevronLeft size={22}/></button>
            <div style={{textAlign:"center"}}><div style={{fontSize:"18px",fontWeight:"800",color:"#fff"}}>Week {activeWeek}</div><div style={{fontSize:"12px",color:"rgba(255,255,255,0.6)",marginTop:"2px"}}>{WEEKS_META[activeWeek-1].dates}</div></div>
            <button onClick={()=>setActiveWeek(w=>Math.min(7,w+1))} style={{background:"none",border:"none",cursor:"pointer",color:"#fff",opacity:activeWeek===7?0.3:1}}><ChevronRight size={22}/></button>
          </div>
          <div style={{marginBottom:"8px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}><div style={{width:"4px",height:"20px",backgroundColor:"#e87722",borderRadius:"2px"}}/><span style={{fontSize:"17px",fontWeight:"700",color:"#222"}}>Clinical Goals</span></div>
            {clinicalGoals.map(g=><GoalRow key={g.id} g={g}/>)}
          </div>
          <div style={{marginTop:"24px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}><div style={{width:"4px",height:"20px",backgroundColor:"#f9a825",borderRadius:"2px"}}/><span style={{fontSize:"17px",fontWeight:"700",color:"#222"}}>Rehabilitation Goals</span></div>
            {rehabGoals.map(g=><GoalRow key={g.id} g={g}/>)}
          </div>
        </div>
      )}

      {/* Goal detail */}
      {view===V.GOAL_D&&activeGoal&&(
        <div style={{padding:"28px",maxWidth:"640px",margin:"0 auto"}}>
          <BackBtn label="Goals" onClick={()=>setView(V.GOALS)}/>
          <div style={{marginBottom:"24px"}}>
            <span style={{fontSize:"12px",fontWeight:"700",padding:"4px 12px",borderRadius:"20px",backgroundColor:"#fff3e8",color:"#e87722",border:"1px solid #ffd8b0",display:"inline-block",marginBottom:"10px"}}>{activeGoal.category}</span>
            <h1 style={{fontSize:"22px",fontWeight:"800",color:"#222",lineHeight:"1.3",margin:0}}>{activeGoal.text}</h1>
          </div>
          <div style={card({padding:"20px",marginBottom:"16px"})}>
            <div style={{fontSize:"14px",fontWeight:"700",color:"#333",marginBottom:"14px"}}>Status</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
              {["Not Started","In Progress","Completed","At Risk"].map(s=>{const c=STATUS_CFG[s];const active=goalStatus===s;return <div key={s} onClick={()=>setGoalStatus(s)} style={{padding:"10px 14px",borderRadius:"9px",cursor:"pointer",border:`1.5px solid ${active?c.color:"#e0e0e0"}`,backgroundColor:active?c.bg:"#fafafa",fontSize:"13px",fontWeight:active?"700":"500",color:active?c.color:"#666",transition:"all 0.15s"}}>{s}</div>;})}
            </div>
          </div>
          <div style={card({padding:"20px",marginBottom:"16px"})}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}}>
              <div style={{fontSize:"14px",fontWeight:"700",color:"#333"}}>Pain Level</div>
              <div style={{padding:"4px 12px",borderRadius:"20px",backgroundColor:goalPain>=7?"#fff0f0":goalPain>=4?"#fff8e1":"#f0faf0",color:goalPain>=7?"#cc3333":goalPain>=4?"#f9a825":"#2e7d32",border:`1px solid ${goalPain>=7?"#ffc5c5":goalPain>=4?"#ffe082":"#b8e6b8"}`,fontSize:"13px",fontWeight:"800"}}>{goalPain}/10</div>
            </div>
            <div style={{position:"relative",marginBottom:"10px"}}>
              <div style={{height:"6px",backgroundColor:"#f0f0f0",borderRadius:"4px"}}><div style={{height:"100%",width:`${(goalPain/10)*100}%`,backgroundColor:goalPain>=7?"#cc3333":goalPain>=4?"#f9a825":"#2e7d32",borderRadius:"4px",transition:"all 0.2s"}}/></div>
              <input type="range" min={0} max={10} value={goalPain} onChange={e=>setGoalPain(Number(e.target.value))} style={{position:"absolute",top:"-5px",left:0,width:"100%",opacity:0,cursor:"pointer",height:"16px"}}/>
              <div style={{position:"absolute",top:"-5px",left:`calc(${(goalPain/10)*100}% - 8px)`,width:"16px",height:"16px",borderRadius:"50%",backgroundColor:goalPain>=7?"#cc3333":goalPain>=4?"#f9a825":"#2e7d32",border:"3px solid #fff",boxShadow:"0 1px 4px rgba(0,0,0,0.2)",pointerEvents:"none"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:"11px",color:"#aaa"}}>No Pain</span><span style={{fontSize:"11px",color:"#aaa"}}>Severe</span></div>
          </div>
          <div style={card({padding:"20px",marginBottom:"20px"})}>
            <div style={{fontSize:"14px",fontWeight:"700",color:"#333",marginBottom:"12px"}}>Notes</div>
            <textarea value={goalNotes} onChange={e=>setGoalNotes(e.target.value)} placeholder="Add notes about this goal..." rows={4}
              style={{width:"100%",padding:"10px 12px",border:"1.5px solid #e0e0e0",borderRadius:"8px",fontSize:"13px",color:"#333",outline:"none",resize:"vertical",boxSizing:"border-box",fontFamily:"inherit",backgroundColor:"#fafafa"}}
              onFocus={e=>(e.target.style.borderColor="#e87722")} onBlur={e=>(e.target.style.borderColor="#e0e0e0")}/>
          </div>
          <button onClick={saveGoal} style={{width:"100%",padding:"14px",backgroundColor:"#e87722",color:"#fff",border:"none",borderRadius:"10px",fontSize:"15px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",boxShadow:"0 3px 12px rgba(232,119,34,0.3)"}}
            onMouseEnter={e=>(e.currentTarget.style.backgroundColor="#d06a18")} onMouseLeave={e=>(e.currentTarget.style.backgroundColor="#e87722")}
          ><Check size={18}/> Save Changes</button>
        </div>
      )}

      {/* Progress tab */}
      {activeTab==="progress"&&view===V.PLAYER&&(
        <div style={{padding:"28px"}}>
          <div style={{background:"linear-gradient(135deg,#1a2340,#2d3a5c)",borderRadius:"12px",padding:"24px 28px",marginBottom:"22px"}}>
            <div style={{fontSize:"22px",fontWeight:"800",color:"#e87722",marginBottom:"4px"}}>Progress Dashboard</div>
            <div style={{fontSize:"13px",color:"rgba(255,255,255,0.6)"}}>Track your rehabilitation journey</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px",marginBottom:"22px"}}>
            {[{label:"Completion Rate",value:goals.length>0?Math.round((completedCount/goals.length)*100)+"%":"0%"},{label:"Goals Completed",value:completedCount},{label:"Avg Pain Level",value:avgPain}].map(s=>(
              <div key={s.label} style={card({padding:"18px",textAlign:"center"})}><div style={{fontSize:"26px",fontWeight:"800",color:"#1a2340",marginBottom:"4px"}}>{s.value}</div><div style={{fontSize:"12px",color:"#888"}}>{s.label}</div></div>
            ))}
          </div>
          <div style={card({padding:"22px"})}>
            <div style={{fontSize:"15px",fontWeight:"700",color:"#333",marginBottom:"20px"}}>Weekly Completion Progress</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:"12px",height:"160px",padding:"0 8px"}}>
              {weeklyPct.map(w=>(
                <div key={w.week} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",height:"100%",justifyContent:"flex-end"}}>
                  <div style={{fontSize:"11px",color:"#888",fontWeight:"600"}}>{w.pct>0?w.pct:""}</div>
                  <div style={{width:"100%",borderRadius:"6px 6px 0 0",height:`${Math.max((w.pct/maxPct)*130,4)}px`,backgroundColor:w.pct>0?"#e87722":"#f0f0f0",transition:"height 0.5s"}}/>
                  <div style={{fontSize:"11px",color:"#888",fontWeight:"600"}}>W{w.week}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fitness Overview tab */}
      {activeTab==="fitness"&&view===V.PLAYER&&(
        <div style={{padding:"28px"}}>
          <div style={{background:"linear-gradient(135deg,#1a2340,#2d3a5c)",borderRadius:"12px",padding:"24px 28px",marginBottom:"22px"}}>
            <div style={{fontSize:"22px",fontWeight:"800",color:"#fff",marginBottom:"12px"}}>Fitness Overview</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <button onClick={()=>setActiveWeek(w=>Math.max(1,w-1))} style={{background:"none",border:"none",cursor:"pointer",color:"#fff",opacity:activeWeek===1?0.3:1}}><ChevronLeft size={22}/></button>
              <div style={{textAlign:"center"}}><div style={{fontSize:"16px",fontWeight:"700",color:"#fff"}}>Week {activeWeek}</div><div style={{fontSize:"12px",color:"rgba(255,255,255,0.6)",marginTop:"2px"}}>{WEEKS_META[activeWeek-1].dates}</div></div>
              <button onClick={()=>setActiveWeek(w=>Math.min(7,w+1))} style={{background:"none",border:"none",cursor:"pointer",color:"#fff",opacity:activeWeek===7?0.3:1}}><ChevronRight size={22}/></button>
            </div>
          </div>
          <div style={card({overflow:"auto"})}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:"700px"}}>
              <thead>
                <tr style={{backgroundColor:"#f9f9f9"}}>
                  <th style={{padding:"12px 14px",fontSize:"12px",fontWeight:"700",color:"#888",textAlign:"left",borderBottom:"1px solid #e8e8e8",width:"120px"}}/>
                  {DAYS_LABELS.map((day,di)=>(
                    <th key={day} style={{padding:"10px 12px",fontSize:"11px",fontWeight:"700",color:"#555",textAlign:"center",borderBottom:"1px solid #e8e8e8",borderLeft:"1px solid #f0f0f0",minWidth:"90px"}}>
                      <div>{WEEK_DATES[activeWeek]?.[di]||""}</div>
                      <div style={{color:"#aaa",fontWeight:"500",marginTop:"1px"}}>{day}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROW_LABELS.map((row,ri)=>(
                  <tr key={row} style={{backgroundColor:ri%2===0?"#fff":"#fafafa"}}>
                    <td style={{padding:"12px 14px",fontSize:"12px",fontWeight:"600",color:"#555",borderBottom:"1px solid #f5f5f5",borderRight:"1px solid #f0f0f0",verticalAlign:"top",lineHeight:"1.4"}}>{row}</td>
                    {DAYS_LABELS.map((_,di)=>{
                      const cellVal=gridData[activeWeek]?.[di]?.[row]||"";
                      const isEditing=editCell?.day===di&&editCell?.row===row;
                      return(
                        <td key={di} style={{padding:"10px 12px",fontSize:"12px",color:"#333",borderBottom:"1px solid #f5f5f5",borderLeft:"1px solid #f0f0f0",verticalAlign:"top",cursor:"pointer",backgroundColor:isEditing?"#fffaf5":"transparent",minHeight:"48px"}}
                          onClick={()=>{if(!isEditing){setEditCell({day:di,row});setEditVal(cellVal);}}}
                        >
                          {isEditing?(
                            <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                              <textarea autoFocus value={editVal} onChange={e=>setEditVal(e.target.value)} onClick={e=>e.stopPropagation()} rows={3}
                                style={{width:"100%",padding:"6px 8px",border:"1.5px solid #e87722",borderRadius:"6px",fontSize:"12px",outline:"none",resize:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
                              <div style={{display:"flex",gap:"4px"}}>
                                <button onClick={e=>{e.stopPropagation();saveCell();}} style={{flex:1,padding:"4px",backgroundColor:"#e87722",color:"#fff",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"11px",fontWeight:"700"}}>Save</button>
                                <button onClick={e=>{e.stopPropagation();setEditCell(null);setEditVal("");}} style={{flex:1,padding:"4px",backgroundColor:"#f0f0f0",color:"#555",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"11px"}}>Cancel</button>
                              </div>
                            </div>
                          ):(
                            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"4px",minHeight:"24px"}}>
                              <span style={{lineHeight:"1.4",color:cellVal?"#333":"#ccc"}}>{cellVal||"–"}</span>
                              {cellVal&&<Edit2 size={11} style={{color:"#ccc",flexShrink:0,marginTop:"2px"}}/>}
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
          <div style={{marginTop:"10px",fontSize:"12px",color:"#aaa",textAlign:"right"}}>Click any cell to edit</div>
        </div>
      )}
    </div>
  );

  return null;
}