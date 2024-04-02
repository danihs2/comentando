"use client";
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
 
const detalle = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
  }, [pathname, searchParams])
  return (
    <div>
      <h1 className="font-bold text-center mt-5">Detalle id:</h1>
    </div>
  );
}

export default detalle;