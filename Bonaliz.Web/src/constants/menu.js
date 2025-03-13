export const MenuItens = [
  {
    id: "Inicio",
    label: "Inicio",
    href: "/pages/Adm",
    icon: "home",
    sizeIcon: 16,
  },
  {
    id: "Fornecedores",
    label: "Fornecedores",
    icon: "shopping-cart",
    sizeIcon: 16,
    subItems: [
      {
        id: "Listar",
        label: "Listar",
        href: "/pages/Adm/Fornecedor",
        icon: "package",
        sizeIcon: 16,
      },
    ],
  },
  {
    id: "Tipo Produto",
    label: "Tipo Produto",
    icon: "shopping-basket",
    sizeIcon: 16,
    subItems: [
      {
        id: "Listar",
        label: "Listar",
        href: "/pages/Adm/TipoProduto",
        icon: "package",
        sizeIcon: 16,
      },
    ],
  },
  {
    id: "Produtos",
    label: "Produtos",
    icon: "tag",
    sizeIcon: 16,
    subItems: [
      {
        id: "Listar",
        label: "Listar",
        href: "/pages/Adm/Produto",
        icon: "package",
        sizeIcon: 16,
      },
    ],
  },
  {
    id: "Clientes",
    label: "Clientes",
    icon: "users",
    sizeIcon: 16,
    subItems: [
      {
        id: "Listar",
        label: "Listar",
        href: "/pages/Adm/Clientes",
        icon: "package",
        sizeIcon: 16,
      },
    ],
  },
  {
    id: "Vendas",
    label: "Vendas",
    icon: "baggage-claim",
    sizeIcon: 16,
    subItems: [
      {
        id: "Listar",
        label: "Listar",
        href: "/pages/Adm/Vendas",
        icon: "package",
        sizeIcon: 16,
      },
    ],
  },
];
