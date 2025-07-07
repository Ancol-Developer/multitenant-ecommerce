import { getQueryClient, trpc } from "@/trpc/server";

import { CustomCategory } from "./types";
import { Footer } from "./footer";
import { SearchFilter } from "./search-filters";
import Navbar from "./navbar";


interface Props {
  children: React.ReactNode;
};

const Layout = async ({children} : Props) => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions(),
  );

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