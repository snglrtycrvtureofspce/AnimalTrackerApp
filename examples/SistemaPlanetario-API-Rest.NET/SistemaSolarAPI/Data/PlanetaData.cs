using SistemaSolarAPI.Entities;

namespace SistemaSolarAPI.Data
{
    public static class PlanetaData
    {
        
        private static List<Planeta> Planetas = new List<Planeta>();


        public static IEnumerable<Planeta> GetPlaneta()
        {
            return Planetas;
        }

        public static Planeta GetPlaneta(int id)
        {
            return Planetas.FirstOrDefault(i => i.Id == id);
        }

        public static Planeta DeletePlaneta(int id)
        {
            var planeta = Planetas.FirstOrDefault(i => i.Id == id);
            if (planeta != null)
            {
                Planetas.RemoveAll(i => i.Id == id);
            }

            return planeta;
        }

        public static Planeta CreatePlaneta(Planeta planeta)
        {
            var ultimoId = 0;
            if (Planetas.Any())
            {
                ultimoId = Planetas.Max(i => i.Id);
            }
            planeta.Id = ultimoId + 1;

            Planetas.Add(planeta);

            return planeta;
        }


        public static Planeta AlterarPlaneta(int id, Planeta plta)
        {
            var planeta = Planetas.FirstOrDefault(i => i.Id == id);

            if (planeta != null)
            {
                planeta.Nome = plta.Nome;
                planeta.Massa = plta.Massa;
                planeta.Distancia = plta.Distancia;
            }

            return planeta;

        }
    }
}
