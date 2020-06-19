console.log("hii");
{   //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        
        

        newPostForm.submit(function(e){
            e.preventDefault();//to prevent by default submission of the form data

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in the DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                        <p>
                    
                            
                            ${ post.content }
                            <small class="delete">
                                <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fas fa-trash-alt"></i></a>
                            </small>
                            <br>
                            <small>
                            ${post.user.name}
                            </small>
                        </p>
                        <div class="post-comments">
                            
                                <form action="/comments/create" id="comment-form" method="POST">
                                    <input type = "text" name="content"  placeholder="Your comment here..." required>
                                    <input type="hidden" name="post" value="${post._id}">
                                    <button type="submit" class="login-signup-btn">Comment</button>
                                </form>
                    
                
                            
                            <div class="post-comments-list">
                                <ul id="post-comments-${ post._id}">

                                </ul>
                            </div>
                        </div>
                            
                    </li>  `)
    }


    //method to delete a postfrom dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();


            $.ajax({
                type: 'get',
                //gets delete buttons link with post id
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }






    createPost();
}