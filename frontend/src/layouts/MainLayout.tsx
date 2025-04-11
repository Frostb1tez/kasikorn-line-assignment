import PageContainer from "@/components/PageContainer";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <PageContainer fullHeight>
    <Outlet />
  </PageContainer>
);

export default MainLayout;
