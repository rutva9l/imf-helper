import { Request, Response } from "express";

export const getGadgets = async (req: Request, res: Response) => {
    res.send('here! gadgets');
};

export const selfDestructGadget = async (req: Request, res: Response) => {
    const id = req.params.id
    res.send(`me when i self destruct, gadget ${id}`);
};