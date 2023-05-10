using System.Globalization;

namespace api.Models
{
    public class MovementPoints
    {
        public int MovementPointID { get; set; }
        public int AnimalID { get; set; }
        public int LocationID { get; set; }

        public DateTime DateTime
        {
            get => DateTime.Date;
            set => DateTime = value.Date;
        }
    }
}
