import { Router } from 'express';
import AuthToken from './auth/authToken';
import UsersController from './controllers/usersController';

const router = Router();

const protectedRoute = new AuthToken().protectedRoute;

router.post("/login", new AuthToken().login);
router.get("/users", protectedRoute, new UsersController().handle);
router.post("/users", new UsersController().store);
router.delete("/users/:id", protectedRoute, new UsersController().destroy);

export default router;
