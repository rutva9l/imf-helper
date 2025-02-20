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
    const query = `SELECT *, CONCAT("name", ' - ', FLOOR(RANDOM()*100), '% success probability') AS missionSuccess FROM "Gadgets"`;
    try {
        const status = req.query.status;
        let gadgets = [];
        if (status) {
            gadgets = await db.query(`${query} WHERE status = :status`, {
                model: Gadgets,
                mapToModel: true,
                replacements: { status }
            });
        } else {
            gadgets = await db.query(`${query}`, {
                model: Gadgets,
                mapToModel: true,
            });
        }
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
        res.json({ message: `Gadget ${req.params.id} has been updated` });
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
        res.json({ message: `Gadget ${req.params.id} has been decommissioned` });
    } catch (error) {
        res.send(error);
    }
};

export const selfDestructGadget = async (req: Request, res: Response) => {
    const id = req.params.id
    const code = Math.floor(Math.random() * 1000000);
    res.json({ message: `Triggered self destruct for gadget ${id}. Use confirmation code ${code} to proceed.`});
};