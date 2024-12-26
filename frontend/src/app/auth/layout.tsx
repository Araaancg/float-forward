import Image from "next/image";
import "./auth.scss"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="authlayout">
      <div className="authlayout-container">
        <Image
          src="/logo-horizontal-m.png"
          alt="AIDNET logo"
          width={204}
          height={58}
        />
        {children}
      </div>
    </main>
  );
}
