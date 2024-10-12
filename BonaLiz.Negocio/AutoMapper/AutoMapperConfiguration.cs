using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.AutoMapper
{
    public class AutoMapperConfiguration
    {
        public static MapperConfiguration Mapper()
        {
            return new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });
        }
    }
}
