'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface YSWS {
  id: string
  name: string
  user_id: string
  currency: string
  currency_svg: string | null
  bg_image: string | null
  bg_color: string | null
  accent_color: string | null
  shop_items: any[]
  users_registered_table: string
  projects_table: string
  admins_table: string
  projects_queue_review_table: string
  projects_queue_voting_table: string
  orders_queue_review_table: string
  orders_queue_fulfillment_table: string
  leaderboard_table: string
  created_at: string
  updated_at: string
}

export default function DashboardPage() {
  const [ysws, setYsws] = useState<YSWS | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchYsws()
  }, [])

  async function fetchYsws() {
    try {
      setLoading(true)
      // Fetch the user's YSWS - assuming user_id filtering will be added later
      const { data, error } = await supabase
        .from('ysws')
        .select('*')
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
      setYsws(data || null)
    } catch (error) {
      console.error('Error fetching YSWS:', error)
      setMessage('Error loading data')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!ysws) return

    try {
      setSaving(true)
      const { error } = await supabase
        .from('ysws')
        .update({
          name: ysws.name,
          currency: ysws.currency,
          currency_svg: ysws.currency_svg,
          bg_image: ysws.bg_image,
          bg_color: ysws.bg_color,
          accent_color: ysws.accent_color,
          shop_items: ysws.shop_items,
          users_registered_table: ysws.users_registered_table,
          projects_table: ysws.projects_table,
          admins_table: ysws.admins_table,
          projects_queue_review_table: ysws.projects_queue_review_table,
          projects_queue_voting_table: ysws.projects_queue_voting_table,
          orders_queue_review_table: ysws.orders_queue_review_table,
          orders_queue_fulfillment_table: ysws.orders_queue_fulfillment_table,
          leaderboard_table: ysws.leaderboard_table,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ysws.id)

      if (error) throw error
      setMessage('✅ Saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error saving YSWS:', error)
      setMessage('❌ Error saving changes')
    } finally {
      setSaving(false)
    }
  }

  function updateField(field: keyof YSWS, value: any) {
    if (!ysws) return
    setYsws({ ...ysws, [field]: value })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!ysws) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Nothing there:(</h2>
          <p className="text-gray-600">You haven&apos;t created a YSWS yet. Create one to get started.</p>
          <Link href={'/dashboard/create'}><Button className="bg-[#338eda] px-10 py-7 rounded-full cursor-pointer"><span className="px-2 py-4">Create one now</span></Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Edit Your YSWS</h1>
          <p className="text-gray-600">Manage your YSWS configuration</p>
        </div>

        {ysws && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {message && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                {message}
              </div>
            )}

            <div className="space-y-6">
              {/* Basic Info */}
              <section>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.name}
                      onChange={(e) => updateField('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Currency</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.currency}
                      onChange={(e) => updateField('currency', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Currency SVG</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.currency_svg || ''}
                      onChange={(e) => updateField('currency_svg', e.target.value)}
                      placeholder="SVG code or URL"
                    />
                  </div>
                </div>
              </section>

              {/* Appearance */}
              <section>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Appearance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Background Image URL</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.bg_image || ''}
                      onChange={(e) => updateField('bg_image', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Background Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        className="h-10 w-20 border rounded"
                        value={ysws.bg_color || '#ffffff'}
                        onChange={(e) => updateField('bg_color', e.target.value)}
                      />
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded"
                        value={ysws.bg_color || ''}
                        onChange={(e) => updateField('bg_color', e.target.value)}
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Accent Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        className="h-10 w-20 border rounded"
                        value={ysws.accent_color || '#000000'}
                        onChange={(e) => updateField('accent_color', e.target.value)}
                      />
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded"
                        value={ysws.accent_color || ''}
                        onChange={(e) => updateField('accent_color', e.target.value)}
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Table Names */}
              <section>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Table Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Users Registered Table</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.users_registered_table}
                      onChange={(e) => updateField('users_registered_table', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Projects Table</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.projects_table}
                      onChange={(e) => updateField('projects_table', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Admins Table</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.admins_table}
                      onChange={(e) => updateField('admins_table', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Projects Queue Review Table</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.projects_queue_review_table}
                      onChange={(e) => updateField('projects_queue_review_table', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Projects Queue Voting Table</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.projects_queue_voting_table}
                      onChange={(e) => updateField('projects_queue_voting_table', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Orders Queue Review Table</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.orders_queue_review_table}
                      onChange={(e) => updateField('orders_queue_review_table', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Orders Queue Fulfillment Table</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.orders_queue_fulfillment_table}
                      onChange={(e) => updateField('orders_queue_fulfillment_table', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Leaderboard Table</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={ysws.leaderboard_table}
                      onChange={(e) => updateField('leaderboard_table', e.target.value)}
                    />
                  </div>
                </div>
              </section>

              {/* Shop Items */}
              <section>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Shop Items</h2>
                <div>
                  <label className="block text-sm font-medium mb-1">Shop Items (JSON)</label>
                  <textarea
                    className="w-full p-2 border rounded font-mono text-sm"
                    rows={6}
                    value={JSON.stringify(ysws.shop_items, null, 2)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value)
                        updateField('shop_items', parsed)
                      } catch (error) {
                        // Invalid JSON, don't update
                      }
                    }}
                    placeholder='[]'
                  />
                  <p className="text-xs text-gray-500 mt-1">Must be valid JSON array</p>
                </div>
              </section>

              {/* Metadata */}
              <section>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Metadata</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">ID</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-50"
                      value={ysws.id}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">User ID</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-50"
                      value={ysws.user_id}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Created At</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-50"
                      value={new Date(ysws.created_at).toLocaleString()}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Updated At</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-50"
                      value={new Date(ysws.updated_at).toLocaleString()}
                      disabled
                    />
                  </div>
                </div>
              </section>

              {/* Save Button */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={fetchYsws}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
