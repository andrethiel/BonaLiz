using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
    public class MenuItem
    {
        public MenuItem()
        {
            this.ChildMenuItems = new List<MenuItem>();
        }
        public int MenuItemId { get; set; }
        public string MenuItemName { get; set; }
        public string MenuItemNamePai { get; set; }
        public string MenuItemPath { get; set; }
        public string MenuIconClass { get; set; }
        public int? MenuOrdemItem { get; set; }      
        public virtual ICollection<MenuItem> ChildMenuItems { get; set; }
    }
}
