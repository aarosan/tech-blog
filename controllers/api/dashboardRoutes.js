const router = require('express').Router();
const { Post } = require('../../models');

// Initial get request that shows all posts
    // This will be the 'main' part of the dashboard
    // Click able links for the blog titles that gives them the ability to comment on a post.

    // Once the title is clicked, it will open up the comment.handlebars

// Need a post request to upload comments
    // WHERE ARE THE COMMENTS SAVED. IT SHOULD BE A MODEL THAT HAS A POST ID THAT IS THE ACTUAL POSTS ID KEY.
    // The submit button will activate the POST request
    // The submit button will also got to another page that shows the comment with the post. This will send them to blogpost.handlebars

// blogpost.handlebars GETS the post itself and any comments that are added to it

module.exports = router;