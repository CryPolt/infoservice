import NotesPicker from './components/NotePicker'
// import Notes from './components/Notes'
import './page.module.css'

export default function Home() {
  return (
    <main className="bg-slate-950 w-full min-h-screen pb-10">
      <NotesPicker />
      {/* <Notes /> */}
    </main>
  )
}
