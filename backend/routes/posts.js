const express = require('express');

const Post = require('../models/posts');

const router = express.Router();

router.post("",(req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post Added successfully",
      postId: createdPost._id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json(({
      message: "Post has been Updated"
    }));
  })
})

router.get("",(req, res, next) => {
  console.log('Express Middleware')
  Post.find()
    .then(documents => {
      res.status(200).json({ // no need to return the response as this the last statment so automatically return the response
        message: "Post sent successfully",
        posts: documents
      });
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found."
      })
    }
  })
})

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Post deleted' });
    });
})

module.exports = router;
