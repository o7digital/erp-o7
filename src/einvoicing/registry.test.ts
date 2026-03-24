import { describe, expect, it } from "vitest";

import {
  getComplianceStatus,
  getCountryProfile,
  listCountryProfiles,
  validateSetup
} from "./registry";
import type { EInvoicingSetup } from "./types";

describe("country profile registry", () => {
  it("returns the two initial country profiles", () => {
    const countries = listCountryProfiles().map((profile) => profile.country).sort();

    expect(countries).toEqual(["FR", "MX"]);
  });

  it("exposes French structured formats", () => {
    expect(getCountryProfile("FR").supportedFormats).toEqual([
      "FACTUR_X",
      "UBL_2_1",
      "CII_16B"
    ]);
  });
});

describe("compliance calendar", () => {
  it("marks France as required for reception on 2026-09-01", () => {
    const statuses = getComplianceStatus("FR", "SMALL_MEDIUM", new Date("2026-09-02"));
    const reception = statuses.find((entry) => entry.flow === "reception");
    const issuance = statuses.find((entry) => entry.flow === "issuance");

    expect(reception).toMatchObject({
      state: "required",
      effectiveFrom: "2026-09-01"
    });
    expect(issuance).toMatchObject({
      state: "available",
      effectiveFrom: "2026-09-01"
    });
  });

  it("marks France issuance and e-reporting as required for small companies on 2027-09-01", () => {
    const statuses = getComplianceStatus("FR", "MICRO", new Date("2027-09-02"));

    expect(statuses).toEqual([
      {
        flow: "issuance",
        state: "required",
        effectiveFrom: "2027-09-01",
        note: "Les PME et micro doivent émettre électroniquement."
      },
      {
        flow: "reception",
        state: "required",
        effectiveFrom: "2026-09-01",
        note: "Toutes les entreprises doivent pouvoir recevoir des factures électroniques."
      },
      {
        flow: "e_reporting",
        state: "required",
        effectiveFrom: "2027-09-01",
        note: "Le e-reporting devient obligatoire pour PME et micro."
      }
    ]);
  });

  it("marks Mexico as already required for issuance", () => {
    const issuance = getComplianceStatus("MX", "SMALL_MEDIUM", new Date("2026-03-20")).find(
      (entry) => entry.flow === "issuance"
    );

    expect(issuance).toMatchObject({
      state: "required",
      effectiveFrom: "2023-04-01"
    });
  });
});

describe("setup validation", () => {
  it("fails when Mexican CFDI data is incomplete", () => {
    const setup: EInvoicingSetup = {
      country: "MX",
      company: {
        legalName: "O7 DIGITAL MEXICO SA DE CV"
      },
      buyer: {},
      invoice: {
        format: "CFDI_4_0_XML"
      },
      provider: {
        stampingMode: "PAC"
      }
    };

    const issues = validateSetup(setup);
    const fields = issues.map((issue) => issue.field);

    expect(fields).toContain("rfc");
    expect(fields).toContain("taxRegimeCode");
    expect(fields).toContain("fiscalZipCode");
    expect(fields).toContain("cfdiUse");
    expect(fields).toContain("paymentMethod");
  });

  it("rejects plain PDF for France", () => {
    const setup: EInvoicingSetup = {
      country: "FR",
      company: {
        legalName: "O7 DIGITAL FRANCE SAS",
        siret: "12345678900012",
        vatNumber: "FR12123456789",
        billingAddressPostalCode: "75008",
        billingAddressCountry: "FR"
      },
      buyer: {
        legalName: "CLIENT DEMO SAS",
        siret: "98765432100011",
        vatNumber: "FR98987654321",
        billingAddressPostalCode: "69002",
        billingAddressCountry: "FR"
      },
      invoice: {
        issueDate: "2026-03-20",
        invoiceNumber: "FAC-2026-0001",
        supplyDate: "2026-03-20",
        currency: "USD",
        vatBreakdown: "20",
        format: "PDF_REPRESENTATION"
      },
      provider: {
        platformType: "PDP",
        platformName: "PDP_DEMO",
        routingAddress: "demo@invoice.example"
      }
    };

    const issues = validateSetup(setup);

    expect(issues).toContainEqual({
      severity: "error",
      scope: "invoice",
      field: "format",
      message: "PDF_REPRESENTATION n'est pas supporté pour FR."
    });
  });
});
