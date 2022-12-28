//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import lodash from "lodash";



const app = express();
app.locals.lodash = lodash;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let posts = [];

app.get("/", (req, res) => {
  res.render("home", { posts: posts });
})
app.get("/about", (req, res) => {
  res.render("about");
})
app.get("/contact", (req, res) => {
  res.render("contact");
})
app.get("/compose", (req, res) => {
  res.render("compose");
})



app.post("/compose", (req, res) => {
  let newPost = { title: "", content: "" }
  newPost.title = req.body.newPostTitle;
  newPost.content = req.body.newPostContent;
  posts.push(newPost);
  res.redirect("/")

})

app.get("/posts/:url", (req, res) => {
  let found = 0;
  let i = 0;
  for (i = 0; i < posts.length; i++) {
    let url = lodash.lowerCase(req.params.url)
    let title = lodash.lowerCase(posts[i].title)
    if (url == title) {
      found = 1;
      break;
    }

  }
  if (found) {
    res.render("post", { postTitle: posts[i].title, postContent: posts[i].content })
  }
  else {

    res.render("pageNotFound");
  }

})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on  ", PORT));
