using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Repository
{
    public class CarrinhoRepository(IRepositoryBase<Carrinho> _repositoryCarrinho, IRepositoryBase<CarrinhoItens> _repositoryCarrinhoItens) : ICarrinhoRepository
    {
        public void Inserir(Carrinho model) => _repositoryCarrinho.Inserir(model);

        public void InserirItens(CarrinhoItens model) => _repositoryCarrinhoItens.Inserir(model);

        public Carrinho ObterPorClienteId(int clienteId) => _repositoryCarrinho.ObterPorId(clienteId)!;

        public List<CarrinhoItens> ObterItensPorId(Guid CarrinhoId) => _repositoryCarrinhoItens.Listar().Where(x => x.CarrinhoId == CarrinhoId).ToList();
        public Carrinho ObterCarrinhoId(Guid carrinhoId) => _repositoryCarrinho.Listar().Where(x => x.CarrinhoId == carrinhoId).FirstOrDefault()!;

        public void Editar(CarrinhoItens model) => _repositoryCarrinhoItens.Editar(model);

        public void Deletar(CarrinhoItens model) => _repositoryCarrinhoItens.Deletar(model);

        public void DeletarCarrinho(Guid carrinhoId) => _repositoryCarrinho.Deletar(_repositoryCarrinho.Listar().Where(x => x.CarrinhoId == carrinhoId).FirstOrDefault()!);

        public List<Carrinho> ListarCarrinho() => _repositoryCarrinho.Listar();
    }
}
