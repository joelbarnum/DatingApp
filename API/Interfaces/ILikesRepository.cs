using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using API.Properties.Entities;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
         Task<UserLike> GetUserLiked(int sourceUserId, int LikedUserId);
         Task<AppUser> GetUserWithLikes(int userUd);
         Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);
         
    }
}