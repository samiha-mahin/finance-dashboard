import { KPI } from "../models/kpi_model";

export const kpiController = async (req,res)=>{
    try {
        const kpis = await KPI.find();
        res.status(200).json(kpis);
    } catch (error) {
        return res.status(500).json({
            message:  error.message,
        });
    }
}