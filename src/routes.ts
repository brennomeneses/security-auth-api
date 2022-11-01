import { Router } from 'express';
import AuthTOken from './auth/authToken';
import UsersController from './controllers/usersController';

const router = Router();

const protectedRoute = new AuthTOken().protectedRoute;

router.post("/login", new AuthTOken().login);
router.get("/users", protectedRoute, new UsersController().handle);
router.post("/users", protectedRoute,new UsersController().store);
router.delete("/users/:id", protectedRoute, new UsersController().destroy);

export default router;
