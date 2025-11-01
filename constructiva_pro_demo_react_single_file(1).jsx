// Constructiva Pro - Demo (single-file React component)
// Requisitos: TailwindCSS disponible en el proyecto (el diseño usa clases Tailwind).
// Este componente exporta por defecto una app demo con: landing, catálogo, reproductor de video, panel de usuario y modal de suscripción.
// Copia este archivo como `App.jsx` en un proyecto React creado con Vite o Create React App y configura Tailwind.

import React, { useState } from 'react';

const CATEGORIES = [
  { id: 1, title: 'Cursos', desc: 'Capacitación avanzada en diseño estructural y BIM.' },
  { id: 2, title: 'Planos Premium', desc: 'Modelos DWG y Revit listos para producción.' },
  { id: 3, title: 'Toolbox', desc: 'Scripts, macros y plantillas descargables.' },
  { id: 4, title: 'Revista', desc: 'Artículos técnicos y entrevistas mensuales.' }
];

const CONTENT = [
  { id: 'c1', type: 'curso', title: 'Diseño de Vigas – Nivel Avanzado', duration: '4h 20m', price: 0, premium: true },
  { id: 'c2', type: 'plano', title: 'Detalle de losa aligerada (Revit)', duration: '-', price: 15, premium: true },
  { id: 'c3', type: 'tool', title: 'Plantilla Excel: Armados automáticos', duration: '-', price: 9, premium: false },
  { id: 'c4', type: 'curso', title: 'BIM para estructuras (Inicia ya)', duration: '6h', price: 0, premium: true }
];

