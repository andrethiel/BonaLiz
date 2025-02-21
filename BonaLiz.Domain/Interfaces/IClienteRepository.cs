using BonaLiz.Dados.Models;

namespace BonaLiz.Domain.Interfaces
{
	public interface IClienteRepository
    {
        int Inserir(Cliente model);
        void Editar(Cliente model);
        List<Cliente> Listar();
        Cliente ObterPorId(int id);
        Cliente ObterPorGuid(Guid Guid);
        List<Cliente> Filtrar(Cliente model);
    }
}
