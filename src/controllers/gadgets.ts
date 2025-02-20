import { Request, Response } from "express";
import Gadgets from "../models/gadgets.models";

export const getGadgets = async (req: Request, res: Response) => {
    const gadgets = await Gadgets.findAll();
    res.send(gadgets);
};

export const createGadget = async (req: Request, res: Response) => {
    const { name } = req.body;
    const newGadget = await Gadgets.create({ name });
    res.send(newGadget);
};

export const updateGadget = async (req: Request, res: Response) => {
    const newGadget = await Gadgets.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.send(newGadget);
};

export const deleteGadget = async (req: Request, res: Response) => {
    const newGadget = await Gadgets.update({
        status: "Decommissioned",
        decomissionedAt: new Date()
    }, {
        where: {
            id: req.params.id
        }
    });
    res.send(`gadget ${req.params.id} has been decommissioned`);
};

export const selfDestructGadget = async (req: Request, res: Response) => {
    const id = req.params.id
    res.send(`me when i self destruct, gadget ${id}`);
};