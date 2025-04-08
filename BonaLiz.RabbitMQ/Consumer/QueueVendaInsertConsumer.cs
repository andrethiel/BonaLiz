using BonaLiz.Dados.Models;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using MassTransit;
using Microsoft.Extensions.Logging;


namespace BonaLiz.RabbitMQ.Consumer
{
    public class QueueVendaInsertConsumer(ICheckoutServices _checkoutServices, ILogger<QueueVendaInsertConsumer> _logger) : IConsumer<CarrinhoViewModel>
    {
        public Task Consume(ConsumeContext<CarrinhoViewModel> context)
        {
            try
            {
                _logger.LogInformation("Iniciando processamento do pedido: {CarrinhoId}", context.Message.carrinhoId);
                var venda = _checkoutServices.Checkout(context.Message.carrinhoId);


                if(venda == null)
                {
                    _logger.LogWarning("Carrinho inválido ou não encontrado: {CarrinhoId}", context.Message.carrinhoId);
                    throw new InvalidOperationException("Carrinho inválido. Não foi possível gerar a venda.");
                }
                _logger.LogInformation("Venda processada com sucesso. Id da Venda: {VendaId}", venda.Id);
                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erro ao processar mensagem: {ex.Message}");
                throw; // Importantíssimo: precisa lançar de novo para retry/redelivery funcionar
            }

        }
    }
}
