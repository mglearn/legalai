/* ============================================================
   Generate PPTX decks for "AI for the Defense" (TCDLA)
   Blue-and-silver palette. Speaker notes on every slide.
   Run: node gen.js   -> writes ../pptx/*.pptx
   ============================================================ */
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// ── Palette (blue and silver) ──────────────────────────────
const NAVY="102A54", NAVYDK="0B1D33", NAVYMD="2F5F8F", STEEL="6F8FAF",
      SILVER="C8D2DC", SILVERLT="E6EBF1", WHITE="FFFFFF", LGRAY="F7F9FC",
      MGRAY="D8DEE6", SLATE="4F6072", TEXT="22303C",
      DOBG="E4EDF7", DOBD="93AFCE", DO="2F5F8F",
      DONTBG="F1F3F6", DONTBD="CBD4DE", DONT="102A54",
      GOOD="6B7A8C", BETTER="2F5F8F", BEST="102A54";
const SERIF="Georgia", SANS="Calibri", MONO="Consolas";

const W=10, H=5.625, ML=0.5, CW=9.0, FOOTY=5.125;
const mkShadow=()=>({type:"outer",blur:7,offset:2,angle:135,color:"000000",opacity:0.12});

// ── Footer on every slide ──────────────────────────────────
function footer(slide){
  slide.addShape("rect",{x:0,y:FOOTY,w:W,h:H-FOOTY,fill:{color:NAVY},line:{type:"none"}});
  slide.addShape("rect",{x:0,y:FOOTY-0.035,w:W,h:0.035,fill:{color:STEEL},line:{type:"none"}});
  slide.addText([{text:"✦ ",options:{color:STEEL}},{text:"TCDLAi",options:{color:STEEL}}],
    {x:ML,y:FOOTY,w:2.4,h:H-FOOTY,fontFace:SANS,fontSize:9,bold:true,charSpacing:2,valign:"middle",align:"left"});
  slide.addText("Facilitator: Miguel Guhlin",{x:3,y:FOOTY,w:4,h:H-FOOTY,fontFace:SANS,fontSize:9,italic:true,color:"C6D4EC",valign:"middle",align:"center"});
  slide.addText("mglearn.github.io/legalai",{x:W-3.4,y:FOOTY,w:2.9,h:H-FOOTY,fontFace:SANS,fontSize:9,bold:true,color:SILVER,valign:"middle",align:"right"});
}

// ── Cover / divider ────────────────────────────────────────
function coverSlide(pptx,s){
  const slide=pptx.addSlide();
  slide.background={color:NAVYDK};
  slide.addShape("rect",{x:0,y:0,w:0.14,h:H,fill:{color:STEEL},line:{type:"none"}});
  let y=1.35;
  slide.addText(s.eyebrow.toUpperCase(),{x:0.85,y:y,w:8.7,h:0.3,fontFace:SANS,fontSize:12,bold:true,color:STEEL,charSpacing:3});
  y+=0.45;
  slide.addText(s.title,{x:0.85,y:y,w:8.6,h:1.0,fontFace:SERIF,fontSize:40,bold:true,color:WHITE,lineSpacing:42});
  y+=1.05;
  slide.addText(s.subtitle,{x:0.85,y:y,w:8.2,h:0.5,fontFace:SERIF,fontSize:19,italic:true,color:SILVER});
  if(s.meta){ y+=0.7;
    slide.addText(s.meta,{x:0.85,y:y,w:8.4,h:1.1,fontFace:SANS,fontSize:12.5,color:"AEC0E0",lineSpacing:20});
  }
  footer(slide); addNotes(slide,s.notes); return slide;
}
function dividerSlide(pptx,s){
  const slide=pptx.addSlide();
  slide.background={color:NAVYDK};
  slide.addShape("rect",{x:0,y:0,w:0.14,h:H,fill:{color:STEEL},line:{type:"none"}});
  slide.addShape("ellipse",{x:0.85,y:1.35,w:0.5,h:0.5,fill:{color:STEEL},line:{type:"none"}});
  slide.addText(String(s.segNum),{x:0.85,y:1.35,w:0.5,h:0.5,fontFace:SERIF,fontSize:16,bold:true,color:NAVYDK,align:"center",valign:"middle"});
  slide.addText(s.dividerEyebrow.toUpperCase(),{x:0.85,y:2.05,w:8.5,h:0.3,fontFace:SANS,fontSize:12,bold:true,color:STEEL,charSpacing:2});
  slide.addText(s.title,{x:0.85,y:2.4,w:8.6,h:0.9,fontFace:SERIF,fontSize:34,bold:true,color:WHITE});
  slide.addText(s.subtitle,{x:0.85,y:3.35,w:8.3,h:0.8,fontFace:SERIF,fontSize:17,italic:true,color:SILVER,lineSpacing:24});
  footer(slide); addNotes(slide,s.notes); return slide;
}

