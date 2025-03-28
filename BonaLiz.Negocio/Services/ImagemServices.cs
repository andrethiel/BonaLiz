using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Utils;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Services
{
    public class ImagemServices(IImagemRepository _imagemRepository) : IImagemServices
    {
        public void Inserir(List<IFormFile> lista, int idProduto)
        {
            var imagem = new List<ImagemProduto>();

            foreach (var item in lista)
            {
                var arquivo = new ImagemProduto();
                arquivo.NomeImagem = Arquivo.Imagem(item);
                arquivo.ProdutoId = idProduto;
                imagem.Add(arquivo);
            }
            _imagemRepository.Inserir(imagem);
        }
        public List<ImagemProdutoViewModel> Listar()
        {
            try
            {
                var lista = _imagemRepository.Listar();

                return lista.Select(x => new ImagemProdutoViewModel()
                {
                    ProdutoId = x.ProdutoId,
                    Id = x.Id,
                    NomeArquivo = x.NomeImagem
                }).ToList();
            }
            catch(Exception ex) { throw; }
            
        }

        public ImagemProdutoViewModel ListarPorId(int id)
        {
            var arquivo = _imagemRepository.ListarPorId(id);
            return new ImagemProdutoViewModel()
            {
                ProdutoId = arquivo.ProdutoId,
                Id = arquivo.Id,
                NomeArquivo = arquivo.NomeImagem
            };
        }

        public void Remover(ImagemProdutoViewModel model)
        {
            var arquivo = new ImagemProduto
            {
                Id = model.Id,
                NomeImagem = model.NomeArquivo,
                ProdutoId = model.ProdutoId
            };
            _imagemRepository.Remove(arquivo);
        }


    }
}
