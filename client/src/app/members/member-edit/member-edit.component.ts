import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/Member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService,
    private toaster: ToastrService){
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember();
    console.log(this.user.username);
  }

  loadMember(){
    // this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
    //   this.member = member;

    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  updateMember()
  {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toaster.success("profile update successfull");
      this,this.editForm.reset(this.member);
    })
  }

  
}
