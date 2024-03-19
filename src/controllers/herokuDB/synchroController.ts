import { Request, Response } from "express";
import client from "../../database/client-pool/herokuBDD";

const synchroController = {
    async synchroStockResa(req: Request, res: Response) {
        let count = 0;

        try {
            await client.query('BEGIN');

            const result = await client.query('SELECT id, realstock FROM "Item"');

            for (const item of result.rows) {
                const stockbookingallowedValue = item.realstock > 1 ? 1 : 0;

                await client.query(
                    'UPDATE "Item" SET stockbookingallowed = $1 WHERE id = $2',
                    [stockbookingallowedValue, item.id]
                );
                count++;
                //console.log(count);
            }

            await client.query('COMMIT');

            res.status(200).json({ message: "Synchronisation effectuée" });
        } catch (error: any) {
            await client.query('ROLLBACK');
            res.status(500).json({ message: error.message });
        } 
    }
};

export default synchroController;