// ── Content slide shell ────────────────────────────────────
function contentSlide(pptx,s){
  const slide=pptx.addSlide();
  slide.background={color:WHITE};
  if(s.kicker){
    slide.addText(s.kicker.toUpperCase(),{x:ML,y:0.4,w:CW,h:0.28,fontFace:SANS,fontSize:11,bold:true,color:NAVYMD,charSpacing:2});
    slide.addShape("line",{x:ML,y:0.83,w:CW,h:0,line:{color:MGRAY,width:1}});
  }
  slide.addText(s.title,{x:ML,y:0.72,w:CW,h:0.7,fontFace:SERIF,fontSize:25,bold:true,color:NAVY,lineSpacing:27});
  let y=1.6;
  if(s.lead){ slide.addText(s.lead,{x:ML,y:y,w:CW,h:0.7,fontFace:SANS,fontSize:15,color:SLATE,lineSpacing:21}); y+=0.72; }
  (s.blocks||[]).forEach(b=>{ y=renderBlock(pptx,slide,b,y)+0.16; });
  footer(slide); addNotes(slide,s.notes); return slide;
}

// ── Block renderers (return bottom y) ──────────────────────
function renderBlock(pptx,slide,b,y){
  switch(b.t){
    case "bullets": return blkBullets(slide,b.items,y);
    case "cards": return blkCards(slide,b.items,b.cols||3,y);
    case "compare": return blkCompare(slide,b.cols,y);
    case "steps": return blkSteps(slide,b.items,y);
    case "guardrail": return blkGuardrail(slide,b.will,b.wont,y);
    case "tiers": return blkTiers(slide,b.items,y);
    case "checklist": return blkChecklist(slide,b.items,y);
    case "stats": return blkStats(slide,b.items,y);
    case "approach": return blkApproach(slide,b.items,y);
    case "prompt": return blkPrompt(slide,b.text,y);
    case "figure": return blkFigure(slide,b.path,b.h||3.2,y);
    case "callout": return blkCallout(slide,b,y);
    case "reflect": return blkReflect(slide,b.text,y);
    default: return y;
  }
}
function blkBullets(slide,items,y){
  const rh=0.5;
  items.forEach((it,i)=>{
    const yy=y+i*rh;
    slide.addShape("rect",{x:ML+0.02,y:yy+0.09,w:0.13,h:0.13,fill:{color:STEEL},line:{type:"none"},rotate:45});
    slide.addText(runs(it),{x:ML+0.34,y:yy,w:CW-0.34,h:rh,fontFace:SANS,fontSize:15.5,color:TEXT,valign:"top",lineSpacing:19});
  });
  return y+items.length*rh;
}
function blkCards(slide,items,cols,y){
  const gap=0.22, cw=(CW-(cols-1)*gap)/cols, rows=Math.ceil(items.length/cols);
  const ch = cols>=3 ? 1.55 : 1.45;
  items.forEach((c,i)=>{
    const r=Math.floor(i/cols), col=i%cols;
    const x=ML+col*(cw+gap), yy=y+r*(ch+0.18);
    slide.addShape("roundRect",{x,y:yy,w:cw,h:ch,rectRadius:0.05,fill:{color:LGRAY},line:{color:MGRAY,width:1},shadow:mkShadow()});
    slide.addShape("rect",{x,y:yy,w:0.06,h:ch,fill:{color:c.accent==="steel"?STEEL:NAVY},line:{type:"none"}});
    slide.addText((c.ico?c.ico+"  ":"")+c.h,{x:x+0.18,y:yy+0.12,w:cw-0.3,h:0.4,fontFace:SERIF,fontSize:13.5,bold:true,color:NAVY,valign:"top"});
    slide.addText(c.p,{x:x+0.18,y:yy+0.55,w:cw-0.34,h:ch-0.62,fontFace:SANS,fontSize:11,color:SLATE,valign:"top",lineSpacing:14});
  });
  return y+rows*ch+(rows-1)*0.18;
}
function blkCompare(slide,cols,y){
  const gap=0.3, cw=(CW-gap)/2, ch=2.5;
  cols.forEach((c,i)=>{
    const x=ML+i*(cw+gap);
    slide.addShape("roundRect",{x,y,w:cw,h:ch,rectRadius:0.05,fill:{color:LGRAY},line:{color:MGRAY,width:1}});
    slide.addShape("rect",{x,y,w:cw,h:0.07,fill:{color:i===0?NAVY:STEEL},line:{type:"none"}});
    slide.addText(c.h,{x:x+0.2,y:y+0.16,w:cw-0.4,h:0.4,fontFace:SERIF,fontSize:15,bold:true,color:NAVY});
    slide.addText(c.items.map(t=>({text:t,options:{bullet:{code:"2022"},color:TEXT,fontSize:12.5,paraSpaceAfter:4,indentLevel:0}})),
      {x:x+0.28,y:y+0.62,w:cw-0.5,h:ch-0.75,fontFace:SANS,valign:"top",lineSpacing:15});
  });
  return y+ch;
}
function blkSteps(slide,items,y){
  const n=items.length, gap=0.2, bw=(CW-(n-1)*gap)/n, bh=1.7;
  items.forEach((s,i)=>{
    const x=ML+i*(bw+gap);
    slide.addShape("roundRect",{x,y,w:bw,h:bh,rectRadius:0.05,fill:{color:LGRAY},line:{color:MGRAY,width:1}});
    slide.addShape("rect",{x,y,w:bw,h:0.06,fill:{color:STEEL},line:{type:"none"}});
    slide.addShape("ellipse",{x:x+0.18,y:y+0.18,w:0.4,h:0.4,fill:{color:NAVY},line:{type:"none"}});
    slide.addText(String(i+1),{x:x+0.18,y:y+0.18,w:0.4,h:0.4,fontFace:SERIF,fontSize:14,bold:true,color:WHITE,align:"center",valign:"middle"});
    slide.addText(s.h,{x:x+0.16,y:y+0.66,w:bw-0.3,h:0.35,fontFace:SERIF,fontSize:12.5,bold:true,color:NAVY,valign:"top"});
    slide.addText(s.p,{x:x+0.16,y:y+1.0,w:bw-0.3,h:bh-1.05,fontFace:SANS,fontSize:10.5,color:SLATE,valign:"top",lineSpacing:13});
  });
  return y+bh;
}
function blkGuardrail(slide,will,wont,y){
  const gap=0.3, cw=(CW-gap)/2;
  const maxItems=Math.max(will.items.length,wont.items.length);
  const ch=Math.max(1.9, 0.65+maxItems*0.45);
  const col=(x,data,isWill)=>{
    slide.addShape("roundRect",{x,y,w:cw,h:ch,rectRadius:0.05,fill:{color:isWill?DOBG:DONTBG},line:{color:isWill?DOBD:DONTBD,width:1.2}});
    slide.addText(data.h,{x:x+0.2,y:y+0.14,w:cw-0.4,h:0.35,fontFace:SERIF,fontSize:14,bold:true,color:isWill?DO:DONT});
    slide.addText(data.items.map(t=>({text:t,options:{bullet:{code:isWill?"2713":"2717"},color:isWill?"2A4A6E":"1B2E48",fontSize:12,paraSpaceAfter:5}})),
      {x:x+0.28,y:y+0.6,w:cw-0.5,h:ch-0.72,fontFace:SANS,valign:"top",lineSpacing:15});
  };
  col(ML,will,true); col(ML+cw+gap,wont,false);
  return y+ch;
}
function blkTiers(slide,items,y){
  const gap=0.2, cw=(CW-2*gap)/3, ch=2.35, cols=[GOOD,BETTER,BEST];
  items.forEach((tt,i)=>{
    const x=ML+i*(cw+gap);
    slide.addShape("roundRect",{x,y,w:cw,h:ch,rectRadius:0.04,fill:{color:i===2?"F5F8FD":WHITE},line:{color:cols[i],width:1.3}});
    slide.addShape("rect",{x,y,w:cw,h:0.42,fill:{color:cols[i]},line:{type:"none"}});
    slide.addText(tt.label.toUpperCase(),{x:x+0.14,y:y,w:cw-0.28,h:0.42,fontFace:SANS,fontSize:9.5,bold:true,color:WHITE,charSpacing:1,valign:"middle"});
    slide.addText(tt.text,{x:x+0.16,y:y+0.54,w:cw-0.32,h:ch-0.66,fontFace:MONO,fontSize:10,color:TEXT,valign:"top",lineSpacing:13});
  });
  return y+ch;
}
function blkChecklist(slide,items,y){
  const cols=2, gap=0.5, cw=(CW-gap)/cols, rh=0.5, rows=Math.ceil(items.length/cols);
  items.forEach((it,i)=>{
    const col=Math.floor(i/rows), r=i%rows;
    const x=ML+col*(cw+gap), yy=y+r*rh;
    slide.addShape("roundRect",{x,y:yy+0.04,w:0.2,h:0.2,rectRadius:0.02,fill:{type:"none"},line:{color:STEEL,width:1.5}});
    slide.addText(runs(it),{x:x+0.32,y:yy,w:cw-0.34,h:rh,fontFace:SANS,fontSize:13.5,color:TEXT,valign:"top",lineSpacing:16});
  });
  return y+rows*rh;
}
function blkStats(slide,items,y){
  const n=items.length, gap=0.3, bw=(CW-(n-1)*gap)/n, bh=1.4;
  items.forEach((s,i)=>{
    const x=ML+i*(bw+gap);
    slide.addShape("roundRect",{x,y,w:bw,h:bh,rectRadius:0.05,fill:{color:LGRAY},line:{color:MGRAY,width:1}});
    slide.addShape("rect",{x,y:y+bh-0.05,w:bw,h:0.05,fill:{color:STEEL},line:{type:"none"}});
    slide.addText(s.num,{x,y:y+0.2,w:bw,h:0.55,fontFace:SERIF,fontSize:24,bold:true,color:NAVY,align:"center"});
    slide.addText(s.lbl,{x:x+0.15,y:y+0.8,w:bw-0.3,h:bh-0.85,fontFace:SANS,fontSize:11,color:SLATE,align:"center",valign:"top",lineSpacing:13});
  });
  return y+bh;
}
function blkApproach(slide,items,y){
  const gap=0.3, cw=(CW-gap)/2, ch=2.5, bars=[NAVY,NAVYMD];
  items.forEach((a,i)=>{
    const x=ML+i*(cw+gap);
    slide.addShape("roundRect",{x,y,w:cw,h:ch,rectRadius:0.05,fill:{color:WHITE},line:{color:MGRAY,width:1},shadow:mkShadow()});
    slide.addShape("rect",{x,y,w:cw,h:0.5,fill:{color:bars[i]},line:{type:"none"}});
    slide.addText(a.bar,{x:x+0.18,y:y,w:cw-0.3,h:0.5,fontFace:SERIF,fontSize:15,bold:true,color:WHITE,valign:"middle"});
    slide.addText(runs(a.start),{x:x+0.2,y:y+0.62,w:cw-0.4,h:0.35,fontFace:SANS,fontSize:12.5,bold:true,color:NAVY,valign:"top"});
    slide.addText(a.focus,{x:x+0.2,y:y+1.0,w:cw-0.4,h:0.7,fontFace:SANS,fontSize:11.5,color:SLATE,valign:"top",lineSpacing:14});
    slide.addShape("rect",{x:x+0.2,y:y+1.72,w:0.05,h:0.62,fill:{color:STEEL},line:{type:"none"}});
    slide.addText(runs(a.ex),{x:x+0.34,y:y+1.72,w:cw-0.52,h:0.66,fontFace:SANS,fontSize:10.5,color:TEXT,valign:"top",lineSpacing:13,fill:{color:LGRAY}});
  });
  return y+ch;
}
function blkPrompt(slide,text,y){
  const lines=text.split("\n").length, h=Math.max(0.6,lines*0.26+0.3);
  slide.addShape("roundRect",{x:ML,y,w:CW,h,rectRadius:0.04,fill:{color:"0E1B33"},line:{color:"1E3A66",width:1}});
  slide.addText(text,{x:ML+0.2,y:y+0.1,w:CW-0.4,h:h-0.2,fontFace:MONO,fontSize:12,color:"E6ECF7",valign:"top",lineSpacing:16});
  return y+h;
}
function blkFigure(slide,p,h,y){
  try{ const sz=require("image-size"); }catch(e){}
  slide.addImage({path:p,x:(W-h*1.42)/2,y,w:h*1.42,h,sizing:{type:"contain",w:h*1.42,h}});
  return y+h;
}
function blkCallout(slide,b,y){
  const light=b.light, h=0.95;
  slide.addShape("roundRect",{x:ML,y,w:CW,h,rectRadius:0.05,fill:{color:light?SILVER:NAVY},line:{type:"none"}});
  slide.addShape("rect",{x:ML,y,w:0.07,h,fill:{color:light?NAVY:STEEL},line:{type:"none"}});
  slide.addText((b.label||"").toUpperCase(),{x:ML+0.25,y:y+0.12,w:CW-0.5,h:0.24,fontFace:SANS,fontSize:10,bold:true,color:light?NAVYMD:STEEL,charSpacing:2});
  slide.addText(b.text,{x:ML+0.25,y:y+0.36,w:CW-0.5,h:h-0.46,fontFace:SERIF,fontSize:15,color:light?NAVYDK:WHITE,valign:"top",lineSpacing:19});
  return y+h;
}
function blkReflect(slide,text,y){
  const h=0.7;
  slide.addShape("roundRect",{x:ML,y,w:CW,h,rectRadius:0.05,fill:{color:NAVY},line:{type:"none"}});
  slide.addText(runs(text,SILVER,WHITE),{x:ML+0.3,y:y+0.08,w:CW-0.6,h:h-0.16,fontFace:SANS,fontSize:13.5,italic:true,color:SILVER,valign:"middle",lineSpacing:17});
  return y+h;
}

