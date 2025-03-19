using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.ViewModels
{
    public class MenuItemViewModel
    {
        public MenuItemViewModel()
        {
            this.Subitens = new List<MenuItemViewModel>();
        }
        public string Id { get; set; }
        public string Label { get; set; }
        public string MenuItemNamePai { get; set; }
        public string Href { get; set; }
        public string Icon { get; set; }
        public int? Ordem { get; set; }
        public virtual ICollection<MenuItemViewModel> Subitens { get; set; }
    }
}
