import Image from "next/image";
import "./auth.scss";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
}