// ── Inline **bold** runs ───────────────────────────────────
function runs(str,base,strong){
  base=base||TEXT; strong=strong||NAVY;
  const parts=str.split(/\*\*(.+?)\*\*/g);
  return parts.map((p,i)=> i%2===0
    ? {text:p,options:{color:base}}
    : {text:p,options:{color:strong,bold:true}});
}
function addNotes(slide,notes){ if(notes) slide.addNotes(notes.trim()); }

// ── Build one deck ─────────────────────────────────────────
function buildDeck(def){
  const pptx=new pptxgen();
  pptx.defineLayout({name:"W",width:W,height:H});
  pptx.layout="W";
  pptx.author="Miguel Guhlin"; pptx.company="TCEA"; pptx.title=def.title;
  def.slides.forEach(s=>{
    if(s.kind==="cover") coverSlide(pptx,s);
    else if(s.kind==="divider") dividerSlide(pptx,s);
    else contentSlide(pptx,s);
  });
  return pptx;
}

// ── Deck definitions ───────────────────────────────────────
const decks = require("./content.js");

(async()=>{
  const outDir=path.join(__dirname,"..","pptx");
  fs.mkdirSync(outDir,{recursive:true});
  for(const def of decks){
    const pptx=buildDeck(def);
    const file=path.join(outDir,def.file);
    await pptx.writeFile({fileName:file});
    console.log("wrote",path.basename(file),"("+def.slides.length+" slides)");
  }
  console.log("DONE");
})().catch(e=>{console.error(e);process.exit(1);});
