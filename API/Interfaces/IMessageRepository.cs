using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using API.Properties.Entities;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
         void AddMessage(Messages messages);
         void DeleteMessage(Messages messages);
         Task<Messages> GetMessage(int Id);
         Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
         Task<IEnumerable<MessageDto>> GetMessageThread(string CurrentUsername, string recipientUsername);
         Task<bool> SaveAllAsync();
    }
}