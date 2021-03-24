namespace API.Helpers
{
    public class LikesParams : PginationParams
    {
        public int UserId { get; set; }
        public string  Predicate { get; set; }
    }
}