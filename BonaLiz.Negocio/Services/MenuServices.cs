using BonaLiz.Domain.Interfaces;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Services
{
    public class MenuServices(IMenuRepository _menuRepository) : IMenuServices
    {
        public List<MenuItemViewModel> Menu(string role)
        {
            var menu = _menuRepository.ObterMenuPerfil(role);

            return menu.Select(x => new MenuItemViewModel
            {
                Id = x.MenuItemName,
                Label = x.MenuItemName,
                Href = x.MenuItemPath,
                MenuItemNamePai = x.MenuItemNamePai,
                Ordem = x.MenuOrdemItem,
                Icon = x.MenuIconClass,
                Subitens = x.ChildMenuItems.Select(j => new MenuItemViewModel
                {
                    Id = j.MenuItemName,
                    Label = j.MenuItemName,
                    Href = j.MenuItemPath,
                    MenuItemNamePai = j.MenuItemNamePai,
                    Ordem = j.MenuOrdemItem,
                    Icon = j.MenuIconClass,

                }).ToList()
            }).ToList();
        }
    }
}
