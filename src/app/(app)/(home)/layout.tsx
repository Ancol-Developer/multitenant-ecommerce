import { Footer } from "./footer";
import { SearchFilter } from "./search-filters";
import Navbar from "./navbar";

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Category } from "@/payload-types"

interface Props {
  children: React.ReactNode;
};

const Layout = async ({children} : Props) => {
  const payload = await getPayload({
      config: configPromise,
    })
  
  const data = await payload.find({
    collection: 'categories',
    pagination: false,
    depth: 1, // Polulate Subcategory, subcategories.[0] will be a type of "Category"
    where: {
      parent: {
        exists: false
      },
    },
  })

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategory: (doc.subcategory?.docs ?? []).map((doc) => ({
      // Because of "depth : 1" we are confident "doc" will be a type of "Category"
      ...(doc as Category),
      subcategories: undefined,
    }))
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilter data={formattedData}/>
      <div className="flex-1 bg-[#F4F4F0]">
        {children}
      </div>
      <Footer/>
    </div>
  );
}

export default Layout;