using System.ComponentModel.DataAnnotations;

namespace SistemaSolarAPI.Entities
{
    public class Planeta
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public double Massa { get; set; }
        public int Distancia { get; set; }
    }
}
