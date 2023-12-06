import Sidebar from "./Sidebar";

export default function PageLayout({ children }) {
  return (
    <div>
      <div className="fixed left-0">
        <Sidebar />
      </div>
      <main className="ml-[20rem]">{children}</main>
    </div>
  );
}
