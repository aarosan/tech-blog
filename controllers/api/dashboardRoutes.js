const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// Initial get request that shows all posts

router.get('/', async (req, res) => {
    // This will be the 'main' part of the dashboard
    // Click able links for the blog titles that gives them the ability to comment on a post.

    // Once the title is clicked, it will open up the comment.handlebars

    try {
        const postData = await Post.findAll({ include: User });

        console.log(postData);

        const posts = postData.map((post) => {
            const { id, title, content, date, user } = post.get({ plain: true });
            const userName = user.name;
            return { id, title, content, date, userName };
        });

        const message = "All of the posts";

        // Uncomment .json/Comment .render for Postman API test

        res.status(200).render('dashboard', { posts });
        // res.status(200).json({ data: posts, message: message });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Post request to upload comments

router.post('/newComment/:postId', async (req, res) => {
    
    // The submit button will activate the POST request
    // The submit button will also got to another page that shows the comment with the post. This will send them to blogpost.handlebars
    try {

        if( !req.session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const postId = parseInt(req.params.postId, 10);
        const userId = req.session.user.id;
        const { content } = req.body;
        const date = new Date();

        const [post, user] = await Promise.all([
            Post.findByPk(postId),
            User.findByPk(userId)
        ]);

        if (!post || !user) {
            return res.status(404).json({ message: 'Post or user not found'});
        }

        const postTitle = post.title;
        const userName = user.name;

        const newCommentData = {
            content,
            date,
            postId,
            userId,
            postTitle,
            userName
        };

        console.log(newCommentData);

        const newComment = await Comment.create(newCommentData);

        const message = `Added new comment to post ${postId}`;

        // Uncomment .json/Comment .render for Postman API test
        // res.status(200).render('dashboard', { posts });
        res.status(200).json({ data: newComment, message: message });
    } catch (err) {
        res.status(500).json(err);
    }
});

// blogpost.handlebars GETS the post itself and any comments that are added to it


module.exports = router;