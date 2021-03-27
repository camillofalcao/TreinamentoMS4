using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContatosDomain.Models
{
    public class ContatoNumero
    {
        public string ContatoNumeroId { get; set; }
        public string ContatoId { get; set; }

        public ETipoNumero Tipo { get; set; }
        public string TipoString { get => Tipo.ToString(); }
        public string Numero { get; set; }

        public override bool Equals(object obj)
        {
            return obj is ContatoNumero && ((ContatoNumero)obj).ContatoId == this.ContatoId;
        }

        public override int GetHashCode()
        {
            return ("ContatoNumero######" + ContatoNumeroId).GetHashCode();
        }
    }
}
