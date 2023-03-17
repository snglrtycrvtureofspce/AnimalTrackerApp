using SistemaSolarAPI.Entities;

namespace SistemaSolarAPI.Data
{
    public static class SistamaSolarData
    {
        private static List<SistemaSolar> SistemasSolares = new List<SistemaSolar>();

        public static IEnumerable<SistemaSolar> GetSistemaSolar()
        {
            return SistemasSolares;
        }

        public static SistemaSolar GetSistemaSolar(int id)
        {
            return SistemasSolares.FirstOrDefault(i => i.Id == id);
        }

        public static SistemaSolar DeleteSistemaSolar(int id)
        {
            var sistemaSolar = SistemasSolares.FirstOrDefault(i => i.Id == id);
            if (sistemaSolar != null)
            {
                SistemasSolares.RemoveAll(i => i.Id == id);
            }

            return sistemaSolar;
        }

        public static SistemaSolar CriarSistemaSolar(SistemaSolar sistema)
        {
            var ultimoId = 0;
            if (SistemasSolares.Any())
            {
                ultimoId = SistemasSolares.Max(i => i.Id);
            }
            sistema.Id = ultimoId + 1;

            SistemasSolares.Add(sistema);

            return sistema;
        }

        public static SistemaSolar AlterarSistemaSolar(int id, SistemaSolar sistema)
        {
            var sistemaSolar = SistemasSolares.FirstOrDefault(i => i.Id == id);

            if (sistemaSolar != null)
            {
                sistemaSolar.Nome = sistema.Nome;
                sistemaSolar.MassaEstrela = sistema.MassaEstrela;
                sistemaSolar.Planetas = sistema.Planetas;
            }

            return sistemaSolar;

        }
    }
}
