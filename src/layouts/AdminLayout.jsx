import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Sidebar, Navbar, Button, Dropdown, Avatar } from 'flowbite-react'
import { HiUser, HiDocumentText, HiOutlineTruck, HiChartPie, HiReceiptRefund, HiMenu, HiSun, HiMoon } from 'react-icons/hi'
import { RiToolsFill, RiListUnordered, RiReservedLine, RiGitPullRequestLine, RiStore3Line } from 'react-icons/ri'
import { GrStorage } from 'react-icons/gr'
import { BiPurchaseTagAlt } from 'react-icons/bi'

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(localStorage.getItem('sidebar') === 'true')
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark')
  const location = useLocation() // Ambil path saat ini

  useEffect(() => {
    localStorage.setItem('sidebar', isSidebarOpen)
  }, [isSidebarOpen])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen transition-all duration-300 bg-gray-100 dark:bg-gray-800 overflow-y-auto shadow-md z-50
          ${isSidebarOpen ? 'w-64' : 'w-16'}
        `}
      >
        <Sidebar aria-label="Sidebar Navigation" className="h-full">
          <Sidebar.Logo as={Link} to="/" img="https://flowbite-react.com/favicon.svg" imgAlt="Flowbite logo">
            {isSidebarOpen && 'Flowbite'}
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item as={Link} to="/admin" icon={HiChartPie} active={location.pathname === '/admin'}>
                {isSidebarOpen && 'Dashboard'}
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/admin/user" icon={HiUser} active={location.pathname.startsWith('/admin/user')}>
                {isSidebarOpen && 'User'}
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/admin/unit" icon={HiOutlineTruck} active={location.pathname.startsWith('/admin/unit')}>
                {isSidebarOpen && 'Unit'}
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/admin/equipment" icon={RiToolsFill} active={location.pathname.startsWith('/admin/equipment')}>
                {isSidebarOpen && 'Alat Berat'}
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/admin/storage" icon={GrStorage} active={location.pathname.startsWith('/admin/storage')}>
                {isSidebarOpen && 'Storage'}
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item as={Link} to="/admin/p2h" icon={HiDocumentText} active={location.pathname.startsWith('/admin/p2h')}>
                {isSidebarOpen && 'P2H'}
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/admin/work-order" icon={HiReceiptRefund} active={location.pathname.startsWith('/admin/work-order')}>
                {isSidebarOpen && 'Work Order'}
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/admin/material-order" icon={RiListUnordered} active={location.pathname.startsWith('/admin/material-order')}>
                {isSidebarOpen && 'Material Order'}
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/admin/reservation" icon={RiReservedLine} active={location.pathname.startsWith('/admin/reservation')}>
                {isSidebarOpen && 'Reservasi Barang'}
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/admin/material-request" icon={RiGitPullRequestLine} active={location.pathname.startsWith('/admin/material-request')}>
                {isSidebarOpen && 'Material Requisition'}
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/admin/purchase-order" icon={BiPurchaseTagAlt} active={location.pathname.startsWith('/admin/purchase-order')}>
                {isSidebarOpen && 'Purchase Order'}
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/admin/store-issue-voucher" icon={RiStore3Line} active={location.pathname.startsWith('/admin/store-issue-voucher')}>
                {isSidebarOpen && 'Store Issue Voucher'}
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      <div
        className={`flex-1 h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300
          ${isSidebarOpen ? 'ml-64' : 'ml-14'}
        `}
      >
        {/* Navbar */}
        <Navbar fluid rounded className="bg-white shadow-md px-4 dark:bg-gray-800">
          <div className="flex items-center">
            {/* Tombol Toggle Sidebar */}
            <Button size="xs" color="transparent" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-4 rounded-lg dark:text-white">
              <HiMenu className="w-6 h-6" />
            </Button>

            <Navbar.Brand as={Link} to="/admin">
              <img src="https://flowbite-react.com/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </Navbar.Brand>
          </div>

          <div className="flex md:order-2 space-x-4">
            {/* Tombol Dark Mode */}
            <Button size="xs" color="transparent" onClick={() => setDarkMode(!darkMode)} className="rounded-lg dark:text-white">
              {darkMode ? <HiSun className="w-6 h-6" /> : <HiMoon className="w-6 h-6" />}
            </Button>

            <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}>
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">name@flowbite.com</span>
              </Dropdown.Header>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar>

        {/* Main Content */}
        <div className="bg-gray-100 dark:bg-gray-900 p-6 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
