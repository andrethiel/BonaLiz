let tenantConfig = null;

export function setTenantConfig(config) {
  const cleaned = {
    nome: config.nome,
    logoUrl: config.logoUrl,
    corPrimaria: config.corPrimaria,
    corSecundaria: config.corSecundaria,
  };

  tenantConfig = cleaned;

  if (typeof window !== "undefined") {
    localStorage.setItem("tenantConfig", JSON.stringify(cleaned));
  }
}

export function getTenantConfig() {
  if (!tenantConfig && typeof window !== "undefined") {
    const stored = localStorage.getItem("tenantConfig");
    if (stored) tenantConfig = JSON.parse(stored);
  }

  return (
    tenantConfig || {
      nome: "Padrão",
      logoUrl: "",
      corPrimaria: "#000000",
      corSecundaria: "#ffffff",
    }
  );
}
