import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/Member';
import { Pagination } from '../_modules/pagination';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
members: Partial<Member[]>;
predicate: 'liked';
pageNumber = 1;
pageSize = 5;
pagination: Pagination;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.laodLikes();
  }

  laodLikes(){
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
      
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.laodLikes();
  }

}
