import { Request, Response } from "express";
import { uniqueUsernameGenerator, Config, adjectives, nouns } from 'unique-username-generator'
import db from "../config/database";
import Gadgets from "../models/gadgets.models";

const config: Config = {
    dictionaries: [adjectives, nouns],
    separator: ' ',
    style: 'capital',
}

export const getGadgets = async (req: Request, res: Response) => {
    try {
        const gadgets = await db.query(`SELECT *, CONCAT("name", ' - ', FLOOR(RANDOM()*100), '% success probability') AS missionSuccess FROM "Gadgets"`, {
            model: Gadgets,
            mapToModel: true,
        });
        res.json({ data: gadgets });
    } catch (error) {
        res.send(error);
    }
};

export const createGadget = async (req: Request, res: Response) => {
    try {
        // const { name } = req.body;
        const name = uniqueUsernameGenerator(config);
        const newGadget = await Gadgets.create({ name: `The ${name}` });
        res.json({ data: newGadget });
    } catch (error) {
        res.send(error);
    }
};

export const updateGadget = async (req: Request, res: Response) => {
    try {
        const newGadget = await Gadgets.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({ message: `gadget ${req.params.id} has been updated` });
    } catch (error) {
        res.send(error);
    }
};

export const deleteGadget = async (req: Request, res: Response) => {
    try {
        const newGadget = await Gadgets.update({
            status: "Decommissioned",
            decomissionedAt: new Date()
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({ message: `gadget ${req.params.id} has been decommissioned` });
    } catch (error) {
        res.send(error);
    }
};

export const selfDestructGadget = async (req: Request, res: Response) => {
    const id = req.params.id
    res.send(`me when i self destruct, gadget ${id}`);
};