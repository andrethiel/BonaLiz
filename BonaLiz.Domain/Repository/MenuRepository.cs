using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Repository
{
    public class MenuRepository(IRepositoryBase<Menu> _menuRepository, IRepositoryBase<MenuPerfil> _menuPerfilRepository, RoleManager<IdentityRole> _roleManager) : IMenuRepository
    {


        public List<MenuItem> ObterMenuPerfil(string role)
        {
            var roles = _roleManager.Roles.ToList();
            var menuPerfis = _menuPerfilRepository.Listar().AsQueryable();
            var menus = _menuRepository.Listar().AsQueryable();


            List<MenuItem> menuItem = new();

            List<Menu> lista = (from mp in menuPerfis
                 join m in menus on mp.IdMenu equals m.Id
                 join u in roles on mp.IdPerfil equals u.Id
                 where m.Url != null && m.IdMenuPai == null 
                       && u.Id == role
                 orderby m.Ordem
                 select m).ToList();

            foreach(var item in lista)
            {
                var item0 = new MenuItem();
                item0.MenuItemName = item.Nome;
                item0.MenuItemPath = item.Url;
                item0.MenuIconClass = item.Icone;
                item0.MenuOrdemItem = item.Ordem;

                List<Menu> subMenu = (from mp in menuPerfis
                                      join m in menus on mp.IdMenu equals m.Id
                                      join u in roles on mp.IdPerfil equals u.Id
                                      where m.Url != null && m.IdMenuPai == item.Id && u.Id == role
                                      orderby m.Ordem
                                      select m).ToList();

                foreach (var item1 in subMenu)
                {
                    var item2 = new MenuItem();
                    item2.MenuItemName = item1.Nome;
                    item2.MenuItemPath = item1.Url;
                    item2.MenuIconClass = item1.Icone;
                    item2.MenuOrdemItem = item1.Ordem;
                    item0.ChildMenuItems.Add(item2);
                }

                menuItem.Add(item0);
            }
            return menuItem;
        }
    }
}
