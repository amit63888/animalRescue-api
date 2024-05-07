declare global {
    namespace Express {
      interface Request {
        user?: { userId: string };
      }
    }
  }
   
  import jwt from "jsonwebtoken";
  import yenv from "yenv";
  
  const env = yenv("env.yaml", { env: "development" });
  
  // Protected Routes token base
  export const requireSignIn = async (req: any, res: any, next: any) => {
    try {
      const authorizationHeader = req.headers.authorization;
  
      if (!authorizationHeader) {
        return res.status(401).send("Authorization header is missing");
      }
  
      const token = authorizationHeader.split(' ')[1];
      const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
  
      req.user = decoded;
      next();
      return 
    } catch (error) {
      res.status(401).send("Invalid token");
    }
  };
  