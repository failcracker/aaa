import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Table, Breadcrumb, Button } from 'flowbite-react'
import { HiHome, HiPencilAlt, HiTrash } from 'react-icons/hi'
import { allUser, deleteUser } from '/src/services/user/user'
import Create from './Create'
import Edit from './Edit'
import Delete from '/src/components/Delete'
import * as XLSX from 'xlsx'

export default function User() {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const getItems = async () => {
    try {
      const res = await allUser()
      setItems(res.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getItems()
  }, [])

  const handleDelete = async () => {
    try {
      await deleteUser(selectedItem.id)

      toast.success('User berhasil dihapus')
      getItems()
      setOpenDelete(false)
      setSelectedItem(null)
    } catch (error) {
      console.error('Error submitting form:', error)

      toast.error(error.response.data.message || 'User gagal dihapus, coba lagi nanti')
    }
  }

  const exportToExcel = () => {
    const worksheetData = items.map((item, index) => ({
      No: index + 1,
      Name: item.name,
      Email: item.email,
      Role: item.role,
      Department: item.department,
      'Phone Number': item.phone_number,
      NPWP: item.npwp
    }))

    const worksheet = XLSX.utils.json_to_sheet(worksheetData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users')

    XLSX.writeFile(workbook, 'users.xlsx')
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="#" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item>User</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex float-end gap-2 mb-4">
        <Button onClick={() => setOpenCreate(true)}>Create User</Button>
        <Button color="light" onClick={exportToExcel}>
          Export Excel
        </Button>
      </div>

      <div className="text-3xl font-semibold mb-3 text-black dark:text-white">User</div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>User</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Department</Table.HeadCell>
          <Table.HeadCell>No. Telp</Table.HeadCell>
          <Table.HeadCell>NPWP</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {items.map((item, index) => (
            <Table.Row key={item.id} className="bg-white dark:bg-gray-800">
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>
                <div className="font-bold">{item.name}</div>
                <div className="text-sm">{item.email}</div>
              </Table.Cell>
              <Table.Cell>{item.role}</Table.Cell>
              <Table.Cell>{item.department}</Table.Cell>
              <Table.Cell>{item.phone_number}</Table.Cell>
              <Table.Cell>{item.npwp}</Table.Cell>
              <Table.Cell className="flex gap-2">
                <Button
                  size="xs"
                  onClick={() => {
                    setSelectedItem(item)
                    setOpenEdit(true)
                  }}
                >
                  <HiPencilAlt />
                </Button>
                <Button
                  size="xs"
                  color="failure"
                  onClick={() => {
                    setSelectedItem(item)
                    setOpenDelete(true)
                  }}
                >
                  <HiTrash />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Modal Create */}
      <Create open={openCreate} onClose={() => setOpenCreate(false)} refreshData={getItems} />

      {/* Modal Edit */}
      <Edit open={openEdit} onClose={() => setOpenEdit(false)} data={selectedItem} refreshData={getItems} />

      {/* Modal Delete */}
      <Delete open={openDelete} onClose={() => setOpenDelete(false)} onConfirm={handleDelete} />
    </div>
  )
}
