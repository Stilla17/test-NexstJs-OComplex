'use client'
import { useState } from "react"
import Card from "@/components/Card";
import Header from "@/components/Header";
import OrderSummary from "@/components/OrderSummary";
import Products from "@/components/Products";

export default function Home() {

  const [selectedItems, setSelectedItems] = useState({})

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <section>
          <div className="max-w-[1440px] mx-auto max-md:px-6">
            <Card />
          </div>
        </section>
        <section>
          <OrderSummary selectedItems={selectedItems} />
        </section>
        <section>
          <div className="max-w-[1440px] mx-auto max-md:px-6">
            <Products selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
          </div>
        </section>
      </main >
    </>
  );
}
