'use client';
import { useState, useEffect, useRef } from 'react';

const STAGES = [
  { id: 'lead',        label: 'Lead',           color: '#4f5f74' },
  { id: 'contacted',   label: 'Contacted',       color: '#4F8EF7' },
  { id: 'engaged',     label: 'Engaged',         color: '#7c3aed' },
  { id: 'discovery',   label: 'Discovery Scheduled', color: '#F5A623' },
  { id: 'blueprint',   label: 'Blueprint Sent',  color: '#d97706' },
  { id: 'negotiating', label: 'Negotiating',     color: '#f59e0b' },
  { id: 'active',      label: 'Active Build',    color: '#10b981' },
  { id: 'retainer',    label: 'Client — Retainer', color: '#34d399' },
  { id: 'lost',        label: 'Closed Lost',     color: '#ef4444' },
];

const EMPTY_LEAD = {
  id: null, name: '', firm: '', email: '', phone: '', stage: 'lead',
  source: '', notes: '', workflows: '', fee: '', retainer: '',
  referredBy: '', tasks: [], createdAt: null, updatedAt: null,
};

const SOURCES = ['LinkedIn', 'Cold Email', 'Referral', 'Inbound', 'Discovery Call', 'Other'];

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function daysAgo(iso) {
  if (!iso) return '';
  const diff = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  return `${diff} days ago`;
}

