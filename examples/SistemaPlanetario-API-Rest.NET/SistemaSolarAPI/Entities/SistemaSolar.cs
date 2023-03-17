using System.ComponentModel.DataAnnotations;

namespace SistemaSolarAPI.Entities
{
    public class SistemaSolar
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int MassaEstrela { get; set; }
        public List<Planeta> Planetas { get; set; }

    }




}
