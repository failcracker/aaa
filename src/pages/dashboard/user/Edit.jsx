import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Button, Label, Modal, Select, Textarea, TextInput } from 'flowbite-react'
import { editUser } from '/src/services/user/user'

export default function Edit({ open, onClose, data, refreshData }) {
  const [formData, setFormData] = useState(data || {})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFormData(data || {})
  }, [data])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await editUser(formData)

      toast.success('User berhasil diedit')
      refreshData()
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)

      toast.error(error.response.data.message || 'User gagal diedit, coba lagi nanti')
    }
    setLoading(false)
  }

  return (
    <Modal show={open} size="md" onClose={onClose} popup>
      <Modal.Header className="mx-2">Create User</Modal.Header>

      <Modal.Body>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name" value="Nama" />
            <TextInput id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput type="password" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </div>

          {/* Role */}
          <div>
            <Label htmlFor="role" value="Role" />
            <Select id="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required>
              <option value="">Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="scm">Supply Chain Manager</option>
              <option value="gudang">Gudang</option>
              <option value="operator">Operator</option>
              <option value="mekanik">Mekanik</option>
            </Select>
          </div>

          {/* Department */}
          <div>
            <Label htmlFor="department" value="Department" />
            <TextInput id="department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} required />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phone_number" value="Nomor Telepon" />
            <TextInput id="phone_number" type="number" value={formData.phone_number} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} required />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address" value="Alamat" />
            <Textarea id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
          </div>

          {/* NPWP */}
          <div>
            <Label htmlFor="npwp" value="NPWP" />
            <TextInput id="npwp" type="number" value={formData.npwp} onChange={(e) => setFormData({ ...formData, npwp: e.target.value })} required />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="flex justify-between">
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Edit'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
