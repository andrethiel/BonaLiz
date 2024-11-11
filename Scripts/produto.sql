CREATE TABLE [dbo].[Produto](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Guid] [uniqueidentifier] NOT NULL,
	[Nome] [varchar](max) NOT NULL,
	[Quantidade] [int] NULL,
	[TipoProdutoId] [int] NOT NULL,
	[FornecedorId] [int] NOT NULL,
	[PrecoCusto] [float] NOT NULL,
	[PrecoVenda] [float] NULL,
	[Lucro] [float] NULL,
	[DataCompra] [date] NULL,
	[Codigo] [varchar](max) NOT NULL,
	[Inativo] [bit] NOT NULL,
	[Arquivo] [varchar](max) NULL
) ON [PRIMARY]


