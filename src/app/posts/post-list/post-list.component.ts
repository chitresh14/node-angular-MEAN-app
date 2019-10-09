import { Component, Input, Injectable, OnInit, OnDestroy } from "@angular/core";
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: 'First Post' , content : 'This is the first post'},
  //   {title: 'Second Post' , content : 'This is the second post'},
  //   {title: 'Third Post' , content : 'This is the third post'},
  // ];
  // @Input() posts: Post[] = [];
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;
  // postsService: PostService
  //
  constructor(public postsService: PostsService) {
    // this.postsService = postService;
  }

  ngOnInit() {
    this.postsService.getPosts();
    this.isLoading = true;
    this.postsSub = this.postsService.getPostUpdatedListener()
    .subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

}
