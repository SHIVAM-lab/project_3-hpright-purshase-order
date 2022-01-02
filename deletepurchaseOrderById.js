const fun = require('./function');

async function deletepurchaseOrderById(Id) {
    try {
        var a = await fun.query_exec(`select * from nrm_doc_header where doc_header_id = '${Id}'`);
        // console.log(a);
        if (a.length == 0) {
            return ({
                'status': 0,
                'message': 'No Purchase Order with this id exists!',
                'error': 'Invalid Id'
            });
        }
        var b = await fun.query_exec(`delete from nrm_doc_header where doc_header_id = '${Id}'`);
        console.log(b);
        return ({
            'status': 1,
            'message': 'Purchase Order Deleted Successfully!',
            'error': null
        });
    } catch (error) {
        if (error) {
            console.log(error);
            return ({
                'status': 0,
                'message': 'Failed to delete Purchase Order!',
                'error': error
            });
        }
    }
}

module.exports = {
    deletepurchaseOrderById
}