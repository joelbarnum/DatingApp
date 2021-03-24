import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/Member';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { PaginatedResult } from '../_modules/pagination';
import { AccountService } from './account.service';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[]= [];
  memberCaceh = new Map();
  user: User;
  userParams: UserParams;
  
  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
   }

   getUserParams(){
     return this.userParams;
   }
   setUserParams(params: UserParams){
     this.userParams = params;
   }

   resetUserParams(){
     this.userParams = new UserParams(this.user);
     return this.userParams;
   }

getMembers(userParams: UserParams) {
  var response  = this.memberCaceh.get(Object.values(userParams).join('-'));
  if(response) {
    return of(response);
  }
  
  let params = this.GetPaginationHeaders(userParams.pageNumber, userParams.pageSize);

  params = params.append('minAge', userParams.minAge.toString());
  params = params.append('maxAge', userParams.maxAge.toString());
  params = params.append('gender', userParams.gender);
  params = params.append('orderBy', userParams.orderBy);



  return this.getPaginatedResults<Member[]>(this.baseUrl + 'users', params)
  .pipe(map(response => {
    this.memberCaceh.set(Object.values(userParams).join('-'), response);
    return response;
  }))
}

  

getMember(username: string){
  const member = [...this.memberCaceh.values()]
  .reduce((arr, elem) => arr.concat(elem.result), [])
  .find((member: Member) => member.username === username);

  if(member){
    return of(member)
  }
  
  return this.http.get<Member>(this.baseUrl + 'users/' + username);
}

updateMember(member: Member){
  return this.http.put(this.baseUrl + 'users', member).pipe(
    map(() => {
      const index = this.members.indexOf(member);
      this.members[index] = member;
    }))
}

  setMainPhoto(photoId: number){
      return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string){
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }

  getLikes(predicate: string, pageNumber, pageSize){
    let params = this.GetPaginationHeaders(pageNumber, pageSize);
    params = params.append('prdicate', predicate);
    return this.getPaginatedResults<Partial<Member[]>>(this.baseUrl + 'likes', params);
  }

  private getPaginatedResults<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

private GetPaginationHeaders(pageNumer: number, pageSize: number){
  let params = new HttpParams();

    params = params.append('pageNmber', pageNumer.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
}
}
