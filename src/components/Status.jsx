import { Modal, Button } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function Delete({ open, onClose, onConfirm }) {
  return (
    <Modal show={open} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure?</h3>
          <div className="flex justify-center gap-4">
            <Button color="gray" onClick={onClose}>
              No, cancel
            </Button>
            <Button color="success" onClick={onConfirm}>
              Update
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
