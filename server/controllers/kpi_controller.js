import { KPI } from "../models/kpi_model.js";

export const kpiController = async (req, res) => {
    try {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Expires", "0");
        res.setHeader("Pragma", "no-cache");

        const kpis = await KPI.find();
        res.status(200).json(kpis);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
