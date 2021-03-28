namespace API.Helpers
{
    public class MessageParams : PginationParams
    {
        public string Username { get; set; }
        public string Container  { get; set; } = "Unread";
    }
}