export default function App() {
  const [user, setUser] = useState({ name: 'Invitado', subscribed: false });
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const filtered = CONTENT.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));

  function handleSubscribe() {
    setUser({ ...user, subscribed: true, name: 'Martin A.' });
    setShowSubscribe(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header user={user} onOpenSubscribe={() => setShowSubscribe(true)} onSignOut={() => setUser({ name: 'Invitado', subscribed: false })} />

      <main className="max-w-7xl mx-auto">
        <Hero onJoin={() => setShowSubscribe(true)} />

        <section className="px-6 md:px-8 lg:px-0 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="col-span-1 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-slate-800">Buscar contenido</h3>
            <input value={query} onChange={e => setQuery(e.target.value)} className="mt-3 w-full rounded border p-2" placeholder="Buscar cursos, planos, herramientas..." />

            <div className="mt-6">
              <h4 className="font-semibold">Categorías</h4>
              <ul className="mt-3 space-y-2">
                {CATEGORIES.map(cat => (
                  <li key={cat.id} className="text-sm">
                    <button className="w-full text-left" onClick={() => setQuery(cat.title)}>{cat.title}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Tu cuenta</h4>
              <p className="mt-2">Nombre: <strong>{user.name}</strong></p>
              <p>Estado: <span className={`ml-1 font-medium ${user.subscribed ? 'text-green-600' : 'text-amber-600'}`}>{user.subscribed ? 'Suscrito' : 'Invitado'}</span></p>
              {!user.subscribed && (
                <button onClick={() => setShowSubscribe(true)} className="mt-4 w-full bg-amber-400 text-slate-900 p-2 rounded font-semibold">Suscribirse</button>
              )}
            </div>
          </aside>

          <section className="col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map(item => (
                <ContentCard key={item.id} item={item} onOpen={() => setSelected(item)} user={user} />
              ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold">Reproductor / Vista Previa</h3>
              {selected ? (
                <div className="mt-4">
                  <h4 className="text-lg font-bold">{selected.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">Duración: {selected.duration} • Premium: {selected.premium ? 'Sí' : 'No'}</p>

                  <div className="mt-4">
                    {/* Video placeholder - en producción usar streaming seguro */}
                    <video controls className="w-full rounded">
                      <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                      Tu navegador no soporta video.
                    </video>

                    <div className="mt-3 flex gap-3">
                      <button className="px-4 py-2 bg-slate-800 text-white rounded" onClick={() => alert('Simulación: descargar recurso')}>Descargar</button>
                      {!user.subscribed && selected.premium && (
                        <button className="px-4 py-2 border border-amber-400 rounded" onClick={() => setShowSubscribe(true)}>Suscríbete para acceso</button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-slate-600">Selecciona un curso, plano o herramienta para ver la vista previa.</p>
              )}
            </div>
          </section>
        </section>

      </main>

      <Footer />

      {showSubscribe && (
        <SubscribeModal onClose={() => setShowSubscribe(false)} onConfirm={handleSubscribe} />
      )}
    </div>
  );
}

function Header({ user, onOpenSubscribe, onSignOut }) {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-700 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-amber-400 text-slate-900 font-bold px-3 py-2 rounded">CP</div>
          <div>
            <h1 className="text-xl font-bold">Constructiva Pro</h1>
            <p className="text-sm">El Netflix de la Ingeniería Civil</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <button className="text-sm" onClick={onOpenSubscribe}>Planes</button>
          <button className="text-sm" onClick={() => alert('Ir a Comunidad (demo)')}>Comunidad</button>
          <div className="px-3 py-2 bg-white/10 rounded">{user.name}</div>
          <button className="text-sm bg-white/10 px-3 py-1 rounded" onClick={onSignOut}>Salir</button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onJoin }) {
  return (
    <section className="hero bg-[url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center rounded-b-2xl mt-6 mx-6 p-8 text-white shadow-md">
      <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/5 p-6 rounded">
        <h2 className="text-3xl font-extrabold">Herramientas & Conocimiento para la Construcción Moderna</h2>
        <p className="mt-3">Plataforma de suscripción con cursos, planos premium y toolbox técnico —diseñado para profesionales que pagan por calidad.</p>
        <div className="mt-4 flex gap-3">
          <button onClick={onJoin} className="px-4 py-2 bg-amber-400 text-slate-900 rounded font-semibold">Comienza tu suscripción</button>
          <button onClick={() => alert('Explorar catálogo')} className="px-4 py-2 border border-white/30 rounded">Explorar catálogo</button>
        </div>
      </div>
    </section>
  );
}

function ContentCard({ item, onOpen, user }) {
  return (
    <article className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">{item.title}</h4>
          <p className="text-sm text-slate-500 mt-1">Tipo: {item.type} • {item.duration}</p>
        </div>
        <div className="text-right">
          <div className={`px-2 py-1 rounded text-sm ${item.premium ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>{item.premium ? 'Premium' : 'Gratis'}</div>
          <div className="mt-2 font-bold">{item.price > 0 ? `$${item.price}` : 'Incl.'}</div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={onOpen} className="px-3 py-2 bg-slate-800 text-white rounded">Vista previa</button>
        <button onClick={() => alert('Simulación: añadir a favoritos')} className="px-3 py-2 border rounded">Favorito</button>
        {!user.subscribed && item.premium && (
          <button onClick={() => alert('Suscríbete para acceder a este contenido')} className="px-3 py-2 text-amber-600 border border-amber-600 rounded">Acceso</button>
        )}
      </div>
    </article>
  );
}

function Footer() {
  return (
    <footer className="mt-12 bg-slate-900 text-white py-6">
      <div className="max-w-7xl mx-auto text-center">© 2025 Constructiva Pro • Innovación y Precisión en Construcción</div>
    </footer>
  );
}

function SubscribeModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">Planes Constructiva Pro</h3>
            <p className="text-sm text-slate-600 mt-1">Acceso ilimitado a cursos, planeos, toolbox y la revista técnica.</p>
          </div>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded">
            <h4 className="font-semibold">Mensual</h4>
            <div className="mt-2 text-2xl font-bold">$9.99</div>
            <ul className="mt-2 text-sm">
              <li>Acceso a todo el catálogo</li>
              <li>Descargas limitadas</li>
            </ul>
            <button onClick={onConfirm} className="mt-4 w-full bg-amber-400 text-slate-900 py-2 rounded">Suscribirme</button>
          </div>

          <div className="p-4 border rounded bg-slate-50">
            <h4 className="font-semibold">Anual</h4>
            <div className="mt-2 text-2xl font-bold">$79.99</div>
            <ul className="mt-2 text-sm">
              <li>Mejor precio</li>
              <li>Certificado incluido</li>
            </ul>
            <button onClick={onConfirm} className="mt-4 w-full bg-slate-800 text-white py-2 rounded">Suscribirme</button>
          </div>

          <div className="p-4 border rounded">
            <h4 className="font-semibold">Empresas</h4>
            <div className="mt-2 text-2xl font-bold">Cotizar</div>
            <ul className="mt-2 text-sm">
              <li>Usuarios múltiples</li>
              <li>Reportes y Analytics</li>
            </ul>
            <button onClick={() => alert('Contacto comercial (demo)')} className="mt-4 w-full border py-2 rounded">Contactar</button>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-500">Pago simulado para demo. En producción integra Stripe / PayPal y verificación por backend.</div>
      </div>
    </div>
  );
}
