CREATE TABLE [dbo].[TipoProduto](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Guid] [uniqueidentifier] NOT NULL,
	[Nome] [varchar](max) NULL,
	[Inativo] [bit] NULL
) ON [PRIMARY]


