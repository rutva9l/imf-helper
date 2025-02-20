import { generateToken } from "../utils/auth";

export const getToken = (req: any, res: any) => {
    try {
        const client = req.body?.client;
        const token = generateToken(client);
        res.json({ token });
    } catch (error) {
        res.send(error);
    }
};