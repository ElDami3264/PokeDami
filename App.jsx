
import { useState, useEffect, useRef } from 'react'
import Game from './components/Game.jsx'
import Pokedex from './components/Pokedex.jsx'
import Tabla from './components/Tabla.jsx'

export default function App(){
  const [tab,setTab]=useState('jugar')
  const [diff,setDiff]=useState(localStorage.getItem('pd_diff')||'easy')
  const [gameMode,setGameMode]=useState(localStorage.getItem('pd_mode')||'solo')
  const [p1,setP1]=useState(localStorage.getItem('pd_p1')||'Jugador 1')
  const [p2,setP2]=useState(localStorage.getItem('pd_p2')||'Jugador 2')
  const [musicOn,setMusicOn]=useState(localStorage.getItem('pd_music')!=='off')
  const [soundOn,setSoundOn]=useState(localStorage.getItem('pd_sound')!=='off')
  const [showOptions,setShowOptions]=useState(false)
  const [dark,setDark]=useState(localStorage.getItem('pd_th')==='dark')
  const audioRef=useRef(null)

  useEffect(()=>{
    document.documentElement.classList.toggle('dark',dark)
    document.body.classList.toggle('dark',dark)
    localStorage.setItem('pd_th',dark?'dark':'light')
  },[dark])

  useEffect(()=>{ localStorage.setItem('pd_diff',diff) },[diff])
  useEffect(()=>{ localStorage.setItem('pd_mode',gameMode) },[gameMode])
  useEffect(()=>{ localStorage.setItem('pd_p1',p1); localStorage.setItem('pd_p2',p2) },[p1,p2])

  useEffect(()=>{
    if(musicOn){
      if(!audioRef.current){
        audioRef.current=new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_0a9c7d3f7a.mp3?filename=happy-children-112199.mp3')
        audioRef.current.loop=true
        audioRef.current.volume=0.3
      }
      audioRef.current.play().catch(()=>{})
    } else {
      audioRef.current?.pause()
    }
  },[musicOn])

  return (
    <div>
      <header>
        <div style={{display:'flex',alignItems:'center',gap:8,fontWeight:900,fontSize:20}}>⚪ PokeDami <span style={{fontSize:12,padding:'4px 8px',borderRadius:20,background:'#ef4444',color:'#fff'}}>{diff==='easy'?'FÁCIL':diff==='normal'?'NORMAL':'DIFÍCIL'}</span></div>
        <div style={{display:'flex',gap:8}}>
          <button className="tab" onClick={()=>setShowOptions(true)}>⚙️</button>
          <button className="tab" onClick={()=>setDark(d=>!d)}>{dark?'☀️':'🌙'}</button>
        </div>
      </header>

      <div style={{display:'flex',gap:8,padding:'12px 14px'}}>
        <button className={`tab ${tab==='jugar'?'on':''}`} onClick={()=>setTab('jugar')}>🎲 Jugar</button>
        <button className={`tab ${tab==='pokedex'?'on':''}`} onClick={()=>setTab('pokedex')}>📚 Pokédex</button>
        <button className={`tab ${tab==='tabla'?'on':''}`} onClick={()=>setTab('tabla')}>⚔️ Tabla</button>
      </div>

      {tab==='jugar' && <Game diff={diff} gameMode={gameMode} p1Name={p1} p2Name={p2} soundOn={soundOn} />}
      {tab==='pokedex' && <Pokedex />}
      {tab==='tabla' && <Tabla />}

      {showOptions && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100,padding:14}} onClick={()=>setShowOptions(false)}>
          <div className="card" style={{width:'100%',maxWidth:400,textAlign:'left',maxHeight:'90vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><h3>❤️ Modo de juego</h3><span style={{cursor:'pointer'}} onClick={()=>setShowOptions(false)}>✕</span></div>

            <div style={{display:'flex',gap:8,marginTop:12}}>
              <button className={`tab ${gameMode==='solo'?'on':''}`} onClick={()=>setGameMode('solo')} style={{flex:1,border:gameMode==='solo'?'2px solid #ec4899':'1px solid #e5e7eb',background:gameMode==='solo'?'#fdf2f8':'#fff',color:gameMode==='solo'?'#ec4899':'#111'}}>👤 Solo</button>
              <button className={`tab ${gameMode==='amigo'?'on':''}`} onClick={()=>setGameMode('amigo')} style={{flex:1}}>👥 Amigo</button>
              <button className={`tab ${gameMode==='pareja'?'on':''}`} onClick={()=>setGameMode('pareja')} style={{flex:1}}>❤️ Pareja</button>
            </div>
            <div style={{fontSize:11,color:'#6b7280',marginTop:4}}>Juega solo, 20 niveles, sin interrupciones</div>

            <input value={p1} onChange={e=>setP1(e.target.value)} placeholder="Jugador 1 (vos)" style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #e5e7eb',marginTop:10}} />
            <input value={p2} onChange={e=>setP2(e.target.value)} placeholder="Jugador 2 (amigo/novia)" style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #e5e7eb',marginTop:8}} />

            <div style={{marginTop:16}}>
              <b>🎮 Dificultad</b>
              <div style={{display:'flex',gap:8,marginTop:8}}>
                <button className={`tab ${diff==='easy'?'on':''}`} onClick={()=>setDiff('easy')} style={{flex:1,background:diff==='easy'?'#ef4444':'#fff',color:diff==='easy'?'#fff':'#111'}}>Fácil - 4 opciones</button>
                <button className={`tab ${diff==='normal'?'on':''}`} onClick={()=>setDiff('normal')} style={{flex:1}}>Normal</button>
                <button className={`tab ${diff==='hard'?'on':''}`} onClick={()=>setDiff('hard')} style={{flex:1}}>Difícil</button>
              </div>
            </div>

            <div style={{marginTop:16}}>
              <b>🔊 Audio</b>
              <div style={{display:'flex',gap:12,marginTop:8}}>
                <label style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer'}}><input type="checkbox" checked={musicOn} onChange={e=>{setMusicOn(e.target.checked); localStorage.setItem('pd_music',e.target.checked?'on':'off')}}/>🎵 Música</label>
                <label style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer'}}><input type="checkbox" checked={soundOn} onChange={e=>{setSoundOn(e.target.checked); localStorage.setItem('pd_sound',e.target.checked?'on':'off')}}/>🔔 Efectos de sonido</label>
              </div>
            </div>

            <button onClick={()=>setShowOptions(false)} style={{marginTop:16,width:'100%',padding:14,borderRadius:12,background:'#ef4444',color:'#fff',border:'none',fontWeight:900}}>Empezar</button>
          </div>
        </div>
      )}
    </div>
  )
}
