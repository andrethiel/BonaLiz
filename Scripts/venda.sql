CREATE TABLE [dbo].[Venda](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Guid] [uniqueidentifier] NULL,
	[ClienteId] [int] NULL,
	[ProdutoId] [int] NULL,
	[Quantidade] [int] NULL,
	[Valor] [float] NULL,
	[DataVenda] [date] NULL,
	[Cancelada] [bit] NULL
) ON [PRIMARY]
GO


