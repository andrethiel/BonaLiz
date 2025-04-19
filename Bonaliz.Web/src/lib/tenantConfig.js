let tenantConfig = null;

export function setTenantConfig(config) {
  tenantConfig = {
    nome: config.nome,
    logoUrl: config.logoUrl.trim(), // remover o \r\n se vier
    corPrimaria: config.corPrimaria || "#000000",
    corSecundaria: config.corSecundaria || "#ffffff",
  };
}

export function getTenantConfig() {
  return tenantConfig;
}
