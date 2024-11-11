CREATE TABLE [dbo].[Cliente](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Guid] [uniqueidentifier] NOT NULL,
	[Nome] [varchar](max) NULL,
	[Email] [varchar](max) NULL,
	[Telefone] [varchar](max) NULL,
	[Inativo] [bit] NULL
) ON [PRIMARY]


