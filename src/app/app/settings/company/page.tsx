import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { workspaceProfile } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function SettingsCompanyPage() {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Company")}
        description={txt("Profil societe, devise, locale et donnees de reference du tenant.")}
      />

      <SectionCard title={txt("Profil workspace")} description={txt("Donnees de base de l'entite commerciale.")}>
        <div className="form-grid">
          <div className="field">
            <label className="field-label">{txt("Nom produit")}</label>
            <input defaultValue={workspaceProfile.productName} />
          </div>
          <div className="field">
            <label className="field-label">{txt("Nom workspace")}</label>
            <input defaultValue={txt(workspaceProfile.workspaceName)} />
          </div>
          <div className="field">
            <label className="field-label">{txt("Locale")}</label>
            <input defaultValue={workspaceProfile.locale} />
          </div>
          <div className="field">
            <label className="field-label">{txt("Devise par defaut")}</label>
            <input defaultValue={workspaceProfile.defaultCurrency} />
          </div>
          <div className="field field-full">
            <label className="field-label">{txt("Adresse de facturation")}</label>
            <textarea defaultValue={"78 SW 7th St\nMiami, FL 33130\nUnited States"} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
