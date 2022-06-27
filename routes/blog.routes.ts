import { Request, Response, Router } from "express";

const router = Router();

const blogs: Blog[] = [];

const getCurrentDateTime = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

router.post("/blog", (req: Request, res: Response) => {
  const { header, body } = req.body;
  const blog = {
    header,
    body,
    id: blogs.length + 1,
    createdAt: getCurrentDateTime(),
    updatedAt: getCurrentDateTime(),
  };
  blogs.push(blog);
  return res.json(blog);
});

router.get("/blog", (req: Request, res: Response) => {
  return res.json(blogs);
});

router.get("/blog/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = blogs.find((blog) => blog.id === parseInt(id));
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  return res.json(blog);
});

router.delete("/blog/:id", (req: Request, res: Response) => {
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

export { router as blogRouter };
