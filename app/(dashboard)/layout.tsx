// app/(dashboard)/dashboard/layout.tsx

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { ReactNode } from 'react'


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  )
}
