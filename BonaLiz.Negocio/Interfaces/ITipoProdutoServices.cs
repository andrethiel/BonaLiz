using BonaLiz.Negocio.ViewModels;

namespace BonaLiz.Negocio.Interfaces
{
    public interface ITipoProdutoServices
    {
        TipoProdutoViewModel Cadastrar(TipoProdutoViewModel model);
        TipoProdutoViewModel Editar(TipoProdutoViewModel model);
        List<TipoProdutoViewModel> Listar();
        TipoProdutoViewModel ObterPorId(int id);
        TipoProdutoViewModel ObterPorGuid(Guid guid);
        List<TipoProdutoViewModel> Filtrar(TipoProdutoViewModel model);
    }
}
