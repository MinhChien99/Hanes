const Database = require("../../database/db_cutting.js")
var db = new Database();
const logHelper = require("../../common/log.js");
const helper = require('../../common/helper.js');

var CuttingService = {};

// 
CuttingService.getMachines = async function (objDTO) {
    try {
        let query = `SELECT * FROM cutting_machine WHERE active = 1`;
        return await db.excuteQueryAsync(query);
    } catch (error) {
        logHelper.writeLog("CuttingService.getRequestDetail", error);
    }
}

// Add scanned roll fabric 
CuttingService.addScannedRecord = async function(objDTO){
    try {
        let query = `INSERT INTO cutting_scanned_fabric_receive (wo, roll_code, scanned_time, user, update_time) 
        VALUES ?`;

        return await db.excuteInsertWithParametersAsync(query, objDTO);
    } catch (error) {
        logHelper.writeLog("CuttingService.addScannedRecord", error);
    }
}

// Add fabric receive plan 
CuttingService.addFabricReceivePlan = async function(objDTO){
    try {
        let query = `INSERT INTO cutting_scan_data_plan (_no, receive_date, receive_time, _group, wo, ass, fabric_request, yards, cut_date, note, user_update, date_update) 
        VALUES ?`;

        return await db.excuteInsertWithParametersAsync(query, objDTO);
    } catch (error) {
        logHelper.writeLog("CuttingService.addFabricReceivePlan", error);
    }
}

// Add warehouse fabric inventory data
CuttingService.addFabricInventoryData = async function(objDTO){
    try {
        let query = `INSERT INTO cutting_wh_fabric_inventory (
            runip,
            unipack2,
            rcutwo,
            rffsty,
            item_color,
            rcutwd,
            rcolor,
            rfinwt,
            yard,
            rlocbr,
            rgrade,
            shade,
            vendor_lot,
            po_number,
            rccust,
            rlstdt,
            vender,
            rlocdp,
            rdyedt,
            rfindt,
            fnd,
            rrstat,
            ruser,
            rfstyl,
            rshapr,
            rlnvar,
            rdylot
        ) 
        VALUES ?`;

        return await db.excuteInsertWithParametersAsync(query, objDTO);
    } catch (error) {
        logHelper.writeLog("CuttingService.addFabricInventoryData", error);
    }
}

module.exports = CuttingService;