export default function AdminCRM() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [leads, setLeads] = useState([]);
  const [view, setView] = useState('pipeline'); // pipeline | list | detail
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(EMPTY_LEAD);
  const [search, setSearch] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [newTask, setNewTask] = useState('');
  const [newTaskDue, setNewTaskDue] = useState('');
  const [dragOver, setDragOver] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const loaded = useRef(false);

  // Load auth from storage
  useEffect(() => {
    const stored = localStorage.getItem('cronere_admin_auth');
    if (stored === 'true') setAuth(true);
  }, []);

  // Load leads from storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cronere_crm_leads');
      if (stored) setLeads(JSON.parse(stored));
    } catch(e) {}
    loaded.current = true;
  }, []);

  // Save leads to storage
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem('cronere_crm_leads', JSON.stringify(leads));
    } catch(e) {}
  }, [leads]);

  function submitPassword() {
    if (pw === 'Cronere4you!') {
      setAuth(true);
      setPwError(false);
      try { localStorage.setItem('cronere_admin_auth', 'true'); } catch(e) {}
    } else {
      setPwError(true);
      setPw('');
    }
  }

  if (!auth) {
    return (
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#0b0f1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#0f1524', border: '1px solid #1a2340', borderRadius: 12, padding: '40px 36px', width: 320, textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#e4e8f0', letterSpacing: -0.5, marginBottom: 4 }}>
            CRON<span style={{ color: '#4F8EF7' }}>E</span>RE
          </div>
          <div style={{ fontSize: 12, color: '#4f5f74', marginBottom: 28 }}>Admin CRM</div>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={e => e.key === 'Enter' && submitPassword()}
            placeholder="Password"
            autoFocus
            style={{ width: '100%', background: '#131b2e', border: `1px solid ${pwError ? '#ef4444' : '#1a2340'}`, borderRadius: 6, padding: '10px 12px', fontSize: 14, color: '#e4e8f0', outline: 'none', boxSizing: 'border-box', marginBottom: 10, textAlign: 'center', letterSpacing: 2 }}
          />
          {pwError && <div style={{ fontSize: 12, color: '#ef4444', marginBottom: 10 }}>Incorrect password</div>}
          <button onClick={submitPassword}
            style={{ width: '100%', background: '#F5A623', color: '#0b0f1a', border: 'none', borderRadius: 6, padding: '10px 0', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Enter
          </button>
        </div>
      </div>
    );
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function saveLead() {
    const now = new Date().toISOString();
    if (form.id) {
      setLeads(ls => ls.map(l => l.id === form.id ? { ...form, updatedAt: now } : l));
      setSelected({ ...form, updatedAt: now });
      showToast('Lead updated');
    } else {
      const newLead = { ...form, id: generateId(), createdAt: now, updatedAt: now, tasks: [] };
      setLeads(ls => [newLead, ...ls]);
      setSelected(newLead);
      showToast('Lead added');
    }
    setEditing(false);
  }

  function deleteLead(id) {
    setLeads(ls => ls.filter(l => l.id !== id));
    setSelected(null);
    setView('pipeline');
    setConfirmDelete(null);
    showToast('Lead deleted');
  }

  function moveStage(leadId, stageId) {
    const now = new Date().toISOString();
    setLeads(ls => ls.map(l => l.id === leadId ? { ...l, stage: stageId, updatedAt: now } : l));
    if (selected?.id === leadId) setSelected(s => ({ ...s, stage: stageId, updatedAt: now }));
  }

  function addTask() {
    if (!newTask.trim() || !selected) return;
    const task = { id: generateId(), text: newTask.trim(), due: newTaskDue, done: false, createdAt: new Date().toISOString() };
    const updated = { ...selected, tasks: [...(selected.tasks || []), task], updatedAt: new Date().toISOString() };
    setLeads(ls => ls.map(l => l.id === selected.id ? updated : l));
    setSelected(updated);
    setNewTask('');
    setNewTaskDue('');
  }

  function toggleTask(taskId) {
    const updated = { ...selected, tasks: selected.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t), updatedAt: new Date().toISOString() };
    setLeads(ls => ls.map(l => l.id === selected.id ? updated : l));
    setSelected(updated);
  }

  function deleteTask(taskId) {
    const updated = { ...selected, tasks: selected.tasks.filter(t => t.id !== taskId), updatedAt: new Date().toISOString() };
    setLeads(ls => ls.map(l => l.id === selected.id ? updated : l));
    setSelected(updated);
  }

  function openNew() {
    setForm({ ...EMPTY_LEAD, id: null });
    setEditing(true);
    setSelected(null);
    setView('detail');
  }

  function openEdit(lead) {
    setForm({ ...lead });
    setEditing(true);
    setSelected(lead);
    setView('detail');
  }

  function openDetail(lead) {
    setSelected(lead);
    setEditing(false);
    setView('detail');
  }

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.name.toLowerCase().includes(q) || l.firm.toLowerCase().includes(q) || l.email.toLowerCase().includes(q);
    const matchStage = filterStage === 'all' || l.stage === filterStage;
    return matchSearch && matchStage;
  });

  const stageCounts = STAGES.reduce((acc, s) => {
    acc[s.id] = leads.filter(l => l.stage === s.id).length;
    return acc;
  }, {});

  const openTasks = leads.flatMap(l => (l.tasks || []).filter(t => !t.done).map(t => ({ ...t, leadName: l.name, leadFirm: l.firm, leadId: l.id })));
  const overdueTasks = openTasks.filter(t => t.due && new Date(t.due) < new Date());

  const stageOf = id => STAGES.find(s => s.id === id) || STAGES[0];

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#0b0f1a', minHeight: '100vh', color: '#e4e8f0' }}>

      {/* TOAST */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#131b2e', border: '1px solid #34d399', borderRadius: 8, padding: '10px 18px', fontSize: 13, color: '#34d399', zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
          ✓ {toast}
        </div>
      )}

      {/* CONFIRM DELETE */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998 }}>
          <div style={{ background: '#131b2e', border: '1px solid #e2e8f0', borderRadius: 12, padding: 28, maxWidth: 360, width: '90%' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#e4e8f0', marginBottom: 8 }}>Delete this lead?</div>
            <div style={{ fontSize: 13, color: '#8a9ab5', marginBottom: 20 }}>This cannot be undone.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => deleteLead(confirmDelete)} style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, background: '#1a2340', color: '#8a9ab5', border: '1px solid #2d3748', borderRadius: 6, padding: '9px 0', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ background: '#0b0f1a', borderBottom: '1px solid #1a2340', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#e4e8f0', letterSpacing: -0.5 }}>
            CRON<span style={{ color: '#4F8EF7' }}>E</span>RE
          </div>
          <div style={{ fontSize: 12, color: '#4f5f74', borderLeft: '1px solid #1a2340', paddingLeft: 12 }}>Admin CRM</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {overdueTasks.length > 0 && (
            <div style={{ background: '#7f1d1d', color: '#fca5a5', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 100 }}>
              {overdueTasks.length} overdue
            </div>
          )}
          <div style={{ display: 'flex', background: '#131b2e', borderRadius: 6, border: '1px solid #1a2340', overflow: 'hidden' }}>
            {['pipeline', 'list'].map(v => (
              <button key={v} onClick={() => { setView(v); setSelected(null); }} style={{ padding: '5px 14px', fontSize: 12, fontWeight: 500, background: view === v ? '#1a2340' : 'transparent', color: view === v ? '#e4e8f0' : '#4f5f74', border: 'none', cursor: 'pointer', textTransform: 'capitalize' }}>{v}</button>
            ))}
          </div>
          <button onClick={openNew} style={{ background: '#F5A623', color: '#0b0f1a', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Add Lead</button>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 56px)' }}>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>

          {/* SEARCH + FILTER */}
          {view !== 'detail' && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search leads..."
                style={{ flex: 1, background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#e4e8f0', outline: 'none' }}
              />
              <select value={filterStage} onChange={e => setFilterStage(e.target.value)}
                style={{ background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#8a9ab5', outline: 'none', cursor: 'pointer' }}>
                <option value="all">All stages</option>
                {STAGES.map(s => <option key={s.id} value={s.id}>{s.label} ({stageCounts[s.id]})</option>)}
              </select>
            </div>
          )}

          {/* PIPELINE VIEW */}
          {view === 'pipeline' && (
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, minHeight: 400 }}>
              {STAGES.filter(s => s.id !== 'lost').map(stage => {
                const stageLeads = filtered.filter(l => l.stage === stage.id);
                return (
                  <div key={stage.id}
                    onDragOver={e => { e.preventDefault(); setDragOver(stage.id); }}
                    onDrop={e => { e.preventDefault(); if (dragging) moveStage(dragging, stage.id); setDragOver(null); setDragging(null); }}
                    onDragLeave={() => setDragOver(null)}
                    style={{ minWidth: 200, background: dragOver === stage.id ? '#131b2e' : '#0f1524', border: `1px solid ${dragOver === stage.id ? stage.color : '#1a2340'}`, borderRadius: 8, padding: 10, transition: 'border-color 0.15s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: stage.color, letterSpacing: 0.5, textTransform: 'uppercase' }}>{stage.label}</div>
                      <div style={{ fontSize: 11, color: '#4f5f74', background: '#131b2e', borderRadius: 100, padding: '1px 6px' }}>{stageLeads.length}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {stageLeads.map(lead => (
                        <div key={lead.id}
                          draggable
                          onDragStart={() => setDragging(lead.id)}
                          onDragEnd={() => { setDragging(null); setDragOver(null); }}
                          onClick={() => openDetail(lead)}
                          style={{ background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '10px 12px', cursor: 'pointer', opacity: dragging === lead.id ? 0.5 : 1, transition: 'opacity 0.15s' }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#e4e8f0', marginBottom: 2 }}>{lead.name || 'Unnamed'}</div>
                          <div style={{ fontSize: 11, color: '#8a9ab5', marginBottom: 6 }}>{lead.firm}</div>
                          {lead.referredBy && (
                            <div style={{ fontSize: 10, color: '#F5A623', marginBottom: 4 }}>↳ Ref: {lead.referredBy}</div>
                          )}
                          {(lead.tasks || []).filter(t => !t.done).length > 0 && (
                            <div style={{ fontSize: 10, color: '#F5A623' }}>↳ {(lead.tasks || []).filter(t => !t.done).length} open task{(lead.tasks || []).filter(t => !t.done).length > 1 ? 's' : ''}</div>
                          )}
                          <div style={{ fontSize: 10, color: '#4f5f74', marginTop: 4 }}>{daysAgo(lead.updatedAt)}</div>
                        </div>
                      ))}
                      {stageLeads.length === 0 && (
                        <div style={{ fontSize: 11, color: '#2d3748', textAlign: 'center', padding: '12px 0' }}>Empty</div>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* LOST column */}
              {(() => {
                const stage = STAGES.find(s => s.id === 'lost');
                const stageLeads = filtered.filter(l => l.stage === 'lost');
                return (
                  <div onDragOver={e => { e.preventDefault(); setDragOver('lost'); }}
                    onDrop={e => { e.preventDefault(); if (dragging) moveStage(dragging, 'lost'); setDragOver(null); setDragging(null); }}
                    onDragLeave={() => setDragOver(null)}
                    style={{ minWidth: 180, background: '#0f1524', border: `1px solid ${dragOver === 'lost' ? '#ef4444' : '#1a2340'}`, borderRadius: 8, padding: 10, opacity: 0.7 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#ef4444', letterSpacing: 0.5, textTransform: 'uppercase' }}>Closed Lost</div>
                      <div style={{ fontSize: 11, color: '#4f5f74', background: '#131b2e', borderRadius: 100, padding: '1px 6px' }}>{stageLeads.length}</div>
                    </div>
                    {stageLeads.map(lead => (
                      <div key={lead.id} draggable onDragStart={() => setDragging(lead.id)} onDragEnd={() => { setDragging(null); setDragOver(null); }} onClick={() => openDetail(lead)}
                        style={{ background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '8px 10px', cursor: 'pointer', marginBottom: 6, opacity: dragging === lead.id ? 0.5 : 1 }}>
                        <div style={{ fontSize: 12, color: '#4f5f74' }}>{lead.name}</div>
                        <div style={{ fontSize: 10, color: '#2d3748' }}>{lead.firm}</div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {/* LIST VIEW */}
          {view === 'list' && (
            <div style={{ background: '#0f1524', border: '1px solid #1a2340', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px 120px 80px', padding: '8px 16px', borderBottom: '1px solid #1a2340', fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                <div>Name</div><div>Firm</div><div>Stage</div><div>Updated</div><div>Tasks</div>
              </div>
              {filtered.length === 0 && (
                <div style={{ padding: '24px 16px', textAlign: 'center', fontSize: 13, color: '#4f5f74' }}>No leads yet. Add your first one.</div>
              )}
              {filtered.map((lead, i) => {
                const stage = stageOf(lead.stage);
                const openT = (lead.tasks || []).filter(t => !t.done).length;
                return (
                  <div key={lead.id} onClick={() => openDetail(lead)}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px 120px 80px', padding: '10px 16px', borderBottom: i < filtered.length - 1 ? '1px solid #1a2340' : 'none', cursor: 'pointer', background: 'transparent', transition: 'background 0.1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#131b2e'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#e4e8f0' }}>{lead.name || '—'}</div>
                    <div style={{ fontSize: 13, color: '#8a9ab5' }}>{lead.firm || '—'}</div>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: stage.color, background: stage.color + '1a', padding: '2px 8px', borderRadius: 100 }}>{stage.label}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#4f5f74' }}>{daysAgo(lead.updatedAt)}</div>
                    <div style={{ fontSize: 12, color: openT > 0 ? '#F5A623' : '#4f5f74' }}>{openT > 0 ? `${openT} open` : '—'}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* DETAIL / EDIT VIEW */}
          {view === 'detail' && (
            <div style={{ maxWidth: 680 }}>
              {/* Back button */}
              <button onClick={() => { setView('pipeline'); setSelected(null); setEditing(false); }}
                style={{ background: 'none', border: 'none', color: '#4f5f74', fontSize: 13, cursor: 'pointer', marginBottom: 16, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                ← Back to pipeline
              </button>

              {editing ? (
                /* EDIT FORM */
                <div style={{ background: '#0f1524', border: '1px solid #1a2340', borderRadius: 10, padding: 24 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#e4e8f0', marginBottom: 20 }}>
                    {form.id ? 'Edit Lead' : 'New Lead'}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    {[
                      ['name', 'Contact Name'],
                      ['firm', 'Firm Name'],
                      ['email', 'Email'],
                      ['phone', 'Phone'],
                    ].map(([field, label]) => (
                      <div key={field}>
                        <label style={{ fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>{label}</label>
                        <input value={form[field] || ''} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                          style={{ width: '100%', background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '8px 10px', fontSize: 13, color: '#e4e8f0', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Stage</label>
                      <select value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}
                        style={{ width: '100%', background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '8px 10px', fontSize: 13, color: '#e4e8f0', outline: 'none', cursor: 'pointer' }}>
                        {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Source</label>
                      <select value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
                        style={{ width: '100%', background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '8px 10px', fontSize: 13, color: '#e4e8f0', outline: 'none', cursor: 'pointer' }}>
                        <option value="">— Select —</option>
                        {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    {[
                      ['fee', 'Build Fee'],
                      ['retainer', 'Monthly Retainer'],
                    ].map(([field, label]) => (
                      <div key={field}>
                        <label style={{ fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>{label}</label>
                        <input value={form[field] || ''} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                          placeholder="e.g. $2,500"
                          style={{ width: '100%', background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '8px 10px', fontSize: 13, color: '#e4e8f0', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Referred By</label>
                    <input value={form.referredBy || ''} onChange={e => setForm(f => ({ ...f, referredBy: e.target.value }))}
                      placeholder="Name of person who referred this lead"
                      style={{ width: '100%', background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '8px 10px', fontSize: 13, color: '#e4e8f0', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Workflows Discussed</label>
                    <input value={form.workflows || ''} onChange={e => setForm(f => ({ ...f, workflows: e.target.value }))}
                      placeholder="e.g. Engagement letters, document intake"
                      style={{ width: '100%', background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '8px 10px', fontSize: 13, color: '#e4e8f0', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Notes</label>
                    <textarea value={form.notes || ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      rows={4} placeholder="Discovery notes, pain points, context..."
                      style={{ width: '100%', background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '8px 10px', fontSize: 13, color: '#e4e8f0', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={saveLead} style={{ background: '#F5A623', color: '#0b0f1a', border: 'none', borderRadius: 6, padding: '9px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                      {form.id ? 'Save Changes' : 'Add Lead'}
                    </button>
                    <button onClick={() => { setEditing(false); if (!form.id) { setView('pipeline'); setSelected(null); } }}
                      style={{ background: 'none', border: '1px solid #1a2340', borderRadius: 6, padding: '9px 20px', fontSize: 13, color: '#8a9ab5', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : selected ? (
                /* DETAIL VIEW */
                <div>
                  {/* Lead header */}
                  <div style={{ background: '#0f1524', border: '1px solid #1a2340', borderRadius: 10, padding: 24, marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: '#e4e8f0', marginBottom: 2 }}>{selected.name || 'Unnamed Lead'}</div>
                        <div style={{ fontSize: 14, color: '#8a9ab5' }}>{selected.firm}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => openEdit(selected)} style={{ background: '#1a2340', color: '#8a9ab5', border: '1px solid #2d3748', borderRadius: 6, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => setConfirmDelete(selected.id)} style={{ background: '#1a0505', color: '#ef4444', border: '1px solid #7f1d1d', borderRadius: 6, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>Delete</button>
                      </div>
                    </div>

                    {/* Stage selector */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>Stage</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {STAGES.map(s => (
                          <button key={s.id} onClick={() => moveStage(selected.id, s.id)}
                            style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 100, border: `1px solid ${selected.stage === s.id ? s.color : '#1a2340'}`, background: selected.stage === s.id ? s.color + '22' : 'transparent', color: selected.stage === s.id ? s.color : '#4f5f74', cursor: 'pointer', transition: 'all 0.15s' }}>
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Info grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {[
                        ['Email', selected.email],
                        ['Phone', selected.phone],
                        ['Source', selected.source],
                        ['Referred By', selected.referredBy],
                        ['Workflows', selected.workflows],
                        ['Build Fee', selected.fee],
                        ['Monthly Retainer', selected.retainer],
                      ].filter(([, v]) => v).map(([label, value]) => (
                        <div key={label} style={{ background: '#131b2e', borderRadius: 6, padding: '10px 12px' }}>
                          <div style={{ fontSize: 10, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                          <div style={{ fontSize: 13, color: '#e4e8f0' }}>{value}</div>
                        </div>
                      ))}
                    </div>

                    {selected.notes && (
                      <div style={{ marginTop: 14, background: '#131b2e', borderRadius: 6, padding: '12px 14px' }}>
                        <div style={{ fontSize: 10, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>Notes</div>
                        <div style={{ fontSize: 13, color: '#8a9ab5', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{selected.notes}</div>
                      </div>
                    )}

                    <div style={{ fontSize: 11, color: '#2d3748', marginTop: 14 }}>
                      Added {formatDate(selected.createdAt)} · Updated {daysAgo(selected.updatedAt)}
                    </div>
                  </div>

                  {/* TASKS */}
                  <div style={{ background: '#0f1524', border: '1px solid #1a2340', borderRadius: 10, padding: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#e4e8f0', marginBottom: 14 }}>Tasks</div>

                    {/* Add task */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                      <input value={newTask} onChange={e => setNewTask(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addTask()}
                        placeholder="Add a task..."
                        style={{ flex: 1, background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '7px 10px', fontSize: 13, color: '#e4e8f0', outline: 'none' }} />
                      <input type="date" value={newTaskDue} onChange={e => setNewTaskDue(e.target.value)}
                        style={{ background: '#131b2e', border: '1px solid #1a2340', borderRadius: 6, padding: '7px 10px', fontSize: 13, color: '#8a9ab5', outline: 'none', width: 130 }} />
                      <button onClick={addTask} style={{ background: '#F5A623', color: '#0b0f1a', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Add</button>
                    </div>

                    {/* Task list */}
                    {(selected.tasks || []).length === 0 && (
                      <div style={{ fontSize: 13, color: '#2d3748', textAlign: 'center', padding: '12px 0' }}>No tasks yet.</div>
                    )}
                    {[...(selected.tasks || [])].sort((a, b) => a.done - b.done).map(task => {
                      const overdue = !task.done && task.due && new Date(task.due) < new Date();
                      return (
                        <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #1a2340' }}>
                          <button onClick={() => toggleTask(task.id)}
                            style={{ width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${task.done ? '#34d399' : '#2d3748'}`, background: task.done ? '#34d399' : 'transparent', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0b0f1a', fontSize: 10, fontWeight: 700 }}>
                            {task.done ? '✓' : ''}
                          </button>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: task.done ? '#4f5f74' : '#e4e8f0', textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</div>
                            {task.due && <div style={{ fontSize: 11, color: overdue ? '#ef4444' : '#4f5f74', marginTop: 1 }}>{overdue ? '⚠ Overdue · ' : ''}{formatDate(task.due)}</div>}
                          </div>
                          <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#2d3748', fontSize: 14, cursor: 'pointer', padding: '0 4px' }}>×</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* SIDEBAR — stats + open tasks */}
        {view !== 'detail' && (
          <div style={{ width: 220, borderLeft: '1px solid #1a2340', padding: 16, overflowY: 'auto', flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 }}>Pipeline</div>
            {STAGES.map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #0f1524' }}>
                <div style={{ fontSize: 12, color: stageCounts[s.id] > 0 ? '#8a9ab5' : '#2d3748' }}>{s.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: stageCounts[s.id] > 0 ? s.color : '#2d3748' }}>{stageCounts[s.id]}</div>
              </div>
            ))}

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #1a2340' }}>
              <div style={{ fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>Open Tasks</div>
              {openTasks.length === 0 && <div style={{ fontSize: 12, color: '#2d3748' }}>No open tasks.</div>}
              {openTasks.slice(0, 8).map(task => {
                const overdue = task.due && new Date(task.due) < new Date();
                return (
                  <div key={task.id} onClick={() => { const lead = leads.find(l => l.id === task.leadId); if (lead) openDetail(lead); }}
                    style={{ padding: '7px 0', borderBottom: '1px solid #0f1524', cursor: 'pointer' }}>
                    <div style={{ fontSize: 11, color: overdue ? '#ef4444' : '#8a9ab5', lineHeight: 1.4 }}>{task.text}</div>
                    <div style={{ fontSize: 10, color: '#4f5f74', marginTop: 2 }}>{task.leadName} · {task.leadFirm}</div>
                    {task.due && <div style={{ fontSize: 10, color: overdue ? '#ef4444' : '#2d3748' }}>{formatDate(task.due)}</div>}
                  </div>
                );
              })}
              {openTasks.length > 8 && <div style={{ fontSize: 11, color: '#4f5f74', marginTop: 8 }}>+{openTasks.length - 8} more</div>}
            </div>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #1a2340' }}>
              <div style={{ fontSize: 11, color: '#4f5f74', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>Summary</div>
              <div style={{ fontSize: 12, color: '#8a9ab5', marginBottom: 4 }}>Total leads: <span style={{ color: '#e4e8f0', fontWeight: 600 }}>{leads.length}</span></div>
              <div style={{ fontSize: 12, color: '#8a9ab5', marginBottom: 4 }}>Active clients: <span style={{ color: '#34d399', fontWeight: 600 }}>{stageCounts.active + stageCounts.retainer}</span></div>
              <div style={{ fontSize: 12, color: '#8a9ab5', marginBottom: 4 }}>Referred leads: <span style={{ color: '#F5A623', fontWeight: 600 }}>{leads.filter(l => l.referredBy).length}</span></div>
              <div style={{ fontSize: 12, color: '#8a9ab5' }}>Overdue tasks: <span style={{ color: overdueTasks.length > 0 ? '#ef4444' : '#4f5f74', fontWeight: 600 }}>{overdueTasks.length}</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
