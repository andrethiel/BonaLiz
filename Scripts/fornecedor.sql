CREATE TABLE [dbo].[Fornecedor](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Guid] [uniqueidentifier] NOT NULL,
	[Nome] [varchar](max) NULL,
	[CNPJ] [nchar](14) NULL,
	[Estado] [nchar](2) NULL,
	[Iniciais] [nchar](2) NULL,
	[Inativo] [bit] NULL,
 )ON [PRIMARY]


