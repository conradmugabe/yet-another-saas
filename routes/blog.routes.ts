import { Request, Response, Router } from "express";
import { Blog } from "../interfaces/Blog";

const router = Router();

const blogs: Blog[] = [];

const getCurrentDateTime = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

router.post("/blogs", (req: Request, res: Response) => {
  const { header, body } = req.body;
  const blog = {
    header,
    body,
    id: blogs.length + 1,
    createdAt: getCurrentDateTime(),
    updatedAt: getCurrentDateTime(),
    likes: 0,
    comments: [],
  };
  blogs.push(blog);
  return res.json(blog);
});

router.get("/blogs", (req: Request, res: Response) => {
  return res.json(blogs);
});

router.get("/blogs/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = blogs.find((blog) => blog.id === parseInt(id));
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  return res.json(blog);
});

router.delete("/blogs/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  blogs.forEach((blog, index) => {
    if (blog.id === Number(id)) {
      blogs.splice(index, 1);
    }
  });

  return;
});

router.put("/blog/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { header, body } = req.body;

  const blog = blogs.find((blog) => blog.id === +id);
  if (blog) {
    blog.header = header;
    blog.body = body;
    blog.updatedAt = getCurrentDateTime();
  }
  return res.json(blog);
});

router.post("/blogs/:id/comments", (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;

  const blog = blogs.find((blog) => blog.id === +id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  blog.comments.push(comment);
  return res.json({ comment, blogId: blog.id });
});

router.post("/blogs/:id/likes", (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = blogs.find((blog) => blog.id === +id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  blog.likes += 1;
  return res.json({ blogId: blog.id, likes: blog.likes });
});

export { router as blogRouter };
