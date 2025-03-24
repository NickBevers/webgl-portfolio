import GridSection from "@/components/gridSection/GridSection";
import styles from "./page.module.css";
import OrganicGrowthPlane from "@/components/organicGrowth/OrganicGrowthPlane";
// import TexturePlane from "@/components/textureplane/TexturePlane";
import ContactSection from "@/components/contactSection/ContactSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero section using an organically growing plane */}
      <OrganicGrowthPlane />

      {/* Grid about services / interests */}
      <GridSection />

      {/* Contact section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
