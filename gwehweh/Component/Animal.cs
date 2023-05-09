﻿namespace AnimalTrackingApp.Component;

public class Animal
{
    public long Id { get; set; }
    public List<long> AnimalTypes { get; set; }
    public float Weight { get; set; }
    public float Length { get; set; }
    public float Height { get; set; }
    public string Gender { get; set; }
    public string LifeStatus { get; set; }
    public DateTime ChippingDateTime { get; set; }
    public int ChipperId { get; set; }
    public long ChippingLocationId { get; set; }
    public List<long> VisitedLocations { get; set; }
    public DateTime? DeathDateTime { get; set; }
}
