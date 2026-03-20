import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { workspaceProfile } from "@/lib/erp-data";

export default function SettingsCompanyPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Company" description="Profil societe, devise, locale et donnees de reference du tenant." />

      <SectionCard title="Profil workspace" description="Donnees de base de l'entite commerciale.">
        <div className="form-grid">
          <div className="field">
            <label className="field-label">Nom produit</label>
            <input defaultValue={workspaceProfile.productName} />
          </div>
          <div className="field">
            <label className="field-label">Nom workspace</label>
            <input defaultValue={workspaceProfile.workspaceName} />
          </div>
          <div className="field">
            <label className="field-label">Locale</label>
            <input defaultValue={workspaceProfile.locale} />
          </div>
          <div className="field">
            <label className="field-label">Devise par defaut</label>
            <input defaultValue={workspaceProfile.defaultCurrency} />
          </div>
          <div className="field field-full">
            <label className="field-label">Adresse de facturation</label>
            <textarea defaultValue={"8 rue de la Boetie\n75008 Paris\nFrance"} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

