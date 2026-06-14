'use client';

import { useState, useEffect } from 'react';
import { T } from '@/lib/admin-i18n';

interface AdminUser {
  id: number;
  username: string;
  created_at: string;
}

interface Props {
  token: string;
}

export default function AdminUserManager({ token }: Props) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [addForm, setAddForm] = useState({ username: '', password: '' });
  const [pwForm, setPwForm] = useState({ password: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/admin-users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch { console.error('Failed to load users'); }
    finally { setLoading(false); }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/admin-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(addForm),
      });
      if (res.ok) {
        setMsg(T.users.saveSuccess);
        setShowAddForm(false);
        setAddForm({ username: '', password: '' });
        fetchUsers();
        setTimeout(() => setMsg(''), 3000);
      }
    } catch { console.error('Add failed'); }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      const res = await fetch(`/api/admin/admin-users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ password: pwForm.password }),
      });
      if (res.ok) {
        setMsg('密码已更新 Password updated');
        setEditingUser(null);
        setPwForm({ password: '' });
        setTimeout(() => setMsg(''), 3000);
      }
    } catch { console.error('Update failed'); }
  };

  const handleDelete = async (id: number, username: string) => {
    if (!confirm(T.users.deleteConfirm)) return;
    await fetch(`/api/admin/admin-users/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{T.users.title}</h2>
          <p className="text-slate-500 text-sm mt-0.5">共 {users.length} 个账户</p>
        </div>
        <button onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm">
          + {T.users.add}
        </button>
      </div>

      {msg && <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-2.5">{msg}</div>}

      {showAddForm && (
        <div className="mb-6 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800 mb-4">新增管理员账户 Create Admin User</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{T.users.username}</label>
              <input value={addForm.username} onChange={e => setAddForm({ ...addForm, username: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{T.users.password}</label>
              <input type="password" value={addForm.password} onChange={e => setAddForm({ ...addForm, password: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required minLength={6} />
            </div>
            <div className="col-span-2 flex gap-3">
              <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">{T.actions.save}</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="bg-slate-100 text-slate-700 px-5 py-2 rounded-lg hover:bg-slate-200 text-sm">{T.actions.cancel}</button>
            </div>
          </form>
        </div>
      )}

      {editingUser && (
        <div className="mb-6 bg-white rounded-xl border-2 border-blue-200 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800 mb-4">修改密码 Change Password — <span className="text-blue-600">{editingUser.username}</span></h3>
          <form onSubmit={handleChangePassword} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">新密码 New Password</label>
              <input type="password" value={pwForm.password} onChange={e => setPwForm({ ...pwForm, password: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required minLength={6} />
            </div>
            <div className="col-span-2 flex gap-3">
              <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">{T.actions.save}</button>
              <button type="button" onClick={() => setEditingUser(null)} className="bg-slate-100 text-slate-700 px-5 py-2 rounded-lg hover:bg-slate-200 text-sm">{T.actions.cancel}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">{T.empty.loading}</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-16">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{T.users.username}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{T.users.createdAt}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-48">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-500 font-mono">{user.id}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-800">{user.username}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{new Date(user.created_at).toLocaleString('zh-CN')}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setEditingUser(user)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">修改密码</button>
                      {user.id !== 1 && (
                        <button onClick={() => handleDelete(user.id, user.username)} className="text-red-500 hover:text-red-700 text-sm">{T.actions.delete}</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-14"><div className="text-4xl mb-2">👤</div><p className="text-slate-500 text-sm">{T.users.noUsers}</p></div>
          )}
        </div>
      )}
    </div>
  );
}
