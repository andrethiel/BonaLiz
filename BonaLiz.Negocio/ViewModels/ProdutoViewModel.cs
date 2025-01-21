using Microsoft.AspNetCore.Http;

namespace BonaLiz.Negocio.ViewModels
{
	public class ProdutoViewModel
    {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public string Nome { get; set; }
        public string TipoProdutoId { get; set; }
        public string FornecedorId { get; set; }
        public string PrecoCusto { get; set; }
        public string PrecoVenda { get; set; }
        public string Lucro { get; set; }
        public string DataCompra { get; set; }
        public string Codigo { get; set; }
        public string NomeFornecedor { get; set; }
        public string TipoProduto { get; set; }
        public string Quantidade { get; set; }
        public string Inativo { get; set; }
		public List<ImagemProdutoViewModel> UrlImagem { get; set; }
		public string Imagem { get; set; }
		public List<IFormFile> Arquivo { get; set; }
	}
}
