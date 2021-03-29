using System.Threading.Tasks;
using API.Properties.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
         Task<string> CreateToken(AppUser appUser);
    }
}