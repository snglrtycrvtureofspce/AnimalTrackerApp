namespace api.Models
{
    public class Locations
    {
        public int LocationID { get; set; }
        public string LocationName { get; set; }
        public string LocationDescription { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
